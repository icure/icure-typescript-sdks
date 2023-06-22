import {Code, IccCodeXApi} from "@icure/api";
import {mapper} from "../mappers/mapper";
import {CodeLikeApiImpl, Coding, ErrorHandler} from "@icure/typescript-common";

export const codingApi = (
    errorHandler: ErrorHandler,
    codeApi: IccCodeXApi,
) => new CodeLikeApiImpl<Coding>(
    {
        toDomain(dto: Code): Coding {
            return mapper.map(dto, Code, Coding)
        },
        toDto(domain: Coding): Code {
            return mapper.map(domain, Coding, Code)
        }
    },
    errorHandler,
    codeApi,
)