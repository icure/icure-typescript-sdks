import { Practitioner } from '../models/Practitioner.model'
import { Address, CodeStub, FinancialInstitutionInformation, FlatRateTarification, HealthcareParty, HealthcarePartyHistoryStatus, Identifier as IdentifierDto, PersonName, PropertyStub } from '@icure/api'
import { HumanName } from '../models/HumanName.model'
import { Location } from '../models/Location.model'
import {
    CodingReference,
    convertMapToObject,
    convertObjectToMap,
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
    toPrivateKeyShamirPartitions,
    toPublicKey,
    toPublicKeysForOaepWithSha256,
    toTransferKeys,
} from '@icure/typescript-common'
import { mapHumanNameToPersonName, mapPersonNameToHumanName } from './HumanName.mapper'
import { mapAddressToLocation, mapLocationToAddress } from './Location.mapper'
import { GenderEnum } from '../models/enums/Gender.enum'
import { healthcareProfessionalIdentifiers } from './utils/HealthProfessional.utils'
import { toHcPartyKeys, toSystemMetaDataOwner } from '@icure/typescript-common/dist/mappers/SystemMetaData.mapper'

function toHealthcarePartyId(domain: Practitioner): string | undefined {
    return domain.id
}

function toHealthcarePartyRev(domain: Practitioner): string | undefined {
    return domain.rev
}

function toHealthcarePartyCreated(domain: Practitioner): number | undefined {
    return domain.created
}

function toHealthcarePartyModified(domain: Practitioner): number | undefined {
    return domain.modified
}

function toHealthcarePartyDeletionDate(domain: Practitioner): number | undefined {
    return domain.deletionDate
}

function toHealthcarePartyIdentifier(domain: Practitioner): IdentifierDto[] | undefined {
    return !!domain.identifiers ? domain.identifiers.map(mapIdentifierToIdentifierDto) : undefined
}

function toHealthcarePartyTags(domain: Practitioner): CodeStub[] | undefined {
    return !!domain.tags ? domain.tags.map(mapCodingReferenceToCodeStub) : undefined
}

function toHealthcarePartyCodes(domain: Practitioner): CodeStub[] | undefined {
    return !!domain.codes ? domain.codes.map(mapCodingReferenceToCodeStub) : undefined
}

function toHealthcarePartyName(domain: Practitioner): string | undefined {
    return domain.name
}

function toHealthcarePartyLastName(domain: Practitioner): string | undefined {
    return domain.lastName
}

function toHealthcarePartyFirstName(domain: Practitioner): string | undefined {
    return domain.firstName
}

function toHealthcarePartyNames(domain: Practitioner): PersonName[] | undefined {
    return !!domain.names ? domain.names.map(mapHumanNameToPersonName) : undefined
}

function toHealthcarePartyGender(domain: Practitioner): HealthcareParty.GenderEnum | undefined {
    return domain.gender
}

function toHealthcarePartyCivility(domain: Practitioner): string | undefined {
    return domain.civility
}

function toHealthcarePartyCompanyName(domain: Practitioner): string | undefined {
    return undefined
}

function toHealthcarePartySpeciality(domain: Practitioner): string | undefined {
    return domain.speciality
}

function toHealthcarePartyBankAccount(domain: Practitioner): string | undefined {
    return undefined
}

function toHealthcarePartyBic(domain: Practitioner): string | undefined {
    return undefined
}

function toHealthcarePartyProxyBankAccount(domain: Practitioner): string | undefined {
    return undefined
}

function toHealthcarePartyProxyBic(domain: Practitioner): string | undefined {
    return undefined
}

function toHealthcarePartyInvoiceHeader(domain: Practitioner): string | undefined {
    return undefined
}

function toHealthcarePartyCbe(domain: Practitioner): string | undefined {
    return undefined
}

function toHealthcarePartyEhp(domain: Practitioner): string | undefined {
    return undefined
}

function toHealthcarePartyUserId(domain: Practitioner): string | undefined {
    return domain.userId
}

function toHealthcarePartyParentId(domain: Practitioner): string | undefined {
    return domain.parentId
}

function toHealthcarePartyConvention(domain: Practitioner): number | undefined {
    return undefined
}

function toHealthcarePartyNihii(domain: Practitioner): string | undefined {
    return undefined
}

function toHealthcarePartyNihiiSpecCode(domain: Practitioner): string | undefined {
    return undefined
}

