import {Observation} from "../models/Observation.model"
import {
    Annotation as AnnotationEntity,
    CodeStub,
    Content,
    Identifier as IdentifierEntity,
    ISO639_1,
    Service
} from "@icure/api"
import {createMap, forMember, ignore, mapFrom, mapWith} from "@automapper/core"
import {mapper} from "./mapper"
import {Identifier} from "../models/Identifier.model";
import {
    exportCryptedForeignKeys,
    exportDelegations, exportEncryptedSelf,
    exportEncryptionKeys,
    exportSecretForeignKeys, exportSecurityMetadata
} from "../models/utils/Metadata.utils";
import {Component} from "../models/Component.model";
import {LocalComponent} from "../models/LocalComponent.model";
import {Annotation} from "../models/Annotation.model";
import {CodingReference} from "../models/CodingReference.model";
import {SystemMetaDataEncrypted} from "../models/SystemMetaDataEncrypted.model";
import {SecurityMetadata as SecurityMetadataEntity} from "@icure/api/icc-api/model/SecurityMetadata";
import {SecurityMetadata} from "../models/SecurityMetadata.model";

function forMember_Service_id() {
    return forMember<Observation, Service>(v => v.id, mapFrom(v => v.id))
}

function forMember_Service_transactionId() {
    return forMember<Observation, Service>(v => v.transactionId, mapFrom(v => v.transactionId))
}

function forMember_Service_identifier() {
    return forMember<Observation, Service>(v => v.identifier, mapWith(IdentifierEntity, Identifier, v => v.identifiers))
}

function forMember_Service_contactId() {
    return forMember<Observation, Service>(v => v.contactId, mapFrom(v => v.batchId))
}

function forMember_Service_subContactIds() {
    return forMember<Observation, Service>(v => v.subContactIds, ignore())
}

function forMember_Service_plansOfActionIds() {
    return forMember<Observation, Service>(v => v.plansOfActionIds, ignore())
}

function forMember_Service_healthElementsIds() {
    return forMember<Observation, Service>(v => v.healthElementsIds, mapFrom(v => v.healthcareElementIds))
}

function forMember_Service_formIds() {
    return forMember<Observation, Service>(v => v.formIds, ignore())
}

function forMember_Service_secretForeignKeys() {
    return forMember<Observation, Service>(v => v.secretForeignKeys, mapFrom(v => exportSecretForeignKeys(v.systemMetaData)))
}

function forMember_Service_cryptedForeignKeys() {
    return forMember<Observation, Service>(v => v.cryptedForeignKeys, mapFrom(v => exportCryptedForeignKeys(v.systemMetaData)))
}

function forMember_Service_delegations() {
    return forMember<Observation, Service>(v => v.delegations, mapFrom(v => exportDelegations(v.systemMetaData)))
}

function forMember_Service_encryptionKeys() {
    return forMember<Observation, Service>(v => v.encryptionKeys, mapFrom(v => exportEncryptionKeys(v.systemMetaData)))
}

function forMember_Service_label() {
    return forMember<Observation, Service>(v => v.label, ignore())
}

function forMember_Service_dataClassName() {
    return forMember<Observation, Service>(v => v.dataClassName, ignore())
}

function forMember_Service_index() {
    return forMember<Observation, Service>(v => v.index, mapFrom(v => v.index))
}

function forMember_Service_content() {
    return forMember<Observation, Service>(v => v.content, mapFrom(v => {
        const nonLocalizedContent = mapper.map(v.component, Component, Content)
        const localizedContents: [ISO639_1, Content][] = [...v.localContent?.entries() ?? []]?.map(([key, value]) => {
            return [key, mapper.map(value, LocalComponent, Content)]
        })

        return Object.fromEntries([...localizedContents, ['xx', nonLocalizedContent]])
    }))
}

function forMember_Service_encryptedContent() {
    return forMember<Observation, Service>(v => v.encryptedContent, ignore())
}

function forMember_Service_textIndexes() {
    return forMember<Observation, Service>(v => v.textIndexes, ignore())
}

function forMember_Service_valueDate() {
    return forMember<Observation, Service>(v => v.valueDate, mapFrom(v => v.valueDate))
}

function forMember_Service_openingDate() {
    return forMember<Observation, Service>(v => v.openingDate, mapFrom(v => v.openingDate))
}

