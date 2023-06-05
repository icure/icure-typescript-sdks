import { b64_2ab, Patient as PatientEntity, ua2b64 } from '@icure/api'
import { mapTo } from '../mappings/mapper'
import { Annotation } from './Annotation.model'
import { CodingReference } from './CodingReference.model'
import { GenderEnum } from './enums/Gender.enum'
import { PatientDeactivationReasonEnum } from './enums/PatientDeactivationReason.enum'
import { PatientPersonalStatusEnum } from './enums/PatientPersonalStatus.enum'
import { HumanName } from './HumanName.model'
import { Identifier } from './Identifier.model'
import { Location } from './Location.model'
import { Property } from './Property.model'
import { RelatedPerson } from './RelatedPerson.model'
import { RelatedPractitioner } from './RelatedPractitioner.model'
import { SystemMetaDataOwnerEncrypted } from './SystemMetaDataOwnerEncrypted.model'

@mapTo(PatientEntity)
export class Patient {
    id?: string
    rev?: string
    identifiers?: Identifier[]
    created?: number
    modified?: number
    author?: string
    responsible?: string
    tags?: CodingReference[]
    codes?: CodingReference[]
    endOfLife?: number
    deletionDate?: number
    names?: HumanName[]
    languages?: string[]
    addresses?: Location[]
    civility?: string
    gender?: GenderEnum
    birthSex?: GenderEnum
    mergeToPatientId?: string
    mergedIds?: string[]
    active?: boolean
    deactivationDate?: number
    deactivationReason?: PatientDeactivationReasonEnum
    ssin?: string
    personalStatus?: PatientPersonalStatusEnum
    dateOfBirth?: number
    dateOfDeath?: number
    placeOfBirth?: string
    placeOfDeath?: string
    deceased?: boolean
    education?: string
    profession?: string
    notes?: Annotation[]
    nationality?: string
    race?: string
    ethnicity?: string
    picture?: ArrayBuffer
    externalId?: string
    relatives?: RelatedPerson[]
    patientPractitioners?: RelatedPractitioner[]
    patientProfessions?: CodingReference[]
    properties?: Property[]
    systemMetaData?: SystemMetaDataOwnerEncrypted

    constructor(patient?: IPatient | any) {
        this.id = patient?.id
        this.rev = patient?.rev
        this.identifiers = patient?.identifiers
        this.created = patient?.created
        this.modified = patient?.modified
        this.author = patient?.author
        this.responsible = patient?.responsible
        this.tags = patient?.tags
        this.codes = patient?.codes
        this.endOfLife = patient?.endOfLife
        this.deletionDate = patient?.deletionDate
        this.names = patient?.name
        this.languages = patient?.languages
        this.addresses = patient?.addresses
        this.civility = patient?.civility
        this.gender = patient?.gender
        this.birthSex = patient?.birthSex
        this.mergeToPatientId = patient?.mergeToPatientId
        this.mergedIds = patient?.mergedIds
        this.active = patient?.active
        this.deactivationDate = patient?.deactivationDate
        this.deactivationReason = patient?.deactivationReason
        this.ssin = patient?.ssin
        this.personalStatus = patient?.personalStatus
        this.dateOfBirth = patient?.dateOfBirth
        this.dateOfDeath = patient?.dateOfDeath
        this.placeOfBirth = patient?.placeOfBirth
        this.placeOfDeath = patient?.placeOfDeath
        this.deceased = patient?.deceased
        this.education = patient?.education
        this.profession = patient?.profession
        this.notes = patient?.notes
        this.nationality = patient?.nationality
        this.race = patient?.race
        this.ethnicity = patient?.ethnicity
        this.picture = patient?.picture
        this.externalId = patient?.externalId
        this.relatives = patient?.relatives
        this.patientPractitioners = patient?.patientPractioners
        this.patientProfessions = patient?.patientProfessions
        this.properties = patient?.properties
        this.systemMetaData = patient?.systemMetaData
    }

