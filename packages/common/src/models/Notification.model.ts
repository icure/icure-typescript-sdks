import { MaintenanceTask } from '@icure/api'
import { EntityId } from '../types'
import { mapTo } from '../utils/decorators'
import { forceUuid } from "../utils/uuidUtils"
import { Identifier, IIdentifier } from './Identifier.model'
import { IProperty, Property } from './Property.model'
import { ISystemMetaDataEncrypted, SystemMetaDataEncrypted } from './SystemMetaDataEncrypted.model'

@mapTo(MaintenanceTask)
export class Notification {
    /**
     * The Id of the notification. We encourage using either a v4 UUID
     */
    id: EntityId
    /**
     * The revision of the patient in the database, used for conflict management / optimistic locking.
     */
    rev?: string
    /**
     * The status of the notification.
     */
    status?: NotificationStatusEnum
    /**
     * The creation date of the notification (encoded as epoch).
     */
    created?: number
    /**
     * Soft delete (unix epoch in ms) timestamp of the patient
     */
    endOfLife?: number
    /**
     * the soft delete timestamp. When a patient is "deleted", this is set to a non-null value: the moment of the deletion
     */
    deletionDate?: number
    /**
     * Typically used for business / client identifiers. An identifier should identify a notification uniquely and unambiguously. However, iCure cant guarantee the uniqueness of those identifiers : This is something you need to take care of.
     */
    identifiers: Identifier[] = []
    /**
     * the last modification date of the notification (encoded as epoch).
     */
    modified?: number
    /**
     * The id of the [User] that created this notification. When creating the notification, this field will be filled automatically by the current user id if not provided.
     */
    author?: string
    /**
     * The id of the data owner that is responsible for this notification. When creating the notification, will be filled automatically by the current user data owner id ([HealthcareProfessional], [Patient] or [MedicalDevice]) if missing
     */
    responsible?: string
    /**
     * Additional properties for the notification.
     */
    properties: Property[] = []
    /**
     * The type of the notification.
     */
    type?: NotificationTypeEnum
    systemMetaData?: SystemMetaDataEncrypted

    toJSON(): INotification {
        return {
        id: this.id,
        rev: this.rev,
        status: this.status,
        created: this.created,
        endOfLife: this.endOfLife,
        deletionDate: this.deletionDate,
        identifiers: this.identifiers.map(item => item.toJSON()),
        modified: this.modified,
        author: this.author,
        responsible: this.responsible,
        properties: this.properties.map(item => item.toJSON()),
        type: this.type,
        systemMetaData: !!this.systemMetaData ? this.systemMetaData.toJSON() : undefined,
        }
    }

    constructor(json: Partial<INotification> ) {
        this.id = forceUuid(json["id"]!)
        if (json["rev"] !== undefined) {
            this.rev = json["rev"]!
        }
        if (json["status"] !== undefined) {
            this.status = json["status"]!
        }
        if (json["created"] !== undefined) {
            this.created = json["created"]!
        }
        if (json["endOfLife"] !== undefined) {
            this.endOfLife = json["endOfLife"]!
        }
        if (json["deletionDate"] !== undefined) {
            this.deletionDate = json["deletionDate"]!
        }
        if (json["identifiers"] !== undefined) {
            this.identifiers = json["identifiers"]!.map((item: any) => new Identifier(item))
        }
        if (json["modified"] !== undefined) {
            this.modified = json["modified"]!
        }
        if (json["author"] !== undefined) {
            this.author = json["author"]!
        }
        if (json["responsible"] !== undefined) {
            this.responsible = json["responsible"]!
        }
        if (json["properties"] !== undefined) {
            this.properties = json["properties"]!.map((item: any) => new Property(item))
        }
        if (json["type"] !== undefined) {
            this.type = json["type"]!
        }
        if (json["systemMetaData"] !== undefined) {
            this.systemMetaData = new SystemMetaDataEncrypted(json["systemMetaData"]!)
        }
    }
}

export interface INotification {
    id: EntityId
    rev?: string
    status?: NotificationStatusEnum
    identifiers: IIdentifier[]
    created?: number
    modified?: number
    endOfLife?: number
    deletionDate?: number
    author?: string
    responsible?: string
    properties: IProperty[]
    type?: NotificationTypeEnum
    systemMetaData?: ISystemMetaDataEncrypted
}

export type NotificationTypeEnum = MaintenanceTask.TaskTypeEnum
export const NotificationTypeEnum = MaintenanceTask.TaskTypeEnum

export type NotificationStatusEnum = MaintenanceTask.StatusEnum
export const NotificationStatusEnum = MaintenanceTask.StatusEnum
