import { Notification, NotificationStatusEnum, NotificationTypeEnum } from '../models/Notification.model'
import { CodeStub, Identifier as IdentifierDto, MaintenanceTask, PropertyStub } from '@icure/api'
import { Property } from '../models/Property.model'
import { Delegation as DelegationDto } from '@icure/api/icc-api/model/Delegation'
import { Identifier } from '../models/Identifier.model'
import { SystemMetaDataEncrypted } from '../models/SystemMetaDataEncrypted.model'
import { mapIdentifierDtoToIdentifier, mapIdentifierToIdentifierDto } from './Identifier.mapper'
import { mapPropertyStubToProperty, mapPropertyToPropertyStub } from './Property.mapper'
import { toCryptedForeignKeys, toDelegations, toEncryptedSelf, toEncryptionKeys, toSecretForeignKeys, toSystemMetaDataEncrypted } from './SystemMetaData.mapper'

function toMaintenanceTaskId(domain: Notification): string | undefined {
    return domain.id
}

function toMaintenanceTaskRev(domain: Notification): string | undefined {
    return domain.rev
}

function toMaintenanceTaskIdentifier(domain: Notification): IdentifierDto[] | undefined {
    return !!domain.identifiers ? domain.identifiers.map(mapIdentifierToIdentifierDto) : undefined
}

function toMaintenanceTaskCreated(domain: Notification): number | undefined {
    return domain.created
}

function toMaintenanceTaskModified(domain: Notification): number | undefined {
    return domain.modified
}

function toMaintenanceTaskAuthor(domain: Notification): string | undefined {
    return domain.author
}

function toMaintenanceTaskResponsible(domain: Notification): string | undefined {
    return domain.responsible
}

function toMaintenanceTaskMedicalLocationId(domain: Notification): string | undefined {
    return undefined
}

function toMaintenanceTaskTags(domain: Notification): CodeStub[] | undefined {
    return undefined
}

function toMaintenanceTaskCodes(domain: Notification): CodeStub[] | undefined {
    return undefined
}

function toMaintenanceTaskEndOfLife(domain: Notification): number | undefined {
    return domain.endOfLife
}

function toMaintenanceTaskDeletionDate(domain: Notification): number | undefined {
    return domain.deletionDate
}

function toMaintenanceTaskTaskType(domain: Notification): MaintenanceTask.TaskTypeEnum | undefined {
    return domain.type
}

function toMaintenanceTaskProperties(domain: Notification): PropertyStub[] | undefined {
    return !!domain.properties ? domain.properties.map(mapPropertyToPropertyStub) : undefined
}

function toMaintenanceTaskStatus(domain: Notification): MaintenanceTask.StatusEnum | undefined {
    return domain.status
}

function toMaintenanceTaskSecretForeignKeys(domain: Notification): string[] | undefined {
    return !!domain.systemMetaData ? toSecretForeignKeys(domain.systemMetaData) : undefined
}

function toMaintenanceTaskCryptedForeignKeys(domain: Notification):
    | {
          [key: string]: DelegationDto[]
      }
    | undefined {
    return !!domain.systemMetaData ? toCryptedForeignKeys(domain.systemMetaData) : undefined
}

function toMaintenanceTaskDelegations(domain: Notification):
    | {
          [key: string]: DelegationDto[]
      }
    | undefined {
    return !!domain.systemMetaData ? toDelegations(domain.systemMetaData) : undefined
}

function toMaintenanceTaskEncryptionKeys(domain: Notification):
    | {
          [key: string]: DelegationDto[]
      }
    | undefined {
    return !!domain.systemMetaData ? toEncryptionKeys(domain.systemMetaData) : undefined
}

function toMaintenanceTaskEncryptedSelf(domain: Notification): string | undefined {
    return !!domain.systemMetaData ? toEncryptedSelf(domain.systemMetaData) : undefined
}

function toNotificationId(dto: MaintenanceTask): string | undefined {
    return dto.id
}

