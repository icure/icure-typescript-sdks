import {Filter} from "../../filter/Filter";
import {PaginatedList} from "../../models/PaginatedList";
import {Document} from "../../models/Document";
import {Connection} from "../../models/Connection";
import {ServiceLikeApi} from "../ServiceLikeApi";
import {Mapper} from "../Mapper";
import {
    Contact as ContactDto,
    Service as ServiceDto,
    User as UserDto,
    Patient as PatientDto,
    IccContactXApi,
    IccPatientXApi,
    IccUserXApi,
    ListOfIds,
    ServiceLink,
    SubContact, IccHelementXApi, Contact, IccCryptoXApi
} from "@icure/api";
import {ErrorHandler} from "../../services/ErrorHandler";
import {any, distinctBy, firstOrNull, isNotEmpty, sumOf} from "../../utils/functionalUtils";
import {CachedMap} from "../../utils/cachedMap";
import {IccDataOwnerXApi} from "@icure/api/icc-x-api/icc-data-owner-x-api";

export class ServiceLikeApiImpl<DSService, DSPatient, DSDocument> implements ServiceLikeApi<DSService, DSPatient, DSDocument> {

    private readonly contactsCache: CachedMap<ContactDto> = new CachedMap<ContactDto>(5 * 60, 10000)

    constructor(
        private readonly mapper: Mapper<DSService, ServiceDto>,
        private readonly errorHandler: ErrorHandler,
        private readonly userApi: IccUserXApi,
        private readonly contactApi: IccContactXApi,
        private readonly patientApi: IccPatientXApi,
        private readonly healthElementApi: IccHelementXApi,
        private readonly cryptoApi: IccCryptoXApi,
        private readonly dataOwnerApi: IccDataOwnerXApi,
    ) {
    }

    private clearContactCache() {
        this.contactsCache.invalidateAll()
    }

    async createOrModifyFor(patientId: string, service: DSService): Promise<DSService> {
        const createdOrUpdatedDataSample = (await this.createOrModifyManyFor(patientId, [service])).pop()
        if (createdOrUpdatedDataSample) {
            return createdOrUpdatedDataSample
        }

        throw this.errorHandler.createErrorWithMessage(`Could not create / modify data sample ${JSON.stringify(service)} for patient ${patientId}`)
    }

