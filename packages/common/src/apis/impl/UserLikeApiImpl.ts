import {PaginatedList} from '../../models/PaginatedList.model'
import {SharedDataType} from '../../models/User.model'
import {Connection} from '../../models/Connection.model'
import {UserLikeApi} from '../UserLikeApi'
import {ErrorHandler} from '../../services/ErrorHandler'
import {
    FilterChainUser,
    HealthcareParty as HealthcarePartyDto,
    IccUserXApi,
    Patient as PatientDto,
    retry,
    User as UserDto
} from '@icure/api'
import {Mapper} from '../Mapper'
import {MessageGatewayApi} from '../MessageGatewayApi'
import {Sanitizer} from '../../services/Sanitizer'
import {forceUuid} from '../../utils/uuidUtils'
import {findTelecomOfAddresses} from '../../utils/addressUtils'
import {UserFilter} from '../../filters/dsl/UserFilterDsl'
import {CommonApi} from '../CommonApi'
import {NoOpFilter} from '../../filters/dsl/filterDsl'
import {FilterMapper} from '../../mappers/Filter.mapper'
import {CommonFilter} from '../../filters/filters'
import {MessageFactory} from '../../services/MessageFactory'
import {IccDataOwnerXApi} from '@icure/api/icc-x-api/icc-data-owner-x-api'
import {DataOwnerTypeEnum} from '@icure/api/icc-api/model/DataOwnerTypeEnum'
import {toPaginatedList} from "../../mappers/PaginatedList.mapper";

export class UserLikeApiImpl<DSUser, DSPatient, DSHealthcareParty> implements UserLikeApi<DSUser, DSPatient> {
    constructor(
        private readonly userMapper: Mapper<DSUser, UserDto>,
        private readonly patientMapper: Mapper<DSPatient, PatientDto>,
        private readonly hcpMapper: Mapper<DSHealthcareParty, HealthcarePartyDto>,
        private readonly errorHandler: ErrorHandler,
        private readonly sanitizer: Sanitizer,
        private readonly userApi: IccUserXApi,
        private readonly dataOwnerApi: IccDataOwnerXApi,
        private readonly api: CommonApi,
        private readonly messageFactory: MessageFactory<DSUser, DSHealthcareParty, DSPatient>,
        private readonly messageGatewayApi?: MessageGatewayApi
    ) {}

    checkTokenValidity(id: string, token: string): Promise<boolean> {
        return this.userApi.checkTokenValidity(id, token).catch((e) => {
            throw this.errorHandler.createErrorFromAny(e)
        })
    }

