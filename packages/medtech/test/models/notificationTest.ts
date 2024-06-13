import 'mocha'
import { Notification } from '../..'
import { v4 as uuid } from 'uuid'
import { MaintenanceTask } from '@icure/api/icc-api/model/MaintenanceTask'
import { Delegation } from '../..'
import { Property } from '../..'
import { SystemMetaDataEncrypted } from '../..'
import { assert } from 'chai'
import { newIdentifier } from './identifierTest'
import { recordOf, NotificationTypeEnum } from '@icure/typescript-common'

export function newNotification(): Notification {
    return new Notification({
        id: uuid(),
        status: MaintenanceTask.StatusEnum.Pending,
        identifiers: [newIdentifier()],
        created: new Date().getTime(),
        modified: new Date().getTime(),
        deletionDate: new Date().getTime(),
        endOfLife: new Date().getTime(),
        author: uuid(),
        responsible: uuid(),
        properties: ([new Property({ id: uuid() })]),
        type: NotificationTypeEnum.Other,
        systemMetaData: new SystemMetaDataEncrypted({
            delegations: recordOf({ TEST_ID: ([new Delegation({ owner: uuid(), delegatedTo: uuid() })]) }),
            encryptionKeys: recordOf({ TEST_ID: ([new Delegation({ owner: uuid(), delegatedTo: uuid() })]) }),
        }),
    })
}

describe('Notification model test', () => {
    it('Instantiation of Notification model - Success', () => {
        const notification = newNotification()
        assert(notification)
    })

    it('All the fields can be null', () => {
        const newNotification = new Notification({})
        assert(newNotification)
    })
})
