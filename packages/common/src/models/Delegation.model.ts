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
import { Delegation as DelegationDto } from "@icure/api";
import { mapTo } from "../utils/decorators";

@mapTo(DelegationDto)
export class Delegation {
  constructor(json: IDelegation) {
    Object.assign(this as Delegation, json);
  }

  "owner"?: string;
  "delegatedTo"?: string;
  "key"?: string;

    static toJSON(instance: Delegation): any {
        const pojo: any = {}
        pojo["owner"] = instance.owner
        pojo["delegatedTo"] = instance.delegatedTo
        pojo["key"] = instance.key
        return pojo
    }

    static fromJSON(pojo: any): Delegation {
        return new Delegation({owner: pojo["owner"], delegatedTo: pojo["delegatedTo"], key: pojo["key"]})
    }
}

interface IDelegation {
  owner?: string;
  delegatedTo?: string;
  key?: string;
}
