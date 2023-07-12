import { MedicalDevice } from '../models/MedicalDevice.model'
import { CodeStub, Device, Identifier as IdentifierDto, PropertyStub } from '@icure/api'
import {
  CodingReference,
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
} from '@icure/typescript-common'

function toDeviceId(domain: MedicalDevice): string | undefined {
  return domain.id
}

function toDeviceRev(domain: MedicalDevice): string | undefined {
  return domain.rev
}

function toDeviceDeletionDate(domain: MedicalDevice): number | undefined {
  return domain.deletionDate
}

function toDeviceIdentifiers(domain: MedicalDevice): IdentifierDto[] | undefined {
  return domain.identifiers ? [...domain.identifiers].map(mapIdentifierToIdentifierDto) : undefined
}

function toDeviceCreated(domain: MedicalDevice): number | undefined {
  return domain.created
}

function toDeviceModified(domain: MedicalDevice): number | undefined {
  return domain.modified
}

function toDeviceAuthor(domain: MedicalDevice): string | undefined {
  return domain.author
}

function toDeviceResponsible(domain: MedicalDevice): string | undefined {
  return domain.responsible
}

function toDeviceTags(domain: MedicalDevice): CodeStub[] | undefined {
  return domain.labels ? [...domain.labels].map(mapCodingReferenceToCodeStub) : undefined
}

function toDeviceCodes(domain: MedicalDevice): CodeStub[] | undefined {
  return domain.codes ? [...domain.codes].map(mapCodingReferenceToCodeStub) : undefined
}

function toDeviceEndOfLife(domain: MedicalDevice): number | undefined {
  return domain.endOfLife
}

function toDeviceMedicalLocationId(domain: MedicalDevice): string | undefined {
  return undefined
}

function toDeviceExternalId(domain: MedicalDevice): string | undefined {
  return domain.externalId
}

function toDeviceName(domain: MedicalDevice): string | undefined {
  return domain.name
}

function toDeviceType(domain: MedicalDevice): string | undefined {
  return domain.type
}

function toDeviceBrand(domain: MedicalDevice): string | undefined {
  return domain.brand
}

function toDeviceModel(domain: MedicalDevice): string | undefined {
  return domain.model
}

function toDeviceSerialNumber(domain: MedicalDevice): string | undefined {
  return domain.serialNumber
}

function toDeviceParentId(domain: MedicalDevice): string | undefined {
  return domain.parentId
}

function toDevicePicture(domain: MedicalDevice): ArrayBuffer | undefined {
  return domain.picture
}

function toDeviceProperties(domain: MedicalDevice): PropertyStub[] | undefined {
  return domain.properties ? [...domain.properties].map(mapPropertyToPropertyStub) : undefined
}

function toDeviceHcPartyKeys(domain: MedicalDevice): { [key: string]: string[] } | undefined {
  return !!domain.systemMetaData ? toHcPartyKeys(domain.systemMetaData) : undefined
}

function toDeviceAesExchangeKeys(domain: MedicalDevice):
  | {
      [key: string]: { [key: string]: { [key: string]: string } }
    }
  | undefined {
  return !!domain.systemMetaData ? toAesExchangeKeys(domain.systemMetaData) : undefined
}

function toDeviceTransferKeys(domain: MedicalDevice): { [key: string]: { [key: string]: string } } | undefined {
  return !!domain.systemMetaData ? toTransferKeys(domain.systemMetaData) : undefined
}

function toDevicePrivateKeyShamirPartitions(domain: MedicalDevice): { [key: string]: string } | undefined {
  return !!domain.systemMetaData ? toPrivateKeyShamirPartitions(domain.systemMetaData) : undefined
}

function toDevicePublicKey(domain: MedicalDevice): string | undefined {
  return !!domain.systemMetaData ? toPublicKey(domain.systemMetaData) : undefined
}

function toDevicePublicKeysForOaepWithSha256(domain: MedicalDevice): string[] | undefined {
  return !!domain.systemMetaData ? toPublicKeysForOaepWithSha256(domain.systemMetaData) : undefined
}

