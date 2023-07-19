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
import { Telecom as TelecomDto } from '@icure/api'
import { mapTo } from '@icure/typescript-common'

@mapTo(TelecomDto)
export class Telecom {
  constructor(json: ITelecom) {
    Object.assign(this as Telecom, json as ITelecom)
  }

  'telecomType'?: TelecomTelecomTypeEnum
  'telecomNumber'?: string
  'telecomDescription'?: string

  static toJSON(instance: Telecom): any {
    const pojo: any = {}
    if (instance.telecomType !== undefined) pojo['telecomType'] = instance.telecomType
    if (instance.telecomNumber !== undefined) pojo['telecomNumber'] = instance.telecomNumber
    if (instance.telecomDescription !== undefined) pojo['telecomDescription'] = instance.telecomDescription
    return pojo
  }

  static fromJSON(pojo: any): Telecom {
    const obj = {} as ITelecom
    if (pojo['telecomType'] !== undefined) {
      obj['telecomType'] = pojo['telecomType']
    }
    if (pojo['telecomNumber'] !== undefined) {
      obj['telecomNumber'] = pojo['telecomNumber']
    }
    if (pojo['telecomDescription'] !== undefined) {
      obj['telecomDescription'] = pojo['telecomDescription']
    }
    return new Telecom(obj)
  }
}

interface ITelecom {
  telecomType?: TelecomTelecomTypeEnum
  telecomNumber?: string
  telecomDescription?: string
}

export type TelecomTelecomTypeEnum =
  | 'mobile'
  | 'phone'
  | 'email'
  | 'fax'
  | 'skype'
  | 'im'
  | 'medibridge'
  | 'ehealthbox'
  | 'apicrypt'
  | 'web'
  | 'print'
  | 'disk'
  | 'other'
  | 'pager'
