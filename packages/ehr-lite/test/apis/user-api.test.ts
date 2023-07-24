import {
  ObservationApiAware,
  ConditionApiAware,
  EhrLiteBaseTestContext,
  NotificationApiAware,
  PatientApiAware
} from "./TestContexts";
import {testUserLikeApi} from "../../../common-test/apis/user-like-api";

const UserApiTestContext =
  ConditionApiAware(PatientApiAware(NotificationApiAware(ObservationApiAware(EhrLiteBaseTestContext))))

testUserLikeApi('Ehr lite user', new UserApiTestContext())
