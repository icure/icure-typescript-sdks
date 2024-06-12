import { Practitioner } from '../models/Practitioner.model'
import { HumanName } from '../models/HumanName.model'
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
import { mapHumanNameToPersonNameDto, mapPersonNameDtoToHumanName } from './HumanName.mapper'
import { mapAddressDtoToLocation, mapLocationToAddressDto } from './Location.mapper'
import { GenderEnum } from '../models/enums/Gender.enum'
import { healthcareProfessionalIdentifiers } from './utils/HealthProfessional.utils'
import { b64_2ab, ua2b64 } from '@icure/api'

function toHealthcarePartyDtoId(domain: Practitioner): string | undefined {
    return domain.id
}

function toHealthcarePartyDtoRev(domain: Practitioner): string | undefined {
    return domain.rev
}

function toHealthcarePartyDtoCreated(domain: Practitioner): number | undefined {
    return domain.created
}

function toHealthcarePartyDtoModified(domain: Practitioner): number | undefined {
    return domain.modified
}

function toHealthcarePartyDtoDeletionDate(domain: Practitioner): number | undefined {
    return domain.deletionDate
}

function toHealthcarePartyDtoIdentifier(domain: Practitioner): IdentifierDto[] | undefined {
    return !!domain.identifiers ? domain.identifiers.map(mapIdentifierToIdentifierDto) : undefined
}

function toHealthcarePartyDtoTags(domain: Practitioner): CodeStub[] | undefined {
    return mergeTagsWithInternalTags('practitioner', domain.tags, domain.systemMetaData)
}

function toHealthcarePartyDtoCodes(domain: Practitioner): CodeStub[] | undefined {
    return !!domain.codes ? [...domain.codes].map(mapCodingReferenceToCodeStub) : undefined
}

function toHealthcarePartyDtoName(domain: Practitioner): string | undefined {
    return domain.name
}

function toHealthcarePartyDtoLastName(domain: Practitioner): string | undefined {
    return domain.lastName
}

function toHealthcarePartyDtoFirstName(domain: Practitioner): string | undefined {
    return domain.firstName
}

function toHealthcarePartyDtoNames(domain: Practitioner): PersonNameDto[] | undefined {
    return !!domain.names ? domain.names.map(mapHumanNameToPersonNameDto) : undefined
}

function toHealthcarePartyDtoGender(domain: Practitioner): HealthcarePartyDto.GenderEnum | undefined {
    return domain.gender
}

function toHealthcarePartyDtoCivility(domain: Practitioner): string | undefined {
    return domain.civility
}

function toHealthcarePartyDtoCompanyName(domain: Practitioner): string | undefined {
    return undefined
}

function toHealthcarePartyDtoSpeciality(domain: Practitioner): string | undefined {
    return domain.speciality
}

function toHealthcarePartyDtoBankAccount(domain: Practitioner): string | undefined {
    return undefined
}

function toHealthcarePartyDtoBic(domain: Practitioner): string | undefined {
    return undefined
}

function toHealthcarePartyDtoProxyBankAccount(domain: Practitioner): string | undefined {
    return undefined
}

function toHealthcarePartyDtoProxyBic(domain: Practitioner): string | undefined {
    return undefined
}

function toHealthcarePartyDtoInvoiceHeader(domain: Practitioner): string | undefined {
    return undefined
}

function toHealthcarePartyDtoCbe(domain: Practitioner): string | undefined {
    return undefined
}

function toHealthcarePartyDtoEhp(domain: Practitioner): string | undefined {
    return undefined
}

function toHealthcarePartyDtoUserId(domain: Practitioner): string | undefined {
    return domain.userId
}

function toHealthcarePartyDtoParentId(domain: Practitioner): string | undefined {
    return domain.parentId
}

function toHealthcarePartyDtoConvention(domain: Practitioner): number | undefined {
    return undefined
}

function toHealthcarePartyDtoNihii(domain: Practitioner): string | undefined {
    return undefined
}

function toHealthcarePartyDtoNihiiSpecCode(domain: Practitioner): string | undefined {
    return undefined
}

