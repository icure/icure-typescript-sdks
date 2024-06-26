/**
 * ICure Medical Device Micro Service
 * ICure Medical Device Micro Service
 *
 * OpenAPI spec version: v2
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { Delegation as DelegationDto } from '@icure/api'
import { mapTo } from '../utils/decorators'

@mapTo(DelegationDto)
export class Delegation {
    owner?: string
    delegatedTo?: string
    key?: string

    toJSON(): IDelegation {
        return {
            owner: this.owner,
            delegatedTo: this.delegatedTo,
            key: this.key,
        }
    }

    constructor(json: Partial<IDelegation>) {
        if (json['owner'] !== undefined) {
            this.owner = json['owner']!
        }
        if (json['delegatedTo'] !== undefined) {
            this.delegatedTo = json['delegatedTo']!
        }
        if (json['key'] !== undefined) {
            this.key = json['key']!
        }
    }
}

export interface IDelegation {
    owner?: string
    delegatedTo?: string
    key?: string
}
