import { Organisation } from '../models/Organisation.model'
import { Address, CodeStub, HealthcareParty, Identifier as IdentifierEntity, PropertyStub } from '@icure/api'
import { createMap, forMember, ignore, mapFrom, mapWith } from '@automapper/core'
import { mapper } from './mapper'
import { Identifier } from '../models/Identifier.model'
import { CodingReference } from '../models/CodingReference.model'
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
    extractPublicKeysForOaepWithSha256,
    extractTransferKeys,
} from './utils/Metadata.utils'
import { SystemMetaDataOwner } from '../models/SystemMetaDataOwner.model'
import { healthcareProfessionalIdentifiers } from './utils/HealthProfessional.utils'

function forMember_HealthcareParty_id() {
    return forMember<Organisation, HealthcareParty>(
        (v) => v.id,
        mapFrom((v) => v.id)
    )
}

function forMember_HealthcareParty_rev() {
    return forMember<Organisation, HealthcareParty>(
        (v) => v.rev,
        mapFrom((v) => v.rev)
    )
}

function forMember_HealthcareParty_created() {
    return forMember<Organisation, HealthcareParty>(
        (v) => v.created,
        mapFrom((v) => v.created)
    )
}

function forMember_HealthcareParty_modified() {
    return forMember<Organisation, HealthcareParty>(
        (v) => v.modified,
        mapFrom((v) => v.modified)
    )
}

function forMember_HealthcareParty_deletionDate() {
    return forMember<Organisation, HealthcareParty>(
        (v) => v.deletionDate,
        mapFrom((v) => v.deletionDate)
    )
}

function forMember_HealthcareParty_identifier() {
    return forMember<Organisation, HealthcareParty>(
        (v) => v.identifier,
        mapWith(IdentifierEntity, Identifier, (v) => v.identifiers)
    )
}

function forMember_HealthcareParty_tags() {
    return forMember<Organisation, HealthcareParty>(
        (v) => v.tags,
        mapWith(CodeStub, CodingReference, (v) => v.tags)
    )
}

function forMember_HealthcareParty_codes() {
    return forMember<Organisation, HealthcareParty>(
        (v) => v.codes,
        mapWith(CodeStub, CodingReference, (v) => v.codes)
    )
}

function forMember_HealthcareParty_name() {
    return forMember<Organisation, HealthcareParty>(
        (v) => v.name,
        mapFrom((v) => v.name)
    )
}

function forMember_HealthcareParty_lastName() {
    return forMember<Organisation, HealthcareParty>((v) => v.lastName, ignore())
}

function forMember_HealthcareParty_firstName() {
    return forMember<Organisation, HealthcareParty>((v) => v.firstName, ignore())
}

function forMember_HealthcareParty_names() {
    return forMember<Organisation, HealthcareParty>((v) => v.names, ignore())
}

function forMember_HealthcareParty_gender() {
    return forMember<Organisation, HealthcareParty>((v) => v.gender, ignore())
}

function forMember_HealthcareParty_civility() {
    return forMember<Organisation, HealthcareParty>((v) => v.civility, ignore())
}

function forMember_HealthcareParty_companyName() {
    return forMember<Organisation, HealthcareParty>((v) => v.companyName, ignore())
}

function forMember_HealthcareParty_speciality() {
    return forMember<Organisation, HealthcareParty>((v) => v.speciality, ignore())
}

function forMember_HealthcareParty_bankAccount() {
    return forMember<Organisation, HealthcareParty>((v) => v.bankAccount, ignore())
}

function forMember_HealthcareParty_bic() {
    return forMember<Organisation, HealthcareParty>((v) => v.bic, ignore())
}

function forMember_HealthcareParty_proxyBankAccount() {
    return forMember<Organisation, HealthcareParty>((v) => v.proxyBankAccount, ignore())
}

function forMember_HealthcareParty_proxyBic() {
    return forMember<Organisation, HealthcareParty>((v) => v.proxyBic, ignore())
}

function forMember_HealthcareParty_invoiceHeader() {
    return forMember<Organisation, HealthcareParty>((v) => v.invoiceHeader, ignore())
}

function forMember_HealthcareParty_cbe() {
    return forMember<Organisation, HealthcareParty>((v) => v.cbe, ignore())
}

function forMember_HealthcareParty_ehp() {
    return forMember<Organisation, HealthcareParty>((v) => v.ehp, ignore())
}

function forMember_HealthcareParty_userId() {
    return forMember<Organisation, HealthcareParty>(
        (v) => v.userId,
        mapFrom((v) => v.userId)
    )
}

function forMember_HealthcareParty_parentId() {
    return forMember<Organisation, HealthcareParty>(
        (v) => v.parentId,
        mapFrom((v) => v.parentId)
    )
}

function forMember_HealthcareParty_convention() {
    return forMember<Organisation, HealthcareParty>((v) => v.convention, ignore())
}

function forMember_HealthcareParty_nihii() {
    return forMember<Organisation, HealthcareParty>((v) => v.nihii, ignore())
}

