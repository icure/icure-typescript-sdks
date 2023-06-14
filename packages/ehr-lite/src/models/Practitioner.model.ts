import { b64_2ab, HealthcareParty, ua2b64 } from '@icure/api'
import {mapTo} from "@icure/typescript-common"
import { CodingReference } from './CodingReference.model'
import { GenderEnum } from './enums/Gender.enum'
import { HumanName } from './HumanName.model'
import { Identifier } from './Identifier.model'
import { Location } from './Location.model'
import { Property } from './Property.model'
import { SystemMetaDataOwner } from './SystemMetaDataOwner.model'

@mapTo(HealthcareParty)
export class Practitioner {
    id?: string
    rev?: string
    created?: number
    modified?: number
    identifiers?: Identifier[]
    tags?: CodingReference[]
    codes?: CodingReference[]
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
    specialityCodes?: CodingReference[]
    description?: string
    properties?: Property[]
    systemMetaData?: SystemMetaDataOwner

    constructor(practitioner?: IPractitioner | any) {
        this.id = practitioner?.id
        this.rev = practitioner?.rev
        this.created = practitioner?.created
        this.modified = practitioner?.modified
        this.identifiers = practitioner?.identifiers
        this.tags = practitioner?.tags
        this.codes = practitioner?.codes
        this.deletionDate = practitioner?.deletionDate
        this.name = practitioner?.name
        this.lastName = practitioner?.lastName
        this.firstName = practitioner?.firstName
        this.names = practitioner?.names
        this.gender = practitioner?.gender
        this.civility = practitioner?.civility
        this.speciality = practitioner?.speciality
        this.parentId = practitioner?.parentId
        this.userId = practitioner?.userId
        this.addresses = practitioner?.addresses
        this.languages = practitioner?.languages
        this.picture = practitioner?.picture
        this.specialityCodes = practitioner?.specialityCodes
        this.description = practitioner?.description
        this.properties = practitioner?.properties
        this.systemMetaData = practitioner?.systemMetaData
    }

    static toJSON(instance: Practitioner): any {
        const pojo: any = {}
        pojo['id'] = instance.id
        pojo['rev'] = instance.rev
        pojo['created'] = instance.created
        pojo['modified'] = instance.modified
        pojo['identifiers'] = instance.identifiers?.map((item) => Identifier.toJSON(item))
        pojo['tags'] = instance.tags?.map((item) => CodingReference.toJSON(item))
        pojo['codes'] = instance.codes?.map((item) => CodingReference.toJSON(item))
        pojo['deletionDate'] = instance.deletionDate
        pojo['name'] = instance.name
        pojo['lastName'] = instance.lastName
        pojo['firstName'] = instance.firstName
        pojo['names'] = instance.names?.map((item) => HumanName.toJSON(item))
        pojo['gender'] = instance.gender
        pojo['civility'] = instance.civility
        pojo['speciality'] = instance.speciality
        pojo['parentId'] = instance.parentId
        pojo['userId'] = instance.userId
        pojo['addresses'] = instance.addresses?.map((item) => Location.toJSON(item))
        pojo['languages'] = instance.languages?.map((item) => item)
        pojo['picture'] = !!instance.picture ? ua2b64(instance.picture) : undefined
        pojo['specialityCodes'] = instance.specialityCodes?.map((item) => CodingReference.toJSON(item))
        pojo['description'] = instance.description
        pojo['properties'] = instance.properties?.map((item) => Property.toJSON(item))
        pojo['systemMetaData'] = !!instance.systemMetaData ? SystemMetaDataOwner.toJSON(instance.systemMetaData) : undefined
        return pojo
    }

    static fromJSON(pojo: any): Practitioner {
        return new Practitioner({
            id: pojo['id'],
            rev: pojo['rev'],
            created: pojo['created'],
            modified: pojo['modified'],
            identifiers: pojo['identifiers']?.map((item: any) => Identifier.fromJSON(item)),
            tags: pojo['tags']?.map((item: any) => CodingReference.fromJSON(item)),
            codes: pojo['codes']?.map((item: any) => CodingReference.fromJSON(item)),
            deletionDate: pojo['deletionDate'],
            name: pojo['name'],
            lastName: pojo['lastName'],
            firstName: pojo['firstName'],
            names: pojo['names']?.map((item: any) => HumanName.fromJSON(item)),
            gender: pojo['gender'],
            civility: pojo['civility'],
            speciality: pojo['speciality'],
            parentId: pojo['parentId'],
            userId: pojo['userId'],
            addresses: pojo['addresses']?.map((item: any) => Location.fromJSON(item)),
            languages: pojo['languages']?.map((item: any) => item),
            picture: !!pojo['picture'] ? b64_2ab(pojo['picture']) : undefined,
            specialityCodes: pojo['specialityCodes']?.map((item: any) => CodingReference.fromJSON(item)),
            description: pojo['description'],
            properties: pojo['properties']?.map((item: any) => Property.fromJSON(item)),
            systemMetaData: !!pojo['systemMetaData'] ? SystemMetaDataOwner.fromJSON(pojo['systemMetaData']) : undefined,
        })
    }
}

interface IPractitioner {
    id?: string
    rev?: string
    created?: number
    modified?: number
    tags?: CodingReference[]
    codes?: CodingReference[]
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
    specialityCodes?: CodingReference[]
    description?: string
    properties?: Property[]
    systemMetaData?: SystemMetaDataOwner
}
