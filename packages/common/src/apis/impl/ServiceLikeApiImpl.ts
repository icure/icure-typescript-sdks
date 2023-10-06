import { PaginatedList } from '../../models/PaginatedList.model'
import { ServiceLikeApi } from '../ServiceLikeApi'
import { Mapper } from '../Mapper'
import {
    Connection,
    ConnectionImpl,
    Contact as ContactDto,
    ContactByServiceIdsFilter,
    Content,
    Document as DocumentDto,
    FilterChainContact,
    FilterChainService,
    IccAuthApi,
    IccContactXApi,
    IccCryptoXApi,
    IccHelementXApi,
    IccPatientXApi,
    IccUserXApi,
    ListOfIds,
    PaginatedListContact,
    Patient as PatientDto,
    Service,
    Service as ServiceDto,
    ServiceLink,
    SubContact,
    subscribeToEntityEvents,
    ua2hex,
    User as UserDto,
} from '@icure/api'
import { ErrorHandler } from '../../services/ErrorHandler'
import { any, distinctBy, firstOrNull, isNotEmpty, sumOf } from '../../utils/functionalUtils'
import { CachedMap } from '../../utils/cachedMap'
import { IccDataOwnerXApi } from '@icure/api/icc-x-api/icc-data-owner-x-api'
import { NoOpFilter, ServiceFilter } from '../../filters/dsl'
import { FilterMapper } from '../../mappers/Filter.mapper'
import { CommonApi } from '../CommonApi'
import { CommonFilter } from '../../filters/filters'
import { toPaginatedList } from '../../mappers/PaginatedList.mapper'
import { UtiDetector } from '../../utils/utiDetector'
import { extractDomainTypeTag } from '../../utils/domain'
import { iccRestApiPath } from '@icure/api/icc-api/api/IccRestApiPath'

export class ServiceLikeApiImpl<DSService, DSPatient, DSDocument> implements ServiceLikeApi<DSService, DSPatient, DSDocument> {
    private readonly contactsCache: CachedMap<ContactDto> = new CachedMap<ContactDto>(5 * 60, 10000)

    constructor(
        private readonly serviceMapper: Mapper<DSService, ServiceDto>,
        private readonly patientMapper: Mapper<DSPatient, PatientDto>,
        private readonly documentMapper: Mapper<DSDocument, DocumentDto>,
        private readonly errorHandler: ErrorHandler,
        private readonly userApi: IccUserXApi,
        private readonly contactApi: IccContactXApi,
        private readonly patientApi: IccPatientXApi,
        private readonly healthElementApi: IccHelementXApi,
        private readonly cryptoApi: IccCryptoXApi,
        private readonly dataOwnerApi: IccDataOwnerXApi,
        private readonly authApi: IccAuthApi,
        private readonly api: CommonApi,
        private readonly basePath: string,
    ) {}

    clearContactCache() {
        this.contactsCache.invalidateAll()
    }

    async createOrModifyFor(patientId: string, service: DSService): Promise<DSService> {
        const createdOrUpdatedDataSample = (await this.createOrModifyManyFor(patientId, [service]))[0]
        if (createdOrUpdatedDataSample) {
            return createdOrUpdatedDataSample
        }

        throw this.errorHandler.createErrorWithMessage(`Could not create / modify data sample ${JSON.stringify(service)} for patient ${patientId}`)
    }

    async createOrModifyManyFor(patientId: string, services: Array<DSService>): Promise<Array<DSService>> {
        return this._createOrModifyManyFor(
            patientId,
            services.map((service) => this.serviceMapper.toDto(service)),
        ).then((services) => services.map((service) => this.serviceMapper.toDomain(service)))
    }

    async delete(id: string): Promise<string> {
        const deletedDataSampleId = (await this.deleteMany([id])).pop()
        if (deletedDataSampleId) {
            return deletedDataSampleId
        }

        throw this.errorHandler.createErrorWithMessage(`Could not delete service ${id}`)
    }

