import {initializeMapper, mapper} from "../../src";
import {generateNotification} from "../models/Notification.model";
import {Notification} from "../../src";
import {MaintenanceTask as MaintenanceTaskDto} from "@icure/api";

describe('Notification', function () {
    beforeAll(() => {
        initializeMapper(mapper)
    })

    it('should correctly map to MaintenanceTaskDto and back to Notification', () => {
        const instance = generateNotification()
        const iCureInstance = mapper.map(instance, Notification, MaintenanceTaskDto)
        const newInstance = mapper.map(iCureInstance, MaintenanceTaskDto, Notification)

        expect(newInstance).toEqual(instance)
    })
})