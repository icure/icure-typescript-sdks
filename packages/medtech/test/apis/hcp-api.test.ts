import {
  DataOwnerApiAware,
  HealthcareProfessionalApiAware,
  MedTechBaseTestContext, PatientApiAware
} from "./TestContexts";
import {testHcpLikeApi} from "../../../common-test/apis/hcp-like-api";

const HcpApiTestContext =
  PatientApiAware(DataOwnerApiAware(HealthcareProfessionalApiAware(MedTechBaseTestContext)))

testHcpLikeApi('MedTech HealthcareProfessional', new HcpApiTestContext())
