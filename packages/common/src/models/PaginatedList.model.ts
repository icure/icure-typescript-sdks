import {PaginatedDocumentKeyAndIdPairObject} from "./PaginatedDocumentKeyAndIdPairObject.model";

export interface PaginatedList<T> {
    pageSize?: number
    totalSize?: number
    rows?: Array<T>
    nextKeyPair?: PaginatedDocumentKeyAndIdPairObject
}
