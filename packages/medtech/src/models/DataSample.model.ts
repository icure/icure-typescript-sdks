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

import {
    CodingReference,
    EntityId,
    ICodingReference,
    IIdentifier,
    ISO639_1,
    ISystemMetaDataEncrypted,
    Identifier,
    ServiceDto,
    SystemMetaDataEncrypted,
    forceUuid,
    mapTo
} from '@icure/typescript-common';
import { Content, IContent } from './Content.model';

/**
 * A Data Sample represents a medical information, provided by a Data Owner concerning one specific [Patient], for a T moment.       Provided by a Data Owner means that the data sample may have been either provided by a [HealthcareProfessional] or a [Patient], either collected by a [MedicalDevice].         Data Samples provided by the patient include subjective information, such as complaints, reason for visit, feelings, etc. or objective information       like bio-metric measures (blood pressure, temperature, heart beat, etc.), or physical exam description, diagnosis, prescription, integration of lab reports from another [HealthcareProfessional], action plan, etc.      Any action performed by the [HealthcareProfessional] (which is relevant for a [HealthcareElement] of a [Patient]) is considered as a [DataSample].       The data samples can be linked to healthcare elements or other structuring elements of the medical record
 */
@mapTo(ServiceDto)
export class DataSample {
    /**
     * The Id of the Data sample. We encourage using either a v4 UUID or a HL7 Id.
     */
    id: EntityId
    /**
     * The transactionId is used when a single data sample had to be split into parts for technical reasons. Several data samples with the same non null transaction id form one single data sample
     */
    transactionId?: string
    /**
     * Typically used for business / client identifiers. An identifier should identify a data sample uniquely and unambiguously. However, iCure cant guarantee the uniqueness of those identifiers : This is something you need to take care of.
     */
    identifiers: Identifier[] = []
    /**
     * Id of the batch that embeds this data sample
     */
    batchId?: string
    /**
     * List of IDs of all healthcare elements for which the data sample is provided. Only used when the Data sample is emitted outside of its batch
     */
    healthcareElementIds?: string[] = []
    /**
     * List of Ids of all canvases linked to the Data sample. Only used when the Data sample is emitted outside of its batch.
     */
    canvasesIds?: string[] = []
    /**
     * Used for sorting data samples inside an upper object (A batch, a transaction, a FHIR bundle, ...)
     */
    index?: number
    /**
     * Information contained in the data sample (Measure, number, ...). Content is localized, using ISO language code as key
     */
    content: Record<ISO639_1, Content> = {} as Record<ISO639_1, Content>
    /**
     * The date (YYYYMMDDhhmmss) when the Data sample is noted to have started and also closes on the same date
     */
    valueDate?: number
    /**
     * The date (YYYYMMDDhhmmss) of the start of the Data sample
     */
    openingDate?: number
    /**
     * The date (YYYYMMDDhhmmss) marking the end of the Data sample
     */
    closingDate?: number
    /**
     * The timestamp (unix epoch in ms) of creation of this data sample in iCure system. Will be filled automatically if not provided.
     */
    created?: number
    /**
     * The timestamp (unix epoch in ms) of the latest modification of this data sample in iCure system. Will be filled automatically if not provided.
     */
    modified?: number
    /**
     * Soft delete (unix epoch in ms) timestamp of the data sample
     */
    endOfLife?: number
    /**
     * The id of the [User] that created this data sample. When creating the data sample, will be filled automatically by the current user id if not provided.
     */
    author?: string
    /**
     * The id of the data owner that is responsible of this data sample. When creating the data sample, will be filled automatically by the current user data owner id ([HealthcareProfessional], [Patient] or [MedicalDevice]) if missing
     */
    responsible?: string
    /**
     * Text, comments on the Data sample provided
     */
    comment?: string
    /**
     * Links towards related data samples (possibly in other batches)
     */
    qualifiedLinks: Record<string, Record<string, string>> = {}
    /**
     * A code is an item from a codification system that qualifies the content of this data sample. SNOMED-CT, ICPC-2 or ICD-10 codifications systems can be used for codes
     */
    codes: CodingReference[] = []
    /**
     * A label is an item from a codification system that qualifies a data sample as being member of a certain class, whatever the value it might have taken. If the label qualifies the content of a field, it means that whatever the content of the field, the label will always apply. LOINC is a codification system typically used for labels.
     */
    labels: CodingReference[] = []
    systemMetaData?: SystemMetaDataEncrypted

