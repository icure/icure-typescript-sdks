import { b64_2ab, Patient as PatientDto, ua2b64 } from '@icure/api'
import { Annotation, CodingReference, forceUuid, Identifier, mapTo, Property, SystemMetaDataOwnerEncrypted } from '@icure/typescript-common'
import { GenderEnum } from './enums/Gender.enum'
import { PatientDeactivationReasonEnum } from './enums/PatientDeactivationReason.enum'
import { PatientPersonalStatusEnum } from './enums/PatientPersonalStatus.enum'
import { HumanName } from './HumanName.model'
import { Location } from './Location.model'
import { RelatedPerson } from './RelatedPerson.model'
import { RelatedPractitioner } from './RelatedPractitioner.model'

@mapTo(PatientDto)
export class Patient {
    id: string
    rev?: string
    identifiers: Identifier[]
    created?: number
    modified?: number
    author?: string
    responsible?: string
    tags: Set<CodingReference>
    codes: Set<CodingReference>
    endOfLife?: number
    deletionDate?: number
    // /**
    //  * First name of the patient. Automatically aligned with the {@link HumanName.preferredNameFrom} {@link Patient.names}.
    //  */
    firstName?: string
    // /**
    //  * Last name of the patient. Automatically aligned with the {@link HumanName.preferredNameFrom} {@link Patient.names}.
    //  */
    lastName?: string
    // /**
    //  * All names of the patient. Currently only the preferred name, which is automatically aligned with {@link Patient.firstName}
    //  * and {@link Patient.lastName}, is searchable.
    //  */
    names: HumanName[]
    languages: string[]
    addresses: Location[]
    civility?: string
    gender?: GenderEnum
    birthSex?: GenderEnum
    mergeToPatientId?: string
    mergedIds: string[]
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
    notes: Annotation[]
    nationality?: string
    race?: string
    ethnicity?: string
    picture?: ArrayBuffer
    externalId?: string
    relatives: RelatedPerson[]
    patientPractitioners: RelatedPractitioner[]
    patientProfessions?: CodingReference[]
    properties: Set<Property>
    systemMetaData?: SystemMetaDataOwnerEncrypted

    constructor(patient: IPatient) {
        this.id = forceUuid(patient.id)
        this.rev = patient.rev
        this.identifiers = patient.identifiers ?? []
        this.created = patient.created
        this.modified = patient.modified
        this.author = patient.author
        this.responsible = patient.responsible
        this.tags = patient.tags ?? new Set()
        this.codes = patient.codes ?? new Set()
        this.endOfLife = patient.endOfLife
        this.deletionDate = patient.deletionDate
        this.names = patient.names ?? []
        this.languages = patient.languages ?? []
        this.addresses = patient.addresses ?? []
        this.civility = patient.civility
        this.gender = patient.gender
        this.birthSex = patient.birthSex
        this.mergeToPatientId = patient.mergeToPatientId
        this.mergedIds = patient.mergedIds ?? []
        this.active = patient.active
        this.deactivationDate = patient.deactivationDate
        this.deactivationReason = patient.deactivationReason
        this.ssin = patient.ssin
        this.personalStatus = patient.personalStatus
        this.dateOfBirth = patient.dateOfBirth
        this.dateOfDeath = patient.dateOfDeath
        this.placeOfBirth = patient.placeOfBirth
        this.placeOfDeath = patient.placeOfDeath
        this.deceased = patient.deceased
        this.education = patient.education
        this.profession = patient.profession
        this.notes = patient.notes ?? []
        this.nationality = patient.nationality
        this.race = patient.race
        this.ethnicity = patient.ethnicity
        this.picture = patient.picture
        this.externalId = patient.externalId
        this.relatives = patient.relatives ?? []
        this.patientPractitioners = patient.patientPractitioners ?? []
        this.patientProfessions = patient.patientProfessions
        this.properties = patient.properties ?? new Set()
        this.systemMetaData = patient.systemMetaData
        this.firstName = patient.firstName
        this.lastName = patient.lastName
    }

    // /**
    //  * Get the preferred name of a patient. Equivalent to `HumanName.preferredNameFrom(patient.names)`.
    //  * See {@link HumanName.preferredNameFrom} for more details.
    //  * @param patient a patient
    //  * @return the preferred name of the patient, if any
    //  */
    // static preferredNameOf(patient: Patient): HumanName | undefined {
    //     return HumanName.preferredNameFrom(patient.names)
    // }

