import { DataOwnerLikeApi } from '../DataOwnerLikeApi'
import { Mapper } from '../Mapper'
import { DataOwnerWithType as DataOwnerWithTypeDto, IccPatientXApi, User } from '@icure/api'
import { ErrorHandler } from '../../services/ErrorHandler'
import { IccDataOwnerXApi } from '@icure/api/icc-x-api/icc-data-owner-x-api'
import { IccIcureMaintenanceXApi } from '@icure/api/icc-x-api/icc-icure-maintenance-x-api'
import { DataOwnerTypeEnum } from '@icure/api/icc-api/model/DataOwnerTypeEnum'
import { DataOwnerWithType } from '../../models/DataOwner.model'

export class DataOwnerLikeApiImpl<DSDataOwnerWithType extends DataOwnerWithType, DSDataOwnerType, DSPatient, DSUser> implements DataOwnerLikeApi<DSDataOwnerWithType, DSUser> {
    constructor(
        private readonly dataOwnerWithTypeMapper: Mapper<DSDataOwnerWithType, DataOwnerWithTypeDto>,
        private readonly userMapper: Mapper<DSUser, User>,
        private readonly errorHandler: ErrorHandler,
        private readonly dataOwnerApi: IccDataOwnerXApi,
        private readonly patientApi: IccPatientXApi,
        private readonly icureMaintenanceApi: IccIcureMaintenanceXApi,
    ) {}

    async getDataOwner(ownerId: string): Promise<DSDataOwnerWithType> {
        const retrieved = await this.dataOwnerApi.getDataOwner(ownerId)

        if (retrieved.type === DataOwnerTypeEnum.Patient) {
            const potentiallyDecryptedPatient = (await this.patientApi.tryDecryptOrReturnOriginal(retrieved.dataOwner.id, [retrieved.dataOwner]))[0]

            return this.dataOwnerWithTypeMapper.toDomain({
                dataOwner: potentiallyDecryptedPatient.entity,
                type: DataOwnerTypeEnum.Patient,
            })
        }

        return this.dataOwnerWithTypeMapper.toDomain(retrieved)
    }

    getDataOwnerIdOf(user: DSUser): string {
        const mappedUser = this.userMapper.toDto(user)
        const dataOwnerId = mappedUser.healthcarePartyId ?? mappedUser.patientId ?? mappedUser.deviceId
        if (dataOwnerId == undefined) {
            throw this.errorHandler.createErrorWithMessage(`The current user is not a data owner. You must be either a patient, a device or a healthcare professional to call this method.`)
        }
        return dataOwnerId
    }

    getPublicKeysOf(dataOwner: DSDataOwnerWithType): string[] {
        const dataOwnerDto = this.dataOwnerWithTypeMapper.toDto(dataOwner).dataOwner
        return [...this.dataOwnerApi.getHexPublicKeysOf(dataOwnerDto)]
    }

    async giveAccessBackTo(ownerId: string, ownerNewPublicKey: string): Promise<void> {
        try {
            await this.icureMaintenanceApi.applyKeyPairUpdate({
                concernedDataOwnerId: ownerId,
                newPublicKey: ownerNewPublicKey,
            })
        } catch (e) {
            console.error(e)
            throw this.errorHandler.createErrorWithMessage(`Could not give access back to owner ${ownerId} with public key ${ownerNewPublicKey}. Try again later`)
        }
    }
}
