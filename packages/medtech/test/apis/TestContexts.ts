// Test contexts as mixins. See https://www.typescriptlang.org/docs/handbook/mixins.html
import {MedTechCryptoStrategies, SimpleMedTechCryptoStrategies} from "../../src/services/MedTechCryptoStrategies";
import {AuthenticationApi} from "../../src/apis/AuthenticationApi";
import {
    CodingReference,
    KeyPair,
    mapOf,
    mapUserDtoToUser,
    mapUserToUserDto,
    User,
    Notification,
    mapNotificationToMaintenanceTask,
    Document,
    mapMaintenanceTaskToNotification,
    ServiceFilter,
    mapDocumentToDocumentDto, HealthElementFilter
} from "@icure/typescript-common";
import {AnonymousMedTechApi} from "../../src/apis/AnonymousMedTechApi";
import {MedTechApi} from "../../src/apis/MedTechApi";
import {
    HealthcareParty,
    Patient as PatientDto,
    Service,
    User as UserDto,
    DataOwnerWithType as DataOwnerWithTypeDto,
    Document as DocumentDto,
    HealthElement
} from '@icure/api'
import {UserApi} from "../../src/apis/UserApi"
import {Patient} from "../../src/models/Patient.model";
import {HealthcareProfessional} from "../../src/models/HealthcareProfessional.model";
import {DataOwnerWithType} from "../../src/models/DataOwner.model";
import {HealthcareProfessionalApi} from "../../src/apis/HealthcareProfessionalApi";
import {DataOwnerApi} from "../../src/apis/DataOwnerApi";
import {PatientApi} from "../../src/apis/PatientApi";
import {NotificationApi} from "../../src/apis/NotificationApi";
import {
    mapHealthcarePartyToHealthcareProfessional,
    mapHealthcareProfessionalToHealthcareParty
} from "../../src/mappers/HealthcareProfessional.mapper";
import {mapPatientDtoToPatient, mapPatientToPatientDto} from "../../src/mappers/Patient.mapper";
import {DataSample} from "../../src/models/DataSample.model";
import {Content} from "../../src/models/Content.model";
import {DataSampleApi} from "../../src/apis/DataSampleApi";
import {MaintenanceTask} from "@icure/api/icc-api/model/MaintenanceTask";
import {
    BaseApiTestContext, WithAuthenticationApi, WithDataOwnerApi, WithHcpApi, WithHelementApi,
    WithMaintenanceTaskApi,
    WithPatientApi,
    WithServiceApi
} from "../../../common-test/apis/TestContexts";
import {mapDataSampleToService, mapServiceToDataSample} from "../../src/mappers/DataSample.mapper";
import dataOwnerMapper from "../../src/mappers/DataOwner.mapper";
import {HealthcareElement} from "../../src/models/HealthcareElement.model";
import {HealthcareElementApi} from "../../src/apis/HealthcareElementApi";
import {
    mapHealthcareElementToHealthElement,
    mapHealthElementToHealthcareElement
} from "../../src/mappers/HealthcareElement.mapper";
import {DataSampleFilter} from "../../src/filter/DataSampleFilterDsl";
import {HealthcareElementFilter} from "../../src/filter/HealthcareElementFilterDsl";

export class MedTechBaseTestContext extends BaseApiTestContext<
    AnonymousMedTechApi.Builder,
    AnonymousMedTechApi,
    MedTechApi,
    MedTechCryptoStrategies,
    User
> {
    newAnonymousApiBuilder(): AnonymousMedTechApi.Builder {
        return new AnonymousMedTechApi.Builder()
    }

    newApiBuilder(): MedTechApi.Builder {
        return new MedTechApi.Builder()
    }

    newSimpleCryptoStrategies(availableKeys: KeyPair[] | undefined): SimpleMedTechCryptoStrategies {
        return new SimpleMedTechCryptoStrategies(availableKeys)
    }

    toDSUser(userDto: UserDto): User {
        return mapUserDtoToUser(userDto)
    }

    toUserDto(dsUser: User): UserDto {
        return mapUserToUserDto(dsUser)
    }

    userApi(api: MedTechApi): UserApi {
        return api.userApi
    }
}

