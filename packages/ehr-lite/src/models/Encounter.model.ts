import { Annotation, CodingReference, ContactDto, Identifier, mapTo, SystemMetaDataEncrypted } from '@icure/typescript-common'
import { Immunization } from './Immunization.model'
import { Observation } from './Observation.model'

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
 * @param serviceProvider The provider or organization who is responsible for the encounter.
 * @param notes The list of notes associated with the encounter.
 * @param systemMetaData System metadata
 */
@mapTo(ContactDto)
export class Encounter {
    id: string
    rev?: string
    identifiers?: Identifier[]
    codes: CodingReference[]
    tags: CodingReference[]
    type?: CodingReference
    startTime?: number
    endTime?: number
    reasonCode?: CodingReference[]
    diagnosis?: string[]
    serviceProvider?: string
    created?: number
    modified?: number
    endOfLife?: number
    author?: string
    performer?: string
    immunizations?: Immunization[]
    observations?: Observation[]
    notes?: Annotation[]
    systemMetaData?: SystemMetaDataEncrypted

    constructor(encounter: IEncounter) {
        this.id = encounter.id
        this.rev = encounter.rev
        this.identifiers = encounter.identifiers
        this.codes = encounter.codes ?? []
        this.tags = encounter.tags ?? []
        this.type = encounter.type
        this.startTime = encounter.startTime
        this.endTime = encounter.endTime
        this.reasonCode = encounter.reasonCode
        this.diagnosis = encounter.diagnosis
        this.serviceProvider = encounter.serviceProvider
        this.created = encounter.created
        this.modified = encounter.modified
        this.endOfLife = encounter.endOfLife
        this.author = encounter.author
        this.performer = encounter.performer
        this.immunizations = encounter.immunizations
        this.observations = encounter.observations
        this.notes = encounter.notes
        this.systemMetaData = encounter.systemMetaData
    }

    static toJSON(instance: Encounter): any {
        const pojo: any = {}
        pojo['id'] = instance.id
        if (instance.rev !== undefined) pojo['rev'] = instance.rev
        if (instance.identifiers !== undefined) pojo['identifiers'] = instance.identifiers?.map((item) => Identifier.toJSON(item))
        pojo['codes'] = instance.codes.map((item) => CodingReference.toJSON(item))
        pojo['tags'] = instance.tags.map((item) => CodingReference.toJSON(item))
        if (instance.type !== undefined) pojo['type'] = !!instance.type ? CodingReference.toJSON(instance.type) : undefined
        if (instance.startTime !== undefined) pojo['startTime'] = instance.startTime
        if (instance.endTime !== undefined) pojo['endTime'] = instance.endTime
        if (instance.reasonCode !== undefined) pojo['reasonCode'] = instance.reasonCode?.map((item) => CodingReference.toJSON(item))
        if (instance.diagnosis !== undefined) pojo['diagnosis'] = instance.diagnosis?.map((item) => item)
        if (instance.serviceProvider !== undefined) pojo['serviceProvider'] = instance.serviceProvider
        if (instance.created !== undefined) pojo['created'] = instance.created
        if (instance.modified !== undefined) pojo['modified'] = instance.modified
        if (instance.endOfLife !== undefined) pojo['endOfLife'] = instance.endOfLife
        if (instance.author !== undefined) pojo['author'] = instance.author
        if (instance.performer !== undefined) pojo['performer'] = instance.performer
        if (instance.immunizations !== undefined) pojo['immunizations'] = instance.immunizations?.map((item) => Immunization.toJSON(item))
        if (instance.observations !== undefined) pojo['observations'] = instance.observations?.map((item) => Observation.toJSON(item))
        if (instance.notes !== undefined) pojo['notes'] = instance.notes?.map((item) => Annotation.toJSON(item))
        if (instance.systemMetaData !== undefined) pojo['systemMetaData'] = !!instance.systemMetaData ? SystemMetaDataEncrypted.toJSON(instance.systemMetaData) : undefined
        return pojo
    }

    static fromJSON(pojo: any): Encounter {
        const obj = {} as IEncounter
        obj['id'] = pojo['id']
        if (pojo['rev'] !== undefined) {
            obj['rev'] = pojo['rev']
        }
        if (pojo['identifiers'] !== undefined) {
            obj['identifiers'] = pojo['identifiers']?.map((item: any) => Identifier.fromJSON(item))
        }
        obj['codes'] = pojo['codes'].map((item: any) => CodingReference.fromJSON(item))
        obj['tags'] = pojo['tags'].map((item: any) => CodingReference.fromJSON(item))
        if (pojo['type'] !== undefined) {
            obj['type'] = !!pojo['type'] ? CodingReference.fromJSON(pojo['type']) : undefined
        }
        if (pojo['startTime'] !== undefined) {
            obj['startTime'] = pojo['startTime']
        }
        if (pojo['endTime'] !== undefined) {
            obj['endTime'] = pojo['endTime']
        }
        if (pojo['reasonCode'] !== undefined) {
            obj['reasonCode'] = pojo['reasonCode']?.map((item: any) => CodingReference.fromJSON(item))
        }
        if (pojo['diagnosis'] !== undefined) {
            obj['diagnosis'] = pojo['diagnosis']?.map((item: any) => item)
        }
        if (pojo['serviceProvider'] !== undefined) {
            obj['serviceProvider'] = pojo['serviceProvider']
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
        if (pojo['author'] !== undefined) {
            obj['author'] = pojo['author']
        }
        if (pojo['performer'] !== undefined) {
            obj['performer'] = pojo['performer']
        }
        if (pojo['immunizations'] !== undefined) {
            obj['immunizations'] = pojo['immunizations']?.map((item: any) => Immunization.fromJSON(item))
        }
        if (pojo['observations'] !== undefined) {
            obj['observations'] = pojo['observations']?.map((item: any) => Observation.fromJSON(item))
        }
        if (pojo['notes'] !== undefined) {
            obj['notes'] = pojo['notes']?.map((item: any) => Annotation.fromJSON(item))
        }
        if (pojo['systemMetaData'] !== undefined) {
            obj['systemMetaData'] = !!pojo['systemMetaData'] ? SystemMetaDataEncrypted.fromJSON(pojo['systemMetaData']) : undefined
        }
        return new Encounter(obj)
    }
}

interface IEncounter {
    id: string
    rev?: string
    identifiers?: Identifier[]
    codes?: CodingReference[]
    tags?: CodingReference[]
    type?: CodingReference
    startTime?: number
    endTime?: number
    reasonCode?: CodingReference[]
    diagnosis?: string[]
    serviceProvider?: string
    created?: number
    modified?: number
    endOfLife?: number
    author?: string
    performer?: string
    immunizations?: Immunization[]
    observations?: Observation[]
    notes?: Annotation[]
    systemMetaData?: SystemMetaDataEncrypted
}
