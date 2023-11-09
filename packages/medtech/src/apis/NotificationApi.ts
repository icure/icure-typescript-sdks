import { CommonApi, CommonFilter, MaintenanceTaskLikeApi, MaintenanceTaskLikeApiImpl, mapMaintenanceTaskToNotification, mapNotificationToMaintenanceTask, Notification, PaginatedList } from '@icure/typescript-common'
import { Connection, MaintenanceTask, SubscriptionOptions } from '@icure/api'

export interface NotificationApi extends MaintenanceTaskLikeApi<Notification> {
    /**
     * @deprecated use {@link NotificationApi.createOrModify} instead.
     *
     * This method creates a Notification if the rev field is undefined, otherwise it updates an existing one.
     * @param notification the Notification to create or modify.
     * @param delegate the id of the Healthcare Party to delegate.
     * @return a Promise containing the Notification or undefined if something goes wrong.
     */
    createOrModifyNotification(notification: Notification, delegate?: string): Promise<Notification | undefined>

    /**
     * @deprecated use {@link NotificationApi.delete} instead.
     *
     * This method deletes the Notification with the provided id.
     * @param notificationId the id of the Notification to delete
     * @return a Promise containing the id of the Notification or undefined if something goes wrong.
     */
    deleteNotification(notificationId: string): Promise<string | undefined>

    /**
     * @deprecated use {@link NotificationApi.filter} instead.
     *
     * Filters are complex selectors that are built by combining basic building blocks. This method returns a paginated list of Notification (with a cursor that lets you query the following items).
     * Load notifications from the database by filtering them using the provided [filter].
     * @param filter The Filter object that describes which condition(s) the elements which the ids should be returned must fulfill
     * @param nextNotificationId The id of the first notification in the next page
     * @param limit The number of patients to return in the queried page
     * @return a Promise containing the PaginatedList of Notification objects
     */
    filterNotifications(filter: CommonFilter<MaintenanceTask>, nextNotificationId?: string, limit?: number): Promise<PaginatedList<Notification>>

    /**
     * @deprecated use {@link NotificationApi.get} instead.
     *
     * This method returns a Promise containing the Notification with the specified id.
     * @param notificationId the id of the Notification to retrieve.
     * @return a Promise containing the Notification or undefined if something goes wrong.
     */
    getNotification(notificationId: string): Promise<Notification | undefined>

    /**
     * @deprecated use {@link NotificationApi.getPendingAfter} instead.
     *
     * Gets all the Notifications with status "pending" that the current dataOwner can access
     *
     * @param fromDate : Default value is now less 30 days
     * @return an Array of the Notifications matching those criteria
     */
    getPendingNotificationsAfter(fromDate?: number): Promise<Array<Notification>>

    /**
     * @deprecated use {@link NotificationApi.updateNotificationStatus} instead.
     *
     * Updates the status of a Notification.
     * @param notification the Notification to update
     * @param newStatus the new status
     * @return the updated Notification
     */
    updateNotificationStatus(notification: Notification, newStatus: MaintenanceTask.StatusEnum): Promise<Notification | undefined>

    /**
     * @deprecated use {@link NotificationApi.subscribeToEvents} instead.
     *
     * Opens a WebSocket Connection in order to receive all the Notification corresponding to specific filter criteria.
     * @param eventTypes Type of event you would like to listen. It can be CREATE or UPDATE
     * @param filter Filter criteria to filter to the notification you would like to receive
     * @param eventFired Action applied each time you receive a notification through the WebSocket
     * @param options Options to configure the WebSocket.
     *    - keepAlive : How long to keep connection alive (ms);
     *    - lifetime : How long to keep the WebSocket alive (ms);
     *    - connectionMaxRetry : how many time retrying to reconnect to the iCure WebSocket;
     *    - connectionRetryIntervalInMs : How long base interval will be between two retry. The retry attempt is exponential and using a random value (connectionRetryIntervalMs * (random between 1 and 2))^nbAttempts)
     */
    subscribeToNotificationEvents(eventTypes: ('CREATE' | 'UPDATE')[], filter: CommonFilter<MaintenanceTask>, eventFired: (dataSample: Notification) => Promise<void>, options?: SubscriptionOptions): Promise<Connection>
}

/**
 * The NotificationApi interface provides methods to subscribe to notifications.
 */
class NotificationApiImpl extends MaintenanceTaskLikeApiImpl<Notification> implements NotificationApi {
    createOrModifyNotification(notification: Notification, delegate?: string): Promise<Notification | undefined> {
        return this.createOrModify(notification, delegate)
    }
    deleteNotification(notificationId: string): Promise<string | undefined> {
        return this.delete(notificationId)
    }
    filterNotifications(filter: CommonFilter<MaintenanceTask>, nextNotificationId?: string, limit?: number): Promise<PaginatedList<Notification>> {
        return this.filterBy(filter, nextNotificationId, limit)
    }
    getNotification(notificationId: string): Promise<Notification | undefined> {
        return this.get(notificationId)
    }
    getPendingNotificationsAfter(fromDate?: number): Promise<Array<Notification>> {
        return this.getPendingAfter(fromDate)
    }
    updateNotificationStatus(notification: Notification, newStatus: MaintenanceTask.StatusEnum): Promise<Notification | undefined> {
        return this.updateStatus(notification, newStatus)
    }
    subscribeToNotificationEvents(eventTypes: ('CREATE' | 'UPDATE')[], filter: CommonFilter<MaintenanceTask>, eventFired: (dataSample: Notification) => Promise<void>, options?: SubscriptionOptions): Promise<Connection> {
        return this.subscribeToEvents(eventTypes, filter, eventFired, options)
    }
}

export const notificationApi = (api: CommonApi, basePath: string): NotificationApi => {
    return new NotificationApiImpl(
        {
            toDomain(dto: MaintenanceTask): Notification {
                return mapMaintenanceTaskToNotification(dto)
            },
            toDto(domain: Notification): MaintenanceTask {
                return mapNotificationToMaintenanceTask(domain)
            },
        },
        api.errorHandler,
        api.baseApi.maintenanceTaskApi,
        api.baseApi.userApi,
        api.baseApi.dataOwnerApi,
        api.baseApi.authApi,
        api,
        basePath,
    )
}
