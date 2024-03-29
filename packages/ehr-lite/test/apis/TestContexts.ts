import { BaseApiTestContext, WithAuthenticationApi, WithDataOwnerApi, WithHcpApi, WithHelementApi, WithMaintenanceTaskApi, WithMessageApi, WithPatientApi, WithServiceApi, WithTopicApi } from '../../../common-test/apis/TestContexts'
import {
    AnonymousEHRLiteApi,
    Condition,
    ConditionApi,
    ConditionFilter,
    EHRLiteApi,
    HumanName,
    LocalComponent,
    NotificationFilter,
    Observation,
    ObservationApi,
    ObservationFilter,
    Organisation,
    OrganisationApi,
    Practitioner,
    PractitionerApi,
    DataOwnerWithType,
    AuthenticationApi,
    mapTopicDtoToTopic,
    mapTopicToTopicDto,
    MessageLikeApi,
    mapMessageDtoToMessage,
    mapMessageToMessageDto,
} from '../../src'
import { EHRLiteCryptoStrategies, SimpleEHRLiteCryptoStrategies } from '../../src/services/EHRLiteCryptoStrategies'
import {
    domainTypeTag,
    extractDomainTypeTag,
    KeyPair,
    mapDocumentToDocumentDto,
    mapOf,
    mapUserDtoToUser,
    mapUserToUserDto,
    User,
    Document,
    CodingReference,
    mapNotificationToMaintenanceTask,
    mapMaintenanceTaskToNotification,
    MaintenanceTaskFilter,
    NotificationTypeEnum,
    Notification,
    Topic,
    Message,
} from '@icure/typescript-common'
import { EHRLiteMessageFactory } from '../../src/services/EHRLiteMessageFactory'
import { HealthcareParty, Patient as PatientDto, Service, User as UserDto, DataOwnerWithType as DataOwnerWithTypeDto, Document as DocumentDto, HealthElement, CodeStub, MaintenanceTask, Topic as TopicDto, Message as MessageDto } from '@icure/api'
import { UserApi, Patient, PatientApi, Annotation, NotificationApi, DataOwnerApi } from '../../src'
import { TestMessageFactory } from '../test-utils'
import { mapPatientDtoToPatient, mapPatientToPatientDto } from '../../src/mappers/Patient.mapper'
import { mapConditionToHealthElementDto, mapHealthElementDtoToCondition } from '../../src/mappers/Condition.mapper'
import { mapObservationToServiceDto, mapServiceDtoToObservation } from '../../src/mappers/Observation.mapper'
import { mapHealthcarePartyDtoToPractitioner, mapPractitionerToHealthcarePartyDto } from '../../src/mappers/Practitioner.mapper'
import { mapHealthcarePartyDtoToOrganisation, mapOrganisationToHealthcarePartyDto } from '../../src/mappers/Organisation.mapper'
import dataOwnerMapper from '../../src/mappers/DataOwner.mapper'
import { TestVars } from '@icure/test-setup/types'
import { TopicApi } from '../../src/apis/TopicApi'
import { Binary } from '../../src/models/Binary.model'
import { mapBinaryToDocumentAttachment, mapDocumentAttachmentToBinary } from '../../src/mappers/Binary.mapper'

export class EhrLiteBaseTestContext extends BaseApiTestContext<AnonymousEHRLiteApi.Builder, AnonymousEHRLiteApi, EHRLiteApi, EHRLiteCryptoStrategies, User, EHRLiteMessageFactory> {
    newAnonymousApiBuilder(): AnonymousEHRLiteApi.Builder {
        return new AnonymousEHRLiteApi.Builder()
    }

    newApiBuilder(): EHRLiteApi.Builder {
        return new EHRLiteApi.Builder()
    }

    newSimpleCryptoStrategies(availableKeys: KeyPair[] | undefined): SimpleEHRLiteCryptoStrategies {
        return new SimpleEHRLiteCryptoStrategies(availableKeys)
    }

    toDSUser(userDto: UserDto): User {
        return mapUserDtoToUser(userDto)
    }

    toUserDto(dsUser: User): UserDto {
        return mapUserToUserDto(dsUser)
    }

    userApi(api: EHRLiteApi): UserApi {
        return api.userApi
    }

    newTestMessageFactory(): EHRLiteMessageFactory {
        return new TestMessageFactory()
    }

    hcpProcessId(env: TestVars): string {
        return 'practitioner' + env.testGroupId
    }

    patProcessId(env: TestVars): string {
        return env.patAuthProcessId
    }
}

type Constructor<T> = new (...args: any[]) => T