function forMember_HealthcareParty_nihiiSpecCode() {
    return forMember<Organisation, HealthcareParty>((v) => v.nihiiSpecCode, ignore())
}

function forMember_HealthcareParty_ssin() {
    return forMember<Organisation, HealthcareParty>((v) => v.ssin, ignore())
}

function forMember_HealthcareParty_addresses() {
    return forMember<Organisation, HealthcareParty>(
        (v) => v.addresses,
        mapWith(Address, Location, (v) => v.addresses)
    )
}

function forMember_HealthcareParty_languages() {
    return forMember<Organisation, HealthcareParty>(
        (v) => v.languages,
        mapFrom((v) => v.languages)
    )
}

function forMember_HealthcareParty_picture() {
    return forMember<Organisation, HealthcareParty>(
        (v) => v.picture,
        mapFrom((v) => v.picture)
    )
}

function forMember_HealthcareParty_statuses() {
    return forMember<Organisation, HealthcareParty>((v) => v.statuses, ignore())
}

function forMember_HealthcareParty_statusHistory() {
    return forMember<Organisation, HealthcareParty>((v) => v.statusHistory, ignore())
}

function forMember_HealthcareParty_specialityCodes() {
    return forMember<Organisation, HealthcareParty>((v) => v.specialityCodes, ignore())
}

function forMember_HealthcareParty_sendFormats() {
    return forMember<Organisation, HealthcareParty>((v) => v.sendFormats, ignore())
}

function forMember_HealthcareParty_notes() {
    return forMember<Organisation, HealthcareParty>((v) => v.notes, ignore())
}

function forMember_HealthcareParty_financialInstitutionInformation() {
    return forMember<Organisation, HealthcareParty>((v) => v.financialInstitutionInformation, ignore())
}

function forMember_HealthcareParty_descr() {
    return forMember<Organisation, HealthcareParty>(
        (v) => v.descr,
        mapFrom((v) => v.description)
    )
}

function forMember_HealthcareParty_billingType() {
    return forMember<Organisation, HealthcareParty>((v) => v.billingType, ignore())
}

function forMember_HealthcareParty_type() {
    return forMember<Organisation, HealthcareParty>((v) => v.type, ignore())
}

function forMember_HealthcareParty_contactPerson() {
    return forMember<Organisation, HealthcareParty>((v) => v.contactPerson, ignore())
}

function forMember_HealthcareParty_contactPersonHcpId() {
    return forMember<Organisation, HealthcareParty>((v) => v.contactPersonHcpId, ignore())
}

function forMember_HealthcareParty_supervisorId() {
    return forMember<Organisation, HealthcareParty>((v) => v.supervisorId, ignore())
}

function forMember_HealthcareParty_flatRateTarifications() {
    return forMember<Organisation, HealthcareParty>((v) => v.flatRateTarifications, ignore())
}

function forMember_HealthcareParty_importedData() {
    return forMember<Organisation, HealthcareParty>((v) => v.importedData, ignore())
}

function forMember_HealthcareParty_options() {
    return forMember<Organisation, HealthcareParty>((v) => v.options, ignore())
}

function forMember_HealthcareParty_properties() {
    return forMember<Organisation, HealthcareParty>(
        (v) => v.properties,
        mapWith(PropertyStub, Property, (v) => v.properties)
    )
}

function forMember_HealthcareParty_hcPartyKeys() {
    return forMember<Organisation, HealthcareParty>(
        (v) => v.hcPartyKeys,
        mapFrom((v) => Object.fromEntries(extractHcPartyKeys(v.systemMetaData)?.entries() ?? []))
    )
}

function forMember_HealthcareParty_aesExchangeKeys() {
    return forMember<Organisation, HealthcareParty>(
        (v) => v.aesExchangeKeys,
        mapFrom((v) => {
            const aesExchangeKeys = extractAesExchangeKeys(v.systemMetaData)
            return !!aesExchangeKeys ? convertDeepNestedMapToObject(aesExchangeKeys) : undefined
        })
    )
}

function forMember_HealthcareParty_transferKeys() {
    return forMember<Organisation, HealthcareParty>(
        (v) => v.transferKeys,
        mapFrom((v) => {
            const transferKeys = extractTransferKeys(v.systemMetaData)
            return !!transferKeys ? convertNestedMapToObject(transferKeys) : undefined
        })
    )
}

function forMember_HealthcareParty_privateKeyShamirPartitions() {
    return forMember<Organisation, HealthcareParty>(
        (v) => v.privateKeyShamirPartitions,
        mapFrom((v) => {
            const privateKeyShamirPartitions = extractPrivateKeyShamirPartitions(v.systemMetaData)
            return !!privateKeyShamirPartitions ? convertMapToObject(privateKeyShamirPartitions) : undefined
        })
    )
}

function forMember_HealthcareParty_publicKey() {
    return forMember<Organisation, HealthcareParty>(
        (v) => v.publicKey,
        mapFrom((v) => extractPublicKey(v.systemMetaData))
    )
}