function toNotificationRev(dto: MaintenanceTask): string | undefined {
    return dto.rev
}

function toNotificationStatus(dto: MaintenanceTask): NotificationStatusEnum | undefined {
    return dto.status
}

function toNotificationCreated(dto: MaintenanceTask): number | undefined {
    return dto.created
}

function toNotificationEndOfLife(dto: MaintenanceTask): number | undefined {
    return dto.endOfLife
}

function toNotificationDeletionDate(dto: MaintenanceTask): number | undefined {
    return dto.deletionDate
}

function toNotificationIdentifiers(dto: MaintenanceTask): Identifier[] | undefined {
    return !!dto.identifier ? dto.identifier.map(mapIdentifierDtoToIdentifier) : undefined
}

function toNotificationModified(dto: MaintenanceTask): number | undefined {
    return dto.modified
}

function toNotificationAuthor(dto: MaintenanceTask): string | undefined {
    return dto.author
}

function toNotificationResponsible(dto: MaintenanceTask): string | undefined {
    return dto.responsible
}

function toNotificationProperties(dto: MaintenanceTask): Property[] | undefined {
    return !!dto.properties ? dto.properties.map(mapPropertyStubToProperty) : undefined
}

function toNotificationType(dto: MaintenanceTask): NotificationTypeEnum | undefined {
    return !!dto.taskType && Object.values(NotificationTypeEnum).includes(dto.taskType as unknown as NotificationTypeEnum) ? NotificationTypeEnum[dto.taskType as keyof typeof NotificationTypeEnum] : NotificationTypeEnum.OTHER
}

function toNotificationSystemMetaData(dto: MaintenanceTask): SystemMetaDataEncrypted | undefined {
    return toSystemMetaDataEncrypted(dto)
}

export function mapMaintenanceTaskToNotification(dto: MaintenanceTask): Notification {
    return new Notification({
        id: toNotificationId(dto),
        rev: toNotificationRev(dto),
        status: toNotificationStatus(dto),
        created: toNotificationCreated(dto),
        endOfLife: toNotificationEndOfLife(dto),
        deletionDate: toNotificationDeletionDate(dto),
        identifiers: toNotificationIdentifiers(dto),
        modified: toNotificationModified(dto),
        author: toNotificationAuthor(dto),
        responsible: toNotificationResponsible(dto),
        properties: toNotificationProperties(dto),
        type: toNotificationType(dto),
        systemMetaData: toNotificationSystemMetaData(dto),
    })
}

export function mapNotificationToMaintenanceTask(domain: Notification): MaintenanceTask {
    return new MaintenanceTask({
        id: toMaintenanceTaskId(domain),
        rev: toMaintenanceTaskRev(domain),
        identifier: toMaintenanceTaskIdentifier(domain),
        created: toMaintenanceTaskCreated(domain),
        modified: toMaintenanceTaskModified(domain),
        author: toMaintenanceTaskAuthor(domain),
        responsible: toMaintenanceTaskResponsible(domain),
        medicalLocationId: toMaintenanceTaskMedicalLocationId(domain),
        tags: toMaintenanceTaskTags(domain),
        codes: toMaintenanceTaskCodes(domain),
        endOfLife: toMaintenanceTaskEndOfLife(domain),
        deletionDate: toMaintenanceTaskDeletionDate(domain),
        taskType: toMaintenanceTaskTaskType(domain),
        properties: toMaintenanceTaskProperties(domain),
        status: toMaintenanceTaskStatus(domain),
        secretForeignKeys: toMaintenanceTaskSecretForeignKeys(domain),
        cryptedForeignKeys: toMaintenanceTaskCryptedForeignKeys(domain),
        delegations: toMaintenanceTaskDelegations(domain),
        encryptionKeys: toMaintenanceTaskEncryptionKeys(domain),
        encryptedSelf: toMaintenanceTaskEncryptedSelf(domain),
    })
}