    async deleteAttachment(id: string, documentId: string): Promise<string> {
        const currentUser = await this.userApi.getCurrentUser().catch((e) => {
            throw this.errorHandler.createErrorFromAny(e)
        })

        const existingContact = (await this._findContactsForServiceIds(currentUser, [id]))[0]
        if (existingContact == undefined) {
            throw this.errorHandler.createErrorWithMessage(`Could not find batch information of the service ${id}`)
        }

        const existingService = existingContact!.services!.find((s) => s.id == id)
        if (existingService == undefined || existingService.content == undefined) {
            throw this.errorHandler.createErrorWithMessage(`Could not find batch information of the service ${id}`)
        }

        const contactPatientId = (await this.contactApi.decryptPatientIdOf(existingContact!))[0]
        if (contactPatientId == undefined) {
            throw this.errorHandler.createErrorWithMessage(`Cannot set an attachment to a service not linked to a patient`)
        }

        const contentToDelete = Object.entries(existingService.content!).find(([_, content]) => content.documentId == documentId)?.[0]

        if (contentToDelete == undefined) {
            throw this.errorHandler.createErrorWithMessage(`Could not find attachment ${documentId} in the service ${id}`)
        }

        const updatedContent = Object.fromEntries(Object.entries(existingService.content!).filter(([key, _]) => key != contentToDelete!))

        await this._createOrModifyManyFor(contactPatientId, [
            {
                ...existingService,
                content: updatedContent,
            },
        ]).catch((e) => {
            throw this.errorHandler.createErrorFromAny(e)
        })
        // Do not actually delete existing `Document` entity: services are versioned

        return documentId
    }

