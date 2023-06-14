import { createMap, forMember, ignore, mapFrom, mapWith } from '@automapper/core'
import { mapper } from './mapper'
import { Annotation as AnnotationEntity } from '@icure/api/icc-api/model/Annotation'
import { Annotation } from '../models/Annotation.model'
import { CodingReference } from '../models/CodingReference.model'
import { CodeStub } from '@icure/api'

function forMember_AnnotationEntity_id() {
    return forMember<Annotation, AnnotationEntity>(
        (v) => v.id,
        mapFrom((v) => v.id)
    )
}

function forMember_AnnotationEntity_author() {
    return forMember<Annotation, AnnotationEntity>(
        (v) => v.author,
        mapFrom((v) => v.author)
    )
}

function forMember_AnnotationEntity_created() {
    return forMember<Annotation, AnnotationEntity>(
        (v) => v.created,
        mapFrom((v) => v.created)
    )
}

function forMember_AnnotationEntity_modified() {
    return forMember<Annotation, AnnotationEntity>(
        (v) => v.modified,
        mapFrom((v) => v.modified)
    )
}

function forMember_AnnotationEntity_text() {
    return forMember<Annotation, AnnotationEntity>((v) => v.text, ignore())
}

function forMember_AnnotationEntity_markdown() {
    return forMember<Annotation, AnnotationEntity>(
        (v) => v.markdown,
        mapFrom((a) => (!!a.markdown ? Object.fromEntries(a.markdown) : undefined))
    )
}

function forMember_AnnotationEntity_confidential() {
    return forMember<Annotation, AnnotationEntity>(
        (v) => v.confidential,
        mapFrom((v) => v.confidential)
    )
}

function forMember_AnnotationEntity_tags() {
    return forMember<Annotation, AnnotationEntity>(
        (v) => v.tags,
        mapWith(CodeStub, CodingReference, (a) => a.tags)
    )
}

function forMember_AnnotationEntity_location() {
    return forMember<Annotation, AnnotationEntity>(
        (v) => v.location,
        mapFrom((v) => v.target)
    )
}

function forMember_AnnotationEntity_encryptedSelf() {
    return forMember<Annotation, AnnotationEntity>(
        (v) => v.encryptedSelf,
        mapFrom((v) => v.encryptedSelf)
    )
}

function forMember_Annotation_id() {
    return forMember<AnnotationEntity, Annotation>(
        (v) => v.id,
        mapFrom((v) => v.id)
    )
}

function forMember_Annotation_tags() {
    return forMember<AnnotationEntity, Annotation>(
        (v) => v.tags,
        mapWith(CodingReference, CodeStub, (a) => a.tags)
    )
}

function forMember_Annotation_author() {
    return forMember<AnnotationEntity, Annotation>(
        (v) => v.author,
        mapFrom((v) => v.author)
    )
}

function forMember_Annotation_created() {
    return forMember<AnnotationEntity, Annotation>(
        (v) => v.created,
        mapFrom((v) => v.created)
    )
}

function forMember_Annotation_modified() {
    return forMember<AnnotationEntity, Annotation>(
        (v) => v.modified,
        mapFrom((v) => v.modified)
    )
}

function forMember_Annotation_markdown() {
    return forMember<AnnotationEntity, Annotation>(
        (v) => v.markdown,
        mapFrom((a) => (!!a.markdown ? new Map(Object.entries(a.markdown)) : undefined))
    )
}

function forMember_Annotation_target() {
    return forMember<AnnotationEntity, Annotation>(
        (v) => v.target,
        mapFrom((v) => v.location)
    )
}

function forMember_Annotation_confidential() {
    return forMember<AnnotationEntity, Annotation>(
        (v) => v.confidential,
        mapFrom((v) => v.confidential)
    )
}

function forMember_Annotation_encryptedSelf() {
    return forMember<AnnotationEntity, Annotation>(
        (v) => v.encryptedSelf,
        mapFrom((v) => v.encryptedSelf)
    )
}

export function initializeAnnotationMapper() {
    createMap(
        mapper,
        Annotation,
        AnnotationEntity,
        forMember_AnnotationEntity_id(),
        forMember_AnnotationEntity_author(),
        forMember_AnnotationEntity_created(),
        forMember_AnnotationEntity_modified(),
        forMember_AnnotationEntity_text(),
        forMember_AnnotationEntity_markdown(),
        forMember_AnnotationEntity_confidential(),
        forMember_AnnotationEntity_tags(),
        forMember_AnnotationEntity_location(),
        forMember_AnnotationEntity_encryptedSelf()
    )

    createMap(
        mapper,
        AnnotationEntity,
        Annotation,
        forMember_Annotation_id(),
        forMember_Annotation_tags(),
        forMember_Annotation_author(),
        forMember_Annotation_created(),
        forMember_Annotation_modified(),
        forMember_Annotation_markdown(),
        forMember_Annotation_target(),
        forMember_Annotation_confidential(),
        forMember_Annotation_encryptedSelf()
    )
}
