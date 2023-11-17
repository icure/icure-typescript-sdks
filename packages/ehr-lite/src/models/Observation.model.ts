import { Annotation, CodingReference, Identifier, SystemMetaDataEncrypted, forceUuid, mapTo, ISO639_1, ServiceDto } from '@icure/typescript-common'
import { Component } from './Component.model'
import { LocalComponent } from './LocalComponent.model'

@mapTo(ServiceDto)
export class Observation {
    id: string
    transactionId?: string
    identifiers: Identifier[]
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
    localContent: Map<ISO639_1, LocalComponent>
    qualifiedLinks: Map<string, Map<string, string>>
    codes: Set<CodingReference>
    tags: Set<CodingReference>
    systemMetaData?: SystemMetaDataEncrypted
    notes: Annotation[]

    constructor(observation: IObservation) {
        this.id = forceUuid(observation.id)
        this.transactionId = observation.transactionId
        this.identifiers = observation.identifiers ?? []
        this.batchId = observation.batchId
        this.healthcareElementIds = observation.healthcareElementIds
        this.index = observation.index
        this.component = observation.component
        this.valueDate = observation.valueDate
        this.openingDate = observation.openingDate
        this.closingDate = observation.closingDate
        this.created = observation.created
        this.modified = observation.modified
        this.endOfLife = observation.endOfLife
        this.author = observation.author
        this.performer = observation.performer
        this.localContent = observation.localContent ?? new Map()
        this.qualifiedLinks = observation.qualifiedLinks ?? new Map()
        this.codes = observation.codes ?? new Set()
        this.tags = observation.tags ?? new Set()
        this.systemMetaData = observation.systemMetaData
        this.notes = observation.notes ?? []
    }

    static toJSON(instance: Observation): any {
        const pojo: any = {}
        pojo['id'] = instance.id
        if (instance.transactionId !== undefined) pojo['transactionId'] = instance.transactionId
        pojo['identifiers'] = instance.identifiers.map((item) => Identifier.toJSON(item))
        if (instance.batchId !== undefined) pojo['batchId'] = instance.batchId
        if (instance.healthcareElementIds !== undefined) pojo['healthcareElementIds'] = instance.healthcareElementIds?.map((item) => item)
        if (instance.index !== undefined) pojo['index'] = instance.index
        if (instance.component !== undefined) pojo['component'] = !!instance.component ? Component.toJSON(instance.component) : undefined
        if (instance.valueDate !== undefined) pojo['valueDate'] = instance.valueDate
        if (instance.openingDate !== undefined) pojo['openingDate'] = instance.openingDate
        if (instance.closingDate !== undefined) pojo['closingDate'] = instance.closingDate
        if (instance.created !== undefined) pojo['created'] = instance.created
        if (instance.modified !== undefined) pojo['modified'] = instance.modified
        if (instance.endOfLife !== undefined) pojo['endOfLife'] = instance.endOfLife
        if (instance.author !== undefined) pojo['author'] = instance.author
        if (instance.performer !== undefined) pojo['performer'] = instance.performer
        pojo['localContent'] = Object.fromEntries([...instance.localContent.entries()].map(([k, v]) => [k, LocalComponent.toJSON(v)]))
        pojo['qualifiedLinks'] = Object.fromEntries([...instance.qualifiedLinks.entries()].map(([k, v]) => [k, Object.fromEntries([...v.entries()].map(([k, v]) => [k, v]))]))
        pojo['codes'] = Array.from([...instance.codes].map((item) => CodingReference.toJSON(item)))
        pojo['tags'] = Array.from([...instance.tags].map((item) => CodingReference.toJSON(item)))
        if (instance.systemMetaData !== undefined) pojo['systemMetaData'] = !!instance.systemMetaData ? SystemMetaDataEncrypted.toJSON(instance.systemMetaData) : undefined
        pojo['notes'] = instance.notes.map((item) => Annotation.toJSON(item))
        return pojo
    }

    static fromJSON(pojo: any): Observation {
        const obj = {} as IObservation
        obj['id'] = pojo['id']
        if (pojo['transactionId'] !== undefined) {
            obj['transactionId'] = pojo['transactionId']
        }
        obj['identifiers'] = pojo['identifiers'].map((item: any) => Identifier.fromJSON(item))
        if (pojo['batchId'] !== undefined) {
            obj['batchId'] = pojo['batchId']
        }
        if (pojo['healthcareElementIds'] !== undefined) {
            obj['healthcareElementIds'] = pojo['healthcareElementIds']?.map((item: any) => item)
        }
        if (pojo['index'] !== undefined) {
            obj['index'] = pojo['index']
        }
        if (pojo['component'] !== undefined) {
            obj['component'] = !!pojo['component'] ? Component.fromJSON(pojo['component']) : undefined
        }
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
        if (pojo['performer'] !== undefined) {
            obj['performer'] = pojo['performer']
        }
        obj['localContent'] = new Map(Object.entries(pojo['localContent']).map(([k, v]: [any, any]) => [k, LocalComponent.fromJSON(v)]))
        obj['qualifiedLinks'] = new Map(Object.entries(pojo['qualifiedLinks']).map(([k, v]: [any, any]) => [k, new Map(Object.entries(v).map(([k, v]: [any, any]) => [k, v]))]))
        obj['codes'] = new Set(pojo['codes'].map((item: any) => CodingReference.fromJSON(item)))
        obj['tags'] = new Set(pojo['tags'].map((item: any) => CodingReference.fromJSON(item)))
        if (pojo['systemMetaData'] !== undefined) {
            obj['systemMetaData'] = !!pojo['systemMetaData'] ? SystemMetaDataEncrypted.fromJSON(pojo['systemMetaData']) : undefined
        }
        obj['notes'] = pojo['notes'].map((item: any) => Annotation.fromJSON(item))
        return new Observation(obj)
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
    codes?: Set<CodingReference>
    tags?: Set<CodingReference>
    systemMetaData?: SystemMetaDataEncrypted
    notes?: Annotation[]
}
