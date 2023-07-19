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
        if (instance.lastName !== undefined) pojo['lastName'] = instance.lastName
        pojo['firstNames'] = instance.firstNames.map((item) => item)
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
        if (pojo['lastName'] !== undefined) {
            obj['lastName'] = pojo['lastName']
        }
        obj['firstNames'] = pojo['firstNames'].map((item: any) => item)
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
    lastName?: string
    firstNames?: string[]
    start?: number
    end?: number
    prefix?: string[]
    suffix?: string[]
    text?: string
    use?: HumanNameUseEnum
}
