import {HumanName} from '../../src/models/HumanName.model'
import {HumanNameUseEnum} from '../../src/models/enums/HumanNameUse.enum'

export function generateHumanName(): HumanName {
    const humanName = {
        lastName: 'Doe',
        firstNames: ['John'],
        start: 1621845600, // Exemple de timestamp UNIX
        end: 1621845600, // Exemple de timestamp UNIX
        prefix: ['Mr.'],
        suffix: ['Jr.'],
        text: 'John Doe',
        use: HumanNameUseEnum.official,
    }

    return new HumanName(humanName)
}

describe(`HumanName serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateHumanName()

        const json = HumanName.toJSON(instance)
        const newInstance = HumanName.fromJSON(json)

        expect(newInstance).toEqual(instance)
    })
})