function annotation1(): Annotation {
    return new Annotation({
        markdown: mapOf({
            en: 'This should be encrypted',
            fr: 'Ceci devrait être crypté',
        }),
    })
}
function annotation2(): Annotation {
    return new Annotation({
        markdown: mapOf({
            en: 'This should be encrypted',
            fr: 'Ceci devrait être crypté',
        }),
    })
}

// Returns copy with added tags
function addDomainTypeTagIfMissing(tags: CodeStub[] | undefined, domainType: string): CodeStub[] {
    const found = extractDomainTypeTag(tags)
    if (tags && found) {
        expect(found.code).toEqual(domainType)
        return tags!
    } else return [...(tags ?? []), domainTypeTag(domainType)]
}

export function PatientApiAware<TBase extends Constructor<any>>(Base: TBase): TBase & Constructor<WithPatientApi<EHRLiteApi, Patient>> {
    return class PatientApiAwareImpl extends Base implements WithPatientApi<EHRLiteApi, Patient> {
        checkDefaultPatientDecrypted(patient: Patient): void {
            expect(patient.notes).toBeTruthy()
            expect(patient.notes).toHaveLength(2)
            expect(patient.notes[0].markdown).toEqual(annotation1().markdown)
            expect(patient.notes[1].markdown).toEqual(annotation2().markdown)
        }

        async checkPatientAccessibleAndDecrypted(api: EHRLiteApi, patient: Patient, checkDeepEquals: boolean): Promise<void> {
            const retrieved = await api.patientApi.get(patient.id)
            expect(retrieved.notes).toBeTruthy()
            expect(retrieved.notes.length).toBeGreaterThan(0)
            retrieved.notes.forEach((note) => {
                expect(note.markdown).toBeTruthy()
                expect(note.markdown.size).toBeGreaterThan(0)
            })
            if (checkDeepEquals) {
                expect(retrieved).toEqual(patient)
            }
        }

        async checkPatientInaccessible(api: EHRLiteApi, patient: Patient): Promise<void> {
            await expect(api.patientApi.get(patient.id)).rejects.toBeInstanceOf(Error)
        }

        createPatient(api: EHRLiteApi): Promise<Patient> {
            return api.patientApi.createOrModify(
                new Patient({
                    names: [
                        new HumanName({
                            given: ['Johnjoe'],
                            family: 'Doenatello',
                        }),
                    ],
                    firstName: 'Johnjoe',
                    lastName: 'Doenatello',
                    notes: [annotation1(), annotation2()],
                }),
            )
        }

        patientApi(api: EHRLiteApi): PatientApi {
            return api.patientApi
        }

        toDSPatient(patientDto: PatientDto): Patient {
            return mapPatientDtoToPatient(patientDto)
        }

        toPatientDto(dsPatient: Patient): PatientDto {
            return mapPatientToPatientDto(dsPatient)
        }
    }
}

export function ConditionApiAware<TBase extends Constructor<any>>(Base: TBase): TBase & Constructor<WithHelementApi<EHRLiteApi, Condition, Patient>> {
    return class ConditionApiA4wareImpl extends Base implements WithHelementApi<EHRLiteApi, Condition, Patient> {
        checkDefaultHelementDecrypted(helement: Condition): void {
            expect(helement.notes).toBeTruthy()
            expect(helement.notes).toHaveLength(1)
            expect(helement.notes[0].markdown).toEqual(annotation1().markdown)
        }

        async checkHelementAccessibleAndDecrypted(api: EHRLiteApi, helement: Condition, checkDeepEquals: boolean): Promise<void> {
            const retrieved = await api.conditionApi.get(helement.id)
            expect(retrieved.notes).toBeTruthy()
            expect(retrieved.notes.length).toBeGreaterThan(0)
            retrieved.notes.forEach((note) => {
                expect(note.markdown).toBeTruthy()
                expect(note.markdown.size).toBeGreaterThan(0)
            })
            if (checkDeepEquals) {
                expect(retrieved).toEqual(helement)
            }
        }

        async checkHelementInaccessible(api: EHRLiteApi, helement: Condition): Promise<void> {
            await expect(api.conditionApi.get(helement.id)).rejects.toBeInstanceOf(Error)
        }

        createHelementForPatient(api: EHRLiteApi, patient: Patient): Promise<Condition> {
            return api.conditionApi.createOrModify(
                new Condition({
                    notes: [annotation1()],
                }),
                patient.id,
            )
        }

        helementApi(api: EHRLiteApi): ConditionApi {
            return api.conditionApi
        }

        newHelementFilter(api: EHRLiteApi): ConditionFilter {
            return new ConditionFilter(api)
        }

        toDSHelement(helementDto: HealthElement): Condition {
            return mapHealthElementDtoToCondition({
                ...helementDto,
                tags: addDomainTypeTagIfMissing(helementDto.tags, 'condition'.toUpperCase()),
            })
        }

        toHelementDto(dsHelement: Condition): HealthElement {
            return mapConditionToHealthElementDto(dsHelement)
        }
    }
}

