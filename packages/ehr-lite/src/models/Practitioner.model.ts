import { CodingReference, forceUuid, Identifier, mapTo, Property, SystemMetaDataOwner, b64_2ab, HealthcarePartyDto, ISO639_1, ua2b64 } from '@icure/typescript-common'
import { GenderEnum } from './enums/Gender.enum'
import { HumanName } from './HumanName.model'
import { Location } from './Location.model'

@mapTo(HealthcarePartyDto)
export class Practitioner {
    id: string
    rev?: string
    created?: number
    modified?: number
    identifiers: Identifier[]
    tags: Set<CodingReference>
    codes: Set<CodingReference>
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
    picture?: ArrayBuffer
    specialityCodes: Set<CodingReference>
    description: Map<ISO639_1, string>
    properties: Set<Property>
    systemMetaData?: SystemMetaDataOwner

    constructor(practitioner: IPractitioner) {
        this.id = forceUuid(practitioner.id)
        this.rev = practitioner.rev
        this.created = practitioner.created
        this.modified = practitioner.modified
        this.identifiers = practitioner.identifiers ?? []
        this.tags = practitioner.tags ?? new Set()
        this.codes = practitioner.codes ?? new Set()
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
        this.specialityCodes = practitioner.specialityCodes ?? new Set()
        this.description = practitioner.description ?? new Map()
        this.properties = practitioner.properties ?? new Set()
        this.systemMetaData = practitioner.systemMetaData
    }

    static toJSON(instance: Practitioner): any {
        const pojo: any = {}
        pojo['id'] = instance.id
        if (instance.rev !== undefined) pojo['rev'] = instance.rev
        if (instance.created !== undefined) pojo['created'] = instance.created
        if (instance.modified !== undefined) pojo['modified'] = instance.modified
        pojo['identifiers'] = instance.identifiers.map((item) => Identifier.toJSON(item))
        pojo['tags'] = Array.from([...instance.tags].map((item) => CodingReference.toJSON(item)))
        pojo['codes'] = Array.from([...instance.codes].map((item) => CodingReference.toJSON(item)))
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
        if (instance.picture !== undefined) pojo['picture'] = !!instance.picture ? ua2b64(instance.picture) : undefined
        pojo['specialityCodes'] = Array.from([...instance.specialityCodes].map((item) => CodingReference.toJSON(item)))
        pojo['description'] = Object.fromEntries([...instance.description.entries()].map(([k, v]) => [k, v]))
        pojo['properties'] = Array.from([...instance.properties].map((item) => Property.toJSON(item)))
        if (instance.systemMetaData !== undefined) pojo['systemMetaData'] = !!instance.systemMetaData ? SystemMetaDataOwner.toJSON(instance.systemMetaData) : undefined
        return pojo
    }

    static fromJSON(pojo: any): Practitioner {
        const obj = {} as IPractitioner
        obj['id'] = pojo['id']
        if (pojo['rev'] !== undefined) {
            obj['rev'] = pojo['rev']
        }
        if (pojo['created'] !== undefined) {
            obj['created'] = pojo['created']
        }
        if (pojo['modified'] !== undefined) {
            obj['modified'] = pojo['modified']
        }
        obj['identifiers'] = pojo['identifiers'].map((item: any) => Identifier.fromJSON(item))
        obj['tags'] = new Set(pojo['tags'].map((item: any) => CodingReference.fromJSON(item)))
        obj['codes'] = new Set(pojo['codes'].map((item: any) => CodingReference.fromJSON(item)))
        if (pojo['deletionDate'] !== undefined) {
            obj['deletionDate'] = pojo['deletionDate']
        }
        if (pojo['name'] !== undefined) {
            obj['name'] = pojo['name']
        }
        if (pojo['lastName'] !== undefined) {
            obj['lastName'] = pojo['lastName']
        }
        if (pojo['firstName'] !== undefined) {
            obj['firstName'] = pojo['firstName']
        }
        obj['names'] = pojo['names'].map((item: any) => HumanName.fromJSON(item))
        if (pojo['gender'] !== undefined) {
            obj['gender'] = pojo['gender']
        }
        if (pojo['civility'] !== undefined) {
            obj['civility'] = pojo['civility']
        }
        if (pojo['speciality'] !== undefined) {
            obj['speciality'] = pojo['speciality']
        }
        if (pojo['parentId'] !== undefined) {
            obj['parentId'] = pojo['parentId']
        }
        if (pojo['userId'] !== undefined) {
            obj['userId'] = pojo['userId']
        }
        obj['addresses'] = pojo['addresses'].map((item: any) => Location.fromJSON(item))
        obj['languages'] = pojo['languages'].map((item: any) => item)
        if (pojo['picture'] !== undefined) {
            obj['picture'] = !!pojo['picture'] ? b64_2ab(pojo['picture']) : undefined
        }
        obj['specialityCodes'] = new Set(pojo['specialityCodes'].map((item: any) => CodingReference.fromJSON(item)))
        obj['description'] = new Map(Object.entries(pojo['description']).map(([k, v]: [any, any]) => [k, v]))
        obj['properties'] = new Set(pojo['properties'].map((item: any) => Property.fromJSON(item)))
        if (pojo['systemMetaData'] !== undefined) {
            obj['systemMetaData'] = !!pojo['systemMetaData'] ? SystemMetaDataOwner.fromJSON(pojo['systemMetaData']) : undefined
        }
        return new Practitioner(obj)
    }
}

interface IPractitioner {
    id?: string
    rev?: string
    created?: number
    modified?: number
    identifiers?: Identifier[]
    tags?: Set<CodingReference>
    codes?: Set<CodingReference>
    deletionDate?: number
    name?: string
    lastName?: string
    firstName?: string
    names?: HumanName[]
    gender?: GenderEnum
    civility?: string
    speciality?: string
    parentId?: string
    userId?: string
    addresses?: Location[]
    languages?: string[]
    picture?: ArrayBuffer
    specialityCodes?: Set<CodingReference>
    description?: Map<ISO639_1, string>
    properties?: Set<Property>
    systemMetaData?: SystemMetaDataOwner
}