function forMember_Service_closingDate() {
    return forMember<Observation, Service>(v => v.closingDate, mapFrom(v => v.closingDate))
}

function forMember_Service_formId() {
    return forMember<Observation, Service>(v => v.formId, ignore())
}

function forMember_Service_created() {
    return forMember<Observation, Service>(v => v.created, mapFrom(v => v.created))
}

function forMember_Service_modified() {
    return forMember<Observation, Service>(v => v.modified, mapFrom(v => v.modified))
}

function forMember_Service_endOfLife() {
    return forMember<Observation, Service>(v => v.endOfLife, mapFrom(v => v.endOfLife))
}

function forMember_Service_author() {
    return forMember<Observation, Service>(v => v.author, mapFrom(v => v.author))
}

function forMember_Service_responsible() {
    return forMember<Observation, Service>(v => v.responsible, mapFrom(v => v.performer))
}

function forMember_Service_medicalLocationId() {
    return forMember<Observation, Service>(v => v.medicalLocationId, ignore())
}

function forMember_Service_comment() {
    return forMember<Observation, Service>(v => v.comment, ignore())
}

function forMember_Service_status() {
    return forMember<Observation, Service>(v => v.status, ignore())
}

function forMember_Service_invoicingCodes() {
    return forMember<Observation, Service>(v => v.invoicingCodes, ignore())
}

function forMember_Service_notes() {
    return forMember<Observation, Service>(v => v.notes, mapWith(AnnotationEntity, Annotation, v => v.notes))
}

function forMember_Service_qualifiedLinks() {
    return forMember<Observation, Service>(v => v.qualifiedLinks, mapFrom(v => !!v.qualifiedLinks ? Array.from(v.qualifiedLinks).reduce((acc, [key, value]) => ({
        ...acc,
        [key]: Array.from(value).reduce((innerAcc, [innerKey, innerValue]) => ({
            ...innerAcc,
            [innerKey]: innerValue
        }), {})
    }), {}) : undefined))
}

function forMember_Service_codes() {
    return forMember<Observation, Service>(v => v.codes, mapWith(CodeStub, CodingReference, v => v.codes))
}

function forMember_Service_tags() {
    return forMember<Observation, Service>(v => v.tags, mapWith(CodeStub, CodingReference, v => v.tags))
}

function forMember_Service_encryptedSelf() {
    return forMember<Observation, Service>(v => v.encryptedSelf, mapFrom(v => exportEncryptedSelf(v.systemMetaData)))
}

function forMember_Service_securityMetadata() {
    return forMember<Observation, Service>(v => v.securityMetadata, mapFrom(v => exportSecurityMetadata(v.systemMetaData)))
}

function forMember_Observation_id() {
    return forMember<Service, Observation>(v => v.id, mapFrom(v => v.id))
}

function forMember_Observation_transactionId() {
    return forMember<Service, Observation>(v => v.transactionId, mapFrom(v => v.transactionId))
}

function forMember_Observation_identifiers() {
    return forMember<Service, Observation>(v => v.identifiers, mapWith(Identifier, IdentifierEntity, v => v.identifier))
}

function forMember_Observation_batchId() {
    return forMember<Service, Observation>(v => v.batchId, mapFrom(v => v.contactId))
}

function forMember_Observation_healthcareElementIds() {
    return forMember<Service, Observation>(v => v.healthcareElementIds, mapFrom(v => v.healthElementsIds))
}

function forMember_Observation_index() {
    return forMember<Service, Observation>(v => v.index, mapFrom(v => v.index))
}

function forMember_Observation_component() {
    return forMember<Service, Observation>(v => v.component, mapWith(Component, Content, v => Object.entries(v.content ?? {})?.find(([key, value]) => key === 'xx')?.[1]))
}

function forMember_Observation_valueDate() {
    return forMember<Service, Observation>(v => v.valueDate, mapFrom(v => v.valueDate))
}

function forMember_Observation_openingDate() {
    return forMember<Service, Observation>(v => v.openingDate, mapFrom(v => v.openingDate))
}

function forMember_Observation_closingDate() {
    return forMember<Service, Observation>(v => v.closingDate, mapFrom(v => v.closingDate))
}

function forMember_Observation_created() {
    return forMember<Service, Observation>(v => v.created, mapFrom(v => v.created))
}

