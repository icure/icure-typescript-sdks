import { Filter } from '../../filters/Filter'
import { PaginatedList } from '../../models/PaginatedList.model'
import { Connection } from '../../models/Connection.model'
import {
    FilterChainMaintenanceTask,
    IccUserXApi,
    MaintenanceTask,
    PaginatedListMaintenanceTask,
    SecureDelegation,
    User
} from '@icure/api'
import { MaintenanceTaskLikeApi } from '../MaintenanceTaskLikeApi'
import { Mapper } from '../Mapper'
import { ErrorHandler } from '../../services/ErrorHandler'
import { IccMaintenanceTaskXApi } from '@icure/api/icc-x-api/icc-maintenance-task-x-api'
import { deepEquality } from '../../utils/equality'
import AccessLevelEnum = SecureDelegation.AccessLevelEnum
import { IccDataOwnerXApi } from '@icure/api/icc-x-api/icc-data-owner-x-api'
import {NoOpFilter} from "../../filters/dsl/filterDsl";
import {FilterMapper} from "../../mappers/Filter.mapper";
import {MaintenanceTaskFilter} from "../../filters/dsl/MaintenanceTaskFilterDsl";
import {CommonApi} from "../CommonApi";

export class MaintenanceTaskLikeApiImpl<DSMaintenanceTask> implements MaintenanceTaskLikeApi<DSMaintenanceTask> {
    constructor(
        private readonly mapper: Mapper<DSMaintenanceTask, MaintenanceTask>,
        private readonly paginatedListMapper: Mapper<PaginatedList<DSMaintenanceTask>, PaginatedListMaintenanceTask>,
        private readonly errorHandler: ErrorHandler,
        private readonly maintenanceTaskApi: IccMaintenanceTaskXApi,
        private readonly userApi: IccUserXApi,
        private readonly dataOwnerApi: IccDataOwnerXApi,
        private readonly api: CommonApi
    ) {}

