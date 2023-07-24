/**
 * ICure Medical Device Micro Service
 * ICure Medical Device Micro Service
 *
 * OpenAPI spec version: v2
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { b64_2ab, Patient as PatientDto, ua2b64 } from '@icure/api'
import { Annotation, CodingReference, Identifier, mapTo, Property, SystemMetaDataOwnerEncrypted } from '@icure/typescript-common'
import { Address } from './Address.model'
import { HealthcareProfessionalGenderEnum } from './HealthcareProfessional.model'
import { Partnership } from './Partnership.model'
import { PatientHealthCareParty } from './PatientHealthCareParty.model'
import { PersonName } from './PersonName.model'

@mapTo(PatientDto)
export class Patient {
    'id': string
    'rev'?: string
    'identifiers': Identifier[]
    'created'?: number
    'modified'?: number
    'author'?: string
    'responsible'?: string
    'labels': Set<CodingReference>
    'codes': Set<CodingReference>
    'endOfLife'?: number
    'deletionDate'?: number
    'firstName'?: string
    'lastName'?: string
    'names': PersonName[]
    'companyName'?: string
    'languages': string[]
    'addresses': Address[]
    'civility'?: string
    'gender'?: PatientGenderEnum
    'birthSex'?: PatientBirthSexEnum
    'mergeToPatientId'?: string
    'mergedIds': Set<string>
    'alias'?: string
    'active': boolean
    deactivationDate?: number
    'deactivationReason': PatientDeactivationReasonEnum
    'ssin'?: string
    'maidenName'?: string
    'spouseName'?: string
    'partnerName'?: string
    'personalStatus'?: PatientPersonalStatusEnum
    'dateOfBirth'?: number
    'dateOfDeath'?: number
    'placeOfBirth'?: string
    'placeOfDeath'?: string
    'deceased'?: boolean
    'education'?: string
    'profession'?: string
    'note'?: string
    notes: Annotation[]
    'administrativeNote'?: string
    'nationality'?: string
    'race'?: string
    'ethnicity'?: string
    'picture'?: ArrayBuffer
    'externalId'?: string
    'partnerships': Partnership[]
    'patientHealthCareParties': PatientHealthCareParty[]
    'patientProfessions': CodingReference[]
    'parameters': Map<string, string[]>
    'properties': Set<Property>
    'systemMetaData'?: SystemMetaDataOwnerEncrypted

    constructor(json: IPatient) {
        const { identifiers, labels, codes, names, addresses, gender, birthSex, mergedIds, deactivationReason, personalStatus, picture, partnerships, patientHealthCareParties, patientProfessions, properties, systemMetaData, notes, ...simpleProperties } = json

        Object.assign(this as Patient, simpleProperties as IPatient)

        this.identifiers = identifiers ? [...identifiers]?.map((p) => new Identifier(p)) : []

        this.labels = labels ? new Set([...labels].map((it) => new CodingReference(it))) : new Set()
        this.codes = codes ? new Set([...codes].map((it) => new CodingReference(it))) : new Set()
        this.notes = notes ? [...notes]?.map((it) => new Annotation(it)) : []

        this.names = names?.map((n) => new PersonName(n)) ?? []
        this.addresses = addresses?.map((a) => new Address(a)) ?? []
        this.gender = gender as HealthcareProfessionalGenderEnum
        this.birthSex = birthSex as HealthcareProfessionalGenderEnum
        this.mergedIds = mergedIds ? new Set([...mergedIds]) : new Set()
        this.deactivationReason = deactivationReason as PatientDeactivationReasonEnum
        this.personalStatus = personalStatus as PatientPersonalStatusEnum

        this.picture = !picture ? undefined : (picture as unknown) instanceof ArrayBuffer ? picture : typeof (picture as unknown) === 'string' ? b64_2ab(picture as unknown as string) : undefined

        this.partnerships = partnerships ? [...partnerships]?.map((p) => new Partnership(p)) : []
        this.patientHealthCareParties = patientHealthCareParties ? [...patientHealthCareParties]?.map((p) => new PatientHealthCareParty(p)) : []
        this.patientProfessions = patientProfessions ? [...patientProfessions]?.map((p) => new CodingReference(p)) : []

        this.properties = properties ? new Set([...properties]?.map((p) => new Property(p))) : new Set()

        this.systemMetaData = systemMetaData && new SystemMetaDataOwnerEncrypted(systemMetaData)
    }

    static toJSON(instance: Patient): any {
        const pojo: any = {}
        pojo['id'] = instance.id
        if (instance.rev !== undefined) pojo['rev'] = instance.rev
        pojo['identifiers'] = instance.identifiers.map((item) => Identifier.toJSON(item))
        if (instance.created !== undefined) pojo['created'] = instance.created
        if (instance.modified !== undefined) pojo['modified'] = instance.modified
        if (instance.author !== undefined) pojo['author'] = instance.author
        if (instance.responsible !== undefined) pojo['responsible'] = instance.responsible
        pojo['labels'] = Array.from([...instance.labels].map((item) => CodingReference.toJSON(item)))
        pojo['codes'] = Array.from([...instance.codes].map((item) => CodingReference.toJSON(item)))
        if (instance.endOfLife !== undefined) pojo['endOfLife'] = instance.endOfLife
        if (instance.deletionDate !== undefined) pojo['deletionDate'] = instance.deletionDate
        if (instance.firstName !== undefined) pojo['firstName'] = instance.firstName
        if (instance.lastName !== undefined) pojo['lastName'] = instance.lastName
        pojo['names'] = instance.names.map((item) => PersonName.toJSON(item))
        if (instance.companyName !== undefined) pojo['companyName'] = instance.companyName
        pojo['languages'] = instance.languages.map((item) => item)
        pojo['addresses'] = instance.addresses.map((item) => Address.toJSON(item))
        if (instance.civility !== undefined) pojo['civility'] = instance.civility
        if (instance.gender !== undefined) pojo['gender'] = instance.gender
        if (instance.birthSex !== undefined) pojo['birthSex'] = instance.birthSex
        if (instance.mergeToPatientId !== undefined) pojo['mergeToPatientId'] = instance.mergeToPatientId
        pojo['mergedIds'] = Array.from([...instance.mergedIds].map((item) => item))
        if (instance.alias !== undefined) pojo['alias'] = instance.alias
        pojo['active'] = instance.active
        if (instance.deactivationDate !== undefined) pojo['deactivationDate'] = instance.deactivationDate
        pojo['deactivationReason'] = instance.deactivationReason
        if (instance.ssin !== undefined) pojo['ssin'] = instance.ssin
        if (instance.maidenName !== undefined) pojo['maidenName'] = instance.maidenName
        if (instance.spouseName !== undefined) pojo['spouseName'] = instance.spouseName
        if (instance.partnerName !== undefined) pojo['partnerName'] = instance.partnerName
        if (instance.personalStatus !== undefined) pojo['personalStatus'] = instance.personalStatus
        if (instance.dateOfBirth !== undefined) pojo['dateOfBirth'] = instance.dateOfBirth
        if (instance.dateOfDeath !== undefined) pojo['dateOfDeath'] = instance.dateOfDeath
        if (instance.placeOfBirth !== undefined) pojo['placeOfBirth'] = instance.placeOfBirth
        if (instance.placeOfDeath !== undefined) pojo['placeOfDeath'] = instance.placeOfDeath
        if (instance.deceased !== undefined) pojo['deceased'] = instance.deceased
        if (instance.education !== undefined) pojo['education'] = instance.education
        if (instance.profession !== undefined) pojo['profession'] = instance.profession
        if (instance.note !== undefined) pojo['note'] = instance.note
        pojo['notes'] = instance.notes.map((item) => Annotation.toJSON(item))
        if (instance.administrativeNote !== undefined) pojo['administrativeNote'] = instance.administrativeNote
        if (instance.nationality !== undefined) pojo['nationality'] = instance.nationality
        if (instance.race !== undefined) pojo['race'] = instance.race
        if (instance.ethnicity !== undefined) pojo['ethnicity'] = instance.ethnicity
        if (instance.picture !== undefined) pojo['picture'] = !!instance.picture ? ua2b64(instance.picture) : undefined
        if (instance.externalId !== undefined) pojo['externalId'] = instance.externalId
        pojo['partnerships'] = instance.partnerships.map((item) => Partnership.toJSON(item))
        pojo['patientHealthCareParties'] = instance.patientHealthCareParties.map((item) => PatientHealthCareParty.toJSON(item))
        pojo['patientProfessions'] = instance.patientProfessions.map((item) => CodingReference.toJSON(item))
        pojo['parameters'] = Object.fromEntries([...instance.parameters.entries()].map(([k, v]) => [k, v.map((item) => item)]))
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
        obj['labels'] = new Set(pojo['labels'].map((item: any) => CodingReference.fromJSON(item)))
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
        obj['names'] = pojo['names'].map((item: any) => PersonName.fromJSON(item))
        if (pojo['companyName'] !== undefined) {
            obj['companyName'] = pojo['companyName']
        }
        obj['languages'] = pojo['languages'].map((item: any) => item)
        obj['addresses'] = pojo['addresses'].map((item: any) => Address.fromJSON(item))
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
        obj['mergedIds'] = new Set(pojo['mergedIds'].map((item: any) => item))
        if (pojo['alias'] !== undefined) {
            obj['alias'] = pojo['alias']
        }
        obj['active'] = pojo['active']
        if (pojo['deactivationDate'] !== undefined) {
            obj['deactivationDate'] = pojo['deactivationDate']
        }
        obj['deactivationReason'] = pojo['deactivationReason']
        if (pojo['ssin'] !== undefined) {
            obj['ssin'] = pojo['ssin']
        }
        if (pojo['maidenName'] !== undefined) {
            obj['maidenName'] = pojo['maidenName']
        }
        if (pojo['spouseName'] !== undefined) {
            obj['spouseName'] = pojo['spouseName']
        }
        if (pojo['partnerName'] !== undefined) {
            obj['partnerName'] = pojo['partnerName']
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
        if (pojo['note'] !== undefined) {
            obj['note'] = pojo['note']
        }
        obj['notes'] = pojo['notes'].map((item: any) => Annotation.fromJSON(item))
        if (pojo['administrativeNote'] !== undefined) {
            obj['administrativeNote'] = pojo['administrativeNote']
        }
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
        obj['partnerships'] = pojo['partnerships'].map((item: any) => Partnership.fromJSON(item))
        obj['patientHealthCareParties'] = pojo['patientHealthCareParties'].map((item: any) => PatientHealthCareParty.fromJSON(item))
        obj['patientProfessions'] = pojo['patientProfessions'].map((item: any) => CodingReference.fromJSON(item))
        obj['parameters'] = new Map(Object.entries(pojo['parameters']).map(([k, v]: [any, any]) => [k, v.map((item: any) => item)]))
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
    identifiers?: Array<Identifier>
    created?: number
    modified?: number
    author?: string
    responsible?: string
    labels?: Set<CodingReference>
    codes?: Set<CodingReference>
    endOfLife?: number
    deletionDate?: number
    firstName?: string
    lastName?: string
    names?: Array<PersonName>
    companyName?: string
    languages?: Array<string>
    addresses?: Array<Address>
    civility?: string
    gender?: PatientGenderEnum
    birthSex?: PatientBirthSexEnum
    mergeToPatientId?: string
    mergedIds?: Set<string>
    alias?: string
    active?: boolean
    deactivationDate?: number
    deactivationReason?: PatientDeactivationReasonEnum
    ssin?: string
    maidenName?: string
    spouseName?: string
    partnerName?: string
    personalStatus?: PatientPersonalStatusEnum
    dateOfBirth?: number
    dateOfDeath?: number
    placeOfBirth?: string
    placeOfDeath?: string
    deceased?: boolean
    education?: string
    profession?: string
    note?: string
    notes?: Annotation[]
    administrativeNote?: string
    nationality?: string
    race?: string
    ethnicity?: string
    picture?: ArrayBuffer
    externalId?: string
    partnerships?: Array<Partnership>
    patientHealthCareParties?: Array<PatientHealthCareParty>
    patientProfessions?: Array<CodingReference>
    parameters?: Map<string, string[]>
    properties?: Set<Property>
    systemMetaData?: SystemMetaDataOwnerEncrypted
}

export type PatientGenderEnum = 'male' | 'female' | 'indeterminate' | 'changed' | 'changedToMale' | 'changedToFemale' | 'unknown'
export type PatientBirthSexEnum = 'male' | 'female' | 'indeterminate' | 'changed' | 'changedToMale' | 'changedToFemale' | 'unknown'
export type PatientDeactivationReasonEnum = 'deceased' | 'moved' | 'other_doctor' | 'retired' | 'no_contact' | 'unknown' | 'none'
export type PatientPersonalStatusEnum = 'single' | 'in_couple' | 'married' | 'separated' | 'divorced' | 'divorcing' | 'widowed' | 'widower' | 'complicated' | 'unknown' | 'contract' | 'other' | 'annulled' | 'polygamous'
