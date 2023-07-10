import {PaginatedListPatient, Patient as PatientDto} from '@icure/api'
import {CommonApi, CommonFilter, Connection, PaginatedList, PatientLikeApiImpl} from '@icure/typescript-common'
import {Patient} from '../models/Patient.model'
import {mapPatientDtoToPatient, mapPatientToPatientDto} from '../mappers/Patient.mapper'

/**
 * The PatientApi interface provides methods to manage patients.
 */
export class PatientApi extends PatientLikeApiImpl<Patient> {
    /**
     * @deprecated Use {@link PatientApi.createOrModify} instead.
     *
     * When modifying a patient, you must ensure that the rev obtained when getting or creating the patient is present as the rev is used to guarantee that the patient has not been modified by a third party.
     * Create or update a [Patient]
     * @param patient
     */
    createOrModifyPatient(patient: Patient): Promise<Patient> {
        return this.createOrModify(patient)
    }

    /**
     * @deprecated Use {@link PatientApi.delete} instead.
     *
     * Deletes the patient identified by the provided unique [patientId].
     * Delete a [Patient]
     * @param patientId
     */
    deletePatient(patientId: string): Promise<string> {
        return this.delete(patientId)
    }

    /**
     * @deprecated Use {@link PatientApi.filterBy} instead.
     *
     * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [Patient] are :
     *  - PatientByHealthcarePartyDateOfBirthBetweenFilter;
     *  - PatientByHealthcarePartyFilter;
     *  - PatientByHealthcarePartyGenderEducationProfessionFilter;
     *  - PatientByHealthcarePartyIdentifiersFilter;
     *  - PatientByHealthcarePartyNameContainsFuzzyFilter;
     *  - PatientByHealthcarePartySsinsFilter;
     *  - and PatientsByIdsFilter.
     *
     * This method returns a paginated list of patient (with a cursor that lets you query the following items).
     * Load patients from the database by filtering them using the provided [filter].
     * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
     * @param nextPatientId The id of the first patient in the next page
     * @param limit The maximum number of patients that should contain the returned page. By default, a page contains 1000 patients
     */
    filterPatients(filter: CommonFilter<PatientDto>, nextPatientId?: string, limit?: number): Promise<PaginatedList<Patient>> {
        return this.filterBy(filter, nextPatientId, limit)
    }

    /**
     * @deprecated Use {@link PatientApi.get} instead.
     *
     * Each patient is uniquely identified by a patient id. The patient id is a UUID. This [patientId] is the preferred method to retrieve one specific patient.
     * Get a [Patient]
     * @param patientId
     */
    getPatient(patientId: string): Promise<Patient> {
        return this.get(patientId)
    }

    /**
     * @deprecated Use {@link PatientApi.matchBy} instead.
     *
     * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [Patient] are AllPatientsFilter and PatientsByIdsFilter. This method returns the list of the ids of the users matching the [filter].
     * Load patient ids from the database by filtering them using the provided [filter].
     * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
     */
    matchPatients(filter: CommonFilter<PatientDto>): Promise<Array<string>> {
        return this.matchBy(filter)
    }

    /**
     * @deprecated Use {@link PatientApi.giveAccessTo} instead.
     *
     * Same as {@link giveAccessTo} but allowing also to share encrypted patients. This is useful if the delegator does
     * not know the encryption key of the patient but has a secret id and wants to share it.
     * @param patient Patient the current data owner would like to share with another data owner
     * @param delegatedTo ID of the data owner to which current user would like to give access
     */
    giveAccessToPotentiallyEncrypted(patient: Patient, delegatedTo: string): Promise<Patient> {
        return this.giveAccessTo(patient, delegatedTo)
    }

    /**
     * @deprecated Use {@link PatientApi.subscribeToEvents} instead.
     *
     * Opens a WebSocket Connection in order to receive all the Patients corresponding to specific filter criteria.
     * @param eventTypes Type of event you would like to listen. It can be CREATE, UPDATE or DELETE
     * @param filter Filter criteria to filter to the Patients you would like to receive
     * @param eventFired Action applied each time you receive a Patient through the WebSocket
     * @param options Options to configure the WebSocket.
     *    - keepAlive : How long to keep connection alive (ms);
     *    - lifetime : How long to keep the WebSocket alive (ms);
     *    - connectionMaxRetry : how many time retrying to reconnect to the iCure WebSocket;
     *    - connectionRetryIntervalInMs : How long base interval will be between two retry. The retry attempt is exponential and using a random value (connectionRetryIntervalMs * (random between 1 and 2))^nbAttempts)
     */
    subscribeToPatientEvents(
        eventTypes: ('CREATE' | 'UPDATE' | 'DELETE')[],
        filter: CommonFilter<PatientDto>,
        eventFired: (patient: Patient) => Promise<void>,
        options?: { connectionMaxRetry?: number; connectionRetryIntervalMs?: number }
    ): Promise<Connection> {
        return this.subscribeToEvents(eventTypes, filter, eventFired, options)
    }

    /**
     * @deprecated Use {@link PatientApi.getAndTryDecrypt} instead.
     *
     * Gets a patient and tries to decrypt its content. If it is not possible to decrypt the content only the unencrypted
     * data will be available.
     * This method is useful to allow new patient users to access some of their own data before their doctor actually
     * gave them access to their own data: instead of giving an error if the data can't be decrypted (like what happens
     * in getPatient) you will be able to get at least partial information.
     */
    getPatientAndTryDecrypt(patientId: string): Promise<{ patient: Patient; decrypted: boolean }> {
        return this.getAndTryDecrypt(patientId)
    }
}


export const patientApi = (api: CommonApi) => {
    return new PatientApi(
        {
            toDomain(dto: PatientDto): Patient {
                return mapPatientDtoToPatient(dto)
            },
            toDto(domain: Patient): PatientDto {
                return mapPatientToPatientDto(domain)
            },
        },
        {
            toDomain(dto: PaginatedListPatient): PaginatedList<Patient> {
                return {
                    totalSize: dto.totalSize,
                    rows: dto.rows?.map(mapPatientDtoToPatient),
                }
            },
            toDto(domain: PaginatedList<Patient>): PaginatedListPatient {
                return {
                    totalSize: domain.totalSize,
                    rows: domain.rows?.map(mapPatientToPatientDto),
                }
            },
        },
        api.errorHandler,
        api.baseApi.patientApi,
        api.baseApi.userApi,
        api.baseApi.dataOwnerApi
    )
}
