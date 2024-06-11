import { PaginatedList } from '../models/PaginatedList.model'
import { Connection, Contact, SubscriptionOptions } from '@icure/api'
import { CommonFilter } from '../filters/filters'

/**
 * The ContactApi interface provides methods to manage Contacts.
 */
export interface ContactLikeApi<DSContact, DSPatient, DSDocument> {
    /**
     *
     * When modifying a data sample, you can't update the patient of it : For this, you need to delete the faulty data
     * sample and create a new one. When modifying the data sample, you also need to keep the same batchId : It is not
     * possible to change the batch of a data sample.
     * Create or update a [Contact] for a patient.
     *
     * If you want to create many contacts at once you should use the {@link createOrModifyManyFor} method, as it is
     * more efficient, both in terms of requests and space used, since the contacts will be "batched" together.
     *
     * If you modify a data sample part of a batch it will be extracted from it.
     * @param patientId
     * @param contact
     */
    createOrModifyFor(patientId: string, contact: DSContact): Promise<DSContact>

    /**
     * All the provided data samples will be created in the same batch.
     * If you are trying to update some data samples, then those ones need to come from the same batch.
     * When modifying a data sample, you can't update the patient of it : for this, you need to delete the faulty data
     * sample and create a new one.
     * When modifying the data sample, you also need to keep the same batchId : It is not possible to change the batch
     * of a data sample.
     * Create or update a batch of [Contact] for a patient.
     * Note that if you modify only a part of the batch, the modified data samples will be extracted from their original
     * batch into a new one.
     * @param patientId
     * @param contacts
     * @experimental This feature is still experimental and may not always work as expected when sharing only a subset
     * of the contacts of a batch (through the {@link giveAccessTo} or {@link giveAccessToMany} methods) . You should
     * avoid doing this in production for now.
     */
    createOrModifyManyFor(patientId: string, contacts: Array<DSContact>): Promise<Array<DSContact>>

    /**
     * Deletes the data sample identified by the provided unique [id].
     * Delete a [Contact] by its id
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
     * @param nextContactId The id of the first data sample in the next page
     * @param limit The maximum number of data samples that should contain the returned page. By default, a page contains 1000 data samples
     */
    filterBy(filter: CommonFilter<Contact>, nextContactId?: string, limit?: number): Promise<PaginatedList<DSContact>>

    /**
     * Each data sample is uniquely identified by a data sample id which is a UUID. This [id] is the preferred method to retrieve one specific data sample.
     * Get a [Contact] by its id
     * @param id
     */
    get(id: string): Promise<DSContact>

    /**
     * Filters are complex selectors that are built by combining basic building blocks. You can learn more on how to build filters here {@link https://docs.icure.com/sdks/how-to/how-to-filter-data-with-advanced-search-criteria}. This method returns a paginated list of data samples (with a cursor that lets you query the following items).
     * Find data samples ids using the provided Filter.
     * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
     */
    matchBy(filter: CommonFilter<Contact>): Promise<Array<string>>

    /**
     * Shares a contact with another data owner (HCP, patient or device), allowing them to access the contact
     * information from now on.
     * The {@link delegatedTo} data owner will be able both to retrieve and to decrypt the contact.
     * For this, the current user data owner should be able to access the data sample provided in argument in order to
     * provide access to another data owner.
     *
     * Note that if the contact was part of a batch this method will take the contact out of the batch. If you want to
     * share multiple contacts part of the same batch to the delegate you should instead use the {@link giveAccessToMany}
     * method.
     * @param contact The Contact the current data owner would like to share with another data owner
     * @param delegatedTo ID of the data owner to which current user would like to give access
     * @return The contact with updated access rights
     */
    giveAccessTo(contact: DSContact, delegatedTo: string): Promise<DSContact>

    /**
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
    subscribeToEvents(eventTypes: ('CREATE' | 'UPDATE')[], filter: CommonFilter<Contact>, eventFired: (contact: DSContact) => Promise<void>, options?: SubscriptionOptions): Promise<Connection>

    extractPatientId(contact: DSContact): Promise<string | undefined>
}
