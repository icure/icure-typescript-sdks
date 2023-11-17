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

function toHealthcarePartyId(domain: HealthcareProfessional): string | undefined {
    return forceUuid(domain.id)
}

function toHealthcarePartyRev(domain: HealthcareProfessional): string | undefined {
    return domain.rev
}

function toHealthcarePartyCreated(domain: HealthcareProfessional): number | undefined {
    return domain.created
}

function toHealthcarePartyModified(domain: HealthcareProfessional): number | undefined {
    return domain.modified
}

function toHealthcarePartyDeletionDate(domain: HealthcareProfessional): number | undefined {
    return domain.deletionDate
}

function toHealthcarePartyIdentifier(domain: HealthcareProfessional): IdentifierDto[] | undefined {
    return undefined
}

function toHealthcarePartyTags(domain: HealthcareProfessional): CodeStub[] | undefined {
    return !!domain.labels ? [...domain.labels].map(mapCodingReferenceToCodeStub) : undefined
}

function toHealthcarePartyCodes(domain: HealthcareProfessional): CodeStub[] | undefined {
    return !!domain.codes ? [...domain.codes].map(mapCodingReferenceToCodeStub) : undefined
}

function toHealthcarePartyName(domain: HealthcareProfessional): string | undefined {
    return domain.name
}

function toHealthcarePartyLastName(domain: HealthcareProfessional): string | undefined {
    return domain.lastName
}

function toHealthcarePartyFirstName(domain: HealthcareProfessional): string | undefined {
    return domain.firstName
}

function toHealthcarePartyNames(domain: HealthcareProfessional): PersonNameDto[] | undefined {
    return !!domain.names ? [...domain.names].map(mapPersonNameToPersonNameDto) : undefined
}

function toHealthcarePartyGender(domain: HealthcareProfessional): HealthcarePartyDto.GenderEnum | undefined {
    return domain.gender
}

function toHealthcarePartyCivility(domain: HealthcareProfessional): string | undefined {
    return domain.civility
}

function toHealthcarePartyCompanyName(domain: HealthcareProfessional): string | undefined {
    return undefined
}

function toHealthcarePartySpeciality(domain: HealthcareProfessional): string | undefined {
    return domain.speciality
}

function toHealthcarePartyBankAccount(domain: HealthcareProfessional): string | undefined {
    return undefined
}

function toHealthcarePartyBic(domain: HealthcareProfessional): string | undefined {
    return undefined
}

function toHealthcarePartyProxyBankAccount(domain: HealthcareProfessional): string | undefined {
    return undefined
}

function toHealthcarePartyProxyBic(domain: HealthcareProfessional): string | undefined {
    return undefined
}

function toHealthcarePartyInvoiceHeader(domain: HealthcareProfessional): string | undefined {
    return undefined
}

function toHealthcarePartyCbe(domain: HealthcareProfessional): string | undefined {
    return undefined
}

function toHealthcarePartyEhp(domain: HealthcareProfessional): string | undefined {
    return undefined
}

function toHealthcarePartyUserId(domain: HealthcareProfessional): string | undefined {
    return undefined
}

function toHealthcarePartyParentId(domain: HealthcareProfessional): string | undefined {
    return domain.parentId
}

function toHealthcarePartyConvention(domain: HealthcareProfessional): number | undefined {
    return undefined
}

function toHealthcarePartyNihii(domain: HealthcareProfessional): string | undefined {
    return undefined
}

function toHealthcarePartyNihiiSpecCode(domain: HealthcareProfessional): string | undefined {
    return undefined
}

function toHealthcarePartySsin(domain: HealthcareProfessional): string | undefined {
    return undefined
}

function toHealthcarePartyAddresses(domain: HealthcareProfessional): AddressDto[] | undefined {
    return !!domain.addresses ? [...domain.addresses].map(mapAddressToAddressDto) : undefined
}

function toHealthcarePartyLanguages(domain: HealthcareProfessional): string[] | undefined {
    return domain.languages
}

function toHealthcarePartyPicture(domain: HealthcareProfessional): ArrayBuffer | undefined {
    return domain.picture
}

function toHealthcarePartyStatuses(domain: HealthcareProfessional): HealthcarePartyDto.StatusesEnum[] | undefined {
    return undefined
}

