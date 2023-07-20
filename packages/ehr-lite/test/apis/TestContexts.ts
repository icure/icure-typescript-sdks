import { BaseApiTestContext, WithHelementApi, WithPatientApi } from '../../../common-test/apis/TestContexts'
import { AnonymousEHRLiteApi, Condition, ConditionApi, ConditionFilter, EHRLiteApi, HumanName } from '../../src'
import { EHRLiteCryptoStrategies, SimpleEHRLiteCryptoStrategies } from '../../src/services/EHRLiteCryptoStrategies'
import {
    domainTypeTag,
    extractDomainTypeTag,
    KeyPair,
    mapOf,
    mapUserDtoToUser,
    mapUserToUserDto,
    User
} from '@icure/typescript-common'
import { EHRLiteMessageFactory } from '../../src/services/EHRLiteMessageFactory'
import {
    HealthcareParty,
    Patient as PatientDto,
    Service,
    User as UserDto,
    DataOwnerWithType as DataOwnerWithTypeDto,
    Document as DocumentDto,
    HealthElement,
    Device,
    CodeStub
} from '@icure/api'
import { UserApi, Patient, PatientApi, Annotation } from '../../src'
import { TestMessageFactory } from '../test-utils'
import { mapPatientDtoToPatient, mapPatientToPatientDto } from '../../src/mappers/Patient.mapper'
import { expectArrayContainsExactlyInAnyOrder } from '../../../common-test/assertions'
import { mapConditionToHealthElement, mapHealthElementToCondition } from '../../src/mappers/Condition.mapper'

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
function addDomainTypeTagIfMissing(
  tags: CodeStub[] | undefined,
  domainType: string
): CodeStub[] {
    const found = extractDomainTypeTag(tags)
    if (found) {
        expect(found.context).toEqual(domainType)
        return tags
    } else return [
      ...(tags ?? []),
      domainTypeTag(domainType)
    ]
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
                    notes: [annotation1(), annotation2()],
                })
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
                patient.id
            )
        }

        helementApi(api: EHRLiteApi): ConditionApi {
            return api.conditionApi
        }

        newHelementFilter(api: EHRLiteApi): ConditionFilter {
            return new ConditionFilter(api)
        }

        toDSHelement(helementDto: HealthElement): Condition {
            return mapHealthElementToCondition({
                ...helementDto,
                tags: addDomainTypeTagIfMissing(helementDto.tags, 'Condition')
            })
        }

        toHelementDto(dsHelement: Condition): HealthElement {
            return mapConditionToHealthElement(dsHelement)
        }
    }
}

