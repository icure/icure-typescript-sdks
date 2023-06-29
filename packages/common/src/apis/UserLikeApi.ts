import { Filter } from '../filters/Filter'
import { SharedDataType } from '../models/User.model'
import { Connection } from '../models/Connection.model'
import { EmailMessageFactory, SMSMessageFactory } from '../utils/msgGtwMessageFactory'
import { PaginatedList } from '../models/PaginatedList.model'

/**
 * The UserApi interface provides methods to manage users.
 */
export interface UserLikeApi<DSUser, DSPatient> {
    /**
     * Checks that the provided token is (still) valid for the provided user id (or user login).
     * Check token validity for a user.
     * @param id The UUID that identifies the user uniquely
     * @param token The token that will be checked
     */
    checkTokenValidity(id: string, token: string): Promise<boolean>
    /**
     * Creates a User from an existing patient with a short-lived authentication token. It sends an invitation with the
     * credentials and the link to complete the signup.
     * @param patient the Patient to create the user for.
     * @param messageFactory a MessageFactory that generates an EmailMessage or a SMSMessage.
     * @param tokenDuration the validity duration of the short-lived token, in seconds (default 48 hours)
     */
    createAndInvite(patient: DSPatient, messageFactory: SMSMessageFactory | EmailMessageFactory, tokenDuration?: number): Promise<DSUser>

    /**
     * A user must have a login, an email or a mobilePhone defined, a user should be linked to either a Healthcare Professional, a Patient or a Device. When modifying an user, you must ensure that the rev obtained when getting or creating the user is present as the rev is used to guarantee that the user has not been modified by a third party.
     * Create a new user or modify an existing one.
     * @param user The user that must be created in the database.
     */
    createOrModify(user: DSUser): Promise<DSUser>
    /**
     * A token is used to authenticate the user. It is just like a password but it is destined to be used by programs instead of humans. Tokens have a limited validity period (one month).
     * Create a token for a user.
     * @param id The UUID that identifies the user uniquely
     * @param durationInSeconds the validity duration of the token, in seconds
     */
    createToken(id: string, durationInSeconds?: number): Promise<string>
    /**
     * Deletes the user identified by the provided unique id.
     * Delete an existing user.
     * @param id The UUID that uniquely identifies the user to be deleted.
     */
    delete(id: string): Promise<string>
    /**
     * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for Users are AllUsersFilter and UsersByIdsFilter. This method returns a paginated list of users (with a cursor that lets you query the following items).
     * Load users from the database by filtering them using the provided Filter.
     * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
     * @param nextUserId The id of the first User in the next page
     * @param limit The number of users to return in the queried page
     */
    filterBy(filter: Filter<DSUser>, nextUserId?: string, limit?: number): Promise<PaginatedList<DSUser>>
    /**
     * When you make a call to the server, an authentication token is used to identify you. This call returns the complete User object that corresponds to your authentication credentials.
     * Get the details of the logged User.
     */
    getLogged(): Promise<DSUser>
    /**
     * Each user is uniquely identified by a user id. The user id is a UUID. This id is the preferred method to retrieve one specific user.
     * Get a User by id.
     * @param id The UUID that identifies the user uniquely
     */
    get(id: string): Promise<DSUser>

    /**
     * Get a User by email.
     *
     * Each user is uniquely identified by an email
     *
     * @param email The email that identifies the user uniquely
     */
    getByEmail(email: string): Promise<DSUser>

    /**
     * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for Users are AllUsersFilter and UsersByIdsFilter. This method returns the list of the ids of the users matching the filter.
     * Load user ids from the database by filtering them using the provided Filter.
     * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
     */
    matchBy(filter: Filter<DSUser>): Promise<Array<string>>

    /**
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
    subscribeTo(eventTypes: ('CREATE' | 'UPDATE' | 'DELETE')[], filter: Filter<DSUser>, eventFired: (user: DSUser) => Promise<void>, options?: { connectionMaxRetry?: number; connectionRetryIntervalMs?: number }): Promise<Connection>

    /**
     * Add autoDelegations values to the user.
     * @param dataOwnerIds Array of DataOwnerId to add
     * @param type Type of AutoDelegation to add. Shares all data by default.
     * @return Updated user
     */
    shareAllFutureDataWith(dataOwnerIds: string[], type?: SharedDataType): Promise<DSUser>

    /**
     * Removes autoDelegations values to the user.
     * @param dataOwnerIds Array of DataOwnerId to add
     * @param type Type of AutoDelegation to removes. Shares all data by default.
     * @return Updated user
     */
    stopSharingDataWith(dataOwnerIds: string[], type?: SharedDataType): Promise<DSUser>
}
