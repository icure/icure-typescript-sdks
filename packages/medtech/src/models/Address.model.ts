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

import { Address as AddressDto } from '@icure/api'
import { Annotation, mapTo } from '@icure/typescript-common'
import { Telecom } from './Telecom.model'

/**
 * the list of addresses (with address type).
 */
@mapTo(AddressDto)
export class Address {
  'addressType'?: AddressAddressTypeEnum
  'description'?: string
  'street'?: string
  'houseNumber'?: string
  'postboxNumber'?: string
  'postalCode'?: string
  'city'?: string
  'state'?: string
  'country'?: string
  'note'?: string
  'telecoms': Array<Telecom>
  notes?: Annotation[]
  encryptedSelf?: string

  constructor(json: IAddress) {
    const { addressType, telecoms, ...simpleProperties } = json

    Object.assign(this as Address, simpleProperties)

    this.addressType = addressType as AddressAddressTypeEnum
    this.telecoms = telecoms?.map((t) => new Telecom(t)) ?? []
  }

  static toJSON(instance: Address): any {
    const pojo: any = {}
    pojo['addressType'] = instance.addressType
    pojo['description'] = instance.description
    pojo['street'] = instance.street
    pojo['houseNumber'] = instance.houseNumber
    pojo['postboxNumber'] = instance.postboxNumber
    pojo['postalCode'] = instance.postalCode
    pojo['city'] = instance.city
    pojo['state'] = instance.state
    pojo['country'] = instance.country
    pojo['note'] = instance.note
    pojo['telecoms'] = instance.telecoms.map((item) => Telecom.toJSON(item))
    pojo['notes'] = instance.notes?.map((item) => Annotation.toJSON(item))
    pojo['encryptedSelf'] = instance.encryptedSelf
    return pojo
  }

  static fromJSON(pojo: any): Address {
    return new Address({
      addressType: pojo['addressType'],
      description: pojo['description'],
      street: pojo['street'],
      houseNumber: pojo['houseNumber'],
      postboxNumber: pojo['postboxNumber'],
      postalCode: pojo['postalCode'],
      city: pojo['city'],
      state: pojo['state'],
      country: pojo['country'],
      note: pojo['note'],
      telecoms: pojo['telecoms'].map((item: any) => Telecom.fromJSON(item)),
      notes: pojo['notes']?.map((item: any) => Annotation.fromJSON(item)),
      encryptedSelf: pojo['encryptedSelf'],
    })
  }
}

interface IAddress {
  addressType?: AddressAddressTypeEnum
  description?: string
  street?: string
  houseNumber?: string
  postboxNumber?: string
  postalCode?: string
  city?: string
  state?: string
  country?: string
  note?: string
  notes?: Annotation[]
  telecoms?: Array<Telecom>
  encryptedSelf?: string
}

export type AddressAddressTypeEnum =
  | 'home'
  | 'work'
  | 'vacation'
  | 'hospital'
  | 'clinic'
  | 'hq'
  | 'other'
  | 'temporary'
  | 'postal'
  | 'diplomatic'
  | 'reference'