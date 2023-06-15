import { Location } from '../models/Location.model'
import { Address, Annotation as AnnotationEntity, Telecom } from '@icure/api'
import { createMap, forMember, ignore, mapFrom, mapWith } from '@automapper/core'
import { mapper } from './mapper'
import { Annotation } from '../models/Annotation.model'
import { ContactPoint } from '../models/ContactPoint.model'

function forMember_Address_addressType() {
    return forMember<Location, Address>(
        (v) => v.addressType,
        mapFrom((v) => v.addressType)
    )
}

function forMember_Address_descr() {
    return forMember<Location, Address>(
        (v) => v.descr,
        mapFrom((v) => v.description)
    )
}

function forMember_Address_street() {
    return forMember<Location, Address>(
        (v) => v.street,
        mapFrom((v) => v.street)
    )
}

function forMember_Address_houseNumber() {
    return forMember<Location, Address>(
        (v) => v.houseNumber,
        mapFrom((v) => v.houseNumber)
    )
}

function forMember_Address_postboxNumber() {
    return forMember<Location, Address>(
        (v) => v.postboxNumber,
        mapFrom((v) => v.postboxNumber)
    )
}

function forMember_Address_postalCode() {
    return forMember<Location, Address>(
        (v) => v.postalCode,
        mapFrom((v) => v.postalCode)
    )
}

function forMember_Address_city() {
    return forMember<Location, Address>(
        (v) => v.city,
        mapFrom((v) => v.city)
    )
}

function forMember_Address_state() {
    return forMember<Location, Address>(
        (v) => v.state,
        mapFrom((v) => v.state)
    )
}

function forMember_Address_country() {
    return forMember<Location, Address>(
        (v) => v.country,
        mapFrom((v) => v.country)
    )
}

function forMember_Address_note() {
    return forMember<Location, Address>((v) => v.note, ignore())
}

function forMember_Address_notes() {
    return forMember<Location, Address>(
        (v) => v.notes,
        mapWith(AnnotationEntity, Annotation, (v) => v.notes)
    )
}

function forMember_Address_telecoms() {
    return forMember<Location, Address>(
        (v) => v.telecoms,
        mapWith(Telecom, ContactPoint, (v) => v.telecoms)
    )
}

function forMember_Address_encryptedSelf() {
    return forMember<Location, Address>(
        (v) => v.encryptedSelf,
        mapFrom((v) => v.encryptedSelf)
    )
}

function forMember_Location_addressType() {
    return forMember<Address, Location>(
        (v) => v.addressType,
        mapFrom((v) => v.addressType)
    )
}

function forMember_Location_description() {
    return forMember<Address, Location>(
        (v) => v.description,
        mapFrom((v) => v.descr)
    )
}

function forMember_Location_street() {
    return forMember<Address, Location>(
        (v) => v.street,
        mapFrom((v) => v.street)
    )
}

function forMember_Location_houseNumber() {
    return forMember<Address, Location>(
        (v) => v.houseNumber,
        mapFrom((v) => v.houseNumber)
    )
}

function forMember_Location_postboxNumber() {
    return forMember<Address, Location>(
        (v) => v.postboxNumber,
        mapFrom((v) => v.postboxNumber)
    )
}

function forMember_Location_postalCode() {
    return forMember<Address, Location>(
        (v) => v.postalCode,
        mapFrom((v) => v.postalCode)
    )
}

function forMember_Location_city() {
    return forMember<Address, Location>(
        (v) => v.city,
        mapFrom((v) => v.city)
    )
}

function forMember_Location_state() {
    return forMember<Address, Location>(
        (v) => v.state,
        mapFrom((v) => v.state)
    )
}

function forMember_Location_country() {
    return forMember<Address, Location>(
        (v) => v.country,
        mapFrom((v) => v.country)
    )
}

function forMember_Location_notes() {
    return forMember<Address, Location>(
        (v) => v.notes,
        mapWith(Annotation, AnnotationEntity, (v) => v.notes)
    )
}

function forMember_Location_telecoms() {
    return forMember<Address, Location>(
        (v) => v.telecoms,
        mapWith(ContactPoint, Telecom, (v) => v.telecoms)
    )
}

function forMember_Location_encryptedSelf() {
    return forMember<Address, Location>(
        (v) => v.encryptedSelf,
        mapFrom((v) => v.encryptedSelf)
    )
}

export function initializeLocationMapper() {
    createMap(mapper, Location, Address, forMember_Address_addressType(), forMember_Address_descr(), forMember_Address_street(), forMember_Address_houseNumber(), forMember_Address_postboxNumber(), forMember_Address_postalCode(), forMember_Address_city(), forMember_Address_state(), forMember_Address_country(), forMember_Address_note(), forMember_Address_notes(), forMember_Address_telecoms(), forMember_Address_encryptedSelf())

    createMap(mapper, Address, Location, forMember_Location_addressType(), forMember_Location_description(), forMember_Location_street(), forMember_Location_houseNumber(), forMember_Location_postboxNumber(), forMember_Location_postalCode(), forMember_Location_city(), forMember_Location_state(), forMember_Location_country(), forMember_Location_notes(), forMember_Location_telecoms(), forMember_Location_encryptedSelf())
}

export function mapAddressToLocation(entity: Address): Location {
    return mapper.map(entity, Address, Location)
}

export function mapLocationToAddress(model: Location): Address {
    return mapper.map(model, Location, Address)
}
