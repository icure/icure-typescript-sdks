import {
    CommonApi,
    ErrorHandler,
    MaintenanceTaskLikeApiImpl,
    mapMaintenanceTaskToNotification,
    mapNotificationToMaintenanceTask,
    Notification,
    PaginatedList
} from '@icure/typescript-common'
import {IccUserXApi, MaintenanceTask, PaginatedListMaintenanceTask} from '@icure/api'
import { IccDataOwnerXApi } from '@icure/api/icc-x-api/icc-data-owner-x-api'
import { IccMaintenanceTaskXApi } from '@icure/api/icc-x-api/icc-maintenance-task-x-api'

export const notificationApi = (errorHandler: ErrorHandler, maintenanceTaskApi: IccMaintenanceTaskXApi, userApi: IccUserXApi, dataOwnerApi: IccDataOwnerXApi, api: CommonApi) => {
    return new MaintenanceTaskLikeApiImpl<Notification>(
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
                    rows: dto.rows?.map(mapMaintenanceTaskToNotification)
                }
            },
            toDto(domain: PaginatedList<Notification>): PaginatedListMaintenanceTask {
                return {
                    ...domain,
                    rows: domain.rows?.map(mapNotificationToMaintenanceTask)
                }
            }
        },
        errorHandler,
        maintenanceTaskApi,
        userApi,
        dataOwnerApi,
        api
    )
}
