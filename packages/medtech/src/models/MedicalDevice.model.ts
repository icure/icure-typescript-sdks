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

import { b64_2ab, Device, ua2b64 } from '@icure/api'
import { CodingReference, Identifier, mapTo, Property, SystemMetaDataOwner } from '@icure/typescript-common'

@mapTo(Device)
export class MedicalDevice {
  constructor(json: IMedicalDevice) {
    Object.assign(this as MedicalDevice, json as IMedicalDevice)
  }

  /**
   * The Id of the MedicalDevice. We encourage using either a v4 UUID or a HL7 Id.
   */
  'id'?: string
  /**
   * the revision of the medical device in the database, used for conflict management / optimistic locking.
   */
  'rev'?: string
  /**
   * the soft delete timestamp. When a medical device is ”deleted“, this is set to a non null value: the moment of the deletion
   */
  'deletionDate'?: number
  /**
   * Typically used for business / client identifiers. An identifier should identify a device uniquely and unambiguously. However, iCure can't guarantee the uniqueness of those identifiers : This is something you need to take care of.
   */
  'identifiers': Array<Identifier>
  /**
   * the creation date of the medical device (encoded as epoch).
   */
  'created'?: number
  /**
   * the last modification date of the medical device (encoded as epoch).
   */
  'modified'?: number
  /**
   * The id of the [User] that created this medical device. When creating the device, this field will be filled automatically by the current user id if not provided.
   */
  'author'?: string
  /**
   * The id of the data owner that is responsible of this medical device. When creating the medical device, will be filled automatically by the current user data owner id ([HealthcareProfessional], [Patient] or [MedicalDevice]) if missing
   */
  'responsible'?: string
  /**
   * A label is an item from a codification system that qualifies a medical device as being member of a certain class, whatever the value it might have taken. If the label qualifies the content of a field, it means that whatever the content of the field, the label will always apply. LOINC is a codification system typically used for labels.
   */
  'labels': Set<CodingReference>
  /**
   * A code is an item from a codification system that qualifies the content of this medical device. SNOMED-CT, ICPC-2 or ICD-10 codifications systems can be used for codes
   */
  'codes': Set<CodingReference>
  /**
   * Soft delete (unix epoch in ms) timestamp of the medical device
   */
  'endOfLife'?: number
  /**
   * An external (from another source) id with no guarantee or requirement for unicity.
   */
  'externalId'?: string
  /**
   * Name of the device/application recording the data
   */
  'name'?: string
  /**
   * Type of device/application recording the data. (eg. \"smartphone\", \"watch\",...)
   */
  'type'?: string
  /**
   * Brand of the device recording the data
   */
  'brand'?: string
  /**
   * Model of the device recording the data
   */
  'model'?: string
  /**
   * Serial number of the device recording the data
   */
  'serialNumber'?: string
  'parentId'?: string
  /**
   * Picture of the device/application
   */
  'picture'?: ArrayBuffer
  'properties': Set<Property>
  'systemMetaData'?: SystemMetaDataOwner

  static toJSON(instance: MedicalDevice): any {
    const pojo: any = {}
    pojo['id'] = instance.id
    pojo['rev'] = instance.rev
    pojo['deletionDate'] = instance.deletionDate
    pojo['identifiers'] = instance.identifiers.map((item) => Identifier.toJSON(item))
    pojo['created'] = instance.created
    pojo['modified'] = instance.modified
    pojo['author'] = instance.author
    pojo['responsible'] = instance.responsible
    pojo['labels'] = Array.from([...instance.labels].map((item) => CodingReference.toJSON(item)))
    pojo['codes'] = Array.from([...instance.codes].map((item) => CodingReference.toJSON(item)))
    pojo['endOfLife'] = instance.endOfLife
    pojo['externalId'] = instance.externalId
    pojo['name'] = instance.name
    pojo['type'] = instance.type
    pojo['brand'] = instance.brand
    pojo['model'] = instance.model
    pojo['serialNumber'] = instance.serialNumber
    pojo['parentId'] = instance.parentId
    pojo['picture'] = !!instance.picture ? ua2b64(instance.picture) : undefined
    pojo['properties'] = Array.from([...instance.properties].map((item) => Property.toJSON(item)))
    pojo['systemMetaData'] = !!instance.systemMetaData ? SystemMetaDataOwner.toJSON(instance.systemMetaData) : undefined
    return pojo
  }

  static fromJSON(pojo: any): MedicalDevice {
    return new MedicalDevice({
      id: pojo['id'],
      rev: pojo['rev'],
      deletionDate: pojo['deletionDate'],
      identifiers: pojo['identifiers'].map((item: any) => Identifier.fromJSON(item)),
      created: pojo['created'],
      modified: pojo['modified'],
      author: pojo['author'],
      responsible: pojo['responsible'],
      labels: new Set(pojo['labels'].map((item: any) => CodingReference.fromJSON(item))),
      codes: new Set(pojo['codes'].map((item: any) => CodingReference.fromJSON(item))),
      endOfLife: pojo['endOfLife'],
      externalId: pojo['externalId'],
      name: pojo['name'],
      type: pojo['type'],
      brand: pojo['brand'],
      model: pojo['model'],
      serialNumber: pojo['serialNumber'],
      parentId: pojo['parentId'],
      picture: !!pojo['picture'] ? b64_2ab(pojo['picture']) : undefined,
      properties: new Set(pojo['properties'].map((item: any) => Property.fromJSON(item))),
      systemMetaData: !!pojo['systemMetaData'] ? SystemMetaDataOwner.fromJSON(pojo['systemMetaData']) : undefined,
    })
  }
}

interface IMedicalDevice {
  id?: string
  rev?: string
  deletionDate?: number
  identifiers?: Array<Identifier>
  created?: number
  modified?: number
  author?: string
  responsible?: string
  labels?: Set<CodingReference>
  codes?: Set<CodingReference>
  endOfLife?: number
  externalId?: string
  name?: string
  type?: string
  brand?: string
  model?: string
  serialNumber?: string
  parentId?: string
  picture?: ArrayBuffer
  properties?: Set<Property>
  systemMetaData?: SystemMetaDataOwner
}