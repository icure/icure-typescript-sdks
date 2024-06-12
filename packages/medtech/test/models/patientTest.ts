import 'mocha'

import { Patient } from '../..'
import { assert } from 'chai'
import { newAddress } from './addressTest'
import { newCodingReference } from './codingReferenceTest'
import { newPersonName } from './personNameTest'
import { newPatientHealthCareParty } from './patientHealthCarePartyTest'
import { newPartnership } from './partnershipTest'
import { newSystemMetaDataOwnerEncrypted } from './systemMetaDataOwnerEncryptedTest'
import { newProperty } from './propertyTest'
import { mapOf } from '@icure/typescript-common'

export function newPatient(): Patient {
    return new Patient({
        id: 'id',
        rev: 'rev',
        created: 123,
        modified: 456,
        labels: ([newCodingReference()]),
        codes: ([newCodingReference()]),
        deletionDate: 789,
        lastName: 'lastName',
        firstName: 'firstName',
        names: [newPersonName()],
        gender: 'male',
        author: 'author',
        responsible: 'responsible',
        endOfLife: 101112,
        companyName: 'companyName',
        addresses: [newAddress()],
        languages: ['languages'],
        picture: new ArrayBuffer(5),
        civility: 'civility',
        birthSex: 'male',
        mergeToPatientId: 'mergeToPatientId',
        mergedIds: (['mergedIds']),
        alias: 'alias',
        active: true,
        deactivationReason: 'deceased',
        deactivationDate: 131415,
        ssin: 'ssin',
        maidenName: 'maidenName',
        spouseName: 'spouseName',
        partnerName: 'partnerName',
        personalStatus: 'married',
        dateOfBirth: 131415,
        dateOfDeath: 161718,
        placeOfBirth: 'placeOfBirth',
        placeOfDeath: 'placeOfDeath',
        deceased: true,
        education: 'education',
        profession: 'profession',
        note: 'note',
        administrativeNote: 'administrativeNote',
        nationality: 'nationality',
        race: 'race',
        ethnicity: 'ethnicity',
        externalId: 'externalId',
        partnerships: [newPartnership()],
        patientHealthCareParties: [newPatientHealthCareParty()],
        patientProfessions: [newCodingReference()],
        parameters: mapOf({ key: ['parameters'] }),
        properties: ([newProperty()]),
        systemMetaData: newSystemMetaDataOwnerEncrypted(),
    })
}

describe('Patient model test', () => {
    it('Marshalling/Unmarshalling of Patient model - Success', () => {
        const patient = newPatient()
        const marshalledPatient = Patient.toJSON(patient)
        const unmarshalledPatient = Patient.fromJSON(JSON.parse(JSON.stringify(marshalledPatient)))
        assert.deepEqual(patient, unmarshalledPatient)
        assert.deepEqual(patient, new Patient(patient))
    })
})