    createOrModify(maintenanceTask: DSMaintenanceTask, delegate?: string): Promise<DSMaintenanceTask | undefined> {
        return this.userApi
            .getCurrentUser()
            .then((user) => {
                if (!user) throw this.errorHandler.createErrorWithMessage('There is no user currently logged in. You must call this method from an authenticated MedTechApi')
                const mappedMaintenanceTask = this.mapper.toDto(maintenanceTask)
                const maintenanceTaskPromise = !mappedMaintenanceTask?.rev ? this._createNotification(mappedMaintenanceTask, user, delegate) : this._updateNotification(mappedMaintenanceTask, user)
                return maintenanceTaskPromise.then((createdTask) => {
                    return this.mapper.toDomain(createdTask)
                })
            })
            .catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })
    }

    delete(id: string): Promise<string | undefined> {
        return this.userApi
            .getCurrentUser()
            .then((user) => {
                if (!user) throw new Error('There is no user currently logged in. You must call this method from an authenticated MedTechApi')
                return this.maintenanceTaskApi.deleteMaintenanceTaskWithUser(user, id).then((identifiers) => {
                    if (!identifiers || identifiers.length == 0) return undefined
                    return identifiers[0].id
                })
            })
            .catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })
    }

    async filterBy(filter: Filter<MaintenanceTask>, nextMaintenanceTaskId?: string, limit?: number): Promise<PaginatedList<DSMaintenanceTask>> {
        if (NoOpFilter.isNoOp(filter)) {
            return { totalSize: 0, pageSize: 0, rows: [] }
        } else {
            return this.userApi.getCurrentUser().then((user) => {
                if (!user)
                    throw this.errorHandler.createErrorWithMessage(
                        'There is no user currently logged in. You must call this method from an authenticated MedTechApi'
                    )
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
                        return this.paginatedListMapper.toDomain(paginatedList)!
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
            throw this.errorHandler.createErrorWithMessage(
                'There is no user currently logged in. You must call this method from an authenticated MedTechApi'
            )
        }
        if (!this.dataOwnerApi.getDataOwnerIdOf(user)) {
            throw this.errorHandler.createErrorWithMessage(
                'The current user is not a data owner. You must been either a patient, a device or a healthcare professional to call this method.'
            )
        }

        const filter = await new MaintenanceTaskFilter(this.api).forDataOwner(this.dataOwnerApi.getDataOwnerIdOf(user)).afterDate(fromDate).build()

        return (await this.concatenateFilterResults(filter)).filter((it) => this.mapper.toDto(it).status === 'pending')
    }

    async concatenateFilterResults(
        filter: Filter<Notification>,
        nextId?: string | undefined,
        limit?: number | undefined,
        accumulator: Array<DSMaintenanceTask> = []
    ): Promise<Array<DSMaintenanceTask>> {
        const paginatedNotifications = await this.filterBy(filter, nextId, limit)
        return !paginatedNotifications.nextKeyPair?.startKeyDocId
            ? accumulator.concat(paginatedNotifications.rows ?? [])
            : this.concatenateFilterResults(
                filter,
                paginatedNotifications.nextKeyPair.startKeyDocId,
                limit,
                accumulator.concat(paginatedNotifications.rows ?? [])
            )
    }

    subscribeTo(
        eventTypes: ('CREATE' | 'UPDATE' | 'DELETE')[],
        filter: Filter<DSMaintenanceTask>,
        eventFired: (dataSample: DSMaintenanceTask) => Promise<void>,
        options?: {
            connectionMaxRetry?: number
            connectionRetryIntervalMs?: number
        }
    ): Promise<Connection> {
        throw 'TODO'
    }

    updateStatus(maintenanceTask: DSMaintenanceTask, newStatus: MaintenanceTask.StatusEnum): Promise<DSMaintenanceTask | undefined> {
        return Promise.resolve(undefined)
    }

    private async _updateNotification(maintenanceTask: MaintenanceTask, user: User): Promise<any> {
        if (!maintenanceTask.id) throw this.errorHandler.createErrorWithMessage('Invalid maintenanceTask')
        const existingMaintenanceTask = await this.get(maintenanceTask.id)
        if (!existingMaintenanceTask) throw this.errorHandler.createErrorWithMessage('Cannot modify a non-existing NotificationModel')

        const existingMappedMaintenanceTask = this.mapper.toDto(existingMaintenanceTask)

        if (existingMappedMaintenanceTask.rev !== maintenanceTask.rev) throw this.errorHandler.createErrorWithMessage('Cannot modify rev field')
        else if (existingMappedMaintenanceTask.created !== maintenanceTask.created) throw this.errorHandler.createErrorWithMessage('Cannot modify created field')
        else if (existingMappedMaintenanceTask.endOfLife !== maintenanceTask.endOfLife) throw this.errorHandler.createErrorWithMessage('Cannot modify endOfLife field')
        else if (existingMappedMaintenanceTask.deletionDate !== maintenanceTask.deletionDate) throw this.errorHandler.createErrorWithMessage('Cannot modify deletionDate field')
        else if (existingMappedMaintenanceTask.modified !== maintenanceTask.modified) throw this.errorHandler.createErrorWithMessage('Cannot modify modified field')
        else if (existingMappedMaintenanceTask.author !== maintenanceTask.author) throw this.errorHandler.createErrorWithMessage('Cannot modify  author field')
        else if (existingMappedMaintenanceTask.responsible !== maintenanceTask.responsible) throw this.errorHandler.createErrorWithMessage('Cannot modify responsible field')
        else if (existingMappedMaintenanceTask.taskType !== maintenanceTask.taskType) throw this.errorHandler.createErrorWithMessage('Cannot modify type field')
        else if (!deepEquality(existingMappedMaintenanceTask.securityMetadata, maintenanceTask.securityMetadata)) throw this.errorHandler.createErrorWithMessage('Cannot modify securityMetadata field')
        else if (!deepEquality(existingMappedMaintenanceTask.secretForeignKeys, maintenanceTask.secretForeignKeys)) throw this.errorHandler.createErrorWithMessage('Cannot modify dataOwner field')
        else if (!deepEquality(existingMappedMaintenanceTask.encryptionKeys, maintenanceTask.encryptionKeys)) throw this.errorHandler.createErrorWithMessage('Cannot modify encryptionKeys field')
        else if (!deepEquality(existingMappedMaintenanceTask.cryptedForeignKeys, maintenanceTask.cryptedForeignKeys)) throw this.errorHandler.createErrorWithMessage('Cannot modify cryptedForeignKeys field')
        else if (!deepEquality(existingMappedMaintenanceTask.delegations, maintenanceTask.delegations)) throw this.errorHandler.createErrorWithMessage('Cannot modify delegations field')
        return this.maintenanceTaskApi.modifyMaintenanceTaskWithUser(user, maintenanceTask).catch((e) => {
            throw this.errorHandler.createErrorFromAny(e)
        })
    }

    private async _createNotification(maintenanceTask: MaintenanceTask, user: User, delegate?: string): Promise<any> {
        if (!delegate) throw this.errorHandler.createErrorWithMessage('No delegate provided for NotificationModel creation. You must provide a delegate to create a NotificationModel. The delegate is the id of the data owner you want to notify.')
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
