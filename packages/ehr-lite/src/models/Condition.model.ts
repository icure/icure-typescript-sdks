import { HealthElement } from '@icure/api'
import { mapTo } from "@icure/typescript-common"
import { Annotation } from './Annotation.model'
import { CodingReference } from './CodingReference.model'
import { Identifier } from './Identifier.model'
import { SystemMetaDataEncrypted } from './SystemMetaDataEncrypted.model'
import { CategoryEnum } from './enums/Category.enum'
import { ClinicalStatusEnum } from './enums/ClinicalStatus.enum'
import { SeverityEnum } from './enums/Severity.enum'
import { VerificationStatusEnum } from './enums/VerificationStatus.enum'

@mapTo(HealthElement)
export class Condition {
    id?: string
    identifiers?: Set<Identifier>
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
    bodySite?: Set<CodingReference>
    tags?: Set<CodingReference>
    codes?: Set<CodingReference>
    endOfLife?: number
    deletionDate?: number
    healthcareElementId?: string
    recordedDate?: number
    openingDate?: number
    closingDate?: number
    description?: string
    notes?: Annotation[]
    systemMetaData?: SystemMetaDataEncrypted

    constructor(condition?: ICondition | any) {
        this.id = condition?.id
        this.identifiers = condition?.identifiers
        this.rev = condition?.rev
        this.created = condition?.created
        this.modified = condition?.modified
        this.author = condition?.author
        this.responsible = condition?.responsible
        this.medicalLocationId = condition?.medicalLocationId
        this.clinicalStatus = condition?.clinicalStatus
        this.verificationStatus = condition?.verificationStatus
        this.category = condition?.category
        this.severity = condition?.severity
        this.bodySite = condition?.bodySite
        this.tags = condition?.tags
        this.codes = condition?.codes
        this.endOfLife = condition?.endOfLife
        this.deletionDate = condition?.deletionDate
        this.healthcareElementId = condition?.healthcareElementId
        this.recordedDate = condition?.recordedDate
        this.openingDate = condition?.openingDate
        this.closingDate = condition?.closingDate
        this.description = condition?.description
        this.notes = condition?.notes
        this.systemMetaData = condition?.systemMetaData
    }

    static toJSON(instance: Condition): any {
        const pojo: any = {}
        pojo["id"] = instance.id
        pojo["identifiers"] = Array.from([...instance.identifiers ?? []]?.map(item => Identifier.toJSON(item)) ?? [])
        pojo["rev"] = instance.rev
        pojo["created"] = instance.created
        pojo["modified"] = instance.modified
        pojo["author"] = instance.author
        pojo["responsible"] = instance.responsible
        pojo["medicalLocationId"] = instance.medicalLocationId
        pojo["clinicalStatus"] = instance.clinicalStatus
        pojo["verificationStatus"] = instance.verificationStatus
        pojo["category"] = instance.category
        pojo["severity"] = instance.severity
        pojo["bodySite"] = Array.from([...instance.bodySite ?? []]?.map(item => CodingReference.toJSON(item)) ?? [])
        pojo["tags"] = Array.from([...instance.tags ?? []]?.map(item => CodingReference.toJSON(item)) ?? [])
        pojo["codes"] = Array.from([...instance.codes ?? []]?.map(item => CodingReference.toJSON(item)) ?? [])
        pojo["endOfLife"] = instance.endOfLife
        pojo["deletionDate"] = instance.deletionDate
        pojo["healthcareElementId"] = instance.healthcareElementId
        pojo["recordedDate"] = instance.recordedDate
        pojo["openingDate"] = instance.openingDate
        pojo["closingDate"] = instance.closingDate
        pojo["description"] = instance.description
        pojo["notes"] = instance.notes?.map(item => Annotation.toJSON(item))
        pojo["systemMetaData"] = !!instance.systemMetaData ? SystemMetaDataEncrypted.toJSON(instance.systemMetaData) : undefined
        return pojo
    }

    static fromJSON(pojo: any): Condition {
        return new Condition({id: pojo["id"], identifiers: new Set(pojo["identifiers"]?.map((item: any) => Identifier.fromJSON(item)) ?? []), rev: pojo["rev"], created: pojo["created"], modified: pojo["modified"], author: pojo["author"], responsible: pojo["responsible"], medicalLocationId: pojo["medicalLocationId"], clinicalStatus: pojo["clinicalStatus"], verificationStatus: pojo["verificationStatus"], category: pojo["category"], severity: pojo["severity"], bodySite: new Set(pojo["bodySite"]?.map((item: any) => CodingReference.fromJSON(item)) ?? []), tags: new Set(pojo["tags"]?.map((item: any) => CodingReference.fromJSON(item)) ?? []), codes: new Set(pojo["codes"]?.map((item: any) => CodingReference.fromJSON(item)) ?? []), endOfLife: pojo["endOfLife"], deletionDate: pojo["deletionDate"], healthcareElementId: pojo["healthcareElementId"], recordedDate: pojo["recordedDate"], openingDate: pojo["openingDate"], closingDate: pojo["closingDate"], description: pojo["description"], notes: pojo["notes"]?.map((item: any) => Annotation.fromJSON(item)), systemMetaData: !!pojo["systemMetaData"] ? SystemMetaDataEncrypted.fromJSON(pojo["systemMetaData"]) : undefined})
    }
}

interface ICondition {
    id?: string
    identifiers?: Set<Identifier>
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
    bodySite?: Set<CodingReference>
    tags?: Set<CodingReference>
    codes?: Set<CodingReference>
    endOfLife?: number
    deletionDate?: number
    healthcareElementId?: string
    recordedDate?: number
    openingDate?: number
    closingDate?: number
    description?: string
    notes?: Annotation[]
    systemMetaData?: SystemMetaDataEncrypted
}
