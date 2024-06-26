import { CommonApi, CommonFilter, Connection, Document, DocumentDto, mapDocumentDtoToDocument, mapDocumentToDocumentDto, PaginatedList, PatientDto, ServiceDto, ServiceLikeApi, ServiceLikeApiImpl, SubscriptionOptions } from '@icure/typescript-common'
import { DataSample } from '../models/DataSample.model'
import { Patient } from '../models/Patient.model'
import { mapDataSampleToServiceDto, mapServiceDtoToDataSample } from '../mappers/DataSample.mapper'
import { mapPatientDtoToPatient, mapPatientToPatientDto } from '../mappers/Patient.mapper'

/**
 * The DataSampleApi interface provides methods to manage data samples.
 */
export interface DataSampleApi extends ServiceLikeApi<DataSample, Patient, Document> {
    /**
     * @deprecated use {@link DataSampleApi.createOrModifyFor} instead
     *
     * When modifying a data sample, you can't update the patient of it : For this, you need to delete the faulty data sample and create a new one. When modifying the data sample, you also need to keep the same batchId : It is not possible to change the batch of a data sample.
     * Create or update a [DataSample] for a patient
     * @param patientId
     * @param dataSample
     */
    createOrModifyDataSampleFor(patientId: string, dataSample: DataSample): Promise<DataSample>

    /**
     * @deprecated use {@link DataSampleApi.createOrModifyManyFor} instead
     *
     * All the provided data samples will be created in the same batch. If you are trying to update some data samples, then those ones need to come from the same batch.
     * When modifying a data sample, you can't update the patient of it : For this, you need to delete the faulty data sample and create a new one. When modifying the data sample, you also need to keep the same batchId : It is not possible to change the batch of a data sample.
     * Create or update a batch of [DataSample] for a patient
     * @param patientId
     * @param dataSamples
     */
    createOrModifyDataSamplesFor(patientId: string, dataSamples: Array<DataSample>): Promise<Array<DataSample>>

    /**
     * @deprecated use {@link DataSampleApi.createOrModifyMany} instead
     *
     * Deletes the data sample identified by the provided unique [dataSampleId].
     * Delete a [DataSample] by its id
     * @param dataSampleId
     */
    deleteDataSample(dataSampleId: string): Promise<string>

    /**
     * @deprecated use {@link DataSampleApi.deleteMany} instead
     *
     * Deletes the batch of data samples identified by the provided [dataSampleIds]. The data samples to delete need to be part of the same batch
     * Delete a batch of [Data Samples]
     * @param requestBody
     */
    deleteDataSamples(requestBody: Array<string>): Promise<Array<string>>

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
    filterDataSample(filter: CommonFilter<DataSample>, nextDataSampleId?: string, limit?: number): Promise<PaginatedList<DataSample>>

    /**
     * @deprecated use {@link DataSampleApi.get} instead
     *
     * Each data sample is uniquely identified by a data sample id which is a UUID. This [dataSampleId] is the preferred method to retrieve one specific data sample.
     * Get a [DataSample] by its id
     * @param dataSampleId
     */
    getDataSample(dataSampleId: string): Promise<DataSample>

    /**
     * @deprecated use {@link DataSampleApi.matchBy} instead
     *
     * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [DataSample] are AllDataSamplesFilter and DataSamplesByIdsFilter. This method returns a paginated list of data samples (with a cursor that lets you query the following items).
     * Find data samples ids using the provided Filter.
     * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
     */
    matchDataSample(filter: CommonFilter<DataSample>): Promise<Array<string>>

    /**
     * @deprecated use {@link DataSampleApi.getForPatient} instead
     *
     * Gets all the Data Samples associated to a Patient that the current dataOwner can access.
     * @param patient the Patient associated to the Data Samples to get
     *
     * @return an array containing the Data Samples
     */
    getDataSamplesForPatient(patient: Patient): Promise<Array<DataSample>>