// // Test contexts as mixins. See https://www.typescriptlang.org/docs/handbook/mixins.html
// import {EHRLiteCryptoStrategies, SimpleEHRLiteCryptoStrategies} from "../../src/services/EHRLiteCryptoStrategies";
// import {AuthenticationApi} from "../../src/apis/AuthenticationApi";
// import {
//     CodingReference,
//     KeyPair,
//     mapOf,
//     mapUserDtoToUser,
//     mapUserToUserDto,
//     User,
//     Notification,
//     mapNotificationToMaintenanceTask,
//     Document,
//     mapMaintenanceTaskToNotification,
//     ServiceFilter,
//     mapDocumentToDocumentDto, HealthElementFilter, MessageFactory, NotificationTypeEnum, MaintenanceTaskFilter
// } from "@icure/typescript-common";
// import {AnonymousEHRLiteApi} from "../../src/apis/AnonymousEHRLiteApi";
// import {EHRLiteApi} from "../../src/apis/EHRLiteApi";
// import {UserApi} from "../../src/apis/UserApi"
// import {Patient} from "../../src/models/Patient.model";
// import {HealthcareProfessional} from "../../src/models/HealthcareProfessional.model";
// import {DataOwnerWithType} from "../../src/models/DataOwner.model";
// import {HealthcareProfessionalApi} from "../../src/apis/HealthcareProfessionalApi";
// import {DataOwnerApi} from "../../src/apis/DataOwnerApi";
// import {PatientApi} from "../../src/apis/PatientApi";
// import {NotificationApi} from "../../src/apis/NotificationApi";
// import {
//     mapHealthcarePartyToHealthcareProfessional,
//     mapHealthcareProfessionalToHealthcareParty
// } from "../../src/mappers/HealthcareProfessional.mapper";
// import {mapPatientDtoToPatient, mapPatientToPatientDto} from "../../src/mappers/Patient.mapper";
// import {DataSample} from "../../src/models/DataSample.model";
// import {Content} from "../../src/models/Content.model";
// import {DataSampleApi} from "../../src/apis/DataSampleApi";
// import {MaintenanceTask} from "@icure/api/icc-api/model/MaintenanceTask";
// import {
//     BaseApiTestContext, WithAuthenticationApi, WithDataOwnerApi, WithDeviceApi, WithHcpApi, WithHelementApi,
//     WithMaintenanceTaskApi,
//     WithPatientApi,
//     WithServiceApi
// } from "../../../common-test/apis/TestContexts";
// import {mapDataSampleToService, mapServiceToDataSample} from "../../src/mappers/DataSample.mapper";
// import dataOwnerMapper from "../../src/mappers/DataOwner.mapper";
// import {HealthcareElement} from "../../src/models/HealthcareElement.model";
// import {HealthcareElementApi} from "../../src/apis/HealthcareElementApi";
// import {
//     mapHealthcareElementToHealthElement,
//     mapHealthElementToHealthcareElement
// } from "../../src/mappers/HealthcareElement.mapper";
// import {DataSampleFilter} from "../../src/filter/DataSampleFilterDsl";
// import {HealthcareElementFilter} from "../../src/filter/HealthcareElementFilterDsl";
// import {TestMessageFactory} from "../test-utils";
// import {EHRLiteMessageFactory} from "../../src/services/EHRLiteMessageFactory";
// import {NotificationFilter} from "@icure/ehr-lite-sdk";
// import {MedicalDeviceApi} from "../../src/apis/MedicalDeviceApi";
// import {MedicalDevice} from "../../src/models/MedicalDevice.model";
// import {mapDeviceToMedicalDevice, mapMedicalDeviceToDevice} from "../../src/mappers/MedicalDevice.mapper";
//
// export function PatientApiAware<TBase extends Constructor<any>>(Base: TBase): TBase & Constructor<WithPatientApi<EHRLiteApi, Patient>> {
//     return class PatientApiAwareImpl extends Base implements WithPatientApi<EHRLiteApi, Patient> {
//         patientApi(api: EHRLiteApi): PatientApi {
//             return api.patientApi
//         }
//
//         toDSPatient(patientDto: PatientDto): Patient {
//             return mapPatientDtoToPatient(patientDto)
//         }
//
//         toPatientDto(dsPatient: Patient): PatientDto {
//             return mapPatientToPatientDto(dsPatient)
//         }
//
//         createPatient(api: EHRLiteApi): Promise<Patient> {
//             return api.patientApi.createOrModify(
//                 new Patient({
//                     firstName: 'John',
//                     lastName: 'Snow',
//                     note: 'Winter is coming',
//                 })
//             )
//         }
//
//         checkDefaultPatientDecrypted(patient: Patient): void {
//             expect(patient.note).toEqual('Winter is coming')
//         }
//
//         async checkPatientAccessibleAndDecrypted(api: EHRLiteApi, patient: Patient, checkDeepEquals: boolean): Promise<void> {
//             const retrieved = await api.patientApi.get(patient.id!)
//             expect(retrieved).toBeTruthy()
//             expect(retrieved.note).toBeTruthy()
//             if (checkDeepEquals) expect(retrieved).toEqual(patient)
//         }
//
//         async checkPatientInaccessible(api: EHRLiteApi, patient: Patient): Promise<void> {
//             await expect(api.dataSampleApi.get(patient.id!)).rejects.toBeInstanceOf(Error)
//         }
//     }
// }
//
// export function DataSampleApiAware<TBase extends Constructor<any>>(Base: TBase): TBase & Constructor<WithServiceApi<EHRLiteApi, DataSample, Patient, Document>> {
//     return class DataSampleApiAwareImpl extends Base implements WithServiceApi<EHRLiteApi, DataSample, Patient, Document> {
//         serviceApi(api: EHRLiteApi): DataSampleApi {
//             return api.dataSampleApi
//         }
//
//         async checkServiceAccessibleAndDecrypted(api: EHRLiteApi, service: DataSample, checkDeepEquals: boolean): Promise<void> {
//             const retrieved = await api.dataSampleApi.get(service.id!)
//             expect(retrieved).toBeTruthy()
//             expect(Array.from(retrieved.content.entries()).length).toBeGreaterThan(0)
//             if (checkDeepEquals) expect(retrieved).toEqual(service)
//         }
//
//         async checkServiceAccessibleButEncrypted(api: EHRLiteApi, service: DataSample): Promise<void> {
//             const retrieved = await api.dataSampleApi.get(service.id!)
//             expect(retrieved).toBeTruthy()
//             expect(Array.from(retrieved.content.entries())).toHaveLength(0)
//         }
//
//         async checkServiceInaccessible(api: EHRLiteApi, service: DataSample): Promise<void> {
//             await expect(api.dataSampleApi.get(service.id!)).rejects.toBeInstanceOf(Error)
//         }
//
//         checkDefaultServiceDecrypted(service: DataSample): void {
//             expect(service.content).toEqual(mapOf({ en: new Content({ stringValue: 'Hello world' }) }))
//         }
//
//         createServiceForPatient(api: EHRLiteApi, patient: Patient): Promise<DataSample> {
//             return api.dataSampleApi.createOrModifyFor(
//                 patient.id!,
//                 new DataSample({
//                     labels: new Set([new CodingReference({ id: 'testid', type: 'IC-TEST', code: 'TEST' })]),
//                     content: mapOf({ en: new Content({ stringValue: 'Hello world' }) }),
//                 })
//             )
//         }
//
//         createServicesForPatient(api: EHRLiteApi, patient: Patient): Promise<DataSample[]> {
//             return api.dataSampleApi.createOrModifyManyFor(
//                 patient.id!,
//                 [
//                     new DataSample({
//                         labels: new Set([new CodingReference({ id: 'testid2', type: 'IC-TEST', code: 'TEST' })]),
//                         content: mapOf({ en: new Content({ stringValue: 'Hello world' }) }),
//                     }),
//                     new DataSample({
//                         labels: new Set([new CodingReference({ id: 'testid', type: 'IC-TEST', code: 'TEST' })]),
//                         content: mapOf({ en: new Content({ stringValue: 'Good night world' }) }),
//                     }),
//                 ]
//             )
//         }
//
//
//         toDSService(serviceDto: Service): DataSample {
//             return mapServiceToDataSample(serviceDto)
//         }
//
//         toServiceDto(dsService: DataSample): Service {
//             return mapDataSampleToService(dsService)
//         }
//
//         newServiceFilter(api: EHRLiteApi): DataSampleFilter {
//             return new DataSampleFilter(api)
//         }
//
//         toDocumentDto(dsDocument: Document): DocumentDto {
//             return mapDocumentToDocumentDto(dsDocument);
//         }
//     }
// }
//
// export function NotificationApiAware<TBase extends Constructor<any>>(Base: TBase): TBase & Constructor<WithMaintenanceTaskApi<EHRLiteApi, Notification>> {
//     return class NotificationApiAwareImpl extends Base implements WithMaintenanceTaskApi<EHRLiteApi, Notification> {
//         mtApi(api: EHRLiteApi): NotificationApi {
//             return api.notificationApi
//         }
//
//         toMtDto(dsMt: Notification): MaintenanceTask {
//             return mapNotificationToMaintenanceTask(dsMt)
//         }
//
//         toDSMt(mtDto: MaintenanceTask): Notification {
//             return mapMaintenanceTaskToNotification(mtDto)
//         }
//
//         newMtFilter(api: EHRLiteApi): MaintenanceTaskFilter {
//             return new NotificationFilter(api)
//         }
//
//         async createMt(api: EHRLiteApi, delegate: string): Promise<Notification> {
//             const notification = new Notification({
//                 type: NotificationTypeEnum.KEY_PAIR_UPDATE,
//             })
//             const createdNotification = await api.notificationApi.createOrModify(notification, delegate)
//             expect(createdNotification).toBeTruthy()
//             return createdNotification!
//         }
//     }
// }
//
// export function DataOwnerApiAware<TBase extends Constructor<any>>(Base: TBase): TBase & Constructor<WithDataOwnerApi<EHRLiteApi, DataOwnerWithType, User>> {
//     return class NotificationApiAwareImpl extends Base implements WithDataOwnerApi<EHRLiteApi, DataOwnerWithType, User> {
//         dataOwnerApi(api: EHRLiteApi): DataOwnerApi {
//             return api.dataOwnerApi
//         }
//
//         toDSDataOwner(dataOwnerDto: DataOwnerWithTypeDto): DataOwnerWithType {
//             return dataOwnerMapper.toDomain(dataOwnerDto)
//         }
//
//         toDataOwnerDto(dsDataOwner: DataOwnerWithType): DataOwnerWithTypeDto {
//             return dataOwnerMapper.toDto(dsDataOwner)
//         }
//     }
// }
//
// export function HealthcareProfessionalApiAware<TBase extends Constructor<any>>(Base: TBase): TBase & Constructor<WithHcpApi<EHRLiteApi, HealthcareProfessional>> {
//     return class HealthcareProfessionalApiAwareImpl extends Base implements WithHcpApi<EHRLiteApi, HealthcareProfessional> {
//         hcpApi(api: EHRLiteApi): HealthcareProfessionalApi {
//             return api.healthcareProfessionalApi
//         }
//
//         toDSHcp(hcpDto: HealthcareParty): HealthcareProfessional {
//             return mapHealthcarePartyToHealthcareProfessional(hcpDto)
//         }
//
//         toHcpDto(dsHcp: HealthcareProfessional): HealthcareParty {
//             return mapHealthcareProfessionalToHealthcareParty(dsHcp)
//         }
//     }
// }
//
// export function AuthenticationApiAware<TBase extends Constructor<any>>(Base: TBase): TBase & Constructor<WithAuthenticationApi<EHRLiteApi>> {
//     return class AuthenticationApiAwareImpl extends Base implements WithAuthenticationApi<EHRLiteApi> {
//         authenticationApi(api: EHRLiteApi): AuthenticationApi {
//             return api.authenticationApi
//         }
//     }
// }
//
// export function HelementApiAware<TBase extends Constructor<any>>(Base: TBase): TBase & Constructor<WithHelementApi<EHRLiteApi, HealthcareElement, Patient>> {
//     return class HelementApiAwareImpl extends Base implements WithHelementApi<EHRLiteApi, HealthcareElement, Patient> {
//         createHelementForPatient(api: EHRLiteApi, patient: Patient): Promise<HealthcareElement> {
//             return api.healthcareElementApi.createOrModify(
//                 new HealthcareElement({
//                     note: 'Hero Syndrome',
//                 }),
//                 patient!.id!
//             )
//         }
//
//         helementApi(api: EHRLiteApi): HealthcareElementApi {
//             return api.healthcareElementApi
//         }
//
//         toDSHelement(helementDto: HealthElement): HealthcareElement {
//             return mapHealthElementToHealthcareElement(helementDto)
//         }
//
//         toHelementDto(dsHelement: HealthcareElement): HealthElement {
//             return mapHealthcareElementToHealthElement(dsHelement)
//         }
//
//         async checkHelementAccessibleAndDecrypted(api: EHRLiteApi, helement: HealthcareElement, checkDeepEquals: boolean): Promise<void> {
//             const retrieved = await api.healthcareElementApi.get(helement.id!)
//             expect(retrieved).toBeTruthy()
//             expect(retrieved.note).toBeTruthy()
//             if (checkDeepEquals) expect(retrieved).toEqual(helement)
//         }
//
//         checkDefaultHelementDecrypted(helement: HealthcareElement): void {
//             expect(helement.note).toEqual('Hero Syndrome')
//         }
//
//         async checkHelementInaccessible(api: EHRLiteApi, helement: HealthcareElement): Promise<void> {
//             await expect(api.dataSampleApi.get(helement.id!)).rejects.toBeInstanceOf(Error)
//         }
//
//         newHelementFilter(api: EHRLiteApi): HealthcareElementFilter {
//             return new HealthcareElementFilter(api)
//         }
//     }
// }
//
// export function MedicalDeviceApiAware<TBase extends Constructor<any>>(Base: TBase): TBase & Constructor<WithDeviceApi<EHRLiteApi, MedicalDeviceApi>> {
//     return class MedicalDeviceApiAwareImpl extends Base implements WithDeviceApi<EHRLiteApi, MedicalDevice> {
//         deviceApi(api: EHRLiteApi): MedicalDeviceApi {
//             return api.medicalDeviceApi
//         }
//
//         toDSDevice(deviceDto: Device): MedicalDevice {
//             return mapDeviceToMedicalDevice(deviceDto)
//         }
//
//         toDeviceDto(dsDevice: MedicalDevice): Device {
//             return mapMedicalDeviceToDevice(dsDevice)
//         }
//     }
// }
