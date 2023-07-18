import {
    HelementApiAware,
    MedTechBaseTestContext,
    PatientApiAware
} from "./TestContexts";
import {testHelementLikeApi} from "../../../common-test/apis/helement-like-api";

const HelementApiTestContext =
    HelementApiAware(PatientApiAware(MedTechBaseTestContext))

testHelementLikeApi(new HelementApiTestContext())