function forMember_Observation_modified() {
    return forMember<Service, Observation>(v => v.modified, mapFrom(v => v.modified))
}

function forMember_Observation_endOfLife() {
    return forMember<Service, Observation>(v => v.endOfLife, mapFrom(v => v.endOfLife))
}

function forMember_Observation_author() {
    return forMember<Service, Observation>(v => v.author, mapFrom(v => v.author))
}

function forMember_Observation_performer() {
    return forMember<Service, Observation>(v => v.performer, mapFrom(v => v.responsible))
}

function forMember_Observation_localContent() {
    return forMember<Service, Observation>(v => v.localContent, mapFrom(v => {
        const localizedContent = Object.entries(v.content ?? {})?.filter(([key, value]) => key !== 'xx')
        const mapperLocalContent = new Map(localizedContent.map(([key, value]) => {
            return [key, mapper.map(value, Content, LocalComponent)] as [ISO639_1, LocalComponent]
        }))

        return mapperLocalContent
    }))
}

function forMember_Observation_qualifiedLinks() {
    return forMember<Service, Observation>(v => v.qualifiedLinks, mapFrom(v => {
        !!v.qualifiedLinks
            ? new Map(Object.entries(v.qualifiedLinks).map(([key, value]) => [
                key,
                new Map(Object.entries(value))
            ]))
            : undefined
    }))
}

function forMember_Observation_codes() {
    return forMember<Service, Observation>(v => v.codes, mapWith(CodingReference, CodeStub, v => v.codes))
}

function forMember_Observation_tags() {
    return forMember<Service, Observation>(v => v.tags, mapWith(CodingReference, CodeStub, v => v.tags))
}

function forMember_Observation_systemMetaData() {
    return forMember<Service, Observation>(v => v.systemMetaData, mapFrom(v => {
        return new SystemMetaDataEncrypted({
            encryptedSelf: v.encryptedSelf,
            securityMetadata: mapper.map(v.securityMetadata, SecurityMetadataEntity, SecurityMetadata),
        })
    }))
}

export function initializeObservationMapper() {
    createMap(mapper, Observation, Service, forMember_Service_id(), forMember_Service_transactionId(), forMember_Service_identifier(), forMember_Service_contactId(), forMember_Service_subContactIds(), forMember_Service_plansOfActionIds(), forMember_Service_healthElementsIds(), forMember_Service_formIds(), forMember_Service_secretForeignKeys(), forMember_Service_cryptedForeignKeys(), forMember_Service_delegations(), forMember_Service_encryptionKeys(), forMember_Service_label(), forMember_Service_dataClassName(), forMember_Service_index(), forMember_Service_content(), forMember_Service_encryptedContent(), forMember_Service_textIndexes(), forMember_Service_valueDate(), forMember_Service_openingDate(), forMember_Service_closingDate(), forMember_Service_formId(), forMember_Service_created(), forMember_Service_modified(), forMember_Service_endOfLife(), forMember_Service_author(), forMember_Service_responsible(), forMember_Service_medicalLocationId(), forMember_Service_comment(), forMember_Service_status(), forMember_Service_invoicingCodes(), forMember_Service_notes(), forMember_Service_qualifiedLinks(), forMember_Service_codes(), forMember_Service_tags(), forMember_Service_encryptedSelf(), forMember_Service_securityMetadata())

    createMap(mapper, Service, Observation, forMember_Observation_id(), forMember_Observation_transactionId(), forMember_Observation_identifiers(), forMember_Observation_batchId(), forMember_Observation_healthcareElementIds(), forMember_Observation_index(), forMember_Observation_component(), forMember_Observation_valueDate(), forMember_Observation_openingDate(), forMember_Observation_closingDate(), forMember_Observation_created(), forMember_Observation_modified(), forMember_Observation_endOfLife(), forMember_Observation_author(), forMember_Observation_performer(), forMember_Observation_localContent(), forMember_Observation_qualifiedLinks(), forMember_Observation_codes(), forMember_Observation_tags(), forMember_Observation_systemMetaData(), forMember_Observation_notes())
}

function forMember_Observation_notes() {
    return forMember<Service, Observation>(v => v.notes, mapWith(Annotation, AnnotationEntity, v => v.notes))
}
