import { Connection, ConnectionImpl, Contact, FilterChainContact, FilterChainHealthElement, HealthElement, IccAuthApi, IccContactXApi, IccPatientXApi, IccUserXApi, ListOfIds, subscribeToEntityEvents, SubscriptionOptions, User } from '@icure/api'
import { PaginatedList } from '../../models/PaginatedList.model'
import { ContactLikeApi } from '../ContactLikeApi'
import { CommonFilter, NoOpFilter } from '../../filters/filters'
import { Mapper } from '../Mapper'
import { ContactDto, ErrorHandler, FilterMapper, firstOrNull, forceUuid, toPaginatedList } from '../../index'
import { iccRestApiPath } from '@icure/api/icc-api/api/IccRestApiPath'
import { IccDataOwnerXApi } from '@icure/api/icc-x-api/icc-data-owner-x-api'

class ContactLikeApiImpl<DSContact, DSPatient, DSDocument> implements ContactLikeApi<DSContact, DSPatient, DSDocument> {
    constructor(
        private readonly contactMapper: Mapper<DSContact, ContactDto>,
        private readonly errorHandler: ErrorHandler,
        private readonly contactApi: IccContactXApi,
        private readonly userApi: IccUserXApi,
        private readonly patientApi: IccPatientXApi,
        private readonly dataOwnerApi: IccDataOwnerXApi,
        private readonly authApi: IccAuthApi,
        private readonly basePath: string,
    ) {}

    async createOrModifyFor(patientId: string, contact: DSContact): Promise<DSContact> {
        const createdOrModifiedContact = firstOrNull(await this.createOrModifyManyFor(patientId, [contact]))

        if (createdOrModifiedContact) {
            return createdOrModifiedContact
        }

        throw this.errorHandler.createErrorWithMessage(`Could not create or modify contact`)
    }

    async createOrModifyManyFor(patientId: string, contacts: Array<DSContact>): Promise<Array<DSContact>> {
        const mappedContacts = contacts.map((contact) => this.contactMapper.toDto(contact))

        const contactsToCreate = mappedContacts.filter((contact) => !contact.rev)
        const contactsToUpdate = mappedContacts.filter((contact) => !!contact.rev)

        if (!contactsToUpdate.every((contact) => contact.id != null && forceUuid(contact.id))) {
            throw this.errorHandler.createErrorWithMessage('Error while updating: HealthElement id should be provided as an UUID v4 (String)')
        }

        const currentUser = await this.userApi.getCurrentUser().catch((e) => {
            throw this.errorHandler.createErrorFromAny(e)
        })

        const patient = patientId
            ? await this.patientApi.getPatientWithUser(currentUser, patientId).catch((e) => {
                  throw this.errorHandler.createErrorFromAny(e)
              })
            : undefined

        const createdContacts: Contact[] | null = await Promise.all(contactsToCreate.map((contact) => this.contactApi.newInstance(currentUser, patient, contact, { confidential: true }))).then((c) => this.contactApi.createContactsWithUser(currentUser, c))

        const updatedContacts: Contact[] | null = await this.contactApi.modifyContactsWithUser(currentUser, contactsToUpdate)

        return [...(createdContacts ?? []), ...(updatedContacts ?? [])].map((c) => this.contactMapper.toDomain(c))
    }

    async delete(id: string): Promise<string> {
        const deletedContactRev = (
            await this.contactApi.deleteContact(id).catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })
        )?.rev
        if (deletedContactRev) {
            return deletedContactRev
        }
        throw this.errorHandler.createErrorWithMessage(`An error occurred when deleting this Contact. Id: ${id}`)
    }

    async deleteMany(ids: Array<string>): Promise<Array<string>> {
        const deletedContactDocIdentifiers = await this.contactApi.deleteContacts(new ListOfIds({ ids })).catch((e) => {
            throw this.errorHandler.createErrorFromAny(e)
        })

        if (deletedContactDocIdentifiers.some(({ id, rev }) => !rev || !id)) {
            throw this.errorHandler.createErrorWithMessage(`An error occurred when deleting these Contacts. Ids: ${ids.join(', ')}. Deleted contacts DocIdentifiers: [${deletedContactDocIdentifiers.map(({ id, rev }) => `{'id': '${id}', 'rev':'${rev}'}`).join(', ')}]`)
        }

        return deletedContactDocIdentifiers.map(({ rev }) => rev!)
    }

    async extractPatientId(contact: DSContact): Promise<string | undefined> {
        const mappedContact = this.contactMapper.toDto(contact)
        return (await this.contactApi.decryptPatientIdOf(mappedContact))[0]
    }

    async filterBy(filter: CommonFilter<Contact>, nextContactId?: string, limit?: number): Promise<PaginatedList<DSContact>> {
        if (NoOpFilter.isNoOp(filter)) {
            return PaginatedList.empty()
        }

        const currentUser = (await this.userApi.getCurrentUser().catch((e) => {
            throw this.errorHandler.createErrorFromAny(e)
        })) as User

        return toPaginatedList(
            await this.contactApi
                .filterByWithUser(
                    currentUser,
                    nextContactId,
                    limit,
                    new FilterChainContact({
                        filter: FilterMapper.toAbstractFilterDto<Contact>(filter, 'Contact'),
                    }),
                )
                .catch((e) => {
                    throw this.errorHandler.createErrorFromAny(e)
                }),
            this.contactMapper.toDomain,
        )!
    }

    async get(id: string): Promise<DSContact> {
        const currentUser = await this.userApi.getCurrentUser().catch((e) => {
            throw this.errorHandler.createErrorFromAny(e)
        })

        return this.contactMapper.toDomain(
            await this.contactApi.getContactWithUser(currentUser, id).catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            }),
        )
    }

    async giveAccessTo(contact: DSContact, delegatedTo: string): Promise<DSContact> {
        const shared = await this.contactApi.shareWith(delegatedTo, this.contactMapper.toDto(contact))
        return this.contactMapper.toDomain(shared)
    }

    async matchBy(filter: CommonFilter<Contact>): Promise<Array<string>> {
        if (NoOpFilter.isNoOp(filter)) {
            return []
        } else {
            return this.contactApi.matchContactsBy(FilterMapper.toAbstractFilterDto<ContactDto>(filter, 'Contact')).catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })
        }
    }

    async subscribeToEvents(eventTypes: ('CREATE' | 'UPDATE')[], filter: CommonFilter<Contact>, eventFired: (contact: DSContact) => Promise<void>, options?: SubscriptionOptions): Promise<Connection> {
        const currentUser = await this.userApi.getCurrentUser()
        const dataOwnerId = this.dataOwnerApi.getDataOwnerIdOf(currentUser)

        return subscribeToEntityEvents(
            iccRestApiPath(this.basePath),
            this.authApi,
            'Contact',
            eventTypes,
            FilterMapper.toAbstractFilterDto(filter, 'Contact'),
            (event) => eventFired(this.contactMapper.toDomain(event)),
            options ?? {},
            async (encrypted) => (await this.contactApi.decrypt(dataOwnerId, [encrypted]))[0],
        ).then((ws) => new ConnectionImpl(ws))
    }
}
