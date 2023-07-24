// hephaestus-ignore-file
import { PaginatedDocumentKeyAndIdPairObject } from './PaginatedDocumentKeyAndIdPairObject.model'

export class PaginatedList<T> {
    constructor(json: IPaginatedList<T>) {
        Object.assign(this as PaginatedList<T>, json);
    }

    "rows": Array<T>
    "nextKeyPair"?: PaginatedDocumentKeyAndIdPairObject

    static toJSON<T>(instance: PaginatedList<T>, elementToJson: (tInstance: T) => any): any {
        const pojo: any = {}
        pojo["rows"] = instance.rows.map(elementToJson)
        if (instance.nextKeyPair) {
            pojo["nextKeyPair"] = PaginatedDocumentKeyAndIdPairObject.toJSON(instance.nextKeyPair)
        }
        return pojo
    }

    static fromJSON<T>(pojo: any, elementFromJson: (tPojo: any) => T): PaginatedList<T> {
        return new PaginatedList({
            rows: pojo["rows"].map(elementFromJson),
            nextKeyPair: pojo["nextKeyPair"] ? PaginatedDocumentKeyAndIdPairObject.fromJSON(pojo["nextKeyPair"]) : undefined
        })
    }

    static empty<T>(): PaginatedList<T> {
        return new PaginatedList({ rows: [] })
    }
}

interface IPaginatedList<T> {
    rows: Array<T>
    nextKeyPair?: PaginatedDocumentKeyAndIdPairObject
}
