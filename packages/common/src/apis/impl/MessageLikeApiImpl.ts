import { Reference } from '../../types'
import {
    Connection,
    Document as DocumentDto,
    IccDocumentXApi,
    IccMessageXApi,
    IccUserXApi,
    Message as MessageDto,
    MessageAttachment as MessageAttachmentDto,
    MessageReadStatus,
    MessagesReadStatusUpdate,
    retry,
    SecureDelegation,
    SubscriptionOptions,
    Topic as TopicDto,
    User as UserDto,
} from '@icure/api'
import { PaginatedList } from '../../models/PaginatedList.model'
import { AttachmentCreationProgress, AttachmentCreationStep, AttachmentInput, MessageCreationProgress, MessageCreationResult, MessageCreationStep, MessageLikeApi } from '../MessageLikeApi'
import { Mapper } from '../Mapper'
import { IccTopicXApi } from '@icure/api/icc-x-api/icc-topic-x-api'
import { Filter } from '../../filters/Filter'
import { NoOpFilter } from '../../filters/dsl'
import { toPaginatedList } from '../../mappers/PaginatedList.mapper'
import { FilterMapper } from '../../mappers/Filter.mapper'
import { ErrorHandler } from '../../services/ErrorHandler'
import { FilterChainMessage } from '@icure/api/icc-api/model/FilterChainMessage'
import { IccDataOwnerXApi } from '@icure/api/icc-x-api/icc-data-owner-x-api'
import AccessLevelEnum = SecureDelegation.AccessLevelEnum
import DocumentLocationEnum = DocumentDto.DocumentLocationEnum

export class MessageLikeApiImpl<DSMessage, DSTopic, DSBinary> implements MessageLikeApi<DSMessage, DSTopic, DSBinary> {
    private readonly decoder = new TextDecoder()
    private readonly encoder = new TextEncoder()

    constructor(
        private readonly messageMapper: Mapper<DSMessage, MessageDto>,
        private readonly topicMapper: Mapper<DSTopic, TopicDto>,
        private readonly documentMapper: Mapper<DSBinary, { data: ArrayBuffer; uti: string; filename: string }>,
        private readonly messageApi: IccMessageXApi,
        private readonly topicApi: IccTopicXApi,
        private readonly userApi: IccUserXApi,
        private readonly documentApi: IccDocumentXApi,
        private readonly dataOwnerApi: IccDataOwnerXApi,
        private readonly errorHandler: ErrorHandler,
        private readonly characterLimit: number,
    ) {}

    getMessage(messageCreationResult: MessageCreationResult<DSMessage>): DSMessage | null {
        if (messageCreationResult.hasOwnProperty('createdMessage')) {
            return (messageCreationResult as Extract<MessageCreationResult<DSMessage>, { createdMessage: DSMessage }>).createdMessage
        }
        return null
    }

    /**
     * @inheritDoc MessageLikeApi.create
     * @param topic
     * @param content
     * @param attachments
     */
    async create(topic: Reference<DSTopic>, content: string | undefined, attachments?: DSBinary[]): Promise<MessageCreationResult<DSMessage>> {
        if (content === undefined && (attachments === undefined || attachments?.length === 0)) {
            throw this.errorHandler.createErrorWithMessage('You cannot create an empty message')
        }

        const currentUser = await this.userApi.getCurrentUser()
        const dataOwnerId = this.dataOwnerApi.getDataOwnerIdOf(currentUser)
        const topicDto = typeof topic === 'string' ? await this.topicApi.getTopic(topic) : await this.topicApi.getTopic(this.topicMapper.toDto(topic).id!)

        // TODO CV: This should be done by the backend, related to ticket ICBE-160
        if (!Object.entries(topicDto.activeParticipants ?? {}).some(([participantId]) => dataOwnerId === participantId)) {
            throw this.errorHandler.createErrorFromAny(new Error('You cannot create a message in a topic you are not a participant of'))
        }

        const shouldCreateAttachmentForContent = !!content && content.length > this.characterLimit

        const delegates: { [p: string]: SecureDelegation.AccessLevelEnum } = Object.fromEntries(
            Object.entries(topicDto?.activeParticipants ?? {})
                ?.filter(([participantId]) => currentUser.healthcarePartyId !== participantId)
                ?.map(([participantId]) => [participantId, AccessLevelEnum.READ]),
        )

        const binaries = attachments?.map((attachment) => this.documentMapper.toDto(attachment))

        const documentAttachments: AttachmentInput[] = [
            ...(binaries?.map((binary) => ({
                ...binary,
                documentLocation: DocumentLocationEnum.Annex,
            })) ?? []),
            ...(shouldCreateAttachmentForContent
                ? [
                      {
                          data: this.encoder.encode(content).buffer,
                          uti: this.documentApi.uti('text/plain', 'txt'),
                          filename: 'content.txt',
                          documentLocation: DocumentLocationEnum.Body,
                      },
                  ]
                : []),
        ]

        return await this.handleMessageCreation(
            {
                step: MessageCreationStep.MESSAGE_INITIALISATION,
                topic: topicDto,
                content: content,
                attachments: documentAttachments,
                delegates: delegates,
            },
            currentUser,
        )
    }

