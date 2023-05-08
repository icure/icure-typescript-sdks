import {createMap, forMember, mapFrom, mapWith} from "@automapper/core";
import {mapper} from "./mapper";
import {Annotation as AnnotationEntity} from "@icure/api/icc-api/model/Annotation";
import {Annotation} from "../models/Annotation.model";
import {CodingReference} from "../models/CodingReference.model";
import {CodeStub} from "@icure/api";

export const initializeAnnotationMapper = () => {
    createMap(
        mapper,
        AnnotationEntity,
        Annotation,
        forMember(a => a.target, mapFrom(a => a.location)),
        forMember(a => a.id, mapFrom(a => a.id)),
        forMember(a => a.tags, mapWith(CodingReference, CodeStub, a => a.tags)),
        forMember(a => a.author, mapFrom(a => a.author)),
        forMember(a => a.created, mapFrom(a => a.created)),
        forMember(a => a.modified, mapFrom(a => a.modified)),
        forMember(a => a.markdown, mapFrom(a => !!a.markdown ? new Map(Object.entries(a.markdown)) : undefined)),
        forMember(a => a.confidential, mapFrom(a => a.confidential)),
        forMember(a => a.encryptedSelf, mapFrom(a => a.encryptedSelf)),
    )

    createMap(
        mapper,
        Annotation,
        AnnotationEntity,
        forMember(a => a.location, mapFrom(a => a.target)),
        forMember(a => a.id, mapFrom(a => a.id)),
        forMember(a => a.tags, mapWith(CodingReference, CodeStub, a => a.tags)),
        forMember(a => a.author, mapFrom(a => a.author)),
        forMember(a => a.created, mapFrom(a => a.created)),
        forMember(a => a.modified, mapFrom(a => a.modified)),
        forMember(a => a.markdown, mapFrom(a => !!a.markdown ? Object.fromEntries(a.markdown) : undefined)),
        forMember(a => a.confidential, mapFrom(a => a.confidential)),
        forMember(a => a.encryptedSelf, mapFrom(a => a.encryptedSelf)),
    )
}
