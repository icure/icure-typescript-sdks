import { DataOwnerApiAware, EhrLiteBaseTestContext, OrganisationApiAware, PatientApiAware } from './TestContexts'
import { testHcpLikeApi } from '../../../common-test/apis/hcp-like-api'

const HcpApiTestContext = PatientApiAware(DataOwnerApiAware(OrganisationApiAware(EhrLiteBaseTestContext)))

testHcpLikeApi('EhrLite Organisation', new HcpApiTestContext())
