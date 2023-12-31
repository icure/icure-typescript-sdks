import { SharingResult } from '../utils/interfaces'
import { PaginatedList } from '../models/PaginatedList.model'
import { Connection, Patient, SubscriptionOptions } from '@icure/api'
import { CommonFilter } from '../filters/filters'

/**
 * The PatientApi interface provides methods to manage patients.
 */
export interface PatientLikeApi<DSPatient> {
    /**
     * When modifying a patient, you must ensure that the rev obtained when getting or creating the patient is present as the rev is used to guarantee that the patient has not been modified by a third party.
     * Create or update a [Patient]
     * @param patient
     */
    createOrModify(patient: DSPatient): Promise<DSPatient>

    /**
     * Deletes the patient identified by the provided unique [patientId].
     * Delete a [Patient]
     * @param patientId
     */
    delete(patientId: string): Promise<string>

    /**
     * Filters are complex selectors that are built by combining basic building blocks. You can learn more on how to build filters here {@link https://docs.icure.com/sdks/how-to/how-to-filter-data-with-advanced-search-criteria}.
     *
     * This method returns a paginated list of patient (with a cursor that lets you query the following items).
     * Load patients from the database by filtering them using the provided [filter].
     * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
     * @param nextPatientId The id of the first patient in the next page
     * @param limit The maximum number of patients that should contain the returned page. By default, a page contains 1000 patients
     */
    filterBy(filter: CommonFilter<Patient>, nextPatientId?: string, limit?: number): Promise<PaginatedList<DSPatient>>

    /**
     * Each patient is uniquely identified by a patient id. The patient id is a UUID. This [patientId] is the preferred method to retrieve one specific patient.
     * Get a [Patient]
     * @param patientId
     */
    get(patientId: string): Promise<DSPatient>

    /**
     * Filters are complex selectors that are built by combining basic building blocks. You can learn more on how to build filters here {@link https://docs.icure.com/sdks/how-to/how-to-filter-data-with-advanced-search-criteria}. This method returns the list of the ids of the users matching the [filter].
     * Load patient ids from the database by filtering them using the provided [filter].
     * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
     */
    matchBy(filter: CommonFilter<Patient>): Promise<Array<string>>

    /**
     * Service where current user gives access to the patient information to another dataOwner (HCP, patient or device).
     * For this, the current user data owner should be able to access the patient provided in argument in order to provide access to another data owner.
     * @param patient Patient the current data owner would like to share with another data owner
     * @param delegatedTo ID of the data owner to which current user would like to give access
     */
    giveAccessTo(patient: DSPatient, delegatedTo: string): Promise<DSPatient>

    /**
     * Service that allows a Data Owner to share all the data of a Patient with the patient itself.
     * This means this service is sharing :
     * - The information of the patient;
     * - All the data samples linked to the patient;
     * - All the healthcare elements linked to the patient;
     *
     * @param patientId the id of the Patient to which we want to give access back to its own data
     */
    giveAccessToAllDataOf(patientId: string): Promise<SharingResult<DSPatient>>

    /**
     * Opens a WebSocket Connection in order to receive all the Patients corresponding to specific filter criteria.
     * @param eventTypes Type of event you would like to listen. It can be CREATE or UPDATE
     * @param filter Filter criteria to filter to the Patients you would like to receive
     * @param eventFired Action applied each time you receive a Patient through the WebSocket
     * @param options Options to configure the WebSocket.
     *    - keepAlive : How long to keep connection alive (ms);
     *    - lifetime : How long to keep the WebSocket alive (ms);
     *    - connectionMaxRetry : how many time retrying to reconnect to the iCure WebSocket;
     *    - connectionRetryIntervalInMs : How long base interval will be between two retry. The retry attempt is exponential and using a random value (connectionRetryIntervalMs * (random between 1 and 2))^nbAttempts)
     */
    subscribeToEvents(eventTypes: ('CREATE' | 'UPDATE')[], filter: CommonFilter<Patient>, eventFired: (patient: DSPatient) => Promise<void>, options?: SubscriptionOptions): Promise<Connection>

    /**
     * Gets a patient and tries to decrypt its content. If it is not possible to decrypt the content only the unencrypted
     * data will be available.
     * This method is useful to allow new patient users to access some of their own data before their doctor actually
     * gave them access to their own data: instead of giving an error if the data can't be decrypted (like what happens
     * in getPatient) you will be able to get at least partial information.
     */
    getAndTryDecrypt(id: string): Promise<{ patient: DSPatient; decrypted: boolean }>
}
