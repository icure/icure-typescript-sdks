import { Location } from '../models/Location.model'
import { Address, Annotation as AnnotationDto, Telecom } from '@icure/api'
import { Annotation, mapAnnotationDtoToAnnotation, mapAnnotationToAnnotationDto } from '@icure/typescript-common'
import { ContactPoint } from '../models/ContactPoint.model'
import { mapContactPointToTelecom, mapTelecomToContactPoint } from './ContactPoint.mapper'
import { LocationAddressTypeEnum } from '../models/enums/LocationAddressType.enum'

function toAddressAddressType(domain: Location): Address.AddressTypeEnum | undefined {
    return domain.addressType
}

function toAddressDescr(domain: Location): string | undefined {
    return domain.description
}

function toAddressStreet(domain: Location): string | undefined {
    return domain.street
}

function toAddressHouseNumber(domain: Location): string | undefined {
    return domain.houseNumber
}

function toAddressPostboxNumber(domain: Location): string | undefined {
    return domain.postboxNumber
}

function toAddressPostalCode(domain: Location): string | undefined {
    return domain.postalCode
}

function toAddressCity(domain: Location): string | undefined {
    return domain.city
}

function toAddressState(domain: Location): string | undefined {
    return domain.state
}

function toAddressCountry(domain: Location): string | undefined {
    return domain.country
}

function toAddressNote(domain: Location): string | undefined {
    return undefined
}

function toAddressNotes(domain: Location): AnnotationDto[] | undefined {
    return !!domain.notes ? domain.notes.map(mapAnnotationToAnnotationDto) : undefined
}

function toAddressTelecoms(domain: Location): Telecom[] | undefined {
    return !!domain.telecoms ? domain.telecoms.map(mapContactPointToTelecom) : undefined
}

function toAddressEncryptedSelf(domain: Location): string | undefined {
    return domain.encryptedSelf
}

function toLocationAddressType(dto: Address): LocationAddressTypeEnum | undefined {
    return dto.addressType as LocationAddressTypeEnum | undefined
}

function toLocationDescription(dto: Address): string | undefined {
    return dto.descr
}

function toLocationStreet(dto: Address): string | undefined {
    return dto.street
}

function toLocationHouseNumber(dto: Address): string | undefined {
    return dto.houseNumber
}

function toLocationPostboxNumber(dto: Address): string | undefined {
    return dto.postboxNumber
}

function toLocationPostalCode(dto: Address): string | undefined {
    return dto.postalCode
}

function toLocationCity(dto: Address): string | undefined {
    return dto.city
}

function toLocationState(dto: Address): string | undefined {
    return dto.state
}

function toLocationCountry(dto: Address): string | undefined {
    return dto.country
}

function toLocationNotes(dto: Address): Annotation[] | undefined {
    return !!dto.notes ? dto.notes.map(mapAnnotationDtoToAnnotation) : undefined
}

function toLocationTelecoms(dto: Address): ContactPoint[] | undefined {
    return !!dto.telecoms ? dto.telecoms.map(mapTelecomToContactPoint) : undefined
}

function toLocationEncryptedSelf(dto: Address): string | undefined {
    return dto.encryptedSelf
}

export function mapAddressToLocation(dto: Address): Location {
    return new Location({
        addressType: toLocationAddressType(dto),
        description: toLocationDescription(dto),
        street: toLocationStreet(dto),
        houseNumber: toLocationHouseNumber(dto),
        postboxNumber: toLocationPostboxNumber(dto),
        postalCode: toLocationPostalCode(dto),
        city: toLocationCity(dto),
        state: toLocationState(dto),
        country: toLocationCountry(dto),
        notes: toLocationNotes(dto),
        telecoms: toLocationTelecoms(dto),
        encryptedSelf: toLocationEncryptedSelf(dto),
    })
}

export function mapLocationToAddress(domain: Location): Address {
    return new Address({
        addressType: toAddressAddressType(domain),
        descr: toAddressDescr(domain),
        street: toAddressStreet(domain),
        houseNumber: toAddressHouseNumber(domain),
        postboxNumber: toAddressPostboxNumber(domain),
        postalCode: toAddressPostalCode(domain),
        city: toAddressCity(domain),
        state: toAddressState(domain),
        country: toAddressCountry(domain),
        note: toAddressNote(domain),
        notes: toAddressNotes(domain),
        telecoms: toAddressTelecoms(domain),
        encryptedSelf: toAddressEncryptedSelf(domain),
    })
}
