import { Organisation } from '../models/Organisation.model'
import { Location } from '../models/Location.model'
import {
    AddressDto,
    CodeStub,
    CodingReference,
    convertMapToObject,
    convertObjectToMap,
    filteringOutInternalTags,
    FinancialInstitutionInformation,
    FlatRateTarification,
    HealthcarePartyDto,
    HealthcarePartyHistoryStatus,
    Identifier,
    IdentifierDto,
    ISO639_1,
    mapCodeStubToCodingReference,
    mapCodingReferenceToCodeStub,
    mapIdentifierDtoToIdentifier,
    mapIdentifierToIdentifierDto,
    mapPropertyStubToProperty,
    mapPropertyToPropertyStub,
    mergeTagsWithInternalTags,
    PersonNameDto,
    Property,
    PropertyStub,
    SystemMetaDataOwner,
    toAesExchangeKeys,
    toHcPartyKeys,
    toPrivateKeyShamirPartitions,
    toPublicKey,
    toPublicKeysForOaepWithSha256,
    toSystemMetaDataOwner,
    toTransferKeys,
} from '@icure/typescript-common'
import { mapAddressDtoToLocation, mapLocationToAddressDto } from './Location.mapper'
import { healthcareProfessionalIdentifiers } from './utils/HealthProfessional.utils'
import { b64_2ab, ua2b64 } from '@icure/api'

function toHealthcarePartyDtoId(domain: Organisation): string | undefined {
    return domain.id
}

function toHealthcarePartyDtoRev(domain: Organisation): string | undefined {
    return domain.rev
}

function toHealthcarePartyDtoCreated(domain: Organisation): number | undefined {
    return domain.created
}

function toHealthcarePartyDtoModified(domain: Organisation): number | undefined {
    return domain.modified
}

function toHealthcarePartyDtoDeletionDate(domain: Organisation): number | undefined {
    return domain.deletionDate
}

function toHealthcarePartyDtoIdentifier(domain: Organisation): IdentifierDto[] | undefined {
    return !!domain.identifiers ? domain.identifiers.map(mapIdentifierToIdentifierDto) : undefined
}

function toHealthcarePartyDtoTags(domain: Organisation): CodeStub[] | undefined {
    return mergeTagsWithInternalTags('organisation', domain.tags, domain.systemMetaData)
}

function toHealthcarePartyDtoCodes(domain: Organisation): CodeStub[] | undefined {
    return !!domain.codes ? [...domain.codes].map(mapCodingReferenceToCodeStub) : undefined
}

function toHealthcarePartyDtoName(domain: Organisation): string | undefined {
    return domain.name
}

function toHealthcarePartyDtoLastName(domain: Organisation): string | undefined {
    return undefined
}

function toHealthcarePartyDtoFirstName(domain: Organisation): string | undefined {
    return undefined
}

function toHealthcarePartyDtoNames(domain: Organisation): PersonNameDto[] | undefined {
    return undefined
}

function toHealthcarePartyDtoGender(domain: Organisation): HealthcarePartyDto.GenderEnum | undefined {
    return undefined
}

function toHealthcarePartyDtoCivility(domain: Organisation): string | undefined {
    return undefined
}

function toHealthcarePartyDtoCompanyName(domain: Organisation): string | undefined {
    return undefined
}

function toHealthcarePartyDtoSpeciality(domain: Organisation): string | undefined {
    return undefined
}

function toHealthcarePartyDtoBankAccount(domain: Organisation): string | undefined {
    return undefined
}

function toHealthcarePartyDtoBic(domain: Organisation): string | undefined {
    return undefined
}

function toHealthcarePartyDtoProxyBankAccount(domain: Organisation): string | undefined {
    return undefined
}

function toHealthcarePartyDtoProxyBic(domain: Organisation): string | undefined {
    return undefined
}

function toHealthcarePartyDtoInvoiceHeader(domain: Organisation): string | undefined {
    return undefined
}

function toHealthcarePartyDtoCbe(domain: Organisation): string | undefined {
    return undefined
}

function toHealthcarePartyDtoEhp(domain: Organisation): string | undefined {
    return undefined
}

function toHealthcarePartyDtoUserId(domain: Organisation): string | undefined {
    return domain.userId
}

function toHealthcarePartyDtoParentId(domain: Organisation): string | undefined {
    return domain.parentId
}

function toHealthcarePartyDtoConvention(domain: Organisation): number | undefined {
    return undefined
}

function toHealthcarePartyDtoNihii(domain: Organisation): string | undefined {
    return undefined
}

function toHealthcarePartyDtoNihiiSpecCode(domain: Organisation): string | undefined {
    return undefined
}

function toHealthcarePartyDtoSsin(domain: Organisation): string | undefined {
    return undefined
}

function toHealthcarePartyDtoAddresses(domain: Organisation): AddressDto[] | undefined {
    return !!domain.addresses ? domain.addresses.map(mapLocationToAddressDto) : undefined
}

function toHealthcarePartyDtoLanguages(domain: Organisation): string[] | undefined {
    return domain.languages
}

