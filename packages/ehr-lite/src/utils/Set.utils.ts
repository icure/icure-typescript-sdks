import {deepEqual} from "@icure/typescript-common";

export function addUniqueObjectToSet<T>(set: Set<T>, obj: T): Set<T> {
    for (const item of set) {
        if (deepEqual(item, obj)) {
            return set
        }
    }

    return new Set([...set, obj])
}

export function addUniqueObjectsToSet<T>(set: Set<T>, ...objs: T[]): Set<T> {
    const newSet = new Set(set)

    for (let obj of objs) {
        const exists = Array.from(newSet).some((item) => deepEqual(item, obj))
        if (!exists) {
            newSet.add(obj)
        }
    }

    return newSet
}
