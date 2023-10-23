import { MaintenanceTask } from '@icure/api'
import { mapTo } from '../utils/decorators'
import { forceUuid } from '../utils/uuidUtils'
import { Identifier } from './Identifier.model'
import { Property } from './Property.model'
import { SystemMetaDataEncrypted } from './SystemMetaDataEncrypted.model'

@mapTo(MaintenanceTask)
export class Notification {
    /**
     * The Id of the notification. We encourage using either a v4 UUID or a HL7 Id.
     */
    'id': string
    /**
     * The revision of the patient in the database, used for conflict management / optimistic locking.
     */
    'rev'?: string
    /**
     * The status of the notification.
     */
    'status'?: NotificationStatusEnum
    /**
     * The creation date of the notification (encoded as epoch).
     */
    'created'?: number
    /**
     * Soft delete (unix epoch in ms) timestamp of the patient
     */
    'endOfLife'?: number
    /**
     * the soft delete timestamp. When a patient is "deleted", this is set to a non-null value: the moment of the deletion
     */
    'deletionDate'?: number
    /**
     * Typically used for business / client identifiers. An identifier should identify a notification uniquely and unambiguously. However, iCure can't guarantee the uniqueness of those identifiers : This is something you need to take care of.
     */
    'identifiers': Array<Identifier>
    /**
     * the last modification date of the notification (encoded as epoch).
     */
    'modified'?: number
    /**
     * The id of the [User] that created this notification. When creating the notification, this field will be filled automatically by the current user id if not provided.
     */
    'author'?: string
    /**
     * The id of the data owner that is responsible for this notification. When creating the notification, will be filled automatically by the current user data owner id ([HealthcareProfessional], [Patient] or [MedicalDevice]) if missing
     */
    'responsible'?: string
    /**
     * Additional properties for the notification.
     */
    'properties': Set<Property>
    /**
     * The type of the notification.
     */
    'type'?: NotificationTypeEnum
    'systemMetaData'?: SystemMetaDataEncrypted

    constructor(notification: INotification) {
        this.id = forceUuid(notification.id)
        this.rev = notification.rev
        this.status = notification.status
        this.created = notification.created
        this.endOfLife = notification.endOfLife
        this.deletionDate = notification.deletionDate
        this.identifiers = notification.identifiers ?? []
        this.modified = notification.modified
        this.author = notification.author
        this.responsible = notification.responsible
        this.properties = notification.properties ?? new Set()
        this.type = notification.type
        this.systemMetaData = notification.systemMetaData
    }

    static toJSON(instance: Notification): any {
        const pojo: any = {}
        pojo['id'] = instance.id
        if (instance.rev !== undefined) pojo['rev'] = instance.rev
        if (instance.status !== undefined) pojo['status'] = instance.status
        if (instance.created !== undefined) pojo['created'] = instance.created
        if (instance.endOfLife !== undefined) pojo['endOfLife'] = instance.endOfLife
        if (instance.deletionDate !== undefined) pojo['deletionDate'] = instance.deletionDate
        pojo['identifiers'] = instance.identifiers.map((item) => Identifier.toJSON(item))
        if (instance.modified !== undefined) pojo['modified'] = instance.modified
        if (instance.author !== undefined) pojo['author'] = instance.author
        if (instance.responsible !== undefined) pojo['responsible'] = instance.responsible
        pojo['properties'] = Array.from([...instance.properties].map((item) => Property.toJSON(item)))
        if (instance.type !== undefined) pojo['type'] = instance.type
        if (instance.systemMetaData !== undefined) pojo['systemMetaData'] = !!instance.systemMetaData ? SystemMetaDataEncrypted.toJSON(instance.systemMetaData) : undefined
        return pojo
    }

    static fromJSON(pojo: any): Notification {
        const obj = {} as INotification
        obj['id'] = pojo['id']
        if (pojo['rev'] !== undefined) {
            obj['rev'] = pojo['rev']
        }
        if (pojo['status'] !== undefined) {
            obj['status'] = pojo['status']
        }
        if (pojo['created'] !== undefined) {
            obj['created'] = pojo['created']
        }
        if (pojo['endOfLife'] !== undefined) {
            obj['endOfLife'] = pojo['endOfLife']
        }
        if (pojo['deletionDate'] !== undefined) {
            obj['deletionDate'] = pojo['deletionDate']
        }
        obj['identifiers'] = pojo['identifiers'].map((item: any) => Identifier.fromJSON(item))
        if (pojo['modified'] !== undefined) {
            obj['modified'] = pojo['modified']
        }
        if (pojo['author'] !== undefined) {
            obj['author'] = pojo['author']
        }
        if (pojo['responsible'] !== undefined) {
            obj['responsible'] = pojo['responsible']
        }
        obj['properties'] = new Set(pojo['properties'].map((item: any) => Property.fromJSON(item)))
        if (pojo['type'] !== undefined) {
            obj['type'] = pojo['type']
        }
        if (pojo['systemMetaData'] !== undefined) {
            obj['systemMetaData'] = !!pojo['systemMetaData'] ? SystemMetaDataEncrypted.fromJSON(pojo['systemMetaData']) : undefined
        }
        return new Notification(obj)
    }
}

export interface INotification {
    id?: string
    rev?: string
    status?: NotificationStatusEnum
    identifiers?: Array<Identifier>
    created?: number
    modified?: number
    endOfLife?: number
    deletionDate?: number
    author?: string
    responsible?: string
    properties?: Set<Property>
    type?: NotificationTypeEnum
    systemMetaData?: SystemMetaDataEncrypted
}

export type NotificationTypeEnum = MaintenanceTask.TaskTypeEnum
export const NotificationTypeEnum = MaintenanceTask.TaskTypeEnum

export type NotificationStatusEnum = MaintenanceTask.StatusEnum
export const NotificationStatusEnum = MaintenanceTask.StatusEnum