function toMedicalDeviceId(dto: Device): string | undefined {
  return dto.id
}

function toMedicalDeviceRev(dto: Device): string | undefined {
  return dto.rev
}

function toMedicalDeviceDeletionDate(dto: Device): number | undefined {
  return dto.deletionDate
}

function toMedicalDeviceIdentifiers(dto: Device): Identifier[] {
  return dto.identifiers ? [...dto.identifiers].map(mapIdentifierDtoToIdentifier) : []
}

function toMedicalDeviceCreated(dto: Device): number | undefined {
  return dto.created
}

function toMedicalDeviceModified(dto: Device): number | undefined {
  return dto.modified
}

function toMedicalDeviceAuthor(dto: Device): string | undefined {
  return dto.author
}

function toMedicalDeviceResponsible(dto: Device): string | undefined {
  return dto.responsible
}

function toMedicalDeviceLabels(dto: Device): Set<CodingReference> {
  return dto.tags ? new Set([...dto.tags].map(mapCodeStubToCodingReference)) : new Set()
}

function toMedicalDeviceCodes(dto: Device): Set<CodingReference> {
  return dto.codes ? new Set([...dto.codes].map(mapCodeStubToCodingReference)) : new Set()
}

function toMedicalDeviceEndOfLife(dto: Device): number | undefined {
  return dto.endOfLife
}

function toMedicalDeviceExternalId(dto: Device): string | undefined {
  return dto.externalId
}

function toMedicalDeviceName(dto: Device): string | undefined {
  return dto.name
}

function toMedicalDeviceType(dto: Device): string | undefined {
  return dto.type
}

function toMedicalDeviceBrand(dto: Device): string | undefined {
  return dto.brand
}

function toMedicalDeviceModel(dto: Device): string | undefined {
  return dto.model
}

function toMedicalDeviceSerialNumber(dto: Device): string | undefined {
  return dto.serialNumber
}

function toMedicalDeviceParentId(dto: Device): string | undefined {
  return dto.parentId
}

function toMedicalDevicePicture(dto: Device): ArrayBuffer | undefined {
  return dto.picture
}

function toMedicalDeviceProperties(dto: Device): Set<Property> {
  return dto.properties ? new Set([...dto.properties].map(mapPropertyStubToProperty)) : new Set()
}

function toMedicalDeviceSystemMetaData(dto: Device): SystemMetaDataOwner | undefined {
  return toSystemMetaDataOwner(dto)
}

export function mapDeviceToMedicalDevice(dto: Device): MedicalDevice {
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

export function mapMedicalDeviceToDevice(domain: MedicalDevice): Device {
  return new Device({
    id: toDeviceId(domain),
    rev: toDeviceRev(domain),
    deletionDate: toDeviceDeletionDate(domain),
    identifiers: toDeviceIdentifiers(domain),
    created: toDeviceCreated(domain),
    modified: toDeviceModified(domain),
    author: toDeviceAuthor(domain),
    responsible: toDeviceResponsible(domain),
    tags: toDeviceTags(domain),
    codes: toDeviceCodes(domain),
    endOfLife: toDeviceEndOfLife(domain),
    medicalLocationId: toDeviceMedicalLocationId(domain),
    externalId: toDeviceExternalId(domain),
    name: toDeviceName(domain),
    type: toDeviceType(domain),
    brand: toDeviceBrand(domain),
    model: toDeviceModel(domain),
    serialNumber: toDeviceSerialNumber(domain),
    parentId: toDeviceParentId(domain),
    picture: toDevicePicture(domain),
    properties: toDeviceProperties(domain),
    hcPartyKeys: toDeviceHcPartyKeys(domain),
    aesExchangeKeys: toDeviceAesExchangeKeys(domain),
    transferKeys: toDeviceTransferKeys(domain),
    privateKeyShamirPartitions: toDevicePrivateKeyShamirPartitions(domain),
    publicKey: toDevicePublicKey(domain),
    publicKeysForOaepWithSha256: toDevicePublicKeysForOaepWithSha256(domain),
  })
}
