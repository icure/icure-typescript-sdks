import { Address } from '@icure/api'
import { mapTo } from "@icure/typescript-common"
import { Annotation } from './Annotation.model'
import { ContactPoint } from './ContactPoint.model'
import { LocationAddressTypeEnum } from './enums/LocationAddressType.enum'

@mapTo(Address)
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
    telecoms?: ContactPoint[]
    encryptedSelf?: string

    constructor(location?: ILocation | any) {
        this.addressType = location?.addressType
        this.description = location?.description
        this.street = location?.street
        this.houseNumber = location?.houseNumber
        this.postboxNumber = location?.postboxNumber
        this.postalCode = location?.postalCode
        this.city = location?.city
        this.state = location?.state
        this.country = location?.country
        this.notes = location?.notes
        this.telecoms = location?.telecoms
    }

    static toJSON(instance: Location): any {
        const pojo: any = {}
        pojo["addressType"] = instance.addressType
        pojo["description"] = instance.description
        pojo["street"] = instance.street
        pojo["houseNumber"] = instance.houseNumber
        pojo["postboxNumber"] = instance.postboxNumber
        pojo["postalCode"] = instance.postalCode
        pojo["city"] = instance.city
        pojo["state"] = instance.state
        pojo["country"] = instance.country
        pojo["notes"] = instance.notes?.map(item => Annotation.toJSON(item))
        pojo["telecoms"] = instance.telecoms?.map(item => ContactPoint.toJSON(item))
        pojo["encryptedSelf"] = instance.encryptedSelf
        return pojo
    }

    static fromJSON(pojo: any): Location {
        return new Location({addressType: pojo["addressType"], description: pojo["description"], street: pojo["street"], houseNumber: pojo["houseNumber"], postboxNumber: pojo["postboxNumber"], postalCode: pojo["postalCode"], city: pojo["city"], state: pojo["state"], country: pojo["country"], notes: pojo["notes"]?.map((item: any) => Annotation.fromJSON(item)), telecoms: pojo["telecoms"]?.map((item: any) => ContactPoint.fromJSON(item)), encryptedSelf: pojo["encryptedSelf"]})
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
}
