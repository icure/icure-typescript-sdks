import { EmailMessageFactory, SMSMessageFactory } from '../../utils/msgGtwMessageFactory'
import { Filter } from '../../filters/Filter'
import { PaginatedList } from '../../models/PaginatedList.model'
import { SharedDataType } from '../../models/User.model'
import { Connection } from '../../models/Connection.model'
import { UserLikeApi } from '../UserLikeApi'
import { ErrorHandler } from '../../services/ErrorHandler'
import {
    FilterChainUser,
    IccUserXApi,
    PaginatedListUser,
    Patient as PatientDto,
    retry,
    User as UserDto
} from '@icure/api'
import { Mapper } from '../Mapper'
import { MessageGatewayApi } from '../MessageGatewayApi'
import { Sanitizer } from '../../services/Sanitizer'
import { forceUuid } from '../../utils/uuidUtils'
import {filteredContactsFromAddresses} from "../../utils/addressUtils";
import {UserFilter} from "../../filters/dsl/UserFilterDsl";
import {CommonApi} from "../CommonApi";
import {NoOpFilter} from "../../filters/dsl/filterDsl";
import {FilterMapper} from "../../mappers/Filter.mapper";
import {CommonFilter} from "../../filters/filters";

export class UserLikeApiImpl<DSUser, DSPatient> implements UserLikeApi<DSUser, DSPatient> {
    constructor(
        private readonly userMapper: Mapper<DSUser, UserDto>,
        private readonly patientMapper: Mapper<DSPatient, PatientDto>,
        private readonly paginatedListMapper: Mapper<PaginatedList<DSUser>, PaginatedListUser>,
        private readonly errorHandler: ErrorHandler,
        private readonly sanitizer: Sanitizer,
        private readonly userApi: IccUserXApi,
        private readonly api: CommonApi,
        private readonly messageGatewayApi?: MessageGatewayApi,
    ) {}

    checkTokenValidity(id: string, token: string): Promise<boolean> {
        return this.userApi.checkTokenValidity(id, token).catch((e) => {
            throw this.errorHandler.createErrorFromAny(e)
        })
    }

    async createAndInvite(patient: DSPatient, messageFactory: SMSMessageFactory | EmailMessageFactory, tokenDuration?: number): Promise<DSUser> {
        if (!this.messageGatewayApi) {
            throw this.errorHandler.createErrorWithMessage(
                'Can not invite a user, as no msgGtwUrl and/or specId have been provided : Make sure to call .withMsgGtwUrl and .withMsgGtwSpecId when creating your MedTechApi'
            )
        }

        const patientDto = this.patientMapper.toDto(patient)

        // Checks that the Patient has all the required information
        if (!patientDto.id) throw this.errorHandler.createErrorWithMessage('Patient does not have a valid id')

        // Checks that no Users already exist for the Patient
        const existingUsers = await this.filterBy(await new UserFilter(this.api).byPatientId(patientDto.id).build())

        if (!!existingUsers && existingUsers.rows != undefined && existingUsers.rows.length > 0) throw this.errorHandler.createErrorWithMessage('A User already exists for this Patient')

        // Gets the preferred contact information
        const contact = [
            filteredContactsFromAddresses(patientDto.addresses ?? [], 'email', 'home'), // Check for the home email
            filteredContactsFromAddresses(patientDto.addresses ?? [], 'mobile', 'home'), // Check for the home mobile
            filteredContactsFromAddresses(patientDto.addresses ?? [], 'email', 'work'), // Check for the work email
            filteredContactsFromAddresses(patientDto.addresses ?? [], 'mobile', 'work'), // Check for the work mobile
            filteredContactsFromAddresses(patientDto.addresses ?? [], 'email'), // Check for any email
            filteredContactsFromAddresses(patientDto.addresses ?? [], 'mobile'), // Check for any mobile
        ].filter((contact) => !!contact)[0]
        if (!contact) throw this.errorHandler.createErrorWithMessage('No email or mobile phone information provided in patient')

        // Creates the user
        const createdUser = await this.userApi.createUser(

                new UserDto({
                    created: new Date().getTime(),
                    name: contact.telecomNumber,
                    login: contact.telecomNumber,
                    patientId: patientDto.id,
                    email: contact.telecomType == 'email' ? contact.telecomNumber : undefined,
                    mobilePhone: contact.telecomType == 'mobile' ? contact.telecomNumber : undefined,
                })
        )
        if (!createdUser || !createdUser.id || !createdUser.login)
            throw this.errorHandler.createErrorWithMessage('Something went wrong during User creation')

        // Gets a short-lived authentication token
        const shortLivedToken = await retry(() => this.createToken(createdUser.id!, tokenDuration), 5, 2_000).catch(() => {
            throw this.errorHandler.createErrorWithMessage('Something went wrong while creating a token for the User')
        })
        if (!shortLivedToken) throw this.errorHandler.createErrorWithMessage('Something went wrong while creating a token for the User')

        const messagePromise = !!createdUser.email
            ? this.messageGatewayApi?.sendEmail(createdUser.login, (messageFactory as EmailMessageFactory).get(createdUser, shortLivedToken)).catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })
            : this.messageGatewayApi?.sendSMS(createdUser.login, (messageFactory as SMSMessageFactory).get(createdUser, shortLivedToken)).catch((e) => {
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
            return { totalSize: 0, pageSize: 0, rows: [] }
        } else {
            return this.paginatedListMapper.toDomain(
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
                    })
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
