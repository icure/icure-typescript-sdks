import { HealthcareProfessional, HealthcareProfessionalGenderEnum } from '../models/HealthcareProfessional.model'
import { PersonName } from '../models/PersonName.model'
import { Address } from '../models/Address.model'
import {
    CodingReference,
    forceUuid,
    mapCodeStubToCodingReference,
    mapCodingReferenceToCodeStub,
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
    AddressDto,
    CodeStub,
    FinancialInstitutionInformation,
    FlatRateTarification,
    HealthcarePartyDto,
    HealthcarePartyHistoryStatus,
    IdentifierDto,
    PersonNameDto,
    PropertyStub,
} from '@icure/typescript-common'
import { mapPersonNameDtoToPersonName, mapPersonNameToPersonNameDto } from './PersonName.mapper'
import { mapAddressDtoToAddress, mapAddressToAddressDto } from './Address.mapper'
import { b64_2ab, ua2b64 } from '@icure/api'

function toHealthcarePartyDtoId(domain: HealthcareProfessional): string | undefined {
    return forceUuid(domain.id)
}

function toHealthcarePartyDtoRev(domain: HealthcareProfessional): string | undefined {
    return domain.rev
}

function toHealthcarePartyDtoCreated(domain: HealthcareProfessional): number | undefined {
    return domain.created
}

function toHealthcarePartyDtoModified(domain: HealthcareProfessional): number | undefined {
    return domain.modified
}

function toHealthcarePartyDtoDeletionDate(domain: HealthcareProfessional): number | undefined {
    return domain.deletionDate
}

function toHealthcarePartyDtoIdentifier(domain: HealthcareProfessional): IdentifierDto[] | undefined {
    return undefined
}

function toHealthcarePartyDtoTags(domain: HealthcareProfessional): CodeStub[] | undefined {
    return !!domain.labels ? [...domain.labels].map(mapCodingReferenceToCodeStub) : undefined
}

function toHealthcarePartyDtoCodes(domain: HealthcareProfessional): CodeStub[] | undefined {
    return !!domain.codes ? [...domain.codes].map(mapCodingReferenceToCodeStub) : undefined
}

function toHealthcarePartyDtoName(domain: HealthcareProfessional): string | undefined {
    return domain.name
}

function toHealthcarePartyDtoLastName(domain: HealthcareProfessional): string | undefined {
    return domain.lastName
}

function toHealthcarePartyDtoFirstName(domain: HealthcareProfessional): string | undefined {
    return domain.firstName
}

function toHealthcarePartyDtoNames(domain: HealthcareProfessional): PersonNameDto[] | undefined {
    return !!domain.names ? [...domain.names].map(mapPersonNameToPersonNameDto) : undefined
}

function toHealthcarePartyDtoGender(domain: HealthcareProfessional): HealthcarePartyDto.GenderEnum | undefined {
    return domain.gender
}

function toHealthcarePartyDtoCivility(domain: HealthcareProfessional): string | undefined {
    return domain.civility
}

function toHealthcarePartyDtoCompanyName(domain: HealthcareProfessional): string | undefined {
    return undefined
}

function toHealthcarePartyDtoSpeciality(domain: HealthcareProfessional): string | undefined {
    return domain.speciality
}

function toHealthcarePartyDtoBankAccount(domain: HealthcareProfessional): string | undefined {
    return undefined
}

function toHealthcarePartyDtoBic(domain: HealthcareProfessional): string | undefined {
    return undefined
}

function toHealthcarePartyDtoProxyBankAccount(domain: HealthcareProfessional): string | undefined {
    return undefined
}

function toHealthcarePartyDtoProxyBic(domain: HealthcareProfessional): string | undefined {
    return undefined
}

function toHealthcarePartyDtoInvoiceHeader(domain: HealthcareProfessional): string | undefined {
    return undefined
}

function toHealthcarePartyDtoCbe(domain: HealthcareProfessional): string | undefined {
    return undefined
}

function toHealthcarePartyDtoEhp(domain: HealthcareProfessional): string | undefined {
    return undefined
}

function toHealthcarePartyDtoUserId(domain: HealthcareProfessional): string | undefined {
    return undefined
}

function toHealthcarePartyDtoParentId(domain: HealthcareProfessional): string | undefined {
    return domain.parentId
}

function toHealthcarePartyDtoConvention(domain: HealthcareProfessional): number | undefined {
    return undefined
}

