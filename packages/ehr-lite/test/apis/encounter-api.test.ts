import { EncounterApiAware, EhrLiteBaseTestContext, PatientApiAware } from './TestContexts'
import { testContactLikeApi } from '../../../common-test/apis/contact-like-api'

const EncounterApiTestContext = EncounterApiAware(PatientApiAware(EhrLiteBaseTestContext))

testContactLikeApi('EhrLite encounter', new EncounterApiTestContext())