type Constructor<T> = new (...args: any[]) => T;
export function PatientApiAware<TBase extends Constructor<any>>(Base: TBase): TBase & Constructor<WithPatientApi<MedTechApi, Patient>> {
    return class PatientApiAwareImpl extends Base implements WithPatientApi<MedTechApi, Patient> {
        patientApi(api: MedTechApi): PatientApi {
            return api.patientApi
        }

        toDSPatient(patientDto: PatientDto): Patient {
            return mapPatientDtoToPatient(patientDto)
        }

        toPatientDto(dsPatient: Patient): PatientDto {
            return mapPatientToPatientDto(dsPatient)
        }

        createPatient(api: MedTechApi): Promise<Patient> {
            return api.patientApi.createOrModify(
                new Patient({
                    firstName: 'John',
                    lastName: 'Snow',
                    note: 'Winter is coming',
                })
            )
        }
    }
}

export function DataSampleApiAware<TBase extends Constructor<any>>(Base: TBase): TBase & Constructor<WithServiceApi<MedTechApi, DataSample, Patient, Document>> {
    return class DataSampleApiAwareImpl extends Base implements WithServiceApi<MedTechApi, DataSample, Patient, Document> {
        serviceApi(api: MedTechApi): DataSampleApi {
            return api.dataSampleApi
        }

        async checkServiceAccessibleAndDecrypted(api: MedTechApi, service: DataSample, checkDeepEquals: boolean): Promise<void> {
            const retrieved = await api.dataSampleApi.get(service.id!)
            expect(retrieved).toBeTruthy()
            expect(Array.from(retrieved.content.entries()).length).toBeGreaterThan(0)
            if (checkDeepEquals) expect(retrieved).toEqual(service)
        }

        async checkServiceAccessibleButEncrypted(api: MedTechApi, service: DataSample): Promise<void> {
            const retrieved = await api.dataSampleApi.get(service.id!)
            expect(retrieved).toBeTruthy()
            expect(Array.from(retrieved.content.entries())).toHaveLength(0)
        }

        async checkServiceInaccessible(api: MedTechApi, service: DataSample): Promise<void> {
            await expect(api.dataSampleApi.get(service.id!)).rejects.toBeInstanceOf(Error)
        }

        checkDefaultServiceDecrypted(service: DataSample): void {
            expect(service.content).toEqual(mapOf({ en: new Content({ stringValue: 'Hello world' }) }))
        }

        createServiceForPatient(api: MedTechApi, patient: Patient): Promise<DataSample> {
            return api.dataSampleApi.createOrModifyFor(
                patient.id!,
                new DataSample({
                    labels: new Set([new CodingReference({ id: 'testid', type: 'IC-TEST', code: 'TEST' })]),
                    content: mapOf({ en: new Content({ stringValue: 'Hello world' }) }),
                })
            )
        }

        createServicesForPatient(api: MedTechApi, patient: Patient): Promise<DataSample[]> {
            return api.dataSampleApi.createOrModifyManyFor(
                patient.id!,
                [
                    new DataSample({
                        labels: new Set([new CodingReference({ id: 'testid2', type: 'IC-TEST', code: 'TEST' })]),
                        content: mapOf({ en: new Content({ stringValue: 'Hello world' }) }),
                    }),
                    new DataSample({
                        labels: new Set([new CodingReference({ id: 'testid', type: 'IC-TEST', code: 'TEST' })]),
                        content: mapOf({ en: new Content({ stringValue: 'Good night world' }) }),
                    }),
                ]
            )
        }


        toDSService(serviceDto: Service): DataSample {
            return mapServiceToDataSample(serviceDto)
        }

        toServiceDto(dsService: DataSample): Service {
            return mapDataSampleToService(dsService)
        }

        newServiceFilter(api: MedTechApi): ServiceFilter {
            return new DataSampleFilter(api)
        }

        toDocumentDto(dsDocument: Document): DocumentDto {
            return mapDocumentToDocumentDto(dsDocument);
        }
    }
}

