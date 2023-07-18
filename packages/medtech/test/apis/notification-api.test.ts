import {
    AuthenticationApiAware,
    DataOwnerApiAware,
    DataSampleApiAware, HealthcareProfessionalApiAware,
    MedTechBaseTestContext, NotificationApiAware,
    PatientApiAware
} from "./TestContexts";
import {testMaintenanceTaskLikeApi} from "../../../common-test/apis/maintenance-task-like-api";

const NotificationApiTestContext =
    AuthenticationApiAware(DataSampleApiAware(PatientApiAware(DataOwnerApiAware(HealthcareProfessionalApiAware(NotificationApiAware(MedTechBaseTestContext))))))

testMaintenanceTaskLikeApi(new NotificationApiTestContext())
