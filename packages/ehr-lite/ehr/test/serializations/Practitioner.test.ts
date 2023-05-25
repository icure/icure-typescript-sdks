import {Practitioner} from '../../src/models/Practitioner.model'
import {GenderEnum} from '../../src/models/enums/Gender.enum'
import {generateIdentifier} from './Identifier.test'
import {generateCodingReference} from './CodingReference.test'
import {generateHumanName} from './HumanName.test'
import {generateLocation} from './Location.test'
import {generateProperty} from './Property.test'
import {generateSystemMetaDataOwner} from './SystemMetaDataOwner.test'

export function generatePractitioner(): Practitioner {
    const practitioner = {
        id: 'dummyId',
        rev: 'dummyRev',
        created: Date.now(),
        modified: Date.now(),
        identifiers: [generateIdentifier()],
        tags: [generateCodingReference()],
        codes: [generateCodingReference()],
        deletionDate: null,
        name: 'dummyName',
        lastName: 'dummyLastName',
        firstName: 'dummyFirstName',
        names: [generateHumanName()],
        gender: GenderEnum.unknown,
        civility: 'Mr.',
        speciality: 'dummySpeciality',
        parentId: 'dummyParentId',
        userId: 'dummyUserId',
        addresses: [generateLocation()],
        languages: ['English'],
        picture: new ArrayBuffer(8),
        specialityCodes: [generateCodingReference()],
        description: 'dummyDescription',
        properties: [generateProperty(), generateProperty()],
        systemMetaData: generateSystemMetaDataOwner(),
    }

    return new Practitioner(practitioner)
}

describe(`Practitioner serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generatePractitioner()

        const json = Practitioner.toJSON(instance)
        const newInstance = Practitioner.fromJSON(json)

        expect(newInstance).toEqual(instance)
    })
})
