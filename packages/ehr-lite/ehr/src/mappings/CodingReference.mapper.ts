import {createMap, forMember, ignore, mapFrom} from "@automapper/core";
import {mapper} from "./mapper";
import {CodeStub} from "@icure/api";
import {CodingReference} from "../models/CodingReference.model";

export const initializeCodingReferenceMapper = () => {
    createMap(
        mapper,
        CodeStub,
        CodingReference,
        forMember(c => c.id, mapFrom(c => c.id)),
        forMember(c => c.type, mapFrom(c => c.type)),
        forMember(c => c.code, mapFrom(c => c.code)),
        forMember(c => c.version, mapFrom(c => c.version)),
        forMember(c => c.label, mapFrom(c => !!c.label ? new Map(Object.entries(c.label)) : undefined)),
    )

    createMap(
        mapper,
        CodingReference,
        CodeStub,
        forMember(c => c.id, mapFrom(c => `${c.type ?? null}|${c.code ?? null}|${c.version ?? null}`)),
        forMember(c => c.context, ignore()),
        forMember(c => c.type, mapFrom(c => c.type)),
        forMember(c => c.code, mapFrom(c => c.code)),
        forMember(c => c.version, mapFrom(c => c.version)),
        forMember(c => c.label, mapFrom(c => !!c.label ? Object.fromEntries(c.label) : undefined)),
    )
}
