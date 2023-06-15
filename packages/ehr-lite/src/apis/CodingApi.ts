import {CodeLikeApiImpl, Coding, ErrorHandler, mapCodeToCoding} from "@icure/typescript-common";
import {Code, IccCodeXApi} from "@icure/api";
import {mapper} from "../mappings/mapper";

export const codingApi = (
    errorHandler: ErrorHandler,
    codeApi: IccCodeXApi,
) => new CodeLikeApiImpl<Coding>(
    {
        toDomain(dto: Code): Coding {
            return mapCodeToCoding(dto)
        },
        toDto(domain: Coding): Code {
            return mapper.map(domain, Coding, Code)
        }
    },
    errorHandler,
    codeApi,
)