export function ObservationApiAware<TBase extends Constructor<any>>(Base: TBase): TBase & Constructor<WithServiceApi<EHRLiteApi, Observation, Patient, Document>> {
    return class ObservationApiAwareImpl extends Base implements WithServiceApi<EHRLiteApi, Observation, Patient, Document> {
        checkDefaultServiceDecrypted(service: Observation): void {
            expect(service.localContent).toEqual(mapOf({ en: new LocalComponent({ stringValue: 'Hello world' }) }))
        }

        async checkServiceAccessibleAndDecrypted(api: EHRLiteApi, service: Observation, checkDeepEquals: boolean): Promise<void> {
            const retrieved = await api.observationApi.get(service.id!)
            expect(retrieved).toBeTruthy()
            expect(Array.from(retrieved.localContent.entries()).length).toBeGreaterThan(0)
            if (checkDeepEquals) expect(retrieved).toEqual(service)
        }

        async checkServiceAccessibleButEncrypted(api: EHRLiteApi, service: Observation): Promise<void> {
            const retrieved = await api.observationApi.get(service.id!)
            expect(retrieved).toBeTruthy()
            expect(Array.from(retrieved.localContent.entries())).toHaveLength(0)
        }

        async checkServiceInaccessible(api: EHRLiteApi, service: Observation): Promise<void> {
            await expect(api.observationApi.get(service.id!)).rejects.toBeInstanceOf(Error)
        }

        createServiceForPatient(api: EHRLiteApi, patient: Patient): Promise<Observation> {
            return api.observationApi.createOrModifyFor(
                patient.id!,
                new Observation({
                    tags: new Set([new CodingReference({ id: 'testid', type: 'IC-TEST', code: 'TEST' })]),
                    localContent: mapOf({ en: new LocalComponent({ stringValue: 'Hello world' }) }),
                }),
            )
        }

        createServicesForPatient(api: EHRLiteApi, patient: Patient): Promise<Observation[]> {
            return api.observationApi.createOrModifyManyFor(patient.id!, [
                new Observation({
                    tags: new Set([new CodingReference({ id: 'testid2', type: 'IC-TEST', code: 'TEST' })]),
                    localContent: mapOf({ en: new LocalComponent({ stringValue: 'Hello world' }) }),
                }),
                new Observation({
                    tags: new Set([new CodingReference({ id: 'testid', type: 'IC-TEST', code: 'TEST' })]),
                    localContent: mapOf({ en: new LocalComponent({ stringValue: 'Good night world' }) }),
                }),
            ])
        }

        newServiceFilter(api: EHRLiteApi): ObservationFilter {
            return new ObservationFilter(api)
        }

        serviceApi(api: EHRLiteApi): ObservationApi {
            return api.observationApi
        }

        toDSService(serviceDto: Service): Observation {
            return mapServiceDtoToObservation({
                ...serviceDto,
                tags: addDomainTypeTagIfMissing(serviceDto.tags, 'observation'.toUpperCase()),
            })
        }

        toDocumentDto(dsDocument: Document): DocumentDto {
            return mapDocumentToDocumentDto(dsDocument)
        }

        toServiceDto(dsService: Observation): Service {
            return mapObservationToServiceDto(dsService)
        }
    }
}

export function NotificationApiAware<TBase extends Constructor<any>>(Base: TBase): TBase & Constructor<WithMaintenanceTaskApi<EHRLiteApi, Notification>> {
    return class NotificationApiAwareImpl extends Base implements WithMaintenanceTaskApi<EHRLiteApi, Notification> {
        mtApi(api: EHRLiteApi): NotificationApi {
            return api.notificationApi
        }

        toMtDto(dsMt: Notification): MaintenanceTask {
            return mapNotificationToMaintenanceTask(dsMt)
        }

        toDSMt(mtDto: MaintenanceTask): Notification {
            return mapMaintenanceTaskToNotification(mtDto)
        }

        newMtFilter(api: EHRLiteApi): MaintenanceTaskFilter {
            return new NotificationFilter(api)
        }

        async createMt(api: EHRLiteApi, delegate: string): Promise<Notification> {
            const notification = new Notification({
                type: NotificationTypeEnum.KeyPairUpdate,
            })
            const createdNotification = await api.notificationApi.createOrModify(notification, delegate)
            expect(createdNotification).toBeTruthy()
            return createdNotification!
        }
    }
}

