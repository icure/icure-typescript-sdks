import { CommonFilter } from '../filters/filters'
import { PaginatedList } from '../models/PaginatedList.model'
import { Connection, Topic as TopicDto } from '@icure/api'
import { CodingReference } from '../models/CodingReference.model'
import { Reference } from '../types/Reference'
import { TopicRole } from '../models/enums/TopicRole'

export interface TopicLikeApi<DSTopic, DSHcp, DSPatient, DSService, DSHealthElement> {
    /**
     * A Topic is a discussion between healthcare professionals about a patient, some healthcare elements, some services, ...
     *
     * This service allows you to create a topic and to add participants to it.
     *
     * The topic will be created with the current user as a participant and will be considered as owner of the topic. They couldn't leave the topic except if they transfer the ownership to another participant.
     *
     * Services and healthElements are optional and can be added later. If you want to add them at the after Topic's creation, you can use the {@link addServices} and {@link addHealthElement} methods.
     * Services and healthElements have to be shared with the participants independently of the Topic creation.
     *
     * @param participants dataOwners that will be added to the topic
     * @param description description of the topic
     * @param patient patient linked to the topic
     * @param healthElements healthElements linked to the topic
     * @param services services linked to the topic.
     * @param tags
     * @param codes
     * @returns the created topic
     */
    create(
        participants: { participant: Reference<DSHcp>; role: TopicRole }[],
        description?: string,
        patient?: Reference<DSPatient>,
        healthElements?: Set<Reference<DSHealthElement>>,
        services?: Set<Reference<DSService>>,
        tags?: Set<CodingReference>,
        codes?: Set<CodingReference>,
    ): Promise<DSTopic>

    /**
     * Add participant to a topic
     *
     * @param topic Topic to which participants will be added
     * @param participant Healthcare professionals that will be added to the topic
     *
     * @returns the updated topic
     */
    addParticipant(topic: DSTopic, participant: { ref: Reference<DSHcp>; role: TopicRole }): Promise<DSTopic>

    /**
     * Remove participants from a topic
     * @param topic Topic from which participants will be removed
     * @param participant Healthcare professionals that will be removed from the topic
     *
     * @returns the updated topic
     */
    removeParticipant(topic: DSTopic, participant: Reference<DSHcp>): Promise<DSTopic>

    /**
     * Add a service to a topic
     * @param topic Topic to which the service will be added
     * @param services Services that will be added to the topic
     *
     * @returns the updated topic
     */
    addServices(topic: DSTopic, services: Reference<DSService>[]): Promise<DSTopic>

    /**
     * Add a healthElements to a topic
     * @param topic Topic to which the service will be added
     * @param healthElements HealthElements that will be added to the topic
     *
     * @returns the updated topic
     */
    addHealthElements(topic: DSTopic, healthElements: Reference<DSHealthElement>[]): Promise<DSTopic>

    /**
     * Remove a service from a topic
     * @param topic Topic from which the service will be removed
     * @param services Services that will be removed from the topic
     *
     * @returns the updated topic
     */
    removeServices(topic: DSTopic, services: DSService[]): Promise<DSTopic>

    /**
     * Remove a healthElements from a topic
     * @param topic Topic from which the service will be removed
     * @param healthElements HealthElements that will be removed from the topic
     *
     * @returns the updated topic
     */
    removeHealthElements(topic: DSTopic, healthElements: DSHealthElement[]): Promise<DSTopic>

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

    filterBy(filter: CommonFilter<TopicDto>, nextTopicId?: string, limit?: number): Promise<PaginatedList<DSTopic>>

    matchBy(filter: CommonFilter<TopicDto>): Promise<Array<String>>

    subscribeToEvents(eventTypes: ('CREATE' | 'UPDATE' | 'DELETE')[], filter: CommonFilter<TopicDto>, eventFired: (topic: DSTopic) => Promise<void>, options?: { connectionMaxRetry?: number; connectionRetryIntervalMs?: number }): Promise<Connection>
}
