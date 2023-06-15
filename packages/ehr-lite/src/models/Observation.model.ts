import { ISO639_1, Service } from '@icure/api'
import { mapTo } from "@icure/typescript-common"
import { Annotation } from './Annotation.model'
import { CodingReference } from './CodingReference.model'
import { Component } from './Component.model'
import { Identifier } from './Identifier.model'
import { LocalComponent } from './LocalComponent.model'
import { SystemMetaDataEncrypted } from './SystemMetaDataEncrypted.model'

@mapTo(Service)
export class Observation {
    id?: string
    transactionId?: string
    identifiers?: Identifier[]
    batchId?: string
    healthcareElementIds?: string[]
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
    localContent?: Map<ISO639_1, LocalComponent>
    qualifiedLinks?: Map<string, Map<string, string>>
    codes?: Set<CodingReference>
    tags?: Set<CodingReference>
    systemMetaData?: SystemMetaDataEncrypted
    notes?: Annotation[]

    constructor(observation?: IObservation | any) {
        this.id = observation?.id
        this.transactionId = observation?.transactionId
        this.identifiers = observation?.identifiers
        this.batchId = observation?.batchId
        this.healthcareElementIds = observation?.healthcareElementIds
        this.index = observation?.index
        this.component = observation?.component
        this.valueDate = observation?.valueDate
        this.openingDate = observation?.openingDate
        this.closingDate = observation?.closingDate
        this.created = observation?.created
        this.modified = observation?.modified
        this.endOfLife = observation?.endOfLife
        this.author = observation?.author
        this.performer = observation?.performer
        this.localContent = observation?.localContent
        this.qualifiedLinks = observation?.qualifiedLinks
        this.codes = observation?.codes
        this.tags = observation?.tags
        this.systemMetaData = observation?.systemMetaData
        this.notes = observation?.note
    }

    static toJSON(instance: Observation): any {
        const pojo: any = {}
        pojo["id"] = instance.id
        pojo["transactionId"] = instance.transactionId
        pojo["identifiers"] = instance.identifiers?.map(item => Identifier.toJSON(item))
        pojo["batchId"] = instance.batchId
        pojo["healthcareElementIds"] = instance.healthcareElementIds?.map(item => item)
        pojo["index"] = instance.index
        pojo["component"] = !!instance.component ? Component.toJSON(instance.component) : undefined
        pojo["valueDate"] = instance.valueDate
        pojo["openingDate"] = instance.openingDate
        pojo["closingDate"] = instance.closingDate
        pojo["created"] = instance.created
        pojo["modified"] = instance.modified
        pojo["endOfLife"] = instance.endOfLife
        pojo["author"] = instance.author
        pojo["performer"] = instance.performer
        pojo["localContent"] = !!instance.localContent ? Object.fromEntries([...instance.localContent.entries()].map(([k, v]) => [k, LocalComponent.toJSON(v)])) : undefined
        pojo["qualifiedLinks"] = !!instance.qualifiedLinks ? Object.fromEntries([...instance.qualifiedLinks.entries()].map(([k, v]) => [k, Object.fromEntries([...v.entries()].map(([k, v]) => [k, v]))])) : undefined
        pojo["codes"] = Array.from([...instance.codes ?? []]?.map(item => CodingReference.toJSON(item)) ?? [])
        pojo["tags"] = Array.from([...instance.tags ?? []]?.map(item => CodingReference.toJSON(item)) ?? [])
        pojo["systemMetaData"] = !!instance.systemMetaData ? SystemMetaDataEncrypted.toJSON(instance.systemMetaData) : undefined
        pojo["notes"] = instance.notes?.map(item => Annotation.toJSON(item))
        return pojo
    }

    static fromJSON(pojo: any): Observation {
        return new Observation({id: pojo["id"], transactionId: pojo["transactionId"], identifiers: pojo["identifiers"]?.map((item: any) => Identifier.fromJSON(item)), batchId: pojo["batchId"], healthcareElementIds: pojo["healthcareElementIds"]?.map((item: any) => item), index: pojo["index"], component: !!pojo["component"] ? Component.fromJSON(pojo["component"]) : undefined, valueDate: pojo["valueDate"], openingDate: pojo["openingDate"], closingDate: pojo["closingDate"], created: pojo["created"], modified: pojo["modified"], endOfLife: pojo["endOfLife"], author: pojo["author"], performer: pojo["performer"], localContent: pojo["localContent"] ? new Map(Object.entries(pojo["localContent"]).map(([k, v]: [any, any]) => [k, LocalComponent.fromJSON(v)])) : undefined, qualifiedLinks: pojo["qualifiedLinks"] ? new Map(Object.entries(pojo["qualifiedLinks"]).map(([k, v]: [any, any]) => [k, new Map(Object.entries(v).map(([k, v]: [any, any]) => [k, v]))])) : undefined, codes: new Set(pojo["codes"]?.map((item: any) => CodingReference.fromJSON(item)) ?? []), tags: new Set(pojo["tags"]?.map((item: any) => CodingReference.fromJSON(item)) ?? []), systemMetaData: !!pojo["systemMetaData"] ? SystemMetaDataEncrypted.fromJSON(pojo["systemMetaData"]) : undefined, notes: pojo["notes"]?.map((item: any) => Annotation.fromJSON(item))})
    }
}

interface IObservation {
    id?: string
    transactionId?: string
    identifiers?: Identifier[]
    batchId?: string
    healthcareElementIds?: string[]
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
    localContent?: Map<ISO639_1, LocalComponent>
    qualifiedLinks?: Map<string, Map<string, string>>
    codes?: CodingReference[]
    tags?: CodingReference[]
    systemMetaData?: SystemMetaDataEncrypted
    note?: Annotation[]
}
