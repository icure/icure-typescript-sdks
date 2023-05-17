import { SecureDelegation } from '../../src/models/SecureDelegation.model'
import { AccessLevelEnum } from '../../src/models/enums/AccessLevel.enum'
describe('SecureDelegation', () => {
    let instance: SecureDelegation
    let json: any

    beforeEach(() => {
        instance = new SecureDelegation({
            delegator: 'delegatorId',
            delegate: 'delegateId',
            secretIds: ['secret1', 'secret2'],
            encryptionKeys: ['key1', 'key2'],
            owningEntityIds: ['ownerId1', 'ownerId2'],
            parentDelegations: ['parent1', 'parent2'],
            exchangeDataId: 'exchangeId',
            encryptedExchangeDataId: new Map([['key1', 'encryptedId']]),
            permissions: AccessLevelEnum.READ
        })

        json = {
            delegator: 'delegatorId',
            delegate: 'delegateId',
            secretIds: ['secret1', 'secret2'],
            encryptionKeys: ['key1', 'key2'],
            owningEntityIds: ['ownerId1', 'ownerId2'],
            parentDelegations: ['parent1', 'parent2'],
            exchangeDataId: 'exchangeId',
            encryptedExchangeDataId: {'key1': 'encryptedId'},
            permissions: 'READ'
        }
    })

    describe('toJSON', () => {
        it('should convert instance to JSON', () => {
            const result = SecureDelegation.toJSON(instance)
            expect(result).toEqual(json)
        })
    })

    describe('fromJSON', () => {
        it('should convert JSON to instance', () => {
            const result = SecureDelegation.fromJSON(json)
            expect(result).toEqual(instance)
        })
    })

    it('should serialize and deserialize correctly', () => {
        // Serialize the instance to JSON
        const serialized = SecureDelegation.toJSON(instance)

        // Deserialize the JSON back to an instance
        const deserialized = SecureDelegation.fromJSON(serialized)

        // Verify that the original instance and the new instance are equal
        expect(deserialized).toEqual(instance)
    })
})
