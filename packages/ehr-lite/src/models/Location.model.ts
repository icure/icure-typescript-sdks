import { Annotation, mapTo, AddressDto } from '@icure/typescript-common'
import { ContactPoint } from './ContactPoint.model'
import { LocationAddressTypeEnum } from './enums/LocationAddressType.enum'

@mapTo(AddressDto)
export class Location {
    addressType?: LocationAddressTypeEnum
    description?: string
    street?: string
    houseNumber?: string
    postboxNumber?: string
    postalCode?: string
    city?: string
    state?: string
    country?: string
    notes?: Annotation[]
    telecoms: ContactPoint[]
    encryptedSelf?: string

    constructor(location: ILocation) {
        this.addressType = location.addressType
        this.description = location.description
        this.street = location.street
        this.houseNumber = location.houseNumber
        this.postboxNumber = location.postboxNumber
        this.postalCode = location.postalCode
        this.city = location.city
        this.state = location.state
        this.country = location.country
        this.notes = location.notes
        this.telecoms = location.telecoms ?? []
    }

    static toJSON(instance: Location): any {
        const pojo: any = {}
        if (instance.addressType !== undefined) pojo['addressType'] = instance.addressType
        if (instance.description !== undefined) pojo['description'] = instance.description
        if (instance.street !== undefined) pojo['street'] = instance.street
        if (instance.houseNumber !== undefined) pojo['houseNumber'] = instance.houseNumber
        if (instance.postboxNumber !== undefined) pojo['postboxNumber'] = instance.postboxNumber
        if (instance.postalCode !== undefined) pojo['postalCode'] = instance.postalCode
        if (instance.city !== undefined) pojo['city'] = instance.city
        if (instance.state !== undefined) pojo['state'] = instance.state
        if (instance.country !== undefined) pojo['country'] = instance.country
        if (instance.notes !== undefined) pojo['notes'] = instance.notes?.map((item) => Annotation.toJSON(item))
        pojo['telecoms'] = instance.telecoms.map((item) => ContactPoint.toJSON(item))
        if (instance.encryptedSelf !== undefined) pojo['encryptedSelf'] = instance.encryptedSelf
        return pojo
    }

    static fromJSON(pojo: any): Location {
        const obj = {} as ILocation
        if (pojo['addressType'] !== undefined) {
            obj['addressType'] = pojo['addressType']
        }
        if (pojo['description'] !== undefined) {
            obj['description'] = pojo['description']
        }
        if (pojo['street'] !== undefined) {
            obj['street'] = pojo['street']
        }
        if (pojo['houseNumber'] !== undefined) {
            obj['houseNumber'] = pojo['houseNumber']
        }
        if (pojo['postboxNumber'] !== undefined) {
            obj['postboxNumber'] = pojo['postboxNumber']
        }
        if (pojo['postalCode'] !== undefined) {
            obj['postalCode'] = pojo['postalCode']
        }
        if (pojo['city'] !== undefined) {
            obj['city'] = pojo['city']
        }
        if (pojo['state'] !== undefined) {
            obj['state'] = pojo['state']
        }
        if (pojo['country'] !== undefined) {
            obj['country'] = pojo['country']
        }
        if (pojo['notes'] !== undefined) {
            obj['notes'] = pojo['notes']?.map((item: any) => Annotation.fromJSON(item))
        }
        obj['telecoms'] = pojo['telecoms'].map((item: any) => ContactPoint.fromJSON(item))
        if (pojo['encryptedSelf'] !== undefined) {
            obj['encryptedSelf'] = pojo['encryptedSelf']
        }
        return new Location(obj)
    }
}

interface ILocation {
    addressType?: LocationAddressTypeEnum
    description?: string
    street?: string
    houseNumber?: string
    postboxNumber?: string
    postalCode?: string
    city?: string
    state?: string
    country?: string
    notes?: Annotation[]
    telecoms?: ContactPoint[]
    encryptedSelf?: string
}