    static toJSON(instance: Patient): any {
        const pojo: any = {}
        pojo['id'] = instance.id
        if (instance.rev !== undefined) pojo['rev'] = instance.rev
        pojo['identifiers'] = instance.identifiers.map((item) => Identifier.toJSON(item))
        if (instance.created !== undefined) pojo['created'] = instance.created
        if (instance.modified !== undefined) pojo['modified'] = instance.modified
        if (instance.author !== undefined) pojo['author'] = instance.author
        if (instance.responsible !== undefined) pojo['responsible'] = instance.responsible
        pojo['tags'] = Array.from([...instance.tags].map((item) => CodingReference.toJSON(item)))
        pojo['codes'] = Array.from([...instance.codes].map((item) => CodingReference.toJSON(item)))
        if (instance.endOfLife !== undefined) pojo['endOfLife'] = instance.endOfLife
        if (instance.deletionDate !== undefined) pojo['deletionDate'] = instance.deletionDate
        if (instance.firstName !== undefined) pojo['firstName'] = instance.firstName
        if (instance.lastName !== undefined) pojo['lastName'] = instance.lastName
        pojo['names'] = instance.names.map((item) => HumanName.toJSON(item))
        pojo['languages'] = instance.languages.map((item) => item)
        pojo['addresses'] = instance.addresses.map((item) => Location.toJSON(item))
        if (instance.civility !== undefined) pojo['civility'] = instance.civility
        if (instance.gender !== undefined) pojo['gender'] = instance.gender
        if (instance.birthSex !== undefined) pojo['birthSex'] = instance.birthSex
        if (instance.mergeToPatientId !== undefined) pojo['mergeToPatientId'] = instance.mergeToPatientId
        pojo['mergedIds'] = instance.mergedIds.map((item) => item)
        if (instance.active !== undefined) pojo['active'] = instance.active
        if (instance.deactivationDate !== undefined) pojo['deactivationDate'] = instance.deactivationDate
        if (instance.deactivationReason !== undefined) pojo['deactivationReason'] = instance.deactivationReason
        if (instance.ssin !== undefined) pojo['ssin'] = instance.ssin
        if (instance.personalStatus !== undefined) pojo['personalStatus'] = instance.personalStatus
        if (instance.dateOfBirth !== undefined) pojo['dateOfBirth'] = instance.dateOfBirth
        if (instance.dateOfDeath !== undefined) pojo['dateOfDeath'] = instance.dateOfDeath
        if (instance.placeOfBirth !== undefined) pojo['placeOfBirth'] = instance.placeOfBirth
        if (instance.placeOfDeath !== undefined) pojo['placeOfDeath'] = instance.placeOfDeath
        if (instance.deceased !== undefined) pojo['deceased'] = instance.deceased
        if (instance.education !== undefined) pojo['education'] = instance.education
        if (instance.profession !== undefined) pojo['profession'] = instance.profession
        pojo['notes'] = instance.notes.map((item) => Annotation.toJSON(item))
        if (instance.nationality !== undefined) pojo['nationality'] = instance.nationality
        if (instance.race !== undefined) pojo['race'] = instance.race
        if (instance.ethnicity !== undefined) pojo['ethnicity'] = instance.ethnicity
        if (instance.picture !== undefined) pojo['picture'] = !!instance.picture ? ua2b64(instance.picture) : undefined
        if (instance.externalId !== undefined) pojo['externalId'] = instance.externalId
        pojo['relatives'] = instance.relatives.map((item) => RelatedPerson.toJSON(item))
        pojo['patientPractitioners'] = instance.patientPractitioners.map((item) => RelatedPractitioner.toJSON(item))
        if (instance.patientProfessions !== undefined) pojo['patientProfessions'] = instance.patientProfessions?.map((item) => CodingReference.toJSON(item))
        pojo['properties'] = Array.from([...instance.properties].map((item) => Property.toJSON(item)))
        if (instance.systemMetaData !== undefined) pojo['systemMetaData'] = !!instance.systemMetaData ? SystemMetaDataOwnerEncrypted.toJSON(instance.systemMetaData) : undefined
        return pojo
    }

