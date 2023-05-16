import { Practitioner } from '../models/Practitioner.model'
import { Address, CodeStub, HealthcareParty, Identifier as IdentifierEntity, PersonName, PropertyStub } from '@icure/api'
import { createMap, forMember, ignore, mapFrom, mapWith } from '@automapper/core'
import { mapper } from './mapper'
import { Identifier } from '../models/Identifier.model'
import { CodingReference } from '../models/CodingReference.model'
import { HumanName } from '../models/HumanName.model'
import { Location } from '../models/Location.model'
import { Property } from '../models/Property.model'
import {
    convertDeepNestedMapToObject,
    convertMapToObject,
    convertNestedMapToObject,
    convertObjectToDeepNestedMap,
    convertObjectToMap,
    convertObjectToNestedMap,
    extractAesExchangeKeys,
    extractHcPartyKeys,
    extractPrivateKeyShamirPartitions,
    extractPublicKey,
    extractTransferKeys,
} from './utils/Metadata.utils'
import { SystemMetaDataOwner } from '../models/SystemMetaDataOwner.model'
import { healthcareProfessionalIdentifiers } from './utils/HealthProfessional.utils'

function forMember_HealthcareParty_id() {
    return forMember<Practitioner, HealthcareParty>(
        (v) => v.id,
        mapFrom((p) => p.id)
    )
}

function forMember_HealthcareParty_rev() {
    return forMember<Practitioner, HealthcareParty>(
        (v) => v.rev,
        mapFrom((p) => p.rev)
    )
}

function forMember_HealthcareParty_created() {
    return forMember<Practitioner, HealthcareParty>(
        (v) => v.created,
        mapFrom((p) => p.created)
    )
}

function forMember_HealthcareParty_modified() {
    return forMember<Practitioner, HealthcareParty>(
        (v) => v.modified,
        mapFrom((p) => p.modified)
    )
}

function forMember_HealthcareParty_deletionDate() {
    return forMember<Practitioner, HealthcareParty>(
        (v) => v.deletionDate,
        mapFrom((p) => p.deletionDate)
    )
}

function forMember_HealthcareParty_identifier() {
    return forMember<Practitioner, HealthcareParty>(
        (v) => v.identifier,
        mapWith(IdentifierEntity, Identifier, (p) => p.identifiers)
    )
}

function forMember_HealthcareParty_tags() {
    return forMember<Practitioner, HealthcareParty>(
        (v) => v.tags,
        mapWith(CodeStub, CodingReference, (p) => p.tags)
    )
}

function forMember_HealthcareParty_codes() {
    return forMember<Practitioner, HealthcareParty>(
        (v) => v.codes,
        mapWith(CodeStub, CodingReference, (p) => p.codes)
    )
}

function forMember_HealthcareParty_name() {
    return forMember<Practitioner, HealthcareParty>(
        (v) => v.name,
        mapFrom((p) => p.name)
    )
}

function forMember_HealthcareParty_lastName() {
    return forMember<Practitioner, HealthcareParty>(
        (v) => v.lastName,
        mapFrom((p) => p.lastName)
    )
}

function forMember_HealthcareParty_firstName() {
    return forMember<Practitioner, HealthcareParty>(
        (v) => v.firstName,
        mapFrom((p) => p.firstName)
    )
}

function forMember_HealthcareParty_names() {
    return forMember<Practitioner, HealthcareParty>(
        (v) => v.names,
        mapWith(PersonName, HumanName, (p) => p.names)
    )
}

function forMember_HealthcareParty_gender() {
    return forMember<Practitioner, HealthcareParty>(
        (v) => v.gender,
        mapFrom((p) => p.gender)
    )
}

function forMember_HealthcareParty_civility() {
    return forMember<Practitioner, HealthcareParty>(
        (v) => v.civility,
        mapFrom((p) => p.civility)
    )
}

function forMember_HealthcareParty_companyName() {
    return forMember<Practitioner, HealthcareParty>((v) => v.companyName, ignore())
}