    async createAndInvite(patient: DSPatient, tokenDuration?: number): Promise<DSUser> {
        if (!this.messageGatewayApi) {
            throw this.errorHandler.createErrorWithMessage('Can not invite a user, as no msgGtwUrl and/or specId have been provided : Make sure to call .withMsgGtwUrl and .withMsgGtwSpecId when creating your MedTechApi')
        }

        const selfUser = await this.userApi.getCurrentUser()
        const selfDataOwner = await this.dataOwnerApi.getCurrentDataOwner()
        if (selfDataOwner.type !== DataOwnerTypeEnum.Hcp) throw new Error('Only an HCP can invite a patient')

        const patientDto = this.patientMapper.toDto(patient)

        // Checks that the Patient has all the required information
        if (!patientDto.id) throw this.errorHandler.createErrorWithMessage('Patient does not have a valid id')

        // Checks that no Users already exist for the Patient
        const existingUsers = await this.filterBy(await new UserFilter(this.api).byPatientId(patientDto.id).build())

        if (!!existingUsers && existingUsers.rows != undefined && existingUsers.rows.length > 0) throw this.errorHandler.createErrorWithMessage('A User already exists for this Patient')

        // Gets the preferred contact information
        const contacts = [
            findTelecomOfAddresses(patientDto.addresses ?? [], 'email', 'home'), // Check for the home email
            findTelecomOfAddresses(patientDto.addresses ?? [], 'mobile', 'home'), // Check for the home mobile
            findTelecomOfAddresses(patientDto.addresses ?? [], 'email', 'work'), // Check for the work email
            findTelecomOfAddresses(patientDto.addresses ?? [], 'mobile', 'work'), // Check for the work mobile
            findTelecomOfAddresses(patientDto.addresses ?? [], 'email'), // Check for any email
            findTelecomOfAddresses(patientDto.addresses ?? [], 'mobile'), // Check for any mobile
        ].filter((contact) => !!contact)
        const favouredEmail = contacts.find((contact) => contact?.telecomType == 'email')
        const favouredMobile = contacts.find((contact) => contact?.telecomType == 'mobile')
        if (!favouredEmail && !favouredMobile) throw this.errorHandler.createErrorWithMessage('No email or mobile phone information provided in patient')

        // Creates the user
        const createdUser = await this.userApi.createUser(
            new UserDto({
                id: forceUuid(),
                created: new Date().getTime(),
                name: favouredEmail?.telecomNumber ?? favouredMobile?.telecomNumber,
                login: favouredEmail?.telecomNumber ?? favouredMobile?.telecomNumber,
                patientId: patientDto.id,
                email: favouredEmail?.telecomNumber,
                mobilePhone: favouredMobile?.telecomNumber,
            })
        )
        if (!createdUser || !createdUser.id || !createdUser.login) throw this.errorHandler.createErrorWithMessage('Something went wrong during User creation')

        // Gets a short-lived authentication token
        const shortLivedToken = await retry(() => this.createToken(createdUser.id!, tokenDuration), 5, 2_000).catch(() => {
            throw this.errorHandler.createErrorWithMessage('Something went wrong while creating a token for the User')
        })
        if (!shortLivedToken) throw this.errorHandler.createErrorWithMessage('Something went wrong while creating a token for the User')

        const preferredMessageType = !!createdUser.email && !!createdUser.mobilePhone ? this.messageFactory.preferredMessageType : !!createdUser.email ? 'email' : 'sms'

        const messagePromise =
            preferredMessageType === 'email'
                ? this.messageGatewayApi
                      ?.sendEmail(createdUser.login, this.messageFactory.getPatientInvitationEmail(this.userMapper.toDomain(createdUser), patient, shortLivedToken, this.userMapper.toDomain(selfUser), this.hcpMapper.toDomain(selfDataOwner.dataOwner)))
                      .catch((e) => {
                          throw this.errorHandler.createErrorFromAny(e)
                      })
                : this.messageGatewayApi?.sendSMS(createdUser.login, this.messageFactory.getPatientInvitationSMS(this.userMapper.toDomain(createdUser), patient, shortLivedToken, this.userMapper.toDomain(selfUser), this.hcpMapper.toDomain(selfDataOwner.dataOwner))).catch((e) => {
                      throw this.errorHandler.createErrorFromAny(e)
                  })

        if (!(await messagePromise)) throw this.errorHandler.createErrorWithMessage('Something went wrong contacting the Message Gateway')

        return this.userMapper.toDomain(createdUser)
    }

