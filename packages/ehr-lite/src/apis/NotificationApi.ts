import {
    CommonApi,
    MaintenanceTaskLikeApi,
    MaintenanceTaskLikeApiImpl,
    mapMaintenanceTaskToNotification,
    mapNotificationToMaintenanceTask,
    Notification
} from '@icure/typescript-common'
import {MaintenanceTask} from '@icure/api'

export interface NotificationApi extends MaintenanceTaskLikeApi<Notification> {}
class NotificationApiImpl extends MaintenanceTaskLikeApiImpl<Notification> {}

export const notificationApi = (api: CommonApi): NotificationApi => {
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
        api
    )
}