    static toJSON(instance: Patient): any {
        const pojo: any = {}
        pojo['id'] = instance.id
        pojo['rev'] = instance.rev
        pojo['identifiers'] = instance.identifiers?.map((item) => Identifier.toJSON(item))
        pojo['created'] = instance.created
        pojo['modified'] = instance.modified
        pojo['author'] = instance.author
        pojo['responsible'] = instance.responsible
        pojo['tags'] = instance.tags?.map((item) => CodingReference.toJSON(item))
        pojo['codes'] = instance.codes?.map((item) => CodingReference.toJSON(item))
        pojo['endOfLife'] = instance.endOfLife
        pojo['deletionDate'] = instance.deletionDate
        pojo['names'] = instance.names?.map((item) => HumanName.toJSON(item))
        pojo['languages'] = instance.languages?.map((item) => item)
        pojo['addresses'] = instance.addresses?.map((item) => Location.toJSON(item))
        pojo['civility'] = instance.civility
        pojo['gender'] = instance.gender
        pojo['birthSex'] = instance.birthSex
        pojo['mergeToPatientId'] = instance.mergeToPatientId
        pojo['mergedIds'] = instance.mergedIds?.map((item) => item)
        pojo['active'] = instance.active
        pojo['deactivationDate'] = instance.deactivationDate
        pojo['deactivationReason'] = instance.deactivationReason
        pojo['ssin'] = instance.ssin
        pojo['personalStatus'] = instance.personalStatus
        pojo['dateOfBirth'] = instance.dateOfBirth
        pojo['dateOfDeath'] = instance.dateOfDeath
        pojo['placeOfBirth'] = instance.placeOfBirth
        pojo['placeOfDeath'] = instance.placeOfDeath
        pojo['deceased'] = instance.deceased
        pojo['education'] = instance.education
        pojo['profession'] = instance.profession
        pojo['notes'] = instance.notes?.map((item) => Annotation.toJSON(item))
        pojo['nationality'] = instance.nationality
        pojo['race'] = instance.race
        pojo['ethnicity'] = instance.ethnicity
        pojo['picture'] = !!instance.picture ? ua2b64(instance.picture) : undefined
        pojo['externalId'] = instance.externalId
        pojo['relatives'] = instance.relatives?.map((item) => RelatedPerson.toJSON(item))
        pojo['patientPractitioners'] = instance.patientPractitioners?.map((item) => RelatedPractitioner.toJSON(item))
        pojo['patientProfessions'] = instance.patientProfessions?.map((item) => CodingReference.toJSON(item))
        pojo['properties'] = instance.properties?.map((item) => Property.toJSON(item))
        pojo['systemMetaData'] = !!instance.systemMetaData ? SystemMetaDataOwnerEncrypted.toJSON(instance.systemMetaData) : undefined
        return pojo
    }

    static fromJSON(pojo: any): Patient {
        return new Patient({
            id: pojo['id'],
            rev: pojo['rev'],
            identifiers: pojo['identifiers']?.map((item: any) => Identifier.fromJSON(item)),
            created: pojo['created'],
            modified: pojo['modified'],
            author: pojo['author'],
            responsible: pojo['responsible'],
            tags: pojo['tags']?.map((item: any) => CodingReference.fromJSON(item)),
            codes: pojo['codes']?.map((item: any) => CodingReference.fromJSON(item)),
            endOfLife: pojo['endOfLife'],
            deletionDate: pojo['deletionDate'],
            names: pojo['names']?.map((item: any) => HumanName.fromJSON(item)),
            languages: pojo['languages']?.map((item: any) => item),
            addresses: pojo['addresses']?.map((item: any) => Location.fromJSON(item)),
            civility: pojo['civility'],
            gender: pojo['gender'],
            birthSex: pojo['birthSex'],
            mergeToPatientId: pojo['mergeToPatientId'],
            mergedIds: pojo['mergedIds']?.map((item: any) => item),
            active: pojo['active'],
            deactivationDate: pojo['deactivationDate'],
            deactivationReason: pojo['deactivationReason'],
            ssin: pojo['ssin'],
            personalStatus: pojo['personalStatus'],
            dateOfBirth: pojo['dateOfBirth'],
            dateOfDeath: pojo['dateOfDeath'],
            placeOfBirth: pojo['placeOfBirth'],
            placeOfDeath: pojo['placeOfDeath'],
            deceased: pojo['deceased'],
            education: pojo['education'],
            profession: pojo['profession'],
            notes: pojo['notes']?.map((item: any) => Annotation.fromJSON(item)),
            nationality: pojo['nationality'],
            race: pojo['race'],
            ethnicity: pojo['ethnicity'],
            picture: !!pojo['picture'] ? b64_2ab(pojo['picture']) : undefined,
            externalId: pojo['externalId'],
            relatives: pojo['relatives']?.map((item: any) => RelatedPerson.fromJSON(item)),
            patientPractitioners: pojo['patientPractitioners']?.map((item: any) => RelatedPractitioner.fromJSON(item)),
            patientProfessions: pojo['patientProfessions']?.map((item: any) => CodingReference.fromJSON(item)),
            properties: pojo['properties']?.map((item: any) => Property.fromJSON(item)),
            systemMetaData: !!pojo['systemMetaData'] ? SystemMetaDataOwnerEncrypted.fromJSON(pojo['systemMetaData']) : undefined,
        })
    }
}

interface IPatient {
    id?: string
    rev?: string
    identifiers?: Identifier[]
    created?: number
    modified?: number
    author?: string
    responsible?: string
    tags?: CodingReference[]
    codes?: CodingReference[]
    endOfLife?: number
    deletionDate?: number
    name?: HumanName[]
    languages?: string[]
    addresses?: Location[]
    civility?: string
    gender?: GenderEnum
    birthSex?: GenderEnum
    mergeToPatientId?: string
    mergedIds?: string[]
    active?: boolean
    deactivationDate?: number
    deactivationReason?: PatientDeactivationReasonEnum
    ssin?: string
    personalStatus?: PatientPersonalStatusEnum
    dateOfBirth?: number
    dateOfDeath?: number
    placeOfBirth?: string
    placeOfDeath?: string
    deceased?: boolean
    education?: string
    profession?: string
    notes?: Annotation[]
    nationality?: string
    race?: string
    ethnicity?: string
    picture?: ArrayBuffer
    externalId?: string
    relatives?: RelatedPerson[]
    patientPractioners?: RelatedPractitioner[]
    patientProfessions?: CodingReference[]
    properties?: Property[]
    systemMetaData?: SystemMetaDataOwnerEncrypted
}
