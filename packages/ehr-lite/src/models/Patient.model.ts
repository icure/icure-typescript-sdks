import {
    Annotation,
    CodingReference,
    EntityId,
    IAnnotation,
    ICodingReference,
    IIdentifier,
    IProperty, ISystemMetaDataOwnerEncrypted,
    Identifier,
    PatientDto,
    Property,
    SystemMetaDataOwnerEncrypted,
    base64string,
    forceUuid,
    mapTo
} from '@icure/typescript-common'
import { HumanName, IHumanName } from './HumanName.model'
import { ILocation, Location } from './Location.model'
import { IRelatedPerson, RelatedPerson } from './RelatedPerson.model'
import { IRelatedPractitioner, RelatedPractitioner } from './RelatedPractitioner.model'
import { GenderEnum } from './enums/Gender.enum'
import { PatientDeactivationReasonEnum } from './enums/PatientDeactivationReason.enum'
import { PatientPersonalStatusEnum } from './enums/PatientPersonalStatus.enum'

@mapTo(PatientDto)
export class Patient implements IPatient {
    id: EntityId
    rev?: string
    identifiers: Identifier[] = []
    created?: number
    modified?: number
    author?: string
    responsible?: string
    tags: CodingReference[] = []
    codes: CodingReference[] = []
    endOfLife?: number
    deletionDate?: number
    // /**
    //  * First name of the patient. Automatically aligned with the {@link HumanName.preferredNameFrom} {@link Patient.names}.
    //  */
    /**
     * First name of the patient
     */
    firstName?: string
    // /**
    //  * Last name of the patient. Automatically aligned with the {@link HumanName.preferredNameFrom} {@link Patient.names}.
    //  */
    /**
     * Last name of the patient
     */
    lastName?: string
    // /**
    //  * All names of the patient. Currently only the preferred name, which is automatically aligned with {@link Patient.firstName}
    //  * and {@link Patient.lastName}, is searchable.
    //  */
    /**
     * All names of the patient. Note that these names are not searchable / filterable.
     */
    names: HumanName[] = []
    languages: string[] = []
    addresses: Location[] = []
    civility?: string
    gender?: GenderEnum
    birthSex?: GenderEnum
    mergeToPatientId?: string
    mergedIds: string[] = []
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
    notes: Annotation[] = []
    nationality?: string
    race?: string
    ethnicity?: string
    picture?: base64string
    externalId?: string
    relatives: RelatedPerson[] = []
    patientPractitioners: RelatedPractitioner[] = []
    patientProfessions: CodingReference[] = []
    properties: Property[] = []
    systemMetaData?: SystemMetaDataOwnerEncrypted
    // /**
    //  * Get the preferred name of a patient. Equivalent to `HumanName.preferredNameFrom(patient.names)`.
    //  * See {@link HumanName.preferredNameFrom} for more details.
    //  * @param patient a patient
    //  * @return the preferred name of the patient, if any
    //  */
    // static preferredNameOf(patient: Patient): HumanName | undefined {
    //     return HumanName.preferredNameFrom(patient.names)
    // }

    toJSON(): IPatient {
        return {
        id: this.id,
        rev: this.rev,
        identifiers: this.identifiers.map(item => item.toJSON()),
        created: this.created,
        modified: this.modified,
        author: this.author,
        responsible: this.responsible,
        tags: this.tags.map(item => item.toJSON()),
        codes: this.codes.map(item => item.toJSON()),
        endOfLife: this.endOfLife,
        deletionDate: this.deletionDate,
        firstName: this.firstName,
        lastName: this.lastName,
        names: this.names.map(item => item.toJSON()),
        languages: this.languages.map(item => item),
        addresses: this.addresses.map(item => item.toJSON()),
        civility: this.civility,
        gender: this.gender,
        birthSex: this.birthSex,
        mergeToPatientId: this.mergeToPatientId,
        mergedIds: this.mergedIds.map(item => item),
        active: this.active,
        deactivationDate: this.deactivationDate,
        deactivationReason: this.deactivationReason,
        ssin: this.ssin,
        personalStatus: this.personalStatus,
        dateOfBirth: this.dateOfBirth,
        dateOfDeath: this.dateOfDeath,
        placeOfBirth: this.placeOfBirth,
        placeOfDeath: this.placeOfDeath,
        deceased: this.deceased,
        education: this.education,
        profession: this.profession,
        notes: this.notes.map(item => item.toJSON()),
        nationality: this.nationality,
        race: this.race,
        ethnicity: this.ethnicity,
        picture: this.picture,
        externalId: this.externalId,
        relatives: this.relatives.map(item => item.toJSON()),
        patientPractitioners: this.patientPractitioners.map(item => item.toJSON()),
        patientProfessions: this.patientProfessions.map(item => item.toJSON()),
        properties: this.properties.map(item => item.toJSON()),
        systemMetaData: !!this.systemMetaData ? this.systemMetaData.toJSON() : undefined,
        }
    }