function forMember_HealthcareParty_speciality() {
    return forMember<Practitioner, HealthcareParty>(
        (v) => v.speciality,
        mapFrom((p) => p.speciality)
    )
}

function forMember_HealthcareParty_bankAccount() {
    return forMember<Practitioner, HealthcareParty>((v) => v.bankAccount, ignore())
}

function forMember_HealthcareParty_bic() {
    return forMember<Practitioner, HealthcareParty>((v) => v.bic, ignore())
}

function forMember_HealthcareParty_proxyBankAccount() {
    return forMember<Practitioner, HealthcareParty>((v) => v.proxyBankAccount, ignore())
}

function forMember_HealthcareParty_proxyBic() {
    return forMember<Practitioner, HealthcareParty>((v) => v.proxyBic, ignore())
}

function forMember_HealthcareParty_invoiceHeader() {
    return forMember<Practitioner, HealthcareParty>((v) => v.invoiceHeader, ignore())
}

function forMember_HealthcareParty_cbe() {
    return forMember<Practitioner, HealthcareParty>((v) => v.cbe, ignore())
}

function forMember_HealthcareParty_ehp() {
    return forMember<Practitioner, HealthcareParty>((v) => v.ehp, ignore())
}

function forMember_HealthcareParty_userId() {
    return forMember<Practitioner, HealthcareParty>(
        (v) => v.userId,
        mapFrom((p) => p.userId)
    )
}

function forMember_HealthcareParty_parentId() {
    return forMember<Practitioner, HealthcareParty>(
        (v) => v.parentId,
        mapFrom((p) => p.parentId)
    )
}

function forMember_HealthcareParty_convention() {
    return forMember<Practitioner, HealthcareParty>((v) => v.convention, ignore())
}

function forMember_HealthcareParty_nihii() {
    return forMember<Practitioner, HealthcareParty>((v) => v.nihii, ignore())
}

function forMember_HealthcareParty_nihiiSpecCode() {
    return forMember<Practitioner, HealthcareParty>((v) => v.nihiiSpecCode, ignore())
}

function forMember_HealthcareParty_ssin() {
    return forMember<Practitioner, HealthcareParty>((v) => v.ssin, ignore())
}

function forMember_HealthcareParty_addresses() {
    return forMember<Practitioner, HealthcareParty>(
        (v) => v.addresses,
        mapWith(Address, Location, (p) => p.addresses)
    )
}

function forMember_HealthcareParty_languages() {
    return forMember<Practitioner, HealthcareParty>(
        (v) => v.languages,
        mapFrom((p) => p.languages)
    )
}

function forMember_HealthcareParty_picture() {
    return forMember<Practitioner, HealthcareParty>(
        (v) => v.picture,
        mapFrom((p) => p.picture)
    )
}

function forMember_HealthcareParty_statuses() {
    return forMember<Practitioner, HealthcareParty>((v) => v.statuses, ignore())
}

function forMember_HealthcareParty_statusHistory() {
    return forMember<Practitioner, HealthcareParty>((v) => v.statusHistory, ignore())
}

function forMember_HealthcareParty_specialityCodes() {
    return forMember<Practitioner, HealthcareParty>(
        (v) => v.specialityCodes,
        mapWith(CodeStub, CodingReference, (p) => p.specialityCodes)
    )
}

function forMember_HealthcareParty_sendFormats() {
    return forMember<Practitioner, HealthcareParty>((v) => v.sendFormats, ignore())
}

function forMember_HealthcareParty_notes() {
    return forMember<Practitioner, HealthcareParty>((v) => v.notes, ignore())
}

function forMember_HealthcareParty_financialInstitutionInformation() {
    return forMember<Practitioner, HealthcareParty>((v) => v.financialInstitutionInformation, ignore())
}

function forMember_HealthcareParty_descr() {
    return forMember<Practitioner, HealthcareParty>(
        (v) => v.descr,
        mapFrom((p) => p.description)
    )
}

function forMember_HealthcareParty_billingType() {
    return forMember<Practitioner, HealthcareParty>((v) => v.billingType, ignore())
}

