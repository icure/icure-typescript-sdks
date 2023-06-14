import { Identifier as IdentifierEntity } from '@icure/api'
import {mapTo} from "@icure/typescript-common"
import { CodingReference } from './CodingReference.model'

@mapTo(IdentifierEntity)
export class Identifier {
    assigner?: string
    end?: string
    id?: string
    start?: string
    system?: string
    type?: CodingReference
    use?: string
    value?: string

    constructor(identifier?: IIdentifier | any) {
        this.assigner = identifier?.assigner
        this.end = identifier?.end
        this.id = identifier?.id
        this.start = identifier?.start
        this.system = identifier?.system
        this.type = identifier?.type
        this.use = identifier?.use
        this.value = identifier?.value
    }

    static toJSON(instance: Identifier): any {
        const pojo: any = {}
        pojo['assigner'] = instance.assigner
        pojo['end'] = instance.end
        pojo['id'] = instance.id
        pojo['start'] = instance.start
        pojo['system'] = instance.system
        pojo['type'] = !!instance.type ? CodingReference.toJSON(instance.type) : undefined
        pojo['use'] = instance.use
        pojo['value'] = instance.value
        return pojo
    }

    static fromJSON(pojo: any): Identifier {
        return new Identifier({ assigner: pojo['assigner'], end: pojo['end'], id: pojo['id'], start: pojo['start'], system: pojo['system'], type: !!pojo['type'] ? CodingReference.fromJSON(pojo['type']) : undefined, use: pojo['use'], value: pojo['value'] })
    }
}

interface IIdentifier {
    assigner?: string
    end?: string
    id?: string
    start?: string
    system?: string
    type?: CodingReference
    use?: string
    value?: string
}
