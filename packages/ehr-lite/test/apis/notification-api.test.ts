import {
    EhrLiteBaseTestContext, NotificationApiAware
} from "./TestContexts";
import {testMaintenanceTaskLikeApi} from "../../../common-test/apis/maintenance-task-like-api";

const NotificationApiTestContext =
    NotificationApiAware(EhrLiteBaseTestContext)

testMaintenanceTaskLikeApi('Ehr Lite notification', new NotificationApiTestContext())
