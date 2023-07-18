import {
  AuthenticationApiAware,
  DataOwnerApiAware,
  DataSampleApiAware, HealthcareProfessionalApiAware, HelementApiAware,
  MedTechBaseTestContext, NotificationApiAware,
  PatientApiAware
} from "./TestContexts";
import {testUserLikeApi} from "../../../common-test/apis/user-like-api";

const UserApiTestContext =
  HelementApiAware(AuthenticationApiAware(DataSampleApiAware(PatientApiAware(DataOwnerApiAware(HealthcareProfessionalApiAware(NotificationApiAware(MedTechBaseTestContext)))))))

testUserLikeApi(new UserApiTestContext())
