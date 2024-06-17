import { ConditionApiAware, EhrLiteBaseTestContext, ImmunizationApiAware, PatientApiAware } from './TestContexts'
import { testServiceLikeApi } from '../../../common-test/apis/service-like-api'

const ImmunizationApiTestContext = ImmunizationApiAware(ConditionApiAware(PatientApiAware(EhrLiteBaseTestContext)))

testServiceLikeApi('EhrLite Immunization', new ImmunizationApiTestContext())
