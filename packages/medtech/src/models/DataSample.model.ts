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

import { CodingReference, ISO639_1, Identifier, ServiceDto, SystemMetaDataEncrypted, forceUuid, mapTo } from '@icure/typescript-common'
import { Content } from './Content.model'

/**
 * A Data Sample represents a medical information, provided by a Data Owner concerning one specific [Patient], for a T moment.       Provided by a Data Owner means that the data sample may have been either provided by a [HealthcareProfessional] or a [Patient], either collected by a [MedicalDevice].         Data Samples provided by the patient include subjective information, such as complaints, reason for visit, feelings, etc. or objective information       like bio-metric measures (blood pressure, temperature, heart beat, etc.), or physical exam description, diagnosis, prescription, integration of lab reports from another [HealthcareProfessional], action plan, etc.      Any action performed by the [HealthcareProfessional] (which is relevant for a [HealthcareElement] of a [Patient]) is considered as a [DataSample].       The data samples can be linked to healthcare elements or other structuring elements of the medical record
 */
@mapTo(ServiceDto)
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
    'healthcareElementIds'?: Array<string>
    /**
     * List of Ids of all canvases linked to the Data sample. Only used when the Data sample is emitted outside of its batch.
     */
    'canvasesIds'?: Array<string>
    /**
     * Used for sorting data samples inside an upper object (A batch, a transaction, a FHIR bundle, ...)
     */
    'index'?: number
    /**
     * Information contained in the data sample (Measure, number, ...). Content is localized, using ISO language code as key
     */
    'content': Record<ISO639_1, Content>
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
    'qualifiedLinks': Record<string, Record<string, string>>
    /**
     * A code is an item from a codification system that qualifies the content of this data sample. SNOMED-CT, ICPC-2 or ICD-10 codifications systems can be used for codes
     */
    'codes': Array<CodingReference>
    /**
     * A label is an item from a codification system that qualifies a data sample as being member of a certain class, whatever the value it might have taken. If the label qualifies the content of a field, it means that whatever the content of the field, the label will always apply. LOINC is a codification system typically used for labels.
     */
    'labels': Array<CodingReference>
    'systemMetaData'?: SystemMetaDataEncrypted

    constructor(json: IDataSample) {
        this.id = forceUuid(json.id)
        this.transactionId = json.transactionId
        this.identifiers = json.identifiers ?? []
        this.batchId = json.batchId
        this.healthcareElementIds = json.healthcareElementIds
        this.canvasesIds = json.canvasesIds
        this.content = json.content ?? {} as Record<ISO639_1, Content>
        this.valueDate = json.valueDate
        this.openingDate = json.openingDate
        this.closingDate = json.closingDate
        this.index = json.index
        this.created = json.created
        this.modified = json.modified
        this.author = json.author
        this.responsible = json.responsible
        this.comment = json.comment
        this.qualifiedLinks = json.qualifiedLinks ?? {}
        this.labels = json.labels ?? []
        this.systemMetaData = json.systemMetaData
        this.codes = json.codes ?? []
        this.endOfLife = json.endOfLife
    }

    static toJSON(instance: DataSample): any {
        const pojo: any = {}
        pojo['id'] = instance.id
        if (instance.transactionId !== undefined) pojo['transactionId'] = instance.transactionId
        pojo['identifiers'] = instance.identifiers.map((item) => Identifier.toJSON(item))
        if (instance.batchId !== undefined) pojo['batchId'] = instance.batchId
        if (instance.healthcareElementIds !== undefined) pojo['healthcareElementIds'] = ([...(instance.healthcareElementIds ?? [])]?.map((item) => item) ?? [])
        if (instance.canvasesIds !== undefined) pojo['canvasesIds'] = ([...(instance.canvasesIds ?? [])]?.map((item) => item) ?? [])
        if (instance.index !== undefined) pojo['index'] = instance.index
        pojo['content'] = Object.fromEntries([...Object.entries(instance.content)].map(([k, v]) => [k, Content.toJSON(v)]))
        if (instance.valueDate !== undefined) pojo['valueDate'] = instance.valueDate
        if (instance.openingDate !== undefined) pojo['openingDate'] = instance.openingDate
        if (instance.closingDate !== undefined) pojo['closingDate'] = instance.closingDate
        if (instance.created !== undefined) pojo['created'] = instance.created
        if (instance.modified !== undefined) pojo['modified'] = instance.modified
        if (instance.endOfLife !== undefined) pojo['endOfLife'] = instance.endOfLife
        if (instance.author !== undefined) pojo['author'] = instance.author
        if (instance.responsible !== undefined) pojo['responsible'] = instance.responsible
        if (instance.comment !== undefined) pojo['comment'] = instance.comment
        pojo['qualifiedLinks'] = Object.fromEntries([...Object.entries(instance.qualifiedLinks.entries)].map(([k, v]) => [k, Object.fromEntries([...Object.entries(v)].map(([k, v]) => [k, v]))]))
        pojo['codes'] = ([...instance.codes].map((item) => CodingReference.toJSON(item)))
        pojo['labels'] = ([...instance.labels].map((item) => CodingReference.toJSON(item)))
        if (instance.systemMetaData !== undefined) pojo['systemMetaData'] = !!instance.systemMetaData ? SystemMetaDataEncrypted.toJSON(instance.systemMetaData) : undefined
        return pojo
    }

    static fromJSON(pojo: any): DataSample {
        const obj = {} as IDataSample
        obj['id'] = pojo['id']
        if (pojo['transactionId'] !== undefined) {
            obj['transactionId'] = pojo['transactionId']
        }
        obj['identifiers'] = pojo['identifiers'].map((item: any) => Identifier.fromJSON(item))
        if (pojo['batchId'] !== undefined) {
            obj['batchId'] = pojo['batchId']
        }
        if (pojo['healthcareElementIds'] !== undefined) {
            obj['healthcareElementIds'] = pojo['healthcareElementIds']?.map((item: any) => item) ?? []
        }
        if (pojo['canvasesIds'] !== undefined) {
            obj['canvasesIds'] = pojo['canvasesIds']?.map((item: any) => item) ?? []
        }
        if (pojo['index'] !== undefined) {
            obj['index'] = pojo['index']
        }
        obj['content'] = Object.fromEntries(Object.entries(pojo['content']).map(([k, v]: [any, any]) => [k, Content.fromJSON(v)]))
        if (pojo['valueDate'] !== undefined) {
            obj['valueDate'] = pojo['valueDate']
        }
        if (pojo['openingDate'] !== undefined) {
            obj['openingDate'] = pojo['openingDate']
        }
        if (pojo['closingDate'] !== undefined) {
            obj['closingDate'] = pojo['closingDate']
        }
        if (pojo['created'] !== undefined) {
            obj['created'] = pojo['created']
        }
        if (pojo['modified'] !== undefined) {
            obj['modified'] = pojo['modified']
        }
        if (pojo['endOfLife'] !== undefined) {
            obj['endOfLife'] = pojo['endOfLife']
        }
        if (pojo['author'] !== undefined) {
            obj['author'] = pojo['author']
        }
        if (pojo['responsible'] !== undefined) {
            obj['responsible'] = pojo['responsible']
        }
        if (pojo['comment'] !== undefined) {
            obj['comment'] = pojo['comment']
        }
        obj['qualifiedLinks'] = Object.fromEntries(Object.entries(pojo['qualifiedLinks']).map(([k, v]: [any, any]) => [k, Object.fromEntries(Object.entries(v).map(([k, v]: [any, any]) => [k, v]))]))
        obj['codes'] = pojo['codes'].map((item: any) => CodingReference.fromJSON(item))
        obj['labels'] = pojo['labels'].map((item: any) => CodingReference.fromJSON(item))
        if (pojo['systemMetaData'] !== undefined) {
            obj['systemMetaData'] = !!pojo['systemMetaData'] ? SystemMetaDataEncrypted.fromJSON(pojo['systemMetaData']) : undefined
        }
        return new DataSample(obj)
    }
}

interface IDataSample {
    id?: string
    transactionId?: string
    identifiers?: Array<Identifier>
    batchId?: string
    healthcareElementIds?: Array<string>
    canvasesIds?: Array<string>
    index?: number
    content?: Record<ISO639_1, Content>
    valueDate?: number
    openingDate?: number
    closingDate?: number
    created?: number
    modified?: number
    endOfLife?: number
    author?: string
    responsible?: string
    comment?: string
    qualifiedLinks?: Record<string, Record<string, string>>
    codes?: Array<CodingReference>
    labels?: Array<CodingReference>
    systemMetaData?: SystemMetaDataEncrypted
}
