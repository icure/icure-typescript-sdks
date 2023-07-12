import {Code} from '@icure/api'
import {
    CodeLikeApi,
    CodeLikeApiImpl,
    Coding,
    CommonApi,
    mapCodeToCoding,
    mapCodingToCode
} from '@icure/typescript-common'

export interface CodingApi extends CodeLikeApi<Coding> {}
class CodingApiImpl extends CodeLikeApiImpl<Coding> {}

export const codingApi = (api: CommonApi): CodingApi =>
    new CodingApiImpl(
        {
            toDomain(dto: Code): Coding {
                return mapCodeToCoding(dto)
            },
            toDto(domain: Coding): Code {
                return mapCodingToCode(domain)
            },
        },
        api.errorHandler,
        api.baseApi.codeApi
    )
