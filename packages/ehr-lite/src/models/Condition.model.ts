import { Annotation, CodingReference, HealthElementDto, Identifier, SystemMetaDataEncrypted, forceUuid, mapTo } from '@icure/typescript-common'
import { CategoryEnum } from './enums/Category.enum'
import { ClinicalStatusEnum } from './enums/ClinicalStatus.enum'
import { SeverityEnum } from './enums/Severity.enum'
import { VerificationStatusEnum } from './enums/VerificationStatus.enum'

@mapTo(HealthElementDto)
export class Condition implements ICondition {
    id: string
    identifiers: Identifier[]
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
    bodySite?: Array<CodingReference>
    tags: Array<CodingReference>
    codes: Array<CodingReference>
    endOfLife?: number
    deletionDate?: number
    healthcareElementId?: string
    recordedDate?: number
    openingDate?: number
    closingDate?: number
    description?: string
    notes: Annotation[]
    systemMetaData?: SystemMetaDataEncrypted

    constructor(condition: Partial<ICondition>) {
        this.id = forceUuid(condition.id)
        this.identifiers = condition.identifiers ?? []
        this.rev = condition.rev
        this.created = condition.created
        this.modified = condition.modified
        this.author = condition.author
        this.responsible = condition.responsible
        this.medicalLocationId = condition.medicalLocationId
        this.clinicalStatus = condition.clinicalStatus
        this.verificationStatus = condition.verificationStatus
        this.category = condition.category
        this.severity = condition.severity
        this.bodySite = condition.bodySite
        this.tags = condition.tags ?? []
        this.codes = condition.codes ?? []
        this.endOfLife = condition.endOfLife
        this.deletionDate = condition.deletionDate
        this.healthcareElementId = condition.healthcareElementId
        this.recordedDate = condition.recordedDate
        this.openingDate = condition.openingDate
        this.closingDate = condition.closingDate
        this.description = condition.description
        this.notes = condition.notes ?? []
        this.systemMetaData = condition.systemMetaData
    }

    static toJSON(instance: Condition): ICondition {
        const pojo: ICondition = {} as ICondition
        pojo['id'] = instance.id
        pojo['identifiers'] = instance.identifiers.map((item) => Identifier.toJSON(item))
        if (instance.rev !== undefined) pojo['rev'] = instance.rev
        if (instance.created !== undefined) pojo['created'] = instance.created
        if (instance.modified !== undefined) pojo['modified'] = instance.modified
        if (instance.author !== undefined) pojo['author'] = instance.author
        if (instance.responsible !== undefined) pojo['responsible'] = instance.responsible
        if (instance.medicalLocationId !== undefined) pojo['medicalLocationId'] = instance.medicalLocationId
        if (instance.clinicalStatus !== undefined) pojo['clinicalStatus'] = instance.clinicalStatus
        if (instance.verificationStatus !== undefined) pojo['verificationStatus'] = instance.verificationStatus
        if (instance.category !== undefined) pojo['category'] = instance.category
        if (instance.severity !== undefined) pojo['severity'] = instance.severity
        if (instance.bodySite !== undefined) pojo['bodySite'] = instance.bodySite.map((item) => CodingReference.toJSON(item))
        pojo['tags'] = instance.tags.map((item) => CodingReference.toJSON(item))
        pojo['codes'] = instance.codes.map((item) => CodingReference.toJSON(item))
        if (instance.endOfLife !== undefined) pojo['endOfLife'] = instance.endOfLife
        if (instance.deletionDate !== undefined) pojo['deletionDate'] = instance.deletionDate
        if (instance.healthcareElementId !== undefined) pojo['healthcareElementId'] = instance.healthcareElementId
        if (instance.recordedDate !== undefined) pojo['recordedDate'] = instance.recordedDate
        if (instance.openingDate !== undefined) pojo['openingDate'] = instance.openingDate
        if (instance.closingDate !== undefined) pojo['closingDate'] = instance.closingDate
        if (instance.description !== undefined) pojo['description'] = instance.description
        pojo['notes'] = instance.notes.map((item) => Annotation.toJSON(item))
        if (instance.systemMetaData !== undefined) pojo['systemMetaData'] = SystemMetaDataEncrypted.toJSON(instance.systemMetaData)
        return pojo
    }

    static fromJSON(pojo: ICondition): Condition {
        const obj = {} as ICondition
        obj['id'] = pojo['id']
        obj['identifiers'] = pojo['identifiers'].map((item: any) => Identifier.fromJSON(item))
        if (pojo['rev'] !== undefined) {
            obj['rev'] = pojo['rev']!
        }
        if (pojo['created'] !== undefined) {
            obj['created'] = pojo['created']!
        }
        if (pojo['modified'] !== undefined) {
            obj['modified'] = pojo['modified']!
        }
        if (pojo['author'] !== undefined) {
            obj['author'] = pojo['author']!
        }
        if (pojo['responsible'] !== undefined) {
            obj['responsible'] = pojo['responsible']!
        }
        if (pojo['medicalLocationId'] !== undefined) {
            obj['medicalLocationId'] = pojo['medicalLocationId']!
        }
        if (pojo['clinicalStatus'] !== undefined) {
            obj['clinicalStatus'] = pojo['clinicalStatus']!
        }
        if (pojo['verificationStatus'] !== undefined) {
            obj['verificationStatus'] = pojo['verificationStatus']!
        }
        if (pojo['category'] !== undefined) {
            obj['category'] = pojo['category']!
        }
        if (pojo['severity'] !== undefined) {
            obj['severity'] = pojo['severity']!
        }
        if (pojo['bodySite'] !== undefined) {
            obj['bodySite'] = pojo['bodySite']!.map((item: any) => CodingReference.fromJSON(item))
        }
        obj['tags'] = pojo['tags'].map((item: any) => CodingReference.fromJSON(item))
        obj['codes'] = pojo['codes'].map((item: any) => CodingReference.fromJSON(item))
        if (pojo['endOfLife'] !== undefined) {
            obj['endOfLife'] = pojo['endOfLife']!
        }
        if (pojo['deletionDate'] !== undefined) {
            obj['deletionDate'] = pojo['deletionDate']!
        }
        if (pojo['healthcareElementId'] !== undefined) {
            obj['healthcareElementId'] = pojo['healthcareElementId']!
        }
        if (pojo['recordedDate'] !== undefined) {
            obj['recordedDate'] = pojo['recordedDate']!
        }
        if (pojo['openingDate'] !== undefined) {
            obj['openingDate'] = pojo['openingDate']!
        }
        if (pojo['closingDate'] !== undefined) {
            obj['closingDate'] = pojo['closingDate']!
        }
        if (pojo['description'] !== undefined) {
            obj['description'] = pojo['description']!
        }
        obj['notes'] = pojo['notes'].map((item: any) => Annotation.fromJSON(item))
        if (pojo['systemMetaData'] !== undefined) {
            obj['systemMetaData'] = SystemMetaDataEncrypted.fromJSON(pojo['systemMetaData']!)
        }
        return new Condition(obj)
    }
}

export interface ICondition {
    id?: string
    identifiers: Identifier[]
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
    bodySite?: Array<CodingReference>
    tags: Array<CodingReference>
    codes: Array<CodingReference>
    endOfLife?: number
    deletionDate?: number
    healthcareElementId?: string
    recordedDate?: number
    openingDate?: number
    closingDate?: number
    description?: string
    notes: Annotation[]
    systemMetaData?: SystemMetaDataEncrypted
}
