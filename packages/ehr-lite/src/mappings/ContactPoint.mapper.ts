import { ContactPoint } from '../models/ContactPoint.model'
import { Telecom } from '@icure/api'
import { createMap, forMember, mapFrom } from '@automapper/core'
import { mapper } from './mapper'

function forMember_Telecom_telecomType() {
    return forMember<ContactPoint, Telecom>(
        (v) => v.telecomType,
        mapFrom((v) => v.system)
    )
}

function forMember_Telecom_telecomNumber() {
    return forMember<ContactPoint, Telecom>(
        (v) => v.telecomNumber,
        mapFrom((v) => v.value)
    )
}

function forMember_Telecom_telecomDescription() {
    return forMember<ContactPoint, Telecom>(
        (v) => v.telecomDescription,
        mapFrom((v) => v.description)
    )
}

function forMember_Telecom_encryptedSelf() {
    return forMember<ContactPoint, Telecom>(
        (v) => v.encryptedSelf,
        mapFrom((v) => v.encryptedSelf)
    )
}

function forMember_ContactPoint_system() {
    return forMember<Telecom, ContactPoint>(
        (v) => v.system,
        mapFrom((v) => v.telecomType)
    )
}

function forMember_ContactPoint_value() {
    return forMember<Telecom, ContactPoint>(
        (v) => v.value,
        mapFrom((v) => v.telecomNumber)
    )
}

function forMember_ContactPoint_description() {
    return forMember<Telecom, ContactPoint>(
        (v) => v.description,
        mapFrom((v) => v.telecomDescription)
    )
}

function forMember_ContactPoint_encryptedSelf() {
    return forMember<Telecom, ContactPoint>(
        (v) => v.encryptedSelf,
        mapFrom((v) => v.encryptedSelf)
    )
}

export function initializeContactPointMapper() {
    createMap(mapper, ContactPoint, Telecom, forMember_Telecom_telecomType(), forMember_Telecom_telecomNumber(), forMember_Telecom_telecomDescription(), forMember_Telecom_encryptedSelf())

    createMap(mapper, Telecom, ContactPoint, forMember_ContactPoint_system(), forMember_ContactPoint_value(), forMember_ContactPoint_description(), forMember_ContactPoint_encryptedSelf())
}
