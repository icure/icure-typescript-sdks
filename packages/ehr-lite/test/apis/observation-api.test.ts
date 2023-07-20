import {
  ObservationApiAware,
  ConditionApiAware,
  EhrLiteBaseTestContext,
  PatientApiAware
} from "./TestContexts";
import {testServiceLikeApi} from "../../../common-test/apis/service-like-api";

const ObservationApiTestContext =
  ObservationApiAware(ConditionApiAware(PatientApiAware(EhrLiteBaseTestContext)))

testServiceLikeApi('EhrLite Observation', new ObservationApiTestContext())
