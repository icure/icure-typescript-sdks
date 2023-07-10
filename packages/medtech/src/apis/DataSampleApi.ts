import {
    CommonApi,
    CommonFilter,
    Connection,
    Document,
    mapDocumentDtoToDocument,
    mapDocumentToDocumentDto,
    PaginatedList,
    ServiceLikeApiImpl,
} from '@icure/typescript-common'
import {Document as DocumentDto, PaginatedListService, Patient as PatientDto, Service} from '@icure/api'
import {DataSample} from '../models/DataSample.model'
import {Patient} from '../models/Patient.model'
import {mapDataSampleToService, mapServiceToDataSample} from '../mappers/DataSample.mapper'
import {mapPatientDtoToPatient, mapPatientToPatientDto} from '../mappers/Patient.mapper'

/**
 * The DataSampleApi interface provides methods to manage data samples.
 */
export class DataSampleApi extends ServiceLikeApiImpl<DataSample, Patient, Document> {
    /**
     * @deprecated use {@link DataSampleApi.createOrModifyFor} instead
     *
     * When modifying a data sample, you can't update the patient of it : For this, you need to delete the faulty data sample and create a new one. When modifying the data sample, you also need to keep the same batchId : It is not possible to change the batch of a data sample.
     * Create or update a [DataSample] for a patient
     * @param patientId
     * @param dataSample
     */
    createOrModifyDataSampleFor(patientId: string, dataSample: DataSample): Promise<DataSample> {
        return this.createOrModifyFor(patientId, dataSample)
    }

    /**
     * @deprecated use {@link DataSampleApi.createOrModifyManyFor} instead
     *
     * All the provided data samples will be created in the same batch. If you are trying to update some data samples, then those ones need to come from the same batch.
     * When modifying a data sample, you can't update the patient of it : For this, you need to delete the faulty data sample and create a new one. When modifying the data sample, you also need to keep the same batchId : It is not possible to change the batch of a data sample.
     * Create or update a batch of [DataSample] for a patient
     * @param patientId
     * @param dataSamples
     */
    createOrModifyDataSamplesFor(patientId: string, dataSamples: Array<DataSample>): Promise<Array<DataSample>> {
        return this.createOrModifyManyFor(patientId, dataSamples)
    }

    /**
     * @deprecated use {@link DataSampleApi.createOrModifyMany} instead
     *
     * Deletes the data sample identified by the provided unique [dataSampleId].
     * Delete a [DataSample] by its id
     * @param dataSampleId
     */
    deleteDataSample(dataSampleId: string): Promise<string> {
        return this.delete(dataSampleId)
    }

    /**
     * @deprecated use {@link DataSampleApi.deleteMany} instead
     *
     * Deletes the batch of data samples identified by the provided [dataSampleIds]. The data samples to delete need to be part of the same batch
     * Delete a batch of [Data Samples]
     * @param requestBody
     */
    deleteDataSamples(requestBody: Array<string>): Promise<Array<string>> {
        return this.deleteMany(requestBody)
    }

    /**
     * @deprecated use {@link DataSampleApi.filterBy} instead
     *
     * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [DataSample] are :
     *  - DataSampleByHealthcarePartyFilter;
     *  - DataSampleByHealthcarePartyHealthcareElementFilter;
     *  - DataSampleByHealthcarePartyIdentifiersFilter;
     *  - DataSampleByHealthcarePartyPatientFilter;
     *  - DataSampleByHealthcarePartyTagCodeDateFilter;
     *  - and DataSamplesByIdsFilter.
     *
     * This method returns a paginated list of data samples (with a cursor that lets you query the following items).
     * Find data samples using the provided [filter].
     * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
     * @param nextDataSampleId The id of the first data sample in the next page
     * @param limit The maximum number of data samples that should contain the returned page. By default, a page contains 1000 data samples
     */
    filterDataSample(filter: CommonFilter<DataSample>, nextDataSampleId?: string, limit?: number): Promise<PaginatedList<DataSample>> {
        return this.filterBy(filter, nextDataSampleId, limit)
    }

    /**
     * @deprecated use {@link DataSampleApi.get} instead
     *
     * Each data sample is uniquely identified by a data sample id which is a UUID. This [dataSampleId] is the preferred method to retrieve one specific data sample.
     * Get a [DataSample] by its id
     * @param dataSampleId
     */
    getDataSample(dataSampleId: string): Promise<DataSample> {
        return this.get(dataSampleId)
    }

    /**
     * @deprecated use {@link DataSampleApi.matchBy} instead
     *
     * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [DataSample] are AllDataSamplesFilter and DataSamplesByIdsFilter. This method returns a paginated list of data samples (with a cursor that lets you query the following items).
     * Find data samples ids using the provided Filter.
     * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
     */
    matchDataSample(filter: CommonFilter<DataSample>): Promise<Array<string>> {
        return this.matchBy(filter)
    }