    async createOrModify(user: DSUser): Promise<DSUser> {
        const mappedUser = this.userMapper.toDto(user)
        if (!mappedUser.rev) {
            const createdUser = await this.userApi.createUser(mappedUser).catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })
            if (createdUser != undefined) {
                return this.userMapper.toDomain(createdUser)
            }
            throw this.errorHandler.createErrorWithMessage("Couldn't create user")
        }

        const updatedUser = await this.userApi.modifyUser(mappedUser).catch((e) => {
            throw this.errorHandler.createErrorFromAny(e)
        })
        if (updatedUser != undefined) {
            return this.userMapper.toDomain(updatedUser)
        }
        throw this.errorHandler.createErrorWithMessage("Couldn't update user")
    }

    createToken(id: string, durationInSeconds?: number): Promise<string> {
        return this.userApi.getToken(id, forceUuid(), durationInSeconds ?? 3600 * 24 * 30).catch((e) => {
            throw this.errorHandler.createErrorFromAny(e)
        })
    }

    async delete(id: string): Promise<string> {
        const deletedUserRev = await this.userApi.deleteUser(id)
        if (deletedUserRev) {
            return deletedUserRev.rev!
        }
        throw this.errorHandler.createErrorWithMessage('Invalid user id')
    }

    async filterBy(filter: CommonFilter<UserDto>, nextUserId?: string, limit?: number): Promise<PaginatedList<DSUser>> {
        if (NoOpFilter.isNoOp(filter)) {
            return PaginatedList.empty()
        } else {
            return toPaginatedList(
                await this.userApi
                    .filterUsersBy(
                        nextUserId,
                        limit,
                        new FilterChainUser({
                            filter: FilterMapper.toAbstractFilterDto<UserDto>(filter, 'User'),
                        })
                    )
                    .catch((e) => {
                        throw this.errorHandler.createErrorFromAny(e)
                    }),
                this.userMapper.toDomain
            )!
        }
    }

    async get(id: string): Promise<DSUser> {
        return this.userMapper.toDomain(
            await this.userApi.getCurrentUser().catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })
        )!
    }

    async getByEmail(email: string): Promise<DSUser> {
        return this.userMapper.toDomain(
            await this.userApi.getUserByEmail(this.sanitizer.validateEmail(email)).catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })
        )!
    }

    async getLogged(): Promise<DSUser> {
        return this.userMapper.toDomain(
            await this.userApi.getCurrentUser().catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })
        )!
    }

    async matchBy(filter: CommonFilter<UserDto>): Promise<Array<string>> {
        if (NoOpFilter.isNoOp(filter)) {
            return []
        } else {
            return this.userApi.matchUsersBy(FilterMapper.toAbstractFilterDto<UserDto>(filter, 'User')).catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })
        }
    }

    async shareAllFutureDataWith(dataOwnerIds: string[], type?: SharedDataType): Promise<DSUser> {
        const user = await this.userApi.getCurrentUser().catch((e) => {
            throw this.errorHandler.createErrorFromAny(e)
        })

        if (!user) {
            throw this.errorHandler.createErrorWithMessage('There is no user currently logged in. You must call this method from an authenticated MedTechApi')
        }

        let newDataSharing
        const currentAutoDelegationsForType = user.autoDelegations?.[type ?? 'all']
        if (currentAutoDelegationsForType) {
            const delegationsToAdd = dataOwnerIds.filter((item) => !currentAutoDelegationsForType.includes(item))
            if (delegationsToAdd.length > 0) {
                newDataSharing = Object.entries(user.autoDelegations ?? []).reduce((accumulator, [key, values]) => {
                    return { ...accumulator, [key]: [...new Set(Array.of(...values, ...(type === key ? delegationsToAdd : [])))] }
                }, {})
            } else {
                return this.userMapper.toDomain(user)!!
            }
        } else {
            newDataSharing = {
                ...Object.entries(user.autoDelegations ?? {}).reduce((accumulator, [key, values]) => {
                    return { ...accumulator, [key]: [...values] }
                }, {}),
                [type ?? 'all']: dataOwnerIds,
            }
        }

        const updatedUserDto = await this.userApi
            .modifyUser({
                ...user,
                autoDelegations: newDataSharing,
            })
            .catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })

        if (updatedUserDto != undefined) {
            return this.userMapper.toDomain(updatedUserDto)!
        }

        throw this.errorHandler.createErrorWithMessage("Couldn't add data sharing to user")
    }

    async stopSharingDataWith(dataOwnerIds: string[], type?: SharedDataType): Promise<DSUser> {
        const user = await this.userApi.getCurrentUser().catch((e) => {
            throw this.errorHandler.createErrorFromAny(e)
        })

        if (!user) {
            throw this.errorHandler.createErrorWithMessage('There is no user currently logged in. You must call this method from an authenticated MedTechApi')
        }

        const delegationsToRemove = user.autoDelegations?.[type ?? 'all']?.filter((item) => dataOwnerIds.indexOf(item) >= 0)

        if (delegationsToRemove === undefined || delegationsToRemove.length === 0) {
            return this.userMapper.toDomain(user)!!
        }

        const newDataSharing = Object.entries(user.autoDelegations ?? {}).reduce((accumulator, [key, values]) => {
            return {
                ...accumulator,
                [key]: type === key ? [...values].filter((v) => !delegationsToRemove.includes(v)) : [...values],
            }
        }, {})

        const updatedUserDto = await this.userApi
            .modifyUser({
                ...user,
                autoDelegations: newDataSharing,
            })
            .catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })

        if (updatedUserDto != undefined) {
            return this.userMapper.toDomain(updatedUserDto)!
        }
        throw this.errorHandler.createErrorWithMessage("Couldn't remove data sharing of user")
    }

    subscribeToEvents(
        eventTypes: ('CREATE' | 'UPDATE' | 'DELETE')[],
        filter: CommonFilter<UserDto>,
        eventFired: (user: DSUser) => Promise<void>,
        options?: {
            connectionMaxRetry?: number
            connectionRetryIntervalMs?: number
        }
    ): Promise<Connection> {
        throw 'TODO'
    }
}
