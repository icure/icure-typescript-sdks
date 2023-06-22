import {ErrorHandler, MaintenanceTaskLikeApiImpl, Notification} from "@icure/typescript-common";
import {mapper} from "../mappers/mapper";
import {IccUserXApi, MaintenanceTask} from "@icure/api";
import {IccDataOwnerXApi} from "@icure/api/icc-x-api/icc-data-owner-x-api";
import {IccMaintenanceTaskXApi} from "@icure/api/icc-x-api/icc-maintenance-task-x-api";

export const notificationApi = (
    errorHandler: ErrorHandler,
    maintenanceTaskApi: IccMaintenanceTaskXApi,
    userApi: IccUserXApi,
    dataOwnerApi: IccDataOwnerXApi,
) => {
    return new MaintenanceTaskLikeApiImpl<Notification>(
        {
            toDomain(dto: MaintenanceTask): Notification {
                return mapper.map(dto, MaintenanceTask, Notification)!
            },
            toDto(domain: Notification): MaintenanceTask {
                return mapper.map(domain, Notification, MaintenanceTask)!
            }
        },
        errorHandler,
        maintenanceTaskApi,
        userApi,
        dataOwnerApi
    )
}