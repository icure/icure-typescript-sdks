import { Filter } from '../../filters/Filter'
import { PaginatedList } from '../../models/PaginatedList.model'
import { Connection } from '../../models/Connection.model'
import { FilterChainMaintenanceTask, IccUserXApi, MaintenanceTask, PaginatedListMaintenanceTask, User } from '@icure/api'
import { MaintenanceTaskLikeApi } from '../MaintenanceTaskLikeApi'
import { Mapper } from '../Mapper'
import { ErrorHandler } from '../../services/ErrorHandler'
import { IccMaintenanceTaskXApi } from '@icure/api/icc-x-api/icc-maintenance-task-x-api'
import { IccDataOwnerXApi } from '@icure/api/icc-x-api/icc-data-owner-x-api'
import { NoOpFilter } from '../../filters/dsl/filterDsl'
import { FilterMapper } from '../../mappers/Filter.mapper'
import { MaintenanceTaskFilter } from '../../filters/dsl/MaintenanceTaskFilterDsl'
import { CommonApi } from '../CommonApi'
import { AccessLevelEnum } from '../../models/enums/AccessLevel.enum'
import {CommonFilter} from "../../filters/filters";
import {toPaginatedList} from "../../mappers/PaginatedList.mapper";

export class MaintenanceTaskLikeApiImpl<DSMaintenanceTask> implements MaintenanceTaskLikeApi<DSMaintenanceTask> {
    constructor(
        private readonly mapper: Mapper<DSMaintenanceTask, MaintenanceTask>,
        private readonly errorHandler: ErrorHandler,
        private readonly maintenanceTaskApi: IccMaintenanceTaskXApi,
        private readonly userApi: IccUserXApi,
        private readonly dataOwnerApi: IccDataOwnerXApi,
        private readonly api: CommonApi
    ) {}

    async createOrModify(maintenanceTask: DSMaintenanceTask, delegate?: string): Promise<DSMaintenanceTask | undefined> {
        return this.mapper.toDomain(await this._createOrModify(this.mapper.toDto(maintenanceTask), delegate))
    }

