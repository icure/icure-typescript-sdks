import { FilterBuilder, NoOpFilter, SortableFilterBuilder } from './filterDsl'
import {Device, IntersectionFilter} from '@icure/api'
import { Filter } from '../Filter'
import {AllDevicesFilter} from "../device/AllDevicesFilter";
import {CommonApi} from "../../apis/CommonApi";

interface BaseDeviceFilterBuilder<F> {
  /**
   * Includes all the medical devices with the specified ids.
   * @param byIds the ids of the medical devices.
   */
  byIds(byIds: string[]): F
}

export class DeviceFilter
  extends SortableFilterBuilder<Device, DeviceFilterSortStepDecorator>
  implements BaseDeviceFilterBuilder<DeviceFilter>, FilterBuilder<Device>
{
  constructor(_: CommonApi) {
    super()
  }

  get sort(): DeviceFilterSortStepDecorator {
    return new DeviceFilterSortStepDecorator(this)
  }

  byIds(byIds: string[]): DeviceFilter {
    this._builderAccumulator.addByIdsFilter(Promise.resolve({ ids: byIds, $type: 'DeviceByIdsFilter' }), 'ids')
    return this
  }

  async build(): Promise<Filter<Device>> {
    const filters = await this._builderAccumulator.getAndSortFilters()

    if (filters.some((f) => NoOpFilter.isNoOp(f))) {
      console.warn('Warning: the filter you built cannot be resolved and will return no entity')
      return new NoOpFilter()
    } else if (filters.length > 1) {
      return {
        filters: filters,
        $type: 'IntersectionFilter',
      } as IntersectionFilter<Device>
    } else if (filters.length === 1) {
      return filters[0]
    } else {
      return { $type: 'AllDevicesFilter' } as AllDevicesFilter
    }
  }
}

type NonSortableDeviceFilter = BaseDeviceFilterBuilder<DeviceFilter> & FilterBuilder<Device>

class DeviceFilterSortStepDecorator implements BaseDeviceFilterBuilder<NonSortableDeviceFilter> {
  constructor(private medicalDeviceFilter: DeviceFilter) {}

  byIds(byIds: string[]): NonSortableDeviceFilter {
    this.medicalDeviceFilter.byIds(byIds)
    this.medicalDeviceFilter._builderAccumulator.setLastElementAsSortKey()
    return this.medicalDeviceFilter
  }
}
