import {PaginatedDocumentKeyAndIdPairObject} from "./PaginatedDocumentKeyAndIdPairObject";

export interface PaginatedList<T> {
    pageSize?: number
    totalSize?: number
    rows?: Array<T>
    nextKeyPair?: PaginatedDocumentKeyAndIdPairObject
}
