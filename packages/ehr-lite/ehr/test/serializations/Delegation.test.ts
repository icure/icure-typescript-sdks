import { Delegation } from '../../src/models/Delegation.model'

describe('Delegation', () => {
    let instance: Delegation
    let json: any

    beforeEach(() => {
        instance = new Delegation({
            owner: 'owner1',
            delegateTo: 'delegateTo1',
            key: 'key1'
        })

        json = {
            owner: 'owner1',
            delegateTo: 'delegateTo1',
            key: 'key1'
        }
    })

    describe('toJSON', () => {
        it('should convert instance to JSON', () => {
            const result = Delegation.toJSON(instance)
            expect(result).toEqual(json)
        })
    })

    describe('fromJSON', () => {
        it('should convert JSON to instance', () => {
            const result = Delegation.fromJSON(json)
            expect(result).toEqual(instance)
        })
    })

    it('should serialize and deserialize correctly', () => {
        // Serialize the instance to JSON
        const serialized = Delegation.toJSON(instance)

        // Deserialize the JSON back to an instance
        const deserialized = Delegation.fromJSON(serialized)

        // Verify that the original instance and the new instance are equal
        expect(deserialized).toEqual(instance)
    })
})
