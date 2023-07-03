import {Code, IccCodeXApi, PaginatedListCode} from '@icure/api'
import {
    CodeLikeApiImpl,
    Coding,
    ErrorHandler,
    mapCodeToCoding,
    mapCodingToCode,
    PaginatedList
} from '@icure/typescript-common'

export const codingApi = (errorHandler: ErrorHandler, codeApi: IccCodeXApi) =>
    new CodeLikeApiImpl<Coding>(
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
                    rows: dto.rows?.map(mapCodeToCoding)
                } satisfies PaginatedList<Coding>
            },
            toDto(domain: PaginatedList<Coding>): PaginatedListCode {
                return {
                    ...domain,
                    rows: domain.rows?.map(mapCodingToCode)
                } satisfies PaginatedListCode
            }
        },
        errorHandler,
        codeApi
    )
