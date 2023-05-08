import {createMap, forMember, mapFrom, mapWith} from "@automapper/core";
import {mapper} from "./mapper";
import {Identifier as IdentifierEntity} from "@icure/api/icc-api/model/Identifier";
import {Identifier} from "../models/Identifier.model";
import {CodeStub} from "@icure/api";
import {CodingReference} from "../models/CodingReference.model";

export const initializeIdentifierMapper = () => {
    createMap(
        mapper,
        IdentifierEntity,
        Identifier,
        forMember(i => i.id, mapFrom(i => i.id)),
        forMember(i => i.assigner, mapFrom(i => i.assigner)),
        forMember(i => i.start, mapFrom(i => i.start)),
        forMember(i => i.end, mapFrom(i => i.end)),
        forMember(i => i.system, mapFrom(i => i.system)),
        forMember(i => i.type, mapWith(CodeStub, CodingReference, i => i.type)),
        forMember(i => i.use, mapFrom(i => i.use)),
        forMember(i => i.value, mapFrom(i => i.value)),
    )

    createMap(
        mapper,
        Identifier,
        IdentifierEntity,
        forMember(i => i.id, mapFrom(i => i.id)),
        forMember(i => i.assigner, mapFrom(i => i.assigner)),
        forMember(i => i.start, mapFrom(i => i.start)),
        forMember(i => i.end, mapFrom(i => i.end)),
        forMember(i => i.system, mapFrom(i => i.system)),
        forMember(i => i.type, mapWith(CodingReference, CodeStub, i => i.type)),
        forMember(i => i.use, mapFrom(i => i.use)),
        forMember(i => i.value, mapFrom(i => i.value)),
    )
}
