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

import { PersonName as PersonNameDto } from '@icure/api'
import { mapTo } from '@icure/typescript-common'

/**
 * the list of all names of the patient, also containing the official full name information. Ordered by preference of use. First element is therefore the official name used for the patient in the application
 */
@mapTo(PersonNameDto)
export class PersonName {
  constructor(json: IPersonName) {
    Object.assign(this as PersonName, json as IPersonName)
  }

  'lastName'?: string
  'firstNames': Array<string>
  'start'?: number
  'end'?: number
  'prefix': Array<string>
  'suffix': Array<string>
  'text'?: string
  'use'?: PersonNameUseEnum

  static toJSON(instance: PersonName): any {
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

  static fromJSON(pojo: any): PersonName {
    return new PersonName({
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

interface IPersonName {
  lastName?: string
  firstNames?: Array<string>
  start?: number
  end?: number
  prefix?: Array<string>
  suffix?: Array<string>
  text?: string
  use?: PersonNameUseEnum
}

export type PersonNameUseEnum = 'usual' | 'official' | 'temp' | 'nickname' | 'anonymous' | 'maiden' | 'old' | 'other'
