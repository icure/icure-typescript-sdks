import { PersonName } from '@icure/api'
import { mapTo } from '@icure/typescript-common'
import { HumanNameUseEnum } from './enums/HumanNameUse.enum'

@mapTo(PersonName)
export class HumanName {
    lastName?: string
    firstNames: string[]
    start?: number
    end?: number
    prefix: string[]
    suffix: string[]
    text?: string
    use?: HumanNameUseEnum

    constructor(humanName: IHumanName) {
        this.lastName = humanName.lastName
        this.firstNames = humanName.firstNames ?? []
        this.start = humanName.start
        this.end = humanName.end
        this.prefix = humanName.prefix ?? []
        this.suffix = humanName.suffix ?? []
        this.text = humanName.text
        this.use = humanName.use
    }

    static toJSON(instance: HumanName): any {
        const pojo: any = {}
        pojo['lastName'] = instance.lastName
        pojo['firstNames'] = instance.firstNames.map((item) => item)
        pojo['start'] = instance.start
        pojo['end'] = instance.end
        pojo['prefix'] = instance.prefix.map((item) => item)
        pojo['suffix'] = instance.suffix.map((item) => item)
        pojo['text'] = instance.text
        pojo['use'] = instance.use
        return pojo
    }

    static fromJSON(pojo: any): HumanName {
        return new HumanName({
            lastName: pojo['lastName'],
            firstNames: pojo['firstNames'].map((item: any) => item),
            start: pojo['start'],
            end: pojo['end'],
            prefix: pojo['prefix'].map((item: any) => item),
            suffix: pojo['suffix'].map((item: any) => item),
            text: pojo['text'],
            use: pojo['use'],
        })
    }
}

interface IHumanName {
    lastName?: string
    firstNames?: string[]
    start?: number
    end?: number
    prefix?: string[]
    suffix?: string[]
    text?: string
    use?: HumanNameUseEnum
}
