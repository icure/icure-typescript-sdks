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
import { HealthElement } from '@icure/api'
import { Annotation, CodingReference, Identifier, mapTo, SystemMetaDataEncrypted } from '@icure/typescript-common'

@mapTo(HealthElement)
export class HealthcareElement {
  /**
   * The Id of the healthcare element. We encourage using either a v4 UUID or a HL7 Id.
   */
  'id'?: string
  'identifiers': Array<Identifier>
  /**
   * The revision of the healthcare element in the database, used for conflict management / optimistic locking.
   */
  'rev'?: string
  'created'?: number
  'modified'?: number
  'author'?: string
  'responsible'?: string
  'medicalLocationId'?: string
  'labels': Set<CodingReference>
  'codes': Set<CodingReference>
  'endOfLife'?: number
  'deletionDate'?: number
  /**
   * The logical id of the healthcare element, used to link together different versions of the same healthcare element. We encourage using either a v4 UUID or a HL7 Id.
   */
  'healthcareElementId'?: string
  /**
   * The date (unix epoch in ms) when the healthcare element is noted to have started and also closes on the same date
   */
  'valueDate'?: number
  /**
   * The date (unix epoch in ms) of the start of the healthcare element.
   */
  'openingDate'?: number
  /**
   * The date (unix epoch in ms) marking the end of the healthcare element.
   */
  'closingDate'?: number
  /**
   * Description of the healthcare element.
   */
  'description'?: string
  /**
   * A text note (can be confidential, encrypted by default).
   */
  'note'?: string
  notes?: Annotation[]
  'systemMetaData'?: SystemMetaDataEncrypted

  constructor(json: IHealthcareElement) {
    Object.assign(this as HealthcareElement, json as IHealthcareElement)
  }

  static toJSON(instance: HealthcareElement): any {
    const pojo: any = {}
    pojo['id'] = instance.id
    pojo['identifiers'] = instance.identifiers.map((item) => Identifier.toJSON(item))
    pojo['rev'] = instance.rev
    pojo['created'] = instance.created
    pojo['modified'] = instance.modified
    pojo['author'] = instance.author
    pojo['responsible'] = instance.responsible
    pojo['medicalLocationId'] = instance.medicalLocationId
    pojo['labels'] = Array.from([...instance.labels].map((item) => CodingReference.toJSON(item)))
    pojo['codes'] = Array.from([...instance.codes].map((item) => CodingReference.toJSON(item)))
    pojo['endOfLife'] = instance.endOfLife
    pojo['deletionDate'] = instance.deletionDate
    pojo['healthcareElementId'] = instance.healthcareElementId
    pojo['valueDate'] = instance.valueDate
    pojo['openingDate'] = instance.openingDate
    pojo['closingDate'] = instance.closingDate
    pojo['description'] = instance.description
    pojo['note'] = instance.note
    pojo['notes'] = instance.notes?.map((item) => Annotation.toJSON(item))
    pojo['systemMetaData'] = !!instance.systemMetaData ? SystemMetaDataEncrypted.toJSON(instance.systemMetaData) : undefined
    return pojo
  }

  static fromJSON(pojo: any): HealthcareElement {
    return new HealthcareElement({
      id: pojo['id'],
      identifiers: pojo['identifiers'].map((item: any) => Identifier.fromJSON(item)),
      rev: pojo['rev'],
      created: pojo['created'],
      modified: pojo['modified'],
      author: pojo['author'],
      responsible: pojo['responsible'],
      medicalLocationId: pojo['medicalLocationId'],
      labels: new Set(pojo['labels'].map((item: any) => CodingReference.fromJSON(item))),
      codes: new Set(pojo['codes'].map((item: any) => CodingReference.fromJSON(item))),
      endOfLife: pojo['endOfLife'],
      deletionDate: pojo['deletionDate'],
      healthcareElementId: pojo['healthcareElementId'],
      valueDate: pojo['valueDate'],
      openingDate: pojo['openingDate'],
      closingDate: pojo['closingDate'],
      description: pojo['description'],
      note: pojo['note'],
      notes: pojo['notes']?.map((item: any) => Annotation.fromJSON(item)),
      systemMetaData: !!pojo['systemMetaData'] ? SystemMetaDataEncrypted.fromJSON(pojo['systemMetaData']) : undefined,
    })
  }
}

interface IHealthcareElement {
  id?: string
  identifiers?: Array<Identifier>
  rev?: string
  created?: number
  modified?: number
  author?: string
  responsible?: string
  medicalLocationId?: string
  labels?: Set<CodingReference>
  codes?: Set<CodingReference>
  endOfLife?: number
  deletionDate?: number
  healthcareElementId?: string
  valueDate?: number
  openingDate?: number
  closingDate?: number
  description?: string
  note?: string
  notes?: Annotation[]
  systemMetaData?: SystemMetaDataEncrypted
}