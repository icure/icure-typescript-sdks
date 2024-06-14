import { Address, AddressAddressTypeEnum } from '../models/Address.model'
import { AddressDto, Annotation, AnnotationDto, mapAnnotationDtoToAnnotation, mapAnnotationToAnnotationDto, TelecomDto } from '@icure/typescript-common'
import { Telecom } from '../models/Telecom.model'
import { mapTelecomDtoToTelecom } from './Telecom.mapper'

function toAddressDtoAddressType(domain: Address): AddressAddressTypeEnum | undefined {
    return domain.addressType
}

function toAddressDtoDescr(domain: Address): string | undefined {
    return domain.description
}

function toAddressDtoStreet(domain: Address): string | undefined {
    return domain.street
}

function toAddressDtoHouseNumber(domain: Address): string | undefined {
    return domain.houseNumber
}

function toAddressDtoPostboxNumber(domain: Address): string | undefined {
    return domain.postboxNumber
}

function toAddressDtoPostalCode(domain: Address): string | undefined {
    return domain.postalCode
}

function toAddressDtoCity(domain: Address): string | undefined {
    return domain.city
}

function toAddressDtoState(domain: Address): string | undefined {
    return domain.state
}

function toAddressDtoCountry(domain: Address): string | undefined {
    return domain.country
}

function toAddressDtoNote(domain: Address): string | undefined {
    return domain.note
}

function toAddressDtoNotes(domain: Address): AnnotationDto[] | undefined {
    return domain.notes?.map(mapAnnotationToAnnotationDto) ?? undefined
}

function toAddressDtoTelecoms(domain: Address): TelecomDto[] | undefined {
    return domain.telecoms
}

function toAddressDtoEncryptedSelf(domain: Address): string | undefined {
    return domain.encryptedSelf
}

function toAddressAddressType(dto: AddressDto): AddressAddressTypeEnum | undefined {
    return dto.addressType as AddressAddressTypeEnum
}

function toAddressDescription(dto: AddressDto): string | undefined {
    return dto.descr
}

function toAddressStreet(dto: AddressDto): string | undefined {
    return dto.street
}

function toAddressHouseNumber(dto: AddressDto): string | undefined {
    return dto.houseNumber
}

function toAddressPostboxNumber(dto: AddressDto): string | undefined {
    return dto.postboxNumber
}

function toAddressPostalCode(dto: AddressDto): string | undefined {
    return dto.postalCode
}

function toAddressCity(dto: AddressDto): string | undefined {
    return dto.city
}

function toAddressState(dto: AddressDto): string | undefined {
    return dto.state
}

function toAddressCountry(dto: AddressDto): string | undefined {
    return dto.country
}

function toAddressNote(dto: AddressDto): string | undefined {
    return dto.note
}

function toAddressTelecoms(dto: AddressDto): Telecom[] {
    return dto.telecoms?.map(mapTelecomDtoToTelecom) ?? []
}

function toAddressNotes(dto: AddressDto): Annotation[] | undefined {
    return dto.notes?.map(mapAnnotationDtoToAnnotation) ?? undefined
}

function toAddressEncryptedSelf(dto: AddressDto): string | undefined {
    return dto.encryptedSelf
}

export function mapAddressDtoToAddress(dto: AddressDto): Address {
    return new Address({
        addressType: toAddressAddressType(dto),
        description: toAddressDescription(dto),
        street: toAddressStreet(dto),
        houseNumber: toAddressHouseNumber(dto),
        postboxNumber: toAddressPostboxNumber(dto),
        postalCode: toAddressPostalCode(dto),
        city: toAddressCity(dto),
        state: toAddressState(dto),
        country: toAddressCountry(dto),
        note: toAddressNote(dto),
        telecoms: toAddressTelecoms(dto),
        notes: toAddressNotes(dto),
        encryptedSelf: toAddressEncryptedSelf(dto),
    })
}

export function mapAddressToAddressDto(domain: Address): AddressDto {
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
