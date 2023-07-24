import {
  DataOwnerApiAware, EhrLiteBaseTestContext, PractitionerApiAware, PatientApiAware
} from "./TestContexts";
import {testHcpLikeApi} from "../../../common-test/apis/hcp-like-api";

const HcpApiTestContext =
  PatientApiAware(DataOwnerApiAware(PractitionerApiAware(EhrLiteBaseTestContext)))

testHcpLikeApi('EhrLite Practitioner', new HcpApiTestContext())