function forMember_HealthcareParty_type() {
    return forMember<Practitioner, HealthcareParty>((v) => v.type, ignore())
}

function forMember_HealthcareParty_contactPerson() {
    return forMember<Practitioner, HealthcareParty>((v) => v.contactPerson, ignore())
}

function forMember_HealthcareParty_contactPersonHcpId() {
    return forMember<Practitioner, HealthcareParty>((v) => v.contactPersonHcpId, ignore())
}

function forMember_HealthcareParty_supervisorId() {
    return forMember<Practitioner, HealthcareParty>((v) => v.supervisorId, ignore())
}

function forMember_HealthcareParty_flatRateTarifications() {
    return forMember<Practitioner, HealthcareParty>((v) => v.flatRateTarifications, ignore())
}

function forMember_HealthcareParty_importedData() {
    return forMember<Practitioner, HealthcareParty>((v) => v.importedData, ignore())
}

function forMember_HealthcareParty_options() {
    return forMember<Practitioner, HealthcareParty>((v) => v.options, ignore())
}

function forMember_HealthcareParty_properties() {
    return forMember<Practitioner, HealthcareParty>(
        (v) => v.properties,
        mapWith(PropertyStub, Property, (p) => p.properties)
    )
}

function forMember_HealthcareParty_hcPartyKeys() {
    return forMember<Practitioner, HealthcareParty>(
        (v) => v.hcPartyKeys,
        mapFrom((p) => Object.fromEntries(extractHcPartyKeys(p.systemMetaData)?.entries() ?? []))
    )
}

function forMember_HealthcareParty_aesExchangeKeys() {
    return forMember<Practitioner, HealthcareParty>(
        (v) => v.aesExchangeKeys,
        mapFrom((p) => {
            const aesExchangeKeys = extractAesExchangeKeys(p.systemMetaData)
            return !!aesExchangeKeys ? convertDeepNestedMapToObject(aesExchangeKeys) : undefined
        })
    )
}

function forMember_HealthcareParty_transferKeys() {
    return forMember<Practitioner, HealthcareParty>(
        (v) => v.transferKeys,
        mapFrom((p) => {
            const transferKeys = extractTransferKeys(p.systemMetaData)
            return !!transferKeys ? convertNestedMapToObject(transferKeys) : undefined
        })
    )
}

function forMember_HealthcareParty_privateKeyShamirPartitions() {
    return forMember<Practitioner, HealthcareParty>(
        (v) => v.privateKeyShamirPartitions,
        mapFrom((p) => {
            const privateKeyShamirPartitions = extractPrivateKeyShamirPartitions(p.systemMetaData)
            return !!privateKeyShamirPartitions ? convertMapToObject(privateKeyShamirPartitions) : undefined
        })
    )
}

function forMember_HealthcareParty_publicKey() {
    return forMember<Practitioner, HealthcareParty>(
        (v) => v.publicKey,
        mapFrom((p) => extractPublicKey(p.systemMetaData))
    )
}

function forMember_Practitioner_id() {
    return forMember<HealthcareParty, Practitioner>(
        (v) => v.id,
        mapFrom((h) => h.id)
    )
}

function forMember_Practitioner_rev() {
    return forMember<HealthcareParty, Practitioner>(
        (v) => v.rev,
        mapFrom((h) => h.rev)
    )
}

function forMember_Practitioner_created() {
    return forMember<HealthcareParty, Practitioner>(
        (v) => v.created,
        mapFrom((h) => h.created)
    )
}

function forMember_Practitioner_modified() {
    return forMember<HealthcareParty, Practitioner>(
        (v) => v.modified,
        mapFrom((h) => h.modified)
    )
}

function forMember_Practitioner_tags() {
    return forMember<HealthcareParty, Practitioner>(
        (v) => v.tags,
        mapWith(CodingReference, CodeStub, (h) => h.tags)
    )
}

function forMember_Practitioner_codes() {
    return forMember<HealthcareParty, Practitioner>(
        (v) => v.codes,
        mapWith(CodingReference, CodeStub, (h) => h.codes)
    )
}