    async resumeMessageCreation(messageCreationResult: MessageCreationResult<DSMessage>): Promise<MessageCreationResult<DSMessage>> {
        const currentUser = await this.userApi.getCurrentUser()

        if (messageCreationResult.hasOwnProperty('creationProgress')) {
            const creationProgress = (messageCreationResult as Extract<MessageCreationResult<DSMessage>, { creationProgress: MessageCreationProgress }>).creationProgress
            return await this.handleMessageCreation(creationProgress, currentUser)
        }

        return messageCreationResult
    }

    async delete(message: Reference<DSMessage>): Promise<string> {
        const messageId = typeof message === 'string' ? message : this.messageMapper.toDto(message).id!
        const docIdentifiers = await this.messageApi.deleteMessage(messageId)
        return docIdentifiers.rev!
    }

    async filterBy(filter: Filter<MessageDto>, nextMessageId?: string, limit?: number): Promise<PaginatedList<DSMessage>> {
        if (NoOpFilter.isNoOp(filter)) {
            return PaginatedList.empty()
        }

        const paginatedListDto = await this.messageApi
            .filterMessagesBy(
                new FilterChainMessage({
                    filter: FilterMapper.toAbstractFilterDto<MessageDto>(filter, 'Message'),
                }),
                nextMessageId,
                limit,
            )
            .catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })

        return toPaginatedList(paginatedListDto, this.messageMapper.toDomain)!
    }

    async loadMessageWithContent(message: DSMessage): Promise<DSMessage> {
        const messageDto = this.messageMapper.toDto(message)

        const bodyAttachment = messageDto.messageAttachments?.find((messageAttachment) => messageAttachment.type === 'body')
        if (!bodyAttachment) {
            return message
        }

        const bodyDocument = await this.documentApi.getDocument(bodyAttachment?.ids![0]!)

        if (bodyDocument !== undefined) {
            const bodyDocumentAttachment = await retry(async () => await this.documentApi.getAndDecryptDocumentAttachment(bodyDocument), 5, 100, 2)
            return this.messageMapper.toDomain({
                ...messageDto,
                subject: this.decoder.decode(bodyDocumentAttachment),
            })
        }

        return message
    }

    async get(id: string): Promise<DSMessage> {
        const messageDto = await this.messageApi.getAndDecryptMessage(id)
        return this.messageMapper.toDomain(messageDto)
    }

    async getAttachments(message: Reference<DSMessage>): Promise<DSBinary[]> {
        const currentUser = await this.userApi.getCurrentUser()
        const messageDto = typeof message === 'string' ? await this.messageApi.getMessage(message) : this.messageMapper.toDto(message)
        const messageDocuments = await this.documentApi.findByMessage(this.dataOwnerApi.getDataOwnerIdOf(currentUser), messageDto)
        const annexes = messageDocuments.filter((document) => document.documentLocation === DocumentLocationEnum.Annex)

        return await Promise.all(
            annexes.map(async (document) => {
                const attachment = await retry(async () => await this.documentApi.getAndDecryptDocumentAttachment(document), 5, 100, 2)

                return this.documentMapper.toDomain({
                    data: attachment,
                    uti: document.mainUti!,
                    filename: document.name!,
                })
            }),
        )
    }

    async matchBy(filter: Filter<MessageDto>): Promise<string[]> {
        if (NoOpFilter.isNoOp(filter)) {
            return Promise.resolve([])
        } else {
            return this.messageApi.matchMessagesBy(FilterMapper.toAbstractFilterDto(filter, 'Message')).catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })
        }
    }

    async read(messages: Reference<DSMessage>[]): Promise<DSMessage[]> {
        const messageIds = messages.map((message) => (typeof message === 'string' ? message : this.messageMapper.toDto(message).id!))

        return await Promise.all(
            (
                await this.messageApi.setMessagesReadStatus(
                    new MessagesReadStatusUpdate({
                        ids: messageIds,
                        time: +new Date(),
                        status: true,
                        userId: (await this.userApi.getCurrentUser()).id!,
                    }),
                )
            ).map(async (message) => this.messageMapper.toDomain(message)),
        )
    }

    async subscribeToEvents(eventTypes: ('CREATE' | 'UPDATE' | 'DELETE')[], filter: Filter<MessageDto>, eventFired: (message: DSMessage) => Promise<void>, options?: SubscriptionOptions): Promise<Connection> {
        return await this.messageApi.subscribeToMessageEvents(eventTypes, FilterMapper.toAbstractFilterDto<MessageDto>(filter, 'Message'), async (message) => await eventFired(this.messageMapper.toDomain(message)), options)
    }

    /**
     *
     * Handle the creation of a message.
     *
     * This method is recursive and will call itself until the message is created following the following steps:
     * 1. Initialise the message
     * 2. Attach the documents to the message
     *  * Initialise the documents
     *  * Create the documents
     *  * Encrypt and set the attachment of the documents
     * 3. Create the message
     *
     * @internal
     * @param creationProgress the progress of the message creation
     * @param currentUser the current user
     * @private
     *
     * @returns MessageCreationResult the result of the message creation
     */
    private async handleMessageCreation(creationProgress: MessageCreationProgress, currentUser: UserDto): Promise<MessageCreationResult<DSMessage>> {
        switch (creationProgress.step) {
            case MessageCreationStep.MESSAGE_INITIALISATION: {
                const messageInitializationResult = await this.initialiseMessage(currentUser, creationProgress)

                if (messageInitializationResult.step !== MessageCreationStep.MESSAGE_INITIALISED) {
                    return {
                        creationProgress: messageInitializationResult,
                    } satisfies MessageCreationResult<DSMessage>
                }

                return this.handleMessageCreation(messageInitializationResult, currentUser)
            }
            case MessageCreationStep.MESSAGE_INITIALISED: {
                const attachDocumentToMessageResult = await this.attachDocumentsToMessage(creationProgress, currentUser)

                if (attachDocumentToMessageResult.step !== MessageCreationStep.MESSAGE_ATTACHED) {
                    return {
                        creationProgress: attachDocumentToMessageResult,
                    }
                }

                return this.handleMessageCreation(attachDocumentToMessageResult, currentUser)
            }
            case MessageCreationStep.MESSAGE_ATTACHED: {
                return this.handleMessageCreation(await this.createMessage(creationProgress), currentUser)
            }
            case MessageCreationStep.MESSAGE_CREATED: {
                return {
                    createdMessage: this.messageMapper.toDomain(creationProgress.createdMessage),
                }
            }

            default: {
                throw new Error(`Unknown message creation step: ${creationProgress}`)
            }
        }
    }

    private async createMessage(creationProgress: MessageCreationProgress): Promise<MessageCreationProgress> {
        if (creationProgress.step !== MessageCreationStep.MESSAGE_ATTACHED) {
            throw this.errorHandler.createErrorWithMessage(`createMessage should only be called with MessageCreationProgress at ${MessageCreationStep.MESSAGE_ATTACHED} step and not ${creationProgress.step} step`)
        }

        try {
            const createdMessage = await this.messageApi.encryptAndCreateMessage(creationProgress.partialMessage)

            const attachmentCreationResults = (
                creationProgress as Extract<
                    MessageCreationProgress,
                    {
                        step: MessageCreationStep.MESSAGE_ATTACHED
                    }
                >
            ).createdAttachments
            const bodyAttachment = (
                attachmentCreationResults as Extract<
                    AttachmentCreationProgress,
                    {
                        step: AttachmentCreationStep.DOCUMENT_ATTACHED
                    }
                >[]
            ).find((attachment) => attachment.attachment.documentLocation === DocumentLocationEnum.Body)?.attachment

            if (bodyAttachment !== undefined) {
                return {
                    step: MessageCreationStep.MESSAGE_CREATED,
                    createdMessage: {
                        ...createdMessage,
                        subject: this.decoder.decode(bodyAttachment.data),
                    },
                }
            }

            return {
                step: MessageCreationStep.MESSAGE_CREATED,
                createdMessage: createdMessage,
            }
        } catch (e) {
            console.error(e)

            return creationProgress
        }
    }

    /**
     * @internal
     *
     * Initialise the message to be created.
     *
     * This method will create the message instance and set the delegates. It will not create the message.
     *
     * - In case of failure, the method will return the initialisation parameters.
     * - In case of success, the method will return the initialised message creation progress that can be used to create the message in the next step {@link attachDocumentsToMessage}
     *
     * @param currentUser User creating the message
     * @param messageCreationProgress the progress of the message creation
     * @private
     *
     * @returns MessageCreationProgress the progress of the message creation
     */
    private async initialiseMessage(currentUser: UserDto, messageCreationProgress: MessageCreationProgress): Promise<MessageCreationProgress> {
        if (messageCreationProgress.step !== MessageCreationStep.MESSAGE_INITIALISATION) {
            throw this.errorHandler.createErrorWithMessage(`initialiseMessage should only be called with MessageCreationProgress at ${MessageCreationStep.MESSAGE_INITIALISATION} step and not ${messageCreationProgress.step} step`)
        }

        const topic = messageCreationProgress.topic
        const content = messageCreationProgress.content
        const attachments = messageCreationProgress.attachments
        const delegates = messageCreationProgress.delegates

        try {
            const newMessageInstance = await this.messageApi.newInstanceWithPatient(
                currentUser,
                null,
                new MessageDto({
                    subject: content?.substring(0, this.characterLimit),
                    sent: +new Date(),
                    transportGuid: topic!.id,
                    readStatus: Object.fromEntries(
                        Object.entries(topic?.activeParticipants ?? {}).map(([participantId]) => [
                            participantId,
                            new MessageReadStatus({
                                read: false,
                                time: null,
                            }),
                        ]),
                    ),
                }),
                {
                    additionalDelegates: delegates,
                },
            )

            return {
                step: MessageCreationStep.MESSAGE_INITIALISED,
                partialMessage: newMessageInstance,
                remainingAttachments: attachments?.map((attachment) => ({
                    step: AttachmentCreationStep.DOCUMENT_INITIALISATION,
                    attachment,
                })),
                delegates: delegates,
            }
        } catch (e) {
            console.error(e)

            return {
                step: MessageCreationStep.MESSAGE_INITIALISATION,
                topic: topic,
                content: content,
                attachments: attachments,
                delegates: delegates,
            }
        }
    }

    /**
     * @internal
     *
     * Attach the documents to the message.
     *
     * This method will create the documents and attach them to the message. It will not create the message.
     *
     * If the step is not {@link MessageCreationStep.MESSAGE_INITIALISED}, the method will return the message creation progress as is.
     *
     * - In case of failure to attach any document, the method will return the message creation progress with the remaining attachments to be attached.
     * - In case of success, the method will return the message creation progress with the message attached.
     *
     * @param messageCreationProgress the progress of the message creation
     * @param currentUser the current user
     * @private
     *
     * @returns MessageCreationProgress the progress of the message creation
     */
    private async attachDocumentsToMessage(messageCreationProgress: MessageCreationProgress, currentUser: UserDto): Promise<MessageCreationProgress> {
        if (messageCreationProgress.step !== MessageCreationStep.MESSAGE_INITIALISED) {
            throw this.errorHandler.createErrorWithMessage(`attachDocumentsToMessage should only be called with MessageCreationProgress at ${MessageCreationStep.MESSAGE_INITIALISED} step and not ${messageCreationProgress.step} step`)
        }

        const newMessageInstance = messageCreationProgress.partialMessage
        const documentAttachments = messageCreationProgress.remainingAttachments
        const delegates = messageCreationProgress.delegates

        const attachmentCreationProgresses = await this.createAttachedDocuments(currentUser, newMessageInstance, documentAttachments ?? [], delegates)

        if (attachmentCreationProgresses.some(({ step }) => step !== AttachmentCreationStep.DOCUMENT_ATTACHED)) {
            return {
                ...messageCreationProgress,
                remainingAttachments: attachmentCreationProgresses,
            } satisfies MessageCreationProgress
        }

        const createdAttachments = attachmentCreationProgresses.reduce(
            (acc, progress) => {
                if (progress.step === AttachmentCreationStep.DOCUMENT_ATTACHED) {
                    acc.push(progress)
                }
                return acc
            },
            [] as Array<Extract<AttachmentCreationProgress, { step: AttachmentCreationStep.DOCUMENT_ATTACHED }>>,
        )

        return {
            step: MessageCreationStep.MESSAGE_ATTACHED,
            partialMessage: {
                ...newMessageInstance,
                messageAttachments: createdAttachments.map(
                    (value) =>
                        new MessageAttachmentDto({
                            type: value.attachment.documentLocation.toLowerCase(),
                            ids: [value.document.id!],
                        }),
                ),
            },
            createdAttachments: attachmentCreationProgresses,
        }
    }

    /**
     *
     * Create the documents to be attached to the message.
     *
     * This method will create the documents and attach them to the message.
     *
     * The result of this method is a list of {@link AttachmentCreationProgress}, each representing the progress of the creation of a document.
     *
     * @internal
     * @param user User creating the documents
     * @param message Message to which the documents will be attached
     * @param attachments Attachments to be created
     * @param delegates Delegates to be added to the documents
     * @private
     *
     * @returns AttachmentCreationProgress the progress of the document creation
     */
    private async createAttachedDocuments(
        user: UserDto,
        message: MessageDto,
        attachments: AttachmentCreationProgress[],
        delegates: {
            [p: string]: SecureDelegation.AccessLevelEnum
        },
    ): Promise<AttachmentCreationProgress[]> {
        const documentInitializationResult = await this.initialiseDocuments(user, message, attachments, delegates)
        const documentCreationResults = await this.createDocuments(documentInitializationResult)
        return await this.encryptAndSetDocumentAttachment(documentCreationResults)
    }

    /**
     * @internal
     *
     * Initialise the documents to be created.
     *
     * @param user User creating the documents
     * @param message Message to which the documents will be attached
     * @param attachments Attachments to be created
     * @param delegates Delegates to be added to the documents
     * @private
     *
     * @returns AttachmentCreationProgress the progress of the document creation
     */
    private async initialiseDocuments(
        user: UserDto,
        message: MessageDto,
        attachments: AttachmentCreationProgress[],
        delegates: {
            [p: string]: SecureDelegation.AccessLevelEnum
        },
    ): Promise<AttachmentCreationProgress[]> {
        const attachmentToInitialize = attachments.reduce((acc, progress) => {
            if (progress.step === AttachmentCreationStep.DOCUMENT_INITIALISATION) {
                acc.push(progress.attachment)
            }
            return acc
        }, [] as Array<AttachmentInput>)

        const documentInitializationResult = await Promise.allSettled(
            attachmentToInitialize?.map(async ({ filename, documentLocation }) => {
                return await this.documentApi.newInstance(
                    user,
                    message,
                    new DocumentDto({
                        name: filename,
                        documentLocation: documentLocation,
                    }),
                    {
                        additionalDelegates: delegates,
                    },
                )
            }) ?? [],
        )

        const initialisedDocumentResults = documentInitializationResult.map((result, index) => ({
            result,
            index,
            origin: attachmentToInitialize[index],
            success: result.status === 'fulfilled',
        }))

        return [
            ...initialisedDocumentResults.map(({ result, origin, success }) => {
                if (success) {
                    return {
                        step: AttachmentCreationStep.DOCUMENT_INITIALISED,
                        attachment: origin,
                        instantiatedDocument: (result as PromiseFulfilledResult<DocumentDto>).value,
                    } satisfies AttachmentCreationProgress
                } else {
                    return {
                        step: AttachmentCreationStep.DOCUMENT_INITIALISATION,
                        attachment: origin,
                    } satisfies AttachmentCreationProgress
                }
            }),
            ...attachments.filter(({ step }) => step !== AttachmentCreationStep.DOCUMENT_INITIALISATION),
        ]
    }

    /**
     * @internal
     *
     * Create the documents that have been initialised.
     *
     * @param attachmentProgresses Progresses of the document creation
     * @private
     *
     * @returns AttachmentCreationProgress the progress of the document creation
     */
    private async createDocuments(attachmentProgresses: AttachmentCreationProgress[]): Promise<AttachmentCreationProgress[]> {
        const documentsToCreate = attachmentProgresses.reduce(
            (acc, progress) => {
                if (progress.step === AttachmentCreationStep.DOCUMENT_INITIALISED) {
                    acc.push({ document: progress.instantiatedDocument, attachment: progress.attachment })
                }
                return acc
            },
            [] as Array<{ document: DocumentDto; attachment: AttachmentInput }>,
        )

        const documentCreationResults = await Promise.allSettled(documentsToCreate.map(async ({ document }) => await this.documentApi.createDocument(document)))

        const createdDocumentResults = documentCreationResults.map((result, index) => ({
            result,
            index,
            origin: documentsToCreate[index],
            success: result.status === 'fulfilled',
        }))

        return [
            ...createdDocumentResults.map(({ result, origin, success }) => {
                if (success) {
                    return {
                        step: AttachmentCreationStep.DOCUMENT_CREATED,
                        attachment: origin.attachment,
                        createdDocument: (result as PromiseFulfilledResult<DocumentDto>).value,
                    } satisfies AttachmentCreationProgress
                } else {
                    return {
                        step: AttachmentCreationStep.DOCUMENT_INITIALISED,
                        attachment: origin.attachment,
                        instantiatedDocument: origin.document,
                    } satisfies AttachmentCreationProgress
                }
            }),
            ...attachmentProgresses.filter(({ step }) => step !== AttachmentCreationStep.DOCUMENT_INITIALISED),
        ]
    }

    /**
     * @internal
     *
     * Encrypt and set the attachment of the documents that have been created. This updates the documents.
     *
     * @param attachmentProgresses Progresses of the document creation
     * @private
     *
     * @returns AttachmentCreationProgress the progress of the document creation
     */
    private async encryptAndSetDocumentAttachment(attachmentProgresses: AttachmentCreationProgress[]): Promise<AttachmentCreationProgress[]> {
        const documentsToProcess = attachmentProgresses.reduce(
            (acc, progress) => {
                if (progress.step === AttachmentCreationStep.DOCUMENT_CREATED) {
                    acc.push({ document: progress.createdDocument, attachment: progress.attachment })
                }
                return acc
            },
            [] as Array<{ document: DocumentDto; attachment: AttachmentInput }>,
        )

        const documentCreationResults = await Promise.allSettled(documentsToProcess.map(async ({ document, attachment }) => await this.documentApi.encryptAndSetDocumentAttachment(document, attachment.data, [attachment.uti])))

        const createdDocumentResults = documentCreationResults.map((result, index) => ({
            result,
            index,
            origin: documentsToProcess[index],
            success: result.status === 'fulfilled',
        }))

        return [
            ...createdDocumentResults.map(({ result, origin, success }) => {
                if (success) {
                    return {
                        step: AttachmentCreationStep.DOCUMENT_ATTACHED,
                        document: (result as PromiseFulfilledResult<DocumentDto>).value,
                        attachment: origin.attachment,
                    } satisfies AttachmentCreationProgress
                } else {
                    return {
                        step: AttachmentCreationStep.DOCUMENT_CREATED,
                        attachment: origin.attachment,
                        createdDocument: origin.document,
                    } satisfies AttachmentCreationProgress
                }
            }),
            ...attachmentProgresses.filter(({ step }) => step !== AttachmentCreationStep.DOCUMENT_CREATED),
        ]
    }
}