    constructor(json: Partial<IPatient>) {
        this.id = forceUuid(json["id"]!)
        if (json["rev"] !== undefined) {
            this.rev = json["rev"]!
        }
        if (json["identifiers"] !== undefined) {
            this.identifiers = json["identifiers"]!.map((item: any) => new Identifier(item))
        }
        if (json["created"] !== undefined) {
            this.created = json["created"]!
        }
        if (json["modified"] !== undefined) {
            this.modified = json["modified"]!
        }
        if (json["author"] !== undefined) {
            this.author = json["author"]!
        }
        if (json["responsible"] !== undefined) {
            this.responsible = json["responsible"]!
        }
        if (json["tags"] !== undefined) {
            this.tags = json["tags"]!.map((item: any) => new CodingReference(item))
        }
        if (json["codes"] !== undefined) {
            this.codes = json["codes"]!.map((item: any) => new CodingReference(item))
        }
        if (json["endOfLife"] !== undefined) {
            this.endOfLife = json["endOfLife"]!
        }
        if (json["deletionDate"] !== undefined) {
            this.deletionDate = json["deletionDate"]!
        }
        if (json["firstName"] !== undefined) {
            this.firstName = json["firstName"]!
        }
        if (json["lastName"] !== undefined) {
            this.lastName = json["lastName"]!
        }
        if (json["names"] !== undefined) {
            this.names = json["names"]!.map((item: any) => new HumanName(item))
        }
        if (json["languages"] !== undefined) {
            this.languages = json["languages"]!.map((item: any) => item)
        }
        if (json["addresses"] !== undefined) {
            this.addresses = json["addresses"]!.map((item: any) => new Location(item))
        }
        if (json["civility"] !== undefined) {
            this.civility = json["civility"]!
        }
        if (json["gender"] !== undefined) {
            this.gender = json["gender"]!
        }
        if (json["birthSex"] !== undefined) {
            this.birthSex = json["birthSex"]!
        }
        if (json["mergeToPatientId"] !== undefined) {
            this.mergeToPatientId = json["mergeToPatientId"]!
        }
        if (json["mergedIds"] !== undefined) {
            this.mergedIds = json["mergedIds"]!.map((item: any) => item)
        }
        if (json["active"] !== undefined) {
            this.active = json["active"]!
        }
        if (json["deactivationDate"] !== undefined) {
            this.deactivationDate = json["deactivationDate"]!
        }
        if (json["deactivationReason"] !== undefined) {
            this.deactivationReason = json["deactivationReason"]!
        }
        if (json["ssin"] !== undefined) {
            this.ssin = json["ssin"]!
        }
        if (json["personalStatus"] !== undefined) {
            this.personalStatus = json["personalStatus"]!
        }
        if (json["dateOfBirth"] !== undefined) {
            this.dateOfBirth = json["dateOfBirth"]!
        }
        if (json["dateOfDeath"] !== undefined) {
            this.dateOfDeath = json["dateOfDeath"]!
        }
        if (json["placeOfBirth"] !== undefined) {
            this.placeOfBirth = json["placeOfBirth"]!
        }
        if (json["placeOfDeath"] !== undefined) {
            this.placeOfDeath = json["placeOfDeath"]!
        }
        if (json["deceased"] !== undefined) {
            this.deceased = json["deceased"]!
        }
        if (json["education"] !== undefined) {
            this.education = json["education"]!
        }
        if (json["profession"] !== undefined) {
            this.profession = json["profession"]!
        }
        if (json["notes"] !== undefined) {
            this.notes = json["notes"]!.map((item: any) => new Annotation(item))
        }
        if (json["nationality"] !== undefined) {
            this.nationality = json["nationality"]!
        }
        if (json["race"] !== undefined) {
            this.race = json["race"]!
        }
        if (json["ethnicity"] !== undefined) {
            this.ethnicity = json["ethnicity"]!
        }
        if (json["picture"] !== undefined) {
            this.picture = json["picture"]!
        }
        if (json["externalId"] !== undefined) {
            this.externalId = json["externalId"]!
        }
        if (json["relatives"] !== undefined) {
            this.relatives = json["relatives"]!.map((item: any) => new RelatedPerson(item))
        }
        if (json["patientPractitioners"] !== undefined) {
            this.patientPractitioners = json["patientPractitioners"]!.map((item: any) => new RelatedPractitioner(item))
        }
        if (json["patientProfessions"] !== undefined) {
            this.patientProfessions = json["patientProfessions"]!.map((item: any) => new CodingReference(item))
        }
        if (json["properties"] !== undefined) {
            this.properties = json["properties"]!.map((item: any) => new Property(item))
        }
        if (json["systemMetaData"] !== undefined) {
            this.systemMetaData = new SystemMetaDataOwnerEncrypted(json["systemMetaData"]!)
        }
    }
}

export interface IPatient {
    id: EntityId
    rev?: string
    identifiers: IIdentifier[]
    created?: number
    modified?: number
    author?: string
    responsible?: string
    tags: ICodingReference[]
    codes: ICodingReference[]
    endOfLife?: number
    deletionDate?: number
    names: IHumanName[]
    languages: string[]
    addresses: ILocation[]
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
    notes: IAnnotation[]
    nationality?: string
    race?: string
    ethnicity?: string
    picture?: base64string
    externalId?: string
    relatives: IRelatedPerson[]
    patientPractitioners: IRelatedPractitioner[]
    patientProfessions: ICodingReference[]
    properties: IProperty[]
    systemMetaData?: ISystemMetaDataOwnerEncrypted
    firstName?: string
    lastName?: string
}