function toHealthcarePartyDtoNihii(domain: HealthcareProfessional): string | undefined {
    return undefined
}

function toHealthcarePartyDtoNihiiSpecCode(domain: HealthcareProfessional): string | undefined {
    return undefined
}

function toHealthcarePartyDtoSsin(domain: HealthcareProfessional): string | undefined {
    return undefined
}

function toHealthcarePartyDtoAddresses(domain: HealthcareProfessional): AddressDto[] | undefined {
    return !!domain.addresses ? [...domain.addresses].map(mapAddressToAddressDto) : undefined
}

function toHealthcarePartyDtoLanguages(domain: HealthcareProfessional): string[] | undefined {
    return domain.languages
}

function toHealthcarePartyDtoPicture(domain: HealthcareProfessional): ArrayBuffer | undefined {
    return domain.picture ? b64_2ab(domain.picture) : undefined
}

function toHealthcarePartyDtoStatuses(domain: HealthcareProfessional): HealthcarePartyDto.StatusesEnum[] | undefined {
    return undefined
}

function toHealthcarePartyDtoStatusHistory(domain: HealthcareProfessional): HealthcarePartyHistoryStatus[] | undefined {
    return undefined
}

function toHealthcarePartyDtoSpecialityCodes(domain: HealthcareProfessional): CodeStub[] | undefined {
    return undefined
}

function toHealthcarePartyDtoSendFormats(domain: HealthcareProfessional): { [key: string]: string } | undefined {
    return undefined
}

function toHealthcarePartyDtoNotes(domain: HealthcareProfessional): string | undefined {
    return domain.notes
}

function toHealthcarePartyDtoFinancialInstitutionInformation(domain: HealthcareProfessional): FinancialInstitutionInformation[] | undefined {
    return undefined
}

function toHealthcarePartyDtoDescr(domain: HealthcareProfessional): { [key: string]: string } | undefined {
    return undefined
}

function toHealthcarePartyDtoBillingType(domain: HealthcareProfessional): string | undefined {
    return undefined
}

function toHealthcarePartyDtoType(domain: HealthcareProfessional): string | undefined {
    return undefined
}

function toHealthcarePartyDtoContactPerson(domain: HealthcareProfessional): string | undefined {
    return undefined
}

function toHealthcarePartyDtoContactPersonHcpId(domain: HealthcareProfessional): string | undefined {
    return undefined
}

function toHealthcarePartyDtoSupervisorId(domain: HealthcareProfessional): string | undefined {
    return undefined
}

function toHealthcarePartyDtoFlatRateTarifications(domain: HealthcareProfessional): FlatRateTarification[] | undefined {
    return undefined
}

function toHealthcarePartyDtoImportedData(domain: HealthcareProfessional): { [key: string]: string } | undefined {
    return undefined
}

function toHealthcarePartyDtoOptions(domain: HealthcareProfessional): { [key: string]: string } | undefined {
    return undefined
}

function toHealthcarePartyDtoProperties(domain: HealthcareProfessional): PropertyStub[] | undefined {
    return domain.properties ? [...domain.properties].map(mapPropertyToPropertyStub) : undefined
}

function toHealthcarePartyDtoHcPartyKeys(domain: HealthcareProfessional): { [key: string]: string[] } | undefined {
    return !!domain.systemMetaData ? toHcPartyKeys(domain.systemMetaData) : undefined
}

function toHealthcarePartyDtoAesExchangeKeys(domain: HealthcareProfessional):
    | {
          [key: string]: { [key: string]: { [key: string]: string } }
      }
    | undefined {
    return !!domain.systemMetaData ? toAesExchangeKeys(domain.systemMetaData) : undefined
}

function toHealthcarePartyDtoTransferKeys(domain: HealthcareProfessional):
    | {
          [key: string]: { [key: string]: string }
      }
    | undefined {
    return !!domain.systemMetaData ? toTransferKeys(domain.systemMetaData) : undefined
}

function toHealthcarePartyDtoPrivateKeyShamirPartitions(domain: HealthcareProfessional):
    | {
          [key: string]: string
      }
    | undefined {
    return !!domain.systemMetaData ? toPrivateKeyShamirPartitions(domain.systemMetaData) : undefined
}

function toHealthcarePartyDtoPublicKey(domain: HealthcareProfessional): string | undefined {
    return !!domain.systemMetaData ? toPublicKey(domain.systemMetaData) : undefined
}

