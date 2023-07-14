import { testAuthenticationApi, AuthenticationApiTestContext } from '../../../common-test/apis/authentication-api.test'
import {MedTechCryptoStrategies, SimpleMedTechCryptoStrategies} from "../../src/services/MedTechCryptoStrategies";
import {AuthenticationApi} from "../../src/apis/AuthenticationApi";
import {
    CodingReference,
    forceUuid,
    KeyPair,
    mapOf,
    mapUserDtoToUser,
    mapUserToUserDto,
    User,
    Notification, mapNotificationToMaintenanceTask
} from "@icure/typescript-common";
import {AnonymousMedTechApi} from "../../src/apis/AnonymousMedTechApi";
import {MedTechApi} from "../../src/apis/MedTechApi";
import {HealthcareParty, Patient as PatientDto, User as UserDto} from '@icure/api'
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

class MedTechAuthenticationApiTestContext extends AuthenticationApiTestContext<
    AnonymousMedTechApi.Builder,
    AnonymousMedTechApi,
    MedTechApi,
    MedTechCryptoStrategies,
    User,
    HealthcareProfessional,
    Patient,
    DataOwnerWithType,
    DataSample,
    Notification
> {
    authenticationApi(api: MedTechApi): AuthenticationApi {
        return api.authenticationApi
    }

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

    hcpApi(api: MedTechApi): HealthcareProfessionalApi {
        return api.healthcareProfessionalApi
    }

    toDSHcp(hcpDto: HealthcareParty): HealthcareProfessional {
        return mapHealthcarePartyToHealthcareProfessional(hcpDto)
    }

    toHcpDto(dsHcp: HealthcareProfessional): HealthcareParty {
        return mapHealthcareProfessionalToHealthcareParty(dsHcp)
    }

    patientApi(api: MedTechApi): PatientApi {
        return api.patientApi
    }

    toDSPatient(patientDto: PatientDto): Patient {
        return mapPatientDtoToPatient(patientDto)
    }

    toPatientDto(dsPatient: Patient): PatientDto {
        return mapPatientToPatientDto(dsPatient)
    }

    dataOwnerApi(api: MedTechApi): DataOwnerApi {
        return api.dataOwnerApi
    }

    async checkServiceAccessible(api: MedTechApi, service: DataSample): Promise<void> {
        const retrieved = await api.dataSampleApi.get(service.id!)
        expect(retrieved).toBeTruthy()
        expect(Array.from(retrieved.content.entries()).length).toBeGreaterThan(0)
    }

    async checkServiceInaccessible(api: MedTechApi, service: DataSample): Promise<void> {
        const retrieved = await api.dataSampleApi.get(service.id!)
        expect(retrieved).toBeTruthy()
        expect(Array.from(retrieved.content.entries())).toHaveLength(0)
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

    mtApi(api: MedTechApi): NotificationApi {
        return api.notificationApi
    }

    serviceApi(api: MedTechApi): DataSampleApi {
        return api.dataSampleApi
    }

    toMtDto(dsMt: Notification): MaintenanceTask {
        return mapNotificationToMaintenanceTask(dsMt)
    }
}

testAuthenticationApi(new MedTechAuthenticationApiTestContext())
