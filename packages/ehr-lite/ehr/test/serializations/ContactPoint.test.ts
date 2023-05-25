import {ContactPoint} from '../../src/models/ContactPoint.model'
import {ContactPointTelecomTypeEnum} from '../../src/models/enums/ContactPointTelecomType.enum'

export function generateContactPoint(): ContactPoint {
    const contactPoint = {
        system: ContactPointTelecomTypeEnum.phone,
        value: 'sample@example.com',
        description: 'Sample contact point description',
        encryptedSelf: 'sampleEncryptedSelf',
    }

    return new ContactPoint(contactPoint)
}

describe(`ContactPoint serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateContactPoint()

        const json = ContactPoint.toJSON(instance)
        const newInstance = ContactPoint.fromJSON(json)

        expect(newInstance).toEqual(instance)
    })
})
