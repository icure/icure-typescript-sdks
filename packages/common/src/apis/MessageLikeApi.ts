import { Reference } from '../types/Reference'
import { CommonFilter } from '../filters/filters'
import { PaginatedList } from '../models/PaginatedList.model'
import { Connection, Document, Document as DocumentDto, Message as MessageDto, SecureDelegation, Topic as TopicDto } from '@icure/api'
import { SubscriptionOptions } from '@icure/api/icc-x-api/utils'
import DocumentLocationEnum = Document.DocumentLocationEnum

export interface MessageLikeApi<DSMessage, DSTopic, DSBinary> {
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
     * @returns MessageCreationResult progress of the message creation if the message creation is not finished, or the created message
     */
    create(topic: Reference<DSTopic>, content?: string, attachments?: DSBinary[]): Promise<MessageCreationResult<DSMessage>>

    /**
     * Resume the creation of a message
     * @param creationProgress Progress of the message creation, returned by the {@link create} method when the message creation is not finished
     */
    resumeMessageCreation(creationProgress: MessageCreationProgress): Promise<MessageCreationResult<DSMessage>>

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
    getAttachments(message: Reference<DSMessage>): Promise<DSBinary[]>

    /**
     * Mark messages as read
     * @param messages Reference of the message
     * @returns the updated messages
     */
    read(messages: Reference<DSMessage>[]): Promise<DSMessage[]>

    filterBy(filter: CommonFilter<MessageDto>, nextMessageId?: string, limit?: number): Promise<PaginatedList<DSMessage>>

    matchBy(filter: CommonFilter<MessageDto>): Promise<string[]>

    subscribeToEvents(eventTypes: ('CREATE' | 'UPDATE' | 'DELETE')[], filter: CommonFilter<MessageDto>, eventFired: (topic: DSMessage) => Promise<void>, options?: SubscriptionOptions): Promise<Connection>
}

export type MessageCreationResult<DSMessage> =
    | { createdMessage: DSMessage }
    | {
          creationProgress: MessageCreationProgress
      }

/**
 * @internal
 */
export type MessageCreationProgress =
    | {
          step: MessageCreationStep.MESSAGE_INITIALISATION
          topic: TopicDto
          content: string | undefined
          attachments: AttachmentInput[] | undefined
          delegates: { [p: string]: SecureDelegation.AccessLevelEnum }
      }
    | {
          step: MessageCreationStep.MESSAGE_INITIALISED
          partialMessage: MessageDto
          remainingAttachments: AttachmentCreationProgress[] | undefined
          delegates: { [p: string]: SecureDelegation.AccessLevelEnum }
      }
    | {
          step: MessageCreationStep.MESSAGE_ATTACHED
          createdAttachments: AttachmentCreationProgress[]
          partialMessage: MessageDto
      }

/**
 * @internal
 */
export type AttachmentCreationProgress =
    | {
          step: AttachmentCreationStep.DOCUMENT_INITIALISATION
          attachment: AttachmentInput
      }
    | {
          step: AttachmentCreationStep.DOCUMENT_INITIALISED
          instantiatedDocument: DocumentDto
          attachment: AttachmentInput
      }
    | {
          step: AttachmentCreationStep.DOCUMENT_CREATED
          createdDocument: DocumentDto
          attachment: AttachmentInput
      }
    | {
          step: AttachmentCreationStep.DOCUMENT_ATTACHED
          document: DocumentDto
          attachment: AttachmentInput
      }

/**
 * @internal
 */
export type AttachmentInput = {
    data: ArrayBuffer
    uti: string
    filename: string
    documentLocation: DocumentLocationEnum
}

/**
 * @internal
 */
export enum AttachmentCreationStep {
    DOCUMENT_INITIALISATION = 'DOCUMENT_INITIALISATION',
    DOCUMENT_INITIALISED = 'DOCUMENT_INITIALISED',
    DOCUMENT_CREATED = 'DOCUMENT_CREATED',
    DOCUMENT_ATTACHED = 'DOCUMENT_ATTACHED',
}

/**
 * @internal
 */
export enum MessageCreationStep {
    MESSAGE_INITIALISATION = 'MESSAGE_INITIALISATION',
    MESSAGE_INITIALISED = 'MESSAGE_INITIALISED',
    MESSAGE_ATTACHED = 'MESSAGE_ATTACHED',
    MESSAGE_CREATED = 'MESSAGE_CREATED',
}
