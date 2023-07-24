import { PersonName } from '@icure/api'
import { mapTo } from '@icure/typescript-common'
import { HumanNameUseEnum } from './enums/HumanNameUse.enum'

@mapTo(PersonName)
export class HumanName {
    family?: string
    given: string[]
    start?: number
    end?: number
    prefix: string[]
    suffix: string[]
    text?: string
    use?: HumanNameUseEnum

    constructor(humanName: IHumanName) {
        this.family = humanName.family
        this.given = humanName.given ?? []
        this.start = humanName.start
        this.end = humanName.end
        this.prefix = humanName.prefix ?? []
        this.suffix = humanName.suffix ?? []
        this.text = humanName.text
        this.use = humanName.use
    }

    // /**
    //  * Get the preferred name for a human which has/had one or more names, chosen in according to the following rules.
    //  * The preferred name is a name with at least one {@link HumanName.given} name or a {@link HumanName.family} name,
    //  * and without an end date.
    //  * In case multiple names match the criteria, the following rules are applied:
    //  * 1. The first name matching the criteria with {@link HumanNameUseEnum.OFFICIAL} {@link HumanName.use} in the list,
    //  *    if any, else
    //  * 2. The first name matching the criteria with {@link HumanNameUseEnum.USUAL} use, if any, else
    //  * 3. The first name matching the criteria.
    //  * If there is no name matching the criteria this method returns undefined.
    //  * @param names different names for a human
    //  * @return the preferred name of the human
    //  */
    // static preferredNameFrom(names: HumanName[]): HumanName | undefined {
    //     const candidates = names.filter((name) =>
    //       !name.end && (!!name.given?.length || !!name.family)
    //     )
    //     return candidates.find((name) => name.use === 'official') ??
    //       candidates.find((name) => name.use === 'usual') ??
    //       candidates[0]
    // }

    static toJSON(instance: HumanName): any {
        const pojo: any = {}
        if (instance.family !== undefined) pojo['family'] = instance.family
        pojo['given'] = instance.given.map((item) => item)
        if (instance.start !== undefined) pojo['start'] = instance.start
        if (instance.end !== undefined) pojo['end'] = instance.end
        pojo['prefix'] = instance.prefix.map((item) => item)
        pojo['suffix'] = instance.suffix.map((item) => item)
        if (instance.text !== undefined) pojo['text'] = instance.text
        if (instance.use !== undefined) pojo['use'] = instance.use
        return pojo
    }

    static fromJSON(pojo: any): HumanName {
        const obj = {} as IHumanName
        if (pojo['family'] !== undefined) {
            obj['family'] = pojo['family']
        }
        obj['given'] = pojo['given'].map((item: any) => item)
        if (pojo['start'] !== undefined) {
            obj['start'] = pojo['start']
        }
        if (pojo['end'] !== undefined) {
            obj['end'] = pojo['end']
        }
        obj['prefix'] = pojo['prefix'].map((item: any) => item)
        obj['suffix'] = pojo['suffix'].map((item: any) => item)
        if (pojo['text'] !== undefined) {
            obj['text'] = pojo['text']
        }
        if (pojo['use'] !== undefined) {
            obj['use'] = pojo['use']
        }
        return new HumanName(obj)
    }
}

interface IHumanName {
    family?: string
    given?: string[]
    start?: number
    end?: number
    prefix?: string[]
    suffix?: string[]
    text?: string
    use?: HumanNameUseEnum
}
