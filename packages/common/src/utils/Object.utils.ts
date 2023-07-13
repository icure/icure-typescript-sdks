export function deepEqual<T>(a: T, b: T): boolean {
    if (a === b) {
        return true
    }

    if (typeof a !== 'object' || a === null || typeof b !== 'object' || b === null) {
        return false
    }

    const keysA = Object.keys(a)
    const keysB = Object.keys(b)

    if (keysA.length !== keysB.length) {
        return false
    }

    for (let key of keysA) {
        if (!keysB.includes(key)) {
            return false
        }
        if (!deepEqual((a as any)[key], (b as any)[key])) {
            return false
        }
    }

    return true
}
