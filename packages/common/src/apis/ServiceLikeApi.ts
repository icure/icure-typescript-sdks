import { Filter } from '../filters/Filter'
import { Connection } from '../models/Connection.model'
import { PaginatedList } from '../models/PaginatedList.model'
import {Service} from "@icure/api";
import {Document} from "../models/Document.model";

/**
 * The ServiceApi interface provides methods to manage data samples.
 */
export interface ServiceLikeApi<DSService, DSPatient, DSDocument> {
    /**
     *
     * When modifying a data sample, you can't update the patient of it : For this, you need to delete the faulty data
     * sample and create a new one. When modifying the data sample, you also need to keep the same batchId : It is not
     * possible to change the batch of a data sample.
     * Create or update a [Service] for a patient.
     *
     * If you want to create many services at once you should use the {@link createOrModifyManyFor} method, as it is
     * more efficient, both in terms of requests and space used, since the services will be "batched" together.
     *
     * If you modify a data sample part of a batch it will be extracted from it.
     * @param patientId
     * @param service
     */
    createOrModifyFor(patientId: string, service: DSService): Promise<DSService>

    /**
     * All the provided data samples will be created in the same batch.
     * If you are trying to update some data samples, then those ones need to come from the same batch.
     * When modifying a data sample, you can't update the patient of it : for this, you need to delete the faulty data
     * sample and create a new one.
     * When modifying the data sample, you also need to keep the same batchId : It is not possible to change the batch
     * of a data sample.
     * Create or update a batch of [Service] for a patient.
     * Note that if you modify only a part of the batch, the modified data samples will be extracted from their original
     * batch into a new one.
     * @param patientId
     * @param services
     */
    createOrModifyManyFor(patientId: string, services: Array<DSService>): Promise<Array<DSService>>

    /**
     * Deletes the data sample identified by the provided unique [id].
     * Delete a [Service] by its id
     * @param id
     */
    delete(id: string): Promise<string>

    /**
     * Deletes the batch of data samples identified by the provided [ids]. The data samples to delete need to be part of the same batch
     * Delete a batch of [Data Samples]
     * @param ids
     */
    deleteMany(ids: Array<string>): Promise<Array<string>>

    /**
     * Filters are complex selectors that are built by combining basic building blocks. You can learn more on how to build filters here {@link https://docs.icure.com/sdks/how-to/how-to-filter-data-with-advanced-search-criteria}..
     *
     * This method returns a paginated list of data samples (with a cursor that lets you query the following items).
     * Find data samples using the provided [filter].
     * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
     * @param nextServiceId The id of the first data sample in the next page
     * @param limit The maximum number of data samples that should contain the returned page. By default, a page contains 1000 data samples
     */
    filterBy(filter: Filter<Service>, nextServiceId?: string, limit?: number): Promise<PaginatedList<DSService>>

    /**
     * Each data sample is uniquely identified by a data sample id which is a UUID. This [id] is the preferred method to retrieve one specific data sample.
     * Get a [Service] by its id
     * @param id
     */
    get(id: string): Promise<DSService>

    /**
     * Filters are complex selectors that are built by combining basic building blocks. You can learn more on how to build filters here {@link https://docs.icure.com/sdks/how-to/how-to-filter-data-with-advanced-search-criteria}. This method returns a paginated list of data samples (with a cursor that lets you query the following items).
     * Find data samples ids using the provided Filter.
     * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
     */
    matchBy(filter: Filter<Service>): Promise<Array<string>>

    /**
     * Shares a service with another data owner (HCP, patient or device), allowing them to access the service
     * information from now on.
     * The {@link delegatedTo} data owner will be able both to retrieve and to decrypt the service.
     * For this, the current user data owner should be able to access the data sample provided in argument in order to
     * provide access to another data owner.
     *
     * Note that if the service was part of a batch this method will take the service out of the batch. If you want to
     * share multiple services part of the same batch to the delegate you should instead use the {@link giveAccessToMany}
     * method.
     * @param service The Service the current data owner would like to share with another data owner
     * @param delegatedTo ID of the data owner to which current user would like to give access
     * @return The service with updated access rights
     */
    giveAccessTo(service: DSService, delegatedTo: string): Promise<DSService>

    /**
     * Shares services with another data owner (HCP, patient or device), allowing them to access the services
     * information from now on. All the services must be part of the same batch.
     * The {@link delegatedTo} data owner will be able both to retrieve and to decrypt the services.
     * For this, the current user data owner should be able to access the services provided in argument in order to
     * provide access to another data owner.
     *
     * Note that if the services in input do not cover the full batch this method will take the service out of the
     * batch into a new batch.
     *
     * @param services The services the current data owner would like to share with another data owner
     * @param delegatedTo ID of the data owner to which current user would like to give access
     * @return The service with updated access rights
     */
    giveAccessToMany(services: DSService[], delegatedTo: string): Promise<DSService[]>

    /**
     * Gets all the Data Samples associated to a Patient that the current dataOwner can access.
     * @param patient the Patient associated to the Data Samples to get
     *
     * @return an array containing the Data Samples
     */
    getForPatient(patient: DSPatient): Promise<Array<DSService>>

    /**
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
    subscribeToEvents(eventTypes: ('CREATE' | 'UPDATE' | 'DELETE')[], filter: Filter<DSService>, eventFired: (service: DSService) => Promise<void>, options?: { connectionMaxRetry?: number; connectionRetryIntervalMs?: number }): Promise<Connection>

    extractPatientId(service: DSService): Promise<string | undefined>

    /**
     * Data Samples may contain attachments such as prescriptions, reports, ... Use this method to get the content of an attachment
     * Get attachment content of a Service
     * @param id
     * @param documentId
     */
    getAttachmentContent(id: string, documentId: string): Promise<ArrayBuffer>

    /**
     * Data Samples may contain attachments such as prescriptions, reports, ... Use this method to get the document metadata information of an attachment
     * Get document metadata of a Service attachment
     * @param id
     * @param documentId
     */
    getAttachmentDocument(id: string, documentId: string): Promise<DSDocument>

    /**
     * Deletes an attachment, using its corresponding documentId
     * Delete an attachment of a Service
     * @param id
     * @param documentId
     */
    deleteAttachment(id: string, documentId: string): Promise<string>

    /**
     * Link an attachment or update the attachment of a data sample
     * Add or update the attachment of a Service
     * @param id
     * @param body
     * @param documentName
     * @param documentVersion
     * @param documentExternalUuid
     * @param documentLanguage
     */
    setAttachment(
      id: string,
      body: ArrayBuffer,
      documentName?: string,
      documentVersion?: string,
      documentExternalUuid?: string,
      documentLanguage?: string
    ): Promise<DSDocument>
}
