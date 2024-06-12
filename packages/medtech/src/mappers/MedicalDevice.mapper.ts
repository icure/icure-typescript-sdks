import { MedicalDevice } from '../models/MedicalDevice.model'
import {
    CodingReference,
    forceUuid,
    Identifier,
    mapCodeStubToCodingReference,
    mapCodingReferenceToCodeStub,
    mapIdentifierDtoToIdentifier,
    mapIdentifierToIdentifierDto,
    mapPropertyStubToProperty,
    mapPropertyToPropertyStub,
    Property,
    SystemMetaDataOwner,
    toAesExchangeKeys,
    toHcPartyKeys,
    toPrivateKeyShamirPartitions,
    toPublicKey,
    toPublicKeysForOaepWithSha256,
    toSystemMetaDataOwner,
    toTransferKeys,
    CodeStub,
    DeviceDto,
    IdentifierDto,
    PropertyStub,
} from '@icure/typescript-common'

function toDeviceDtoId(domain: MedicalDevice): string {
    return forceUuid(domain.id)
}

function toDeviceDtoRev(domain: MedicalDevice): string | undefined {
    return domain.rev
}

function toDeviceDtoDeletionDate(domain: MedicalDevice): number | undefined {
    return domain.deletionDate
}

function toDeviceDtoIdentifiers(domain: MedicalDevice): IdentifierDto[] | undefined {
    return domain.identifiers ? [...domain.identifiers].map(mapIdentifierToIdentifierDto) : undefined
}

function toDeviceDtoCreated(domain: MedicalDevice): number | undefined {
    return domain.created
}

function toDeviceDtoModified(domain: MedicalDevice): number | undefined {
    return domain.modified
}

function toDeviceDtoAuthor(domain: MedicalDevice): string | undefined {
    return domain.author
}

function toDeviceDtoResponsible(domain: MedicalDevice): string | undefined {
    return domain.responsible
}

function toDeviceDtoTags(domain: MedicalDevice): CodeStub[] | undefined {
    return domain.labels ? [...domain.labels].map(mapCodingReferenceToCodeStub) : undefined
}

function toDeviceDtoCodes(domain: MedicalDevice): CodeStub[] | undefined {
    return domain.codes ? [...domain.codes].map(mapCodingReferenceToCodeStub) : undefined
}

function toDeviceDtoEndOfLife(domain: MedicalDevice): number | undefined {
    return domain.endOfLife
}

function toDeviceDtoMedicalLocationId(domain: MedicalDevice): string | undefined {
    return undefined
}

function toDeviceDtoExternalId(domain: MedicalDevice): string | undefined {
    return domain.externalId
}

function toDeviceDtoName(domain: MedicalDevice): string | undefined {
    return domain.name
}

function toDeviceDtoType(domain: MedicalDevice): string | undefined {
    return domain.type
}

function toDeviceDtoBrand(domain: MedicalDevice): string | undefined {
    return domain.brand
}

function toDeviceDtoModel(domain: MedicalDevice): string | undefined {
    return domain.model
}

function toDeviceDtoSerialNumber(domain: MedicalDevice): string | undefined {
    return domain.serialNumber
}

function toDeviceDtoParentId(domain: MedicalDevice): string | undefined {
    return domain.parentId
}

function toDeviceDtoPicture(domain: MedicalDevice): ArrayBuffer | undefined {
    return domain.picture
}

function toDeviceDtoProperties(domain: MedicalDevice): PropertyStub[] | undefined {
    return domain.properties ? [...domain.properties].map(mapPropertyToPropertyStub) : undefined
}

function toDeviceDtoHcPartyKeys(domain: MedicalDevice): { [key: string]: string[] } | undefined {
    return !!domain.systemMetaData ? toHcPartyKeys(domain.systemMetaData) : undefined
}

function toDeviceDtoAesExchangeKeys(domain: MedicalDevice):
    | {
          [key: string]: { [key: string]: { [key: string]: string } }
      }
    | undefined {
    return !!domain.systemMetaData ? toAesExchangeKeys(domain.systemMetaData) : undefined
}

function toDeviceDtoTransferKeys(domain: MedicalDevice): { [key: string]: { [key: string]: string } } | undefined {
    return !!domain.systemMetaData ? toTransferKeys(domain.systemMetaData) : undefined
}

function toDeviceDtoPrivateKeyShamirPartitions(domain: MedicalDevice): { [key: string]: string } | undefined {
    return !!domain.systemMetaData ? toPrivateKeyShamirPartitions(domain.systemMetaData) : undefined
}

function toDeviceDtoPublicKey(domain: MedicalDevice): string | undefined {
    return !!domain.systemMetaData ? toPublicKey(domain.systemMetaData) : undefined
}

function toDeviceDtoPublicKeysForOaepWithSha256(domain: MedicalDevice): string[] | undefined {
    return !!domain.systemMetaData ? toPublicKeysForOaepWithSha256(domain.systemMetaData) : undefined
}

function toMedicalDeviceId(dto: DeviceDto): string | undefined {
    return dto.id
}

function toMedicalDeviceRev(dto: DeviceDto): string | undefined {
    return dto.rev
}

function toMedicalDeviceDeletionDate(dto: DeviceDto): number | undefined {
    return dto.deletionDate
}