    toJSON(): IDataSample {
        return {
        id: this.id,
        transactionId: this.transactionId,
        identifiers: this.identifiers.map(item => item.toJSON()),
        batchId: this.batchId,
        healthcareElementIds: this.healthcareElementIds?.map(item => item),
        canvasesIds: this.canvasesIds?.map(item => item),
        index: this.index,
        content: Object.fromEntries(Object.entries(this.content).map(([k, v]: [any, Content]) => [k, v.toJSON()])),
        valueDate: this.valueDate,
        openingDate: this.openingDate,
        closingDate: this.closingDate,
        created: this.created,
        modified: this.modified,
        endOfLife: this.endOfLife,
        author: this.author,
        responsible: this.responsible,
        comment: this.comment,
        qualifiedLinks: {...this.qualifiedLinks},
        codes: this.codes.map(item => item.toJSON()),
        labels: this.labels.map(item => item.toJSON()),
        systemMetaData: !!this.systemMetaData ? this.systemMetaData.toJSON() : undefined,
        }
    }

    constructor(json: Partial<IDataSample> ) {
        this.id = forceUuid(json["id"]!)
        if (json["transactionId"] !== undefined) {
            this.transactionId = json["transactionId"]!
        }
        if (json["identifiers"] !== undefined) {
            this.identifiers = json["identifiers"]!.map((item: any) => new Identifier(item))
        }
        if (json["batchId"] !== undefined) {
            this.batchId = json["batchId"]!
        }
        if (json["healthcareElementIds"] !== undefined) {
            this.healthcareElementIds = json["healthcareElementIds"]!.map((item: any) => item)
        }
        if (json["canvasesIds"] !== undefined) {
            this.canvasesIds = json["canvasesIds"]!.map((item: any) => item)
        }
        if (json["index"] !== undefined) {
            this.index = json["index"]!
        }
        if (json["content"] !== undefined) {
            this.content = Object.fromEntries(Object.entries(json["content"]!).map(([k, v]: [any, IContent]) => [k, new Content(v)]))
        }
        if (json["valueDate"] !== undefined) {
            this.valueDate = json["valueDate"]!
        }
        if (json["openingDate"] !== undefined) {
            this.openingDate = json["openingDate"]!
        }
        if (json["closingDate"] !== undefined) {
            this.closingDate = json["closingDate"]!
        }
        if (json["created"] !== undefined) {
            this.created = json["created"]!
        }
        if (json["modified"] !== undefined) {
            this.modified = json["modified"]!
        }
        if (json["endOfLife"] !== undefined) {
            this.endOfLife = json["endOfLife"]!
        }
        if (json["author"] !== undefined) {
            this.author = json["author"]!
        }
        if (json["responsible"] !== undefined) {
            this.responsible = json["responsible"]!
        }
        if (json["comment"] !== undefined) {
            this.comment = json["comment"]!
        }
        if (json["qualifiedLinks"] !== undefined) {
            this.qualifiedLinks = {...json["qualifiedLinks"]!}
        }
        if (json["codes"] !== undefined) {
            this.codes = json["codes"]!.map((item: any) => new CodingReference(item))
        }
        if (json["labels"] !== undefined) {
            this.labels = json["labels"]!.map((item: any) => new CodingReference(item))
        }
        if (json["systemMetaData"] !== undefined) {
            this.systemMetaData = new SystemMetaDataEncrypted(json["systemMetaData"]!)
        }
    }
}

export interface IDataSample {
    id: EntityId
    transactionId?: string
    identifiers: IIdentifier[]
    batchId?: string
    healthcareElementIds?: string[]
    canvasesIds?: string[]
    index?: number
    content: Record<ISO639_1, IContent>
    valueDate?: number
    openingDate?: number
    closingDate?: number
    created?: number
    modified?: number
    endOfLife?: number
    author?: string
    responsible?: string
    comment?: string
    qualifiedLinks: Record<string, Record<string, string>>
    codes: ICodingReference[]
    labels: ICodingReference[]
    systemMetaData?: ISystemMetaDataEncrypted
}
