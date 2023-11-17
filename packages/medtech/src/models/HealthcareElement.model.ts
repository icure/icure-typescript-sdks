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
import { Annotation, CodingReference, forceUuid, Identifier, mapTo, SystemMetaDataEncrypted, HealthElementDto } from '@icure/typescript-common'

@mapTo(HealthElementDto)
export class HealthcareElement {
    /**
     * The Id of the healthcare element. We encourage using either a v4 UUID or a HL7 Id.
     */
    'id': string
    'identifiers': Array<Identifier>
    /**
     * The revision of the healthcare element in the database, used for conflict management / optimistic locking.
     */
    'rev'?: string
    'created'?: number
    'modified'?: number
    'author'?: string
    'responsible'?: string
    'medicalLocationId'?: string
    'labels': Set<CodingReference>
    'codes': Set<CodingReference>
    'endOfLife'?: number
    'deletionDate'?: number
    /**
     * The logical id of the healthcare element, used to link together different versions of the same healthcare element. We encourage using either a v4 UUID or a HL7 Id.
     */
    'healthcareElementId'?: string
    /**
     * The date (unix epoch in ms) when the healthcare element is noted to have started and also closes on the same date
     */
    'valueDate'?: number
    /**
     * The date (unix epoch in ms) of the start of the healthcare element.
     */
    'openingDate'?: number
    /**
     * The date (unix epoch in ms) marking the end of the healthcare element.
     */
    'closingDate'?: number
    /**
     * Description of the healthcare element.
     */
    'description'?: string
    /**
     * A text note (can be confidential, encrypted by default).
     */
    'note'?: string
    notes: Annotation[]
    'systemMetaData'?: SystemMetaDataEncrypted

    constructor(json: IHealthcareElement) {
        this.id = forceUuid(json.id)
        this.identifiers = json.identifiers ?? []
        this.rev = json.rev
        this.created = json.created
        this.modified = json.modified
        this.author = json.author
        this.responsible = json.responsible
        this.medicalLocationId = json.medicalLocationId
        this.labels = json.labels ?? new Set()
        this.codes = json.codes ?? new Set()
        this.endOfLife = json.endOfLife
        this.deletionDate = json.deletionDate
        this.healthcareElementId = json.healthcareElementId
        this.valueDate = json.valueDate
        this.openingDate = json.openingDate
        this.closingDate = json.closingDate
        this.description = json.description
        this.note = json.note
        this.notes = json.notes ?? []
        this.systemMetaData = json.systemMetaData
    }

    static toJSON(instance: HealthcareElement): any {
        const pojo: any = {}
        pojo['id'] = instance.id
        pojo['identifiers'] = instance.identifiers.map((item) => Identifier.toJSON(item))
        if (instance.rev !== undefined) pojo['rev'] = instance.rev
        if (instance.created !== undefined) pojo['created'] = instance.created
        if (instance.modified !== undefined) pojo['modified'] = instance.modified
        if (instance.author !== undefined) pojo['author'] = instance.author
        if (instance.responsible !== undefined) pojo['responsible'] = instance.responsible
        if (instance.medicalLocationId !== undefined) pojo['medicalLocationId'] = instance.medicalLocationId
        pojo['labels'] = Array.from([...instance.labels].map((item) => CodingReference.toJSON(item)))
        pojo['codes'] = Array.from([...instance.codes].map((item) => CodingReference.toJSON(item)))
        if (instance.endOfLife !== undefined) pojo['endOfLife'] = instance.endOfLife
        if (instance.deletionDate !== undefined) pojo['deletionDate'] = instance.deletionDate
        if (instance.healthcareElementId !== undefined) pojo['healthcareElementId'] = instance.healthcareElementId
        if (instance.valueDate !== undefined) pojo['valueDate'] = instance.valueDate
        if (instance.openingDate !== undefined) pojo['openingDate'] = instance.openingDate
        if (instance.closingDate !== undefined) pojo['closingDate'] = instance.closingDate
        if (instance.description !== undefined) pojo['description'] = instance.description
        if (instance.note !== undefined) pojo['note'] = instance.note
        pojo['notes'] = instance.notes.map((item) => Annotation.toJSON(item))
        if (instance.systemMetaData !== undefined) pojo['systemMetaData'] = !!instance.systemMetaData ? SystemMetaDataEncrypted.toJSON(instance.systemMetaData) : undefined
        return pojo
    }

    static fromJSON(pojo: any): HealthcareElement {
        const obj = {} as IHealthcareElement
        obj['id'] = pojo['id']
        obj['identifiers'] = pojo['identifiers'].map((item: any) => Identifier.fromJSON(item))
        if (pojo['rev'] !== undefined) {
            obj['rev'] = pojo['rev']
        }
        if (pojo['created'] !== undefined) {
            obj['created'] = pojo['created']
        }
        if (pojo['modified'] !== undefined) {
            obj['modified'] = pojo['modified']
        }
        if (pojo['author'] !== undefined) {
            obj['author'] = pojo['author']
        }
        if (pojo['responsible'] !== undefined) {
            obj['responsible'] = pojo['responsible']
        }
        if (pojo['medicalLocationId'] !== undefined) {
            obj['medicalLocationId'] = pojo['medicalLocationId']
        }
        obj['labels'] = new Set(pojo['labels'].map((item: any) => CodingReference.fromJSON(item)))
        obj['codes'] = new Set(pojo['codes'].map((item: any) => CodingReference.fromJSON(item)))
        if (pojo['endOfLife'] !== undefined) {
            obj['endOfLife'] = pojo['endOfLife']
        }
        if (pojo['deletionDate'] !== undefined) {
            obj['deletionDate'] = pojo['deletionDate']
        }
        if (pojo['healthcareElementId'] !== undefined) {
            obj['healthcareElementId'] = pojo['healthcareElementId']
        }
        if (pojo['valueDate'] !== undefined) {
            obj['valueDate'] = pojo['valueDate']
        }
        if (pojo['openingDate'] !== undefined) {
            obj['openingDate'] = pojo['openingDate']
        }
        if (pojo['closingDate'] !== undefined) {
            obj['closingDate'] = pojo['closingDate']
        }
        if (pojo['description'] !== undefined) {
            obj['description'] = pojo['description']
        }
        if (pojo['note'] !== undefined) {
            obj['note'] = pojo['note']
        }
        obj['notes'] = pojo['notes'].map((item: any) => Annotation.fromJSON(item))
        if (pojo['systemMetaData'] !== undefined) {
            obj['systemMetaData'] = !!pojo['systemMetaData'] ? SystemMetaDataEncrypted.fromJSON(pojo['systemMetaData']) : undefined
        }
        return new HealthcareElement(obj)
    }
}

interface IHealthcareElement {
    id?: string
    identifiers?: Array<Identifier>
    rev?: string
    created?: number
    modified?: number
    author?: string
    responsible?: string
    medicalLocationId?: string
    labels?: Set<CodingReference>
    codes?: Set<CodingReference>
    endOfLife?: number
    deletionDate?: number
    healthcareElementId?: string
    valueDate?: number
    openingDate?: number
    closingDate?: number
    description?: string
    note?: string
    notes?: Annotation[]
    systemMetaData?: SystemMetaDataEncrypted
}
