import { PaginatedList } from '../models/PaginatedList.model'
import { Connection, Device, SubscriptionOptions } from '@icure/api'
import { CommonFilter } from '../filters/filters'

/**
 * The DeviceApi interface provides methods to manage medical devices.
 */
export interface DeviceLikeApi<DSDevice> {
    /**
     * When modifying a device, you must ensure that the rev obtained when getting or creating the device is present as the rev is used to guarantee that the device has not been modified by a third party.
     * Create or update a [Device]
     * @param device
     */
    createOrModify(device: DSDevice): Promise<DSDevice>

    /**
     * When modifying a device, you must ensure that the rev obtained when getting or creating the device is present as the rev is used to guarantee that the device has not been modified by a third party.
     * Create or update a batch of [Device]
     * @param device
     */
    createOrModifyMany(device: Array<DSDevice>): Promise<Array<DSDevice>>

    /**
     * Deletes the medical device identified by the provided unique [deviceId].
     * Delete a [Device]
     * @param id
     */
    delete(id: string): Promise<string>

    /**
     * Deletes the batch of medical device identified by the provided [deviceIds].
     * Delete a batch of [Device]
     * @param requestBody
     */
    deleteMany(requestBody: Array<string>): Promise<Array<string>>

    /**
     * Filters are complex selectors that are built by combining basic building blocks. You can learn more on how to build filters here {@link https://docs.icure.com/sdks/how-to/how-to-filter-data-with-advanced-search-criteria}. This method returns a paginated list of medical devices (with a cursor that lets you query the following items).
     * Load devices from the database by filtering them using the provided [filter].
     * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
     * @param nextDeviceId The id of the first device in the next page
     * @param limit The number of devices to return in the queried page
     */
    filterBy(filter: CommonFilter<Device>, nextDeviceId?: string, limit?: number): Promise<PaginatedList<DSDevice>>

    /**
     * Each medical device is uniquely identified by a device id. The device id is a UUID. This [deviceId] is the preferred method to retrieve one specific device.
     * Get a Medical Device
     * @param id
     */
    get(id: string): Promise<DSDevice>

    /**
     * Filters are complex selectors that are built by combining basic building blocks. You can learn more on how to build filters here {@link https://docs.icure.com/sdks/how-to/how-to-filter-data-with-advanced-search-criteria}. This method returns the list of the ids of the users matching the filter.
     * Load medical device ids from the database by filtering them using the provided Filter.
     * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
     */
    matchBy(filter: CommonFilter<Device>): Promise<Array<string>>

    subscribeToEvents(eventTypes: ('CREATE' | 'UPDATE')[], filter: CommonFilter<Device>, eventFired: (device: DSDevice) => Promise<void>, options?: SubscriptionOptions): Promise<Connection>
}