    async createOrModifyManyFor(patientId: string, services: Array<DSService>): Promise<Array<DSService>> {
        if (services.length == 0) {
            return Promise.resolve([])
        }

        const mappedServices = services.map((service) => this.mapper.toDto(service))

        if (distinctBy(mappedServices, (ds) => ds.contactId).size > 1) {
            throw this.errorHandler.createErrorWithMessage('Only data samples of a same batch (with the same batchId) can be processed together')
        }

        // Arbitrary : 1 service = 1K
        if (this._countHierarchyOfDataSamples(0, 0, mappedServices) > 1000) {
            throw this.errorHandler.createErrorWithMessage("Too many data samples to process. Can't process more than 1000 data samples in the same batch")
        }

        const currentUser = await this.userApi.getCurrentUser()
        const [contactCached, existingContact] = await this._getContactOfService(currentUser, mappedServices[0])

        const contactPatientId = existingContact ? (await this.contactApi.decryptPatientIdOf(existingContact))[0] : undefined

        if (existingContact != null && contactPatientId == null) {
            throw this.errorHandler.createErrorWithMessage("Can't update a batch of data samples that is not linked to any patient yet.")
        }

        if (contactPatientId != null && contactPatientId != patientId) {
            throw this.errorHandler.createErrorWithMessage("Can't update the patient of a batch of data samples. Delete those samples and create new ones")
        }

        const existingPatient = await this.patientApi.getPatientWithUser(currentUser, patientId).catch((e) => {
            throw this.errorHandler.createErrorFromAny(e)
        })
        let createdOrModifiedContact: ContactDto

        if (contactCached && existingContact != null) {
            const servicesToModify = mappedServices
            const subContacts = await this._createPotentialSubContactsForHealthElements(mappedServices, currentUser)

            const contactToModify = {
                ...existingContact,
                services: servicesToModify.map((service) => {
                    return {
                        ...service,
                        formIds: undefined,
                        healthElementsIds: undefined,
                    }
                }),
                subContacts: subContacts,
                openingDate: Math.min(
                    ...servicesToModify.filter((element) => element.openingDate != null || element.valueDate != null).map((e) => e.openingDate ?? e.valueDate!)
                ),
                closingDate: Math.max(
                    ...servicesToModify.filter((element) => element.closingDate != null || element.valueDate != null).map((e) => e.closingDate ?? e.valueDate!)
                ),
            }

            createdOrModifiedContact = await this.contactApi.modifyContactWithUser(currentUser, contactToModify).catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })
        } else {
            const contactToCreate = await this.createContactDtoUsing(currentUser, existingPatient, mappedServices, existingContact)
            createdOrModifiedContact = await this.contactApi
                .createContactWithUser(currentUser, contactToCreate)
                .catch((e) => {
                    throw this.errorHandler.createErrorFromAny(e)
                })
                .then((x) => {
                    if (!x) throw this.errorHandler.createErrorWithMessage(`Unexpected response for created contact: ${x}`)
                    return x
                })
        }

        createdOrModifiedContact.services!.forEach((service) => this.contactsCache.put(service.id!, createdOrModifiedContact))
        return Promise.resolve(
            createdOrModifiedContact.services!.map(
                (service) => {

                    const subContacts = createdOrModifiedContact.subContacts?.filter((subContact) => subContact.services?.find((s) => s.serviceId == service.id) != undefined)

                    return this.mapper.toDomain({
                        ...this.enrichWithContactMetadata(service, createdOrModifiedContact),
                        subContactIds: subContacts?.map((subContact) => subContact.id!),
                        healthElementsIds: service.healthElementsIds ?? subContacts?.filter((subContact) => subContact.healthElementId)?.map((subContact) => subContact.healthElementId!),
                        formIds: !!subContacts ? subContacts.filter((subContact) => subContact.formId).map((subContact) => subContact.formId!) : service.formIds
                    })!;
                }
            )
        )
    }

    private _countHierarchyOfDataSamples(currentCount: number, serviceIndex: number, services: Array<ServiceDto>): number {
        if (serviceIndex >= services.length) {
            return currentCount
        }

        let currentService = services[serviceIndex]
        let servicesToSum = !!currentService.content ? Object.values(currentService.content).filter((element) => isNotEmpty(element?.compoundValue)) : []
        let servicesCount = sumOf(servicesToSum, (input) => this._countHierarchyOfDataSamples(0, 0, input.compoundValue!))

        return this._countHierarchyOfDataSamples(currentCount + servicesCount, serviceIndex + 1, services)
    }

    private _createPotentialSubContactsForHealthElements(services: Array<ServiceDto>, currentUser: UserDto): Promise<SubContact[]> {
        return Promise.all(services.filter((service) => service.healthElementsIds != undefined && service.healthElementsIds.length > 0)).then(
            (servicesWithHe) => {
                return servicesWithHe.length > 0
                    ? this._checkAndRetrieveProvidedHealthElements(
                        servicesWithHe.flatMap((service) => Array.from(service.healthElementsIds!.values())),
                        currentUser
                    ).then((heIds) => {
                        return heIds
                            .map((heId) => {
                                return {
                                    healthElement: heId,
                                    services: servicesWithHe
                                        .filter((s) => s.healthElementsIds!.find((servHeId) => servHeId == heId))
                                        .map((s) => new ServiceLink({serviceId: s.id!})),
                                }
                            })
                            .map(
                                ({healthElement, services}) =>
                                    new SubContact({
                                        healthElementId: healthElement,
                                        services: services,
                                    })
                            )
                    })
                    : []
            }
        )
    }

    private async _checkAndRetrieveProvidedHealthElements(healthElementIds: Array<string>, currentUser: UserDto): Promise<Array<string>> {
        if (healthElementIds.length == 0) {
            return []
        }

        const distinctIds = Array.from(new Set(healthElementIds).values())
        return await this.healthElementApi.getHealthElementsWithUser(currentUser, new ListOfIds({ids: distinctIds})).then((healthElements) => {
            const foundIds = (healthElements ?? []).map((he) => he.id!)
            if (healthElements.length < distinctIds.length) {
                const missingIds = Array.from(distinctIds.values()).filter((id) => foundIds.find((fId) => fId == id) == undefined)

                throw this.errorHandler.createErrorWithMessage(
                    `Health elements ${missingIds.join(',')} do not exist or user ${currentUser.id} may not access them`
                )
            }

            return foundIds
        })
    }

    private enrichWithContactMetadata(service: ServiceDto, contact: ContactDto) {
        return {
            ...service,
            secretForeignKeys: contact.secretForeignKeys,
            cryptedForeignKeys: contact.cryptedForeignKeys,
            delegations: contact.delegations,
            encryptionKeys: contact.encryptionKeys,
            securityMetadata: contact.securityMetadata,
        }
    }

    private async _getContactOfService(currentUser: UserDto, service: ServiceDto): Promise<[boolean, ContactDto?]> {
        let cachedContact = service.id ? this.contactsCache.getIfPresent(service.id) : undefined
        if (cachedContact) {
            return [true, cachedContact]
        } else {
            let contact: ContactDto | undefined = service.contactId ? await this.contactApi.getContactWithUser(currentUser, service.contactId) : undefined
            return [false, contact]
        }
    }

    async createContactDtoUsing(
        currentUser: UserDto,
        contactPatient: PatientDto,
        services: Array<ServiceDto>,
        existingContact?: ContactDto
    ): Promise<ContactDto> {
        const servicesToCreate = services
            .map((e) => {
                return {...e, modified: undefined}
            })

        let baseContact: ContactDto

        const subContacts = await this._createPotentialSubContactsForHealthElements(servicesToCreate, currentUser)

        if (existingContact != null) {
            baseContact = {
                ...existingContact,
                id: this.cryptoApi.primitives.randomUuid(),
                rev: undefined,
                modified: Date.now(),
            }
        } else {
            baseContact = await this.contactApi
                .newInstance(currentUser, contactPatient, new ContactDto({id: this.cryptoApi.primitives.randomUuid()}))
                .catch((e) => {
                    throw this.errorHandler.createErrorFromAny(e)
                })
        }

        return {
            ...baseContact,
            subContacts: subContacts,
            services: servicesToCreate.map((service) => {
                return {...service, formIds: undefined, healthElementsIds: undefined}
            }),
            openingDate: Math.min(
                ...servicesToCreate.filter((element) => element.openingDate != null || element.valueDate != null).map((e) => e.openingDate ?? e.valueDate!)
            ),
            closingDate: Math.max(
                ...servicesToCreate.filter((element) => element.closingDate != null || element.valueDate != null).map((e) => e.closingDate ?? e.valueDate!)
            ),
        }
    }

    async delete(id: string): Promise<string> {
        const deletedDataSampleId = (await this.deleteMany([id])).pop()
        if (deletedDataSampleId) {
            return deletedDataSampleId
        }

        throw this.errorHandler.createErrorWithMessage(`Could not delete data sample ${id}`)
    }

    deleteAttachment(id: string, documentId: string): Promise<string> {
        return Promise.resolve("");
    }

    async deleteMany(ids: Array<string>): Promise<Array<string>> {
        const currentUser = await this.userApi.getCurrentUser().catch((e) => {
            throw this.errorHandler.createErrorFromAny(e)
        })
        const existingContact = firstOrNull(await this._findContactsForDataSampleIds(currentUser, ids))
        if (existingContact == undefined) {
            throw this.errorHandler.createErrorWithMessage(`Could not find batch information of the data sample ${ids}`)
        }

        const existingServiceIds = existingContact.services?.map((e) => e.id)
        if (existingServiceIds == undefined || any(ids, (element) => element! in existingServiceIds!)) {
            throw this.errorHandler.createErrorWithMessage(`Could not find all data samples in same batch ${existingContact.id}`)
        }

        const contactPatient = await this._getPatientOfContact(currentUser, existingContact)
        if (contactPatient == undefined) {
            throw this.errorHandler.createErrorWithMessage(`Couldn't find patient related to batch of data samples ${existingContact.id}`)
        }

        const servicesToDelete = existingContact.services!.filter((element) => ids.includes(element.id!))

        const deletedServices = (await this.deleteServices(currentUser, contactPatient, servicesToDelete))?.services
            ?.filter((element) => ids.includes(element.id!))
            ?.filter((element) => element.endOfLife != null)
            ?.map((e) => e.id!)

        if (deletedServices == undefined) {
            throw this.errorHandler.createErrorWithMessage(`Could not delete data samples ${ids}`)
        }

        return Promise.resolve(deletedServices)
    }

    private async deleteServices(user: UserDto, patient: PatientDto, services: Array<ServiceDto>): Promise<ContactDto | undefined> {
        const currentTime = Date.now()
        const contactToDeleteServices = await this.contactApi
            .newInstance(
                user,
                patient,
                new ContactDto({
                    id: this.cryptoApi.primitives.randomUuid(),
                    services: services.map(
                        (service) =>
                            new ServiceDto({
                                id: service.id,
                                created: service.created,
                                modified: currentTime,
                                endOfLife: currentTime,
                            })
                    ),
                })
            )
            .catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })

        return this.contactApi.createContactWithUser(user, contactToDeleteServices).then((x) => {
            if (!x) throw this.errorHandler.createErrorWithMessage(`Unexpected response for created contact: ${x}`)
            return x
        })
    }

    private async _findContactsForDataSampleIds(currentUser: UserDto, serviceIds: Array<string>): Promise<Array<ContactDto>> {
        throw "TODO"
        /*const cachedContacts = this.contactsCache.getAllPresent(serviceIds)
        const serviceIdsToSearch = serviceIds.filter((element) => Object.keys(cachedContacts).find((key) => key == element) == undefined)

        if (serviceIdsToSearch.length > 0) {
            const notCachedContacts = (
                (await this.contactApi
                    .filterByWithUser(
                        currentUser,
                        undefined,
                        serviceIdsToSearch.length,
                        new FilterChainContact({
                            filter: new ContactByServiceIdsFilter({ ids: serviceIdsToSearch }),
                        })
                    )
                    .catch((e) => {
                        throw this.errorHandler.createErrorFromAny(e)
                    })) as PaginatedListContact
            ).rows

            if (notCachedContacts == undefined) {
                throw this.errorHandler.createErrorWithMessage(`Couldn't find batches linked to data samples ${serviceIdsToSearch}`)
            }

            // Caching
            notCachedContacts.forEach((contact) => {
                contact.services
                    ?.filter((service) => service.id != undefined && serviceIdsToSearch.includes(service.id))
                    .forEach((service) => this.contactsCache.put(service.id!, contact))
            })

            return [...Object.values(cachedContacts), ...notCachedContacts]
        } else {
            return Object.values(cachedContacts)
        }*/
    }

    private async _getPatientOfContact(currentUser: UserDto, contactDto: ContactDto): Promise<PatientDto | undefined> {
        const patientId = (await this.contactApi.decryptPatientIdOf(contactDto))[0]
        if (patientId) {
            return this.patientApi.getPatientWithUser(currentUser, patientId)
        } else {
            return undefined
        }
    }

    async extractPatientId(service: DSService): Promise<string | undefined> {
        return (await this.cryptoApi.xapi.owningEntityIdsOf({ entity: this.mapper.toDto(service)!, type: 'Contact' }, undefined))[0]
    }

    filterBy(filter: Filter<DSService>, nextServiceId?: string, limit?: number): Promise<PaginatedList<DSService>> {
        throw "TODO"
    }

    async get(id: string): Promise<DSService> {
        return Promise.resolve(this.mapper.toDomain(await this._getServiceFromICure(id))!)
    }

    private async _getServiceFromICure(serviceId: string): Promise<ServiceDto> {
        const currentUser = await this.userApi.getCurrentUser().catch((e) => {
            throw this.errorHandler.createErrorFromAny(e)
        })

        return this.contactApi.getServiceWithUser(currentUser, serviceId)
    }


    getForPatient(patient: DSPatient): Promise<Array<DSService>> {
        throw "TODO"
    }

    async giveAccessTo(service: DSService, delegatedTo: string): Promise<DSService> {
        const currentUser = await this.userApi.getCurrentUser().catch((e) => {
            throw this.errorHandler.createErrorFromAny(e)
        })
        const mappedService = this.mapper.toDto(service)
        const dataOwnerId = this.dataOwnerApi.getDataOwnerIdOf(currentUser)
        const contactOfDataSample = (await this._getContactOfService(currentUser, mappedService))[1]

        if (contactOfDataSample == undefined)
            throw this.errorHandler.createErrorWithMessage(
                `Could not find the batch of the service ${mappedService.id}. User ${currentUser.id} may not have access to it.`
            )

        const updatedContact = await this.contactApi.shareWith(delegatedTo, contactOfDataSample)

        if (updatedContact == undefined || updatedContact.services == undefined) {
            throw this.errorHandler.createErrorWithMessage(`Impossible to give access to ${delegatedTo} to data sample ${mappedService.id} information`)
        }

        const subContacts = updatedContact.subContacts?.filter((subContact) => subContact.services?.find((s) => s.serviceId == mappedService.id) != undefined)

        return this.mapper.toDomain({
            ...this.enrichWithContactMetadata(updatedContact.services.find((service) => service.id == service.id)!, updatedContact),
            subContactIds: subContacts?.map((subContact) => subContact.id!),
            healthElementsIds: mappedService.healthElementsIds ?? subContacts?.filter((subContact) => subContact.healthElementId)?.map((subContact) => subContact.healthElementId!),
            formIds: !!subContacts ? subContacts.filter((subContact) => subContact.formId).map((subContact) => subContact.formId!) : mappedService.formIds
        })!
    }

    matchBy(filter: Filter<DSService>): Promise<Array<string>> {
        throw "TODO"
    }

    subscribeToServiceEvents(eventTypes: ("CREATE" | "UPDATE" | "DELETE")[], filter: Filter<DSService>, eventFired: (service: DSService) => Promise<void>, options?: {
        connectionMaxRetry?: number;
        connectionRetryIntervalMs?: number
    }): Promise<Connection> {
        throw "TODO"
    }

    // getAttachmentContent(id: string, documentId: string, attachmentId: string): Promise<ArrayBuffer> {
    //     return Promise.resolve(undefined);
    // }
    //
    // getAttachmentDocument(id: string, documentId: string): Promise<Document> {
    //     return Promise.resolve(undefined);
    // }
    //
    // setAttachment(id: string, body: ArrayBuffer, documentName?: string, documentVersion?: string, documentExternalUuid?: string, documentLanguage?: string): Promise<Document> {
    //     return Promise.resolve(undefined);
    // }
}
