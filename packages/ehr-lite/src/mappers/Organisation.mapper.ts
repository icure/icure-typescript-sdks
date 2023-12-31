import { Organisation } from '../models/Organisation.model'
import { Location } from '../models/Location.model'
import {
    CodingReference,
    convertMapToObject,
    convertObjectToMap,
    filteringOutInternalTags,
    Identifier,
    mapCodeStubToCodingReference,
    mapCodingReferenceToCodeStub,
    mapIdentifierDtoToIdentifier,
    mapIdentifierToIdentifierDto,
    mapPropertyStubToProperty,
    mapPropertyToPropertyStub,
    mergeTagsWithInternalTags,
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
    ISO639_1,
    PersonNameDto,
    PropertyStub,
} from '@icure/typescript-common'
import { mapAddressToLocation, mapLocationToAddress } from './Location.mapper'
import { healthcareProfessionalIdentifiers } from './utils/HealthProfessional.utils'

function toHealthcarePartyId(domain: Organisation): string | undefined {
    return domain.id
}

function toHealthcarePartyRev(domain: Organisation): string | undefined {
    return domain.rev
}

function toHealthcarePartyCreated(domain: Organisation): number | undefined {
    return domain.created
}

function toHealthcarePartyModified(domain: Organisation): number | undefined {
    return domain.modified
}

function toHealthcarePartyDeletionDate(domain: Organisation): number | undefined {
    return domain.deletionDate
}

function toHealthcarePartyIdentifier(domain: Organisation): IdentifierDto[] | undefined {
    return !!domain.identifiers ? domain.identifiers.map(mapIdentifierToIdentifierDto) : undefined
}

function toHealthcarePartyTags(domain: Organisation): CodeStub[] | undefined {
    return mergeTagsWithInternalTags('organisation', domain.tags, domain.systemMetaData)
}

function toHealthcarePartyCodes(domain: Organisation): CodeStub[] | undefined {
    return !!domain.codes ? [...domain.codes].map(mapCodingReferenceToCodeStub) : undefined
}

function toHealthcarePartyName(domain: Organisation): string | undefined {
    return domain.name
}

function toHealthcarePartyLastName(domain: Organisation): string | undefined {
    return undefined
}

function toHealthcarePartyFirstName(domain: Organisation): string | undefined {
    return undefined
}

function toHealthcarePartyNames(domain: Organisation): PersonNameDto[] | undefined {
    return undefined
}

function toHealthcarePartyGender(domain: Organisation): HealthcarePartyDto.GenderEnum | undefined {
    return undefined
}

function toHealthcarePartyCivility(domain: Organisation): string | undefined {
    return undefined
}

function toHealthcarePartyCompanyName(domain: Organisation): string | undefined {
    return undefined
}

function toHealthcarePartySpeciality(domain: Organisation): string | undefined {
    return undefined
}

function toHealthcarePartyBankAccount(domain: Organisation): string | undefined {
    return undefined
}

function toHealthcarePartyBic(domain: Organisation): string | undefined {
    return undefined
}

function toHealthcarePartyProxyBankAccount(domain: Organisation): string | undefined {
    return undefined
}

function toHealthcarePartyProxyBic(domain: Organisation): string | undefined {
    return undefined
}

function toHealthcarePartyInvoiceHeader(domain: Organisation): string | undefined {
    return undefined
}

function toHealthcarePartyCbe(domain: Organisation): string | undefined {
    return undefined
}

function toHealthcarePartyEhp(domain: Organisation): string | undefined {
    return undefined
}

function toHealthcarePartyUserId(domain: Organisation): string | undefined {
    return domain.userId
}

function toHealthcarePartyParentId(domain: Organisation): string | undefined {
    return domain.parentId
}

function toHealthcarePartyConvention(domain: Organisation): number | undefined {
    return undefined
}

function toHealthcarePartyNihii(domain: Organisation): string | undefined {
    return undefined
}

function toHealthcarePartyNihiiSpecCode(domain: Organisation): string | undefined {
    return undefined
}

function toHealthcarePartySsin(domain: Organisation): string | undefined {
    return undefined
}

function toHealthcarePartyAddresses(domain: Organisation): AddressDto[] | undefined {
    return !!domain.addresses ? domain.addresses.map(mapLocationToAddress) : undefined
}

function toHealthcarePartyLanguages(domain: Organisation): string[] | undefined {
    return domain.languages
}

function toHealthcarePartyPicture(domain: Organisation): ArrayBuffer | undefined {
    return domain.picture
}

function toHealthcarePartyStatuses(domain: Organisation): HealthcarePartyDto.StatusesEnum[] | undefined {
    return undefined
}

function toHealthcarePartyStatusHistory(domain: Organisation): HealthcarePartyHistoryStatus[] | undefined {
    return undefined
}

function toHealthcarePartySpecialityCodes(domain: Organisation): CodeStub[] | undefined {
    return undefined
}

function toHealthcarePartySendFormats(domain: Organisation): { [key: string]: string } | undefined {
    return undefined
}

function toHealthcarePartyNotes(domain: Organisation): string | undefined {
    return undefined
}

function toHealthcarePartyFinancialInstitutionInformation(domain: Organisation): FinancialInstitutionInformation[] | undefined {
    return undefined
}

function toHealthcarePartyDescr(domain: Organisation): { [key: string]: string } | undefined {
    return !!domain.description ? convertMapToObject(domain.description) : undefined
}

function toHealthcarePartyBillingType(domain: Organisation): string | undefined {
    return undefined
}

function toHealthcarePartyType(domain: Organisation): string | undefined {
    return undefined
}

function toHealthcarePartyContactPerson(domain: Organisation): string | undefined {
    return undefined
}

