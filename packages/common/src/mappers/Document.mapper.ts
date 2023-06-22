import { Document } from "../models/Document.model"
import { Document as DocumentDto } from "@icure/api"
import {createMap, forMember, ignore, mapFrom, fromValue, Mapper} from "@automapper/core"
import {forceUuid} from "../utils/uuidUtils";

function forMember_DocumentDto_id() {
    return forMember<Document, DocumentDto>(v => v.id, mapFrom(d => forceUuid(d.id)))
}

function forMember_DocumentDto_rev() {
    return forMember<Document, DocumentDto>(v => v.rev, mapFrom(d => d.rev))
}

function forMember_DocumentDto_created() {
    return forMember<Document, DocumentDto>(v => v.created, mapFrom(d => d.created))
}

function forMember_DocumentDto_modified() {
    return forMember<Document, DocumentDto>(v => v.modified, mapFrom(d => d.modified))
}

function forMember_DocumentDto_author() {
    return forMember<Document, DocumentDto>(v => v.author, mapFrom(d => d.author))
}

function forMember_DocumentDto_responsible() {
    return forMember<Document, DocumentDto>(v => v.responsible, mapFrom(d => d.responsible))
}

function forMember_DocumentDto_medicalLocationId() {
    return forMember<Document, DocumentDto>(v => v.medicalLocationId, mapFrom(d => d.medicalLocationId))
}

function forMember_DocumentDto_tags() {
    return forMember<Document, DocumentDto>(v => v.tags, ignore())
}

function forMember_DocumentDto_codes() {
    return forMember<Document, DocumentDto>(v => v.codes, ignore())
}

function forMember_DocumentDto_endOfLife() {
    return forMember<Document, DocumentDto>(v => v.endOfLife, ignore())
}

function forMember_DocumentDto_deletionDate() {
    return forMember<Document, DocumentDto>(v => v.deletionDate, mapFrom(d => d.deletionDate))
}

function forMember_DocumentDto_documentLocation() {
    return forMember<Document, DocumentDto>(v => v.documentLocation, ignore())
}

function forMember_DocumentDto_documentType() {
    return forMember<Document, DocumentDto>(v => v.documentType, ignore())
}

function forMember_DocumentDto_documentStatus() {
    return forMember<Document, DocumentDto>(v => v.documentStatus, ignore())
}

function forMember_DocumentDto_externalUri() {
    return forMember<Document, DocumentDto>(v => v.externalUri, ignore())
}

function forMember_DocumentDto_name() {
    return forMember<Document, DocumentDto>(v => v.name, mapFrom(d => d.name))
}

function forMember_DocumentDto_version() {
    return forMember<Document, DocumentDto>(v => v.version, mapFrom(d => d.version))
}

function forMember_DocumentDto_storedICureDocumentId() {
    return forMember<Document, DocumentDto>(v => v.storedICureDocumentId, ignore())
}

function forMember_DocumentDto_externalUuid() {
    return forMember<Document, DocumentDto>(v => v.externalUuid, mapFrom(d => d.externalUuid))
}

function forMember_DocumentDto_size() {
    return forMember<Document, DocumentDto>(v => v.size, mapFrom(d => d.size))
}

function forMember_DocumentDto_hash() {
    return forMember<Document, DocumentDto>(v => v.hash, mapFrom(d => d.hash))
}

function forMember_DocumentDto_openingContactId() {
    return forMember<Document, DocumentDto>(v => v.openingContactId, ignore())
}

function forMember_DocumentDto_attachmentId() {
    return forMember<Document, DocumentDto>(v => v.attachmentId, mapFrom(d => d.attachmentId))
}

function forMember_DocumentDto_objectStoreReference() {
    return forMember<Document, DocumentDto>(v => v.objectStoreReference, mapFrom(d => d.objectStoreReference))
}

function forMember_DocumentDto_mainUti() {
    return forMember<Document, DocumentDto>(v => v.mainUti, mapFrom(d => d.mainUti))
}

function forMember_DocumentDto_otherUtis() {
    return forMember<Document, DocumentDto>(v => v.otherUtis, ignore())
}

function forMember_DocumentDto_secondaryAttachments() {
    return forMember<Document, DocumentDto>(v => v.secondaryAttachments, ignore())
}

function forMember_DocumentDto_deletedAttachments() {
    return forMember<Document, DocumentDto>(v => v.deletedAttachments, ignore())
}

function forMember_DocumentDto_encryptedAttachment() {
    return forMember<Document, DocumentDto>(v => v.encryptedAttachment, ignore())
}

function forMember_DocumentDto_decryptedAttachment() {
    return forMember<Document, DocumentDto>(v => v.decryptedAttachment, ignore())
}

function forMember_DocumentDto_secretForeignKeys() {
    return forMember<Document, DocumentDto>(v => v.secretForeignKeys, ignore())
}

function forMember_DocumentDto_cryptedForeignKeys() {
    return forMember<Document, DocumentDto>(v => v.cryptedForeignKeys, ignore())
}

function forMember_DocumentDto_delegations() {
    return forMember<Document, DocumentDto>(v => v.delegations, ignore())
}

