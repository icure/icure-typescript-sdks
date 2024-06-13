import { Annotation, CodingReference, Identifier, ISO639_1, mapTo, ServiceDto, SystemMetaDataEncrypted } from '@icure/typescript-common'
import { Quantity } from './Quantity.model'

/**
 * Immunization model
 *
 * @param id Immunization id
 * @param identifiers Immunization identifiers
 * @param administeredProduct Medication administered
 * @param occurrenceDateTime Date of immunization (YYYYMMDDhhmmss)
 * @param recorder Who recorded the immunization (Practitioner or Organization id)
 * @param status Status of the immunization [completed|entered-in-error|not-done] [Value set](https://hl7.org/fhir/R4/valueset-immunization-status.html)
 * @param statusReason Reason why the immunization status is not completed (`status` = `not-done`)
 * @param vaccineCode Vaccine code. A type of vaccine, typically identified diseas it covers
 * @param subPotentReason Reason why a dose is subpotent (e.g.partially administered) [Value set](https://hl7.org/fhir/R4/valueset-immunization-subpotent-reason.html)
 * @param encounter Encounter where the immunization was administered
 * @param site Site where the immunization was administered, e.g. left arm or right arm, etc. [SNOMED CT Body Structure code](https://hl7.org/fhir/R4/valueset-body-site.html)
 * @param recorded When the immunization was recorded (YYYYMMDDhhmmss)
 * @param created When the immunization was created (Unix timestamp)
 * @param modified When the immunization was last modified (Unix timestamp)
 * @param endOfLife When the immunization was deleted (Unix timestamp)
 * @param language Language of the resource content. ISO 639-1 code
 * @param systemMetaData System metadata
 * @param notes Notes
 * @see {@link https://hl7.org/fhir/R4/immunization.html}
 */
@mapTo(ServiceDto)
export class Immunization {
    id: string
    index?: number
    identifiers?: Identifier[]
    encounterId?: string
    doseQuantity?: Quantity
    administeredAt?: number
    recorder?: string
    status?: ImmunizationStatus
    statusReason?: CodingReference
    vaccineCode?: CodingReference
    subPotentReason?: CodingReference
    site?: CodingReference
    recorded?: number
    created?: number
    modified?: number
    endOfLife?: number
    codes: CodingReference[]
    tags: CodingReference[]
    language?: ISO639_1
    systemMetaData?: SystemMetaDataEncrypted
    notes?: Annotation[]

    constructor(immunization: IImmunization) {
        this.id = immunization.id
        this.index = immunization.index
        this.identifiers = immunization.identifiers
        this.encounterId = immunization.encounterId
        this.doseQuantity = immunization.doseQuantity
        this.administeredAt = immunization.administeredAt
        this.recorder = immunization.recorder
        this.status = immunization.status
        this.statusReason = immunization.statusReason
        this.vaccineCode = immunization.vaccineCode
        this.subPotentReason = immunization.subPotentReason
        this.site = immunization.site
        this.recorded = immunization.recorded
        this.created = immunization.created
        this.modified = immunization.modified
        this.endOfLife = immunization.endOfLife
        this.codes = immunization.codes ?? []
        this.tags = immunization.tags ?? []
        this.language = immunization.language
        this.systemMetaData = immunization.systemMetaData
        this.notes = immunization.notes
    }

    static toJSON(instance: Immunization): any {
        const pojo: any = {}
        pojo['id'] = instance.id
        if (instance.index !== undefined) pojo['index'] = instance.index
        if (instance.identifiers !== undefined) pojo['identifiers'] = instance.identifiers?.map((item) => Identifier.toJSON(item))
        if (instance.encounterId !== undefined) pojo['encounterId'] = instance.encounterId
        if (instance.doseQuantity !== undefined) pojo['doseQuantity'] = !!instance.doseQuantity ? Quantity.toJSON(instance.doseQuantity) : undefined
        if (instance.recorder !== undefined) pojo['recorder'] = instance.recorder
        if (instance.status !== undefined) pojo['status'] = instance.status
        if (instance.statusReason !== undefined) pojo['statusReason'] = !!instance.statusReason ? CodingReference.toJSON(instance.statusReason) : undefined
        if (instance.vaccineCode !== undefined) pojo['vaccineCode'] = !!instance.vaccineCode ? CodingReference.toJSON(instance.vaccineCode) : undefined
        if (instance.subPotentReason !== undefined) pojo['subPotentReason'] = !!instance.subPotentReason ? CodingReference.toJSON(instance.subPotentReason) : undefined
        if (instance.site !== undefined) pojo['site'] = !!instance.site ? CodingReference.toJSON(instance.site) : undefined
        if (instance.recorded !== undefined) pojo['recorded'] = instance.recorded
        if (instance.created !== undefined) pojo['created'] = instance.created
        if (instance.modified !== undefined) pojo['modified'] = instance.modified
        if (instance.endOfLife !== undefined) pojo['endOfLife'] = instance.endOfLife
        pojo['codes'] = instance.codes.map((item) => CodingReference.toJSON(item))
        pojo['tags'] = instance.tags.map((item) => CodingReference.toJSON(item))
        if (instance.language !== undefined) pojo['language'] = instance.language
        if (instance.systemMetaData !== undefined) pojo['systemMetaData'] = !!instance.systemMetaData ? SystemMetaDataEncrypted.toJSON(instance.systemMetaData) : undefined
        if (instance.notes !== undefined) pojo['notes'] = instance.notes?.map((item) => Annotation.toJSON(item))
        return pojo
    }

