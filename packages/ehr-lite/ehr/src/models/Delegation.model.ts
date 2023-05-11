import { Delegation as DelegationEntity } from '@icure/api'
import { mapTo } from '../mappings/mapper'

@mapTo(DelegationEntity)
export class Delegation {
    owner?: string
    delegateTo?: string
    key?: string

    constructor(delegation: IDelegation | any) {
        this.owner = delegation.owner
        this.delegateTo = delegation.delegateTo
        this.key = delegation.key
    }

    static toJSON(instance: Delegation): any {
        const pojo: any = {}
        pojo["owner"] = instance.owner
        pojo["delegateTo"] = instance.delegateTo
        pojo["key"] = instance.key
        return pojo
    }

    static fromJSON(pojo: any): Delegation {
        return new Delegation({owner: pojo["owner"], delegateTo: pojo["delegateTo"], key: pojo["key"]})
    }
}

interface IDelegation {
    owner?: string
    delegateTo?: string
    key?: string
}
