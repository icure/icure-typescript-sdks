import { SecurityMetadata } from '../../src/models/SecurityMetadata.model'
import { SecureDelegation } from '../../src/models/SecureDelegation.model'
import { AccessLevelEnum } from '../../src/models/enums/AccessLevel.enum'

describe('SecurityMetadata', () => {
    let instance: SecurityMetadata
    let json: any

    beforeEach(() => {
        instance = new SecurityMetadata({
            secureDelegations: new Map([['key1', new SecureDelegation({
                delegator: 'delegatorId',
                delegate: 'delegateId',
                secretIds: ['secret1', 'secret2'],
                encryptionKeys: ['key1', 'key2'],
                owningEntityIds: ['ownerId1', 'ownerId2'],
                parentDelegations: ['parent1', 'parent2'],
                exchangeDataId: 'exchangeId',
                encryptedExchangeDataId: new Map([['key1', 'encryptedId']]),
                permissions: AccessLevelEnum.READ
            })]]),
            keysEquivalences: new Map([['key1', 'value1']])
        })

        json = {
            secureDelegations: {'key1': {
                    delegator: 'delegatorId',
                    delegate: 'delegateId',
                    secretIds: ['secret1', 'secret2'],
                    encryptionKeys: ['key1', 'key2'],
                    owningEntityIds: ['ownerId1', 'ownerId2'],
                    parentDelegations: ['parent1', 'parent2'],
                    exchangeDataId: 'exchangeId',
                    encryptedExchangeDataId: {'key1': 'encryptedId'},
                    permissions: 'READ'
                }},
            keysEquivalences: {'key1': 'value1'}
        }
    })

    describe('toJSON', () => {
        it('should convert instance to JSON', () => {
            const result = SecurityMetadata.toJSON(instance)
            expect(result).toEqual(json)
        })
    })

    describe('fromJSON', () => {
        it('should convert JSON to instance', () => {
            const result = SecurityMetadata.fromJSON(json)
            expect(result).toEqual(instance)
        })
    })

    it('should serialize and deserialize correctly', () => {
        // Serialize the instance to JSON
        const serialized = SecurityMetadata.toJSON(instance)

        // Deserialize the JSON back to an instance
        const deserialized = SecurityMetadata.fromJSON(serialized)

        // Verify that the original instance and the new instance are equal
        expect(deserialized).toEqual(instance)
    })
})
