import {
    Annotation,
    CodingReference,
    EntityId,
    HealthElementDto,
    IAnnotation,
    ICodingReference, IIdentifier, ISystemMetaDataEncrypted,
    Identifier,
    SystemMetaDataEncrypted,
    forceUuid,
    mapTo
} from '@icure/typescript-common'
import { CategoryEnum } from './enums/Category.enum'
import { ClinicalStatusEnum } from './enums/ClinicalStatus.enum'
import { SeverityEnum } from './enums/Severity.enum'
import { VerificationStatusEnum } from './enums/VerificationStatus.enum'

@mapTo(HealthElementDto)
export class Condition implements ICondition {
    id: EntityId
    identifiers: Identifier[] = []
    rev?: string
    created?: number
    modified?: number
    author?: string
    responsible?: string
    medicalLocationId?: string
    clinicalStatus?: ClinicalStatusEnum
    verificationStatus?: VerificationStatusEnum
    category?: CategoryEnum
    severity?: SeverityEnum
    bodySite?: CodingReference[] = []
    tags: CodingReference[] = []
    codes: CodingReference[] = []
    endOfLife?: number
    deletionDate?: number
    healthcareElementId?: string
    recordedDate?: number
    openingDate?: number
    closingDate?: number
    description?: string
    notes: Annotation[] = []
    systemMetaData?: SystemMetaDataEncrypted

    toJSON(): ICondition {
        return {
        id: this.id,
        identifiers: this.identifiers.map(item => item.toJSON()),
        rev: this.rev,
        created: this.created,
        modified: this.modified,
        author: this.author,
        responsible: this.responsible,
        medicalLocationId: this.medicalLocationId,
        clinicalStatus: this.clinicalStatus,
        verificationStatus: this.verificationStatus,
        category: this.category,
        severity: this.severity,
        bodySite: this.bodySite?.map(item => item.toJSON()),
        tags: this.tags.map(item => item.toJSON()),
        codes: this.codes.map(item => item.toJSON()),
        endOfLife: this.endOfLife,
        deletionDate: this.deletionDate,
        healthcareElementId: this.healthcareElementId,
        recordedDate: this.recordedDate,
        openingDate: this.openingDate,
        closingDate: this.closingDate,
        description: this.description,
        notes: this.notes.map(item => item.toJSON()),
        systemMetaData: !!this.systemMetaData ? this.systemMetaData.toJSON() : undefined,
        }
    }

    constructor(json: Partial<ICondition>) {
        this.id = forceUuid(json["id"]!)
        if (json["identifiers"] !== undefined) {
            this.identifiers = json["identifiers"]!.map((item: any) => new Identifier(item))
        }
        if (json["rev"] !== undefined) {
            this.rev = json["rev"]!
        }
        if (json["created"] !== undefined) {
            this.created = json["created"]!
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
        if (json["medicalLocationId"] !== undefined) {
            this.medicalLocationId = json["medicalLocationId"]!
        }
        if (json["clinicalStatus"] !== undefined) {
            this.clinicalStatus = json["clinicalStatus"]!
        }
        if (json["verificationStatus"] !== undefined) {
            this.verificationStatus = json["verificationStatus"]!
        }
        if (json["category"] !== undefined) {
            this.category = json["category"]!
        }
        if (json["severity"] !== undefined) {
            this.severity = json["severity"]!
        }
        if (json["bodySite"] !== undefined) {
            this.bodySite = json["bodySite"]!.map((item: any) => new CodingReference(item))
        }
        if (json["tags"] !== undefined) {
            this.tags = json["tags"]!.map((item: any) => new CodingReference(item))
        }
        if (json["codes"] !== undefined) {
            this.codes = json["codes"]!.map((item: any) => new CodingReference(item))
        }
        if (json["endOfLife"] !== undefined) {
            this.endOfLife = json["endOfLife"]!
        }
        if (json["deletionDate"] !== undefined) {
            this.deletionDate = json["deletionDate"]!
        }
        if (json["healthcareElementId"] !== undefined) {
            this.healthcareElementId = json["healthcareElementId"]!
        }
        if (json["recordedDate"] !== undefined) {
            this.recordedDate = json["recordedDate"]!
        }
        if (json["openingDate"] !== undefined) {
            this.openingDate = json["openingDate"]!
        }
        if (json["closingDate"] !== undefined) {
            this.closingDate = json["closingDate"]!
        }
        if (json["description"] !== undefined) {
            this.description = json["description"]!
        }
        if (json["notes"] !== undefined) {
            this.notes = json["notes"]!.map((item: any) => new Annotation(item))
        }
        if (json["systemMetaData"] !== undefined) {
            this.systemMetaData = new SystemMetaDataEncrypted(json["systemMetaData"]!)
        }
    }
}

export interface ICondition {
    id?: string
    identifiers: IIdentifier[]
    rev?: string
    created?: number
    modified?: number
    author?: string
    responsible?: string
    medicalLocationId?: string
    clinicalStatus?: ClinicalStatusEnum
    verificationStatus?: VerificationStatusEnum
    category?: CategoryEnum
    severity?: SeverityEnum
    bodySite?: ICodingReference[]
    tags: ICodingReference[]
    codes: ICodingReference[]
    endOfLife?: number
    deletionDate?: number
    healthcareElementId?: string
    recordedDate?: number
    openingDate?: number
    closingDate?: number
    description?: string
    notes: IAnnotation[]
    systemMetaData?: ISystemMetaDataEncrypted
}
