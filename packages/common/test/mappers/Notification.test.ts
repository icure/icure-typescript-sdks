import {generateNotification} from "../models/Notification.model";
import {mapMaintenanceTaskToNotification, mapNotificationToMaintenanceTask, Notification} from "../../src";

describe('Notification', function () {
    it('should correctly map to MaintenanceTaskDto and back to Notification', () => {
        const instance = generateNotification()
        const iCureInstance = mapNotificationToMaintenanceTask(instance)
        const newInstance = mapMaintenanceTaskToNotification(iCureInstance)

        expect(newInstance).toEqual(instance)
    })
})