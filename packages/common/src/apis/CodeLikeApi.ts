import { Filter } from '../filters/Filter'
import { PaginatedList } from '../models/PaginatedList.model'

/**
 * The CodeApi interface provides methods to manage code and terminologies (like ATC, ICD-10, LOINC, SNOMED-CT,… ).
 *
 * T: Domain model of the code
 * O: PaginatedList of the domain model of the code
 */
export interface CodeLikeApi<DSCode> {
    /**
     * When modifying a code, you must ensure that the rev obtained when getting or creating the code is present as the rev is used to guarantee that the code has not been modified by a third party.
     * Create or update a [Code]
     * @param code
     */
    createOrModify(code: DSCode): Promise<DSCode>
    /**
     * When modifying codes, you must ensure that the rev obtained when getting or creating the code is present as the rev is used to guarantee that the code has not been modified by a third party.
     * Create or update a batch of [Code]
     * @param codes
     */
    createOrModifyMany(codes: Array<DSCode>): Promise<Array<DSCode>>
    /**
     * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [Code] are AllCodesFilter and CodesByIdsFilter. This method returns a paginated list of code (with a cursor that lets you query the following items).
     * Load codes from the database by filtering them using the provided [filter].
     * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
     * @param nextCodeId The id of the first code in the next page
     * @param limit The maximum number of codes that should contain the returned page. By default, a page contains 1000 codes
     */
    filterBy(filter: Filter<DSCode>, nextCodeId?: string, limit?: number): Promise<PaginatedList<DSCode>>
    /**
     * Each code is uniquely identified by a code id. The code id is a UUID. This [codeId] is the preferred method to retrieve one specific code.
     * Get a [Code]
     * @param id
     */
    get(id: string): Promise<DSCode>
    /**
     * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [Code] are AllCodesFilter and CodesByIdsFilter. This method returns a paginated list of code (with a cursor that lets you query the following items).
     * Load code ids from the database by filtering them using the provided [filter].
     * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
     */
    matchBy(filter: Filter<DSCode>): Promise<Array<string>>
}
