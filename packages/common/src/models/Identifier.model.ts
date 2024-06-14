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

import { Identifier as IdentifierDto } from '@icure/api'
import { mapTo } from '../utils/decorators'
import { CodingReference, ICodingReference } from './CodingReference.model'

/**
 * Typically used for business / client identifiers. An identifier should identify a patient uniquely and unambiguously. However, iCure can't guarantee the uniqueness of those identifiers : This is something you need to take care of.
 */
@mapTo(IdentifierDto)
export class Identifier {
    id?: string
    assigner?: string
    start?: string
    end?: string
    system?: string
    type?: CodingReference
    use?: string
    value?: string

    toJSON(): IIdentifier {
        return {
        id: this.id,
        assigner: this.assigner,
        start: this.start,
        end: this.end,
        system: this.system,
        type: !!this.type ? this.type.toJSON() : undefined,
        use: this.use,
        value: this.value,
        }
    }

    constructor(json: Partial<IIdentifier>) {
        if (json["id"] !== undefined) {
            this.id = json["id"]!
        }
        if (json["assigner"] !== undefined) {
            this.assigner = json["assigner"]!
        }
        if (json["start"] !== undefined) {
            this.start = json["start"]!
        }
        if (json["end"] !== undefined) {
            this.end = json["end"]!
        }
        if (json["system"] !== undefined) {
            this.system = json["system"]!
        }
        if (json["type"] !== undefined) {
            this.type = new CodingReference(json["type"]!)
        }
        if (json["use"] !== undefined) {
            this.use = json["use"]!
        }
        if (json["value"] !== undefined) {
            this.value = json["value"]!
        }
    }
}

export interface IIdentifier {
    id?: string
    assigner?: string
    start?: string
    end?: string
    system?: string
    type?: ICodingReference
    use?: string
    value?: string
}
