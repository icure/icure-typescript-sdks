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

import { Code } from '@icure/api'
import { mapTo } from '../utils/decorators'

@mapTo(Code)
export class Coding {
    constructor(json: ICoding) {
        this.id = json.id ?? `${json.type}|${json.code}|${json.version}`
        this.rev = json.rev
        this.type = json.type
        this.code = json.code
        this.version = json.version
        this.regions = json.regions ?? new Set()
        this.description = json.description
        this.qualifiedLinks = json.qualifiedLinks ?? new Map()
        this.searchTerms = json.searchTerms ?? new Map()
    }

    /**
     * the Id of the coding. We encourage using either a v4 UUID or a HL7 Id.
     */
    'id': string
    /**
     * the revision of the coding in the database, used for conflict management / optimistic locking.
     */
    'rev'?: string
    'type'?: string
    'code'?: string
    /**
     * Must be lexicographically searchable
     */
    'version'?: string
    'regions': Set<string>
    /**
     * Description (ex: {en: Rheumatic Aortic Stenosis, fr: Sténose rhumatoïde de l'Aorte})
     */
    'description'?: Map<string, string>
    /**
     * Links towards related codes
     */
    'qualifiedLinks': Map<string, Array<string>>
    /**
     * Extra search terms/ language
     */
    'searchTerms': Map<string, Set<string>>

    static toJSON(instance: Coding): any {
        const pojo: any = {}
        pojo['id'] = instance.id
        if (instance.rev !== undefined) pojo['rev'] = instance.rev
        if (instance.type !== undefined) pojo['type'] = instance.type
        if (instance.code !== undefined) pojo['code'] = instance.code
        if (instance.version !== undefined) pojo['version'] = instance.version
        pojo['regions'] = Array.from([...instance.regions].map((item) => item))
        if (instance.description !== undefined) pojo['description'] = !!instance.description ? Object.fromEntries([...instance.description.entries()].map(([k, v]) => [k, v])) : undefined
        pojo['qualifiedLinks'] = Object.fromEntries([...instance.qualifiedLinks.entries()].map(([k, v]) => [k, v.map((item) => item)]))
        pojo['searchTerms'] = Object.fromEntries([...instance.searchTerms.entries()].map(([k, v]) => [k, Array.from([...v].map((item) => item))]))
        return pojo
    }

    static fromJSON(pojo: any): Coding {
        const obj = {} as ICoding
        obj['id'] = pojo['id']
        if (pojo['rev'] !== undefined) {
            obj['rev'] = pojo['rev']
        }
        if (pojo['type'] !== undefined) {
            obj['type'] = pojo['type']
        }
        if (pojo['code'] !== undefined) {
            obj['code'] = pojo['code']
        }
        if (pojo['version'] !== undefined) {
            obj['version'] = pojo['version']
        }
        obj['regions'] = new Set(pojo['regions'].map((item: any) => item))
        if (pojo['description'] !== undefined) {
            obj['description'] = pojo['description'] ? new Map(Object.entries(pojo['description']).map(([k, v]: [any, any]) => [k, v])) : undefined
        }
        obj['qualifiedLinks'] = new Map(Object.entries(pojo['qualifiedLinks']).map(([k, v]: [any, any]) => [k, v.map((item: any) => item)]))
        obj['searchTerms'] = new Map(Object.entries(pojo['searchTerms']).map(([k, v]: [any, any]) => [k, new Set(v.map((item: any) => item))]))
        return new Coding(obj)
    }
}

interface ICoding {
    id?: string
    rev?: string
    type?: string
    code?: string
    version?: string
    regions?: Set<string>
    description?: Map<string, string>
    qualifiedLinks?: Map<string, Array<string>>
    searchTerms?: Map<string, Set<string>>
}
