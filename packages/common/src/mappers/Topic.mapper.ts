import { Topic } from '../models/Topic.model'
import { CodeStub, Delegation, Form } from '@icure/api'
import { SystemMetaDataEncrypted } from '../models/SystemMetaDataEncrypted.model'
import { CodingReference } from '../models/CodingReference.model'

function toFormId(domain: Topic): string | undefined {
    throw new Error('Not implemented')
}

function toFormRev(domain: Topic): string | undefined {
    throw new Error('Not implemented')
}

function toFormCreated(domain: Topic): number | undefined {
    throw new Error('Not implemented')
}

function toFormModified(domain: Topic): number | undefined {
    throw new Error('Not implemented')
}

function toFormAuthor(domain: Topic): string | undefined {
    throw new Error('Not implemented')
}

function toFormResponsible(domain: Topic): string | undefined {
    throw new Error('Not implemented')
}

function toFormMedicalLocationId(domain: Topic): string | undefined {
    throw new Error('Not implemented')
}

function toFormTags(domain: Topic): CodeStub[] | undefined {
    throw new Error('Not implemented')
}

function toFormCodes(domain: Topic): CodeStub[] | undefined {
    throw new Error('Not implemented')
}

function toFormEndOfLife(domain: Topic): number | undefined {
    throw new Error('Not implemented')
}

function toFormDeletionDate(domain: Topic): number | undefined {
    throw new Error('Not implemented')
}

function toFormOpeningDate(domain: Topic): number | undefined {
    throw new Error('Not implemented')
}

function toFormStatus(domain: Topic): string | undefined {
    throw new Error('Not implemented')
}

function toFormVersion(domain: Topic): number | undefined {
    throw new Error('Not implemented')
}

function toFormLogicalUuid(domain: Topic): string | undefined {
    throw new Error('Not implemented')
}

function toFormDescr(domain: Topic): string | undefined {
    throw new Error('Not implemented')
}

function toFormUniqueId(domain: Topic): string | undefined {
    throw new Error('Not implemented')
}

function toFormFormTemplateId(domain: Topic): string | undefined {
    throw new Error('Not implemented')
}

function toFormContactId(domain: Topic): string | undefined {
    throw new Error('Not implemented')
}

function toFormHealthElementId(domain: Topic): string | undefined {
    throw new Error('Not implemented')
}

function toFormPlanOfActionId(domain: Topic): string | undefined {
    throw new Error('Not implemented')
}

function toFormParent(domain: Topic): string | undefined {
    throw new Error('Not implemented')
}

function toFormSecretForeignKeys(domain: Topic): string[] | undefined {
    throw new Error('Not implemented')
}

function toFormCryptedForeignKeys(domain: Topic): { [key: string]: Delegation[] } | undefined {
    throw new Error('Not implemented')
}

function toFormDelegations(domain: Topic): { [key: string]: Delegation[] } | undefined {
    throw new Error('Not implemented')
}

function toFormEncryptionKeys(domain: Topic): { [key: string]: Delegation[] } | undefined {
    throw new Error('Not implemented')
}

function toFormEncryptedSelf(domain: Topic): string | undefined {
    throw new Error('Not implemented')
}

function toTopicId(dto: Form): string | undefined {
    throw new Error('Not implemented')
}

function toTopicRev(dto: Form): string | undefined {
    throw new Error('Not implemented')
}

function toTopicCreated(dto: Form): number | undefined {
    throw new Error('Not implemented')
}

function toTopicModified(dto: Form): number | undefined {
    throw new Error('Not implemented')
}

function toTopicAuthor(dto: Form): string | undefined {
    throw new Error('Not implemented')
}

function toTopicResponsible(dto: Form): string | undefined {
    throw new Error('Not implemented')
}

function toTopicMedicalLocationId(dto: Form): string | undefined {
    throw new Error('Not implemented')
}

function toTopicTags(dto: Form): CodingReference[] | undefined {
    throw new Error('Not implemented')
}

function toTopicCodes(dto: Form): CodingReference[] | undefined {
    throw new Error('Not implemented')
}

function toTopicEndOfLife(dto: Form): number | undefined {
    throw new Error('Not implemented')
}

function toTopicDeletionDate(dto: Form): number | undefined {
    throw new Error('Not implemented')
}

function toTopicOpeningDate(dto: Form): number | undefined {
    throw new Error('Not implemented')
}

function toTopicExternalUuid(dto: Form): string | undefined {
    throw new Error('Not implemented')
}

function toTopicDescr(dto: Form): string | undefined {
    throw new Error('Not implemented')
}

function toTopicContactId(dto: Form): string | undefined {
    throw new Error('Not implemented')
}

function toTopicHealthElementId(dto: Form): string | undefined {
    throw new Error('Not implemented')
}

function toTopicSystemMetadata(dto: Form): SystemMetaDataEncrypted | undefined {
    throw new Error('Not implemented')
}

function toTopicActiveParticipants(dto: Form): string[] {
    throw new Error('Not implemented')
}

export function mapFormToTopic(dto: Form): Topic {
    return new Topic({
        id: toTopicId(dto),
        rev: toTopicRev(dto),
        created: toTopicCreated(dto),
        modified: toTopicModified(dto),
        author: toTopicAuthor(dto),
        responsible: toTopicResponsible(dto),
        medicalLocationId: toTopicMedicalLocationId(dto),
        tags: toTopicTags(dto),
        codes: toTopicCodes(dto),
        endOfLife: toTopicEndOfLife(dto),
        deletionDate: toTopicDeletionDate(dto),
        openingDate: toTopicOpeningDate(dto),
        externalUuid: toTopicExternalUuid(dto),
        descr: toTopicDescr(dto),
        contactId: toTopicContactId(dto),
        healthElementId: toTopicHealthElementId(dto),
        activeParticipants: toTopicActiveParticipants(dto),
        systemMetadata: toTopicSystemMetadata(dto),
    })
}

export function mapTopicToForm(domain: Topic): Form {
    return new Form({
        id: toFormId(domain),
        rev: toFormRev(domain),
        created: toFormCreated(domain),
        modified: toFormModified(domain),
        author: toFormAuthor(domain),
        responsible: toFormResponsible(domain),
        medicalLocationId: toFormMedicalLocationId(domain),
        tags: toFormTags(domain),
        codes: toFormCodes(domain),
        endOfLife: toFormEndOfLife(domain),
        deletionDate: toFormDeletionDate(domain),
        openingDate: toFormOpeningDate(domain),
        status: toFormStatus(domain),
        version: toFormVersion(domain),
        logicalUuid: toFormLogicalUuid(domain),
        descr: toFormDescr(domain),
        uniqueId: toFormUniqueId(domain),
        formTemplateId: toFormFormTemplateId(domain),
        contactId: toFormContactId(domain),
        healthElementId: toFormHealthElementId(domain),
        planOfActionId: toFormPlanOfActionId(domain),
        parent: toFormParent(domain),
        secretForeignKeys: toFormSecretForeignKeys(domain),
        cryptedForeignKeys: toFormCryptedForeignKeys(domain),
        delegations: toFormDelegations(domain),
        encryptionKeys: toFormEncryptionKeys(domain),
        encryptedSelf: toFormEncryptedSelf(domain),
    })
}