export function NotificationApiAware<TBase extends Constructor<any>>(Base: TBase): TBase & Constructor<WithMaintenanceTaskApi<MedTechApi, Notification>> {
    return class NotificationApiAwareImpl extends Base implements WithMaintenanceTaskApi<MedTechApi, Notification> {
        mtApi(api: MedTechApi): NotificationApi {
            return api.notificationApi
        }

        toMtDto(dsMt: Notification): MaintenanceTask {
            return mapNotificationToMaintenanceTask(dsMt)
        }

        toDSMt(mtDto: MaintenanceTask): Notification {
            return mapMaintenanceTaskToNotification(mtDto)
        }
    }
}

export function DataOwnerApiAware<TBase extends Constructor<any>>(Base: TBase): TBase & Constructor<WithDataOwnerApi<MedTechApi, DataOwnerWithType, User>> {
    return class NotificationApiAwareImpl extends Base implements WithDataOwnerApi<MedTechApi, DataOwnerWithType, User> {
        dataOwnerApi(api: MedTechApi): DataOwnerApi {
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

export function HealthcareProfessionalApiAware<TBase extends Constructor<any>>(Base: TBase): TBase & Constructor<WithHcpApi<MedTechApi, HealthcareProfessional>> {
    return class HealthcareProfessionalApiAwareImpl extends Base implements WithHcpApi<MedTechApi, HealthcareProfessional> {
        hcpApi(api: MedTechApi): HealthcareProfessionalApi {
            return api.healthcareProfessionalApi
        }

        toDSHcp(hcpDto: HealthcareParty): HealthcareProfessional {
            return mapHealthcarePartyToHealthcareProfessional(hcpDto)
        }

        toHcpDto(dsHcp: HealthcareProfessional): HealthcareParty {
            return mapHealthcareProfessionalToHealthcareParty(dsHcp)
        }
    }
}

export function AuthenticationApiAware<TBase extends Constructor<any>>(Base: TBase): TBase & Constructor<WithAuthenticationApi<MedTechApi>> {
    return class AuthenticationApiAwareImpl extends Base implements WithAuthenticationApi<MedTechApi> {
        authenticationApi(api: MedTechApi): AuthenticationApi {
            return api.authenticationApi
        }
    }
}

export function HelementApiAware<TBase extends Constructor<any>>(Base: TBase): TBase & Constructor<WithHelementApi<MedTechApi, HealthcareElement, Patient>> {
    return class HelementApiAwareImpl extends Base implements WithHelementApi<MedTechApi, HealthcareElement, Patient> {
        createHelementForPatient(api: MedTechApi, patient: Patient): Promise<HealthcareElement> {
            return api.healthcareElementApi.createOrModify(
                new HealthcareElement({
                    note: 'Hero Syndrome',
                }),
                patient!.id!
            )
        }

        helementApi(api: MedTechApi): HealthcareElementApi {
            return api.healthcareElementApi
        }

        toDSHelement(helementDto: HealthElement): HealthcareElement {
            return mapHealthElementToHealthcareElement(helementDto)
        }

        toHelementDto(dsHelement: HealthcareElement): HealthElement {
            return mapHealthcareElementToHealthElement(dsHelement)
        }

        async checkHelementAccessibleAndDecrypted(api: MedTechApi, helement: HealthcareElement, checkDeepEquals: boolean): Promise<void> {
            const retrieved = await api.healthcareElementApi.get(helement.id!)
            expect(retrieved).toBeTruthy()
            expect(retrieved.note).toBeTruthy()
            if (checkDeepEquals) expect(retrieved).toEqual(helement)
        }

        checkDefaultHelementDecrypted(helement: HealthcareElement): void {
            expect(helement.note).toEqual('Hero Syndrome')
        }

        async checkHelementInaccessible(api: MedTechApi, helement: HealthcareElement): Promise<void> {
            await expect(api.dataSampleApi.get(helement.id!)).rejects.toBeInstanceOf(Error)
        }

        newHelementFilter(api: MedTechApi): HealthElementFilter {
            return new HealthcareElementFilter(api)
        }
    }
}