    static fromJSON(pojo: any): Immunization {
        const obj = {} as IImmunization
        obj['id'] = pojo['id']
        if (pojo['index'] !== undefined) {
            obj['index'] = pojo['index']
        }
        if (pojo['identifiers'] !== undefined) {
            obj['identifiers'] = pojo['identifiers']?.map((item: any) => Identifier.fromJSON(item))
        }
        if (pojo['encounterId'] !== undefined) {
            obj['encounterId'] = pojo['encounterId']
        }
        if (pojo['doseQuantity'] !== undefined) {
            obj['doseQuantity'] = !!pojo['doseQuantity'] ? Quantity.fromJSON(pojo['doseQuantity']) : undefined
        }
        if (pojo['recorder'] !== undefined) {
            obj['recorder'] = pojo['recorder']
        }
        if (pojo['status'] !== undefined) {
            obj['status'] = pojo['status']
        }
        if (pojo['statusReason'] !== undefined) {
            obj['statusReason'] = !!pojo['statusReason'] ? CodingReference.fromJSON(pojo['statusReason']) : undefined
        }
        if (pojo['vaccineCode'] !== undefined) {
            obj['vaccineCode'] = !!pojo['vaccineCode'] ? CodingReference.fromJSON(pojo['vaccineCode']) : undefined
        }
        if (pojo['subPotentReason'] !== undefined) {
            obj['subPotentReason'] = !!pojo['subPotentReason'] ? CodingReference.fromJSON(pojo['subPotentReason']) : undefined
        }
        if (pojo['site'] !== undefined) {
            obj['site'] = !!pojo['site'] ? CodingReference.fromJSON(pojo['site']) : undefined
        }
        if (pojo['recorded'] !== undefined) {
            obj['recorded'] = pojo['recorded']
        }
        if (pojo['created'] !== undefined) {
            obj['created'] = pojo['created']
        }
        if (pojo['modified'] !== undefined) {
            obj['modified'] = pojo['modified']
        }
        if (pojo['endOfLife'] !== undefined) {
            obj['endOfLife'] = pojo['endOfLife']
        }
        obj['codes'] = pojo['codes'].map((item: any) => CodingReference.fromJSON(item))
        obj['tags'] = pojo['tags'].map((item: any) => CodingReference.fromJSON(item))
        if (pojo['language'] !== undefined) {
            obj['language'] = pojo['language']
        }
        if (pojo['systemMetaData'] !== undefined) {
            obj['systemMetaData'] = !!pojo['systemMetaData'] ? SystemMetaDataEncrypted.fromJSON(pojo['systemMetaData']) : undefined
        }
        if (pojo['notes'] !== undefined) {
            obj['notes'] = pojo['notes']?.map((item: any) => Annotation.fromJSON(item))
        }
        return new Immunization(obj)
    }
}

interface IImmunization {
    id: string
    index?: number
    identifiers?: Identifier[]
    encounterId?: string
    doseQuantity?: Quantity
    administeredAt?: number
    recorder?: string
    status?: ImmunizationStatus
    statusReason?: CodingReference
    vaccineCode?: CodingReference
    subPotentReason?: CodingReference
    site?: CodingReference
    recorded?: number
    created?: number
    modified?: number
    endOfLife?: number
    codes?: CodingReference[]
    tags?: CodingReference[]
    language?: ISO639_1
    systemMetaData?: SystemMetaDataEncrypted
    notes?: Annotation[]
}

export type ImmunizationStatus = 'completed' | 'entered-in-error' | 'not-done'
