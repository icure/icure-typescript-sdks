import {
  ConditionApiAware,
  EhrLiteBaseTestContext,
  PatientApiAware
} from "./TestContexts";
import {testHelementLikeApi} from "../../../common-test/apis/helement-like-api";

const ConditionApiTestContext =
  ConditionApiAware(PatientApiAware(EhrLiteBaseTestContext))

testHelementLikeApi('EhrLite condition', new ConditionApiTestContext())
