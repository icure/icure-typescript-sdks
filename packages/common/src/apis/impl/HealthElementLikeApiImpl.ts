import { PaginatedList } from '../../models/PaginatedList.model'
import { HealthElementLikeApi } from '../HealthElementLikeApi'
import { Connection, ConnectionImpl, FilterChainHealthElement, HealthElement, IccAuthApi, IccCryptoXApi, IccHelementXApi, IccPatientXApi, IccUserXApi, Patient, subscribeToEntityEvents, SubscriptionOptions, User } from '@icure/api'
import { Mapper } from '../Mapper'
import { ErrorHandler } from '../../services/ErrorHandler'
import { firstOrNull } from '../../utils/functionalUtils'
import { IccDataOwnerXApi } from '@icure/api/icc-x-api/icc-data-owner-x-api'
import { forceUuid } from '../../utils/uuidUtils'
import { NoOpFilter } from '../../filters/dsl/filterDsl'
import { FilterMapper } from '../../mappers/Filter.mapper'
import { HealthElementFilter } from '../../filters/dsl/HealthElementFilterDsl'
import { CommonApi } from '../CommonApi'
import { toPaginatedList } from '../../mappers/PaginatedList.mapper'
import { iccRestApiPath } from '@icure/api/icc-api/api/IccRestApiPath'
import { CommonFilter } from '../../filters/filters'
import { SubscriptionOptions } from '@icure/api/icc-x-api/utils'

export class HealthElementLikeApiImpl<DSHealthElement, DSPatient> implements HealthElementLikeApi<DSHealthElement, DSPatient> {
    constructor(
        private readonly healthElementMapper: Mapper<DSHealthElement, HealthElement>,
        private readonly patientMapper: Mapper<DSPatient, Patient>,
        private readonly errorHandler: ErrorHandler,
        private readonly heApi: IccHelementXApi,
        private readonly userApi: IccUserXApi,
        private readonly patientApi: IccPatientXApi,
        private readonly dataOwnerApi: IccDataOwnerXApi,
        private readonly cryptoApi: IccCryptoXApi,
        private readonly authApi: IccAuthApi,
        private readonly basePath: string,
        private readonly api: CommonApi,
    ) {}

    async createOrModify(healthElement: DSHealthElement, patientId?: string): Promise<DSHealthElement> {
        const createdOrModifiedHealthElement = firstOrNull(await this.createOrModifyMany([healthElement], patientId))

        if (createdOrModifiedHealthElement) {
            return createdOrModifiedHealthElement
        }

        throw this.errorHandler.createErrorWithMessage(`Could not create or modify health element`)
    }

