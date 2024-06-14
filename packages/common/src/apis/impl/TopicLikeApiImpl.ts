import { TopicLikeApi } from '../TopicLikeApi'
import { Reference } from '../../types/Reference'
import { CodingReference } from '../../models/CodingReference.model'
import { PaginatedList } from '../../models/PaginatedList.model'
import { Connection, HealthcareParty, HealthElement, IccPatientXApi, IccUserXApi, Patient, SecureDelegation, Service, SubscriptionOptions, Topic as TopicDto, TopicRole } from '@icure/api'
import { CommonFilter, NoOpFilter } from '../../filters/filters'
import { TopicRoleEnum } from '../../models/enums/TopicRole.enum'
import { IccTopicXApi } from '@icure/api/icc-x-api/icc-topic-x-api'
import { ErrorHandler } from '../../services/ErrorHandler'
import { Mapper } from '../Mapper'
import { mapCodingReferenceToCodeStub } from '../../mappers/CodingReference.mapper'
import { toPaginatedList } from '../../mappers/PaginatedList.mapper'
import { FilterMapper } from '../../mappers/Filter.mapper'
import { FilterChainTopic } from '@icure/api/icc-api/model/FilterChainTopic'
import { IccDataOwnerXApi } from '@icure/api/icc-x-api/icc-data-owner-x-api'

import { CryptoStrategies } from '../../services/CryptoStrategies'
import { DataOwnerWithType } from '../../models/DataOwner.model'
import AccessLevelEnum = SecureDelegation.AccessLevelEnum

export class TopicLikeApiImpl<DSTopic, DSHcp, DSPatient, DSService, DSHealthElement, DSDataOwnerWithType extends DataOwnerWithType> implements TopicLikeApi<DSTopic, DSHcp, DSPatient, DSService, DSHealthElement> {
    constructor(
        private readonly topicMapper: Mapper<DSTopic, TopicDto>,
        private readonly hcpMapper: Mapper<DSHcp, HealthcareParty>,
        private readonly patientMapper: Mapper<DSPatient, Patient>,
        private readonly serviceMapper: Mapper<DSService, Service>,
        private readonly healthElementMapper: Mapper<DSHealthElement, HealthElement>,
        private readonly dataOwnerMapper: Mapper<DSDataOwnerWithType, DataOwnerWithType>,
        private readonly errorHandler: ErrorHandler,
        private readonly topicApi: IccTopicXApi,
        private readonly userApi: IccUserXApi,
        private readonly patientApi: IccPatientXApi,
        private readonly dataOwnerApi: IccDataOwnerXApi,
        private readonly cryptoStrategies: CryptoStrategies<DSDataOwnerWithType>,
    ) {}

    async addParticipant(
        topic: DSTopic,
        participant: {
            ref: Reference<DSHcp>
            role: TopicRoleEnum
        },
    ): Promise<DSTopic> {
        const hcpId = typeof participant.ref === 'string' ? participant.ref : this.hcpMapper.toDto(participant.ref).id!
        const dataOwner = await this.dataOwnerApi.getDataOwner(hcpId)

        if (this.cryptoStrategies.dataOwnerRequiresAnonymousDelegation(hcpId, this.dataOwnerMapper.toDomain(dataOwner).type)) {
            throw this.errorHandler.createErrorWithMessage("Data owner that requires anonymous delegation aren't supported yet")
        }

        return this.topicMapper.toDomain(
            await this.topicApi
                .addParticipantWithTopic(
                    {
                        dataOwnerId: hcpId,
                        topicRole: participant.role as string as TopicRole,
                    },
                    this.topicMapper.toDto(topic),
                )
                .catch((e) => {
                    throw this.errorHandler.createErrorFromAny(e)
                }),
        )
    }

