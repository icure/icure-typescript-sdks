import { Code, IccCodeXApi } from '@icure/api'
import { CodeLikeApiImpl, Coding, ErrorHandler, mapCodeToCoding, mapCodingToCode } from '@icure/typescript-common'

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
        errorHandler,
        codeApi
    )
