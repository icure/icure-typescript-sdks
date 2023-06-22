import {Notification, NotificationTypeEnum} from "../models/Notification.model"
import {Identifier as IdentifierDto, MaintenanceTask as MaintenanceTaskDto, PropertyStub} from "@icure/api"
import {createMap, forMember, fromValue, ignore, mapFrom, Mapper, mapWith} from "@automapper/core"
import {Property} from "../models/Property.model";
import {
    convertMapOfArrayOfGenericToObject, convertObjectToMapOfArrayOfGeneric,
    extractCryptedForeignKeys,
    extractDelegations, extractEncryptedSelf,
    extractEncryptionKeys,
    extractSecretForeignKeys, extractSecurityMetadata
} from "../utils/Metadata.utils";
import {Delegation} from "../models/Delegation.model";
import {Delegation as DelegationDto} from "@icure/api/icc-api/model/Delegation";
import {SecurityMetadata} from "../models/SecurityMetadata.model";
import {SecurityMetadata as SecurityMetadataDto} from "@icure/api/icc-api/model/SecurityMetadata";
import {Identifier} from "../models/Identifier.model";
import {SystemMetaDataEncrypted} from "../models/SystemMetaDataEncrypted.model";
import {mapper} from "./mapper";

function forMember_MaintenanceTask_id() {
    return forMember<Notification, MaintenanceTaskDto>(v => v.id, mapFrom((n) => n.id))
}

function forMember_MaintenanceTask_rev() {
    return forMember<Notification, MaintenanceTaskDto>(v => v.rev, mapFrom((n) => n.rev))
}

function forMember_MaintenanceTask_identifier() {
    return forMember<Notification, MaintenanceTaskDto>(v => v.identifier, mapWith(IdentifierDto, Identifier, (n) => n.identifiers))
}

function forMember_MaintenanceTask_created() {
    return forMember<Notification, MaintenanceTaskDto>(v => v.created, mapFrom((n) => n.created))
}

function forMember_MaintenanceTask_modified() {
    return forMember<Notification, MaintenanceTaskDto>(v => v.modified, mapFrom((n) => n.modified))
}

function forMember_MaintenanceTask_author() {
    return forMember<Notification, MaintenanceTaskDto>(v => v.author, mapFrom((n) => n.author))
}

function forMember_MaintenanceTask_responsible() {
    return forMember<Notification, MaintenanceTaskDto>(v => v.responsible, mapFrom((n) => n.responsible))
}

function forMember_MaintenanceTask_medicalLocationId() {
    return forMember<Notification, MaintenanceTaskDto>(v => v.medicalLocationId, ignore())
}

function forMember_MaintenanceTask_tags() {
    return forMember<Notification, MaintenanceTaskDto>(v => v.tags, ignore())
}

function forMember_MaintenanceTask_codes() {
    return forMember<Notification, MaintenanceTaskDto>(v => v.codes, ignore())
}

function forMember_MaintenanceTask_endOfLife() {
    return forMember<Notification, MaintenanceTaskDto>(v => v.endOfLife, mapFrom((n) => n.endOfLife))
}

function forMember_MaintenanceTask_deletionDate() {
    return forMember<Notification, MaintenanceTaskDto>(v => v.deletionDate, mapFrom((n) => n.deletionDate))
}

function forMember_MaintenanceTask_taskType() {
    return forMember<Notification, MaintenanceTaskDto>(v => v.taskType, mapFrom((n) => n.type))
}

function forMember_MaintenanceTask_properties() {
    return forMember<Notification, MaintenanceTaskDto>(v => v.properties, mapWith(PropertyStub, Property, (n) => n.properties))
}

function forMember_MaintenanceTask_status() {
    return forMember<Notification, MaintenanceTaskDto>(v => v.status, mapFrom((n) => n.status))
}

function forMember_MaintenanceTask_secretForeignKeys() {
    return forMember<Notification, MaintenanceTaskDto>(v => v.secretForeignKeys, mapFrom((n) => extractSecretForeignKeys(n.systemMetaData)))
}

function forMember_MaintenanceTask_cryptedForeignKeys() {
    return forMember<Notification, MaintenanceTaskDto>(v => v.cryptedForeignKeys, mapFrom((n) => {
        const cryptedForeignKeys = extractCryptedForeignKeys(n.systemMetaData)

        if (!cryptedForeignKeys) {
            return undefined
        }

        return Object.fromEntries([...cryptedForeignKeys].map(([key, value]) => [key, mapper.mapArray(value, Delegation, DelegationDto)]))
    }))
}

function forMember_MaintenanceTask_delegations() {
    return forMember<Notification, MaintenanceTaskDto>(v => v.delegations, mapFrom((n) => {
        const delegations = extractDelegations(n.systemMetaData)

        if (!delegations) {
            return undefined
        }

        return Object.fromEntries([...delegations].map(([key, value]) => [key, mapper.mapArray(value, Delegation, DelegationDto)]))
    }))
}

function forMember_MaintenanceTask_encryptionKeys() {
    return forMember<Notification, MaintenanceTaskDto>(v => v.encryptionKeys, mapFrom((n) => {
        const encryptionKeys = extractEncryptionKeys(n.systemMetaData)
        return !!encryptionKeys ? convertMapOfArrayOfGenericToObject<Delegation, DelegationDto>(encryptionKeys, (arr) => mapper.mapArray(arr, Delegation, DelegationDto)) : []
    }))
}

function forMember_MaintenanceTask_encryptedSelf() {
    return forMember<Notification, MaintenanceTaskDto>(v => v.encryptedSelf, mapFrom((n) => extractEncryptedSelf(n.systemMetaData)))
}

