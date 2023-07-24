import { MedTechBaseTestContext, NotificationApiAware } from './TestContexts'
import { testMaintenanceTaskLikeApi } from '../../../common-test/apis/maintenance-task-like-api'

const NotificationApiTestContext = NotificationApiAware(MedTechBaseTestContext)

testMaintenanceTaskLikeApi('MedTech Notification', new NotificationApiTestContext())
