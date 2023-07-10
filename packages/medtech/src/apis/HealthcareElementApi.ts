import {HealthElement, PaginatedListHealthElement, Patient as PatientDto} from '@icure/api'
import {CommonApi, CommonFilter, Connection, HealthElementLikeApiImpl, PaginatedList} from '@icure/typescript-common'
import {
    mapHealthcareElementToHealthElement,
    mapHealthElementToHealthcareElement
} from '../mappers/HealthcareElement.mapper'
import {Patient} from '../models/Patient.model'
import {mapPatientDtoToPatient, mapPatientToPatientDto} from '../mappers/Patient.mapper'
import {HealthcareElement} from '../models/HealthcareElement.model'

export class HealthcareElementApi extends HealthElementLikeApiImpl<HealthcareElement, Patient> {
    /**
     * @deprecated use {@link HealthcareElementApi.createOrModify} instead.
     *
     * A Healthcare Element is a data giving some medical context to a series of measures, symptoms, ...
     * For example, if the data samples are symptoms representing fever, cold feel, headache, ... the associated healthcare
     * element could be a flue.
     *
     * A healthcare Element can be linked to a patient and to a series of data samples.
     *
     * This service allows you to create a healthcare element linked to a specific patient
     *
     * @param healthcareElement Healthcare element to create in iCure Database
     * @param patientId Id of the patient to which the healthcare element is linked
     */
    createOrModifyHealthcareElement(healthcareElement: HealthcareElement, patientId?: string): Promise<HealthcareElement> {
        return this.createOrModify(healthcareElement, patientId)
    }

    /**
     * @deprecated use {@link HealthcareElementApi.createOrModifyMany} instead.
     *
     * A Healthcare Element is a data giving some medical context to a series of measures, symptoms, ...
     * For example, if the data samples are symptoms representing fever, cold feel, headache, ... the associated healthcare
     * element could be a flue.
     *
     * A healthcare Element can be linked to a patient and to a series of data samples.
     *
     * This service permits you to create multiple healthcare elements for a specific patient
     *
     * @param healthcareElements
     * @param patientId Id of the patient to which the healthcare elements are linked
     */
    createOrModifyHealthcareElements(healthcareElements: Array<HealthcareElement>, patientId?: string): Promise<Array<HealthcareElement>> {
        return this.createOrModifyMany(healthcareElements, patientId)
    }

    /**
     * @deprecated use {@link HealthcareElementApi.delete} instead.
     *
     * Delete a Healthcare Element from the iCure database
     * @param id Id of the healthcare element to delete
     */
    deleteHealthcareElement(id: string): Promise<string> {
        return this.delete(id)
    }

    /**
     * @deprecated use {@link HealthcareElementApi.filterBy} instead.
     *
     * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for Healthcare elements are :
     *  - HealthcareElementByHealthcarePartyFilter;
     *  - HealthcareElementByHealthcarePartyIdentifiersFilter;
     *  - HealthcareElementByHealthcarePartyLabelCodeFilter;
     *  - HealthcareElementByHealthcarePartyPatientFilter;
     *  - and HealthcareElementByIdsFilter.
     *
     * This method returns a paginated list of healthcare elements (with a cursor that lets you query the following items).
     * Load healthcare elements from the database by filtering them using the provided Filter.
     * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
     * @param nextHealthElementId The id of the first Healthcare professional in the next page
     * @param limit The maximum number of healthcare elements that should contain the returned page. By default, a page contains 1000 healthcare elements
     */
    filterHealthcareElement(filter: CommonFilter<HealthElement>, nextHealthElementId?: string, limit?: number): Promise<PaginatedList<HealthcareElement>> {
        return this.filterBy(filter, nextHealthElementId, limit)
    }

    /**
     * @deprecated use {@link HealthcareElementApi.get} instead.
     *
     * Retrieves the information of a specific Healthcare Element
     * @param id Id of the healthcare element to retrieve
     */
    getHealthcareElement(id: string): Promise<HealthcareElement> {
        return this.get(id)
    }

    /**
     * @deprecated use {@link HealthcareElementApi.matchBy} instead.
     *
     * Find which Healthcare Elements are matching a specific filter.
     *
     * @return the ids of the healthcare elements satisfying the provided filter
     *
     * @param filter Filtering conditions that the returned healthcare element ids are satisfying.
     */
    matchHealthcareElement(filter: CommonFilter<HealthElement>): Promise<Array<string>> {
        return this.matchBy(filter)
    }

    /**
     * @deprecated use {@link HealthcareElementApi.getAllForPatient} instead.
     *
     * Gets all the Healthcare Elements associated to a Patient that the current dataOwner can access.
     * @param patient the Patient associated to the Healthcare Elements to get
     *
     * @return an array containing the Healthcare Elements
     */
    getHealthcareElementsForPatient(patient: Patient): Promise<Array<HealthcareElement>> {
        return this.getAllForPatient(patient)
    }

    /**
     * @deprecated use {@link HealthcareElementApi.subscribeToEvents} instead.
     *
     * Opens a WebSocket Connection in order to receive all the Healthcare Element corresponding to specific filter criteria.
     * @param eventTypes Type of event you would like to listen. It can be CREATE, UPDATE or DELETE
     * @param filter Filter criteria to filter to the healthcare element you would like to receive
     * @param eventFired Action applied each time you receive a healthcare element through the WebSocket
     * @param options Options to configure the WebSocket.
     *    - keepAlive : How long to keep connection alive (ms);
     *    - lifetime : How long to keep the WebSocket alive (ms);
     *    - connectionMaxRetry : how many time retrying to reconnect to the iCure WebSocket;
     *    - connectionRetryIntervalInMs : How long base interval will be between two retry. The retry attempt is exponential and using a random value (connectionRetryIntervalMs * (random between 1 and 2))^nbAttempts)
     */
    subscribeToHealthcareElementEvents(
        eventTypes: ('CREATE' | 'UPDATE' | 'DELETE')[],
        filter: CommonFilter<HealthElement>,
        eventFired: (dataSample: HealthcareElement) => Promise<void>,
        options?: { connectionMaxRetry?: number; connectionRetryIntervalMs?: number }
    ): Promise<Connection> {
        return this.subscribeToEvents(eventTypes, filter, eventFired, options)
    }
}

export const healthcareElementApi = (api: CommonApi) => {
    return new HealthcareElementApi(
        {
            toDomain(dto: HealthElement): HealthcareElement {
                return mapHealthElementToHealthcareElement(dto)
            },
            toDto(domain: HealthcareElement): HealthElement {
                return mapHealthcareElementToHealthElement(domain)
            },
        },
        {
            toDomain(dto: PatientDto): Patient {
                return mapPatientDtoToPatient(dto)
            },
            toDto(domain: Patient): PatientDto {
                return mapPatientToPatientDto(domain)
            },
        },
        {
            toDomain(dto: PaginatedListHealthElement): PaginatedList<HealthcareElement> {
                return {
                    totalSize: dto.totalSize,
                    rows: dto.rows?.map(mapHealthElementToHealthcareElement),
                }
            },
            toDto(domain: PaginatedList<HealthcareElement>): PaginatedListHealthElement {
                return {
                    totalSize: domain.totalSize,
                    rows: domain.rows?.map(mapHealthcareElementToHealthElement),
                }
            },
        },
        api.errorHandler,
        api.baseApi.healthcareElementApi,
        api.baseApi.userApi,
        api.baseApi.patientApi,
        api.baseApi.dataOwnerApi,
        api.baseApi.cryptoApi,
        api
    )
}
