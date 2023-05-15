import { b64_2ab, HealthcareParty, ua2b64 } from '@icure/api'
import { mapTo } from '../mappings/mapper'
import { CodingReference } from './CodingReference.model'
import { Identifier } from "./Identifier.model"
import { Location } from './Location.model'
import { Property } from './Property.model'
import { SystemMetaDataOwner } from './SystemMetaDataOwner.model'

@mapTo(HealthcareParty)
export class Organisation {
    id?: string
    rev?: string
    created?: number
    modified?: number
    identifiers?: Identifier[]
    tags?: CodingReference[]
    codes?: CodingReference[]
    deletionDate?: number
    name?: string
    parentId?: string
    userId?: string
    addresses?: Location[]
    languages?: string[]
    picture?: ArrayBuffer
    description?: string
    properties?: Property[]
    systemMetaData?: SystemMetaDataOwner

    constructor(organisation: IOrganisation | any) {
        this.id = organisation.id
        this.rev = organisation.rev
        this.created = organisation.created
        this.modified = organisation.modified
        this.identifiers = organisation.identifiers
        this.tags = organisation.tags
        this.codes = organisation.codes
        this.deletionDate = organisation.deletionDate
        this.name = organisation.name
        this.parentId = organisation.parentId
        this.userId = organisation.userId
        this.addresses = organisation.addresses
        this.languages = organisation.languages
        this.picture = organisation.picture
        this.description = organisation.description
        this.properties = organisation.properties
        this.systemMetaData = organisation.systemMetaData
    }

    static toJSON(instance: Organisation): any {
        const pojo: any = {}
        pojo["id"] = instance.id
        pojo["rev"] = instance.rev
        pojo["created"] = instance.created
        pojo["modified"] = instance.modified
        pojo["identifiers"] = instance.identifiers?.map(item => Identifier.toJSON(item))
        pojo["tags"] = instance.tags?.map(item => CodingReference.toJSON(item))
        pojo["codes"] = instance.codes?.map(item => CodingReference.toJSON(item))
        pojo["deletionDate"] = instance.deletionDate
        pojo["name"] = instance.name
        pojo["parentId"] = instance.parentId
        pojo["addresses"] = instance.addresses?.map(item => Location.toJSON(item))
        pojo["languages"] = instance.languages?.map(item => item)
        pojo["picture"] = !!instance.picture ? ua2b64(instance.picture) : undefined
        pojo["description"] = instance.description
        pojo["properties"] = instance.properties?.map(item => Property.toJSON(item))
        pojo["systemMetaData"] = !!instance.systemMetaData ? SystemMetaDataOwner.toJSON(instance.systemMetaData) : undefined
        return pojo
    }

    static fromJSON(pojo: any): Organisation {
        return new Organisation({id: pojo["id"], rev: pojo["rev"], created: pojo["created"], modified: pojo["modified"], identifiers: pojo["identifiers"]?.map((item: any) => Identifier.fromJSON(item)), tags: pojo["tags"]?.map((item: any) => CodingReference.fromJSON(item)), codes: pojo["codes"]?.map((item: any) => CodingReference.fromJSON(item)), deletionDate: pojo["deletionDate"], name: pojo["name"], parentId: pojo["parentId"], addresses: pojo["addresses"]?.map((item: any) => Location.fromJSON(item)), languages: pojo["languages"]?.map((item: any) => item), picture: !!pojo["picture"] ? b64_2ab(pojo["picture"]) : undefined, description: pojo["description"], properties: pojo["properties"]?.map((item: any) => Property.fromJSON(item)), systemMetaData: !!pojo["systemMetaData"] ? SystemMetaDataOwner.fromJSON(pojo["systemMetaData"]) : undefined})
    }
}

interface IOrganisation {
    id?: string
    rev?: string
    created?: number
    modified?: number
    identifiers?: Identifier[]
    tags?: CodingReference[]
    codes?: CodingReference[]
    deletionDate?: number
    name?: string
    parentId?: string
    userId?: string
    addresses?: Location[]
    languages?: string[]
    picture?: ArrayBuffer
    description?: string
    properties?: Property[]
    systemMetaData?: SystemMetaDataOwner
}
