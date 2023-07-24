import { HelementApiAware, MedTechBaseTestContext, PatientApiAware } from './TestContexts'
import { testPatientLikeApi } from '../../../common-test/apis/patient-like-api'

const PatientApiTestContext = PatientApiAware(HelementApiAware(MedTechBaseTestContext))

testPatientLikeApi('MedTech Patient', new PatientApiTestContext())
