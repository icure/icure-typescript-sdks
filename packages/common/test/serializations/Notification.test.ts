import {Notification} from '../../src'
import {generateNotification} from "../models/Notification.model";

describe(`Notification serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateNotification()

        const json = Notification.toJSON(instance)
        const newInstance = Notification.fromJSON(json)

        expect(newInstance).toEqual(instance)
    })
})
