import {CommonApi, CommonFilter, DeviceLikeApiImpl, ErrorHandler, PaginatedList} from '@icure/typescript-common'
import { Device, PaginatedListDevice } from '@icure/api'
import { MedicalDevice } from '../models/MedicalDevice.model'
import { mapDeviceToMedicalDevice, mapMedicalDeviceToDevice } from '../mappers/MedicalDevice.mapper'

/**
 * The MedicalDeviceApi interface provides methods to manage medical devices.
 */
export class MedicalDeviceApi extends DeviceLikeApiImpl<MedicalDevice> {

  /**
   * @deprecated use {@link MedicalDeviceApi.createOrModify} instead.
   *
   * When modifying a device, you must ensure that the rev obtained when getting or creating the device is present as the rev is used to guarantee that the device has not been modified by a third party.
   * Create or update a [MedicalDevice]
   * @param medicalDevice
   */
  createOrModifyMedicalDevice(medicalDevice: MedicalDevice): Promise<MedicalDevice> {
    return this.createOrModify(medicalDevice)
  }

  /**
   * @deprecated use {@link MedicalDeviceApi.createOrModifyMany} instead.
   *
   * When modifying a device, you must ensure that the rev obtained when getting or creating the device is present as the rev is used to guarantee that the device has not been modified by a third party.
   * Create or update a batch of [MedicalDevice]
   * @param medicalDevices
   */
  createOrModifyMedicalDevices(medicalDevices: Array<MedicalDevice>): Promise<Array<MedicalDevice>> {
    return this.createOrModifyMany(medicalDevices)
  }

  /**
   * @deprecated use {@link MedicalDeviceApi.delete} instead.
   *
   * Deletes the medical device identified by the provided unique [medicalDeviceId].
   * Delete a [MedicalDevice]
   * @param medicalDeviceId
   */
  deleteMedicalDevice(medicalDeviceId: string): Promise<string> {
    return this.delete(medicalDeviceId)
  }

  /**
   * @deprecated use {@link MedicalDeviceApi.deleteMany} instead.
   *
   * Deletes the batch of medical device identified by the provided [medicalDeviceIds].
   * Delete a batch of [MedicalDevice]
   * @param ids
   */
  deleteMedicalDevices(ids: Array<string>): Promise<Array<string>> {
    return this.deleteMany(ids)
  }

  /**
   * @deprecated use {@link MedicalDeviceApi.filterBy} instead.
   *
   * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [MedicalDevice] are AllDevicesFilter and DevicesByIdsFilter. This method returns a paginated list of medical devices (with a cursor that lets you query the following items).
   * Load devices from the database by filtering them using the provided [filter].
   * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
   * @param nextDeviceId The id of the first device in the next page
   * @param limit The number of devices to return in the queried page
   */
  filterMedicalDevices(filter: CommonFilter<Device>, nextDeviceId?: string, limit?: number): Promise<PaginatedList<MedicalDevice>> {
    return this.filterBy(filter, nextDeviceId, limit)
  }

  /**
   * @deprecated use {@link MedicalDeviceApi.get} instead.
   *
   * Each medical device is uniquely identified by a device id. The device id is a UUID. This [medicalDeviceId] is the preferred method to retrieve one specific device.
   * Get a Medical Device
   * @param medicalDeviceId
   */
  getMedicalDevice(medicalDeviceId: string): Promise<MedicalDevice> {
    return this.get(medicalDeviceId)
  }

  /**
   * @deprecated use {@link MedicalDeviceApi.matchBy} instead.
   *
   * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [MedicalDevice] are AllDevicesFilter and DevicesByIdsFilter. This method returns the list of the ids of the users matching the filter.
   * Load medical device ids from the database by filtering them using the provided Filter.
   * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
   */
  matchMedicalDevices(filter: CommonFilter<Device>): Promise<Array<string>> {
    return this.matchBy(filter)
  }
}

export const medicalDeviceApi = (api: CommonApi) => {
  return new MedicalDeviceApi(
    {
      toDomain(dto: Device): MedicalDevice {
        return mapDeviceToMedicalDevice(dto)
      },
      toDto(domain: MedicalDevice): Device {
        return mapMedicalDeviceToDevice(domain)
      },
    },
    {
      toDomain(dto: PaginatedListDevice): PaginatedList<MedicalDevice> {
        return {
          rows: dto.rows?.map(mapDeviceToMedicalDevice),
          totalSize: dto.totalSize,
        }
      },
      toDto(domain: PaginatedList<MedicalDevice>): PaginatedListDevice {
        return {
          rows: domain.rows?.map(mapMedicalDeviceToDevice),
          totalSize: domain.totalSize,
        }
      },
    },
    api.errorHandler,
    api.baseApi.deviceApi
  )
}
