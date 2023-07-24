import { AuthenticationApiAware, DataOwnerApiAware, DataSampleApiAware, HealthcareProfessionalApiAware, MedTechBaseTestContext, NotificationApiAware, PatientApiAware } from './TestContexts'
import { testAuthenticationApi } from '../../../common-test/apis/authentication-api'

const AuthenticationApiTestContext = AuthenticationApiAware(DataSampleApiAware(PatientApiAware(DataOwnerApiAware(HealthcareProfessionalApiAware(NotificationApiAware(MedTechBaseTestContext))))))

testAuthenticationApi('MedTech AuthenticationApi', new AuthenticationApiTestContext())
