import {EmailMessageFactory, SMSMessageFactory} from "../../utils/msgGtwMessageFactory";
import {Filter} from "../../filter/Filter";
import {PaginatedList} from "../../models/PaginatedList.model";
import {SharedDataType} from "../../models/User.model";
import {Connection} from "../../models/Connection.model";
import {UserLikeApi} from "../UserLikeApi";
import {ErrorHandler} from "../../services/ErrorHandler";
import {IccUserXApi, Patient as PatientDto, User as UserDto} from "@icure/api";
import {Mapper} from "../Mapper";
import {MessageGatewayApi} from "../MessageGatewayApi";
import {Sanitizer} from "../../services/Sanitizer";
import {forceUuid} from "../../utils/uuidUtils";

export class UserLikeApiImpl<DSUser, DSPatient> implements UserLikeApi<DSUser, DSPatient> {

    constructor(
        private readonly userMapper: Mapper<DSUser, UserDto>,
        private readonly patientMapper: Mapper<DSPatient, PatientDto>,
        private readonly errorHandler: ErrorHandler,
        private readonly sanitizer: Sanitizer,
        private readonly userApi: IccUserXApi,
        private readonly messageGatewayApi?: MessageGatewayApi,
    ) {
    }

    checkTokenValidity(id: string, token: string): Promise<boolean> {
        return this.userApi.checkTokenValidity(id, token).catch((e) => {
            throw this.errorHandler.createErrorFromAny(e)
        })
    }

    createAndInvite(patient: DSPatient, messageFactory: SMSMessageFactory | EmailMessageFactory, tokenDuration?: number): Promise<DSUser> {
        throw "TODO"
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

    filterBy(filter: Filter<DSUser>, nextUserId?: string, limit?: number): Promise<PaginatedList<DSUser>> {
        throw "TODO"
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

    matchBy(filter: Filter<DSUser>): Promise<Array<string>> {
        throw "TODO"
    }

    async shareAllFutureDataWith(dataOwnerIds: string[], type?: SharedDataType): Promise<DSUser> {
        const user = await this.userApi.getCurrentUser().catch((e) => {
            throw this.errorHandler.createErrorFromAny(e)
        })

        if (!user) {
            throw this.errorHandler.createErrorWithMessage(
                'There is no user currently logged in. You must call this method from an authenticated MedTechApi'
            )
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
            throw this.errorHandler.createErrorWithMessage(
                'There is no user currently logged in. You must call this method from an authenticated MedTechApi'
            )
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

    subscribeTo(eventTypes: ("CREATE" | "UPDATE" | "DELETE")[], filter: Filter<DSUser>, eventFired: (user: DSUser) => Promise<void>, options?: {
        connectionMaxRetry?: number;
        connectionRetryIntervalMs?: number
    }): Promise<Connection> {
        throw "TODO"
    }
}