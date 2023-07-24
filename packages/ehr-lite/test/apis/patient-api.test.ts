import {
  ConditionApiAware,
  EhrLiteBaseTestContext, PatientApiAware
} from "./TestContexts";
import {testPatientLikeApi} from "../../../common-test/apis/patient-like-api";

const PatientApiTestContext =
  PatientApiAware(ConditionApiAware(EhrLiteBaseTestContext))

testPatientLikeApi('EHRLite patient', new PatientApiTestContext())