function toHealthcarePartyDtoPublicKeysForOaepWithSha256(domain: HealthcareProfessional): string[] | undefined {
    return !!domain.systemMetaData ? toPublicKeysForOaepWithSha256(domain.systemMetaData) : undefined
}

function toHealthcareProfessionalId(dto: HealthcarePartyDto): string | undefined {
    return dto.id
}

function toHealthcareProfessionalRev(dto: HealthcarePartyDto): string | undefined {
    return dto.rev
}

function toHealthcareProfessionalCreated(dto: HealthcarePartyDto): number | undefined {
    return dto.created
}

function toHealthcareProfessionalModified(dto: HealthcarePartyDto): number | undefined {
    return dto.modified
}

function toHealthcareProfessionalLabels(dto: HealthcarePartyDto): Array<CodingReference> {
    return dto.tags ? dto.tags.map(mapCodeStubToCodingReference) : []
}

function toHealthcareProfessionalCodes(dto: HealthcarePartyDto): Array<CodingReference> {
    return dto.codes ? dto.codes.map(mapCodeStubToCodingReference) : []
}

function toHealthcareProfessionalDeletionDate(dto: HealthcarePartyDto): number | undefined {
    return dto.deletionDate
}

function toHealthcareProfessionalName(dto: HealthcarePartyDto): string | undefined {
    return dto.name
}

function toHealthcareProfessionalLastName(dto: HealthcarePartyDto): string | undefined {
    return dto.lastName
}

function toHealthcareProfessionalFirstName(dto: HealthcarePartyDto): string | undefined {
    return dto.firstName
}

function toHealthcareProfessionalNames(dto: HealthcarePartyDto): PersonName[] {
    return dto.names ? [...dto.names].map(mapPersonNameDtoToPersonName) : []
}

function toHealthcareProfessionalGender(dto: HealthcarePartyDto): HealthcareProfessionalGenderEnum | undefined {
    return dto.gender
}

function toHealthcareProfessionalCivility(dto: HealthcarePartyDto): string | undefined {
    return dto.civility
}

function toHealthcareProfessionalSpeciality(dto: HealthcarePartyDto): string | undefined {
    return dto.speciality
}

function toHealthcareProfessionalParentId(dto: HealthcarePartyDto): string | undefined {
    return dto.parentId
}

function toHealthcareProfessionalAddresses(dto: HealthcarePartyDto): Address[] {
    return dto.addresses ? [...dto.addresses].map(mapAddressDtoToAddress) : []
}

function toHealthcareProfessionalLanguages(dto: HealthcarePartyDto): string[] {
    return dto.languages ?? []
}

function toHealthcareProfessionalPicture(dto: HealthcarePartyDto): string | undefined {
    return dto.picture ? ua2b64(dto.picture) : undefined
}

function toHealthcareProfessionalSpecialityCodes(dto: HealthcarePartyDto): Array<CodingReference> | undefined {
    return dto.specialityCodes ? dto.specialityCodes.map(mapCodeStubToCodingReference) : undefined
}

function toHealthcareProfessionalNotes(dto: HealthcarePartyDto): string | undefined {
    return dto.notes
}

function toHealthcareProfessionalProperties(dto: HealthcarePartyDto): Array<Property> {
    return dto.properties ? [...dto.properties].map(mapPropertyStubToProperty) : []
}

function toHealthcareProfessionalSystemMetaData(dto: HealthcarePartyDto): SystemMetaDataOwner | undefined {
    return toSystemMetaDataOwner(dto)
}

export function mapHealthcarePartyDtoToHealthcareProfessional(dto: HealthcarePartyDto): HealthcareProfessional {
    return new HealthcareProfessional({
    id: toHealthcareProfessionalId(dto),
    rev: toHealthcareProfessionalRev(dto),
    created: toHealthcareProfessionalCreated(dto),
    modified: toHealthcareProfessionalModified(dto),
    labels: toHealthcareProfessionalLabels(dto),
    codes: toHealthcareProfessionalCodes(dto),
    deletionDate: toHealthcareProfessionalDeletionDate(dto),
    name: toHealthcareProfessionalName(dto),
    lastName: toHealthcareProfessionalLastName(dto),
    firstName: toHealthcareProfessionalFirstName(dto),
    names: toHealthcareProfessionalNames(dto),
    gender: toHealthcareProfessionalGender(dto),
    civility: toHealthcareProfessionalCivility(dto),
    speciality: toHealthcareProfessionalSpeciality(dto),
    parentId: toHealthcareProfessionalParentId(dto),
    addresses: toHealthcareProfessionalAddresses(dto),
    languages: toHealthcareProfessionalLanguages(dto),
    picture: toHealthcareProfessionalPicture(dto),
    specialityCodes: toHealthcareProfessionalSpecialityCodes(dto),
    notes: toHealthcareProfessionalNotes(dto),
    properties: toHealthcareProfessionalProperties(dto),
    systemMetaData: toHealthcareProfessionalSystemMetaData(dto),
    })
}

