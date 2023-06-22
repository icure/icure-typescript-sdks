import { MaintenanceTask } from "@icure/api";
import { mapTo } from "../utils/decorators";
import { Identifier } from "./Identifier.model";
import { Property } from "./Property.model";
import { SystemMetaDataEncrypted } from "./SystemMetaDataEncrypted.model";

@mapTo(MaintenanceTask)
export class Notification {
  constructor(json: INotification) {
    Object.assign(this as Notification, json as INotification)
  }

  /**
   * The Id of the notification. We encourage using either a v4 UUID or a HL7 Id.
   */
  'id'?: string;
  /**
   * The revision of the patient in the database, used for conflict management / optimistic locking.
   */
  'rev'?: string;
  /**
   * The status of the notification.
   */
  'status'?: NotificationStatusEnum;
  /**
   * The creation date of the notification (encoded as epoch).
   */
  'created'?: number;
  /**
   * Soft delete (unix epoch in ms) timestamp of the patient
   */
  'endOfLife'?: number;
  /**
   * the soft delete timestamp. When a patient is "deleted", this is set to a non-null value: the moment of the deletion
   */
  'deletionDate'?: number;
  /**
   * Typically used for business / client identifiers. An identifier should identify a notification uniquely and unambiguously. However, iCure can't guarantee the uniqueness of those identifiers : This is something you need to take care of.
   */
  'identifiers'?: Array<Identifier>;
  /**
   * the last modification date of the notification (encoded as epoch).
   */
  'modified'?: number;
  /**
   * The id of the [User] that created this notification. When creating the notification, this field will be filled automatically by the current user id if not provided.
   */
  'author'?: string;
  /**
   * The id of the data owner that is responsible for this notification. When creating the notification, will be filled automatically by the current user data owner id ([HealthcareProfessional], [Patient] or [MedicalDevice]) if missing
   */
  'responsible'?: string;
  /**
   * Additional properties for the notification.
   */
  'properties'?: Array<Property>;
  /**
   * The type of the notification.
   */
  'type'?: NotificationTypeEnum;
  'systemMetaData'?: SystemMetaDataEncrypted;

    static toJSON(instance: Notification): any {
        const pojo: any = {}
        pojo["id"] = instance.id
        pojo["rev"] = instance.rev
        pojo["status"] = instance.status
        pojo["created"] = instance.created
        pojo["endOfLife"] = instance.endOfLife
        pojo["deletionDate"] = instance.deletionDate
        pojo["identifiers"] = instance.identifiers?.map(item => Identifier.toJSON(item))
        pojo["modified"] = instance.modified
        pojo["author"] = instance.author
        pojo["responsible"] = instance.responsible
        pojo["properties"] = instance.properties?.map(item => Property.toJSON(item))
        pojo["type"] = instance.type
        pojo["systemMetaData"] = !!instance.systemMetaData ? SystemMetaDataEncrypted.toJSON(instance.systemMetaData) : undefined
        return pojo
    }

    static fromJSON(pojo: any): Notification {
        return new Notification({id: pojo["id"], rev: pojo["rev"], status: pojo["status"], created: pojo["created"], endOfLife: pojo["endOfLife"], deletionDate: pojo["deletionDate"], identifiers: pojo["identifiers"]?.map((item: any) => Identifier.fromJSON(item)), modified: pojo["modified"], author: pojo["author"], responsible: pojo["responsible"], properties: pojo["properties"]?.map((item: any) => Property.fromJSON(item)), type: pojo["type"], systemMetaData: !!pojo["systemMetaData"] ? SystemMetaDataEncrypted.fromJSON(pojo["systemMetaData"]) : undefined})
    }
}

export interface INotification {
  id?: string;
  rev?: string;
  status?: NotificationStatusEnum;
  identifiers?: Array<Identifier>;
  created?: number;
  modified?: number;
  endOfLife?: number;
  deletionDate?: number;
  author?: string;
  responsible?: string;
  properties?: Array<Property>;
  type?: NotificationTypeEnum;
  systemMetaData?: SystemMetaDataEncrypted;
}

export enum NotificationTypeEnum {
  KEY_PAIR_UPDATE = "KEY_PAIR_UPDATE",
  NEW_USER_OWN_DATA_ACCESS = "NEW_USER_OWN_DATA_ACCESS",
  OTHER = "OTHER"
}
export type NotificationStatusEnum = "pending" | "ongoing" | "cancelled" | "completed";
