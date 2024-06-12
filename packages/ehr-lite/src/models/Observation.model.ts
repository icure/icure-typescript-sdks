import { Annotation, CodingReference, ISO639_1, Identifier, ServiceDto, SystemMetaDataEncrypted, forceUuid, mapTo } from '@icure/typescript-common'
import { Component } from './Component.model'
import { LocalComponent } from './LocalComponent.model'

@mapTo(ServiceDto)
export class Observation implements IObservation {
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
    localContent: Record<ISO639_1, LocalComponent>
    qualifiedLinks: Record<string, Record<string, string>>
    codes: Array<CodingReference>
    tags: Array<CodingReference>
    systemMetaData?: SystemMetaDataEncrypted
    notes: Annotation[]

    constructor(observation: Partial<IObservation>) {
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
        this.localContent = observation.localContent ?? ({} as Record<ISO639_1, LocalComponent>)
        this.qualifiedLinks = observation.qualifiedLinks ?? {}
        this.codes = observation.codes ?? []
        this.tags = observation.tags ?? []
        this.systemMetaData = observation.systemMetaData
        this.notes = observation.notes ?? []
    }

    static toJSON(instance: Observation): IObservation {
        const pojo: IObservation = {} as IObservation
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
        pojo['localContent'] = { ...instance.localContent }
        pojo['qualifiedLinks'] = { ...instance.qualifiedLinks }
        pojo['codes'] = instance.codes.map((item) => CodingReference.toJSON(item))
        pojo['tags'] = instance.tags.map((item) => CodingReference.toJSON(item))
        if (instance.systemMetaData !== undefined) pojo['systemMetaData'] = !!instance.systemMetaData ? SystemMetaDataEncrypted.toJSON(instance.systemMetaData) : undefined
        pojo['notes'] = instance.notes.map((item) => Annotation.toJSON(item))
        return pojo
    }

    static fromJSON(pojo: IObservation): Observation {
        const obj = {} as IObservation
        obj['id'] = pojo['id']
        if (pojo['transactionId'] !== undefined) {
            obj['transactionId'] = pojo['transactionId']!
        }
        obj['identifiers'] = pojo['identifiers'].map((item: any) => Identifier.fromJSON(item))
        if (pojo['batchId'] !== undefined) {
            obj['batchId'] = pojo['batchId']!
        }
        if (pojo['healthcareElementIds'] !== undefined) {
            obj['healthcareElementIds'] = pojo['healthcareElementIds']!?.map((item: any) => item)
        }
        if (pojo['index'] !== undefined) {
            obj['index'] = pojo['index']!
        }
        if (pojo['component'] !== undefined) {
            obj['component'] = !!pojo['component']! ? Component.fromJSON(pojo['component']!) : undefined
        }
        if (pojo['valueDate'] !== undefined) {
            obj['valueDate'] = pojo['valueDate']!
        }
        if (pojo['openingDate'] !== undefined) {
            obj['openingDate'] = pojo['openingDate']!
        }
        if (pojo['closingDate'] !== undefined) {
            obj['closingDate'] = pojo['closingDate']!
        }
        if (pojo['created'] !== undefined) {
            obj['created'] = pojo['created']!
        }
        if (pojo['modified'] !== undefined) {
            obj['modified'] = pojo['modified']!
        }
        if (pojo['endOfLife'] !== undefined) {
            obj['endOfLife'] = pojo['endOfLife']!
        }
        if (pojo['author'] !== undefined) {
            obj['author'] = pojo['author']!
        }
        if (pojo['performer'] !== undefined) {
            obj['performer'] = pojo['performer']!
        }
        obj['localContent'] = { ...pojo['localContent'] }
        obj['qualifiedLinks'] = { ...pojo['qualifiedLinks'] }
        obj['codes'] = pojo['codes'].map((item: any) => CodingReference.fromJSON(item))
        obj['tags'] = pojo['tags'].map((item: any) => CodingReference.fromJSON(item))
        if (pojo['systemMetaData'] !== undefined) {
            obj['systemMetaData'] = !!pojo['systemMetaData']! ? SystemMetaDataEncrypted.fromJSON(pojo['systemMetaData']!) : undefined
        }
        obj['notes'] = pojo['notes'].map((item: any) => Annotation.fromJSON(item))
        return new Observation(obj)
    }
}

interface IObservation {
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
    localContent: Record<ISO639_1, LocalComponent>
    qualifiedLinks: Record<string, Record<string, string>>
    codes: Array<CodingReference>
    tags: Array<CodingReference>
    systemMetaData?: SystemMetaDataEncrypted
    notes: Annotation[]
}