function toHealthcarePartyDtoSsin(domain: Practitioner): string | undefined {
    return undefined
}

function toHealthcarePartyDtoAddresses(domain: Practitioner): AddressDto[] | undefined {
    return !!domain.addresses ? domain.addresses.map(mapLocationToAddressDto) : undefined
}

function toHealthcarePartyDtoLanguages(domain: Practitioner): string[] | undefined {
    return domain.languages
}

function toHealthcarePartyDtoPicture(domain: Practitioner): ArrayBuffer | undefined {
    return domain.picture ? b64_2ab(domain.picture) : undefined
}

function toHealthcarePartyDtoStatuses(domain: Practitioner): HealthcarePartyDto.StatusesEnum[] | undefined {
    return undefined
}

function toHealthcarePartyDtoStatusHistory(domain: Practitioner): HealthcarePartyHistoryStatus[] | undefined {
    return undefined
}

function toHealthcarePartyDtoSpecialityCodes(domain: Practitioner): CodeStub[] | undefined {
    return !!domain.specialityCodes ? [...domain.specialityCodes].map(mapCodingReferenceToCodeStub) : undefined
}

function toHealthcarePartyDtoSendFormats(domain: Practitioner): { [key: string]: string } | undefined {
    return undefined
}

function toHealthcarePartyDtoNotes(domain: Practitioner): string | undefined {
    return undefined
}

function toHealthcarePartyDtoFinancialInstitutionInformation(domain: Practitioner): FinancialInstitutionInformation[] | undefined {
    return undefined
}

function toHealthcarePartyDtoDescr(domain: Practitioner): { [key: string]: string } | undefined {
    return !!domain.description ? convertMapToObject(domain.description) : undefined
}

function toHealthcarePartyDtoBillingType(domain: Practitioner): string | undefined {
    return undefined
}

function toHealthcarePartyDtoType(domain: Practitioner): string | undefined {
    return undefined
}

function toHealthcarePartyDtoContactPerson(domain: Practitioner): string | undefined {
    return undefined
}

function toHealthcarePartyDtoContactPersonHcpId(domain: Practitioner): string | undefined {
    return undefined
}

function toHealthcarePartyDtoSupervisorId(domain: Practitioner): string | undefined {
    return undefined
}

function toHealthcarePartyDtoFlatRateTarifications(domain: Practitioner): FlatRateTarification[] | undefined {
    return undefined
}

function toHealthcarePartyDtoImportedData(domain: Practitioner): { [key: string]: string } | undefined {
    return undefined
}

function toHealthcarePartyDtoOptions(domain: Practitioner): { [key: string]: string } | undefined {
    return undefined
}

function toHealthcarePartyDtoProperties(domain: Practitioner): PropertyStub[] | undefined {
    return !!domain.properties ? [...domain.properties].map(mapPropertyToPropertyStub) : undefined
}

function toHealthcarePartyDtoHcPartyKeys(domain: Practitioner): { [key: string]: string[] } | undefined {
    return !!domain.systemMetaData ? toHcPartyKeys(domain.systemMetaData) : undefined
}

function toHealthcarePartyDtoAesExchangeKeys(domain: Practitioner):
    | {
          [key: string]: { [key: string]: { [key: string]: string } }
      }
    | undefined {
    return !!domain.systemMetaData ? toAesExchangeKeys(domain.systemMetaData) : undefined
}

function toHealthcarePartyDtoTransferKeys(domain: Practitioner):
    | {
          [key: string]: { [key: string]: string }
      }
    | undefined {
    return !!domain.systemMetaData ? toTransferKeys(domain.systemMetaData) : undefined
}

function toHealthcarePartyDtoPrivateKeyShamirPartitions(domain: Practitioner): { [key: string]: string } | undefined {
    return !!domain.systemMetaData ? toPrivateKeyShamirPartitions(domain.systemMetaData) : undefined
}

function toHealthcarePartyDtoPublicKey(domain: Practitioner): string | undefined {
    return !!domain.systemMetaData ? toPublicKey(domain.systemMetaData) : undefined
}

