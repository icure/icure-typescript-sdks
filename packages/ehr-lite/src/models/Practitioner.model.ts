import { CodingReference, HealthcarePartyDto, ISO639_1, Identifier, Property, SystemMetaDataOwner, base64string, forceUuid, mapTo } from '@icure/typescript-common'
import { HumanName } from './HumanName.model'
import { Location } from './Location.model'
import { GenderEnum } from './enums/Gender.enum'

@mapTo(HealthcarePartyDto)
export class Practitioner implements IPractitioner {
    id: string
    rev?: string
    created?: number
    modified?: number
    identifiers: Identifier[]
    tags: Array<CodingReference>
    codes: Array<CodingReference>
    deletionDate?: number
    name?: string
    lastName?: string
    firstName?: string
    names: HumanName[]
    gender?: GenderEnum
    civility?: string
    speciality?: string
    parentId?: string
    userId?: string
    addresses: Location[]
    languages: string[]
    picture?: base64string
    specialityCodes: Array<CodingReference>
    description: Record<ISO639_1, string>
    properties: Array<Property>
    systemMetaData?: SystemMetaDataOwner

    constructor(practitioner: Partial<IPractitioner>) {
        this.id = forceUuid(practitioner.id)
        this.rev = practitioner.rev
        this.created = practitioner.created
        this.modified = practitioner.modified
        this.identifiers = practitioner.identifiers ?? []
        this.tags = practitioner.tags ?? []
        this.codes = practitioner.codes ?? []
        this.deletionDate = practitioner.deletionDate
        this.name = practitioner.name
        this.lastName = practitioner.lastName
        this.firstName = practitioner.firstName
        this.names = practitioner.names ?? []
        this.gender = practitioner.gender
        this.civility = practitioner.civility
        this.speciality = practitioner.speciality
        this.parentId = practitioner.parentId
        this.userId = practitioner.userId
        this.addresses = practitioner.addresses ?? []
        this.languages = practitioner.languages ?? []
        this.picture = practitioner.picture
        this.specialityCodes = practitioner.specialityCodes ?? []
        this.description = practitioner.description ?? ({} as Record<ISO639_1, string>)
        this.properties = practitioner.properties ?? []
        this.systemMetaData = practitioner.systemMetaData
    }

    static toJSON(instance: Practitioner): IPractitioner {
        const pojo: IPractitioner = {} as IPractitioner
        pojo['id'] = instance.id
        if (instance.rev !== undefined) pojo['rev'] = instance.rev
        if (instance.created !== undefined) pojo['created'] = instance.created
        if (instance.modified !== undefined) pojo['modified'] = instance.modified
        pojo['identifiers'] = instance.identifiers.map((item) => Identifier.toJSON(item))
        pojo['tags'] = instance.tags.map((item) => CodingReference.toJSON(item))
        pojo['codes'] = instance.codes.map((item) => CodingReference.toJSON(item))
        if (instance.deletionDate !== undefined) pojo['deletionDate'] = instance.deletionDate
        if (instance.name !== undefined) pojo['name'] = instance.name
        if (instance.lastName !== undefined) pojo['lastName'] = instance.lastName
        if (instance.firstName !== undefined) pojo['firstName'] = instance.firstName
        pojo['names'] = instance.names.map((item) => HumanName.toJSON(item))
        if (instance.gender !== undefined) pojo['gender'] = instance.gender
        if (instance.civility !== undefined) pojo['civility'] = instance.civility
        if (instance.speciality !== undefined) pojo['speciality'] = instance.speciality
        if (instance.parentId !== undefined) pojo['parentId'] = instance.parentId
        if (instance.userId !== undefined) pojo['userId'] = instance.userId
        pojo['addresses'] = instance.addresses.map((item) => Location.toJSON(item))
        pojo['languages'] = instance.languages.map((item) => item)
        if (instance.picture !== undefined) pojo['picture'] = instance.picture
        pojo['specialityCodes'] = instance.specialityCodes.map((item) => CodingReference.toJSON(item))
        pojo['description'] = { ...instance.description }
        pojo['properties'] = instance.properties.map((item) => Property.toJSON(item))
        if (instance.systemMetaData !== undefined) pojo['systemMetaData'] = !!instance.systemMetaData ? SystemMetaDataOwner.toJSON(instance.systemMetaData) : undefined
        return pojo
    }

    static fromJSON(pojo: IPractitioner): Practitioner {
        const obj = {} as IPractitioner
        obj['id'] = pojo['id']
        if (pojo['rev'] !== undefined) {
            obj['rev'] = pojo['rev']!
        }
        if (pojo['created'] !== undefined) {
            obj['created'] = pojo['created']!
        }
        if (pojo['modified'] !== undefined) {
            obj['modified'] = pojo['modified']!
        }
        obj['identifiers'] = pojo['identifiers'].map((item: any) => Identifier.fromJSON(item))
        obj['tags'] = pojo['tags'].map((item: any) => CodingReference.fromJSON(item))
        obj['codes'] = pojo['codes'].map((item: any) => CodingReference.fromJSON(item))
        if (pojo['deletionDate'] !== undefined) {
            obj['deletionDate'] = pojo['deletionDate']!
        }
        if (pojo['name'] !== undefined) {
            obj['name'] = pojo['name']!
        }
        if (pojo['lastName'] !== undefined) {
            obj['lastName'] = pojo['lastName']!
        }
        if (pojo['firstName'] !== undefined) {
            obj['firstName'] = pojo['firstName']!
        }
        obj['names'] = pojo['names'].map((item: any) => HumanName.fromJSON(item))
        if (pojo['gender'] !== undefined) {
            obj['gender'] = pojo['gender']!
        }
        if (pojo['civility'] !== undefined) {
            obj['civility'] = pojo['civility']!
        }
        if (pojo['speciality'] !== undefined) {
            obj['speciality'] = pojo['speciality']!
        }
        if (pojo['parentId'] !== undefined) {
            obj['parentId'] = pojo['parentId']!
        }
        if (pojo['userId'] !== undefined) {
            obj['userId'] = pojo['userId']!
        }
        obj['addresses'] = pojo['addresses'].map((item: any) => Location.fromJSON(item))
        obj['languages'] = pojo['languages'].map((item: any) => item)
        if (pojo['picture'] !== undefined) {
            obj['picture'] = pojo['picture']!
        }
        obj['specialityCodes'] = pojo['specialityCodes'].map((item: any) => CodingReference.fromJSON(item))
        obj['description'] = { ...pojo['description'] }
        obj['properties'] = pojo['properties'].map((item: any) => Property.fromJSON(item))
        if (pojo['systemMetaData'] !== undefined) {
            obj['systemMetaData'] = !!pojo['systemMetaData']! ? SystemMetaDataOwner.fromJSON(pojo['systemMetaData']!) : undefined
        }
        return new Practitioner(obj)
    }
}

export interface IPractitioner {
    id?: string
    rev?: string
    created?: number
    modified?: number
    identifiers: Identifier[]
    tags: Array<CodingReference>
    codes: Array<CodingReference>
    deletionDate?: number
    name?: string
    lastName?: string
    firstName?: string
    names: HumanName[]
    gender?: GenderEnum
    civility?: string
    speciality?: string
    parentId?: string
    userId?: string
    addresses: Location[]
    languages: string[]
    picture?: base64string
    specialityCodes: Array<CodingReference>
    description: Record<ISO639_1, string>
    properties: Array<Property>
    systemMetaData?: SystemMetaDataOwner
}
