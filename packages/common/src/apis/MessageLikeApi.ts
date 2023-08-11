import { Reference } from '../types/Reference'
import { Topic } from '../models/Topic.model'
import { CommonFilter } from '../filters/filters'
import { PaginatedList } from '../models/PaginatedList.model'
import { Connection } from '@icure/api'

export interface MessageLikeApi<DSMessage> {
    /**
     * A Message is a message sent by a healthcare professional in a topic. It can contain a text and/or attachments.
     * You must provide either a content or attachment(s) to create a message.
     *
     * Content above 2000 characters will be truncated. An attachment will be added to the message with the full content and the first 2000 characters will be added to the content.
     *
     * @param topic Topic to which the message will be sent
     * @param content Text of the message
     * @param attachments Attachments of the message
     *
     * @returns the created message
     */
    create(topic: Reference<Topic>, content?: string, attachments?: { data: ArrayBuffer; type: string }[]): Promise<DSMessage>

    /**
     * Delete a message
     * @param message Reference of message to delete
     */
    delete(message: Reference<DSMessage>): Promise<string>

    /**
     * Get a message by its id
     * @param id id of the message
     *
     * @returns the message
     */
    get(id: string): Promise<DSMessage>

    /**
     * Get the attachments of a message
     * @param message Reference of the message
     *
     * @returns the attachments of the message and their types
     */
    getAttachments(message: Reference<DSMessage>): Promise<{ data: ArrayBuffer[]; type: string }[]>

    /**
     * Mark messages as read
     * @param messages Reference of the message
     * @returns the updated messages
     */
    read(messages: Reference<DSMessage>[]): Promise<DSMessage[]>

    //TODO: Add proper type when filter is implemented
    filterBy(filter: CommonFilter<any>, nextMessageId?: string, limit?: number): Promise<PaginatedList<DSMessage>>

    //TODO: Add proper type when filter is implemented
    matchBy(filter: CommonFilter<any>, nextMessageId?: string, limit?: number): Promise<PaginatedList<DSMessage>>

    //TODO: Add proper type when filter is implemented
    subscribeToEvents(eventTypes: ('CREATE' | 'UPDATE' | 'DELETE')[], filter: CommonFilter<any>, eventFired: (topic: DSMessage) => Promise<void>, options?: { connectionMaxRetry?: number; connectionRetryIntervalMs?: number }): Promise<Connection>
}
