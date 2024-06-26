import 'mocha'

import { MedicalDevice } from '../..'
import { assert } from 'chai'
import { newCodingReference } from './codingReferenceTest'
import { newProperty } from './propertyTest'
import { newSystemMetaDataOwner } from './systemMetaDataOwnerTest'
import { v4 } from 'uuid'

export function newMedicalDevice(): MedicalDevice {
    return new MedicalDevice({
        id: v4(),
        rev: 'rev',
        created: 123,
        modified: 456,
        labels: [newCodingReference()],
        codes: [newCodingReference()],
        deletionDate: 789,
        name: 'name',
        author: 'author',
        responsible: 'responsible',
        endOfLife: 101112,
        externalId: 'externalId',
        type: 'type',
        brand: 'brand',
        model: 'model',
        serialNumber: 'serialNumber',
        parentId: 'parentId',
        picture: new ArrayBuffer(5),
        properties: [newProperty()],
        systemMetaData: newSystemMetaDataOwner(),
    })
}

describe('MedicalDevice model test', () => {
    it('Marshalling/Unmarshalling of MedicalDevice model - Success', () => {
        const medicalDevice = newMedicalDevice()
        const marshalledMedicalDevice = MedicalDevice.toJSON(medicalDevice)
        const unmarshalledMedicalDevice = MedicalDevice.fromJSON(JSON.parse(JSON.stringify(marshalledMedicalDevice)))
        assert.deepEqual(medicalDevice, unmarshalledMedicalDevice)
        assert.deepEqual(medicalDevice, new MedicalDevice(medicalDevice))
    })
})