function toHealthcarePartyStatusHistory(domain: HealthcareProfessional): HealthcarePartyHistoryStatus[] | undefined {
    return undefined
}

function toHealthcarePartySpecialityCodes(domain: HealthcareProfessional): CodeStub[] | undefined {
    return undefined
}

function toHealthcarePartySendFormats(domain: HealthcareProfessional): { [key: string]: string } | undefined {
    return undefined
}

function toHealthcarePartyNotes(domain: HealthcareProfessional): string | undefined {
    return domain.notes
}

function toHealthcarePartyFinancialInstitutionInformation(domain: HealthcareProfessional): FinancialInstitutionInformation[] | undefined {
    return undefined
}

function toHealthcarePartyDescr(domain: HealthcareProfessional): { [key: string]: string } | undefined {
    return undefined
}

function toHealthcarePartyBillingType(domain: HealthcareProfessional): string | undefined {
    return undefined
}

function toHealthcarePartyType(domain: HealthcareProfessional): string | undefined {
    return undefined
}

function toHealthcarePartyContactPerson(domain: HealthcareProfessional): string | undefined {
    return undefined
}

function toHealthcarePartyContactPersonHcpId(domain: HealthcareProfessional): string | undefined {
    return undefined
}

function toHealthcarePartySupervisorId(domain: HealthcareProfessional): string | undefined {
    return undefined
}

function toHealthcarePartyFlatRateTarifications(domain: HealthcareProfessional): FlatRateTarification[] | undefined {
    return undefined
}

function toHealthcarePartyImportedData(domain: HealthcareProfessional): { [key: string]: string } | undefined {
    return undefined
}

function toHealthcarePartyOptions(domain: HealthcareProfessional): { [key: string]: string } | undefined {
    return undefined
}

function toHealthcarePartyProperties(domain: HealthcareProfessional): PropertyStub[] | undefined {
    return domain.properties ? [...domain.properties].map(mapPropertyToPropertyStub) : undefined
}

function toHealthcarePartyHcPartyKeys(domain: HealthcareProfessional): { [key: string]: string[] } | undefined {
    return !!domain.systemMetaData ? toHcPartyKeys(domain.systemMetaData) : undefined
}

function toHealthcarePartyAesExchangeKeys(domain: HealthcareProfessional):
    | {
          [key: string]: { [key: string]: { [key: string]: string } }
      }
    | undefined {
    return !!domain.systemMetaData ? toAesExchangeKeys(domain.systemMetaData) : undefined
}

function toHealthcarePartyTransferKeys(domain: HealthcareProfessional):
    | {
          [key: string]: { [key: string]: string }
      }
    | undefined {
    return !!domain.systemMetaData ? toTransferKeys(domain.systemMetaData) : undefined
}

function toHealthcarePartyPrivateKeyShamirPartitions(domain: HealthcareProfessional):
    | {
          [key: string]: string
      }
    | undefined {
    return !!domain.systemMetaData ? toPrivateKeyShamirPartitions(domain.systemMetaData) : undefined
}

function toHealthcarePartyPublicKey(domain: HealthcareProfessional): string | undefined {
    return !!domain.systemMetaData ? toPublicKey(domain.systemMetaData) : undefined
}