function toMedicalDeviceIdentifiers(dto: DeviceDto): Identifier[] {
    return dto.identifiers ? [...dto.identifiers].map(mapIdentifierDtoToIdentifier) : []
}

function toMedicalDeviceCreated(dto: DeviceDto): number | undefined {
    return dto.created
}

function toMedicalDeviceModified(dto: DeviceDto): number | undefined {
    return dto.modified
}

function toMedicalDeviceAuthor(dto: DeviceDto): string | undefined {
    return dto.author
}

function toMedicalDeviceResponsible(dto: DeviceDto): string | undefined {
    return dto.responsible
}

function toMedicalDeviceLabels(dto: DeviceDto): Array<CodingReference> {
    return dto.tags ? [...dto.tags].map(mapCodeStubToCodingReference) : []
}

function toMedicalDeviceCodes(dto: DeviceDto): Array<CodingReference> {
    return dto.codes ? [...dto.codes].map(mapCodeStubToCodingReference) : []
}

function toMedicalDeviceEndOfLife(dto: DeviceDto): number | undefined {
    return dto.endOfLife
}

function toMedicalDeviceExternalId(dto: DeviceDto): string | undefined {
    return dto.externalId
}

function toMedicalDeviceName(dto: DeviceDto): string | undefined {
    return dto.name
}

function toMedicalDeviceType(dto: DeviceDto): string | undefined {
    return dto.type
}

function toMedicalDeviceBrand(dto: DeviceDto): string | undefined {
    return dto.brand
}

function toMedicalDeviceModel(dto: DeviceDto): string | undefined {
    return dto.model
}

function toMedicalDeviceSerialNumber(dto: DeviceDto): string | undefined {
    return dto.serialNumber
}

function toMedicalDeviceParentId(dto: DeviceDto): string | undefined {
    return dto.parentId
}

function toMedicalDevicePicture(dto: DeviceDto): ArrayBuffer | undefined {
    return dto.picture
}

function toMedicalDeviceProperties(dto: DeviceDto): Array<Property> {
    return dto.properties ? [...dto.properties].map(mapPropertyStubToProperty) : []
}

function toMedicalDeviceSystemMetaData(dto: DeviceDto): SystemMetaDataOwner | undefined {
    return toSystemMetaDataOwner(dto)
}

export function mapDeviceDtoToMedicalDevice(dto: DeviceDto): MedicalDevice {
    return new MedicalDevice({
        id: toMedicalDeviceId(dto),
        rev: toMedicalDeviceRev(dto),
        deletionDate: toMedicalDeviceDeletionDate(dto),
        identifiers: toMedicalDeviceIdentifiers(dto),
        created: toMedicalDeviceCreated(dto),
        modified: toMedicalDeviceModified(dto),
        author: toMedicalDeviceAuthor(dto),
        responsible: toMedicalDeviceResponsible(dto),
        labels: toMedicalDeviceLabels(dto),
        codes: toMedicalDeviceCodes(dto),
        endOfLife: toMedicalDeviceEndOfLife(dto),
        externalId: toMedicalDeviceExternalId(dto),
        name: toMedicalDeviceName(dto),
        type: toMedicalDeviceType(dto),
        brand: toMedicalDeviceBrand(dto),
        model: toMedicalDeviceModel(dto),
        serialNumber: toMedicalDeviceSerialNumber(dto),
        parentId: toMedicalDeviceParentId(dto),
        picture: toMedicalDevicePicture(dto),
        properties: toMedicalDeviceProperties(dto),
        systemMetaData: toMedicalDeviceSystemMetaData(dto),
    })
}

export function mapMedicalDeviceToDeviceDto(domain: MedicalDevice): DeviceDto {
    return new DeviceDto({
        id: toDeviceDtoId(domain),
        rev: toDeviceDtoRev(domain),
        deletionDate: toDeviceDtoDeletionDate(domain),
        identifiers: toDeviceDtoIdentifiers(domain),
        created: toDeviceDtoCreated(domain),
        modified: toDeviceDtoModified(domain),
        author: toDeviceDtoAuthor(domain),
        responsible: toDeviceDtoResponsible(domain),
        tags: toDeviceDtoTags(domain),
        codes: toDeviceDtoCodes(domain),
        endOfLife: toDeviceDtoEndOfLife(domain),
        medicalLocationId: toDeviceDtoMedicalLocationId(domain),
        externalId: toDeviceDtoExternalId(domain),
        name: toDeviceDtoName(domain),
        type: toDeviceDtoType(domain),
        brand: toDeviceDtoBrand(domain),
        model: toDeviceDtoModel(domain),
        serialNumber: toDeviceDtoSerialNumber(domain),
        parentId: toDeviceDtoParentId(domain),
        picture: toDeviceDtoPicture(domain),
        properties: toDeviceDtoProperties(domain),
        hcPartyKeys: toDeviceDtoHcPartyKeys(domain),
        aesExchangeKeys: toDeviceDtoAesExchangeKeys(domain),
        transferKeys: toDeviceDtoTransferKeys(domain),
        privateKeyShamirPartitions: toDeviceDtoPrivateKeyShamirPartitions(domain),
        publicKey: toDeviceDtoPublicKey(domain),
        publicKeysForOaepWithSha256: toDeviceDtoPublicKeysForOaepWithSha256(domain),
    })
}
