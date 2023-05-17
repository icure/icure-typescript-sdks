import { Measure } from '../../src/models/Measure.model'

describe('Measure', () => {
    let instance: Measure
    let json: any

    beforeEach(() => {
        instance = new Measure({
            value: 10,
            min: 5,
            max: 15,
            ref: 12,
            severity: 2,
            severityCode: 'S',
            evolution: 1,
            unit: 'kg',
            unitCodes: [
                {
                    id: "1",
                    type: "test_type",
                    version: "v1"
                }
            ],
            comment: 'test comment',
            comparator: '='
        })

        json = {
            value: 10,
            min: 5,
            max: 15,
            ref: 12,
            severity: 2,
            severityCode: 'S',
            evolution: 1,
            unit: 'kg',
            unitCodes: [
                {
                    id: "1",
                    type: "test_type",
                    version: "v1"
                }
            ],
            comment: 'test comment',
            comparator: '='
        }
    })

    describe('toJSON', () => {
        it('should convert instance to JSON', () => {
            const result = Measure.toJSON(instance)
            expect(result).toEqual(json)
        })
    })

    describe('fromJSON', () => {
        it('should convert JSON to instance', () => {
            const result = Measure.fromJSON(json)
            expect(result).toEqual(instance)
        })
    })

    it('should serialize and deserialize correctly', () => {
        // Serialize the instance to JSON
        const serialized = Measure.toJSON(instance)

        // Deserialize the JSON back to an instance
        const deserialized = Measure.fromJSON(serialized)

        // Verify that the original instance and the new instance are equal
        expect(deserialized).toEqual(instance)
    })
})
