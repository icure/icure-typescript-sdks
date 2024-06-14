/**
 * ICure Medical Device Micro Service
 * ICure Medical Device Micro Service
 *
 * OpenAPI spec version: v2
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { Document as DocumentDto } from '@icure/api'
import { EntityId } from '../types'
import { mapTo } from '../utils/decorators'
import { forceUuid } from '../utils/uuidUtils'
import { ISystemMetaDataEncrypted, SystemMetaDataEncrypted } from './SystemMetaDataEncrypted.model'

@mapTo(DocumentDto)
export class Document {
    /**
     * The Id of the document. We encourage using either a v4 UUID or a HL7 Id.
     */
    id: EntityId
    /**
     * The revision of the document in the database, used for conflict management / optimistic locking.
     */
    rev?: string
    created?: number
    modified?: number
    author?: string
    responsible?: string
    medicalLocationId?: string
    deletionDate?: number
    /**
     * Reference in object store
     */
    objectStoreReference?: string
    /**
     * The main Uniform Type Identifier of the document (https://developer.apple.com/library/archive/documentation/FileManagement/Conceptual/understanding_utis/understand_utis_conc/understand_utis_conc.html#//apple_ref/doc/uid/TP40001319-CH202-CHDHIJDE)
     */
    mainUti?: string
    /**
     * Name of the document
     */
    name?: string
    /**
     * The document version
     */
    version?: string
    /**
     * Extra Uniform Type Identifiers
     */
    otherUtis: string[] = []
    /**
     * A unique external id (from another external source).
     */
    externalUuid?: string
    /**
     * Size of the document file
     */
    size?: number
    /**
     * Hashed version of the document
     */
    hash?: string
    /**
     * Id of attachment to this document
     */
    attachmentId?: string

    systemMetaData?: SystemMetaDataEncrypted

    toJSON(): IDocument {
        return {
            id: this.id,
            rev: this.rev,
            created: this.created,
            modified: this.modified,
            author: this.author,
            responsible: this.responsible,
            medicalLocationId: this.medicalLocationId,
            deletionDate: this.deletionDate,
            objectStoreReference: this.objectStoreReference,
            mainUti: this.mainUti,
            name: this.name,
            version: this.version,
            otherUtis: this.otherUtis.map((item) => item),
            externalUuid: this.externalUuid,
            size: this.size,
            hash: this.hash,
            attachmentId: this.attachmentId,
            systemMetaData: !!this.systemMetaData ? this.systemMetaData.toJSON() : undefined,
        }
    }

    constructor(json: Partial<IDocument>) {
        this.id = forceUuid(json['id']!)
        if (json['rev'] !== undefined) {
            this.rev = json['rev']!
        }
        if (json['created'] !== undefined) {
            this.created = json['created']!
        }
        if (json['modified'] !== undefined) {
            this.modified = json['modified']!
        }
        if (json['author'] !== undefined) {
            this.author = json['author']!
        }
        if (json['responsible'] !== undefined) {
            this.responsible = json['responsible']!
        }
        if (json['medicalLocationId'] !== undefined) {
            this.medicalLocationId = json['medicalLocationId']!
        }
        if (json['deletionDate'] !== undefined) {
            this.deletionDate = json['deletionDate']!
        }
        if (json['objectStoreReference'] !== undefined) {
            this.objectStoreReference = json['objectStoreReference']!
        }
        if (json['mainUti'] !== undefined) {
            this.mainUti = json['mainUti']!
        }
        if (json['name'] !== undefined) {
            this.name = json['name']!
        }
        if (json['version'] !== undefined) {
            this.version = json['version']!
        }
        if (json['otherUtis'] !== undefined) {
            this.otherUtis = json['otherUtis']!.map((item: any) => item)
        }
        if (json['externalUuid'] !== undefined) {
            this.externalUuid = json['externalUuid']!
        }
        if (json['size'] !== undefined) {
            this.size = json['size']!
        }
        if (json['hash'] !== undefined) {
            this.hash = json['hash']!
        }
        if (json['attachmentId'] !== undefined) {
            this.attachmentId = json['attachmentId']!
        }
        if (json['systemMetaData'] !== undefined) {
            this.systemMetaData = new SystemMetaDataEncrypted(json['systemMetaData']!)
        }
    }
}

export interface IDocument {
    id: EntityId
    rev?: string
    created?: number
    modified?: number
    author?: string
    responsible?: string
    medicalLocationId?: string
    deletionDate?: number
    objectStoreReference?: string
    mainUti?: string
    name?: string
    version?: string
    otherUtis: string[]
    externalUuid?: string
    size?: number
    hash?: string
    attachmentId?: string
    systemMetaData?: ISystemMetaDataEncrypted
}
