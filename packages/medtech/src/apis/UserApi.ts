import {
  CommonApi,
  CommonFilter,
  Connection,
  mapUserDtoToUser,
  mapUserToUserDto,
  PaginatedList,
  User, UserLikeApi, UserLikeApiImpl,
} from '@icure/typescript-common'
import {
  HealthcareParty as HealthcarePartyDto,
  PaginatedListUser,
  Patient as PatientDto,
  User as UserDto
} from '@icure/api'
import {Patient} from '../models/Patient.model'
import {mapPatientDtoToPatient, mapPatientToPatientDto} from '../mappers/Patient.mapper'
import {
  mapHealthcarePartyToHealthcareProfessional,
  mapHealthcareProfessionalToHealthcareParty
} from '../mappers/HealthcareProfessional.mapper'
import {HealthcareProfessional} from '../models/HealthcareProfessional.model'
import {MessageFactory} from '@icure/typescript-common'

export interface UserApi extends UserLikeApi<User, Patient> {
  /**
   * @deprecated Use {@link UserApi.createOrModify} instead.
   *
   * Creates a User from an existing patient with a short-lived authentication token. It sends an invitation with the
   * credentials and the link to complete the signup.
   * @param patient the Patient to create the user for.
   * @param tokenDuration the validity duration of the short-lived token, in seconds (default 48 hours)
   */
  createAndInviteUser(patient: Patient, tokenDuration?: number): Promise<User>;

  /**
   * @deprecated Use {@link UserApi.createOrModify} instead.
   *
   * A user must have a login, an email or a mobilePhone defined, a user should be linked to either a Healthcare Professional, a Patient or a Device. When modifying an user, you must ensure that the rev obtained when getting or creating the user is present as the rev is used to guarantee that the user has not been modified by a third party.
   * Create a new user or modify an existing one.
   * @param user The user that must be created in the database.
   */
  createOrModifyUser(user: User): Promise<User>;

  /**
   * @deprecated Use {@link UserApi.delete} instead.
   *
   * Deletes the user identified by the provided unique userId.
   * Delete an existing user.
   * @param userId The UUID that uniquely identifies the user to be deleted.
   */
  deleteUser(userId: string): Promise<string>;

  /**
   * @deprecated Use {@link UserApi.filterBy} instead.
   *
   * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for Users are AllUsersFilter and UsersByIdsFilter. This method returns a paginated list of users (with a cursor that lets you query the following items).
   * Load users from the database by filtering them using the provided Filter.
   * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
   * @param nextUserId The id of the first User in the next page
   * @param limit The number of users to return in the queried page
   */
  filterUsers(filter: CommonFilter<UserDto>, nextUserId?: string, limit?: number): Promise<PaginatedList<User>>;

  /**
   * @deprecated Use {@link UserApi.getLogged} instead.
   *
   * When you make a call to the server, an authentication token is used to identify you. This call returns the complete User object that corresponds to your authentication credentials.
   * Get the details of the logged User.
   */
  getLoggedUser(): Promise<User>;

  /**
   * @deprecated Use {@link UserApi.getUser} instead.
   *
   * Each user is uniquely identified by a user id. The user id is a UUID. This userId is the preferred method to retrieve one specific user.
   * Get a User by id.
   * @param userId The UUID that identifies the user uniquely
   */
  getUser(userId: string): Promise<User>;

  /**
   * @deprecated Use {@link UserApi.getByEmail} instead.
   *
   * Get a User by email.
   *
   * Each user is uniquely identified by an email
   *
   * @param email The email that identifies the user uniquely
   */
  getUserByEmail(email: string): Promise<User>;

  /**
   * @deprecated Use {@link UserApi.matchBy} instead.
   *
   * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for Users are AllUsersFilter and UsersByIdsFilter. This method returns the list of the ids of the users matching the filter.
   * Load user ids from the database by filtering them using the provided Filter.
   * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
   */
  matchUsers(filter: CommonFilter<UserDto>): Promise<Array<string>>;

