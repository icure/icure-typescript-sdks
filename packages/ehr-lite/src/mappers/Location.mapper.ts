import { Location } from '../models/Location.model'
import { Annotation, mapAnnotationDtoToAnnotation, mapAnnotationToAnnotationDto, AddressDto, AnnotationDto, TelecomDto } from '@icure/typescript-common'
import { ContactPoint } from '../models/ContactPoint.model'
import { LocationAddressTypeEnum } from '../models/enums/LocationAddressType.enum'
import { mapContactPointToTelecomDto, mapTelecomDtoToContactPoint } from './ContactPoint.mapper'

function toAddressDtoAddressType(domain: Location): AddressDto.AddressTypeEnum | undefined {
    return domain.addressType
}

function toAddressDtoDescr(domain: Location): string | undefined {
    return domain.description
}

function toAddressDtoStreet(domain: Location): string | undefined {
    return domain.street
}

function toAddressDtoHouseNumber(domain: Location): string | undefined {
    return domain.houseNumber
}

function toAddressDtoPostboxNumber(domain: Location): string | undefined {
    return domain.postboxNumber
}

function toAddressDtoPostalCode(domain: Location): string | undefined {
    return domain.postalCode
}

function toAddressDtoCity(domain: Location): string | undefined {
    return domain.city
}

function toAddressDtoState(domain: Location): string | undefined {
    return domain.state
}

function toAddressDtoCountry(domain: Location): string | undefined {
    return domain.country
}

function toAddressDtoNote(domain: Location): string | undefined {
    return undefined
}

function toAddressDtoNotes(domain: Location): AnnotationDto[] | undefined {
    return !!domain.notes ? domain.notes.map(mapAnnotationToAnnotationDto) : undefined
}

function toAddressDtoTelecoms(domain: Location): TelecomDto[] | undefined {
    return !!domain.telecoms ? domain.telecoms.map(mapContactPointToTelecomDto) : undefined
}

function toAddressDtoEncryptedSelf(domain: Location): string | undefined {
    return domain.encryptedSelf
}

function toLocationAddressType(dto: AddressDto): LocationAddressTypeEnum | undefined {
    return dto.addressType as LocationAddressTypeEnum | undefined
}

function toLocationDescription(dto: AddressDto): string | undefined {
    return dto.descr
}

function toLocationStreet(dto: AddressDto): string | undefined {
    return dto.street
}

function toLocationHouseNumber(dto: AddressDto): string | undefined {
    return dto.houseNumber
}

function toLocationPostboxNumber(dto: AddressDto): string | undefined {
    return dto.postboxNumber
}

function toLocationPostalCode(dto: AddressDto): string | undefined {
    return dto.postalCode
}

function toLocationCity(dto: AddressDto): string | undefined {
    return dto.city
}

function toLocationState(dto: AddressDto): string | undefined {
    return dto.state
}

function toLocationCountry(dto: AddressDto): string | undefined {
    return dto.country
}

function toLocationNotes(dto: AddressDto): Annotation[] | undefined {
    return !!dto.notes ? dto.notes.map(mapAnnotationDtoToAnnotation) : undefined
}

function toLocationTelecoms(dto: AddressDto): ContactPoint[] | undefined {
    return !!dto.telecoms ? dto.telecoms.map(mapTelecomDtoToContactPoint) : undefined
}

function toLocationEncryptedSelf(dto: AddressDto): string | undefined {
    return dto.encryptedSelf
}

export function mapAddressDtoToLocation(dto: AddressDto): Location {
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

export function mapLocationToAddressDto(domain: Location): AddressDto {
    return new AddressDto({
    addressType: toAddressDtoAddressType(domain),
    descr: toAddressDtoDescr(domain),
    street: toAddressDtoStreet(domain),
    houseNumber: toAddressDtoHouseNumber(domain),
    postboxNumber: toAddressDtoPostboxNumber(domain),
    postalCode: toAddressDtoPostalCode(domain),
    city: toAddressDtoCity(domain),
    state: toAddressDtoState(domain),
    country: toAddressDtoCountry(domain),
    note: toAddressDtoNote(domain),
    notes: toAddressDtoNotes(domain),
    telecoms: toAddressDtoTelecoms(domain),
    encryptedSelf: toAddressDtoEncryptedSelf(domain),
    })
}