    static fromJSON(pojo: any): Patient {
        const obj = {} as IPatient
        obj['id'] = pojo['id']
        if (pojo['rev'] !== undefined) {
            obj['rev'] = pojo['rev']
        }
        obj['identifiers'] = pojo['identifiers'].map((item: any) => Identifier.fromJSON(item))
        if (pojo['created'] !== undefined) {
            obj['created'] = pojo['created']
        }
        if (pojo['modified'] !== undefined) {
            obj['modified'] = pojo['modified']
        }
        if (pojo['author'] !== undefined) {
            obj['author'] = pojo['author']
        }
        if (pojo['responsible'] !== undefined) {
            obj['responsible'] = pojo['responsible']
        }
        obj['tags'] = new Set(pojo['tags'].map((item: any) => CodingReference.fromJSON(item)))
        obj['codes'] = new Set(pojo['codes'].map((item: any) => CodingReference.fromJSON(item)))
        if (pojo['endOfLife'] !== undefined) {
            obj['endOfLife'] = pojo['endOfLife']
        }
        if (pojo['deletionDate'] !== undefined) {
            obj['deletionDate'] = pojo['deletionDate']
        }
        if (pojo['firstName'] !== undefined) {
            obj['firstName'] = pojo['firstName']
        }
        if (pojo['lastName'] !== undefined) {
            obj['lastName'] = pojo['lastName']
        }
        obj['names'] = pojo['names'].map((item: any) => HumanName.fromJSON(item))
        obj['languages'] = pojo['languages'].map((item: any) => item)
        obj['addresses'] = pojo['addresses'].map((item: any) => Location.fromJSON(item))
        if (pojo['civility'] !== undefined) {
            obj['civility'] = pojo['civility']
        }
        if (pojo['gender'] !== undefined) {
            obj['gender'] = pojo['gender']
        }
        if (pojo['birthSex'] !== undefined) {
            obj['birthSex'] = pojo['birthSex']
        }
        if (pojo['mergeToPatientId'] !== undefined) {
            obj['mergeToPatientId'] = pojo['mergeToPatientId']
        }
        obj['mergedIds'] = pojo['mergedIds'].map((item: any) => item)
        if (pojo['active'] !== undefined) {
            obj['active'] = pojo['active']
        }
        if (pojo['deactivationDate'] !== undefined) {
            obj['deactivationDate'] = pojo['deactivationDate']
        }
        if (pojo['deactivationReason'] !== undefined) {
            obj['deactivationReason'] = pojo['deactivationReason']
        }
        if (pojo['ssin'] !== undefined) {
            obj['ssin'] = pojo['ssin']
        }
        if (pojo['personalStatus'] !== undefined) {
            obj['personalStatus'] = pojo['personalStatus']
        }
        if (pojo['dateOfBirth'] !== undefined) {
            obj['dateOfBirth'] = pojo['dateOfBirth']
        }
        if (pojo['dateOfDeath'] !== undefined) {
            obj['dateOfDeath'] = pojo['dateOfDeath']
        }
        if (pojo['placeOfBirth'] !== undefined) {
            obj['placeOfBirth'] = pojo['placeOfBirth']
        }
        if (pojo['placeOfDeath'] !== undefined) {
            obj['placeOfDeath'] = pojo['placeOfDeath']
        }
        if (pojo['deceased'] !== undefined) {
            obj['deceased'] = pojo['deceased']
        }
        if (pojo['education'] !== undefined) {
            obj['education'] = pojo['education']
        }
        if (pojo['profession'] !== undefined) {
            obj['profession'] = pojo['profession']
        }
        obj['notes'] = pojo['notes'].map((item: any) => Annotation.fromJSON(item))
        if (pojo['nationality'] !== undefined) {
            obj['nationality'] = pojo['nationality']
        }
        if (pojo['race'] !== undefined) {
            obj['race'] = pojo['race']
        }
        if (pojo['ethnicity'] !== undefined) {
            obj['ethnicity'] = pojo['ethnicity']
        }
        if (pojo['picture'] !== undefined) {
            obj['picture'] = !!pojo['picture'] ? b64_2ab(pojo['picture']) : undefined
        }
        if (pojo['externalId'] !== undefined) {
            obj['externalId'] = pojo['externalId']
        }
        obj['relatives'] = pojo['relatives'].map((item: any) => RelatedPerson.fromJSON(item))
        obj['patientPractitioners'] = pojo['patientPractitioners'].map((item: any) => RelatedPractitioner.fromJSON(item))
        if (pojo['patientProfessions'] !== undefined) {
            obj['patientProfessions'] = pojo['patientProfessions']?.map((item: any) => CodingReference.fromJSON(item))
        }
        obj['properties'] = new Set(pojo['properties'].map((item: any) => Property.fromJSON(item)))
        if (pojo['systemMetaData'] !== undefined) {
            obj['systemMetaData'] = !!pojo['systemMetaData'] ? SystemMetaDataOwnerEncrypted.fromJSON(pojo['systemMetaData']) : undefined
        }
        return new Patient(obj)
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
    tags?: Set<CodingReference>
    codes?: Set<CodingReference>
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
    properties?: Set<Property>
    systemMetaData?: SystemMetaDataOwnerEncrypted
    firstName?: string
    lastName?: string
}
