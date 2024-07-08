import { Annotation, CodingReference, EntityId, forceUuid, IAnnotation, ICodingReference, Identifier, IIdentifier, ISO639_1, ISystemMetaDataEncrypted, mapTo, ServiceDto, SystemMetaDataEncrypted } from '@icure/typescript-common'
import { IQuantity, Quantity } from './Quantity.model'

/**
 * Immunization model
 *
 * @param id Immunization id
 * @param index Index of the immunization (for sorting)
 * @param identifiers Immunization identifiers
 * @param encounterId Encounter id where the immunization was administered (populated if immunization is obtained directly, aka not nested in the encounter)
 * @param doseQuantity Amount of vaccine administered
 * @param occurrenceDateTime Date of immunization (YYYYMMDDhhmmss)
 * @param recorder Who recorded the immunization (Practitioner or Organization id)
 * @param status Status of the immunization [completed|entered-in-error|not-done] [Value set](https://hl7.org/fhir/R4/valueset-immunization-status.html)
 * @param statusReason Reason why the immunization status is not completed (`status` = `not-done`)
 * @param vaccineCode Vaccine code. A type of vaccine, typically identified disease it covers
 * @param subPotentReason Reason why a dose is subpotent (e.g.partially administered) [Value set](https://hl7.org/fhir/R4/valueset-immunization-subpotent-reason.html)
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
    id: EntityId
    index?: number
    identifiers: Identifier[] = []
    encounterId?: string
    doseQuantity?: Quantity
    expirationDate?: number
    lotNumber?: string
    occurrenceDateTime?: number
    recorder?: string
    status?: ImmunizationStatus
    statusReason?: CodingReference
    vaccineCodes?: Array<CodingReference>
    subPotentReason?: CodingReference
    site?: CodingReference
    recorded?: number
    created?: number
    modified?: number
    endOfLife?: number
    codes: CodingReference[] = []
    tags: CodingReference[] = []
    language?: ISO639_1
    systemMetaData?: SystemMetaDataEncrypted
    notes: Annotation[] = []

    toJSON(): IImmunization {
        return {
            id: this.id,
            index: this.index,
            identifiers: this.identifiers.map((item) => item.toJSON()),
            encounterId: this.encounterId,
            doseQuantity: !!this.doseQuantity ? this.doseQuantity.toJSON() : undefined,
            expirationDate: this.expirationDate,
            lotNumber: this.lotNumber,
            occurrenceDateTime: this.occurrenceDateTime,
            recorder: this.recorder,
            status: this.status,
            statusReason: !!this.statusReason ? this.statusReason.toJSON() : undefined,
            vaccineCodes: this.vaccineCodes?.map((item) => item.toJSON()),
            subPotentReason: !!this.subPotentReason ? this.subPotentReason.toJSON() : undefined,
            site: !!this.site ? this.site.toJSON() : undefined,
            recorded: this.recorded,
            created: this.created,
            modified: this.modified,
            endOfLife: this.endOfLife,
            codes: this.codes.map((item) => item.toJSON()),
            tags: this.tags.map((item) => item.toJSON()),
            language: this.language,
            systemMetaData: !!this.systemMetaData ? this.systemMetaData.toJSON() : undefined,
            notes: this.notes.map((item) => item.toJSON()),
        }
    }

    constructor(json: Partial<IImmunization>) {
        this.id = forceUuid(json['id']!)
        if (json['index'] !== undefined) {
            this.index = json['index']!
        }
        if (json['identifiers'] !== undefined) {
            this.identifiers = json['identifiers']!.map((item: any) => new Identifier(item))
        }
        if (json['encounterId'] !== undefined) {
            this.encounterId = json['encounterId']!
        }
        if (json['doseQuantity'] !== undefined) {
            this.doseQuantity = new Quantity(json['doseQuantity']!)
        }
        if (json['expirationDate'] !== undefined) {
            this.expirationDate = json['expirationDate']!
        }
        if (json['lotNumber'] !== undefined) {
            this.lotNumber = json['lotNumber']!
        }
        if (json['occurrenceDateTime'] !== undefined) {
            this.occurrenceDateTime = json['occurrenceDateTime']!
        }
        if (json['recorder'] !== undefined) {
            this.recorder = json['recorder']!
        }
        if (json['status'] !== undefined) {
            this.status = json['status']!
        }
        if (json['statusReason'] !== undefined) {
            this.statusReason = new CodingReference(json['statusReason']!)
        }
        if (json['vaccineCodes'] !== undefined) {
            this.vaccineCodes = json['vaccineCodes']!.map((item: any) => new CodingReference(item))
        }
        if (json['subPotentReason'] !== undefined) {
            this.subPotentReason = new CodingReference(json['subPotentReason']!)
        }
        if (json['site'] !== undefined) {
            this.site = new CodingReference(json['site']!)
        }
        if (json['recorded'] !== undefined) {
            this.recorded = json['recorded']!
        }
        if (json['created'] !== undefined) {
            this.created = json['created']!
        }
        if (json['modified'] !== undefined) {
            this.modified = json['modified']!
        }
        if (json['endOfLife'] !== undefined) {
            this.endOfLife = json['endOfLife']!
        }
        if (json['codes'] !== undefined) {
            this.codes = json['codes']!.map((item: any) => new CodingReference(item))
        }
        if (json['tags'] !== undefined) {
            this.tags = json['tags']!.map((item: any) => new CodingReference(item))
        }
        if (json['language'] !== undefined) {
            this.language = json['language']!
        }
        if (json['systemMetaData'] !== undefined) {
            this.systemMetaData = new SystemMetaDataEncrypted(json['systemMetaData']!)
        }
        if (json['notes'] !== undefined) {
            this.notes = json['notes']!.map((item: any) => new Annotation(item))
        }
    }
}

export interface IImmunization {
    id: EntityId
    index?: number
    identifiers: IIdentifier[]
    encounterId?: string
    doseQuantity?: IQuantity
    expirationDate?: number
    lotNumber?: string
    occurrenceDateTime?: number
    recorder?: string
    status?: ImmunizationStatus
    statusReason?: ICodingReference
    vaccineCodes?: Array<ICodingReference>
    subPotentReason?: ICodingReference
    site?: ICodingReference
    recorded?: number
    created?: number
    modified?: number
    endOfLife?: number
    codes: ICodingReference[]
    tags: ICodingReference[]
    language?: ISO639_1
    systemMetaData?: ISystemMetaDataEncrypted
    notes: IAnnotation[]
}

export type ImmunizationStatus = 'completed' | 'entered-in-error' | 'not-done'