function forMember_DocumentDto_encryptionKeys() {
    return forMember<Document, DocumentDto>(v => v.encryptionKeys, ignore())
}

function forMember_DocumentDto_encryptedSelf() {
    return forMember<Document, DocumentDto>(v => v.encryptedSelf, ignore())
}

function forMember_DocumentDto_securityMetadata() {
    return forMember<Document, DocumentDto>(v => v.securityMetadata, ignore())
}

function forMember_Document_id() {
    return forMember<DocumentDto, Document>(v => v.id, mapFrom(d => d.id))
}

function forMember_Document_rev() {
    return forMember<DocumentDto, Document>(v => v.rev, mapFrom(d => d.rev))
}

function forMember_Document_created() {
    return forMember<DocumentDto, Document>(v => v.created, mapFrom(d => d.created))
}

function forMember_Document_modified() {
    return forMember<DocumentDto, Document>(v => v.modified, mapFrom(d => d.modified))
}

function forMember_Document_author() {
    return forMember<DocumentDto, Document>(v => v.author, mapFrom(d => d.author))
}

function forMember_Document_responsible() {
    return forMember<DocumentDto, Document>(v => v.responsible, mapFrom(d => d.responsible))
}

function forMember_Document_medicalLocationId() {
    return forMember<DocumentDto, Document>(v => v.medicalLocationId, mapFrom(d => d.medicalLocationId))
}

function forMember_Document_deletionDate() {
    return forMember<DocumentDto, Document>(v => v.deletionDate, mapFrom(d => d.deletionDate))
}

function forMember_Document_objectStoreReference() {
    return forMember<DocumentDto, Document>(v => v.objectStoreReference, mapFrom(d => d.objectStoreReference))
}

function forMember_Document_mainUti() {
    return forMember<DocumentDto, Document>(v => v.mainUti, mapFrom(d => d.mainUti))
}

function forMember_Document_name() {
    return forMember<DocumentDto, Document>(v => v.name, mapFrom(d => d.name))
}

function forMember_Document_version() {
    return forMember<DocumentDto, Document>(v => v.version, mapFrom(d => d.version))
}

function forMember_Document_otherUtis() {
    return forMember<DocumentDto, Document>(v => v.otherUtis, mapFrom(d => d.otherUtis))
}

function forMember_Document_externalUuid() {
    return forMember<DocumentDto, Document>(v => v.externalUuid, mapFrom(d => d.externalUuid))
}

function forMember_Document_size() {
    return forMember<DocumentDto, Document>(v => v.size, mapFrom(d => d.size))
}

function forMember_Document_hash() {
    return forMember<DocumentDto, Document>(v => v.hash, mapFrom(d => d.hash))
}

function forMember_Document_attachmentId() {
    return forMember<DocumentDto, Document>(v => v.attachmentId, mapFrom(d => d.attachmentId))
}

function forMember_DocumentDto__type() {
    return forMember<Document, DocumentDto>(v => v._type, fromValue("Document"))
}

export function initializeDocumentMapper(mapper: Mapper) {
    createMap(mapper, Document, DocumentDto, forMember_DocumentDto_id(), forMember_DocumentDto_rev(), forMember_DocumentDto_created(), forMember_DocumentDto_modified(), forMember_DocumentDto_author(), forMember_DocumentDto_responsible(), forMember_DocumentDto_medicalLocationId(), forMember_DocumentDto_tags(), forMember_DocumentDto_codes(), forMember_DocumentDto_endOfLife(), forMember_DocumentDto_deletionDate(), forMember_DocumentDto_documentLocation(), forMember_DocumentDto_documentType(), forMember_DocumentDto_documentStatus(), forMember_DocumentDto_externalUri(), forMember_DocumentDto_name(), forMember_DocumentDto_version(), forMember_DocumentDto_storedICureDocumentId(), forMember_DocumentDto_externalUuid(), forMember_DocumentDto_size(), forMember_DocumentDto_hash(), forMember_DocumentDto_openingContactId(), forMember_DocumentDto_attachmentId(), forMember_DocumentDto_objectStoreReference(), forMember_DocumentDto_mainUti(), forMember_DocumentDto_otherUtis(), forMember_DocumentDto_secondaryAttachments(), forMember_DocumentDto_deletedAttachments(), forMember_DocumentDto_encryptedAttachment(), forMember_DocumentDto_decryptedAttachment(), forMember_DocumentDto_secretForeignKeys(), forMember_DocumentDto_cryptedForeignKeys(), forMember_DocumentDto_delegations(), forMember_DocumentDto_encryptionKeys(), forMember_DocumentDto_encryptedSelf(), forMember_DocumentDto_securityMetadata(), forMember_DocumentDto__type())

    createMap(mapper, DocumentDto, Document, forMember_Document_id(), forMember_Document_rev(), forMember_Document_created(), forMember_Document_modified(), forMember_Document_author(), forMember_Document_responsible(), forMember_Document_medicalLocationId(), forMember_Document_deletionDate(), forMember_Document_objectStoreReference(), forMember_Document_mainUti(), forMember_Document_name(), forMember_Document_version(), forMember_Document_otherUtis(), forMember_Document_externalUuid(), forMember_Document_size(), forMember_Document_hash(), forMember_Document_attachmentId())
}
