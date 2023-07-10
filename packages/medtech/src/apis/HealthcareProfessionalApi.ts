import {CommonApi, CommonFilter, HealthcarePartyLikeApiImpl, PaginatedList} from '@icure/typescript-common'
import {HealthcareParty, PaginatedListHealthcareParty} from '@icure/api'
import {HealthcareProfessional} from '../models/HealthcareProfessional.model'
import {
    mapHealthcarePartyToHealthcareProfessional,
    mapHealthcareProfessionalToHealthcareParty
} from '../mappers/HealthcareProfessional.mapper'

/**
 * The HealthcareProfessionalApi interface provides methods to manage healthcare professionals.
 */
export class HealthcareProfessionalApi extends HealthcarePartyLikeApiImpl<HealthcareProfessional> {

    /**
     * @deprecated use {@link HealthcareProfessionalApi.createOrModify} instead.
     *
     * A healthcare professional must have a login, an email or a mobilePhone defined, a healthcare professional should be linked to either a Healthcare Professional, a Patient or a Device. When modifying an healthcare professional, you must ensure that the rev obtained when getting or creating the healthcare professional is present as the rev is used to guarantee that the healthcare professional has not been modified by a third party.
     * Create a new Healthcare professional or modify an existing one.
     * @param healthcareProfessional The healthcare professional that must be created in the database.
     */
    createOrModifyHealthcareProfessional(healthcareProfessional: HealthcareProfessional): Promise<HealthcareProfessional> {
        return this.createOrModify(healthcareProfessional)
    }

    /**
     * @deprecated use {@link HealthcareProfessionalApi.delete} instead.
     *
     * Deletes the healthcare professional identified by the provided unique hcpId.
     * Delete an existing healthcare professional.
     * @param hcpId The UUID that uniquely identifies the healthcare professional to be deleted.
     */
    deleteHealthcareProfessional(hcpId: string): Promise<string> {
        return this.delete(hcpId)
    }

    /**
     * @deprecated use {@link HealthcareProfessionalApi.filterBy} instead.
     *
     * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for Healthcare professionals are AllHealthcareProfessionalsFilter and HealthcareProfessionalsByIdsFilter. This method returns a paginated list of healthcare professionals (with a cursor that lets you query the following items).
     * Load healthcare professionals from the database by filtering them using the provided Filter.
     * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
     * @param nextHcpId The id of the first Healthcare professional in the next page
     * @param limit The number of healthcare professionals to return in the queried page
     */
    filterHealthcareProfessionalBy(filter: CommonFilter<HealthcareParty>, nextHcpId?: string, limit?: number): Promise<PaginatedList<HealthcareProfessional>> {
        return this.filterBy(filter, nextHcpId, limit)
    }

    /**
     * @deprecated use {@link HealthcareProfessionalApi.get} instead.
     *
     * Each healthcare professional is uniquely identified by a healthcare professional id. The healthcare professional id is a UUID. This hcpId is the preferred method to retrieve one specific healthcare professional.
     * Get a Healthcare professional by id.
     * @param hcpId The UUID that identifies the healthcare professional uniquely
     */
    getHealthcareProfessional(hcpId: string): Promise<HealthcareProfessional> {
        return this.get(hcpId)
    }

    /**
     * @deprecated use {@link HealthcareProfessionalApi.matchBy} instead.
     *
     * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for Healthcare professionals are AllHealthcare professionalsFilter and Healthcare professionalsByIdsFilter. This method returns the list of the ids of the healthcare professionals matching the filter.
     * Load healthcare professional ids from the database by filtering them using the provided Filter.
     * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
     */
    matchHealthcareProfessionalBy(filter: CommonFilter<HealthcareParty>): Promise<Array<string>> {
        return this.matchBy(filter)
    }
}

export const healthcareProfessionalApi = (api: CommonApi) => {
    return new HealthcareProfessionalApi(
        {
            toDomain(dto: HealthcareParty): HealthcareProfessional {
                return mapHealthcarePartyToHealthcareProfessional(dto)
            },
            toDto(domain: HealthcareProfessional): HealthcareParty {
                return mapHealthcareProfessionalToHealthcareParty(domain)
            },
        },
        {
            toDomain(dto: PaginatedListHealthcareParty): PaginatedList<HealthcareProfessional> {
                return {
                    rows: dto.rows?.map(mapHealthcarePartyToHealthcareProfessional),
                    totalSize: dto.totalSize,
                }
            },
            toDto(domain: PaginatedList<HealthcareProfessional>): PaginatedListHealthcareParty {
                return {
                    rows: domain.rows?.map(mapHealthcareProfessionalToHealthcareParty),
                    totalSize: domain.totalSize,
                }
            },
        },
        api.errorHandler,
        api.baseApi.healthcarePartyApi
    )
}
