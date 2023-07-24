import { AuthenticationApiAware, DataOwnerApiAware, PractitionerApiAware, ObservationApiAware, EhrLiteBaseTestContext, NotificationApiAware, PatientApiAware } from './TestContexts'
import { testAuthenticationApi } from '../../../common-test/apis/authentication-api'

const AuthenticationApiTestContext = AuthenticationApiAware(ObservationApiAware(PatientApiAware(DataOwnerApiAware(PractitionerApiAware(NotificationApiAware(EhrLiteBaseTestContext))))))

testAuthenticationApi('EhrLite AuthenticationApi', new AuthenticationApiTestContext())
