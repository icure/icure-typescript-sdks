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

export class InlineResponse403 {
    constructor(json: Partial<IInlineResponse403>) {
        Object.assign(this as InlineResponse403, json)
    }

    '_short'?: number
    '_char'?: string
    '_int'?: number
    '_long'?: number
    '_float'?: number
    '_double'?: number
    'direct'?: boolean
    'readOnly'?: boolean

    static toJSON(instance: InlineResponse403): IInlineResponse403 {
        const pojo: IInlineResponse403 = {} as IInlineResponse403
        if (instance._short !== undefined) pojo["_short"] = instance._short
        if (instance._char !== undefined) pojo["_char"] = instance._char
        if (instance._int !== undefined) pojo["_int"] = instance._int
        if (instance._long !== undefined) pojo["_long"] = instance._long
        if (instance._float !== undefined) pojo["_float"] = instance._float
        if (instance._double !== undefined) pojo["_double"] = instance._double
        if (instance.direct !== undefined) pojo["direct"] = instance.direct
        if (instance.readOnly !== undefined) pojo["readOnly"] = instance.readOnly
        return pojo
    }

    static fromJSON(pojo: IInlineResponse403): InlineResponse403 {
        const obj = {} as IInlineResponse403
        if (pojo["_short"] !== undefined) {
            obj['_short'] = pojo["_short"]!
        }
        if (pojo["_char"] !== undefined) {
            obj['_char'] = pojo["_char"]!
        }
        if (pojo["_int"] !== undefined) {
            obj['_int'] = pojo["_int"]!
        }
        if (pojo["_long"] !== undefined) {
            obj['_long'] = pojo["_long"]!
        }
        if (pojo["_float"] !== undefined) {
            obj['_float'] = pojo["_float"]!
        }
        if (pojo["_double"] !== undefined) {
            obj['_double'] = pojo["_double"]!
        }
        if (pojo["direct"] !== undefined) {
            obj['direct'] = pojo["direct"]!
        }
        if (pojo["readOnly"] !== undefined) {
            obj['readOnly'] = pojo["readOnly"]!
        }
        return new InlineResponse403(obj)
    }
}

interface IInlineResponse403 {
    _short?: number
    _char?: string
    _int?: number
    _long?: number
    _float?: number
    _double?: number
    direct?: boolean
    readOnly?: boolean
}