export function mapHealthcareProfessionalToHealthcarePartyDto(domain: HealthcareProfessional): HealthcarePartyDto {
    return new HealthcarePartyDto({
    id: toHealthcarePartyDtoId(domain),
    rev: toHealthcarePartyDtoRev(domain),
    created: toHealthcarePartyDtoCreated(domain),
    modified: toHealthcarePartyDtoModified(domain),
    deletionDate: toHealthcarePartyDtoDeletionDate(domain),
    identifier: toHealthcarePartyDtoIdentifier(domain),
    tags: toHealthcarePartyDtoTags(domain),
    codes: toHealthcarePartyDtoCodes(domain),
    name: toHealthcarePartyDtoName(domain),
    lastName: toHealthcarePartyDtoLastName(domain),
    firstName: toHealthcarePartyDtoFirstName(domain),
    names: toHealthcarePartyDtoNames(domain),
    gender: toHealthcarePartyDtoGender(domain),
    civility: toHealthcarePartyDtoCivility(domain),
    companyName: toHealthcarePartyDtoCompanyName(domain),
    speciality: toHealthcarePartyDtoSpeciality(domain),
    bankAccount: toHealthcarePartyDtoBankAccount(domain),
    bic: toHealthcarePartyDtoBic(domain),
    proxyBankAccount: toHealthcarePartyDtoProxyBankAccount(domain),
    proxyBic: toHealthcarePartyDtoProxyBic(domain),
    invoiceHeader: toHealthcarePartyDtoInvoiceHeader(domain),
    cbe: toHealthcarePartyDtoCbe(domain),
    ehp: toHealthcarePartyDtoEhp(domain),
    userId: toHealthcarePartyDtoUserId(domain),
    parentId: toHealthcarePartyDtoParentId(domain),
    convention: toHealthcarePartyDtoConvention(domain),
    nihii: toHealthcarePartyDtoNihii(domain),
    nihiiSpecCode: toHealthcarePartyDtoNihiiSpecCode(domain),
    ssin: toHealthcarePartyDtoSsin(domain),
    addresses: toHealthcarePartyDtoAddresses(domain),
    languages: toHealthcarePartyDtoLanguages(domain),
    picture: toHealthcarePartyDtoPicture(domain),
    statuses: toHealthcarePartyDtoStatuses(domain),
    statusHistory: toHealthcarePartyDtoStatusHistory(domain),
    specialityCodes: toHealthcarePartyDtoSpecialityCodes(domain),
    sendFormats: toHealthcarePartyDtoSendFormats(domain),
    notes: toHealthcarePartyDtoNotes(domain),
    financialInstitutionInformation: toHealthcarePartyDtoFinancialInstitutionInformation(domain),
    descr: toHealthcarePartyDtoDescr(domain),
    billingType: toHealthcarePartyDtoBillingType(domain),
    type: toHealthcarePartyDtoType(domain),
    contactPerson: toHealthcarePartyDtoContactPerson(domain),
    contactPersonHcpId: toHealthcarePartyDtoContactPersonHcpId(domain),
    supervisorId: toHealthcarePartyDtoSupervisorId(domain),
    flatRateTarifications: toHealthcarePartyDtoFlatRateTarifications(domain),
    importedData: toHealthcarePartyDtoImportedData(domain),
    options: toHealthcarePartyDtoOptions(domain),
    properties: toHealthcarePartyDtoProperties(domain),
    hcPartyKeys: toHealthcarePartyDtoHcPartyKeys(domain),
    aesExchangeKeys: toHealthcarePartyDtoAesExchangeKeys(domain),
    transferKeys: toHealthcarePartyDtoTransferKeys(domain),
    privateKeyShamirPartitions: toHealthcarePartyDtoPrivateKeyShamirPartitions(domain),
    publicKey: toHealthcarePartyDtoPublicKey(domain),
    publicKeysForOaepWithSha256: toHealthcarePartyDtoPublicKeysForOaepWithSha256(domain),
    })
}
