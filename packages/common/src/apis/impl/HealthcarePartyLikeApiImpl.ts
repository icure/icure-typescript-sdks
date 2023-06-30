import { Filter } from '../../filters/Filter'
import { PaginatedList } from '../../models/PaginatedList.model'
import { HealthcarePartyLikeApi } from '../HealthcarePartyLikeApi'
import { ErrorHandler } from '../../services/ErrorHandler'
import {FilterChainHealthcareParty, HealthcareParty, IccHcpartyXApi, PaginatedListHealthcareParty} from '@icure/api'
import { Mapper } from '../Mapper'
import { firstOrNull } from '../../utils/functionalUtils'
import {NoOpFilter} from "../../filters/dsl/filterDsl";
import {FilterMapper} from "../../mappers/Filter.mapper";

export class HealthcarePartyLikeApiImpl<DSHealthcareParty> implements HealthcarePartyLikeApi<DSHealthcareParty> {
    constructor(private readonly mapper: Mapper<DSHealthcareParty, HealthcareParty>, private readonly paginatedListMapper: Mapper<PaginatedList<DSHealthcareParty>, PaginatedListHealthcareParty>, private readonly errorHandler: ErrorHandler, private readonly healthcarePartyApi: IccHcpartyXApi) {}

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
            })
        )?.rev
        if (deletedHcpRev) {
            return deletedHcpRev
        }
        throw this.errorHandler.createErrorWithMessage(`Could not delete healthcare party ${id}`)
    }

    async filter(filter: Filter<DSHealthcareParty>, nextHealthcarePartyId?: string, limit?: number): Promise<PaginatedList<DSHealthcareParty>> {
        if (NoOpFilter.isNoOp(filter)) {
            return { pageSize: 0, totalSize: 0, rows: [] }
        } else {
            return this.paginatedListMapper.toDomain(
                await this.healthcarePartyApi
                    .filterHealthPartiesBy(
                        nextHealthcarePartyId,
                        limit,
                        new FilterChainHealthcareParty({
                            filter: FilterMapper.toAbstractFilterDto<HealthcareParty>(filter, 'HealthcareParty'),
                        })
                    )
                    .catch((e) => {
                        throw this.errorHandler.createErrorFromAny(e)
                    })
            )!
        }
    }

    async get(id: string): Promise<DSHealthcareParty> {
        return this.mapper.toDomain(
            await this.healthcarePartyApi.getHealthcareParty(id, false).catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })
        )
    }

    async matchBy(filter: Filter<DSHealthcareParty>): Promise<Array<string>> {
        if (NoOpFilter.isNoOp(filter)) {
            return []
        } else {
            return await this.healthcarePartyApi
                .matchHealthcarePartiesBy(FilterMapper.toAbstractFilterDto<HealthcareParty>(filter, 'HealthcareParty'))
                .catch((e) => {
                    throw this.errorHandler.createErrorFromAny(e)
                })
        }
    }
}
