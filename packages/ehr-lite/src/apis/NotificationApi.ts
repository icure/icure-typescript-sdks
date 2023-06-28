import { ErrorHandler, MaintenanceTaskLikeApiImpl, mapMaintenanceTaskToNotification, mapNotificationToMaintenanceTask, Notification } from '@icure/typescript-common'
import { IccUserXApi, MaintenanceTask } from '@icure/api'
import { IccDataOwnerXApi } from '@icure/api/icc-x-api/icc-data-owner-x-api'
import { IccMaintenanceTaskXApi } from '@icure/api/icc-x-api/icc-maintenance-task-x-api'

export const notificationApi = (errorHandler: ErrorHandler, maintenanceTaskApi: IccMaintenanceTaskXApi, userApi: IccUserXApi, dataOwnerApi: IccDataOwnerXApi) => {
    return new MaintenanceTaskLikeApiImpl<Notification>(
        {
            toDomain(dto: MaintenanceTask): Notification {
                return mapMaintenanceTaskToNotification(dto)
            },
            toDto(domain: Notification): MaintenanceTask {
                return mapNotificationToMaintenanceTask(domain)
            },
        },
        errorHandler,
        maintenanceTaskApi,
        userApi,
        dataOwnerApi
    )
}
