import {
    DataSampleApiAware, HelementApiAware,
    MedTechBaseTestContext,
    PatientApiAware
} from "./TestContexts";
import {testServiceLikeApi} from "../../../common-test/apis/service-like-api";

const DataSampleApiTestContext =
    HelementApiAware(DataSampleApiAware(PatientApiAware(MedTechBaseTestContext)))

testServiceLikeApi(new DataSampleApiTestContext())
