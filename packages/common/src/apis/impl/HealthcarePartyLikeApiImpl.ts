import {Filter} from "../../filter/Filter";
import {PaginatedList} from "../../models/PaginatedList";
import {HealthcarePartyApi} from "../HealthcarePartyApi";
import {ErrorHandler} from "../../services/ErrorHandler";
import {HealthcareParty, IccHcpartyXApi} from "@icure/api";
import {Mapper} from "../Mapper";
import {firstOrNull} from "../../utils/functionalUtils";

class HealthcarePartyLikeApiImpl<DSHealthcareParty> implements HealthcarePartyApi<DSHealthcareParty> {

    constructor(
        private readonly mapper: Mapper<DSHealthcareParty, HealthcareParty>,
        private readonly errorHandler: ErrorHandler,
        private readonly healthcarePartyApi: IccHcpartyXApi
    ) {
    }

    async createOrModify(healthcareParty: DSHealthcareParty): Promise<DSHealthcareParty> {
        const mappedHealthcareParty = this.mapper.toDto(healthcareParty);

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

    filter(filter: Filter<DSHealthcareParty>, nextHealthcarePartyId?: string, limit?: number): Promise<PaginatedList<DSHealthcareParty>> {
        throw "TODO"
    }

    async get(id: string): Promise<DSHealthcareParty> {
        return this.mapper.toDomain(
            await this.healthcarePartyApi.getHealthcareParty(id, false).catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })
        )
    }

    matchBy(filter: Filter<DSHealthcareParty>): Promise<Array<string>> {
        throw "TODO"
    }
}