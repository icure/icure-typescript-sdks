import { PaginatedList } from '../models/PaginatedList.model'
import { Connection, HealthcareParty } from '@icure/api'
import { CommonFilter } from '../filters/filters'
import { SubscriptionOptions } from '@icure/api/icc-x-api/utils'

/**
 * The HealthcarePartyApi interface provides methods to manage healthcare professionals.
 *
 * T: Domain model type of the healthcare professional
 */
export interface HealthcarePartyLikeApi<DSHealthcareParty> {
    /**
     * A healthcare professional must have a login, an email or a mobilePhone defined, a healthcare professional should be linked to either a Healthcare Professional, a Patient or a Device. When modifying an healthcare professional, you must ensure that the rev obtained when getting or creating the healthcare professional is present as the rev is used to guarantee that the healthcare professional has not been modified by a third party.
     * Create a new Healthcare professional or modify an existing one.
     * @param healthcareParty The healthcare professional that must be created in the database.
     */
    createOrModify(healthcareParty: DSHealthcareParty): Promise<DSHealthcareParty>

    /**
     * Deletes the healthcare professional identified by the provided unique hcpId.
     * Delete an existing healthcare professional.
     * @param id The UUID that uniquely identifies the healthcare professional to be deleted.
     */
    delete(id: string): Promise<string>

    /**
     * Filters are complex selectors that are built by combining basic building blocks. You can learn more on how to build filters here {@link https://docs.icure.com/sdks/how-to/how-to-filter-data-with-advanced-search-criteria}. This method returns a paginated list of healthcare professionals (with a cursor that lets you query the following items).
     * Load healthcare professionals from the database by filtering them using the provided Filter.
     * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
     * @param nextHealthcarePartyId The id of the first Healthcare professional in the next page
     * @param limit The number of healthcare professionals to return in the queried page
     */
    filterBy(filter: CommonFilter<HealthcareParty>, nextHealthcarePartyId?: string, limit?: number): Promise<PaginatedList<DSHealthcareParty>>

    /**
     * Each healthcare professional is uniquely identified by a healthcare professional id. The healthcare professional id is a UUID. This hcpId is the preferred method to retrieve one specific healthcare professional.
     * Get a Healthcare professional by id.
     * @param id The UUID that identifies the healthcare professional uniquely
     */
    get(id: string): Promise<DSHealthcareParty>

    /**
     * Filters are complex selectors that are built by combining basic building blocks. You can learn more on how to build filters here {@link https://docs.icure.com/sdks/how-to/how-to-filter-data-with-advanced-search-criteria}. This method returns the list of the ids of the healthcare professionals matching the filter.
     * Load healthcare professional ids from the database by filtering them using the provided Filter.
     * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
     */
    matchBy(filter: CommonFilter<HealthcareParty>): Promise<Array<string>>

    subscribeToEvents(eventTypes: ('CREATE' | 'UPDATE')[], filter: CommonFilter<HealthcareParty>, eventFired: (hcp: DSHealthcareParty) => Promise<void>, options?: SubscriptionOptions): Promise<Connection>
}