function forMember_Practitioner_deletionDate() {
    return forMember<HealthcareParty, Practitioner>(
        (v) => v.deletionDate,
        mapFrom((h) => h.deletionDate)
    )
}

function forMember_Practitioner_name() {
    return forMember<HealthcareParty, Practitioner>(
        (v) => v.name,
        mapFrom((h) => h.name)
    )
}

function forMember_Practitioner_lastName() {
    return forMember<HealthcareParty, Practitioner>(
        (v) => v.lastName,
        mapFrom((h) => h.lastName)
    )
}

function forMember_Practitioner_firstName() {
    return forMember<HealthcareParty, Practitioner>(
        (v) => v.firstName,
        mapFrom((h) => h.firstName)
    )
}

function forMember_Practitioner_names() {
    return forMember<HealthcareParty, Practitioner>(
        (v) => v.names,
        mapWith(HumanName, PersonName, (h) => h.names)
    )
}

function forMember_Practitioner_gender() {
    return forMember<HealthcareParty, Practitioner>(
        (v) => v.gender,
        mapFrom((h) => h.gender)
    )
}

function forMember_Practitioner_civility() {
    return forMember<HealthcareParty, Practitioner>(
        (v) => v.civility,
        mapFrom((h) => h.civility)
    )
}

function forMember_Practitioner_speciality() {
    return forMember<HealthcareParty, Practitioner>(
        (v) => v.speciality,
        mapFrom((h) => h.speciality)
    )
}

function forMember_Practitioner_parentId() {
    return forMember<HealthcareParty, Practitioner>(
        (v) => v.parentId,
        mapFrom((h) => h.parentId)
    )
}

function forMember_Practitioner_addresses() {
    return forMember<HealthcareParty, Practitioner>(
        (v) => v.addresses,
        mapWith(Location, Address, (h) => h.addresses)
    )
}

function forMember_Practitioner_languages() {
    return forMember<HealthcareParty, Practitioner>(
        (v) => v.languages,
        mapFrom((h) => h.languages)
    )
}

function forMember_Practitioner_picture() {
    return forMember<HealthcareParty, Practitioner>(
        (v) => v.picture,
        mapFrom((h) => h.picture)
    )
}

function forMember_Practitioner_specialityCodes() {
    return forMember<HealthcareParty, Practitioner>(
        (v) => v.specialityCodes,
        mapWith(CodingReference, CodeStub, (h) => h.specialityCodes)
    )
}

function forMember_Practitioner_description() {
    return forMember<HealthcareParty, Practitioner>(
        (v) => v.description,
        mapFrom((h) => h.descr)
    )
}

function forMember_Practitioner_properties() {
    return forMember<HealthcareParty, Practitioner>(
        (v) => v.properties,
        mapWith(Property, PropertyStub, (h) => h.properties)
    )
}

function forMember_Practitioner_systemMetaData() {
    return forMember<HealthcareParty, Practitioner>(
        (v) => v.systemMetaData,
        mapFrom((h) => {
            return new SystemMetaDataOwner({
                hcPartyKeys: !!h.hcPartyKeys ? new Map(Object.entries(h.hcPartyKeys)) : undefined,
                publicKey: h.publicKey,
                aesExchangeKeys: !!h.aesExchangeKeys ? convertObjectToDeepNestedMap(h.aesExchangeKeys) : undefined,
                transferKeys: !!h.transferKeys ? convertObjectToNestedMap(h.transferKeys) : undefined,
                privateKeyShamirPartitions: !!h.privateKeyShamirPartitions ? convertObjectToMap(h.privateKeyShamirPartitions) : undefined,
            })
        })
    )
}

function forMember_Practitioner_identifiers() {
    return forMember<HealthcareParty, Practitioner>(
        (v) => v.identifiers,
        mapWith(Identifier, IdentifierEntity, (h) => {
            return healthcareProfessionalIdentifiers(h)
        })
    )
}

