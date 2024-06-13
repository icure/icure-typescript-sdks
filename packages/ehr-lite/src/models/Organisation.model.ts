import { CodingReference, HealthcarePartyDto, ISO639_1, Identifier, Property, SystemMetaDataOwner, base64string, forceUuid, mapTo } from '@icure/typescript-common'
import { Location } from './Location.model'

@mapTo(HealthcarePartyDto)
export class Organisation implements IOrganisation {
    id: string
    rev?: string
    created?: number
    modified?: number
    identifiers: Identifier[]
    tags: Array<CodingReference>
    codes: Array<CodingReference>
    deletionDate?: number
    name?: string
    parentId?: string
    userId?: string
    addresses: Location[]
    languages: string[]
    picture?: base64string
    description: Record<ISO639_1, string>
    properties: Array<Property>
    systemMetaData?: SystemMetaDataOwner

    constructor(organisation: Partial<IOrganisation>) {
        this.id = forceUuid(organisation.id)
        this.rev = organisation.rev
        this.created = organisation.created
        this.modified = organisation.modified
        this.identifiers = organisation.identifiers ?? []
        this.tags = organisation.tags ?? []
        this.codes = organisation.codes ?? []
        this.deletionDate = organisation.deletionDate
        this.name = organisation.name
        this.parentId = organisation.parentId
        this.userId = organisation.userId
        this.addresses = organisation.addresses ?? []
        this.languages = organisation.languages ?? []
        this.picture = organisation.picture
        this.description = organisation.description ?? ({} as Record<ISO639_1, string>)
        this.properties = organisation.properties ?? []
        this.systemMetaData = organisation.systemMetaData
    }

    static toJSON(instance: Organisation): IOrganisation {
        const pojo: IOrganisation = {} as IOrganisation
        pojo['id'] = instance.id
        if (instance.rev !== undefined) pojo['rev'] = instance.rev
        if (instance.created !== undefined) pojo['created'] = instance.created
        if (instance.modified !== undefined) pojo['modified'] = instance.modified
        pojo['identifiers'] = instance.identifiers.map((item) => Identifier.toJSON(item))
        pojo['tags'] = instance.tags.map((item) => CodingReference.toJSON(item))
        pojo['codes'] = instance.codes.map((item) => CodingReference.toJSON(item))
        if (instance.deletionDate !== undefined) pojo['deletionDate'] = instance.deletionDate
        if (instance.name !== undefined) pojo['name'] = instance.name
        if (instance.parentId !== undefined) pojo['parentId'] = instance.parentId
        if (instance.userId !== undefined) pojo['userId'] = instance.userId
        pojo['addresses'] = instance.addresses.map((item) => Location.toJSON(item))
        pojo['languages'] = instance.languages.map((item) => item)
        if (instance.picture !== undefined) pojo['picture'] = instance.picture
        pojo['description'] = { ...instance.description }
        pojo['properties'] = instance.properties.map((item) => Property.toJSON(item))
        if (instance.systemMetaData !== undefined) pojo['systemMetaData'] = !!instance.systemMetaData ? SystemMetaDataOwner.toJSON(instance.systemMetaData) : undefined
        return pojo
    }

    static fromJSON(pojo: IOrganisation): Organisation {
        const obj = {} as IOrganisation
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
        obj['description'] = { ...pojo['description'] }
        obj['properties'] = pojo['properties'].map((item: any) => Property.fromJSON(item))
        if (pojo['systemMetaData'] !== undefined) {
            obj['systemMetaData'] = !!pojo['systemMetaData']! ? SystemMetaDataOwner.fromJSON(pojo['systemMetaData']!) : undefined
        }
        return new Organisation(obj)
    }
}

export interface IOrganisation {
    id: string
    rev?: string
    created?: number
    modified?: number
    identifiers: Identifier[]
    tags: Array<CodingReference>
    codes: Array<CodingReference>
    deletionDate?: number
    name?: string
    parentId?: string
    userId?: string
    addresses: Location[]
    languages: string[]
    picture?: base64string
    description: Record<ISO639_1, string>
    properties: Array<Property>
    systemMetaData?: SystemMetaDataOwner
}
