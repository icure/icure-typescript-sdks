import { CommonFilter } from '../filters/filters'
import { PaginatedList } from '../models/PaginatedList.model'
import { Connection } from '@icure/api'
import { CodingReference } from '../models/CodingReference.model'
import { Reference } from '../types/Reference'

export interface TopicLikeApi<DSTopic, DSHcp, DSPatient, DSService, DSHealthElement> {
    /**
     * A Topic is a discussion between healthcare professionals about a patient, a healthcare element, some services, ...
     * This service allows you to create a topic and to add participants to it.
     *
     * @param participants dataOwners that will be added to the topic
     * @param description description of the topic
     * @param patient patient linked to the topic
     * @param healthElement healthElement linked to the topic
     * @param services services linked to the topic
     * @param tags
     * @param codes
     * @returns the created topic
     */
    create(participants: Reference<DSHcp>[], description?: string, patient?: Reference<DSPatient>, healthElement?: Reference<DSHealthElement>, services?: Array<Reference<DSService>>, tags?: Array<CodingReference>, codes?: Array<CodingReference>): Promise<DSTopic>

    /**
     * Add participants to a topic
     *
     * @param topic Topic to which participants will be added
     * @param participants Healthcare professionals that will be added to the topic
     *
     * @returns the updated topic
     */
    addParticipants(topic: DSTopic, participants: Reference<DSHcp>[]): Promise<DSTopic>

    /**
     * Remove participants from a topic
     * @param topic Topic from which participants will be removed
     * @param participants Healthcare professionals that will be removed from the topic
     *
     * @returns the updated topic
     */
    removeParticipants(topic: DSTopic, participants: Reference<DSHcp>[]): Promise<DSTopic>

    /**
     * Add a service to a topic
     * @param topic Topic to which the service will be added
     * @param services Services that will be added to the topic
     *
     * @returns the updated topic
     */
    addServices(topic: DSTopic, services: DSService[]): Promise<DSTopic>

    /**
     * Remove a service from a topic
     * @param topic Topic from which the service will be removed
     * @param services Services that will be removed from the topic
     *
     * @returns the updated topic
     */
    removeServices(topic: DSTopic, services: DSService[]): Promise<DSTopic>

    /**
     * Unsubscribe the current user from a topic, the user will not receive any more messages from this topic neither will be able to send messages to it
     * New messages created by other users will not be shared to the current user
     * @param topic Topic from which the user will be unsubscribed
     *
     * @returns the updated topic
     */
    leave(topic: DSTopic): Promise<DSTopic>

    /**
     * Get a topic by its id
     * @param id id of the topic to get
     *
     * @returns the topic
     */
    get(id: string): Promise<DSTopic>

    //TODO: Add proper type when filter is implemented
    filterBy(filter: CommonFilter<any>, nextTopicId?: string, limit?: number): Promise<PaginatedList<DSTopic>>

    //TODO: Add proper type when filter is implemented
    matchBy(filter: CommonFilter<any>, nextTopicId?: string, limit?: number): Promise<PaginatedList<DSTopic>>

    //TODO: Add proper type when filter is implemented
    subscribeToEvents(eventTypes: ('CREATE' | 'UPDATE' | 'DELETE')[], filter: CommonFilter<any>, eventFired: (topic: DSTopic) => Promise<void>, options?: { connectionMaxRetry?: number; connectionRetryIntervalMs?: number }): Promise<Connection>
}