    async addServices(topic: DSTopic, services: Reference<DSService>[]): Promise<DSTopic> {
        const previousTopic = this.topicMapper.toDto(topic)
        return this.topicMapper.toDomain(
            await this.topicApi
                .modifyTopic(
                    new TopicDto({
                        ...previousTopic,
                        linkedServices: [...(previousTopic.linkedServices ?? []), ...this.getRefIds(services, (service) => this.serviceMapper.toDto(service).id!)],
                    }),
                )
                .catch((e) => {
                    throw this.errorHandler.createErrorFromAny(e)
                }),
        )
    }

    async addHealthElements(topic: DSTopic, healthElements: Reference<DSHealthElement>[]): Promise<DSTopic> {
        const previousTopic = this.topicMapper.toDto(topic)
        return this.topicMapper.toDomain(
            await this.topicApi
                .modifyTopic(
                    new TopicDto({
                        ...previousTopic,
                        linkedHealthElements: [...(previousTopic.linkedHealthElements ?? []), ...this.getRefIds(healthElements, (he) => this.healthElementMapper.toDto(he).id!)],
                    }),
                )
                .catch((e) => {
                    throw this.errorHandler.createErrorFromAny(e)
                }),
        )
    }

    async create(
        participants: { participant: Reference<DSHcp>; role: TopicRoleEnum }[],
        description?: string,
        patient?: Reference<DSPatient>,
        healthElements?: Array<Reference<DSHealthElement>>,
        services?: Array<Reference<DSService>>,
        tags?: Array<CodingReference>,
        codes?: Array<CodingReference>,
    ): Promise<DSTopic> {
        const currentUser = await this.userApi.getCurrentUser()
        const dataOwnerId = this.dataOwnerApi.getDataOwnerIdOf(currentUser)

        let linkedPatient: Patient | undefined = undefined
        if (patient !== undefined) {
            if (typeof patient === 'string') {
                linkedPatient = await this.patientApi.getPatientWithUser(currentUser, patient)
            } else {
                linkedPatient = this.patientMapper.toDto(patient)
            }
        }

        const activeParticipants: { role: TopicRoleEnum; hcpId: string }[] = [...(participants ?? [])].map((curr) => {
            let hcpId = this.getRefIds([curr.participant], (hcp) => this.hcpMapper.toDto(hcp).id!)[0]
            return { hcpId, role: curr.role as string as TopicRoleEnum }
        })

        const dataOwners = await Promise.all(
            activeParticipants.map(async (curr) => ({
                dataOwner: await this.dataOwnerApi.getDataOwner(curr.hcpId),
                hcpId: curr.hcpId,
            })),
        )
        if (dataOwners.some(({ dataOwner, hcpId }) => this.cryptoStrategies.dataOwnerRequiresAnonymousDelegation(hcpId, this.dataOwnerMapper.toDomain(dataOwner).type))) {
            throw this.errorHandler.createErrorWithMessage("Data owner that requires anonymous delegation aren't supported yet")
        }

        if (!activeParticipants.some(({ hcpId, role }) => hcpId === dataOwnerId && role === TopicRoleEnum.OWNER)) {
            throw this.errorHandler.createErrorWithMessage("The current user must be a participant of the topic with the role 'OWNER'")
        }

        const linkedServiceIds = services ? this.getRefIds(services, (service) => this.serviceMapper.toDto(service).id!) : undefined
        const linkedHealthElementIds = healthElements ? this.getRefIds(healthElements, (he) => this.healthElementMapper.toDto(he).id!) : undefined

        const newTopicInstance = await this.topicApi.newInstance(
            currentUser,
            linkedPatient ?? null,
            new TopicDto({
                description: description,
                tags: [...(tags ?? [])].map((tag) => mapCodingReferenceToCodeStub(tag)),
                codes: [...(codes ?? [])].map((code) => mapCodingReferenceToCodeStub(code)),
                activeParticipants: Object.fromEntries(activeParticipants.map((curr) => [curr.hcpId, curr.role])),
                linkedServices: linkedServiceIds,
                linkedHealthElements: linkedHealthElementIds,
            }),
            {
                additionalDelegates: Object.fromEntries(activeParticipants.map((curr) => [curr.hcpId, AccessLevelEnum.WRITE])),
            },
        )

        return this.topicMapper.toDomain(
            await this.topicApi.createTopic(newTopicInstance).catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            }),
        )
    }

    async filterBy(filter: CommonFilter<TopicDto>, nextTopicId?: string, limit?: number): Promise<PaginatedList<DSTopic>> {
        if (NoOpFilter.isNoOp(filter)) {
            return PaginatedList.empty()
        }

        return toPaginatedList(
            await this.topicApi
                .filterTopicsBy(
                    new FilterChainTopic({
                        filter: FilterMapper.toAbstractFilterDto<TopicDto>(filter, 'Topic'),
                    }),
                    nextTopicId,
                    limit,
                )
                .catch((e) => {
                    throw this.errorHandler.createErrorFromAny(e)
                }),
            this.topicMapper.toDomain,
        )!
    }

    async get(id: string): Promise<DSTopic> {
        return this.topicMapper.toDomain(await this.topicApi.getTopic(id))
    }

    async leave(topic: DSTopic): Promise<DSTopic> {
        const currentUser = await this.userApi.getCurrentUser()
        const dataOwnerId = this.dataOwnerApi.getDataOwnerIdOf(currentUser)
        return await this.removeParticipant(topic, dataOwnerId)
    }

    async matchBy(filter: CommonFilter<TopicDto>): Promise<Array<String>> {
        if (NoOpFilter.isNoOp(filter)) {
            return Promise.resolve([])
        } else {
            return this.topicApi.matchTopicsBy(FilterMapper.toAbstractFilterDto(filter, 'Topic')).catch((e) => {
                throw this.errorHandler.createErrorFromAny(e)
            })
        }
    }

    async removeParticipant(topic: DSTopic, participant: Reference<DSHcp>): Promise<DSTopic> {
        return this.topicMapper.toDomain(await this.topicApi.removeParticipant({ dataOwnerId: this.getRefIds([participant], (hcp) => this.hcpMapper.toDto(hcp).id!)[0] }, this.topicMapper.toDto(topic).id!))
    }

    async removeServices(topic: DSTopic, services: Reference<DSService>[]): Promise<DSTopic> {
        const previousTopic = this.topicMapper.toDto(topic)
        const servicesIds = services.map((service) => (typeof service === 'string' ? service : this.serviceMapper.toDto(service).id!))
        return this.topicMapper.toDomain(
            await this.topicApi.modifyTopic(
                new TopicDto({
                    ...previousTopic,
                    linkedServices: (previousTopic.linkedServices ?? []).filter((serviceId) => !servicesIds.includes(serviceId)),
                }),
            ),
        )
    }

    async removeHealthElements(topic: DSTopic, healthElements: Reference<DSHealthElement>[]): Promise<DSTopic> {
        const previousTopic = this.topicMapper.toDto(topic)
        const healthElementsIds = healthElements.map((healthElement) => (typeof healthElement === 'string' ? healthElement : this.healthElementMapper.toDto(healthElement).id!))
        return this.topicMapper.toDomain(
            await this.topicApi.modifyTopic(
                new TopicDto({
                    ...previousTopic,
                    linkedHealthElements: (previousTopic.linkedHealthElements ?? []).filter((healthElementId) => !healthElementsIds.includes(healthElementId)),
                }),
            ),
        )
    }

    async subscribeToEvents(eventTypes: ('CREATE' | 'UPDATE' | 'DELETE')[], filter: CommonFilter<TopicDto>, eventFired: (topic: DSTopic) => Promise<void>, options?: SubscriptionOptions): Promise<Connection> {
        return await this.topicApi.subscribeToTopicEvents(eventTypes, FilterMapper.toAbstractFilterDto(filter, 'Topic'), async (topic) => await eventFired(this.topicMapper.toDomain(topic)), options)
    }

    private getRefIds(references: Array<Reference<any>> | Reference<any>[], mapToAndGetId: (value: any) => string): string[] {
        return [...(references ?? [])].map((reference) => (typeof reference === 'string' ? reference : mapToAndGetId(reference)))
    }
}
