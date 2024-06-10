import { deepEqual } from './Object.utils'

export function addUniqueObjectsToArray<T>(arr: T[], ...objs: (T | null)[]): T[] {
    const newArr = [...arr]

    for (let obj of objs) {
        if (!!obj && !newArr.some((item) => deepEqual(item, obj))) {
            newArr.push(obj)
        }
    }

    return newArr
}
