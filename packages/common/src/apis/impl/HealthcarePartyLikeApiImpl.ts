import { PaginatedList } from '../../models/PaginatedList.model'
import { HealthcarePartyLikeApi } from '../HealthcarePartyLikeApi'
import { ErrorHandler } from '../../services/ErrorHandler'
import { AbstractFilter, Connection, ConnectionImpl, FilterChainHealthcareParty, HealthcareParty, IccAuthApi, IccHcpartyXApi, subscribeToEntityEvents, SubscriptionOptions } from '@icure/api'
import { Mapper } from '../Mapper'
import { firstOrNull } from '../../utils/functionalUtils'
import { NoOpFilter } from '../../filters/dsl'
import { FilterMapper } from '../../mappers/Filter.mapper'
import { toPaginatedList } from '../../mappers/PaginatedList.mapper'
import { iccRestApiPath } from '@icure/api/icc-api/api/IccRestApiPath'
import { CommonFilter } from '../../filters/filters'

export class HealthcarePartyLikeApiImpl<DSHealthcareParty> implements HealthcarePartyLikeApi<DSHealthcareParty> {
    constructor(
        private readonly mapper: Mapper<DSHealthcareParty, HealthcareParty>,
        private readonly errorHandler: ErrorHandler,
        private readonly healthcarePartyApi: IccHcpartyXApi,
        private readonly authApi: IccAuthApi,
        private readonly basePath: string,
    ) {}

    async createOrModify(healthcareParty: DSHealthcareParty): Promise<DSHealthcareParty> {
        const mappedHealthcareParty = this.mapper.toDto(healthcareParty)

        const createdOrModifiedHealthcareParty = mappedHealthcareParty.rev
            ? await this.healthcarePartyApi.modifyHealthcareParty(mappedHealthcareParty).catch((e) => {
                  throw this.errorHandler.createErrorFromAny(e)
              })
            : await this.healthcarePartyApi.createHealthcareParty(mappedHealthcareParty).catch((e) => {
                  throw this.errorHandler.createErrorFromAny(e)
              })

        if (createdOrModifiedHealthcareParty) {
            return this.mapper.toDomain(createdOrModifiedHealthcareParty)!
        }

        throw this.errorHandler.createErrorWithMessage(`Could not create or modify healthcare party ${mappedHealthcareParty.id}`)
    }

    async delete(id: string): Promise<string> {
        const deletedHcpRev = firstOrNull(
            await this.healthcarePartyApi.deleteHealthcareParties(id).catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            }),
        )?.rev
        if (deletedHcpRev) {
            return deletedHcpRev
        }
        throw this.errorHandler.createErrorWithMessage(`Could not delete healthcare party ${id}`)
    }

    async filterBy(filter: CommonFilter<HealthcareParty>, nextHealthcarePartyId?: string, limit?: number): Promise<PaginatedList<DSHealthcareParty>> {
        if (NoOpFilter.isNoOp(filter)) {
            return PaginatedList.empty()
        } else {
            return toPaginatedList(
                await this.healthcarePartyApi
                    .filterHealthPartiesBy(
                        nextHealthcarePartyId,
                        limit,
                        new FilterChainHealthcareParty({
                            filter: FilterMapper.toAbstractFilterDto<HealthcareParty>(filter, 'HealthcareParty'),
                        }),
                    )
                    .catch((e) => {
                        throw this.errorHandler.createErrorFromAny(e)
                    }),
                this.mapper.toDomain,
            )!
        }
    }

    async get(id: string): Promise<DSHealthcareParty> {
        return this.mapper.toDomain(
            await this.healthcarePartyApi.getHealthcareParty(id, false).catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            }),
        )
    }

    async matchBy(filter: CommonFilter<HealthcareParty>): Promise<Array<string>> {
        if (NoOpFilter.isNoOp(filter)) {
            return []
        } else {
            return await this.healthcarePartyApi.matchHealthcarePartiesBy(FilterMapper.toAbstractFilterDto<HealthcareParty>(filter, 'HealthcareParty')).catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })
        }
    }

    async subscribeToEvents(eventTypes: ('CREATE' | 'UPDATE' | 'DELETE')[], filter: CommonFilter<HealthcareParty>, eventFired: (hcp: DSHealthcareParty) => Promise<void>, options?: SubscriptionOptions): Promise<Connection> {
        return subscribeToEntityEvents(iccRestApiPath(this.basePath), this.authApi, 'HealthcareParty', eventTypes, FilterMapper.toAbstractFilterDto(filter, 'HealthcareParty'), (event: HealthcareParty) => eventFired(this.mapper.toDomain(event)), options ?? {}).then(
            (ws) => new ConnectionImpl(ws),
        )
    }
}