function toHealthcarePartyDtoPublicKeysForOaepWithSha256(domain: Practitioner): string[] | undefined {
    return !!domain.systemMetaData ? toPublicKeysForOaepWithSha256(domain.systemMetaData) : undefined
}

function toPractitionerId(dto: HealthcarePartyDto): string | undefined {
    return dto.id
}

function toPractitionerRev(dto: HealthcarePartyDto): string | undefined {
    return dto.rev
}

function toPractitionerCreated(dto: HealthcarePartyDto): number | undefined {
    return dto.created
}

function toPractitionerModified(dto: HealthcarePartyDto): number | undefined {
    return dto.modified
}

function toPractitionerIdentifiers(dto: HealthcarePartyDto): Identifier[] | undefined {
    const identifiers = healthcareProfessionalIdentifiers(dto)

    if (identifiers.length === 0) return undefined

    return identifiers.map(mapIdentifierDtoToIdentifier)
}

function toPractitionerTags(dto: HealthcarePartyDto): Array<CodingReference> | undefined {
    return filteringOutInternalTags('practitioner', dto.tags)
}

function toPractitionerCodes(dto: HealthcarePartyDto): Array<CodingReference> | undefined {
    return !!dto.codes ? dto.codes.map(mapCodeStubToCodingReference) : undefined
}

function toPractitionerDeletionDate(dto: HealthcarePartyDto): number | undefined {
    return dto.deletionDate
}

function toPractitionerName(dto: HealthcarePartyDto): string | undefined {
    return dto.name
}

function toPractitionerLastName(dto: HealthcarePartyDto): string | undefined {
    return dto.lastName
}

function toPractitionerFirstName(dto: HealthcarePartyDto): string | undefined {
    return dto.firstName
}

function toPractitionerNames(dto: HealthcarePartyDto): HumanName[] | undefined {
    return !!dto.names ? dto.names.map(mapPersonNameDtoToHumanName) : undefined
}

function toPractitionerGender(dto: HealthcarePartyDto): GenderEnum | undefined {
    return dto.gender as GenderEnum | undefined
}

function toPractitionerCivility(dto: HealthcarePartyDto): string | undefined {
    return dto.civility
}

function toPractitionerSpeciality(dto: HealthcarePartyDto): string | undefined {
    return dto.speciality
}

function toPractitionerParentId(dto: HealthcarePartyDto): string | undefined {
    return dto.parentId
}

function toPractitionerUserId(dto: HealthcarePartyDto): string | undefined {
    return dto.userId
}

function toPractitionerAddresses(dto: HealthcarePartyDto): Location[] | undefined {
    return !!dto.addresses ? dto.addresses.map(mapAddressDtoToLocation) : undefined
}

function toPractitionerLanguages(dto: HealthcarePartyDto): string[] | undefined {
    return dto.languages
}

function toPractitionerPicture(dto: HealthcarePartyDto): string | undefined {
    return dto.picture ? ua2b64(dto.picture) : undefined
}

function toPractitionerSpecialityCodes(dto: HealthcarePartyDto): Array<CodingReference> | undefined {
    return !!dto.specialityCodes ? dto.specialityCodes.map(mapCodeStubToCodingReference) : undefined
}

function toPractitionerDescription(dto: HealthcarePartyDto): Record<ISO639_1, string> | undefined {
    return !!dto.descr ? (convertObjectToMap(dto.descr) as Record<ISO639_1, string>) : undefined
}

function toPractitionerProperties(dto: HealthcarePartyDto): Array<Property> | undefined {
    return !!dto.properties ? dto.properties.map(mapPropertyStubToProperty) : undefined
}

function toPractitionerSystemMetaData(dto: HealthcarePartyDto): SystemMetaDataOwner | undefined {
    return toSystemMetaDataOwner(dto)
}

export function mapHealthcarePartyDtoToPractitioner(dto: HealthcarePartyDto): Practitioner {
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

export function mapPractitionerToHealthcarePartyDto(domain: Practitioner): HealthcarePartyDto {
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
