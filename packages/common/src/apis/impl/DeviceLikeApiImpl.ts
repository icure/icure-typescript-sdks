import { Filter } from '../../filters/Filter'
import { PaginatedList } from '../../models/PaginatedList.model'
import { DeviceLikeApi } from '../DeviceLikeApi'
import { ErrorHandler } from '../../services/ErrorHandler'
import { Device, FilterChainDevice, IccDeviceApi, ListOfIds, PaginatedListDevice } from '@icure/api'
import { Mapper } from '../Mapper'
import { firstOrNull } from '../../utils/functionalUtils'

import { forceUuid } from '../../utils/uuidUtils'
import { NoOpFilter } from '../../filters/dsl/filterDsl'
import { FilterMapper } from '../../mappers/Filter.mapper'
import { toPaginatedList } from '../../mappers/PaginatedList.mapper'

export class DeviceLikeApiImpl<DSDevice> implements DeviceLikeApi<DSDevice> {
    constructor(
        private readonly mapper: Mapper<DSDevice, Device>,
        private readonly errorHandler: ErrorHandler,
        private readonly deviceApi: IccDeviceApi,
    ) {}

    async createOrModify(device: DSDevice): Promise<DSDevice> {
        const createdDevice = firstOrNull(await this.createOrModifyMany([device]))
        if (createdDevice != undefined) {
            return createdDevice
        } else {
            throw this.errorHandler.createErrorWithMessage("Couldn't create medical device")
        }
    }

    async createOrModifyMany(device: Array<DSDevice>): Promise<Array<DSDevice>> {
        const mappedDevices = device.map((c) => this.mapper.toDto(c))

        const devicesToCreate = mappedDevices.filter((dev) => !dev.rev)
        const devicesToUpdate = mappedDevices.filter((dev) => !!dev.rev)

        if (!devicesToUpdate.every((device) => device.id != null && forceUuid(device.id))) {
            throw this.errorHandler.createErrorWithMessage('The id of the device to update should be a valid UUID')
        }

        const createdDevices = await this.deviceApi.createDevices(devicesToCreate).catch((e) => {
            throw this.errorHandler.createErrorFromAny(e)
        })
        const updatedDevices = await this.deviceApi.updateDevices(devicesToUpdate).catch((e) => {
            throw this.errorHandler.createErrorFromAny(e)
        })
        const processedDeviceIds = [...createdDevices, ...updatedDevices].map((d) => d.id!)

        return (await this.deviceApi.getDevices(new ListOfIds({ ids: processedDeviceIds }))).map((d) => this.mapper.toDomain(d))
    }

    async delete(id: string): Promise<string> {
        const deletedDeviceRev = (
            await this.deviceApi.deleteDevice(id).catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })
        ).rev
        if (deletedDeviceRev != undefined) {
            return deletedDeviceRev
        }
        throw this.errorHandler.createErrorWithMessage(`Couldn't delete device ${id}`)
    }

    async deleteMany(requestBody: Array<string>): Promise<Array<string>> {
        return (
            await this.deviceApi.deleteDevices(new ListOfIds({ ids: requestBody })).catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })
        )
            .filter((d) => !!d.rev)
            .map((d) => d.rev!)
    }

    async filterBy(filter: Filter<DSDevice>, nextDeviceId?: string, limit?: number): Promise<PaginatedList<DSDevice>> {
        if (NoOpFilter.isNoOp(filter)) {
            return PaginatedList.empty()
        } else {
            return toPaginatedList(
                await this.deviceApi
                    .filterDevicesBy(
                        nextDeviceId,
                        limit,
                        new FilterChainDevice({
                            filter: FilterMapper.toAbstractFilterDto<Device>(filter, 'Device'),
                        }),
                    )
                    .catch((e) => {
                        throw this.errorHandler.createErrorFromAny(e)
                    }),
                this.mapper.toDomain,
            )
        }
    }

    async get(id: string): Promise<DSDevice> {
        return this.mapper.toDomain(
            await this.deviceApi.getDevice(id).catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            }),
        )
    }

    async matchBy(filter: Filter<DSDevice>): Promise<Array<string>> {
        if (NoOpFilter.isNoOp(filter)) {
            return []
        } else {
            return this.deviceApi.matchDevicesBy(FilterMapper.toAbstractFilterDto<Device>(filter, 'User')).catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })
        }
    }
}