function toHealthcarePartyPublicKeysForOaepWithSha256(domain: HealthcareProfessional): string[] | undefined {
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

function toHealthcareProfessionalLabels(dto: HealthcarePartyDto): Set<CodingReference> {
    return dto.tags ? new Set(dto.tags.map(mapCodeStubToCodingReference)) : new Set()
}

function toHealthcareProfessionalCodes(dto: HealthcarePartyDto): Set<CodingReference> {
    return dto.codes ? new Set(dto.codes.map(mapCodeStubToCodingReference)) : new Set()
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

function toHealthcareProfessionalPicture(dto: HealthcarePartyDto): ArrayBuffer | undefined {
    return dto.picture
}

function toHealthcareProfessionalSpecialityCodes(dto: HealthcarePartyDto): Set<CodingReference> | undefined {
    return dto.specialityCodes ? new Set(dto.specialityCodes.map(mapCodeStubToCodingReference)) : undefined
}

function toHealthcareProfessionalNotes(dto: HealthcarePartyDto): string | undefined {
    return dto.notes
}

function toHealthcareProfessionalProperties(dto: HealthcarePartyDto): Set<Property> {
    return dto.properties ? new Set([...dto.properties].map(mapPropertyStubToProperty)) : new Set()
}

function toHealthcareProfessionalSystemMetaData(dto: HealthcarePartyDto): SystemMetaDataOwner | undefined {
    return toSystemMetaDataOwner(dto)
}

export function mapHealthcarePartyToHealthcareProfessional(dto: HealthcarePartyDto): HealthcareProfessional {
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

export function mapHealthcareProfessionalToHealthcareParty(domain: HealthcareProfessional): HealthcarePartyDto {
    return new HealthcarePartyDto({
        id: toHealthcarePartyId(domain),
        rev: toHealthcarePartyRev(domain),
        created: toHealthcarePartyCreated(domain),
        modified: toHealthcarePartyModified(domain),
        deletionDate: toHealthcarePartyDeletionDate(domain),
        identifier: toHealthcarePartyIdentifier(domain),
        tags: toHealthcarePartyTags(domain),
        codes: toHealthcarePartyCodes(domain),
        name: toHealthcarePartyName(domain),
        lastName: toHealthcarePartyLastName(domain),
        firstName: toHealthcarePartyFirstName(domain),
        names: toHealthcarePartyNames(domain),
        gender: toHealthcarePartyGender(domain),
        civility: toHealthcarePartyCivility(domain),
        companyName: toHealthcarePartyCompanyName(domain),
        speciality: toHealthcarePartySpeciality(domain),
        bankAccount: toHealthcarePartyBankAccount(domain),
        bic: toHealthcarePartyBic(domain),
        proxyBankAccount: toHealthcarePartyProxyBankAccount(domain),
        proxyBic: toHealthcarePartyProxyBic(domain),
        invoiceHeader: toHealthcarePartyInvoiceHeader(domain),
        cbe: toHealthcarePartyCbe(domain),
        ehp: toHealthcarePartyEhp(domain),
        userId: toHealthcarePartyUserId(domain),
        parentId: toHealthcarePartyParentId(domain),
        convention: toHealthcarePartyConvention(domain),
        nihii: toHealthcarePartyNihii(domain),
        nihiiSpecCode: toHealthcarePartyNihiiSpecCode(domain),
        ssin: toHealthcarePartySsin(domain),
        addresses: toHealthcarePartyAddresses(domain),
        languages: toHealthcarePartyLanguages(domain),
        picture: toHealthcarePartyPicture(domain),
        statuses: toHealthcarePartyStatuses(domain),
        statusHistory: toHealthcarePartyStatusHistory(domain),
        specialityCodes: toHealthcarePartySpecialityCodes(domain),
        sendFormats: toHealthcarePartySendFormats(domain),
        notes: toHealthcarePartyNotes(domain),
        financialInstitutionInformation: toHealthcarePartyFinancialInstitutionInformation(domain),
        descr: toHealthcarePartyDescr(domain),
        billingType: toHealthcarePartyBillingType(domain),
        type: toHealthcarePartyType(domain),
        contactPerson: toHealthcarePartyContactPerson(domain),
        contactPersonHcpId: toHealthcarePartyContactPersonHcpId(domain),
        supervisorId: toHealthcarePartySupervisorId(domain),
        flatRateTarifications: toHealthcarePartyFlatRateTarifications(domain),
        importedData: toHealthcarePartyImportedData(domain),
        options: toHealthcarePartyOptions(domain),
        properties: toHealthcarePartyProperties(domain),
        hcPartyKeys: toHealthcarePartyHcPartyKeys(domain),
        aesExchangeKeys: toHealthcarePartyAesExchangeKeys(domain),
        transferKeys: toHealthcarePartyTransferKeys(domain),
        privateKeyShamirPartitions: toHealthcarePartyPrivateKeyShamirPartitions(domain),
        publicKey: toHealthcarePartyPublicKey(domain),
        publicKeysForOaepWithSha256: toHealthcarePartyPublicKeysForOaepWithSha256(domain),
    })
}
