import 'mocha'

import { PatientHealthCareParty } from '../../src/models/PatientHealthCareParty.model'
import { assert } from 'chai'

export function newPatientHealthCareParty(): PatientHealthCareParty {
  return new PatientHealthCareParty({
    type: 'doctor',
    healthcarePartyId: 'healthcarePartyId',
  })
}

describe('PatientHealthCareParty model test', () => {
  it('Marshalling/Unmarshalling of PatientHealthCareParty model - Success', () => {
    const patientHealthCareParty = newPatientHealthCareParty()
    const marshalledPatientHealthCareParty = PatientHealthCareParty.toJSON(patientHealthCareParty)
    const unmarshalledPatientHealthCareParty = new PatientHealthCareParty(JSON.parse(JSON.stringify(marshalledPatientHealthCareParty)))
    assert.deepEqual(patientHealthCareParty, unmarshalledPatientHealthCareParty)
    assert.deepEqual(patientHealthCareParty, new PatientHealthCareParty(patientHealthCareParty))
  })
})
