import {Filter} from "../../filter/Filter";
import {PaginatedList} from "../../models/PaginatedList";
import {CodeLikeApi} from "../CodeLikeApi";
import {Mapper} from "../Mapper";
import {Code, IccCodeXApi} from "@icure/api";
import {ErrorHandler} from "../../services/ErrorHandler";
import {firstOrNull} from "../../utils/functionalUtils";

export class CodeLikeApiImpl<DSCode> implements CodeLikeApi<DSCode> {

    constructor(
        private readonly mapper: Mapper<DSCode, Code>,
        private readonly errorHandler: ErrorHandler,
        private readonly codeApi: IccCodeXApi
    ) {
    }

    async createOrModify(code: DSCode): Promise<DSCode> {
        const processedCoding = firstOrNull(
            await this.createOrModifyMany([code]).catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })
        )
        if (processedCoding !== undefined) {
            return processedCoding
        } else {
            throw this.errorHandler.createErrorWithMessage("Couldn't create or update code")
        }
    }

    async createOrModifyMany(codes: Array<DSCode>): Promise<Array<DSCode>> {
        const mappedCodes = codes.map((c) => this.mapper.toDto(c));

        const codesToCreate = mappedCodes.filter((dev) => !dev.rev)
        const codesToUpdate = mappedCodes.filter((dev) => !!dev.rev)

        if (!codesToUpdate.every((c) => c.id != null && CodeLikeApiImpl.isCodeId(c.id))) {
            throw this.errorHandler.createErrorWithMessage('Update id should be provided as an String of format: type|code|version')
        }

        const createdCodes = await Promise.all(
            codesToCreate.map((c) =>
                this.codeApi.createCode(c).catch((e) => {
                    throw this.errorHandler.createErrorFromAny(e)
                })
            )
        )
        const updatedCodes = await Promise.all(
            codesToUpdate.map((c) =>
                this.codeApi.modifyCode(c).catch((e) => {
                    throw this.errorHandler.createErrorFromAny(e)
                })
            )
        )
        return [...createdCodes, ...updatedCodes].map((c) => this.mapper.toDomain(c))
    }

    filterBy(filter: Filter<DSCode>, nextCodeId?: string, limit?: number): Promise<PaginatedList<DSCode>> {
        throw "TODO"
    }

    async get(id: string): Promise<DSCode> {
        return this.mapper.toDomain(
            await this.codeApi
                .getCode(id)
                .catch((e) => {
                    throw this.errorHandler.createErrorFromAny(e)
                })
        )
    }

    matchBy(filter: Filter<DSCode>): Promise<Array<string>> {
        throw "TODO"
    }

    private static isCodeId(id?: string): boolean {
        const codeRegex = new RegExp(`[a-zA-Z0-9]{0,80}\\|[a-zA-Z0-9.-]{0,80}\\|[a-zA-Z0-9.]{0,80}`)
        return id != undefined && codeRegex.test(id)
    }
}