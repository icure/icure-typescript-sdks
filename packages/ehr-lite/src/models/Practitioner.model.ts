import { b64_2ab, HealthcareParty, ISO639_1, ua2b64 } from '@icure/api'
import { CodingReference, forceUuid, Identifier, mapTo, Property, SystemMetaDataOwner } from '@icure/typescript-common'
import { GenderEnum } from './enums/Gender.enum'
import { HumanName } from './HumanName.model'
import { Location } from './Location.model'

@mapTo(HealthcareParty)
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
        pojo['rev'] = instance.rev
        pojo['created'] = instance.created
        pojo['modified'] = instance.modified
        pojo['identifiers'] = instance.identifiers.map((item) => Identifier.toJSON(item))
        pojo['tags'] = Array.from([...instance.tags].map((item) => CodingReference.toJSON(item)))
        pojo['codes'] = Array.from([...instance.codes].map((item) => CodingReference.toJSON(item)))
        pojo['deletionDate'] = instance.deletionDate
        pojo['name'] = instance.name
        pojo['lastName'] = instance.lastName
        pojo['firstName'] = instance.firstName
        pojo['names'] = instance.names.map((item) => HumanName.toJSON(item))
        pojo['gender'] = instance.gender
        pojo['civility'] = instance.civility
        pojo['speciality'] = instance.speciality
        pojo['parentId'] = instance.parentId
        pojo['userId'] = instance.userId
        pojo['addresses'] = instance.addresses.map((item) => Location.toJSON(item))
        pojo['languages'] = instance.languages.map((item) => item)
        pojo['picture'] = !!instance.picture ? ua2b64(instance.picture) : undefined
        pojo['specialityCodes'] = Array.from([...instance.specialityCodes].map((item) => CodingReference.toJSON(item)))
        pojo['description'] = Object.fromEntries([...instance.description.entries()].map(([k, v]) => [k, v]))
        pojo['properties'] = Array.from([...instance.properties].map((item) => Property.toJSON(item)))
        pojo['systemMetaData'] = !!instance.systemMetaData ? SystemMetaDataOwner.toJSON(instance.systemMetaData) : undefined
        return pojo
    }

    static fromJSON(pojo: any): Practitioner {
        return new Practitioner({
            id: pojo['id'],
            rev: pojo['rev'],
            created: pojo['created'],
            modified: pojo['modified'],
            identifiers: pojo['identifiers'].map((item: any) => Identifier.fromJSON(item)),
            tags: new Set(pojo['tags'].map((item: any) => CodingReference.fromJSON(item))),
            codes: new Set(pojo['codes'].map((item: any) => CodingReference.fromJSON(item))),
            deletionDate: pojo['deletionDate'],
            name: pojo['name'],
            lastName: pojo['lastName'],
            firstName: pojo['firstName'],
            names: pojo['names'].map((item: any) => HumanName.fromJSON(item)),
            gender: pojo['gender'],
            civility: pojo['civility'],
            speciality: pojo['speciality'],
            parentId: pojo['parentId'],
            userId: pojo['userId'],
            addresses: pojo['addresses'].map((item: any) => Location.fromJSON(item)),
            languages: pojo['languages'].map((item: any) => item),
            picture: !!pojo['picture'] ? b64_2ab(pojo['picture']) : undefined,
            specialityCodes: new Set(pojo['specialityCodes'].map((item: any) => CodingReference.fromJSON(item))),
            description: new Map(Object.entries(pojo['description']).map(([k, v]: [any, any]) => [k, v])),
            properties: new Set(pojo['properties'].map((item: any) => Property.fromJSON(item))),
            systemMetaData: !!pojo['systemMetaData'] ? SystemMetaDataOwner.fromJSON(pojo['systemMetaData']) : undefined,
        })
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