function forMember_Practitioner_userId() {
    return forMember<HealthcareParty, Practitioner>(
        (v) => v.userId,
        mapFrom((h) => h.userId)
    )
}

export function initializePractitionerMapper() {
    createMap(
        mapper,
        Practitioner,
        HealthcareParty,
        forMember_HealthcareParty_id(),
        forMember_HealthcareParty_rev(),
        forMember_HealthcareParty_created(),
        forMember_HealthcareParty_modified(),
        forMember_HealthcareParty_deletionDate(),
        forMember_HealthcareParty_identifier(),
        forMember_HealthcareParty_tags(),
        forMember_HealthcareParty_codes(),
        forMember_HealthcareParty_name(),
        forMember_HealthcareParty_lastName(),
        forMember_HealthcareParty_firstName(),
        forMember_HealthcareParty_names(),
        forMember_HealthcareParty_gender(),
        forMember_HealthcareParty_civility(),
        forMember_HealthcareParty_companyName(),
        forMember_HealthcareParty_speciality(),
        forMember_HealthcareParty_bankAccount(),
        forMember_HealthcareParty_bic(),
        forMember_HealthcareParty_proxyBankAccount(),
        forMember_HealthcareParty_proxyBic(),
        forMember_HealthcareParty_invoiceHeader(),
        forMember_HealthcareParty_cbe(),
        forMember_HealthcareParty_ehp(),
        forMember_HealthcareParty_userId(),
        forMember_HealthcareParty_parentId(),
        forMember_HealthcareParty_convention(),
        forMember_HealthcareParty_nihii(),
        forMember_HealthcareParty_nihiiSpecCode(),
        forMember_HealthcareParty_ssin(),
        forMember_HealthcareParty_addresses(),
        forMember_HealthcareParty_languages(),
        forMember_HealthcareParty_picture(),
        forMember_HealthcareParty_statuses(),
        forMember_HealthcareParty_statusHistory(),
        forMember_HealthcareParty_specialityCodes(),
        forMember_HealthcareParty_sendFormats(),
        forMember_HealthcareParty_notes(),
        forMember_HealthcareParty_financialInstitutionInformation(),
        forMember_HealthcareParty_descr(),
        forMember_HealthcareParty_billingType(),
        forMember_HealthcareParty_type(),
        forMember_HealthcareParty_contactPerson(),
        forMember_HealthcareParty_contactPersonHcpId(),
        forMember_HealthcareParty_supervisorId(),
        forMember_HealthcareParty_flatRateTarifications(),
        forMember_HealthcareParty_importedData(),
        forMember_HealthcareParty_options(),
        forMember_HealthcareParty_properties(),
        forMember_HealthcareParty_hcPartyKeys(),
        forMember_HealthcareParty_aesExchangeKeys(),
        forMember_HealthcareParty_transferKeys(),
        forMember_HealthcareParty_privateKeyShamirPartitions(),
        forMember_HealthcareParty_publicKey()
    )

    createMap(
        mapper,
        HealthcareParty,
        Practitioner,
        forMember_Practitioner_id(),
        forMember_Practitioner_rev(),
        forMember_Practitioner_created(),
        forMember_Practitioner_modified(),
        forMember_Practitioner_identifiers(),
        forMember_Practitioner_tags(),
        forMember_Practitioner_codes(),
        forMember_Practitioner_deletionDate(),
        forMember_Practitioner_name(),
        forMember_Practitioner_lastName(),
        forMember_Practitioner_firstName(),
        forMember_Practitioner_names(),
        forMember_Practitioner_gender(),
        forMember_Practitioner_civility(),
        forMember_Practitioner_speciality(),
        forMember_Practitioner_parentId(),
        forMember_Practitioner_userId(),
        forMember_Practitioner_addresses(),
        forMember_Practitioner_languages(),
        forMember_Practitioner_picture(),
        forMember_Practitioner_specialityCodes(),
        forMember_Practitioner_description(),
        forMember_Practitioner_properties(),
        forMember_Practitioner_systemMetaData()
    )
}
