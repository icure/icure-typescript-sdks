import { CodeLikeApi } from '../CodeLikeApi'
import { Mapper } from '../Mapper'
import { Code, FilterChainCode, IccCodeXApi } from '@icure/api'
import { ErrorHandler } from '../../services/ErrorHandler'
import { firstOrNull } from '../../utils/functionalUtils'
import { PaginatedList } from '../../models/PaginatedList.model'
import { NoOpFilter } from '../../filters/dsl'
import { FilterMapper } from '../../mappers/Filter.mapper'
import { CommonFilter } from '../../filters/filters'
import { toPaginatedList } from '../../mappers/PaginatedList.mapper'

export class CodeLikeApiImpl<DSCode> implements CodeLikeApi<DSCode> {
    constructor(
        private readonly mapper: Mapper<DSCode, Code>,
        private readonly errorHandler: ErrorHandler,
        private readonly codeApi: IccCodeXApi,
    ) {}

    private static isCodeId(id?: string): boolean {
        const codeRegex = new RegExp(`[a-zA-Z0-9]{0,80}\\|[a-zA-Z0-9.-]{0,80}\\|[a-zA-Z0-9.]{0,80}`)
        return id != undefined && codeRegex.test(id)
    }

    async createOrModify(code: DSCode): Promise<DSCode> {
        const processedCoding = firstOrNull(
            await this.createOrModifyMany([code]).catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            }),
        )
        if (processedCoding !== undefined) {
            return processedCoding
        } else {
            throw this.errorHandler.createErrorWithMessage("Couldn't create or update code")
        }
    }

    async createOrModifyMany(codes: Array<DSCode>): Promise<Array<DSCode>> {
        const mappedCodes = codes.map((c) => this.mapper.toDto(c))

        const codesToCreate = mappedCodes.filter((dev) => !dev.rev)
        const codesToUpdate = mappedCodes.filter((dev) => !!dev.rev)

        if (!codesToUpdate.every((c) => c.id != null && CodeLikeApiImpl.isCodeId(c.id))) {
            throw this.errorHandler.createErrorWithMessage('Update id should be provided as an String of format: type|code|version')
        }

        const createdCodes = await Promise.all(
            codesToCreate.map((c) =>
                this.codeApi.createCode(c).catch((e) => {
                    throw this.errorHandler.createErrorFromAny(e)
                }),
            ),
        )
        const updatedCodes = await Promise.all(
            codesToUpdate.map((c) =>
                this.codeApi.modifyCode(c).catch((e) => {
                    throw this.errorHandler.createErrorFromAny(e)
                }),
            ),
        )
        return [...createdCodes, ...updatedCodes].map((c) => this.mapper.toDomain(c))
    }

    async filterBy(filter: CommonFilter<Code>, nextCodeId?: string, limit?: number): Promise<PaginatedList<DSCode>> {
        if (NoOpFilter.isNoOp(filter)) {
            return {
                pageSize: 0,
                totalSize: 0,
                rows: [],
            } as PaginatedList<DSCode>
        } else {
            return toPaginatedList(
                await this.codeApi
                    .filterCodesBy(
                        undefined,
                        nextCodeId,
                        limit,
                        undefined,
                        undefined,
                        undefined,
                        new FilterChainCode({
                            filter: FilterMapper.toAbstractFilterDto<Code>(filter, 'Code'),
                        }),
                    )
                    .catch((e) => {
                        throw this.errorHandler.createErrorFromAny(e)
                    }),
                this.mapper.toDomain,
            )!
        }
    }

    async get(id: string): Promise<DSCode> {
        return this.mapper.toDomain(
            await this.codeApi.getCode(id).catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            }),
        )
    }

    async matchBy(filter: CommonFilter<Code>): Promise<Array<string>> {
        if (NoOpFilter.isNoOp(filter)) {
            return []
        } else {
            return this.codeApi.matchCodesBy(FilterMapper.toAbstractFilterDto<Code>(filter, 'Code')).catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })
        }
    }
}
