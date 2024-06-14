import { Annotation, CodingReference, ContactDto, IAnnotation, ICodingReference, Identifier, IIdentifier, ISystemMetaDataEncrypted, mapTo, SystemMetaDataEncrypted } from '@icure/typescript-common'
import { IImmunization, Immunization } from './Immunization.model'
import { IObservation, Observation } from './Observation.model'

/**
 * Encounter model
 *
 * An Encounter is a contact between a patient and a healthcare provider.
 *
 * @param id The unique identifier of the encounter.
 * @param identifiers The list of identifiers associated with the encounter.
 * @param codes The list of codes associated with the encounter.
 * @param tags The list of tags associated with the encounter.
 * @param type Specific type of encounter. [Value set](https://hl7.org/fhir/R4/valueset-encounter-type.html)
 * @param startTime The start time of the encounter (Unix timestamp).
 * @param endTime The end time of the encounter (Unix timestamp).
 * @param reasonCode The reason the encounter takes place.
 * @param diagnosis The list of underlying condition id associated with the encounter.
 * @param serviceProvider The provider or organization who is responsible for the enconter.
 * @param notes The list of notes associated with the encounter.
 * @param systemMetaData System metadata
 */
@mapTo(ContactDto)
export class Encounter {
    id: string
    rev?: string
    identifiers: Identifier[] = []
    codes: CodingReference[] = []
    tags: CodingReference[] = []
    type?: CodingReference
    startTime?: number
    endTime?: number
    reasonCode: CodingReference[] = []
    diagnosis: string[] = []
    serviceProvider?: string
    created?: number
    modified?: number
    endOfLife?: number
    author?: string
    performer?: string
    immunizations: Immunization[] = []
    observations: Observation[] = []
    notes: Annotation[] = []
    systemMetaData?: SystemMetaDataEncrypted

    toJSON(): IEncounter {
        return {
            id: this.id,
            rev: this.rev,
            identifiers: this.identifiers.map((item) => item.toJSON()),
            codes: this.codes.map((item) => item.toJSON()),
            tags: this.tags.map((item) => item.toJSON()),
            type: !!this.type ? this.type.toJSON() : undefined,
            startTime: this.startTime,
            endTime: this.endTime,
            reasonCode: this.reasonCode.map((item) => item.toJSON()),
            diagnosis: this.diagnosis.map((item) => item),
            serviceProvider: this.serviceProvider,
            created: this.created,
            modified: this.modified,
            endOfLife: this.endOfLife,
            author: this.author,
            performer: this.performer,
            immunizations: this.immunizations.map((item) => item.toJSON()),
            observations: this.observations.map((item) => item.toJSON()),
            notes: this.notes.map((item) => item.toJSON()),
            systemMetaData: !!this.systemMetaData ? this.systemMetaData.toJSON() : undefined,
        }
    }

    constructor(json: Partial<IEncounter> & { id: string }) {
        this.id = json['id']!
        if (json['rev'] !== undefined) {
            this.rev = json['rev']!
        }
        if (json['identifiers'] !== undefined) {
            this.identifiers = json['identifiers']!.map((item: any) => new Identifier(item))
        }
        if (json['codes'] !== undefined) {
            this.codes = json['codes']!.map((item: any) => new CodingReference(item))
        }
        if (json['tags'] !== undefined) {
            this.tags = json['tags']!.map((item: any) => new CodingReference(item))
        }
        if (json['type'] !== undefined) {
            this.type = new CodingReference(json['type']!)
        }
        if (json['startTime'] !== undefined) {
            this.startTime = json['startTime']!
        }
        if (json['endTime'] !== undefined) {
            this.endTime = json['endTime']!
        }
        if (json['reasonCode'] !== undefined) {
            this.reasonCode = json['reasonCode']!.map((item: any) => new CodingReference(item))
        }
        if (json['diagnosis'] !== undefined) {
            this.diagnosis = json['diagnosis']!.map((item: any) => item)
        }
        if (json['serviceProvider'] !== undefined) {
            this.serviceProvider = json['serviceProvider']!
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
        if (json['author'] !== undefined) {
            this.author = json['author']!
        }
        if (json['performer'] !== undefined) {
            this.performer = json['performer']!
        }
        if (json['immunizations'] !== undefined) {
            this.immunizations = json['immunizations']!.map((item: any) => new Immunization(item))
        }
        if (json['observations'] !== undefined) {
            this.observations = json['observations']!.map((item: any) => new Observation(item))
        }
        if (json['notes'] !== undefined) {
            this.notes = json['notes']!.map((item: any) => new Annotation(item))
        }
        if (json['systemMetaData'] !== undefined) {
            this.systemMetaData = new SystemMetaDataEncrypted(json['systemMetaData']!)
        }
    }
}

export interface IEncounter {
    id: string
    rev?: string
    identifiers: IIdentifier[]
    codes: ICodingReference[]
    tags: ICodingReference[]
    type?: ICodingReference
    startTime?: number
    endTime?: number
    reasonCode: ICodingReference[]
    diagnosis: string[]
    serviceProvider?: string
    created?: number
    modified?: number
    endOfLife?: number
    author?: string
    performer?: string
    immunizations: IImmunization[]
    observations: IObservation[]
    notes: IAnnotation[]
    systemMetaData?: ISystemMetaDataEncrypted
}
