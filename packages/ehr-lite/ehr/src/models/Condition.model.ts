import {CodingReference} from "./CodingReference.model";
import {Identifier} from "./Identifier.model";
import {Annotation} from "./Annotation.model";
import {ClinicalStatusEnum} from "./enums/ClinicalStatus.enum";
import {VerificationStatusEnum} from "./enums/VerificationStatus.enum";
import {CategoryEnum} from "./enums/Category.enum";
import {SeverityEnum} from "./enums/Severity.enum";
// import {SystemMetaDataEncrypted} from "./SystemMetaDataEncrypted";

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
    // systemMetaData?: SystemMetaDataEncrypted

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
        return pojo
    }

    static fromJSON(pojo: any): Condition {
        const instance = new Condition()
        if (pojo["id"] === undefined) instance.id = undefined
        else instance.id = pojo["id"]
        if (pojo["identifiers"] === undefined) instance.identifiers = undefined
        else instance.identifiers = new Set(pojo["identifiers"]?.map((item: any) => Identifier.fromJSON(item)) ?? [])
        if (pojo["rev"] === undefined) instance.rev = undefined
        else instance.rev = pojo["rev"]
        if (pojo["created"] === undefined) instance.created = undefined
        else instance.created = pojo["created"]
        if (pojo["modified"] === undefined) instance.modified = undefined
        else instance.modified = pojo["modified"]
        if (pojo["author"] === undefined) instance.author = undefined
        else instance.author = pojo["author"]
        if (pojo["responsible"] === undefined) instance.responsible = undefined
        else instance.responsible = pojo["responsible"]
        if (pojo["medicalLocationId"] === undefined) instance.medicalLocationId = undefined
        else instance.medicalLocationId = pojo["medicalLocationId"]
        if (pojo["clinicalStatus"] === undefined) instance.clinicalStatus = undefined
        else instance.clinicalStatus = pojo["clinicalStatus"]
        if (pojo["verificationStatus"] === undefined) instance.verificationStatus = undefined
        else instance.verificationStatus = pojo["verificationStatus"]
        if (pojo["category"] === undefined) instance.category = undefined
        else instance.category = pojo["category"]
        if (pojo["severity"] === undefined) instance.severity = undefined
        else instance.severity = pojo["severity"]
        if (pojo["bodySite"] === undefined) instance.bodySite = undefined
        else instance.bodySite = new Set(pojo["bodySite"]?.map((item: any) => CodingReference.fromJSON(item)) ?? [])
        if (pojo["tags"] === undefined) instance.tags = undefined
        else instance.tags = new Set(pojo["tags"]?.map((item: any) => CodingReference.fromJSON(item)) ?? [])
        if (pojo["codes"] === undefined) instance.codes = undefined
        else instance.codes = new Set(pojo["codes"]?.map((item: any) => CodingReference.fromJSON(item)) ?? [])
        if (pojo["endOfLife"] === undefined) instance.endOfLife = undefined
        else instance.endOfLife = pojo["endOfLife"]
        if (pojo["deletionDate"] === undefined) instance.deletionDate = undefined
        else instance.deletionDate = pojo["deletionDate"]
        if (pojo["healthcareElementId"] === undefined) instance.healthcareElementId = undefined
        else instance.healthcareElementId = pojo["healthcareElementId"]
        if (pojo["recordedDate"] === undefined) instance.recordedDate = undefined
        else instance.recordedDate = pojo["recordedDate"]
        if (pojo["openingDate"] === undefined) instance.openingDate = undefined
        else instance.openingDate = pojo["openingDate"]
        if (pojo["closingDate"] === undefined) instance.closingDate = undefined
        else instance.closingDate = pojo["closingDate"]
        if (pojo["description"] === undefined) instance.description = undefined
        else instance.description = pojo["description"]
        if (pojo["notes"] === undefined) instance.notes = undefined
        else instance.notes = pojo["notes"]?.map((item: any) => Annotation.fromJSON(item))
        return instance
    }
}