    /**
     * @deprecated use {@link DataSampleApi.getForPatient} instead
     *
     * Gets all the Data Samples associated to a Patient that the current dataOwner can access.
     * @param patient the Patient associated to the Data Samples to get
     *
     * @return an array containing the Data Samples
     */
    getDataSamplesForPatient(patient: Patient): Promise<Array<DataSample>> {
        return this.getForPatient(patient)
    }

    /**
     * @deprecated use {@link DataSampleApi.subscribeToEvents} instead
     *
     * Opens a WebSocket Connection in order to receive all the Data Samples corresponding to specific filter criteria.
     * @param eventTypes Type of event you would like to listen. It can be CREATE, UPDATE or DELETE
     * @param filter Filter criteria to filter to the data samples you would like to receive
     * @param eventFired Action applied each time you receive a data sample through the WebSocket
     * @param options Options to configure the WebSocket.
     *    - keepAlive : How long to keep connection alive (ms);
     *    - lifetime : How long to keep the WebSocket alive (ms);
     *    - connectionMaxRetry : how many time retrying to reconnect to the iCure WebSocket;
     *    - connectionRetryIntervalInMs : How long base interval will be between two retry. The retry attempt is exponential and using a random value (connectionRetryIntervalMs * (random between 1 and 2))^nbAttempts)
     */
    subscribeToDataSampleEvents(
        eventTypes: ('CREATE' | 'UPDATE' | 'DELETE')[],
        filter: CommonFilter<DataSample>,
        eventFired: (dataSample: DataSample) => Promise<void>,
        options?: { connectionMaxRetry?: number; connectionRetryIntervalMs?: number }
    ): Promise<Connection> {
        return this.subscribeToEvents(eventTypes, filter, eventFired, options)
    }

    /**
     * @deprecated use {@link DataSampleApi.setAttachment} instead
     *
     * Link an attachment or update the attachment of a data sample
     * Add or update the attachment of a DataSample
     * @param dataSampleId
     * @param body
     * @param documentName
     * @param documentVersion
     * @param documentExternalUuid
     * @param documentLanguage
     */
    setDataSampleAttachment(
        dataSampleId: string,
        body: ArrayBuffer,
        documentName?: string,
        documentVersion?: string,
        documentExternalUuid?: string,
        documentLanguage?: string
    ): Promise<Document> {
        return this.setAttachment(dataSampleId, body, documentName, documentVersion, documentExternalUuid, documentLanguage)
    }

    /**
     * @deprecated use {@link DataSampleApi.getAttachmentContent} instead
     *
     * Data Samples may contain attachments such as prescriptions, reports, ... Use this method to get the content of an attachment
     * Get attachment content of a DataSample
     * @param dataSampleId
     * @param documentId
     */
    getDataSampleAttachmentContent(dataSampleId: string, documentId: string): Promise<ArrayBuffer> {
        return this.getAttachmentContent(dataSampleId, documentId)
    }

    /**
     * @deprecated use {@link DataSampleApi.getAttachmentDocument} instead
     *
     * Data Samples may contain attachments such as prescriptions, reports, ... Use this method to get the document metadata information of an attachment
     * Get document metadata of a DataSample attachment
     * @param dataSampleId
     * @param documentId
     */
    getDataSampleAttachmentDocument(dataSampleId: string, documentId: string): Promise<Document> {
        return this.getAttachmentDocument(dataSampleId, documentId)
    }
}


export const dataSampleApi = (api: CommonApi) => {
    return new DataSampleApi(
        {
            toDomain(dto: Service): DataSample {
                return mapServiceToDataSample(dto)
            },
            toDto(domain: DataSample): Service {
                return mapDataSampleToService(domain)
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
            toDomain(dto: DocumentDto): Document {
                return mapDocumentDtoToDocument(dto)
            },
            toDto(domain: Document): DocumentDto {
                return mapDocumentToDocumentDto(domain)
            },
        },
        {
            toDomain(dto: PaginatedListService): PaginatedList<DataSample> {
                return {
                    rows: dto.rows?.map(mapServiceToDataSample),
                    totalSize: dto.totalSize,
                }
            },
            toDto(domain: PaginatedList<DataSample>): PaginatedListService {
                return {
                    rows: domain.rows?.map(mapDataSampleToService),
                    totalSize: domain.totalSize,
                }
            },
        },
        api.errorHandler,
        api.baseApi.userApi,
        api.baseApi.contactApi,
        api.baseApi.patientApi,
        api.baseApi.healthcareElementApi,
        api.baseApi.cryptoApi,
        api.baseApi.dataOwnerApi,
        api
    )
}
