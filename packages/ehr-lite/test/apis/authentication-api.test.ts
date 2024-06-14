import { AuthenticationApiAware, DataOwnerApiAware, EhrLiteBaseTestContext, NotificationApiAware, ObservationApiAware, PatientApiAware, PractitionerApiAware } from './TestContexts'
import { testAuthenticationApi } from '../../../common-test/apis/authentication-api'

const AuthenticationApiTestContext = AuthenticationApiAware(ObservationApiAware(PatientApiAware(DataOwnerApiAware(PractitionerApiAware(NotificationApiAware(EhrLiteBaseTestContext))))))

testAuthenticationApi('EhrLite AuthenticationApi', new AuthenticationApiTestContext())
