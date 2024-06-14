import { CodeDto, CodeLikeApi, CodeLikeApiImpl, Coding, CommonApi, mapCodeToCoding, mapCodingToCode } from '@icure/typescript-common'

export interface CodingApi extends CodeLikeApi<Coding> {}

class CodingApiImpl extends CodeLikeApiImpl<Coding> {}

export const codingApi = (api: CommonApi): CodingApi =>
    new CodingApiImpl(
        {
            toDomain(dto: CodeDto): Coding {
                return mapCodeToCoding(dto)
            },
            toDto(domain: Coding): CodeDto {
                return mapCodingToCode(domain)
            },
        },
        api.errorHandler,
        api.baseApi.codeApi,
    )
