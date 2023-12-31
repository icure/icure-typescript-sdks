import { Connection, MaintenanceTask, SubscriptionOptions } from '@icure/api'
import { PaginatedList } from '../models/PaginatedList.model'
import { CommonFilter } from '../filters/filters'

/**
 * The MaintenanceTaskApi interface provides methods to subscribe to notifications.
 */
export interface MaintenanceTaskLikeApi<DSMaintenanceTask> {
    /**
     * This method creates a MaintenanceTask if the rev field is undefined, otherwise it updates an existing one.
     * @param notification the MaintenanceTask to create or modify.
     * @param delegate the id of the Healthcare Party to delegate.
     * @return a Promise containing the MaintenanceTask or undefined if something goes wrong.
     */
    createOrModify(notification: DSMaintenanceTask, delegate?: string): Promise<DSMaintenanceTask | undefined>

    /**
     * This method deletes the MaintenanceTask with the provided id.
     * @param id the id of the MaintenanceTask to delete
     * @return a Promise containing the id of the MaintenanceTask
     */
    delete(id: string): Promise<string>

    /**
     * Filters are complex selectors that are built by combining basic building blocks. You can learn more on how to build filters here {@link https://docs.icure.com/sdks/how-to/how-to-filter-data-with-advanced-search-criteria}. This method returns a paginated list of MaintenanceTask (with a cursor that lets you query the following items).
     * Load notifications from the database by filtering them using the provided [filter].
     * @param filter The Filter object that describes which condition(s) the elements which the ids should be returned must fulfill
     * @param nextMaintenanceTaskId The id of the first notification in the next page
     * @param limit The number of patients to return in the queried page
     * @return a Promise containing the PaginatedList of MaintenanceTask objects
     */
    filterBy(filter: CommonFilter<MaintenanceTask>, nextMaintenanceTaskId?: string, limit?: number): Promise<PaginatedList<DSMaintenanceTask>>

    /**
     * This method returns a Promise containing the MaintenanceTask with the specified id.
     * @param id the id of the MaintenanceTask to retrieve.
     * @return a Promise containing the MaintenanceTask or undefined if something goes wrong.
     */
    get(id: string): Promise<DSMaintenanceTask | undefined>

    /**
     * Gets all the MaintenanceTasks with status "pending" that the current dataOwner can access
     *
     * @param fromDate : Default value is now less 30 days
     * @return an Array of the MaintenanceTasks matching those criteria
     */
    getPendingAfter(fromDate?: number): Promise<Array<DSMaintenanceTask>>

    /**
     * Updates the status of a MaintenanceTask.
     * @param notification the MaintenanceTask to update
     * @param newStatus the new status
     * @return the updated MaintenanceTask
     */
    updateStatus(notification: DSMaintenanceTask, newStatus: MaintenanceTask.StatusEnum): Promise<DSMaintenanceTask>

    /**
     * Opens a WebSocket Connection in order to receive all the MaintenanceTask corresponding to specific filter criteria.
     * @param eventTypes Type of event you would like to listen. It can be CREATE or UPDATE
     * @param filter Filter criteria to filter to the notification you would like to receive
     * @param eventFired Action applied each time you receive a notification through the WebSocket
     * @param options Options to configure the WebSocket.
     *    - keepAlive : How long to keep connection alive (ms);
     *    - lifetime : How long to keep the WebSocket alive (ms);
     *    - connectionMaxRetry : how many time retrying to reconnect to the iCure WebSocket;
     *    - connectionRetryIntervalInMs : How long base interval will be between two retry. The retry attempt is exponential and using a random value (connectionRetryIntervalMs * (random between 1 and 2))^nbAttempts)
     */
    subscribeToEvents(eventTypes: ('CREATE' | 'UPDATE')[], filter: CommonFilter<MaintenanceTask>, eventFired: (dataSample: DSMaintenanceTask) => Promise<void>, options?: SubscriptionOptions): Promise<Connection>
}
