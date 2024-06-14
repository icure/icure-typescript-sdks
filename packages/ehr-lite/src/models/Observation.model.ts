import {
    Annotation,
    CodingReference,
    EntityId,
    IAnnotation,
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
import { Component, IComponent } from './Component.model';
import { ILocalComponent, LocalComponent } from './LocalComponent.model';

@mapTo(ServiceDto)
export class Observation implements IObservation {
    id: EntityId
    transactionId?: string
    identifiers: Identifier[] = []
    batchId?: string
    healthcareElementIds?: string[] = []
    index?: number
    component?: Component
    valueDate?: number
    openingDate?: number
    closingDate?: number
    created?: number
    modified?: number
    endOfLife?: number
    author?: string
    performer?: string
    localContent: Record<ISO639_1, LocalComponent> = {} as Record<ISO639_1, LocalComponent>
    qualifiedLinks: Record<string, Record<string, string>> = {}
    codes: CodingReference[] = []
    tags: CodingReference[] = []
    systemMetaData?: SystemMetaDataEncrypted
    notes: Annotation[] = []

    toJSON(): IObservation {
        return {
        id: this.id,
        transactionId: this.transactionId,
        identifiers: this.identifiers.map(item => item.toJSON()),
        batchId: this.batchId,
        healthcareElementIds: this.healthcareElementIds?.map(item => item),
        index: this.index,
        component: !!this.component ? this.component.toJSON() : undefined,
        valueDate: this.valueDate,
        openingDate: this.openingDate,
        closingDate: this.closingDate,
        created: this.created,
        modified: this.modified,
        endOfLife: this.endOfLife,
        author: this.author,
        performer: this.performer,
        localContent: Object.fromEntries(Object.entries(this.localContent).map(([k, v]: [any, LocalComponent]) => [k, v.toJSON()])),
        qualifiedLinks: {...this.qualifiedLinks},
        codes: this.codes.map(item => item.toJSON()),
        tags: this.tags.map(item => item.toJSON()),
        systemMetaData: !!this.systemMetaData ? this.systemMetaData.toJSON() : undefined,
        notes: this.notes.map(item => item.toJSON()),
        }
    }

    constructor(json: Partial<IObservation> ) {
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
        if (json["index"] !== undefined) {
            this.index = json["index"]!
        }
        if (json["component"] !== undefined) {
            this.component = new Component(json["component"]!)
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
        if (json["performer"] !== undefined) {
            this.performer = json["performer"]!
        }
        if (json["localContent"] !== undefined) {
            this.localContent = Object.fromEntries(Object.entries(json["localContent"]!).map(([k, v]: [any, ILocalComponent]) => [k, new LocalComponent(v)]))
        }
        if (json["qualifiedLinks"] !== undefined) {
            this.qualifiedLinks = {...json["qualifiedLinks"]!}
        }
        if (json["codes"] !== undefined) {
            this.codes = json["codes"]!.map((item: any) => new CodingReference(item))
        }
        if (json["tags"] !== undefined) {
            this.tags = json["tags"]!.map((item: any) => new CodingReference(item))
        }
        if (json["systemMetaData"] !== undefined) {
            this.systemMetaData = new SystemMetaDataEncrypted(json["systemMetaData"]!)
        }
        if (json["notes"] !== undefined) {
            this.notes = json["notes"]!.map((item: any) => new Annotation(item))
        }
    }
}

export interface IObservation {
    id: EntityId
    transactionId?: string
    identifiers: IIdentifier[]
    batchId?: string
    healthcareElementIds?: string[]
    index?: number
    component?: IComponent
    valueDate?: number
    openingDate?: number
    closingDate?: number
    created?: number
    modified?: number
    endOfLife?: number
    author?: string
    performer?: string
    localContent: Record<ISO639_1, ILocalComponent>
    qualifiedLinks: Record<string, Record<string, string>>
    codes: ICodingReference[]
    tags: ICodingReference[]
    systemMetaData?: ISystemMetaDataEncrypted
    notes: IAnnotation[]
}
