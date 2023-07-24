import { DataSampleApiAware, HealthcareProfessionalApiAware, HelementApiAware, MedTechBaseTestContext, NotificationApiAware, PatientApiAware } from './TestContexts'
import { testUserLikeApi } from '../../../common-test/apis/user-like-api'

const UserApiTestContext = HelementApiAware(DataSampleApiAware(PatientApiAware(HealthcareProfessionalApiAware(NotificationApiAware(MedTechBaseTestContext)))))

testUserLikeApi('MedTech User', new UserApiTestContext())
