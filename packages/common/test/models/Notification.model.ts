import { Notification, NotificationStatusEnum, NotificationTypeEnum } from '../../src'
import { generateIdentifier } from './Identifier.model'
import { generateSystemMetaDataEncrypted } from './SystemMetaDataEncrypted.model'
import { generateProperty } from './Property.model'
import { v4 } from 'uuid'

export function generateNotification(): Notification {
    const id = v4()
    const rev = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    const status = ['pending', 'ongoing', 'cancelled', 'completed'][Math.floor(Math.random() * 4)] as NotificationStatusEnum
    const created = Date.now()
    const modified = Date.now()
    const endOfLife = undefined
    const deletionDate = undefined
    const author = 'testAuthor'
    const responsible = 'testResponsible'
    const identifiers = [generateIdentifier(), generateIdentifier()]
    const properties = ([generateProperty(), generateProperty(), generateProperty()])
    const type = ['KEY_PAIR_UPDATE', 'NEW_USER_OWN_DATA_ACCESS', 'OTHER'][Math.floor(Math.random() * 3)] as NotificationTypeEnum
    const systemMetaData = generateSystemMetaDataEncrypted()

    return new Notification({
        id,
        rev,
        status,
        created,
        endOfLife,
        deletionDate,
        identifiers,
        modified,
        author,
        responsible,
        properties,
        type,
        systemMetaData,
    })
}
