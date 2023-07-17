import { b64_2ab, HealthcareParty, ISO639_1, ua2b64 } from '@icure/api'
import { CodingReference, forceUuid, Identifier, mapTo, Property, SystemMetaDataOwner } from '@icure/typescript-common'
import { Location } from './Location.model'

@mapTo(HealthcareParty)
export class Organisation {
    id: string
    rev?: string
    created?: number
    modified?: number
    identifiers: Identifier[]
    tags: Set<CodingReference>
    codes: Set<CodingReference>
    deletionDate?: number
    name?: string
    parentId?: string
    userId?: string
    addresses: Location[]
    languages: string[]
    picture?: ArrayBuffer
    description: Map<ISO639_1, string>
    properties: Set<Property>
    systemMetaData?: SystemMetaDataOwner

    constructor(organisation: IOrganisation) {
        this.id = forceUuid(organisation.id)
        this.rev = organisation.rev
        this.created = organisation.created
        this.modified = organisation.modified
        this.identifiers = organisation.identifiers ?? []
        this.tags = organisation.tags ?? new Set()
        this.codes = organisation.codes ?? new Set()
        this.deletionDate = organisation.deletionDate
        this.name = organisation.name
        this.parentId = organisation.parentId
        this.userId = organisation.userId
        this.addresses = organisation.addresses ?? []
        this.languages = organisation.languages ?? []
        this.picture = organisation.picture
        this.description = organisation.description ?? new Map()
        this.properties = organisation.properties ?? new Set()
        this.systemMetaData = organisation.systemMetaData
    }

    static toJSON(instance: Organisation): any {
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
        pojo['parentId'] = instance.parentId
        pojo['userId'] = instance.userId
        pojo['addresses'] = instance.addresses.map((item) => Location.toJSON(item))
        pojo['languages'] = instance.languages.map((item) => item)
        pojo['picture'] = !!instance.picture ? ua2b64(instance.picture) : undefined
        pojo['description'] = Object.fromEntries([...instance.description.entries()].map(([k, v]) => [k, v]))
        pojo['properties'] = Array.from([...instance.properties].map((item) => Property.toJSON(item)))
        pojo['systemMetaData'] = !!instance.systemMetaData ? SystemMetaDataOwner.toJSON(instance.systemMetaData) : undefined
        return pojo
    }

    static fromJSON(pojo: any): Organisation {
        return new Organisation({
            id: pojo['id'],
            rev: pojo['rev'],
            created: pojo['created'],
            modified: pojo['modified'],
            identifiers: pojo['identifiers'].map((item: any) => Identifier.fromJSON(item)),
            tags: new Set(pojo['tags'].map((item: any) => CodingReference.fromJSON(item))),
            codes: new Set(pojo['codes'].map((item: any) => CodingReference.fromJSON(item))),
            deletionDate: pojo['deletionDate'],
            name: pojo['name'],
            parentId: pojo['parentId'],
            userId: pojo['userId'],
            addresses: pojo['addresses'].map((item: any) => Location.fromJSON(item)),
            languages: pojo['languages'].map((item: any) => item),
            picture: !!pojo['picture'] ? b64_2ab(pojo['picture']) : undefined,
            description: new Map(Object.entries(pojo['description']).map(([k, v]: [any, any]) => [k, v])),
            properties: new Set(pojo['properties'].map((item: any) => Property.fromJSON(item))),
            systemMetaData: !!pojo['systemMetaData'] ? SystemMetaDataOwner.fromJSON(pojo['systemMetaData']) : undefined,
        })
    }
}

interface IOrganisation {
    id?: string
    rev?: string
    created?: number
    modified?: number
    identifiers?: Identifier[]
    tags?: Set<CodingReference>
    codes?: Set<CodingReference>
    deletionDate?: number
    name?: string
    parentId?: string
    userId?: string
    addresses?: Location[]
    languages?: string[]
    picture?: ArrayBuffer
    description?: Map<ISO639_1, string>
    properties?: Set<Property>
    systemMetaData?: SystemMetaDataOwner
}