    async createOrModifyMany(healthElement: Array<DSHealthElement>, patientId?: string): Promise<Array<DSHealthElement>> {
        const mappedHealthElements = healthElement.map((he) => this.healthElementMapper.toDto(he))

        const heToCreate = mappedHealthElements.filter((he) => !he.rev)
        const heToUpdate = mappedHealthElements.filter((he) => !!he.rev)

        const currentUser = await this.userApi.getCurrentUser().catch((e) => {
            throw this.errorHandler.createErrorFromAny(e)
        })

        const patient = patientId
            ? await this.patientApi.getPatientWithUser(currentUser, patientId).catch((e) => {
                  throw this.errorHandler.createErrorFromAny(e)
              })
            : undefined

        if (!heToUpdate.every((he) => he.id != null && forceUuid(he.id))) {
            throw this.errorHandler.createErrorWithMessage('Error while updating: HealthElement id should be provided as an UUID v4 (String)')
        }

        if (!patient && heToCreate.length > 0) {
            throw this.errorHandler.createErrorWithMessage('Error while creating: patientId should be provided to create new healthcare elements')
        }

        const hesCreated = await Promise.all(heToCreate.map((he) => this.heApi.newInstance(currentUser, patient, he, { confidential: true })))
            .then((healthElementsToCreate) => this.heApi.createHealthElementsWithUser(currentUser, healthElementsToCreate))
            .catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })
        const hesUpdated = await this.heApi.modifyHealthElementsWithUser(currentUser, heToUpdate).catch((e) => {
            throw this.errorHandler.createErrorFromAny(e)
        })

        return [...hesCreated, ...hesUpdated].map((he) => this.healthElementMapper.toDomain(he))
    }

    async delete(id: string): Promise<string> {
        const deletedHeRev = firstOrNull(
            await this.heApi.deleteHealthElements(id).catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            }),
        )?.rev
        if (deletedHeRev) {
            return deletedHeRev
        }
        throw this.errorHandler.createErrorWithMessage(`An error occurred when deleting this HealthElement. Id: ${id}`)
    }

    async filterBy(filter: CommonFilter<HealthElement>, nextHealthElementId?: string, limit?: number): Promise<PaginatedList<DSHealthElement>> {
        if (NoOpFilter.isNoOp(filter)) {
            return PaginatedList.empty()
        }

        const currentUser = (await this.userApi.getCurrentUser().catch((e) => {
            throw this.errorHandler.createErrorFromAny(e)
        })) as User

        return toPaginatedList(
            await this.heApi
                .filterByWithUser(
                    currentUser,
                    nextHealthElementId,
                    limit,
                    new FilterChainHealthElement({
                        filter: FilterMapper.toAbstractFilterDto<HealthElement>(filter, 'HealthElement'),
                    }),
                )
                .catch((e) => {
                    throw this.errorHandler.createErrorFromAny(e)
                }),
            this.healthElementMapper.toDomain,
        )!
    }

    async get(id: string): Promise<DSHealthElement> {
        const currentUser = await this.userApi.getCurrentUser().catch((e) => {
            throw this.errorHandler.createErrorFromAny(e)
        })
        return this.healthElementMapper.toDomain(
            await this.heApi.getHealthElementWithUser(currentUser, id).catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            }),
        )
    }

    async getAllForPatient(patient: DSPatient): Promise<Array<DSHealthElement>> {
        const user = await this.userApi.getCurrentUser().catch((e) => {
            throw this.errorHandler.createErrorFromAny(e)
        })
        if (!user) {
            throw this.errorHandler.createErrorWithMessage('There is no user currently logged in. You must call this method from an authenticated MedTechApi.')
        }
        const dataOwnerId = this.dataOwnerApi.getDataOwnerIdOf(user)
        if (!dataOwnerId) {
            throw this.errorHandler.createErrorWithMessage('The current user is not a data owner. You must been either a patient, a device or a healthcare professional to call this method.')
        }

        const filter = await new HealthElementFilter(this.api, this.patientMapper).forDataOwner(dataOwnerId).forPatients([patient]).build()

        return await this.concatenateFilterResults(filter)
    }

    async concatenateFilterResults(filter: CommonFilter<HealthElement>, nextId?: string | undefined, limit?: number | undefined, accumulator: Array<DSHealthElement> = []): Promise<Array<DSHealthElement>> {
        const paginatedHealthElements = await this.filterBy(filter, nextId, limit)
        return !paginatedHealthElements.nextKeyPair?.startKeyDocId ? accumulator.concat(paginatedHealthElements.rows ?? []) : this.concatenateFilterResults(filter, paginatedHealthElements.nextKeyPair.startKeyDocId, limit, accumulator.concat(paginatedHealthElements.rows ?? []))
    }

    async giveAccessTo(healthElement: DSHealthElement, delegatedTo: string): Promise<DSHealthElement> {
        const shared = await this.heApi.shareWith(delegatedTo, this.healthElementMapper.toDto(healthElement))
        return this.healthElementMapper.toDomain(shared)
    }

    async matchBy(filter: CommonFilter<HealthElement>): Promise<Array<string>> {
        if (NoOpFilter.isNoOp(filter)) {
            return []
        } else {
            return this.heApi.matchHealthElementsBy(FilterMapper.toAbstractFilterDto<HealthElement>(filter, 'HealthElement')).catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })
        }
    }

    async subscribeToEvents(eventTypes: ('CREATE' | 'UPDATE')[], filter: CommonFilter<HealthElement>, eventFired: (dataSample: DSHealthElement) => Promise<void>, options?: SubscriptionOptions): Promise<Connection> {
        const currentUser = await this.userApi.getCurrentUser()

        return subscribeToEntityEvents(
            iccRestApiPath(this.basePath),
            this.authApi,
            'HealthElement',
            eventTypes,
            FilterMapper.toAbstractFilterDto(filter, 'HealthElement'),
            (event) => eventFired(this.healthElementMapper.toDomain(event)),
            options ?? {},
            async (encrypted) => (await this.heApi.decryptWithUser(currentUser, [encrypted]))[0],
        ).then((ws) => new ConnectionImpl(ws))
    }
}
