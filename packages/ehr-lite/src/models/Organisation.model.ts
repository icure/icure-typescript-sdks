import { base64string, CodingReference, EntityId, forceUuid, HealthcarePartyDto, ICodingReference, Identifier, IIdentifier, IProperty, ISO639_1, ISystemMetaDataOwner, mapTo, Property, SystemMetaDataOwner } from '@icure/typescript-common'
import { ILocation, Location } from './Location.model'

@mapTo(HealthcarePartyDto)
export class Organisation implements IOrganisation {
    id: EntityId
    rev?: string
    created?: number
    modified?: number
    identifiers: Identifier[] = []
    tags: CodingReference[] = []
    codes: CodingReference[] = []
    deletionDate?: number
    name?: string
    parentId?: string
    userId?: string
    addresses: Location[] = []
    languages: string[] = []
    picture?: base64string
    description: Record<ISO639_1, string> = {} as Record<ISO639_1, string>
    properties: Property[] = []
    systemMetaData?: SystemMetaDataOwner

    toJSON(): IOrganisation {
        return {
            id: this.id,
            rev: this.rev,
            created: this.created,
            modified: this.modified,
            identifiers: this.identifiers.map((item) => item.toJSON()),
            tags: this.tags.map((item) => item.toJSON()),
            codes: this.codes.map((item) => item.toJSON()),
            deletionDate: this.deletionDate,
            name: this.name,
            parentId: this.parentId,
            userId: this.userId,
            addresses: this.addresses.map((item) => item.toJSON()),
            languages: this.languages.map((item) => item),
            picture: this.picture,
            description: { ...this.description },
            properties: this.properties.map((item) => item.toJSON()),
            systemMetaData: !!this.systemMetaData ? this.systemMetaData.toJSON() : undefined,
        }
    }

    constructor(json: Partial<IOrganisation>) {
        this.id = forceUuid(json['id']!)
        if (json['rev'] !== undefined) {
            this.rev = json['rev']!
        }
        if (json['created'] !== undefined) {
            this.created = json['created']!
        }
        if (json['modified'] !== undefined) {
            this.modified = json['modified']!
        }
        if (json['identifiers'] !== undefined) {
            this.identifiers = json['identifiers']!.map((item: any) => new Identifier(item))
        }
        if (json['tags'] !== undefined) {
            this.tags = json['tags']!.map((item: any) => new CodingReference(item))
        }
        if (json['codes'] !== undefined) {
            this.codes = json['codes']!.map((item: any) => new CodingReference(item))
        }
        if (json['deletionDate'] !== undefined) {
            this.deletionDate = json['deletionDate']!
        }
        if (json['name'] !== undefined) {
            this.name = json['name']!
        }
        if (json['parentId'] !== undefined) {
            this.parentId = json['parentId']!
        }
        if (json['userId'] !== undefined) {
            this.userId = json['userId']!
        }
        if (json['addresses'] !== undefined) {
            this.addresses = json['addresses']!.map((item: any) => new Location(item))
        }
        if (json['languages'] !== undefined) {
            this.languages = json['languages']!.map((item: any) => item)
        }
        if (json['picture'] !== undefined) {
            this.picture = json['picture']!
        }
        if (json['description'] !== undefined) {
            this.description = { ...json['description']! }
        }
        if (json['properties'] !== undefined) {
            this.properties = json['properties']!.map((item: any) => new Property(item))
        }
        if (json['systemMetaData'] !== undefined) {
            this.systemMetaData = new SystemMetaDataOwner(json['systemMetaData']!)
        }
    }
}

export interface IOrganisation {
    id: EntityId
    rev?: string
    created?: number
    modified?: number
    identifiers: IIdentifier[]
    tags: ICodingReference[]
    codes: ICodingReference[]
    deletionDate?: number
    name?: string
    parentId?: string
    userId?: string
    addresses: ILocation[]
    languages: string[]
    picture?: base64string
    description: Record<ISO639_1, string>
    properties: IProperty[]
    systemMetaData?: ISystemMetaDataOwner
}