export function PractitionerApiAware<TBase extends Constructor<any>>(Base: TBase): TBase & Constructor<WithHcpApi<EHRLiteApi, Practitioner>> {
    return class HealthcareProfessionalApiAwareImpl extends Base implements WithHcpApi<EHRLiteApi, Practitioner> {
        hcpApi(api: EHRLiteApi): PractitionerApi {
            return api.practitionerApi
        }

        toDSHcp(hcpDto: HealthcareParty): Practitioner {
            return mapHealthcarePartyDtoToPractitioner({
                ...hcpDto,
                tags: addDomainTypeTagIfMissing(hcpDto.tags, 'practitioner'.toUpperCase()),
            })
        }

        toHcpDto(dsHcp: Practitioner): HealthcareParty {
            return mapPractitionerToHealthcarePartyDto(dsHcp)
        }
    }
}

export function OrganisationApiAware<TBase extends Constructor<any>>(Base: TBase): TBase & Constructor<WithHcpApi<EHRLiteApi, Organisation>> {
    return class HealthcareProfessionalApiAwareImpl extends Base implements WithHcpApi<EHRLiteApi, Organisation> {
        hcpApi(api: EHRLiteApi): OrganisationApi {
            return api.organisationApi
        }

        toDSHcp(hcpDto: HealthcareParty): Organisation {
            return mapHealthcarePartyDtoToOrganisation({
                ...hcpDto,
                tags: addDomainTypeTagIfMissing(hcpDto.tags, 'organisation'.toUpperCase()),
            })
        }

        toHcpDto(dsHcp: Organisation): HealthcareParty {
            return mapOrganisationToHealthcarePartyDto(dsHcp)
        }
    }
}

export function AuthenticationApiAware<TBase extends Constructor<any>>(Base: TBase): TBase & Constructor<WithAuthenticationApi<EHRLiteApi>> {
    return class AuthenticationApiAwareImpl extends Base implements WithAuthenticationApi<EHRLiteApi> {
        authenticationApi(api: EHRLiteApi): AuthenticationApi {
            return api.authenticationApi
        }
    }
}

export function DataOwnerApiAware<TBase extends Constructor<any>>(Base: TBase): TBase & Constructor<WithDataOwnerApi<EHRLiteApi, DataOwnerWithType, User>> {
    return class DataOwnerApiAwareImpl extends Base implements WithDataOwnerApi<EHRLiteApi, DataOwnerWithType, User> {
        dataOwnerApi(api: EHRLiteApi): DataOwnerApi {
            return api.dataOwnerApi
        }

        toDSDataOwner(dataOwnerDto: DataOwnerWithTypeDto): DataOwnerWithType {
            return dataOwnerMapper.toDomain(dataOwnerDto)
        }

        toDataOwnerDto(dsDataOwner: DataOwnerWithType): DataOwnerWithTypeDto {
            return dataOwnerMapper.toDto(dsDataOwner)
        }
    }
}

export function TopicApiAware<TBase extends Constructor<any>>(Base: TBase): TBase & Constructor<WithTopicApi<EHRLiteApi, Topic, Practitioner, Patient, Observation, Condition>> {
    return class TopicApiAwareImpl extends Base implements WithTopicApi<EHRLiteApi, Topic, Practitioner, Patient, Observation, Condition> {
        topicApi(api: EHRLiteApi): TopicApi {
            return api.topicApi
        }

        toDSTopic(topicDto: TopicDto): Topic {
            return mapTopicDtoToTopic(topicDto)
        }

        toTopicDto(dsTopic: Topic): TopicDto {
            return mapTopicToTopicDto(dsTopic)
        }
    }
}

export function MessageApiAware<TBase extends Constructor<any>>(Base: TBase): TBase & Constructor<WithMessageApi<EHRLiteApi, Message, Topic, Binary>> {
    return class MessageApiAwareImpl extends Base implements WithMessageApi<EHRLiteApi, Message, Topic, Binary> {
        messageApi(api: EHRLiteApi): MessageLikeApi<Message, Topic, Binary> {
            return api.messageApi
        }

        toDSMessage(messageDto: MessageDto): Message {
            return mapMessageDtoToMessage(messageDto)
        }

        toMessageDto(dsMessage: Message): MessageDto {
            return mapMessageToMessageDto(dsMessage)
        }

        toBinaryDto(
            dsBinary: Binary,
            utiProvider: (mimeType: string, extension: string) => string,
        ): {
            data: ArrayBuffer
            filename: string
            uti: string
        } {
            return mapBinaryToDocumentAttachment(dsBinary, utiProvider)
        }

        toDSBinary(
            binaryDto: {
                data: ArrayBuffer
                filename: string
                uti: string
            },
            mimeTypeProvider: (uti: string) => string,
        ): Binary {
            return mapDocumentAttachmentToBinary(binaryDto, mimeTypeProvider)
        }
    }
}
