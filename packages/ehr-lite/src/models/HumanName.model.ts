import { mapTo, PersonNameDto } from '@icure/typescript-common'
import { HumanNameUseEnum } from './enums/HumanNameUse.enum'

@mapTo(PersonNameDto)
export class HumanName implements IHumanName {
    family?: string
    given: string[] = []
    start?: number
    end?: number
    prefix: string[] = []
    suffix: string[] = []
    text?: string
    use?: HumanNameUseEnum
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

    toJSON(): IHumanName {
        return {
        family: this.family,
        given: this.given.map(item => item),
        start: this.start,
        end: this.end,
        prefix: this.prefix.map(item => item),
        suffix: this.suffix.map(item => item),
        text: this.text,
        use: this.use,
        }
    }

    constructor(json: Partial<IHumanName> ) {
        if (json["family"] !== undefined) {
            this.family = json["family"]!
        }
        if (json["given"] !== undefined) {
            this.given = json["given"]!.map((item: any) => item)
        }
        if (json["start"] !== undefined) {
            this.start = json["start"]!
        }
        if (json["end"] !== undefined) {
            this.end = json["end"]!
        }
        if (json["prefix"] !== undefined) {
            this.prefix = json["prefix"]!.map((item: any) => item)
        }
        if (json["suffix"] !== undefined) {
            this.suffix = json["suffix"]!.map((item: any) => item)
        }
        if (json["text"] !== undefined) {
            this.text = json["text"]!
        }
        if (json["use"] !== undefined) {
            this.use = json["use"]!
        }
    }
}

export interface IHumanName {
    family?: string
    given: string[]
    start?: number
    end?: number
    prefix: string[]
    suffix: string[]
    text?: string
    use?: HumanNameUseEnum
}
