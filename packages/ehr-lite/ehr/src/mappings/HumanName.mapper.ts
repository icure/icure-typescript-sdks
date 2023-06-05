import { HumanName } from "../models/HumanName.model"
import { PersonName } from "@icure/api"
import {createMap, forMember, mapFrom} from "@automapper/core"
import { mapper } from "./mapper"

function forMember_PersonName_lastName() {
    return forMember<HumanName, PersonName>(v => v.lastName, mapFrom(v => v.lastName))
}

function forMember_PersonName_firstNames() {
    return forMember<HumanName, PersonName>(v => v.firstNames, mapFrom(v => v.firstNames))
}

function forMember_PersonName_start() {
    return forMember<HumanName, PersonName>(v => v.start, mapFrom(v => v.start))
}

function forMember_PersonName_end() {
    return forMember<HumanName, PersonName>(v => v.end, mapFrom(v => v.end))
}

function forMember_PersonName_prefix() {
    return forMember<HumanName, PersonName>(v => v.prefix, mapFrom(v => v.prefix))
}

function forMember_PersonName_suffix() {
    return forMember<HumanName, PersonName>(v => v.suffix, mapFrom(v => v.suffix))
}

function forMember_PersonName_text() {
    return forMember<HumanName, PersonName>(v => v.text, mapFrom(v => v.text))
}

function forMember_PersonName_use() {
    return forMember<HumanName, PersonName>(v => v.use, mapFrom(v => v.use))
}

function forMember_HumanName_lastName() {
    return forMember<PersonName, HumanName>(v => v.lastName, mapFrom(v => v.lastName))
}

function forMember_HumanName_firstNames() {
    return forMember<PersonName, HumanName>(v => v.firstNames, mapFrom(v => v.firstNames))
}

function forMember_HumanName_start() {
    return forMember<PersonName, HumanName>(v => v.start, mapFrom(v => v.start))
}

function forMember_HumanName_end() {
    return forMember<PersonName, HumanName>(v => v.end, mapFrom(v => v.end))
}

function forMember_HumanName_prefix() {
    return forMember<PersonName, HumanName>(v => v.prefix, mapFrom(v => v.prefix))
}

function forMember_HumanName_suffix() {
    return forMember<PersonName, HumanName>(v => v.suffix, mapFrom(v => v.suffix))
}

function forMember_HumanName_text() {
    return forMember<PersonName, HumanName>(v => v.text, mapFrom(v => v.text))
}

function forMember_HumanName_use() {
    return forMember<PersonName, HumanName>(v => v.use, mapFrom(v => v.use))
}

export function initializeHumanNameMapper() {
    createMap(mapper, HumanName, PersonName, forMember_PersonName_lastName(), forMember_PersonName_firstNames(), forMember_PersonName_start(), forMember_PersonName_end(), forMember_PersonName_prefix(), forMember_PersonName_suffix(), forMember_PersonName_text(), forMember_PersonName_use())

    createMap(mapper, PersonName, HumanName, forMember_HumanName_lastName(), forMember_HumanName_firstNames(), forMember_HumanName_start(), forMember_HumanName_end(), forMember_HumanName_prefix(), forMember_HumanName_suffix(), forMember_HumanName_text(), forMember_HumanName_use())
}
