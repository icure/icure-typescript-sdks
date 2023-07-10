import {Code, PaginatedListCode} from '@icure/api'
import {
    CodeLikeApiImpl,
    Coding,
    CommonApi,
    mapCodeToCoding,
    mapCodingToCode,
    PaginatedList
} from '@icure/typescript-common'

export class CodingApi extends CodeLikeApiImpl<Coding> {}

export const codingApi = (api: CommonApi) =>
    new CodingApi(
        {
            toDomain(dto: Code): Coding {
                return mapCodeToCoding(dto)
            },
            toDto(domain: Coding): Code {
                return mapCodingToCode(domain)
            },
        },
        {
            toDomain(dto: PaginatedListCode): PaginatedList<Coding> {
                return {
                    ...dto,
                    rows: dto.rows?.map(mapCodeToCoding),
                } satisfies PaginatedList<Coding>
            },
            toDto(domain: PaginatedList<Coding>): PaginatedListCode {
                return {
                    ...domain,
                    rows: domain.rows?.map(mapCodingToCode),
                } satisfies PaginatedListCode
            },
        },
        api.errorHandler,
        api.baseApi.codeApi
    )
