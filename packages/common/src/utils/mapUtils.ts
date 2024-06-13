export function recordOf<V>(mapObj: Partial<{ [key in string]: V }>): Record<string, V> {
    return Object.fromEntries(Object.entries(mapObj) as [string, V][])
}

export function toMap<V>(entries: [key: string, value: V][]): { [key: string]: V } {
    return entries.reduce(
        (m, [k, v]) => {
            m[k] = v
            return m
        },
        {} as { [key: string]: V },
    )
}

export function mapReduce<I, O>(
    map: { [key: string]: I } | undefined,
    mapper: (obj: I) => O | undefined,
):
    | {
          [key: string]: O
      }
    | undefined {
    if (!map) {
        return undefined
    }
    return Object.entries(map)
        .map(([k, v]) => [k, mapper(v)!] as [string, O])
        .reduce(
            (m, [k, v]) => {
                m[k] = v
                return m
            },
            {} as { [key: string]: O },
        )
}

export function mapSet<I, O>(set: Array<I> | undefined, mapper: (obj: I) => O | undefined): Array<O> | undefined {
    if (!set) {
        return undefined
    }
    const arr: I[] = (set)
    return (arr.map((it) => mapper(it)!))
}

export function mapSetToArray<I, O>(set: Array<I> | undefined, mapper: (obj: I) => O | undefined): Array<O> | undefined {
    if (!set) {
        return undefined
    }
    const arr: I[] = (set)
    return arr.map((it) => mapper(it)!)
}

export function map<I, O>(arr: I[] | undefined, mapper: (obj: I) => O | undefined): O[] | undefined {
    if (!arr) {
        return undefined
    }
    return arr.map((it) => mapper(it)!)
}

export function toMapTransform<I, O>(
    map: { [key: string]: I } | undefined,
    mapper: (obj: I) => O | undefined,
):
    | {
          [key: string]: O
      }
    | undefined {
    if (!map) {
        return undefined
    }
    return Object.fromEntries(Object.entries(map).map(([k, v]) => [k, mapper(v)!]))
}

export function toMapArrayTransform<I, O>(map: { [key: string]: Iterable<I> } | undefined, mapper: (obj: I) => O | undefined): { [key: string]: O[] } | undefined {
    if (!map) {
        return undefined
    }
    return Object.entries(map)
        .map(([k, v]) => [k, (Array.from(v).map((it) => mapper(it)!))] as [string, O[]])
        .reduce(
            (m, [k, v]) => {
                m[k] = v
                return m
            },
            {} as { [key: string]: O[] },
        )
}

export function toMapSetTransform<I, O>(map: { [key: string]: Iterable<I> } | undefined, mapper: (obj: I) => O | undefined): { [key: string]: Array<O> } | undefined {
    if (!map) {
        return undefined
    }
    return Object.entries(map)
        .map(([k, v]) => [k, (Array.from(v).map((it) => mapper(it)!))] as [string, Array<O>])
        .reduce(
            (m, [k, v]) => {
                m[k] = v
                return m
            },
            {} as { [key: string]: Array<O> },
        )
}

export function toMapSet<I>(map: { [key: string]: Iterable<I> } | undefined): { [key: string]: Array<I> } | undefined {
    return toMapSetTransform(map, (i) => i)
}
