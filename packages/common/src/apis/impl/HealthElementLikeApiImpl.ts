import {Filter} from "../../filter/Filter";
import {PaginatedList} from "../../models/PaginatedList";
import {Connection} from "../../models/Connection";
import {HealthElementLikeApi} from "../HealthElementLikeApi";
import {HealthElement, IccCryptoXApi, IccHelementXApi, IccPatientXApi, IccUserXApi, Patient, User} from "@icure/api";
import {Mapper} from "../Mapper";
import {ErrorHandler} from "../../services/ErrorHandler";
import {firstOrNull} from "../../utils/functionalUtils";
import {IccDataOwnerXApi} from "@icure/api/icc-x-api/icc-data-owner-x-api";
import {forceUuid} from "../../utils/uuidUtils";

class HealthElementLikeApiImpl<DSHealthElement, DSPatient> implements HealthElementLikeApi<DSHealthElement, DSPatient> {

    constructor(
        private readonly mapper: Mapper<DSHealthElement, HealthElement>,
        private readonly errorHandler: ErrorHandler,
        private readonly heApi: IccHelementXApi,
        private readonly userApi: IccUserXApi,
        private readonly patientApi: IccPatientXApi,
        private readonly dataOwnerApi: IccDataOwnerXApi,
        private readonly cryptoApi: IccCryptoXApi,
    ) {}
    async createOrModify(healthElement: DSHealthElement, patientId?: string): Promise<DSHealthElement> {
        const createdOrModifiedHealthElement = firstOrNull(await this.createOrModifyMany([healthElement], patientId))

        if (createdOrModifiedHealthElement) {
            return createdOrModifiedHealthElement
        }

        throw this.errorHandler.createErrorWithMessage(`Could not create or modify health element`)
    }

    async createOrModifyMany(healthElement: Array<DSHealthElement>, patientId?: string): Promise<Array<DSHealthElement>> {
        const mappedHealthElements = healthElement.map((he) => this.mapper.toDto(he))

        const heToCreate = mappedHealthElements.filter((he) => !he.rev)
        const heToUpdate = mappedHealthElements.filter((he) => !!he.rev)

        const currentUser = (await this.userApi.getCurrentUser().catch((e) => {
            throw this.errorHandler.createErrorFromAny(e)
        }))

        const patient = patientId
            ? await this.patientApi.getPatientWithUser(currentUser, patientId).catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })
            : undefined

        if (!heToUpdate.every((he) => he.id != null && forceUuid(he.id))) {
            throw this.errorHandler.createErrorWithMessage('Error while updating: HealthcareElement id should be provided as an UUID v4 (String)')
        }

        if (!patient && heToCreate.length > 0) {
            throw this.errorHandler.createErrorWithMessage('Error while creating: patientId should be provided to create new healthcare elements')
        }

        const hesCreated = await Promise.all(
            heToCreate.map((he) => this.heApi.newInstance(currentUser, patient, he, { confidential: true }))
        )
            .then((healthElementsToCreate) => this.heApi.createHealthElementsWithUser(currentUser, healthElementsToCreate))
            .catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })
        const hesUpdated = await this.heApi
            .modifyHealthElementsWithUser(
                currentUser,
                heToUpdate
            )
            .catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })

        return [...hesCreated, ...hesUpdated].map((he) => this.mapper.toDomain(he))
    }

    async delete(id: string): Promise<string> {
        const deletedHeRev = firstOrNull(
            (await this.heApi.deleteHealthElements(id).catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            }))
        )?.rev
        if (deletedHeRev) {
            return deletedHeRev
        }
        throw this.errorHandler.createErrorWithMessage(`An error occurred when deleting this HealthcareElement. Id: ${id}`)
    }

    filterBy(filter: Filter<DSHealthElement>, nextHealthElementId?: string, limit?: number): Promise<PaginatedList<DSHealthElement>> {
        throw "TODO"
    }

    async get(id: string): Promise<DSHealthElement> {
        const currentUser = (await this.userApi.getCurrentUser().catch((e) => {
            throw this.errorHandler.createErrorFromAny(e)
        }))
        return this.mapper.toDomain(
            (await this.heApi.getHealthElementWithUser(currentUser, id).catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            }))
        )
    }

    async getAllForPatient(patient: DSPatient): Promise<Array<DSHealthElement>> {
        // const user = await this.userApi.getCurrentUser().catch((e) => {
        //     throw this.errorHandler.createErrorFromAny(e)
        // })
        // if (!user) {
        //     throw this.errorHandler.createErrorWithMessage(
        //         'There is no user currently logged in. You must call this method from an authenticated MedTechApi.'
        //     )
        // }
        // const dataOwnerId = this.dataOwnerApi.getDataOwnerIdOf(user)
        // if (!dataOwnerId) {
        //     throw this.errorHandler.createErrorWithMessage(
        //         'The current user is not a data owner. You must been either a patient, a device or a healthcare professional to call this method.'
        //     )
        // }
        // const filter = await new HealthcareElementFilter().forDataOwner(dataOwnerId).forPatients(this.cryptoApi, [patient]).build()
        // return await this.concatenateFilterResults(filter)
        throw "TODO"
    }

    async giveAccessTo(healthElement: DSHealthElement, delegatedTo: string): Promise<DSHealthElement> {
        const shared = await this.heApi.shareWith(delegatedTo, this.mapper.toDto(healthElement))
        return this.mapper.toDomain(shared)
    }

    matchBy(filter: Filter<DSHealthElement>): Promise<Array<string>> {
        throw "TODO"
    }

    subscribeTo(eventTypes: ("CREATE" | "UPDATE" | "DELETE")[], filter: Filter<DSHealthElement>, eventFired: (dataSample: DSHealthElement) => Promise<void>, options?: {
        connectionMaxRetry?: number;
        connectionRetryIntervalMs?: number
    }): Promise<Connection> {
        throw "TODO"
    }
}