    /**
     * @deprecated use {@link DataSampleApi.subscribeToEvents} instead
     *
     * Opens a WebSocket Connection in order to receive all the Data Samples corresponding to specific filter criteria.
     * @param eventTypes Type of event you would like to listen. It can be CREATE or UPDATE
     * @param filter Filter criteria to filter to the data samples you would like to receive
     * @param eventFired Action applied each time you receive a data sample through the WebSocket
     * @param options Options to configure the WebSocket.
     *    - keepAlive : How long to keep connection alive (ms);
     *    - lifetime : How long to keep the WebSocket alive (ms);
     *    - connectionMaxRetry : how many time retrying to reconnect to the iCure WebSocket;
     *    - connectionRetryIntervalInMs : How long base interval will be between two retry. The retry attempt is exponential and using a random value (connectionRetryIntervalMs * (random between 1 and 2))^nbAttempts)
     */
    subscribeToDataSampleEvents(eventTypes: ('CREATE' | 'UPDATE')[], filter: CommonFilter<DataSample>, eventFired: (dataSample: DataSample) => Promise<void>, options?: SubscriptionOptions): Promise<Connection>

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
    setDataSampleAttachment(dataSampleId: string, body: ArrayBuffer, documentName?: string, documentVersion?: string, documentExternalUuid?: string, documentLanguage?: string): Promise<Document>

    /**
     * @deprecated use {@link DataSampleApi.getAttachmentContent} instead
     *
     * Data Samples may contain attachments such as prescriptions, reports, ... Use this method to get the content of an attachment
     * Get attachment content of a DataSample
     * @param dataSampleId
     * @param documentId
     */
    getDataSampleAttachmentContent(dataSampleId: string, documentId: string): Promise<ArrayBuffer>

    /**
     * @deprecated use {@link DataSampleApi.getAttachmentDocument} instead
     *
     * Data Samples may contain attachments such as prescriptions, reports, ... Use this method to get the document metadata information of an attachment
     * Get document metadata of a DataSample attachment
     * @param dataSampleId
     * @param documentId
     */
    getDataSampleAttachmentDocument(dataSampleId: string, documentId: string): Promise<Document>
}

class DataSampleApiImpl extends ServiceLikeApiImpl<DataSample, Patient, Document> implements DataSampleApi {
    createOrModifyDataSampleFor(patientId: string, dataSample: DataSample): Promise<DataSample> {
        return this.createOrModifyFor(patientId, dataSample)
    }

    createOrModifyDataSamplesFor(patientId: string, dataSamples: Array<DataSample>): Promise<Array<DataSample>> {
        return this.createOrModifyManyFor(patientId, dataSamples)
    }

    deleteDataSample(dataSampleId: string): Promise<string> {
        return this.delete(dataSampleId)
    }

    deleteDataSamples(requestBody: Array<string>): Promise<Array<string>> {
        return this.deleteMany(requestBody)
    }

    filterDataSample(filter: CommonFilter<DataSample>, nextDataSampleId?: string, limit?: number): Promise<PaginatedList<DataSample>> {
        return this.filterBy(filter, nextDataSampleId, limit)
    }

    getDataSample(dataSampleId: string): Promise<DataSample> {
        return this.get(dataSampleId)
    }

    matchDataSample(filter: CommonFilter<DataSample>): Promise<Array<string>> {
        return this.matchBy(filter)
    }

    getDataSamplesForPatient(patient: Patient): Promise<Array<DataSample>> {
        return this.getForPatient(patient)
    }

    subscribeToDataSampleEvents(eventTypes: ('CREATE' | 'UPDATE')[], filter: CommonFilter<DataSample>, eventFired: (dataSample: DataSample) => Promise<void>, options?: SubscriptionOptions): Promise<Connection> {
        return this.subscribeToEvents(eventTypes, filter, eventFired, options)
    }

    setDataSampleAttachment(dataSampleId: string, body: ArrayBuffer, documentName?: string, documentVersion?: string, documentExternalUuid?: string, documentLanguage?: string): Promise<Document> {
        return this.setAttachment(dataSampleId, body, documentName, documentVersion, documentExternalUuid, documentLanguage)
    }

    getDataSampleAttachmentContent(dataSampleId: string, documentId: string): Promise<ArrayBuffer> {
        return this.getAttachmentContent(dataSampleId, documentId)
    }

    getDataSampleAttachmentDocument(dataSampleId: string, documentId: string): Promise<Document> {
        return this.getAttachmentDocument(dataSampleId, documentId)
    }
}

export const dataSampleApi = (api: CommonApi, basePath: string): DataSampleApi => {
    return new DataSampleApiImpl(
        {
            toDomain(dto: ServiceDto): DataSample {
                return mapServiceDtoToDataSample(dto)
            },
            toDto(domain: DataSample): ServiceDto {
                return mapDataSampleToServiceDto(domain)
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
        api.errorHandler,
        api.baseApi.userApi,
        api.baseApi.contactApi,
        api.baseApi.patientApi,
        api.baseApi.healthcareElementApi,
        api.baseApi.cryptoApi,
        api.baseApi.dataOwnerApi,
        api.baseApi.authApi,
        api,
        basePath,
    )
}
