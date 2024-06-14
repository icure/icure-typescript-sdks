import { CommonApi, MaintenanceTaskDto, MaintenanceTaskLikeApi, MaintenanceTaskLikeApiImpl, mapMaintenanceTaskToNotification, mapNotificationToMaintenanceTask, Notification } from '@icure/typescript-common'

export interface NotificationApi extends MaintenanceTaskLikeApi<Notification> {}

class NotificationApiImpl extends MaintenanceTaskLikeApiImpl<Notification> {}

export const notificationApi = (api: CommonApi, basePath: string): NotificationApi => {
    return new NotificationApiImpl(
        {
            toDomain(dto: MaintenanceTaskDto): Notification {
                return mapMaintenanceTaskToNotification(dto)
            },
            toDto(domain: Notification): MaintenanceTaskDto {
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