function toHealthcarePartySsin(domain: Practitioner): string | undefined {
    return undefined
}

function toHealthcarePartyAddresses(domain: Practitioner): Address[] | undefined {
    return !!domain.addresses ? domain.addresses.map(mapLocationToAddress) : undefined
}

function toHealthcarePartyLanguages(domain: Practitioner): string[] | undefined {
    return domain.languages
}

function toHealthcarePartyPicture(domain: Practitioner): ArrayBuffer | undefined {
    return domain.picture
}

function toHealthcarePartyStatuses(domain: Practitioner): HealthcareParty.StatusesEnum[] | undefined {
    return undefined
}

function toHealthcarePartyStatusHistory(domain: Practitioner): HealthcarePartyHistoryStatus[] | undefined {
    return undefined
}

function toHealthcarePartySpecialityCodes(domain: Practitioner): CodeStub[] | undefined {
    return !!domain.specialityCodes ? domain.specialityCodes.map(mapCodingReferenceToCodeStub) : undefined
}

function toHealthcarePartySendFormats(domain: Practitioner): { [key: string]: string } | undefined {
    return undefined
}

function toHealthcarePartyNotes(domain: Practitioner): string | undefined {
    return undefined
}

function toHealthcarePartyFinancialInstitutionInformation(domain: Practitioner): FinancialInstitutionInformation[] | undefined {
    return undefined
}

function toHealthcarePartyDescr(domain: Practitioner): { [key: string]: string } | undefined {
    return !!domain.description ? convertMapToObject(domain.description) : undefined
}

function toHealthcarePartyBillingType(domain: Practitioner): string | undefined {
    return undefined
}

function toHealthcarePartyType(domain: Practitioner): string | undefined {
    return undefined
}

function toHealthcarePartyContactPerson(domain: Practitioner): string | undefined {
    return undefined
}

function toHealthcarePartyContactPersonHcpId(domain: Practitioner): string | undefined {
    return undefined
}

function toHealthcarePartySupervisorId(domain: Practitioner): string | undefined {
    return undefined
}

function toHealthcarePartyFlatRateTarifications(domain: Practitioner): FlatRateTarification[] | undefined {
    return undefined
}

function toHealthcarePartyImportedData(domain: Practitioner): { [key: string]: string } | undefined {
    return undefined
}

function toHealthcarePartyOptions(domain: Practitioner): { [key: string]: string } | undefined {
    return undefined
}

function toHealthcarePartyProperties(domain: Practitioner): PropertyStub[] | undefined {
    return !!domain.properties ? domain.properties.map(mapPropertyToPropertyStub) : undefined
}

function toHealthcarePartyHcPartyKeys(domain: Practitioner): { [key: string]: string[] } | undefined {
    return !!domain.systemMetaData ? toHcPartyKeys(domain.systemMetaData) : undefined
}

function toHealthcarePartyAesExchangeKeys(domain: Practitioner):
    | {
          [key: string]: { [key: string]: { [key: string]: string } }
      }
    | undefined {
    return !!domain.systemMetaData ? toAesExchangeKeys(domain.systemMetaData) : undefined
}

function toHealthcarePartyTransferKeys(domain: Practitioner):
    | {
          [key: string]: { [key: string]: string }
      }
    | undefined {
    return !!domain.systemMetaData ? toTransferKeys(domain.systemMetaData) : undefined
}

function toHealthcarePartyPrivateKeyShamirPartitions(domain: Practitioner): { [key: string]: string } | undefined {
    return !!domain.systemMetaData ? toPrivateKeyShamirPartitions(domain.systemMetaData) : undefined
}

function toHealthcarePartyPublicKey(domain: Practitioner): string | undefined {
    return !!domain.systemMetaData ? toPublicKey(domain.systemMetaData) : undefined
}

function toHealthcarePartyPublicKeysForOaepWithSha256(domain: Practitioner): string[] | undefined {
    return !!domain.systemMetaData ? toPublicKeysForOaepWithSha256(domain.systemMetaData) : undefined
}

function toPractitionerId(dto: HealthcareParty): string | undefined {
    return dto.id
}

function toPractitionerRev(dto: HealthcareParty): string | undefined {
    return dto.rev
}

function toPractitionerCreated(dto: HealthcareParty): number | undefined {
    return dto.created
}