    async deleteMany(ids: Array<string>): Promise<Array<string>> {
        const currentUser = await this.userApi.getCurrentUser().catch((e) => {
            throw this.errorHandler.createErrorFromAny(e)
        })
        const existingContact = firstOrNull(await this._findContactsForServiceIds(currentUser, ids))
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

    async extractPatientId(service: DSService): Promise<string | undefined> {
        return (await this.cryptoApi.xapi.owningEntityIdsOf({ entity: this.serviceMapper.toDto(service), type: 'Contact' }, undefined))[0]
    }

    async filterBy(filter: CommonFilter<ServiceDto>, nextServiceId?: string, limit?: number): Promise<PaginatedList<DSService>> {
        if (NoOpFilter.isNoOp(filter)) {
            return PaginatedList.empty()
        }
        const currentUser = await this.userApi.getCurrentUser().catch((e) => {
            throw this.errorHandler.createErrorFromAny(e)
        })
        const hcpId = (currentUser.healthcarePartyId || currentUser.patientId || currentUser.deviceId)!

        const paginatedListService = await this.contactApi
            .filterServicesBy(
                nextServiceId,
                limit,
                new FilterChainService({
                    filter: FilterMapper.toAbstractFilterDto(filter, 'Service'),
                }),
            )
            .then((paginatedServices) => this.contactApi.decryptServices(hcpId, paginatedServices.rows!).then((decryptedRows) => Object.assign(paginatedServices, { rows: decryptedRows })))
            .catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })
        return toPaginatedList(paginatedListService, this.serviceMapper.toDomain)!
    }

    async get(id: string): Promise<DSService> {
        return Promise.resolve(this.serviceMapper.toDomain(await this._getServiceFromICure(id))!)
    }

    async getForPatient(patient: DSPatient): Promise<Array<DSService>> {
        const user = await this.userApi.getCurrentUser().catch((e) => {
            throw this.errorHandler.createErrorFromAny(e)
        })
        if (!user) {
            throw this.errorHandler.createErrorWithMessage('There is no user currently logged in. You must call this method from an authenticated MedTechApi')
        }
        const dataOwnerId = this.dataOwnerApi.getDataOwnerIdOf(user)
        if (!dataOwnerId) {
            throw this.errorHandler.createErrorWithMessage('The current user is not a data owner. You must be either a patient, a device or a healthcare professional to call this method.')
        }

        const filter = await new ServiceFilter(this.api, this.patientMapper).forDataOwner(dataOwnerId).forPatients([patient]).build()

        return await this.concatenateFilterResults(filter)
    }

    async concatenateFilterResults(filter: CommonFilter<ServiceDto>, nextId?: string | undefined, limit?: number | undefined, accumulator: Array<DSService> = []): Promise<Array<DSService>> {
        const paginatedDataSamples = await this.filterBy(filter, nextId, limit)
        return !paginatedDataSamples.nextKeyPair?.startKeyDocId ? accumulator.concat(paginatedDataSamples.rows ?? []) : this.concatenateFilterResults(filter, paginatedDataSamples.nextKeyPair.startKeyDocId, limit, accumulator.concat(paginatedDataSamples.rows ?? []))
    }

    async giveAccessTo(service: DSService, delegatedTo: string): Promise<DSService> {
        return this.giveAccessToMany([service], delegatedTo).then((services) => services[0])
    }

    async giveAccessToMany(services: DSService[], delegatedTo: string): Promise<DSService[]> {
        if (!services.length) return []
        const currentUser = await this.userApi.getCurrentUser().catch((e) => {
            throw this.errorHandler.createErrorFromAny(e)
        })
        const mappedServices = services.map(this.serviceMapper.toDto)

        if (distinctBy(mappedServices, (s) => s.contactId).size > 1) {
            throw this.errorHandler.createErrorWithMessage('Only data samples of a same batch (with the same batchId) can be processed together')
        }
        if (distinctBy(mappedServices, (s) => s.id).size < services.length) {
            throw this.errorHandler.createErrorWithMessage('Some services have the same id')
        }

        const contactOfServices = (await this._getContactOfService(currentUser, mappedServices[0]))[1]

        if (!contactOfServices) throw this.errorHandler.createErrorWithMessage(`Could not find batch ${mappedServices[0].contactId}. User ${currentUser.id} may not have access to it.`)

        if (!mappedServices.every((s) => contactOfServices.services?.some((service) => service.id == s.id))) {
            throw this.errorHandler.createErrorWithMessage(`Batch for service ${mappedServices[0].id} does not contain all input services`)
        }

        let updatedContact: ContactDto
        if ((contactOfServices.services ?? []).every((cs) => mappedServices.some((is) => is.id == cs.id))) {
            // The request to share data includes all services of the batch

            updatedContact = await this.contactApi.shareWith(delegatedTo, contactOfServices).catch((e) => {
                this.contactsCache.invalidateAll(mappedServices.map((s) => s.id!))
                throw e
            })
        } else {
            // We have to share only some services of the batch: create new batch with only the services to share
            // TODO currently we need to get the patient...
            const patientId = await this.extractPatientId(services[0])
            if (!patientId) throw this.errorHandler.createErrorWithMessage(`Could not find patient id for service ${mappedServices[0].id}`)
            const existingPatient = await this.patientApi.getPatientWithUser(currentUser, patientId).catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })
            if (!existingPatient) throw this.errorHandler.createErrorWithMessage(`Could not find patient with id ${patientId}`)
            const contactToCreate = await this.createContactDtoUsing(currentUser, existingPatient, mappedServices, contactOfServices, true, [delegatedTo])
            updatedContact = await this.contactApi
                .createContactWithUser(currentUser, contactToCreate)
                .catch((e) => {
                    throw this.errorHandler.createErrorFromAny(e)
                })
                .then((x) => {
                    if (!x) throw this.errorHandler.createErrorWithMessage(`Unexpected response for created contact: ${x}`)
                    return x
                })
        }
        if (updatedContact == undefined || updatedContact.services == undefined) {
            this.contactsCache.invalidateAll(mappedServices.map((s) => s.id!))
            throw this.errorHandler.createErrorWithMessage(`Impossible to give access to ${delegatedTo} to services of batch ${contactOfServices.id}`)
        }

        /*TODO
         * currently we are using the cache to decide if we can modify a contact in place without the need to create
         * a new one when modifying services. Should we really cache here, regardless of whether the contact was already
         * cached?
         */
        ;(updatedContact.services ?? []).forEach((s) => {
            this.contactsCache.put(s.id!, updatedContact)
        })

        const res: DSService[] = []
        for (const updatedService of updatedContact.services) {
            const originalService = mappedServices.find((s) => s.id == updatedService.id)!
            const subContactsForService = updatedContact.subContacts?.filter((subContact) => subContact.services?.find((s) => s.serviceId == updatedService.id!) != undefined)
            const documentIds = Object.entries(updatedService.content ?? {}).flatMap(([_, value]) => (value.documentId ? [value.documentId!] : []))
            // Now also share documents of the services
            if (documentIds.length) {
                const documents = Object.fromEntries((await this.api.baseApi.documentApi.getDocuments({ ids: documentIds })).map((x) => [x.id!, x]))
                for (const docId of documentIds) {
                    try {
                        await this.api.baseApi.documentApi.shareWith(delegatedTo, documents[docId])
                    } catch (e) {
                        console.error(`Failed to give access to attachment with document id ${docId}`, e)
                    }
                }
            }

            res.push(
                this.serviceMapper.toDomain({
                    ...this.enrichWithContactMetadata(updatedContact.services.find((service) => service.id == service.id)!, updatedContact),
                    subContactIds: subContactsForService?.map((subContact) => subContact.id!),
                    healthElementsIds: originalService.healthElementsIds ?? subContactsForService?.filter((subContact) => subContact.healthElementId)?.map((subContact) => subContact.healthElementId!),
                    formIds: !!subContactsForService ? subContactsForService.filter((subContact) => subContact.formId).map((subContact) => subContact.formId!) : originalService.formIds,
                })!,
            )
        }
        return res
    }

    matchBy(filter: CommonFilter<ServiceDto>): Promise<Array<string>> {
        if (NoOpFilter.isNoOp(filter)) {
            return Promise.resolve([])
        } else {
            return this.contactApi.matchServicesBy(FilterMapper.toAbstractFilterDto(filter, 'Service')).catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })
        }
    }

    async subscribeToEvents(
        eventTypes: ('CREATE' | 'UPDATE' | 'DELETE')[],
        filter: CommonFilter<ServiceDto>,
        eventFired: (service: DSService) => Promise<void>,
        options?: {
            connectionMaxRetry?: number
            connectionRetryIntervalMs?: number
        },
    ): Promise<Connection> {
        const currentUser = await this.userApi.getCurrentUser()
        return subscribeToEntityEvents(
            iccRestApiPath(this.basePath),
            this.authApi,
            'Service',
            eventTypes,
            FilterMapper.toAbstractFilterDto(filter, 'Service'),
            (event) => eventFired(this.serviceMapper.toDomain(event)),
            options ?? {},
            async (encrypted: ServiceDto) => (await this.contactApi.decryptServices(currentUser.healthcarePartyId!, [encrypted]))[0],
        ).then((ws) => new ConnectionImpl(ws))
    }

    async setAttachment(id: string, body: ArrayBuffer, documentName?: string, documentVersion?: string, documentExternalUuid?: string, documentLanguage?: string): Promise<DSDocument> {
        try {
            const currentUser = await this.userApi.getCurrentUser().catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })
            const existingService = this.serviceMapper.toDto(await this.get(id))

            const [, batchOfService] = await this._getContactOfService(currentUser, existingService)
            if (batchOfService == undefined) {
                throw this.errorHandler.createErrorWithMessage(`Could not find the batch of service ${id}`)
            }

            const patientIdOfBatch = (await this.contactApi.decryptPatientIdOf(batchOfService))[0]
            if (patientIdOfBatch == undefined) {
                throw this.errorHandler.createErrorWithMessage(`Can not set an attachment to a service not linked to a patient`)
            }

            const dataOwnersWithAccessInfo = await this.contactApi.getDataOwnersWithAccessTo(batchOfService)
            if (dataOwnersWithAccessInfo.hasUnknownAnonymousDataOwners) {
                /*TODO
                 * We technically could just copy-paste the encryption metadata in the document in order to allow the
                 * operation anyway, but we first need to carefully consider the implications of doing so.
                 */
                throw this.errorHandler.createErrorWithMessage(`Could not determine all data owners with access to service with id ${id}. Cannot create attachment.`)
            }

            const documentToCreate = await this.api.baseApi.documentApi.newInstance(
                currentUser,
                undefined,
                new DocumentDto({
                    id: this.api.baseApi.cryptoApi.primitives.randomUuid(),
                    name: documentName,
                    version: documentVersion,
                    externalUuid: documentExternalUuid,
                    hash: ua2hex(await this.api.baseApi.cryptoApi.primitives.sha256(body)),
                    size: body.byteLength,
                }),
                {
                    additionalDelegates: dataOwnersWithAccessInfo.permissionsByDataOwnerId,
                },
            )

            const createdDocument = await this.api.baseApi.documentApi.createDocument(documentToCreate).catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })

            // Update data sample with documentId
            const contentIso = documentLanguage ?? 'en'
            const newDSContent = {
                ...existingService.content,
                [contentIso]: new Content({
                    ...(existingService.content?.[contentIso] ?? {}),
                    documentId: createdDocument.id,
                }),
            }
            await this._createOrModifyManyFor(patientIdOfBatch!, [
                {
                    ...existingService,
                    content: newDSContent,
                },
            ])
            // Do not delete existing `Document` entity, even if existing: services are versioned

            // Add attachment to document
            const mainUti = UtiDetector.getUtiFor(documentName)
            const docWithAttachment = await this.api.baseApi.documentApi.encryptAndSetDocumentAttachment(createdDocument, body, mainUti ? [mainUti] : undefined)

            return this.documentMapper.toDomain(docWithAttachment)
        } catch (e) {
            if (e instanceof Error) {
                throw this.errorHandler.createError(e)
            }
            throw e
        }
    }

    async getAttachmentContent(id: string, documentId: string): Promise<ArrayBuffer> {
        const documentOfAttachment = await this._getDataSampleAttachmentDocumentFromICure(id, documentId)

        return this.api.baseApi.documentApi.getAndDecryptDocumentAttachment(documentOfAttachment)
    }

    async getAttachmentDocument(id: string, documentId: string): Promise<DSDocument> {
        return this.documentMapper.toDomain(await this._getDataSampleAttachmentDocumentFromICure(id, documentId))
    }

    private async _createOrModifyManyFor(patientId: string, services: Array<ServiceDto>): Promise<Array<ServiceDto>> {
        if (services.length == 0) {
            return Promise.resolve([])
        }

        if (distinctBy(services, (ds) => ds.contactId).size > 1) {
            throw this.errorHandler.createErrorWithMessage('Only data samples of a same batch (with the same batchId) can be processed together')
        }

        // Arbitrary : 1 service = 1K
        if (this._countHierarchyOfDataSamples(0, 0, services) > 1000) {
            throw this.errorHandler.createErrorWithMessage("Too many data samples to process. Can't process more than 1000 data samples in the same batch")
        }

        const currentUser = await this.userApi.getCurrentUser()
        const [contactCached, existingContact] = await this._getContactOfService(currentUser, services[0])

        const contactPatientId = existingContact ? (await this.contactApi.decryptPatientIdOf(existingContact))[0] : undefined

        if (existingContact != null && contactPatientId == null) {
            throw this.errorHandler.createErrorWithMessage("Can't update a batch of data samples that is not linked to any patient yet.")
        }

        if (contactPatientId != null && contactPatientId != patientId) {
            throw this.errorHandler.createErrorWithMessage("Can't update the patient of a batch of data samples. Delete those samples and create new ones")
        }

        let createdOrModifiedContact: ContactDto

        if (contactCached && existingContact != null) {
            const modifiedServices = services.map((service) => {
                return {
                    ...service,
                    formIds: undefined,
                    healthElementsIds: undefined,
                }
            })
            const existingUnmodifiedServices = (existingContact.services ?? []).filter((service) => !modifiedServices.some((modifiedService) => modifiedService.id === service.id))
            const allUpdatedServices = [...existingUnmodifiedServices, ...modifiedServices]
            const subContacts = await this._createPotentialSubContactsForHealthElements(services, currentUser)

            const contactToModify = {
                ...existingContact,
                services: allUpdatedServices,
                subContacts: subContacts,
                openingDate: Math.min(...allUpdatedServices.filter((element) => element.openingDate != null || element.valueDate != null).map((e) => e.openingDate ?? e.valueDate!)),
                closingDate: Math.max(...allUpdatedServices.filter((element) => element.closingDate != null || element.valueDate != null).map((e) => e.closingDate ?? e.valueDate!)),
            }

            createdOrModifiedContact = await this.contactApi.modifyContactWithUser(currentUser, contactToModify).catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })
        } else {
            const existingPatient = await this.patientApi.getPatientWithUser(currentUser, patientId).catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })
            const contactToCreate = await this.createContactDtoUsing(currentUser, existingPatient, services, existingContact, false, [])
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

        /*TODO
         * currently we are using the cache to decide if we can modify a contact in place without the need to create
         * a new one when modifying services. Should we really cache here, regardless of whether the contact was already
         * cached?
         */
        createdOrModifiedContact.services!.forEach((service) => this.contactsCache.put(service.id!, createdOrModifiedContact))
        return Promise.resolve(
            createdOrModifiedContact.services!.map((service) => {
                const subContacts = createdOrModifiedContact.subContacts?.filter((subContact) => subContact.services?.find((s) => s.serviceId == service.id) != undefined)

                return {
                    ...this.enrichWithContactMetadata(service, createdOrModifiedContact),
                    subContactIds: subContacts?.map((subContact) => subContact.id!),
                    healthElementsIds: service.healthElementsIds ?? subContacts?.filter((subContact) => subContact.healthElementId)?.map((subContact) => subContact.healthElementId!),
                    formIds: !!subContacts ? subContacts.filter((subContact) => subContact.formId).map((subContact) => subContact.formId!) : service.formIds,
                }
            }),
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
        return Promise.all(services.filter((service) => service.healthElementsIds != undefined && service.healthElementsIds.length > 0)).then((servicesWithHe) => {
            return servicesWithHe.length > 0
                ? this._checkAndRetrieveProvidedHealthElements(
                      servicesWithHe.flatMap((service) => Array.from(service.healthElementsIds!.values())),
                      currentUser,
                  ).then((heIds) => {
                      return heIds
                          .map((heId) => {
                              return {
                                  healthElement: heId,
                                  services: servicesWithHe.filter((s) => s.healthElementsIds!.find((servHeId) => servHeId == heId)).map((s) => new ServiceLink({ serviceId: s.id! })),
                              }
                          })
                          .map(
                              ({ healthElement, services }) =>
                                  new SubContact({
                                      healthElementId: healthElement,
                                      services: services,
                                  }),
                          )
                  })
                : []
        })
    }

    private async _checkAndRetrieveProvidedHealthElements(healthElementIds: Array<string>, currentUser: UserDto): Promise<Array<string>> {
        if (healthElementIds.length == 0) {
            return []
        }

        const distinctIds = Array.from(new Set(healthElementIds).values())
        return await this.healthElementApi.getHealthElementsWithUser(currentUser, new ListOfIds({ ids: distinctIds })).then((healthElements) => {
            const foundIds = (healthElements ?? []).map((he) => he.id!)
            if (healthElements.length < distinctIds.length) {
                const missingIds = Array.from(distinctIds.values()).filter((id) => foundIds.find((fId) => fId == id) == undefined)

                throw this.errorHandler.createErrorWithMessage(`Health elements ${missingIds.join(',')} do not exist or user ${currentUser.id} may not access them`)
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
            contactId: contact.id,
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

    private async createContactDtoUsing(currentUser: UserDto, contactPatient: PatientDto, services: Array<ServiceDto>, existingContact: ContactDto | undefined, requiresNewMetadata: boolean, newDelegates: string[]): Promise<ContactDto> {
        const servicesToCreate = services.map((e) => {
            return { ...e, modified: undefined }
        })

        let baseContact: ContactDto
        let dataOwnersWithAccess: Awaited<ReturnType<typeof this.contactApi.getDataOwnersWithAccessTo>>

        const subContacts = await this._createPotentialSubContactsForHealthElements(servicesToCreate, currentUser)

        if (existingContact != null) {
            baseContact = {
                ...existingContact,
                id: this.cryptoApi.primitives.randomUuid(),
                rev: undefined,
                modified: Date.now(),
            }
            delete baseContact.delegations
            delete baseContact.encryptionKeys
            delete baseContact.secretForeignKeys
            delete baseContact.cryptedForeignKeys
            delete baseContact.securityMetadata
            dataOwnersWithAccess = await this.contactApi.getDataOwnersWithAccessTo(existingContact)
        } else {
            baseContact = { id: this.cryptoApi.primitives.randomUuid() }
            dataOwnersWithAccess = { permissionsByDataOwnerId: {}, hasUnknownAnonymousDataOwners: false }
        }
        // TODO If requiresNewMetadata is false we may consider to instead keep the existing metadata
        if (dataOwnersWithAccess.hasUnknownAnonymousDataOwners) throw this.errorHandler.createErrorWithMessage(`Contact ${baseContact.id} is accessible to anonymous data owners that are not known by the current user. Can't modify services of the contact.`)
        const additionalDelegates = { ...dataOwnersWithAccess.permissionsByDataOwnerId }
        delete additionalDelegates[this.dataOwnerApi.getDataOwnerIdOf(currentUser)]
        newDelegates.forEach((d) => {
            additionalDelegates[d] = 'WRITE'
        })
        return await this.contactApi
            .newInstance(
                currentUser,
                contactPatient,
                new ContactDto({
                    ...baseContact,
                    subContacts: subContacts,
                    services: servicesToCreate.map((service) => {
                        return { ...service, formIds: undefined, healthElementsIds: undefined }
                    }),
                    openingDate: Math.min(...servicesToCreate.filter((element) => element.openingDate != null || element.valueDate != null).map((e) => e.openingDate ?? e.valueDate!)),
                    closingDate: Math.max(...servicesToCreate.filter((element) => element.closingDate != null || element.valueDate != null).map((e) => e.closingDate ?? e.valueDate!)),
                }),
                { additionalDelegates },
            )
            .catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })
    }

    private async deleteServices(user: UserDto, patient: PatientDto, services: Array<ServiceDto>): Promise<ContactDto | undefined> {
        const currentTime = Date.now()
        const contactToDeleteServices = await this.contactApi
            .newInstance(
                user,
                patient,
                new ContactDto({
                    id: this.cryptoApi.primitives.randomUuid(),
                    services: services.map((service) => {
                        const domainTypeTag = extractDomainTypeTag(service.tags)
                        return new ServiceDto({
                            id: service.id,
                            created: service.created,
                            modified: currentTime,
                            endOfLife: currentTime,
                            tags: domainTypeTag ? [domainTypeTag] : undefined,
                        })
                    }),
                }),
            )
            .catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })

        return this.contactApi.createContactWithUser(user, contactToDeleteServices).then((x) => {
            if (!x) throw this.errorHandler.createErrorWithMessage(`Unexpected response for created contact: ${x}`)
            return x
        })
    }

    private async _findContactsForServiceIds(currentUser: UserDto, serviceIds: Array<string>): Promise<Array<ContactDto>> {
        const cachedContacts = this.contactsCache.getAllPresent(serviceIds)
        const dataSampleIdsToSearch = serviceIds.filter((element) => Object.keys(cachedContacts).find((key) => key == element) == undefined)

        if (dataSampleIdsToSearch.length > 0) {
            const notCachedContacts = (
                (await this.contactApi
                    .filterByWithUser(
                        currentUser,
                        undefined,
                        dataSampleIdsToSearch.length,
                        new FilterChainContact({
                            filter: new ContactByServiceIdsFilter({ ids: dataSampleIdsToSearch }),
                        }),
                    )
                    .catch((e) => {
                        throw this.errorHandler.createErrorFromAny(e)
                    })) as PaginatedListContact
            ).rows

            if (notCachedContacts == undefined) {
                throw this.errorHandler.createErrorWithMessage(`Couldn't find batches linked to data samples ${dataSampleIdsToSearch}`)
            }

            // Caching
            /*TODO
             * currently we are using the cache to decide if we can modify a contact in place without the need to create
             * a new one when modifying services. Should we really cache here then?
             */
            notCachedContacts.forEach((contact) => {
                contact.services?.filter((service) => service.id != undefined && dataSampleIdsToSearch.includes(service.id)).forEach((service) => this.contactsCache.put(service.id!, contact))
            })

            return [...Object.values(cachedContacts), ...notCachedContacts]
        } else {
            return Object.values(cachedContacts)
        }
    }

    private async _getPatientOfContact(currentUser: UserDto, contactDto: ContactDto): Promise<PatientDto | undefined> {
        const patientId = (await this.contactApi.decryptPatientIdOf(contactDto))[0]
        if (patientId) {
            return this.patientApi.getPatientWithUser(currentUser, patientId)
        } else {
            return undefined
        }
    }

    private async _getServiceFromICure(serviceId: string): Promise<ServiceDto> {
        const currentUser = await this.userApi.getCurrentUser().catch((e) => {
            throw this.errorHandler.createErrorFromAny(e)
        })

        return this.contactApi.getServiceWithUser(currentUser, serviceId)
    }

    private async _getDataSampleAttachmentDocumentFromICure(serviceId: string, documentId: string): Promise<DocumentDto> {
        const existingService = await this._getServiceFromICure(serviceId)
        if (Object.entries(existingService.content ?? {}).find(([, content]) => content.documentId == documentId) == null) {
            throw this.errorHandler.createErrorWithMessage(`Id ${documentId} does not reference any document in the data sample ${serviceId}`)
        }

        return this.api.baseApi.documentApi.getDocument(documentId)
    }
}
