import { Filter } from '../Filter'
import { DataOwnerFilterBuilder, FilterBuilder, NoOpFilter, SortableFilterBuilder } from './filterDsl'
import { IntersectionFilter } from '../IntersectionFilter'
import { MaintenanceTask } from '@icure/api'
import { MaintenanceTasksAfterDateFilter } from '../maintenancetask/MaintenanceTasksAfterDateFilter'
import { CommonApi } from '../../apis/CommonApi'

interface BaseMaintenanceTaskFilterBuilder<F> {
    /**
     * Includes all the notifications with the specified ids.
     * @param ids the ids of the codes.
     */
    byIds(ids: string[]): F

    /**
     * Includes all the notifications with the specified type.
     * @param type the type of the notification.
     */
    withType(type: MaintenanceTask.TaskTypeEnum): F

    /**
     * Includes all the notfications created after the specified timestamp
     * @param fromDate the timestamp.
     */
    afterDate(fromDate: number): F
}

export class MaintenanceTaskFilter implements DataOwnerFilterBuilder<MaintenanceTask, MaintenanceTaskFilterWithDataOwner> {
    constructor(private api: CommonApi) {}

    forDataOwner(dataOwnerId: string): MaintenanceTaskFilterWithDataOwner {
        return new MaintenanceTaskFilterWithDataOwner(this.api, dataOwnerId)
    }

    forSelf(): MaintenanceTaskFilterWithDataOwner {
        return new MaintenanceTaskFilterWithDataOwner(this.api)
    }
}

class MaintenanceTaskFilterWithDataOwner extends SortableFilterBuilder<MaintenanceTask, MaintenanceTaskFilterSortStepDecorator> implements BaseMaintenanceTaskFilterBuilder<MaintenanceTaskFilterWithDataOwner>, FilterBuilder<MaintenanceTask> {
    _dataOwnerId: Promise<string>

    constructor(
        private api: CommonApi,
        dataOwnerId?: string,
    ) {
        super()
        this._dataOwnerId = !!dataOwnerId ? Promise.resolve(dataOwnerId) : api.baseApi.userApi.getCurrentUser().then((u) => api.baseApi.dataOwnerApi.getDataOwnerIdOf(u))
    }

    get sort(): MaintenanceTaskFilterSortStepDecorator {
        return new MaintenanceTaskFilterSortStepDecorator(this)
    }

    byIds(ids: string[]): MaintenanceTaskFilterWithDataOwner {
        this._builderAccumulator.addByIdsFilter(Promise.resolve({ ids: ids, $type: 'MaintenanceTasksByIdFilter' }), 'ids')
        return this
    }

    withType(type: MaintenanceTask.TaskTypeEnum): MaintenanceTaskFilterWithDataOwner {
        const filter = this._dataOwnerId.then((id) => {
            return {
                healthcarePartyId: id,
                type: type,
                $type: 'MaintenanceTasksByHcPartyAndTypeFilter',
            }
        })
        this._builderAccumulator.addSingletonFilter(filter)
        return this
    }

    afterDate(fromDate?: number): MaintenanceTaskFilterWithDataOwner {
        const filter = this._dataOwnerId.then((id) => {
            return {
                healthcarePartyId: id,
                date: fromDate,
                $type: 'MaintenanceTasksAfterDateFilter',
            }
        })
        this._builderAccumulator.addSingletonFilter(filter)
        return this
    }

    async build(): Promise<Filter<MaintenanceTask>> {
        const filters = await this._builderAccumulator.getAndSortFilters()

        if (filters.some((f) => NoOpFilter.isNoOp(f))) {
            console.warn('Warning: the filter you built cannot be resolved and will return no entity')
            return new NoOpFilter()
        } else if (filters.length > 1) {
            return {
                filters: filters,
                $type: 'IntersectionFilter',
            } as IntersectionFilter<MaintenanceTask>
        } else if (filters.length === 1) {
            return filters[0]
        } else {
            return {
                healthcarePartyId: await this._dataOwnerId,
                date: 0,
                $type: 'MaintenanceTasksAfterDateFilter',
            } as MaintenanceTasksAfterDateFilter
        }
    }
}

type NonSortableMaintenanceTaskFilter = BaseMaintenanceTaskFilterBuilder<MaintenanceTaskFilterWithDataOwner> & FilterBuilder<MaintenanceTask>

class MaintenanceTaskFilterSortStepDecorator implements Omit<BaseMaintenanceTaskFilterBuilder<NonSortableMaintenanceTaskFilter>, 'getDataOwner'> {
    constructor(private notificationFilter: MaintenanceTaskFilterWithDataOwner) {}

    byIds(ids: string[]): NonSortableMaintenanceTaskFilter {
        this.notificationFilter.byIds(ids)
        this.notificationFilter._builderAccumulator.setLastElementAsSortKey()
        return this.notificationFilter
    }

    withType(type: MaintenanceTask.TaskTypeEnum): NonSortableMaintenanceTaskFilter {
        this.notificationFilter.withType(type)
        this.notificationFilter._builderAccumulator.setLastElementAsSortKey()
        return this.notificationFilter
    }

    afterDate(fromDate: number): NonSortableMaintenanceTaskFilter {
        this.notificationFilter.afterDate(fromDate)
        this.notificationFilter._builderAccumulator.setLastElementAsSortKey()
        return this.notificationFilter
    }
}
