// hephaestus-ignore-file
import { PaginatedDocumentKeyAndIdPairObject } from './PaginatedDocumentKeyAndIdPairObject.model'

export class PaginatedList<T> {
    constructor(json: Partial<IPaginatedList<T>>) {
        Object.assign(this as PaginatedList<T>, json)
    }

    'rows': Array<T>
    'nextKeyPair'?: PaginatedDocumentKeyAndIdPairObject

    static toJSON<I, K extends I>(instance: PaginatedList<K>, elementToJson: (tInstance: K) => I): IPaginatedList<I> {
        const pojo: any = {}
        pojo['rows'] = instance.rows.map(elementToJson)
        if (instance.nextKeyPair) {
            pojo['nextKeyPair'] = PaginatedDocumentKeyAndIdPairObject.toJSON(instance.nextKeyPair)
        }
        return pojo
    }

    static fromJSON<I, K extends I>(pojo: IPaginatedList<I>, elementFromJson: (tPojo: I) => K): PaginatedList<K> {
        return new PaginatedList({
            rows: pojo['rows'].map(elementFromJson),
            nextKeyPair: pojo['nextKeyPair'] ? PaginatedDocumentKeyAndIdPairObject.fromJSON(pojo['nextKeyPair']) : undefined,
        })
    }

    static empty<T>(): PaginatedList<T> {
        return new PaginatedList({ rows: [] })
    }
}

export interface IPaginatedList<T> {
    rows: Array<T>
    nextKeyPair?: PaginatedDocumentKeyAndIdPairObject
}
