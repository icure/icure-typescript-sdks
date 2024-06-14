import { AddressDto, Annotation, IAnnotation, mapTo } from '@icure/typescript-common'
import { ContactPoint, IContactPoint } from './ContactPoint.model'
import { LocationAddressTypeEnum } from './enums/LocationAddressType.enum'

@mapTo(AddressDto)
export class Location implements ILocation {
    addressType?: LocationAddressTypeEnum
    description?: string
    street?: string
    houseNumber?: string
    postboxNumber?: string
    postalCode?: string
    city?: string
    state?: string
    country?: string
    notes: Annotation[] = []
    telecoms: ContactPoint[] = []
    encryptedSelf?: string

    toJSON(): ILocation {
        return {
        addressType: this.addressType,
        description: this.description,
        street: this.street,
        houseNumber: this.houseNumber,
        postboxNumber: this.postboxNumber,
        postalCode: this.postalCode,
        city: this.city,
        state: this.state,
        country: this.country,
        notes: this.notes.map(item => item.toJSON()),
        telecoms: this.telecoms.map(item => item.toJSON()),
        encryptedSelf: this.encryptedSelf,
        }
    }

    constructor(json: Partial<ILocation>) {
        if (json["addressType"] !== undefined) {
            this.addressType = json["addressType"]!
        }
        if (json["description"] !== undefined) {
            this.description = json["description"]!
        }
        if (json["street"] !== undefined) {
            this.street = json["street"]!
        }
        if (json["houseNumber"] !== undefined) {
            this.houseNumber = json["houseNumber"]!
        }
        if (json["postboxNumber"] !== undefined) {
            this.postboxNumber = json["postboxNumber"]!
        }
        if (json["postalCode"] !== undefined) {
            this.postalCode = json["postalCode"]!
        }
        if (json["city"] !== undefined) {
            this.city = json["city"]!
        }
        if (json["state"] !== undefined) {
            this.state = json["state"]!
        }
        if (json["country"] !== undefined) {
            this.country = json["country"]!
        }
        if (json["notes"] !== undefined) {
            this.notes = json["notes"]!.map((item: any) => new Annotation(item))
        }
        if (json["telecoms"] !== undefined) {
            this.telecoms = json["telecoms"]!.map((item: any) => new ContactPoint(item))
        }
        if (json["encryptedSelf"] !== undefined) {
            this.encryptedSelf = json["encryptedSelf"]!
        }
    }
}

export interface ILocation {
    addressType?: LocationAddressTypeEnum
    description?: string
    street?: string
    houseNumber?: string
    postboxNumber?: string
    postalCode?: string
    city?: string
    state?: string
    country?: string
    notes: IAnnotation[]
    telecoms: IContactPoint[]
    encryptedSelf?: string
}
