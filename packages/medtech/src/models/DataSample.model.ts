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

import { ISO639_1, Service } from '@icure/api'
import { CodingReference, Identifier, SystemMetaDataEncrypted, forceUuid, mapTo } from '@icure/typescript-common'
import { Content } from './Content.model'

/**
 * A Data Sample represents a medical information, provided by a Data Owner concerning one specific [Patient], for a T moment.       Provided by a Data Owner means that the data sample may have been either provided by a [HealthcareProfessional] or a [Patient], either collected by a [MedicalDevice].         Data Samples provided by the patient include subjective information, such as complaints, reason for visit, feelings, etc. or objective information       like bio-metric measures (blood pressure, temperature, heart beat, etc.), or physical exam description, diagnosis, prescription, integration of lab reports from another [HealthcareProfessional], action plan, etc.      Any action performed by the [HealthcareProfessional] (which is relevant for a [HealthcareElement] of a [Patient]) is considered as a [DataSample].       The data samples can be linked to healthcare elements or other structuring elements of the medical record
 */
@mapTo(Service)
export class DataSample {
  /**
   * The Id of the Data sample. We encourage using either a v4 UUID or a HL7 Id.
   */
  'id': string
  /**
   * The transactionId is used when a single data sample had to be split into parts for technical reasons. Several data samples with the same non null transaction id form one single data sample
   */
  'transactionId'?: string
  /**
   * Typically used for business / client identifiers. An identifier should identify a data sample uniquely and unambiguously. However, iCure can't guarantee the uniqueness of those identifiers : This is something you need to take care of.
   */
  'identifiers': Array<Identifier>
  /**
   * Id of the batch that embeds this data sample
   */
  'batchId'?: string
  /**
   * List of IDs of all healthcare elements for which the data sample is provided. Only used when the Data sample is emitted outside of its batch
   */
  'healthcareElementIds'?: Set<string>
  /**
   * List of Ids of all canvases linked to the Data sample. Only used when the Data sample is emitted outside of its batch.
   */
  'canvasesIds'?: Set<string>
  /**
   * Used for sorting data samples inside an upper object (A batch, a transaction, a FHIR bundle, ...)
   */
  'index'?: number
  /**
   * Information contained in the data sample (Measure, number, ...). Content is localized, using ISO language code as key
   */
  'content': Map<ISO639_1, Content>
  /**
   * The date (YYYYMMDDhhmmss) when the Data sample is noted to have started and also closes on the same date
   */
  'valueDate'?: number
  /**
   * The date (YYYYMMDDhhmmss) of the start of the Data sample
   */
  'openingDate'?: number
  /**
   * The date (YYYYMMDDhhmmss) marking the end of the Data sample
   */
  'closingDate'?: number
  /**
   * The timestamp (unix epoch in ms) of creation of this data sample in iCure system. Will be filled automatically if not provided.
   */
  'created'?: number
  /**
   * The timestamp (unix epoch in ms) of the latest modification of this data sample in iCure system. Will be filled automatically if not provided.
   */
  'modified'?: number
  /**
   * Soft delete (unix epoch in ms) timestamp of the data sample
   */
  'endOfLife'?: number
  /**
   * The id of the [User] that created this data sample. When creating the data sample, will be filled automatically by the current user id if not provided.
   */
  'author'?: string
  /**
   * The id of the data owner that is responsible of this data sample. When creating the data sample, will be filled automatically by the current user data owner id ([HealthcareProfessional], [Patient] or [MedicalDevice]) if missing
   */
  'responsible'?: string
  /**
   * Text, comments on the Data sample provided
   */
  'comment'?: string
  /**
   * Links towards related data samples (possibly in other batches)
   */
  'qualifiedLinks': Map<string, Map<string, string>>
  /**
   * A code is an item from a codification system that qualifies the content of this data sample. SNOMED-CT, ICPC-2 or ICD-10 codifications systems can be used for codes
   */
  'codes': Set<CodingReference>
  /**
   * A label is an item from a codification system that qualifies a data sample as being member of a certain class, whatever the value it might have taken. If the label qualifies the content of a field, it means that whatever the content of the field, the label will always apply. LOINC is a codification system typically used for labels.
   */
  'labels': Set<CodingReference>
  'systemMetaData'?: SystemMetaDataEncrypted

