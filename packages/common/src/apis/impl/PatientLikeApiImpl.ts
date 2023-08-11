import { PaginatedList } from '../../models/PaginatedList.model'
import { SharingResult, SharingStatus } from '../../utils/interfaces'
import { PatientLikeApi } from '../PatientLikeApi'
import { Connection, ConnectionImpl, FilterChainPatient, IccAuthApi, IccPatientXApi, IccUserXApi, Patient as PatientDto, subscribeToEntityEvents, SubscriptionOptions } from '@icure/api'
import { ErrorHandler } from '../../services/ErrorHandler'
import { Mapper } from '../Mapper'
import { IccDataOwnerXApi } from '@icure/api/icc-x-api/icc-data-owner-x-api'
import { NoOpFilter } from '../../filters/dsl'
import { FilterMapper } from '../../mappers/Filter.mapper'
import { toPaginatedList } from '../../mappers/PaginatedList.mapper'
import { iccRestApiPath } from '@icure/api/icc-api/api/IccRestApiPath'
import { CommonFilter } from '../../filters/filters'

export class PatientLikeApiImpl<DSPatient> implements PatientLikeApi<DSPatient> {
    constructor(
        private readonly mapper: Mapper<DSPatient, PatientDto>,
        private readonly errorHandler: ErrorHandler,
        private readonly patientApi: IccPatientXApi,
        private readonly userApi: IccUserXApi,
        private readonly dataOwnerApi: IccDataOwnerXApi,
        private readonly authApi: IccAuthApi,
        private readonly basePath: string,
    ) {}

    async createOrModify(patient: DSPatient): Promise<DSPatient> {
        return this.mapper.toDomain(await this._createOrModifyPatient(patient))
    }