  /**
   * @deprecated Use {@link UserApi.subscribeToEvents} instead.
   *
   * Opens a WebSocket Connection in order to receive all the Users corresponding to specific filter criteria.
   * @param eventTypes Type of event you would like to listen. It can be CREATE, UPDATE or DELETE
   * @param filter Filter criteria to filter to the users you would like to receive
   * @param eventFired Action applied each time you receive a user through the WebSocket
   * @param options Options to configure the WebSocket.
   *    - keepAlive : How long to keep connection alive (ms);
   *    - lifetime : How long to keep the WebSocket alive (ms);
   *    - connectionMaxRetry : how many time retrying to reconnect to the iCure WebSocket;
   *    - connectionRetryIntervalInMs : How long base interval will be between two retry. The retry attempt is exponential and using a random value (connectionRetryIntervalMs * (random between 1 and 2))^nbAttempts)
   */
  subscribeToUserEvents(
      eventTypes: ('CREATE' | 'UPDATE' | 'DELETE')[],
      filter: CommonFilter<UserDto>,
      eventFired: (user: User) => Promise<void>,
      options?: { connectionMaxRetry?: number; connectionRetryIntervalMs?: number }
  ): Promise<Connection>;
}

/**
 * The UserApi interface provides methods to manage users.
 */
class UserApiImpl extends UserLikeApiImpl<User, Patient, HealthcareProfessional> implements UserApi {
  createAndInviteUser(patient: Patient, tokenDuration?: number): Promise<User> {
    return this.createAndInvite(patient, tokenDuration)
  }
  createOrModifyUser(user: User): Promise<User> {
    return this.createOrModify(user)
  }
  deleteUser(userId: string): Promise<string> {
    return this.delete(userId)
  }
  filterUsers(filter: CommonFilter<UserDto>, nextUserId?: string, limit?: number): Promise<PaginatedList<User>> {
    return this.filterBy(filter, nextUserId, limit)
  }
  getLoggedUser(): Promise<User> {
    return this.getLogged()
  }
  getUser(userId: string): Promise<User> {
    return this.get(userId)
  }
  getUserByEmail(email: string): Promise<User> {
    return this.getByEmail(email)
  }
  matchUsers(filter: CommonFilter<UserDto>): Promise<Array<string>> {
    return this.matchBy(filter)
  }
  subscribeToUserEvents(
      eventTypes: ('CREATE' | 'UPDATE' | 'DELETE')[],
      filter: CommonFilter<UserDto>,
      eventFired: (user: User) => Promise<void>,
      options?: { connectionMaxRetry?: number; connectionRetryIntervalMs?: number }
  ): Promise<Connection> {
    return this.subscribeToEvents(eventTypes, filter, eventFired, options)
  }
}

export const userApi = (api: CommonApi, messageFactory: MessageFactory<User, HealthcareProfessional, Patient>) => {
  return new UserApiImpl(
    {
      toDomain(dto: UserDto): User {
        return mapUserDtoToUser(dto)
      },
      toDto(domain: User): UserDto {
        return mapUserToUserDto(domain)
      },
    },
    {
      toDomain(dto: PatientDto): Patient {
        return mapPatientDtoToPatient(dto)
      },
      toDto(domain: Patient): PatientDto {
        return mapPatientToPatientDto(domain)
      },
    },
    {
      toDomain(dto: HealthcarePartyDto): HealthcareProfessional {
        return mapHealthcarePartyToHealthcareProfessional(dto)
      },
      toDto(domain: HealthcareProfessional): HealthcarePartyDto {
        return mapHealthcareProfessionalToHealthcareParty(domain)
      },
    },
    api.errorHandler,
    api.sanitizer,
    api.baseApi.userApi,
    api.baseApi.dataOwnerApi,
    api,
    messageFactory,
    api.messageGatewayApi
  )
}