  constructor(json: IDataSample) {
    this.id = forceUuid(json.id)
    this.transactionId = json.transactionId
    this.identifiers = json.identifiers ?? []
    this.batchId = json.batchId
    this.healthcareElementIds = json.healthcareElementIds
    this.canvasesIds = json.canvasesIds
    this.content = json.content ?? new Map()
    this.valueDate = json.valueDate
    this.openingDate = json.openingDate
    this.closingDate = json.closingDate
    this.index = json.index
    this.created = json.created
    this.modified = json.modified
    this.author = json.author
    this.responsible = json.responsible
    this.comment = json.comment
    this.qualifiedLinks = json.qualifiedLinks ?? new Map()
    this.labels = json.labels ?? new Set()
    this.systemMetaData = json.systemMetaData
    this.codes = json.codes ?? new Set()
    this.endOfLife = json.endOfLife
  }

  static toJSON(instance: DataSample): any {
    const pojo: any = {}
    pojo['id'] = instance.id
    pojo['transactionId'] = instance.transactionId
    pojo['identifiers'] = instance.identifiers.map((item) => Identifier.toJSON(item))
    pojo['batchId'] = instance.batchId
    pojo['healthcareElementIds'] = Array.from([...(instance.healthcareElementIds ?? [])]?.map((item) => item) ?? [])
    pojo['canvasesIds'] = Array.from([...(instance.canvasesIds ?? [])]?.map((item) => item) ?? [])
    pojo['index'] = instance.index
    pojo['content'] = Object.fromEntries([...instance.content.entries()].map(([k, v]) => [k, Content.toJSON(v)]))
    pojo['valueDate'] = instance.valueDate
    pojo['openingDate'] = instance.openingDate
    pojo['closingDate'] = instance.closingDate
    pojo['created'] = instance.created
    pojo['modified'] = instance.modified
    pojo['endOfLife'] = instance.endOfLife
    pojo['author'] = instance.author
    pojo['responsible'] = instance.responsible
    pojo['comment'] = instance.comment
    pojo['qualifiedLinks'] = Object.fromEntries(
      [...instance.qualifiedLinks.entries()].map(([k, v]) => [k, Object.fromEntries([...v.entries()].map(([k, v]) => [k, v]))])
    )
    pojo['codes'] = Array.from([...instance.codes].map((item) => CodingReference.toJSON(item)))
    pojo['labels'] = Array.from([...instance.labels].map((item) => CodingReference.toJSON(item)))
    pojo['systemMetaData'] = !!instance.systemMetaData ? SystemMetaDataEncrypted.toJSON(instance.systemMetaData) : undefined
    return pojo
  }

  static fromJSON(pojo: any): DataSample {
    return new DataSample({
      id: pojo['id'],
      transactionId: pojo['transactionId'],
      identifiers: pojo['identifiers'].map((item: any) => Identifier.fromJSON(item)),
      batchId: pojo['batchId'],
      healthcareElementIds: new Set(pojo['healthcareElementIds']?.map((item: any) => item) ?? []),
      canvasesIds: new Set(pojo['canvasesIds']?.map((item: any) => item) ?? []),
      index: pojo['index'],
      content: new Map(Object.entries(pojo['content']).map(([k, v]: [any, any]) => [k, Content.fromJSON(v)])),
      valueDate: pojo['valueDate'],
      openingDate: pojo['openingDate'],
      closingDate: pojo['closingDate'],
      created: pojo['created'],
      modified: pojo['modified'],
      endOfLife: pojo['endOfLife'],
      author: pojo['author'],
      responsible: pojo['responsible'],
      comment: pojo['comment'],
      qualifiedLinks: new Map(
        Object.entries(pojo['qualifiedLinks']).map(([k, v]: [any, any]) => [k, new Map(Object.entries(v).map(([k, v]: [any, any]) => [k, v]))])
      ),
      codes: new Set(pojo['codes'].map((item: any) => CodingReference.fromJSON(item))),
      labels: new Set(pojo['labels'].map((item: any) => CodingReference.fromJSON(item))),
      systemMetaData: !!pojo['systemMetaData'] ? SystemMetaDataEncrypted.fromJSON(pojo['systemMetaData']) : undefined,
    })
  }
}

interface IDataSample {
  id?: string
  transactionId?: string
  identifiers?: Array<Identifier>
  batchId?: string
  healthcareElementIds?: Set<string>
  canvasesIds?: Set<string>
  index?: number
  content?: Map<ISO639_1, Content>
  valueDate?: number
  openingDate?: number
  closingDate?: number
  created?: number
  modified?: number
  endOfLife?: number
  author?: string
  responsible?: string
  comment?: string
  qualifiedLinks?: Map<string, Map<string, string>>
  codes?: Set<CodingReference>
  labels?: Set<CodingReference>
  systemMetaData?: SystemMetaDataEncrypted
}