function toHealthcarePartyDtoPicture(domain: Organisation): ArrayBuffer | undefined {
    return domain.picture ? b64_2ab(domain.picture) : undefined
}

function toHealthcarePartyDtoStatuses(domain: Organisation): HealthcarePartyDto.StatusesEnum[] | undefined {
    return undefined
}

function toHealthcarePartyDtoStatusHistory(domain: Organisation): HealthcarePartyHistoryStatus[] | undefined {
    return undefined
}

function toHealthcarePartyDtoSpecialityCodes(domain: Organisation): CodeStub[] | undefined {
    return undefined
}

function toHealthcarePartyDtoSendFormats(domain: Organisation): { [key: string]: string } | undefined {
    return undefined
}

function toHealthcarePartyDtoNotes(domain: Organisation): string | undefined {
    return undefined
}

function toHealthcarePartyDtoFinancialInstitutionInformation(domain: Organisation): FinancialInstitutionInformation[] | undefined {
    return undefined
}

function toHealthcarePartyDtoDescr(domain: Organisation): { [key: string]: string } | undefined {
    return !!domain.description ? convertMapToObject(domain.description) : undefined
}

function toHealthcarePartyDtoBillingType(domain: Organisation): string | undefined {
    return undefined
}

function toHealthcarePartyDtoType(domain: Organisation): string | undefined {
    return undefined
}

function toHealthcarePartyDtoContactPerson(domain: Organisation): string | undefined {
    return undefined
}

function toHealthcarePartyDtoContactPersonHcpId(domain: Organisation): string | undefined {
    return undefined
}

function toHealthcarePartyDtoSupervisorId(domain: Organisation): string | undefined {
    return undefined
}

function toHealthcarePartyDtoFlatRateTarifications(domain: Organisation): FlatRateTarification[] | undefined {
    return undefined
}

function toHealthcarePartyDtoImportedData(domain: Organisation): { [key: string]: string } | undefined {
    return undefined
}

function toHealthcarePartyDtoOptions(domain: Organisation): { [key: string]: string } | undefined {
    return undefined
}

function toHealthcarePartyDtoProperties(domain: Organisation): PropertyStub[] | undefined {
    return !!domain.properties ? [...domain.properties].map(mapPropertyToPropertyStub) : undefined
}

function toHealthcarePartyDtoHcPartyKeys(domain: Organisation): { [key: string]: string[] } | undefined {
    return domain.systemMetaData ? toHcPartyKeys(domain.systemMetaData) : undefined
}

function toHealthcarePartyDtoAesExchangeKeys(domain: Organisation):
    | {
          [key: string]: { [key: string]: { [key: string]: string } }
      }
    | undefined {
    return domain.systemMetaData ? toAesExchangeKeys(domain.systemMetaData) : undefined
}

function toHealthcarePartyDtoTransferKeys(domain: Organisation):
    | {
          [key: string]: { [key: string]: string }
      }
    | undefined {
    return domain.systemMetaData ? toTransferKeys(domain.systemMetaData) : undefined
}

function toHealthcarePartyDtoPrivateKeyShamirPartitions(domain: Organisation): { [key: string]: string } | undefined {
    return domain.systemMetaData ? toPrivateKeyShamirPartitions(domain.systemMetaData) : undefined
}

function toHealthcarePartyDtoPublicKey(domain: Organisation): string | undefined {
    return domain.systemMetaData ? toPublicKey(domain.systemMetaData) : undefined
}

function toHealthcarePartyDtoPublicKeysForOaepWithSha256(domain: Organisation): string[] | undefined {
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

function toOrganisationTags(dto: HealthcarePartyDto): Array<CodingReference> | undefined {
    return filteringOutInternalTags('organisation', dto.tags)
}

function toOrganisationCodes(dto: HealthcarePartyDto): Array<CodingReference> | undefined {
    return !!dto.codes ? dto.codes.map(mapCodeStubToCodingReference) : undefined
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
    return !!dto.addresses ? dto.addresses.map(mapAddressDtoToLocation) : undefined
}

function toOrganisationLanguages(dto: HealthcarePartyDto): string[] | undefined {
    return dto.languages
}

function toOrganisationPicture(dto: HealthcarePartyDto): string | undefined {
    return dto.picture ? ua2b64(dto.picture) : undefined
}

function toOrganisationDescription(dto: HealthcarePartyDto): Partial<Record<ISO639_1, string>> | undefined {
    return !!dto.descr ? convertObjectToMap(dto.descr) : undefined
}

function toOrganisationProperties(dto: HealthcarePartyDto): Array<Property> | undefined {
    return !!dto.properties ? dto.properties.map(mapPropertyStubToProperty) : undefined
}

function toOrganisationSystemMetaData(dto: HealthcarePartyDto): SystemMetaDataOwner | undefined {
    return toSystemMetaDataOwner(dto)
}

export function mapHealthcarePartyDtoToOrganisation(dto: HealthcarePartyDto): Organisation {
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

export function mapOrganisationToHealthcarePartyDto(domain: Organisation): HealthcarePartyDto {
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
