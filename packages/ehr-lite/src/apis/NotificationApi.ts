import { CommonApi, ErrorHandler, MaintenanceTaskLikeApiImpl, mapMaintenanceTaskToNotification, mapNotificationToMaintenanceTask, Notification, PaginatedList } from '@icure/typescript-common'
import { IccUserXApi, MaintenanceTask, PaginatedListMaintenanceTask } from '@icure/api'
import { IccDataOwnerXApi } from '@icure/api/icc-x-api/icc-data-owner-x-api'
import { IccMaintenanceTaskXApi } from '@icure/api/icc-x-api/icc-maintenance-task-x-api'

export class NotificationApi extends MaintenanceTaskLikeApiImpl<Notification> {}

export const notificationApi = (api: CommonApi) => {
    return new NotificationApi(
        {
            toDomain(dto: MaintenanceTask): Notification {
                return mapMaintenanceTaskToNotification(dto)
            },
            toDto(domain: Notification): MaintenanceTask {
                return mapNotificationToMaintenanceTask(domain)
            },
        },
        {
            toDomain(dto: PaginatedListMaintenanceTask): PaginatedList<Notification> {
                return {
                    ...dto,
                    rows: dto.rows?.map(mapMaintenanceTaskToNotification),
                }
            },
            toDto(domain: PaginatedList<Notification>): PaginatedListMaintenanceTask {
                return {
                    ...domain,
                    rows: domain.rows?.map(mapNotificationToMaintenanceTask),
                }
            },
        },
        api.errorHandler,
        api.baseApi.maintenanceTaskApi,
        api.baseApi.userApi,
        api.baseApi.dataOwnerApi,
        api
    )
}
