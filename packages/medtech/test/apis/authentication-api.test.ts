import { testAuthenticationApi } from '../../../common-test/apis/authentication-api.test'
import {
    AuthenticationApiAware,
    DataOwnerApiAware,
    DataSampleApiAware, HealthcareProfessionalApiAware,
    MedTechBaseTestContext, NotificationApiAware,
    PatientApiAware
} from "./TestContexts";

const AuthenticationApiTestContext =
    AuthenticationApiAware(DataSampleApiAware(PatientApiAware(DataOwnerApiAware(HealthcareProfessionalApiAware(NotificationApiAware(MedTechBaseTestContext))))))

testAuthenticationApi(new AuthenticationApiTestContext())