function forMember_Organisation_id() {
    return forMember<HealthcareParty, Organisation>(
        (v) => v.id,
        mapFrom((v) => v.id)
    )
}

function forMember_Organisation_rev() {
    return forMember<HealthcareParty, Organisation>(
        (v) => v.rev,
        mapFrom((v) => v.rev)
    )
}

function forMember_Organisation_created() {
    return forMember<HealthcareParty, Organisation>(
        (v) => v.created,
        mapFrom((v) => v.created)
    )
}

function forMember_Organisation_modified() {
    return forMember<HealthcareParty, Organisation>(
        (v) => v.modified,
        mapFrom((v) => v.modified)
    )
}

function forMember_Organisation_tags() {
    return forMember<HealthcareParty, Organisation>(
        (v) => v.tags,
        mapWith(CodingReference, CodeStub, (v) => v.tags)
    )
}

function forMember_Organisation_codes() {
    return forMember<HealthcareParty, Organisation>(
        (v) => v.codes,
        mapWith(CodingReference, CodeStub, (v) => v.codes)
    )
}

function forMember_Organisation_deletionDate() {
    return forMember<HealthcareParty, Organisation>(
        (v) => v.deletionDate,
        mapFrom((v) => v.deletionDate)
    )
}

function forMember_Organisation_name() {
    return forMember<HealthcareParty, Organisation>(
        (v) => v.name,
        mapFrom((v) => v.name)
    )
}

function forMember_Organisation_parentId() {
    return forMember<HealthcareParty, Organisation>(
        (v) => v.parentId,
        mapFrom((v) => v.parentId)
    )
}

function forMember_Organisation_addresses() {
    return forMember<HealthcareParty, Organisation>(
        (v) => v.addresses,
        mapWith(Location, Address, (v) => v.addresses)
    )
}

function forMember_Organisation_languages() {
    return forMember<HealthcareParty, Organisation>(
        (v) => v.languages,
        mapFrom((v) => v.languages)
    )
}

function forMember_Organisation_picture() {
    return forMember<HealthcareParty, Organisation>(
        (v) => v.picture,
        mapFrom((v) => v.picture)
    )
}

function forMember_Organisation_description() {
    return forMember<HealthcareParty, Organisation>(
        (v) => v.description,
        mapFrom((v) => v.descr)
    )
}

function forMember_Organisation_properties() {
    return forMember<HealthcareParty, Organisation>(
        (v) => v.properties,
        mapWith(Property, PropertyStub, (v) => v.properties)
    )
}

function forMember_Organisation_systemMetaData() {
    return forMember<HealthcareParty, Organisation>(
        (v) => v.systemMetaData,
        mapFrom((v) => {
            return new SystemMetaDataOwner({
                hcPartyKeys: !!v.hcPartyKeys ? new Map(Object.entries(v.hcPartyKeys)) : undefined,
                publicKey: v.publicKey,
                aesExchangeKeys: !!v.aesExchangeKeys ? convertObjectToDeepNestedMap(v.aesExchangeKeys) : undefined,
                transferKeys: !!v.transferKeys ? convertObjectToNestedMap(v.transferKeys) : undefined,
                privateKeyShamirPartitions: !!v.privateKeyShamirPartitions ? convertObjectToMap(v.privateKeyShamirPartitions) : undefined,
                publicKeysForOaepWithSha256: v.publicKeysForOaepWithSha256,
            })
        })
    )
}

function forMember_Organisation_identifiers() {
    return forMember<HealthcareParty, Organisation>(
        (v) => v.identifiers,
        mapWith(Identifier, IdentifierEntity, (h) => healthcareProfessionalIdentifiers(h))
    )
}

function forMember_Organisation_userId() {
    return forMember<HealthcareParty, Organisation>(
        (v) => v.userId,
        mapFrom((v) => v.userId)
    )
}

function forMember_HealthcareParty_publicKeysForOaepWithSha256() {
    return forMember<Organisation, HealthcareParty>(
        (v) => v.publicKeysForOaepWithSha256,
        mapFrom((o) => extractPublicKeysForOaepWithSha256(o.systemMetaData))
    )
}

export function initializeOrganisationMapper() {
    createMap(
        mapper,
        Organisation,
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
        forMember_HealthcareParty_publicKey(),
        forMember_HealthcareParty_publicKeysForOaepWithSha256()
    )

    createMap(
        mapper,
        HealthcareParty,
        Organisation,
        forMember_Organisation_id(),
        forMember_Organisation_rev(),
        forMember_Organisation_created(),
        forMember_Organisation_modified(),
        forMember_Organisation_identifiers(),
        forMember_Organisation_tags(),
        forMember_Organisation_codes(),
        forMember_Organisation_deletionDate(),
        forMember_Organisation_name(),
        forMember_Organisation_parentId(),
        forMember_Organisation_userId(),
        forMember_Organisation_addresses(),
        forMember_Organisation_languages(),
        forMember_Organisation_picture(),
        forMember_Organisation_description(),
        forMember_Organisation_properties(),
        forMember_Organisation_systemMetaData()
    )
}
