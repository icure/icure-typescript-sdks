import {LocalComponent} from "../../src/models/LocalComponent.model";

describe('LocalComponent', () => {
    let instance: LocalComponent
    let json: any

    beforeEach(() => {
        instance = new LocalComponent({
            stringValue: "test",
            documentId: "1234"
        })

        json = {
            stringValue: "test",
            documentId: "1234"
        }
    })

    describe('toJSON', () => {
        it('should convert instance to JSON', () => {
            const result = LocalComponent.toJSON(instance)
            expect(result).toEqual(json)
        })
    })

    describe('fromJSON', () => {
        it('should convert JSON to instance', () => {
            const result = LocalComponent.fromJSON(json)
            expect(result).toEqual(instance)
        })
    })

    it('should serialize and deserialize correctly', () => {
        // Serialize the instance to JSON
        const serialized = LocalComponent.toJSON(instance)

        // Deserialize the JSON back to an instance
        const deserialized = LocalComponent.fromJSON(serialized)

        // Verify that the original instance and the new instance are equal
        expect(deserialized).toEqual(instance)
    })
})
