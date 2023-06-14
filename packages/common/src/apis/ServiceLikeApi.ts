import { Document } from '../models/Document'
import { Filter } from '../filter/Filter'
import { Connection } from '../models/Connection'
import {PaginatedList} from "../models/PaginatedList";

/**
 * The ServiceApi interface provides methods to manage data samples.
 */
export interface ServiceLikeApi<DSService, DSPatient, DSDocument> {
  /**
   * When modifying a data sample, you can't update the patient of it : For this, you need to delete the faulty data sample and create a new one. When modifying the data sample, you also need to keep the same batchId : It is not possible to change the batch of a data sample.
   * Create or update a [Service] for a patient
   * @param patientId
   * @param service
   */
  createOrModifyFor(patientId: string, service: DSService): Promise<DSService>

  /**
   * All the provided data samples will be created in the same batch. If you are trying to update some data samples, then those ones need to come from the same batch.                  When modifying a data sample, you can't update the patient of it : For this, you need to delete the faulty data sample and create a new one. When modifying the data sample, you also need to keep the same batchId : It is not possible to change the batch of a data sample.
   * Create or update a batch of [Service] for a patient
   * @param patientId
   * @param service
   */
  createOrModifyManyFor(patientId: string, service: Array<DSService>): Promise<Array<DSService>>

  /**
   * Deletes an attachment, using its corresponding documentId
   * Delete an attachment of a Service
   * @param id
   * @param documentId
   */
  deleteAttachment(id: string, documentId: string): Promise<string>

  /**
   * Deletes the data sample identified by the provided unique [id].
   * Delete a [Service] by its id
   * @param id
   */
  delete(id: string): Promise<string>

  /**
   * Deletes the batch of data samples identified by the provided [ids]. The data samples to delete need to be part of the same batch
   * Delete a batch of [Data Samples]
   * @param requestBody
   */
  deleteMany(requestBody: Array<string>): Promise<Array<string>>

  /**
   * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [Service] are :
   *  - ServiceByHealthcarePartyFilter;
   *  - ServiceByHealthcarePartyHealthcareElementFilter;
   *  - ServiceByHealthcarePartyIdentifiersFilter;
   *  - ServiceByHealthcarePartyPatientFilter;
   *  - ServiceByHealthcarePartyTagCodeDateFilter;
   *  - and ServicesByIdsFilter.
   *
   * This method returns a paginated list of data samples (with a cursor that lets you query the following items).
   * Find data samples using the provided [filter].
   * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
   * @param nextServiceId The id of the first data sample in the next page
   * @param limit The maximum number of data samples that should contain the returned page. By default, a page contains 1000 data samples
   */
  filterBy(filter: Filter<DSService>, nextServiceId?: string, limit?: number): Promise<PaginatedList<DSService>>

  /**
   * Each data sample is uniquely identified by a data sample id which is a UUID. This [id] is the preferred method to retrieve one specific data sample.
   * Get a [Service] by its id
   * @param id
   */
  get(id: string): Promise<DSService>

  /**
   * Data Samples may contain attachments such as prescriptions, reports, ... Use this method to get the content of an attachment
   * Get attachment content of a Service
   * @param id
   * @param documentId
   * @param attachmentId
   */
  getAttachmentContent(id: string, documentId: string, attachmentId: string): Promise<ArrayBuffer>

  /**
   * Data Samples may contain attachments such as prescriptions, reports, ... Use this method to get the document metadata information of an attachment
   * Get document metadata of a Service attachment
   * @param id
   * @param documentId
   */
  getAttachmentDocument(id: string, documentId: string): Promise<Document>

  /**
   * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [Service] are AllServicesFilter and ServicesByIdsFilter. This method returns a paginated list of data samples (with a cursor that lets you query the following items).
   * Find data samples ids using the provided Filter.
   * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
   */
  matchBy(filter: Filter<DSService>): Promise<Array<string>>

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
  ): Promise<Document>

  /**
   * Service where current user gives access to the data sample information to another dataOwner (HCP, patient or device).
   * For this, the current user data owner should be able to access the data sample provided in argument in order to provide access to another data owner.

   * @param service Data Sample the current data owner would like to share with another data owner
   * @param delegatedTo ID of the data owner to which current user would like to give access
   *
   * @return The service with updated access rights
   */
  giveAccessTo(service: DSService, delegatedTo: string): Promise<DSService>

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
  subscribeToServiceEvents(
    eventTypes: ('CREATE' | 'UPDATE' | 'DELETE')[],
    filter: Filter<DSService>,
    eventFired: (service: DSService) => Promise<void>,
    options?: { connectionMaxRetry?: number; connectionRetryIntervalMs?: number }
  ): Promise<Connection>

  extractPatientId(service: DSService): Promise<string | undefined>
}