function toHealthcarePartyContactPersonHcpId(domain: Organisation): string | undefined {
    return undefined
}

function toHealthcarePartySupervisorId(domain: Organisation): string | undefined {
    return undefined
}

function toHealthcarePartyFlatRateTarifications(domain: Organisation): FlatRateTarification[] | undefined {
    return undefined
}

function toHealthcarePartyImportedData(domain: Organisation): { [key: string]: string } | undefined {
    return undefined
}

function toHealthcarePartyOptions(domain: Organisation): { [key: string]: string } | undefined {
    return undefined
}

function toHealthcarePartyProperties(domain: Organisation): PropertyStub[] | undefined {
    return !!domain.properties ? [...domain.properties].map(mapPropertyToPropertyStub) : undefined
}

function toHealthcarePartyHcPartyKeys(domain: Organisation): { [key: string]: string[] } | undefined {
    return domain.systemMetaData ? toHcPartyKeys(domain.systemMetaData) : undefined
}

function toHealthcarePartyAesExchangeKeys(domain: Organisation):
    | {
          [key: string]: { [key: string]: { [key: string]: string } }
      }
    | undefined {
    return domain.systemMetaData ? toAesExchangeKeys(domain.systemMetaData) : undefined
}

function toHealthcarePartyTransferKeys(domain: Organisation):
    | {
          [key: string]: { [key: string]: string }
      }
    | undefined {
    return domain.systemMetaData ? toTransferKeys(domain.systemMetaData) : undefined
}

function toHealthcarePartyPrivateKeyShamirPartitions(domain: Organisation): { [key: string]: string } | undefined {
    return domain.systemMetaData ? toPrivateKeyShamirPartitions(domain.systemMetaData) : undefined
}

function toHealthcarePartyPublicKey(domain: Organisation): string | undefined {
    return domain.systemMetaData ? toPublicKey(domain.systemMetaData) : undefined
}

function toHealthcarePartyPublicKeysForOaepWithSha256(domain: Organisation): string[] | undefined {
    return domain.systemMetaData ? toPublicKeysForOaepWithSha256(domain.systemMetaData) : undefined
}

function toOrganisationId(dto: HealthcarePartyDto): string | undefined {
    return dto.id
}

function toOrganisationRev(dto: HealthcarePartyDto): string | undefined {
    return dto.rev
}

function toOrganisationCreated(dto: HealthcarePartyDto): number | undefined {
    return dto.created
}

function toOrganisationModified(dto: HealthcarePartyDto): number | undefined {
    return dto.modified
}

function toOrganisationIdentifiers(dto: HealthcarePartyDto): Identifier[] | undefined {
    const identifiers = healthcareProfessionalIdentifiers(dto)

    if (identifiers.length === 0) return undefined

    return identifiers.map(mapIdentifierDtoToIdentifier)
}

function toOrganisationTags(dto: HealthcarePartyDto): Set<CodingReference> | undefined {
    return filteringOutInternalTags('organisation', dto.tags)
}

function toOrganisationCodes(dto: HealthcarePartyDto): Set<CodingReference> | undefined {
    return !!dto.codes ? new Set(dto.codes.map(mapCodeStubToCodingReference)) : undefined
}

function toOrganisationDeletionDate(dto: HealthcarePartyDto): number | undefined {
    return dto.deletionDate
}

function toOrganisationName(dto: HealthcarePartyDto): string | undefined {
    return dto.name
}

function toOrganisationParentId(dto: HealthcarePartyDto): string | undefined {
    return dto.parentId
}

function toOrganisationUserId(dto: HealthcarePartyDto): string | undefined {
    return dto.userId
}

function toOrganisationAddresses(dto: HealthcarePartyDto): Location[] | undefined {
    return !!dto.addresses ? dto.addresses.map(mapAddressToLocation) : undefined
}

function toOrganisationLanguages(dto: HealthcarePartyDto): string[] | undefined {
    return dto.languages
}

function toOrganisationPicture(dto: HealthcarePartyDto): ArrayBuffer | undefined {
    return dto.picture
}

function toOrganisationDescription(dto: HealthcarePartyDto): Map<ISO639_1, string> | undefined {
    return !!dto.descr ? (convertObjectToMap(dto.descr) as Map<ISO639_1, string>) : undefined
}

function toOrganisationProperties(dto: HealthcarePartyDto): Set<Property> | undefined {
    return !!dto.properties ? new Set(dto.properties.map(mapPropertyStubToProperty)) : undefined
}

function toOrganisationSystemMetaData(dto: HealthcarePartyDto): SystemMetaDataOwner | undefined {
    return toSystemMetaDataOwner(dto)
}

export function mapHealthcarePartyToOrganisation(dto: HealthcarePartyDto): Organisation {
    return new Organisation({
        id: toOrganisationId(dto),
        rev: toOrganisationRev(dto),
        created: toOrganisationCreated(dto),
        modified: toOrganisationModified(dto),
        identifiers: toOrganisationIdentifiers(dto),
        tags: toOrganisationTags(dto),
        codes: toOrganisationCodes(dto),
        deletionDate: toOrganisationDeletionDate(dto),
        name: toOrganisationName(dto),
        parentId: toOrganisationParentId(dto),
        userId: toOrganisationUserId(dto),
        addresses: toOrganisationAddresses(dto),
        languages: toOrganisationLanguages(dto),
        picture: toOrganisationPicture(dto),
        description: toOrganisationDescription(dto),
        properties: toOrganisationProperties(dto),
        systemMetaData: toOrganisationSystemMetaData(dto),
    })
}

export function mapOrganisationToHealthcareParty(domain: Organisation): HealthcarePartyDto {
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
