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

export class PaginatedDocumentKeyAndIdPairObject {
  constructor(json: IPaginatedDocumentKeyAndIdPairObject) {
    Object.assign(this as PaginatedDocumentKeyAndIdPairObject, json)
  }

  'startKey'?: any
  'startKeyDocId'?: string

  static toJSON(instance: PaginatedDocumentKeyAndIdPairObject): any {
    const pojo: any = {}
    pojo['startKey'] = instance.startKey
    pojo['startKeyDocId'] = instance.startKeyDocId
    return pojo
  }

  static fromJSON(pojo: any): PaginatedDocumentKeyAndIdPairObject {
    return new PaginatedDocumentKeyAndIdPairObject({ startKey: pojo['startKey'], startKeyDocId: pojo['startKeyDocId'] })
  }
}

interface IPaginatedDocumentKeyAndIdPairObject {
  startKey?: any
  startKeyDocId?: string
}