function forMember_MaintenanceTask_securityMetadata() {
    return forMember<Notification, MaintenanceTaskDto>(v => v.securityMetadata, mapFrom((n) => {
        const securityMetadata = extractSecurityMetadata(n.systemMetaData)
        return mapper.map(securityMetadata, SecurityMetadata, SecurityMetadataDto)
    }))
}

function forMember_MaintenanceTask__type() {
    return forMember<Notification, MaintenanceTaskDto>(v => v._type, fromValue('MaintenanceTask'))
}

function forMember_Notification_id() {
    return forMember<MaintenanceTaskDto, Notification>(v => v.id, mapFrom((m) => m.id))
}

function forMember_Notification_rev() {
    return forMember<MaintenanceTaskDto, Notification>(v => v.rev, mapFrom((m) => m.rev))
}

function forMember_Notification_status() {
    return forMember<MaintenanceTaskDto, Notification>(v => v.status, mapFrom((m) => m.status))
}

function forMember_Notification_created() {
    return forMember<MaintenanceTaskDto, Notification>(v => v.created, mapFrom((m) => m.created))
}

function forMember_Notification_endOfLife() {
    return forMember<MaintenanceTaskDto, Notification>(v => v.endOfLife, mapFrom((m) => m.endOfLife))
}

function forMember_Notification_deletionDate() {
    return forMember<MaintenanceTaskDto, Notification>(v => v.deletionDate, mapFrom((m) => m.deletionDate))
}

function forMember_Notification_identifiers() {
    return forMember<MaintenanceTaskDto, Notification>(v => v.identifiers, mapWith(Identifier, IdentifierDto, (m) => m.identifier))
}

function forMember_Notification_modified() {
    return forMember<MaintenanceTaskDto, Notification>(v => v.modified, mapFrom((m) => m.modified))
}

function forMember_Notification_author() {
    return forMember<MaintenanceTaskDto, Notification>(v => v.author, mapFrom((m) => m.author))
}

function forMember_Notification_responsible() {
    return forMember<MaintenanceTaskDto, Notification>(v => v.responsible, mapFrom((m) => m.responsible))
}

function forMember_Notification_properties() {
    return forMember<MaintenanceTaskDto, Notification>(v => v.properties, mapWith(Property, PropertyStub, (m) => m.properties))
}

function forMember_Notification_type() {
    return forMember<MaintenanceTaskDto, Notification>(v => v.type, mapFrom((m) => !!m.taskType && Object.values(NotificationTypeEnum).includes(m.taskType as unknown as NotificationTypeEnum)
        ? NotificationTypeEnum[m.taskType as keyof typeof NotificationTypeEnum]
        : NotificationTypeEnum.OTHER,))
}

function forMember_Notification_systemMetaData() {
    return forMember<MaintenanceTaskDto, Notification>(v => v.systemMetaData,
        mapFrom((v) => {
            return new SystemMetaDataEncrypted({
                encryptedSelf: v.encryptedSelf,
                securityMetadata: mapper.map(v.securityMetadata, SecurityMetadataDto, SecurityMetadata),
                cryptedForeignKeys: !!v.cryptedForeignKeys ? convertObjectToMapOfArrayOfGeneric<DelegationDto, Delegation>(v.cryptedForeignKeys, (arr) => mapper.mapArray(arr, DelegationDto, Delegation)) : undefined,
                delegations: !!v.delegations ? convertObjectToMapOfArrayOfGeneric<DelegationDto, Delegation>(v.delegations, (arr) => mapper.mapArray(arr, DelegationDto, Delegation)) : undefined,
                encryptionKeys: !!v.encryptionKeys ? convertObjectToMapOfArrayOfGeneric<DelegationDto, Delegation>(v.encryptionKeys, (arr) => mapper.mapArray(arr, DelegationDto, Delegation)) : undefined,
                secretForeignKeys: v.secretForeignKeys,
            })
        })
    )
}

export function initializeNotificationMapper(mapper: Mapper) {
    createMap(mapper, Notification, MaintenanceTaskDto, forMember_MaintenanceTask_id(), forMember_MaintenanceTask_rev(), forMember_MaintenanceTask_identifier(), forMember_MaintenanceTask_created(), forMember_MaintenanceTask_modified(), forMember_MaintenanceTask_author(), forMember_MaintenanceTask_responsible(), forMember_MaintenanceTask_medicalLocationId(), forMember_MaintenanceTask_tags(), forMember_MaintenanceTask_codes(), forMember_MaintenanceTask_endOfLife(), forMember_MaintenanceTask_deletionDate(), forMember_MaintenanceTask_taskType(), forMember_MaintenanceTask_properties(), forMember_MaintenanceTask_status(), forMember_MaintenanceTask_secretForeignKeys(), forMember_MaintenanceTask_cryptedForeignKeys(), forMember_MaintenanceTask_delegations(), forMember_MaintenanceTask_encryptionKeys(), forMember_MaintenanceTask_encryptedSelf(), forMember_MaintenanceTask_securityMetadata(), forMember_MaintenanceTask__type())

    createMap(mapper, MaintenanceTaskDto, Notification, forMember_Notification_id(), forMember_Notification_rev(), forMember_Notification_status(), forMember_Notification_created(), forMember_Notification_endOfLife(), forMember_Notification_deletionDate(), forMember_Notification_identifiers(), forMember_Notification_modified(), forMember_Notification_author(), forMember_Notification_responsible(), forMember_Notification_properties(), forMember_Notification_type(), forMember_Notification_systemMetaData())
}
