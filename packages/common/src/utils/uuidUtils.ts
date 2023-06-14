import {v4 as uuid, validate as isUuid} from "uuid";

export function forceUuid(id?: string): string {
    if (id) {
        if (!isUuid(id)) {
            throw Error('Invalid id, id must be a valid UUID')
        }
        return id
    } else {
        return uuid()
    }
}