import { Coding } from "../models/Coding.model"
import { Code } from "@icure/api"
import {createMap, forMember, ignore, mapFrom} from "@automapper/core"
import { mapper } from "./mapper"
import {convertMapOfArrayOfGenericToObject, convertObjectToMapOfArrayOfGeneric} from "../utils/Metadata.utils";

function forMember_Code_id() {
    return forMember<Coding, Code>(v => v.id, mapFrom(c => `${c.type}|${c.code}|${c.version}`))
}

function forMember_Code_rev() {
    return forMember<Coding, Code>(v => v.rev, mapFrom(c => c.rev))
}

function forMember_Code_deletionDate() {
    return forMember<Coding, Code>(v => v.deletionDate, ignore())
}

function forMember_Code_context() {
    return forMember<Coding, Code>(v => v.context, ignore())
}

function forMember_Code_type() {
    return forMember<Coding, Code>(v => v.type, mapFrom(c => c.type))
}

function forMember_Code_code() {
    return forMember<Coding, Code>(v => v.code, mapFrom(c => c.code))
}

function forMember_Code_version() {
    return forMember<Coding, Code>(v => v.version, mapFrom(c => c.version))
}

function forMember_Code_label() {
    return forMember<Coding, Code>(v => v.label, mapFrom(c => c.description))
}

function forMember_Code_author() {
    return forMember<Coding, Code>(v => v.author, ignore())
}

function forMember_Code_regions() {
    return forMember<Coding, Code>(v => v.regions, mapFrom(c => c.regions))
}

function forMember_Code_periodicity() {
    return forMember<Coding, Code>(v => v.periodicity, ignore())
}

function forMember_Code_level() {
    return forMember<Coding, Code>(v => v.level, ignore())
}

function forMember_Code_links() {
    return forMember<Coding, Code>(v => v.links, ignore())
}

function forMember_Code_qualifiedLinks() {
    return forMember<Coding, Code>(v => v.qualifiedLinks, mapFrom(c => convertMapOfArrayOfGenericToObject(c.qualifiedLinks, (t)=> t)))
}

function forMember_Code_flags() {
    return forMember<Coding, Code>(v => v.flags, ignore())
}

function forMember_Code_searchTerms() {
    return forMember<Coding, Code>(v => v.searchTerms, mapFrom(c => Object.fromEntries([...c.searchTerms.entries()].map(([k, v]) => [k, Array.from(v)]))))
}

function forMember_Code_data() {
    return forMember<Coding, Code>(v => v.data, ignore())
}

function forMember_Code_appendices() {
    return forMember<Coding, Code>(v => v.appendices, ignore())
}

function forMember_Code_disabled() {
    return forMember<Coding, Code>(v => v.disabled, ignore())
}

function forMember_Coding_id() {
    return forMember<Code, Coding>(v => v.id, mapFrom(c => `${c.type}|${c.code}|${c.version}`))
}

function forMember_Coding_rev() {
    return forMember<Code, Coding>(v => v.rev, mapFrom(c => c.rev))
}

function forMember_Coding_type() {
    return forMember<Code, Coding>(v => v.type, mapFrom(c => c.type))
}

function forMember_Coding_code() {
    return forMember<Code, Coding>(v => v.code, mapFrom(c => c.code))
}

function forMember_Coding_version() {
    return forMember<Code, Coding>(v => v.version, mapFrom(c => c.version))
}

function forMember_Coding_regions() {
    return forMember<Code, Coding>(v => v.regions, mapFrom(c => c.regions))
}

function forMember_Coding_description() {
    return forMember<Code, Coding>(v => v.description, mapFrom(c => c.label))
}

function forMember_Coding_qualifiedLinks() {
    return forMember<Code, Coding>(v => v.qualifiedLinks, mapFrom(c => !!c.qualifiedLinks ? convertObjectToMapOfArrayOfGeneric(c.qualifiedLinks, (t)=> t) : undefined))
}

function forMember_Coding_searchTerms() {
    return forMember<Code, Coding>(v => v.searchTerms, mapFrom(c => !!c.searchTerms ? Object.fromEntries([...Object.entries(c.searchTerms)].map(([k, v]) => [k, new Set(v)])) : undefined))
}

export function initializeCodingMapper() {
    createMap(mapper, Coding, Code, forMember_Code_id(), forMember_Code_rev(), forMember_Code_deletionDate(), forMember_Code_context(), forMember_Code_type(), forMember_Code_code(), forMember_Code_version(), forMember_Code_label(), forMember_Code_author(), forMember_Code_regions(), forMember_Code_periodicity(), forMember_Code_level(), forMember_Code_links(), forMember_Code_qualifiedLinks(), forMember_Code_flags(), forMember_Code_searchTerms(), forMember_Code_data(), forMember_Code_appendices(), forMember_Code_disabled())

    createMap(mapper, Code, Coding, forMember_Coding_id(), forMember_Coding_rev(), forMember_Coding_type(), forMember_Coding_code(), forMember_Coding_version(), forMember_Coding_regions(), forMember_Coding_description(), forMember_Coding_qualifiedLinks(), forMember_Coding_searchTerms())
}

export function mapCodeToCoding(entity: Code): Coding {
    return mapper.map(entity, Code, Coding)
}

export function mapCodingToCode(model: Coding): Code {
    return mapper.map(model, Coding, Code)
}
