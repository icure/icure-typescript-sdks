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

import { CodingReference, DeviceDto, Identifier, Property, SystemMetaDataOwner, base64string, forceUuid, mapTo } from '@icure/typescript-common'

@mapTo(DeviceDto)
export class MedicalDevice {
    constructor(json: Partial<IMedicalDevice>) {
        this.id = forceUuid(json.id)
        this.rev = json.rev
        this.deletionDate = json.deletionDate
        this.identifiers = json.identifiers ?? []
        this.created = json.created
        this.modified = json.modified
        this.author = json.author
        this.responsible = json.responsible
        this.properties = json.properties ?? []
        this.labels = json.labels ?? []
        this.codes = json.codes ?? []
        this.endOfLife = json.endOfLife
        this.externalId = json.externalId
        this.name = json.name
        this.type = json.type
        this.brand = json.brand
        this.model = json.model
        this.serialNumber = json.serialNumber
        this.parentId = json.parentId
        this.systemMetaData = json.systemMetaData
        this.picture = json.picture
    }

    /**
     * The Id of the MedicalDevice. We encourage using either a v4 UUID or a HL7 Id.
     */
    'id': string
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
    'labels': Array<CodingReference>
    /**
     * A code is an item from a codification system that qualifies the content of this medical device. SNOMED-CT, ICPC-2 or ICD-10 codifications systems can be used for codes
     */
    'codes': Array<CodingReference>
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
    'picture'?: base64string
    'properties': Array<Property>
    'systemMetaData'?: SystemMetaDataOwner

    static toJSON(instance: MedicalDevice): IMedicalDevice {
        const pojo: IMedicalDevice = {} as IMedicalDevice
        pojo['id'] = instance.id
        if (instance.rev !== undefined) pojo['rev'] = instance.rev
        if (instance.deletionDate !== undefined) pojo['deletionDate'] = instance.deletionDate
        pojo['identifiers'] = instance.identifiers.map((item) => Identifier.toJSON(item))
        if (instance.created !== undefined) pojo['created'] = instance.created
        if (instance.modified !== undefined) pojo['modified'] = instance.modified
        if (instance.author !== undefined) pojo['author'] = instance.author
        if (instance.responsible !== undefined) pojo['responsible'] = instance.responsible
        pojo['labels'] = instance.labels.map((item) => CodingReference.toJSON(item))
        pojo['codes'] = instance.codes.map((item) => CodingReference.toJSON(item))
        if (instance.endOfLife !== undefined) pojo['endOfLife'] = instance.endOfLife
        if (instance.externalId !== undefined) pojo['externalId'] = instance.externalId
        if (instance.name !== undefined) pojo['name'] = instance.name
        if (instance.type !== undefined) pojo['type'] = instance.type
        if (instance.brand !== undefined) pojo['brand'] = instance.brand
        if (instance.model !== undefined) pojo['model'] = instance.model
        if (instance.serialNumber !== undefined) pojo['serialNumber'] = instance.serialNumber
        if (instance.parentId !== undefined) pojo['parentId'] = instance.parentId
        if (instance.picture !== undefined) pojo['picture'] = instance.picture
        pojo['properties'] = instance.properties.map((item) => Property.toJSON(item))
        if (instance.systemMetaData !== undefined) pojo['systemMetaData'] = SystemMetaDataOwner.toJSON(instance.systemMetaData)
        return pojo
    }

    static fromJSON(pojo: IMedicalDevice): MedicalDevice {
        const obj = {} as IMedicalDevice
        obj['id'] = pojo['id']
        if (pojo['rev'] !== undefined) {
            obj['rev'] = pojo['rev']!
        }
        if (pojo['deletionDate'] !== undefined) {
            obj['deletionDate'] = pojo['deletionDate']!
        }
        obj['identifiers'] = pojo['identifiers'].map((item: any) => Identifier.fromJSON(item))
        if (pojo['created'] !== undefined) {
            obj['created'] = pojo['created']!
        }
        if (pojo['modified'] !== undefined) {
            obj['modified'] = pojo['modified']!
        }
        if (pojo['author'] !== undefined) {
            obj['author'] = pojo['author']!
        }
        if (pojo['responsible'] !== undefined) {
            obj['responsible'] = pojo['responsible']!
        }
        obj['labels'] = pojo['labels'].map((item: any) => CodingReference.fromJSON(item))
        obj['codes'] = pojo['codes'].map((item: any) => CodingReference.fromJSON(item))
        if (pojo['endOfLife'] !== undefined) {
            obj['endOfLife'] = pojo['endOfLife']!
        }
        if (pojo['externalId'] !== undefined) {
            obj['externalId'] = pojo['externalId']!
        }
        if (pojo['name'] !== undefined) {
            obj['name'] = pojo['name']!
        }
        if (pojo['type'] !== undefined) {
            obj['type'] = pojo['type']!
        }
        if (pojo['brand'] !== undefined) {
            obj['brand'] = pojo['brand']!
        }
        if (pojo['model'] !== undefined) {
            obj['model'] = pojo['model']!
        }
        if (pojo['serialNumber'] !== undefined) {
            obj['serialNumber'] = pojo['serialNumber']!
        }
        if (pojo['parentId'] !== undefined) {
            obj['parentId'] = pojo['parentId']!
        }
        if (pojo['picture'] !== undefined) {
            obj['picture'] = pojo['picture']!
        }
        obj['properties'] = pojo['properties'].map((item: any) => Property.fromJSON(item))
        if (pojo['systemMetaData'] !== undefined) {
            obj['systemMetaData'] = SystemMetaDataOwner.fromJSON(pojo['systemMetaData']!)
        }
        return new MedicalDevice(obj)
    }
}

export interface IMedicalDevice {
    id?: string
    rev?: string
    deletionDate?: number
    identifiers: Array<Identifier>
    created?: number
    modified?: number
    author?: string
    responsible?: string
    labels: Array<CodingReference>
    codes: Array<CodingReference>
    endOfLife?: number
    externalId?: string
    name?: string
    type?: string
    brand?: string
    model?: string
    serialNumber?: string
    parentId?: string
    picture?: base64string
    properties: Array<Property>
    systemMetaData?: SystemMetaDataOwner
}