    async delete(patientId: string): Promise<string> {
        const deletedId = (
            await this.patientApi.deletePatient(patientId).catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })
        )
            .map((docIdentifier) => docIdentifier.id!)
            .pop()

        if (deletedId) {
            return deletedId
        }

        throw this.errorHandler.createErrorWithMessage(`Could not delete patient ${patientId}`)
    }

    async filterBy(filter: CommonFilter<PatientDto>, nextPatientId?: string, limit?: number): Promise<PaginatedList<DSPatient>> {
        if (NoOpFilter.isNoOp(filter)) {
            return PaginatedList.empty()
        } else {
            return toPaginatedList(
                await this.patientApi
                    .filterPatientsBy(
                        undefined,
                        nextPatientId,
                        limit,
                        undefined,
                        undefined,
                        undefined,
                        new FilterChainPatient({
                            filter: FilterMapper.toAbstractFilterDto<PatientDto>(filter, 'Patient'),
                        }),
                    )
                    .catch((e) => {
                        throw this.errorHandler.createErrorFromAny(e)
                    }),
                this.mapper.toDomain,
            )!
        }
    }

    async get(patientId: string): Promise<DSPatient> {
        return (await this._getPatient(patientId, true)).patient
    }

    async getAndTryDecrypt(id: string): Promise<{ patient: DSPatient; decrypted: boolean }> {
        return await this._getPatient(id, false)
    }

    async giveAccessTo(patient: DSPatient, delegatedTo: string): Promise<DSPatient> {
        return this.mapper.toDomain(await this._giveAccessTo(this.mapper.toDto(patient)!, delegatedTo))!
    }

    async giveAccessToAllDataOf(patientId: string): Promise<SharingResult<DSPatient>> {
        const currentUser = await this.userApi.getCurrentUser().catch((e) => {
            throw this.errorHandler.createErrorFromAny(e)
        })
        if (!currentUser) {
            throw this.errorHandler.createErrorWithMessage('There is no user currently logged in. You must call this method from an authenticated MedTechApi')
        }
        if (!this.dataOwnerApi.getDataOwnerIdOf(currentUser)) {
            throw this.errorHandler.createErrorWithMessage('The current user is not a data owner. You must been either a patient, a device or a healthcare professional to call this method.')
        }
        return this.patientApi
            .share(currentUser, patientId, this.dataOwnerApi.getDataOwnerIdOf(currentUser), [patientId], { [patientId]: ['all'] })
            .then((res) => {
                return {
                    patient: !!res?.patient ? this.mapper.toDomain(res.patient) : undefined,
                    statuses: {
                        dataSamples: !!res?.statuses.contacts ? (res.statuses.contacts as SharingStatus) : undefined,
                        healthcareElements: !!res?.statuses.healthElements ? (res.statuses.healthElements as SharingStatus) : undefined,
                        patient: !!res?.statuses.patient ? (res.statuses.patient as SharingStatus) : undefined,
                    },
                }
            })
            .catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })
    }

    matchBy(filter: CommonFilter<PatientDto>): Promise<Array<string>> {
        if (NoOpFilter.isNoOp(filter)) {
            return Promise.resolve([])
        } else {
            return this.patientApi.matchPatientsBy(FilterMapper.toAbstractFilterDto<PatientDto>(filter, 'Patient')).catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })
        }
    }

    async subscribeToEvents(eventTypes: ('CREATE' | 'UPDATE' | 'DELETE')[], filter: CommonFilter<PatientDto>, eventFired: (patient: DSPatient) => Promise<void>, options?: SubscriptionOptions): Promise<Connection> {
        const currentUser = await this.userApi.getCurrentUser()

        return subscribeToEntityEvents(
            iccRestApiPath(this.basePath),
            this.authApi,
            'Patient',
            eventTypes,
            FilterMapper.toAbstractFilterDto(filter, 'Patient'),
            (event) => eventFired(this.mapper.toDomain(event)),
            options ?? {},
            async (encrypted) => (await this.patientApi.decrypt(currentUser, [encrypted]))[0],
        ).then((ws) => new ConnectionImpl(ws))
    }

    private async _createOrModifyPatient(patient: DSPatient): Promise<PatientDto> {
        const currentUser = await this.userApi.getCurrentUser().catch((e) => {
            throw this.errorHandler.createErrorFromAny(e)
        })

        const patientDto = this.mapper.toDto(patient)

        const createdOrUpdatedPatient = patientDto.rev
            ? await this.patientApi.modifyPatientWithUser(currentUser, patientDto).catch((e) => {
                  throw this.errorHandler.createErrorFromAny(e)
              })
            : await this.patientApi.createPatientWithUser(currentUser, await this.patientApi.newInstance(currentUser, patientDto)).catch((e) => {
                  throw this.errorHandler.createErrorFromAny(e)
              })

        if (createdOrUpdatedPatient) {
            return createdOrUpdatedPatient
        }

        throw this.errorHandler.createErrorWithMessage(`Could not create / modify patient ${patientDto.id} with user ${currentUser.id}`)
    }

    private async _getPatient(
        patientId: string,
        requireDecrypted: boolean,
    ): Promise<{
        patient: DSPatient
        decrypted: boolean
    }> {
        const currentUser = await this.userApi.getCurrentUser().catch((e) => {
            throw this.errorHandler.createErrorFromAny(e)
        })
        const foundPatient = await this.patientApi.getPotentiallyEncryptedPatientWithUser(currentUser, patientId).catch((e) => {
            throw this.errorHandler.createErrorFromAny(e)
        })

        if (foundPatient) {
            if (!foundPatient.decrypted && requireDecrypted) {
                throw this.errorHandler.createErrorWithMessage(`Could not decrypt patient ${patientId} with current user ${currentUser.id}`)
            }

            return { patient: this.mapper.toDomain(foundPatient.patient)!, decrypted: foundPatient.decrypted }
        }

        throw this.errorHandler.createErrorWithMessage(`Could not find patient ${patientId} with current user ${currentUser.id}`)
    }

    private async _giveAccessTo(patient: PatientDto, delegatedTo: string): Promise<PatientDto> {
        const secretIds = await this.patientApi.decryptSecretIdsOf(patient)
        return this.patientApi.shareWith(delegatedTo, patient, secretIds)
    }
}
