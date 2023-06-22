import {createMap, forMember, ignore, mapFrom, Mapper, mapWith} from '@automapper/core'
import { Annotation as AnnotationDto } from '@icure/api/icc-api/model/Annotation'
import { Annotation } from '../models/Annotation.model'
import { CodeStub } from '@icure/api'
import {CodingReference} from "../models/CodingReference.model";

function forMember_AnnotationDto_id() {
    return forMember<Annotation, AnnotationDto>(
        (v) => v.id,
        mapFrom((v) => v.id)
    )
}

function forMember_AnnotationDto_author() {
    return forMember<Annotation, AnnotationDto>(
        (v) => v.author,
        mapFrom((v) => v.author)
    )
}

function forMember_AnnotationDto_created() {
    return forMember<Annotation, AnnotationDto>(
        (v) => v.created,
        mapFrom((v) => v.created)
    )
}

function forMember_AnnotationDto_modified() {
    return forMember<Annotation, AnnotationDto>(
        (v) => v.modified,
        mapFrom((v) => v.modified)
    )
}

function forMember_AnnotationDto_text() {
    return forMember<Annotation, AnnotationDto>((v) => v.text, ignore())
}

function forMember_AnnotationDto_markdown() {
    return forMember<Annotation, AnnotationDto>(
        (v) => v.markdown,
        mapFrom((a) => (!!a.markdown ? Object.fromEntries(a.markdown) : undefined))
    )
}

function forMember_AnnotationDto_confidential() {
    return forMember<Annotation, AnnotationDto>(
        (v) => v.confidential,
        mapFrom((v) => v.confidential)
    )
}

function forMember_AnnotationDto_tags() {
    return forMember<Annotation, AnnotationDto>(
        (v) => v.tags,
        mapWith(CodeStub, CodingReference, (a) => a.tags)
    )
}

function forMember_AnnotationDto_location() {
    return forMember<Annotation, AnnotationDto>(
        (v) => v.location,
        mapFrom((v) => v.target)
    )
}

function forMember_AnnotationDto_encryptedSelf() {
    return forMember<Annotation, AnnotationDto>(
        (v) => v.encryptedSelf,
        mapFrom((v) => v.encryptedSelf)
    )
}

function forMember_Annotation_id() {
    return forMember<AnnotationDto, Annotation>(
        (v) => v.id,
        mapFrom((v) => v.id)
    )
}

function forMember_Annotation_tags() {
    return forMember<AnnotationDto, Annotation>(
        (v) => v.tags,
        mapWith(CodingReference, CodeStub, (a) => a.tags)
    )
}

function forMember_Annotation_author() {
    return forMember<AnnotationDto, Annotation>(
        (v) => v.author,
        mapFrom((v) => v.author)
    )
}

function forMember_Annotation_created() {
    return forMember<AnnotationDto, Annotation>(
        (v) => v.created,
        mapFrom((v) => v.created)
    )
}

function forMember_Annotation_modified() {
    return forMember<AnnotationDto, Annotation>(
        (v) => v.modified,
        mapFrom((v) => v.modified)
    )
}

function forMember_Annotation_markdown() {
    return forMember<AnnotationDto, Annotation>(
        (v) => v.markdown,
        mapFrom((a) => (!!a.markdown ? new Map(Object.entries(a.markdown)) : undefined))
    )
}

function forMember_Annotation_target() {
    return forMember<AnnotationDto, Annotation>(
        (v) => v.target,
        mapFrom((v) => v.location)
    )
}

function forMember_Annotation_confidential() {
    return forMember<AnnotationDto, Annotation>(
        (v) => v.confidential,
        mapFrom((v) => v.confidential)
    )
}

function forMember_Annotation_encryptedSelf() {
    return forMember<AnnotationDto, Annotation>(
        (v) => v.encryptedSelf,
        mapFrom((v) => v.encryptedSelf)
    )
}

export function initializeAnnotationMapper(mapper: Mapper) {
    createMap(mapper, Annotation, AnnotationDto, forMember_AnnotationDto_id(), forMember_AnnotationDto_author(), forMember_AnnotationDto_created(), forMember_AnnotationDto_modified(), forMember_AnnotationDto_text(), forMember_AnnotationDto_markdown(), forMember_AnnotationDto_confidential(), forMember_AnnotationDto_tags(), forMember_AnnotationDto_location(), forMember_AnnotationDto_encryptedSelf())

    createMap(mapper, AnnotationDto, Annotation, forMember_Annotation_id(), forMember_Annotation_tags(), forMember_Annotation_author(), forMember_Annotation_created(), forMember_Annotation_modified(), forMember_Annotation_markdown(), forMember_Annotation_target(), forMember_Annotation_confidential(), forMember_Annotation_encryptedSelf())
}