    private async _createOrModify(maintenanceTask: MaintenanceTask, delegate?: string): Promise<MaintenanceTask> {
        return this.userApi
            .getCurrentUser()
            .then((user) => {
                if (!user) throw this.errorHandler.createErrorWithMessage('There is no user currently logged in. You must call this method from an authenticated MedTechApi')
                return !maintenanceTask?.rev ? this._createNotification(maintenanceTask, user, delegate) : this._updateNotification(maintenanceTask, user)
            })
            .catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })
    }

    delete(id: string): Promise<string> {
        return this.userApi
            .getCurrentUser()
            .then((user) => {
                if (!user) throw new Error('There is no user currently logged in. You must call this method from an authenticated MedTechApi')
                return this.maintenanceTaskApi.deleteMaintenanceTaskWithUser(user, id).then((identifiers) => {
                    const res = identifiers?.[0]?.id
                    if (!res) throw new Error(`Could not delete notification with id ${id}`)
                    return res
                })
            })
            .catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })
    }

    async filterBy(filter: Filter<MaintenanceTask>, nextMaintenanceTaskId?: string, limit?: number): Promise<PaginatedList<DSMaintenanceTask>> {
        if (NoOpFilter.isNoOp(filter)) {
            return PaginatedList.empty()
        } else {
            return this.userApi.getCurrentUser().then((user) => {
                if (!user) throw this.errorHandler.createErrorWithMessage('There is no user currently logged in. You must call this method from an authenticated MedTechApi')
                return this.maintenanceTaskApi
                    .filterMaintenanceTasksByWithUser(
                        user,
                        nextMaintenanceTaskId,
                        limit,
                        new FilterChainMaintenanceTask({
                            filter: FilterMapper.toAbstractFilterDto(filter, 'MaintenanceTask'),
                        })
                    )
                    .then((paginatedList) => {
                        return toPaginatedList(paginatedList, this.mapper.toDomain)
                    })
                    .catch((e) => {
                        throw this.errorHandler.createErrorFromAny(e)
                    })
            })
        }
    }

    get(id: string): Promise<DSMaintenanceTask | undefined> {
        return this.userApi
            .getCurrentUser()
            .then((user) => {
                if (!user) throw this.errorHandler.createErrorWithMessage('There is no user currently logged in. You must call this method from an authenticated MedTechApi')
                return this.maintenanceTaskApi.getMaintenanceTaskWithUser(user, id).then((task) => {
                    return this.mapper.toDomain(task)
                })
            })
            .catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })
    }

    async getPendingAfter(fromDate?: number): Promise<Array<DSMaintenanceTask>> {
        const user = await this.userApi.getCurrentUser().catch((e) => {
            throw this.errorHandler.createErrorFromAny(e)
        })
        if (!user) {
            throw this.errorHandler.createErrorWithMessage('There is no user currently logged in. You must call this method from an authenticated MedTechApi')
        }
        if (!this.dataOwnerApi.getDataOwnerIdOf(user)) {
            throw this.errorHandler.createErrorWithMessage('The current user is not a data owner. You must been either a patient, a device or a healthcare professional to call this method.')
        }

        const filter = await new MaintenanceTaskFilter(this.api).forDataOwner(this.dataOwnerApi.getDataOwnerIdOf(user)).afterDate(fromDate).build()

        return (await this.concatenateFilterResults(filter)).filter((it) => this.mapper.toDto(it).status === 'pending')
    }

    async concatenateFilterResults(filter: Filter<Notification>, nextId?: string | undefined, limit?: number | undefined, accumulator: Array<DSMaintenanceTask> = []): Promise<Array<DSMaintenanceTask>> {
        const paginatedNotifications = await this.filterBy(filter, nextId, limit)
        return !paginatedNotifications.nextKeyPair?.startKeyDocId ? accumulator.concat(paginatedNotifications.rows ?? []) : this.concatenateFilterResults(filter, paginatedNotifications.nextKeyPair.startKeyDocId, limit, accumulator.concat(paginatedNotifications.rows ?? []))
    }

    subscribeToEvents(
        eventTypes: ('CREATE' | 'UPDATE' | 'DELETE')[],
        filter: CommonFilter<MaintenanceTask>,
        eventFired: (dataSample: DSMaintenanceTask) => Promise<void>,
        options?: {
            connectionMaxRetry?: number
            connectionRetryIntervalMs?: number
        }
    ): Promise<Connection> {
        throw 'TODO'
    }

    async updateStatus(maintenanceTask: DSMaintenanceTask, newStatus: MaintenanceTask.StatusEnum): Promise<DSMaintenanceTask> {
        const mapped = this.mapper.toDto(maintenanceTask)
        return this.mapper.toDomain(await this._createOrModify({ ...mapped, status: newStatus }))
    }

    private async _updateNotification(maintenanceTask: MaintenanceTask, user: User): Promise<any> {
        if (!maintenanceTask.id) throw this.errorHandler.createErrorWithMessage('Invalid maintenanceTask')
        return this.maintenanceTaskApi.modifyMaintenanceTaskWithUser(user, maintenanceTask).catch((e) => {
            throw this.errorHandler.createErrorFromAny(e)
        })
    }

    private async _createNotification(maintenanceTask: MaintenanceTask, user: User, delegate?: string): Promise<any> {
        if (!delegate) throw this.errorHandler.createErrorWithMessage('No delegate provided for NotificationModel creation. You must provide a delegate to create a NotificationModel. The delegate is the id of the data owner you want to notify.')

        if (maintenanceTask.author != undefined && maintenanceTask.author != user.id) {
            throw this.errorHandler.createErrorWithMessage('You can set the author only to your user id (if undefined will automatically be set by the server)')
        }
        if (maintenanceTask.responsible != undefined && maintenanceTask.responsible != this.dataOwnerApi.getDataOwnerIdOf(user)) {
            throw this.errorHandler.createErrorWithMessage('You can set the responsible only to your data owner id (if undefined will automatically be set by the server)')
        }
        return this.maintenanceTaskApi
            .newInstance(user, maintenanceTask, { additionalDelegates: { [delegate]: AccessLevelEnum.WRITE } })
            .then((task) => {
                return this.maintenanceTaskApi.createMaintenanceTaskWithUser(user, task)
            })
            .catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })
    }
}
