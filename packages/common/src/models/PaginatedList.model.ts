// hephaestus-ignore-file
import {
    IPaginatedDocumentKeyAndIdPairObject,
    PaginatedDocumentKeyAndIdPairObject
} from './PaginatedDocumentKeyAndIdPairObject.model'

export class PaginatedList<T> {
    rows: T[] = [] = []
    nextKeyPair?: PaginatedDocumentKeyAndIdPairObject

    constructor(json: Partial<IPaginatedList<T>>) {
        this.rows = json['rows'] || [] //
        this.nextKeyPair = json['nextKeyPair'] ? new PaginatedDocumentKeyAndIdPairObject(json['nextKeyPair']) : undefined
    }

    static toJSON<I, K extends I>(instance: PaginatedList<K>, elementToJson: (tInstance: K) => I): IPaginatedList<I> {
        return {
            rows: instance.rows.map(elementToJson),
            nextKeyPair: instance.nextKeyPair?.toJSON(),
        }
    }

    static fromJSON<I, K extends I>(pojo: IPaginatedList<I>, elementFromJson: (tPojo: I) => K): PaginatedList<K> {
        return new PaginatedList({
            rows: pojo['rows'].map(elementFromJson),
            nextKeyPair: pojo['nextKeyPair'],
        })
    }

    static empty<T>(): PaginatedList<T> {
        return new PaginatedList({ rows: [] })
    }
}

export interface IPaginatedList<T> {
    rows: T[]
    nextKeyPair?: IPaginatedDocumentKeyAndIdPairObject
}
