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

import { b64_2ab, HealthcareParty, ua2b64 } from '@icure/api'
import { CodingReference, mapTo, Property, SystemMetaDataOwner } from '@icure/typescript-common'
import { Address } from './Address.model'
import { PersonName } from './PersonName.model'

@mapTo(HealthcareParty)
export class HealthcareProfessional {
  constructor(json: IHealthcareProfessional) {
    Object.assign(this as HealthcareProfessional, json as IHealthcareProfessional)
  }

  /**
   * the Id of the healthcare party. We encourage using either a v4 UUID or a HL7 Id.
   */
  'id'?: string
  /**
   * the revision of the healthcare party in the database, used for conflict management / optimistic locking.
   */
  'rev'?: string
  /**
   * creation timestamp of the object.
   */
  'created'?: number
  /**
   * last modification timestamp of the object.
   */
  'modified'?: number
  /**
   * A label is an item from a codification system that qualifies a doctor as being member of a certain class, whatever the value it might have taken. If the label qualifies the content of a field, it means that whatever the content of the field, the label will always apply. LOINC is a codification system typically used for labels.
   * Example: HealthcareProfessional is an organisation
   */
  'labels': Set<CodingReference>
  /**
   * A code is an item from a codification system that qualifies the content of this doctor.
   * Example: doctor's specialty
   */
  'codes': Set<CodingReference>
  /**
   * the soft delete timestamp. When a user is ”deleted“, this is set to a non null value: the moment of the deletion
   */
  'deletionDate'?: number
  /**
   * The full name of the healthcare party, used mainly when the healthcare party is an organization
   */
  'name'?: string
  /**
   * the lastname (surname) of the healthcare party. This is the official lastname that should be used for official administrative purposes.
   */
  'lastName'?: string
  /**
   * the firstname (name) of the healthcare party.
   */
  'firstName'?: string
  /**
   * the list of all names of the healthcare party, also containing the official full name information. Ordered by preference of use. First element is therefore the official name used for the healthcare party in the application
   */
  'names': Array<PersonName>
  /**
   * the gender of the healthcare party: male, female, indeterminate, changed, changedToMale, changedToFemale, unknown
   */
  'gender'?: HealthcareProfessionalGenderEnum
  /**
   * Mr., Ms., Pr., Dr. ...
   */
  'civility'?: string
  /**
   * Medical specialty of the healthcare party
   */
  'speciality'?: string
  /**
   * Id of parent of the user representing the healthcare party.
   */
  'parentId'?: string
  /**
   * The list of addresses (with address type).
   */
  'addresses': Array<Address>
  /**
   * The list of languages spoken by the patient ordered by fluency (alpha-2 code http://www.loc.gov/standards/iso639-2/ascii_8bits.html).
   */
  'languages': Array<string>
  /**
   * A picture usually saved in JPEG format.
   */
  'picture'?: ArrayBuffer
  /**
   * Medical specialty of the healthcare party codified using FHIR or Kmehr codificaiton scheme
   */
  'specialityCodes'?: Set<CodingReference>
  /**
   * Text notes.
   */
  'notes'?: string
  'properties': Set<Property>
  'systemMetaData'?: SystemMetaDataOwner

  static toJSON(instance: HealthcareProfessional): any {
    const pojo: any = {}
    pojo['id'] = instance.id
    pojo['rev'] = instance.rev
    pojo['created'] = instance.created
    pojo['modified'] = instance.modified
    pojo['labels'] = Array.from([...instance.labels].map((item) => CodingReference.toJSON(item)))
    pojo['codes'] = Array.from([...instance.codes].map((item) => CodingReference.toJSON(item)))
    pojo['deletionDate'] = instance.deletionDate
    pojo['name'] = instance.name
    pojo['lastName'] = instance.lastName
    pojo['firstName'] = instance.firstName
    pojo['names'] = instance.names.map((item) => PersonName.toJSON(item))
    pojo['gender'] = instance.gender
    pojo['civility'] = instance.civility
    pojo['speciality'] = instance.speciality
    pojo['parentId'] = instance.parentId
    pojo['addresses'] = instance.addresses.map((item) => Address.toJSON(item))
    pojo['languages'] = instance.languages.map((item) => item)
    pojo['picture'] = !!instance.picture ? ua2b64(instance.picture) : undefined
    pojo['specialityCodes'] = Array.from([...(instance.specialityCodes ?? [])]?.map((item) => CodingReference.toJSON(item)) ?? [])
    pojo['notes'] = instance.notes
    pojo['properties'] = Array.from([...instance.properties].map((item) => Property.toJSON(item)))
    pojo['systemMetaData'] = !!instance.systemMetaData ? SystemMetaDataOwner.toJSON(instance.systemMetaData) : undefined
    return pojo
  }

  static fromJSON(pojo: any): HealthcareProfessional {
    return new HealthcareProfessional({
      id: pojo['id'],
      rev: pojo['rev'],
      created: pojo['created'],
      modified: pojo['modified'],
      labels: new Set(pojo['labels'].map((item: any) => CodingReference.fromJSON(item))),
      codes: new Set(pojo['codes'].map((item: any) => CodingReference.fromJSON(item))),
      deletionDate: pojo['deletionDate'],
      name: pojo['name'],
      lastName: pojo['lastName'],
      firstName: pojo['firstName'],
      names: pojo['names'].map((item: any) => PersonName.fromJSON(item)),
      gender: pojo['gender'],
      civility: pojo['civility'],
      speciality: pojo['speciality'],
      parentId: pojo['parentId'],
      addresses: pojo['addresses'].map((item: any) => Address.fromJSON(item)),
      languages: pojo['languages'].map((item: any) => item),
      picture: !!pojo['picture'] ? b64_2ab(pojo['picture']) : undefined,
      specialityCodes: new Set(pojo['specialityCodes']?.map((item: any) => CodingReference.fromJSON(item)) ?? []),
      notes: pojo['notes'],
      properties: new Set(pojo['properties'].map((item: any) => Property.fromJSON(item))),
      systemMetaData: !!pojo['systemMetaData'] ? SystemMetaDataOwner.fromJSON(pojo['systemMetaData']) : undefined,
    })
  }
}

interface IHealthcareProfessional {
  id?: string
  rev?: string
  created?: number
  modified?: number
  labels?: Set<CodingReference>
  codes?: Set<CodingReference>
  deletionDate?: number
  name?: string
  lastName?: string
  firstName?: string
  names?: Array<PersonName>
  gender?: HealthcareProfessionalGenderEnum
  civility?: string
  speciality?: string
  parentId?: string
  addresses?: Array<Address>
  languages?: Array<string>
  picture?: ArrayBuffer
  specialityCodes?: Set<CodingReference>
  notes?: string
  properties?: Set<Property>
  systemMetaData?: SystemMetaDataOwner
}

export type HealthcareProfessionalGenderEnum = 'male' | 'female' | 'indeterminate' | 'changed' | 'changedToMale' | 'changedToFemale' | 'unknown'