function toPractitionerModified(dto: HealthcareParty): number | undefined {
    return dto.modified
}

function toPractitionerIdentifiers(dto: HealthcareParty): Identifier[] | undefined {
    const identifiers = healthcareProfessionalIdentifiers(dto)

    if (identifiers.length === 0) return undefined

    return identifiers.map(mapIdentifierDtoToIdentifier)
}

function toPractitionerTags(dto: HealthcareParty): CodingReference[] | undefined {
    return !!dto.tags ? dto.tags.map(mapCodeStubToCodingReference) : undefined
}

function toPractitionerCodes(dto: HealthcareParty): CodingReference[] | undefined {
    return !!dto.codes ? dto.codes.map(mapCodeStubToCodingReference) : undefined
}

function toPractitionerDeletionDate(dto: HealthcareParty): number | undefined {
    return dto.deletionDate
}

function toPractitionerName(dto: HealthcareParty): string | undefined {
    return dto.name
}

function toPractitionerLastName(dto: HealthcareParty): string | undefined {
    return dto.lastName
}

function toPractitionerFirstName(dto: HealthcareParty): string | undefined {
    return dto.firstName
}

function toPractitionerNames(dto: HealthcareParty): HumanName[] | undefined {
    return !!dto.names ? dto.names.map(mapPersonNameToHumanName) : undefined
}

function toPractitionerGender(dto: HealthcareParty): GenderEnum | undefined {
    return dto.gender as GenderEnum | undefined
}

function toPractitionerCivility(dto: HealthcareParty): string | undefined {
    return dto.civility
}

function toPractitionerSpeciality(dto: HealthcareParty): string | undefined {
    return dto.speciality
}

function toPractitionerParentId(dto: HealthcareParty): string | undefined {
    return dto.parentId
}

function toPractitionerUserId(dto: HealthcareParty): string | undefined {
    return dto.userId
}

function toPractitionerAddresses(dto: HealthcareParty): Location[] | undefined {
    return !!dto.addresses ? dto.addresses.map(mapAddressToLocation) : undefined
}

function toPractitionerLanguages(dto: HealthcareParty): string[] | undefined {
    return dto.languages
}

function toPractitionerPicture(dto: HealthcareParty): ArrayBuffer | undefined {
    return dto.picture
}

function toPractitionerSpecialityCodes(dto: HealthcareParty): CodingReference[] | undefined {
    return !!dto.specialityCodes ? dto.specialityCodes.map(mapCodeStubToCodingReference) : undefined
}

function toPractitionerDescription(dto: HealthcareParty): Map<string, string> | undefined {
    return !!dto.descr ? convertObjectToMap(dto.descr) : undefined
}

function toPractitionerProperties(dto: HealthcareParty): Property[] | undefined {
    return !!dto.properties ? dto.properties.map(mapPropertyStubToProperty) : undefined
}

function toPractitionerSystemMetaData(dto: HealthcareParty): SystemMetaDataOwner | undefined {
    return toSystemMetaDataOwner(dto)
}

export function mapHealthcarePartyToPractitioner(dto: HealthcareParty): Practitioner {
    return new Practitioner({
        id: toPractitionerId(dto),
        rev: toPractitionerRev(dto),
        created: toPractitionerCreated(dto),
        modified: toPractitionerModified(dto),
        identifiers: toPractitionerIdentifiers(dto),
        tags: toPractitionerTags(dto),
        codes: toPractitionerCodes(dto),
        deletionDate: toPractitionerDeletionDate(dto),
        name: toPractitionerName(dto),
        lastName: toPractitionerLastName(dto),
        firstName: toPractitionerFirstName(dto),
        names: toPractitionerNames(dto),
        gender: toPractitionerGender(dto),
        civility: toPractitionerCivility(dto),
        speciality: toPractitionerSpeciality(dto),
        parentId: toPractitionerParentId(dto),
        userId: toPractitionerUserId(dto),
        addresses: toPractitionerAddresses(dto),
        languages: toPractitionerLanguages(dto),
        picture: toPractitionerPicture(dto),
        specialityCodes: toPractitionerSpecialityCodes(dto),
        description: toPractitionerDescription(dto),
        properties: toPractitionerProperties(dto),
        systemMetaData: toPractitionerSystemMetaData(dto),
    })
}

export function mapPractitionerToHealthcareParty(domain: Practitioner): HealthcareParty {
    return new HealthcareParty({
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
