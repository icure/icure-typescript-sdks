import 'isomorphic-fetch'
import { getEnvironmentInitializer, hcp1Username, hcp3Username, setLocalStorage, TestUtils } from '../test-utils'
import { webcrypto } from 'crypto'
import { getEnvVariables, TestVars } from '@icure/test-setup/types'
import { TestKeyStorage, TestStorage, testStorageForUser } from '../test-storage'
import { AnonymousApiBuilder, CommonAnonymousApi, CommonApi, CryptoStrategies, DataOwnerWithType, forceUuid, NotificationTypeEnum } from '@icure/typescript-common'
import { assert } from 'chai'
import { BaseApiTestContext, WithAuthenticationApi, WithDataOwnerApi, WithHcpApi, WithMaintenanceTaskApi, WithPatientApi, WithServiceApi } from './TestContexts'
import { expectArrayContainsExactlyInAnyOrder } from '../assertions'
import { HealthcareParty, jwk2spki, User } from '@icure/api'

setLocalStorage(fetch)

export function testHcpLikeApi<
    DSAnonymousApiBuilder extends AnonymousApiBuilder<DSCryptoStrategies, DSAnonymousApi>,
    DSAnonymousApi extends CommonAnonymousApi<DSApi>,
    DSApi extends CommonApi,
    DSCryptoStrategies extends CryptoStrategies<any>,
    DSUser,
    DSHcp,
    DSPatient,
    DSDataOwner extends DataOwnerWithType,
>(name: string, ctx: BaseApiTestContext<DSAnonymousApiBuilder, DSAnonymousApi, DSApi, DSCryptoStrategies, DSUser, any> & WithPatientApi<DSApi, DSPatient> & WithHcpApi<DSApi, DSHcp> & WithDataOwnerApi<DSApi, DSDataOwner, DSUser>) {
    describe(`${name} (Hcp-like API)`, () => {
        let env: TestVars

        beforeAll(async () => {
            const initializer = await getEnvironmentInitializer()
            env = await initializer.execute(getEnvVariables())
        }, 600_000)

        it('should be capable of creating a healthcare professional from scratch', async () => {
            const { api } = await ctx.apiForEnvUser(env, hcp1Username)
            const rawKeyPair: CryptoKeyPair = await api.baseApi.cryptoApi.primitives.RSA.generateKeyPair()
            const keyPair = await api.baseApi.cryptoApi.primitives.RSA.exportKeys(rawKeyPair as { publicKey: CryptoKey; privateKey: CryptoKey }, 'jwk', 'jwk')
            const hcp = await ctx.hcpApi(api).createOrModify(
                ctx.toDSHcp(
                    new HealthcareParty({
                        name: `Med-ts-ic-test-${forceUuid()}`,
                        publicKey: jwk2spki(keyPair.publicKey),
                    }),
                ),
            )
            expect(hcp).toBeTruthy()
            const hcpDto = ctx.toHcpDto(hcp)
            expect(hcpDto.id).toBeTruthy()
            expect(forceUuid(hcpDto.id)).toEqual(hcpDto.id)
            expect(hcpDto.name).toEqual(hcpDto.name)
            let userEmail = `${forceUuid()}@med-ts-ic-test.com`
            let userPwd = `${forceUuid()}`
            const user = await ctx.userApi(api).createOrModify(
                ctx.toDSUser(
                    new User({
                        login: userEmail,
                        passwordHash: userPwd,
                        email: userEmail,
                        healthcarePartyId: hcpDto.id,
                    }),
                ),
            )
            expect(user).toBeTruthy()
            const userDto = ctx.toUserDto(user)
            expect(userDto.id).toBeTruthy()
            expect(forceUuid(userDto.id)).toEqual(userDto.id)
            expect(userDto.login).toEqual(userEmail)
            expect(userDto.email).toEqual(userEmail)
            expect(userDto.healthcarePartyId).toEqual(hcpDto.id)
            expect(userDto.passwordHash).not.toEqual(userPwd)
        })

        it('should be capable of initializing crypto of a healthcare professional from scratch', async () => {
            const { api } = await ctx.apiForEnvUser(env, hcp1Username)
            const hcp = await ctx.hcpApi(api).createOrModify(
                ctx.toDSHcp(
                    new HealthcareParty({
                        name: `Med-ts-ic-test-${forceUuid()}`,
                    }),
                ),
            )
            expect(hcp).toBeTruthy()
            const hcpId = ctx.toHcpDto(hcp).id
            let userEmail = `${forceUuid()}@med-ts-ic-test.com`
            let userPwd = forceUuid()
            const user = await ctx.userApi(api).createOrModify(
                ctx.toDSUser(
                    new User({
                        login: userEmail,
                        passwordHash: userPwd,
                        email: userEmail,
                        healthcarePartyId: hcpId,
                    }),
                ),
            )
            const userDto = ctx.toUserDto(user)
            expect(userDto.id).toBeTruthy()
            expect(userDto.login).toEqual(userEmail)
            expect(userDto.email).toEqual(userEmail)
            expect(userDto.healthcarePartyId).toEqual(hcpId)
            expect(userDto.passwordHash).not.toEqual(userPwd)
            // When HCP wants to init a RSA KeyPair
            const hcpApi = await ctx
                .newApiBuilder()
                .withICureBaseUrl(env!.iCureUrl)
                .withUserName(userEmail)
                .withPassword(userPwd)
                .withCrypto(webcrypto as any)
                .withCryptoStrategies(ctx.newSimpleCryptoStrategies())
                .build()
            // TODO coherence: dataOwnerApi methods should omit "dataOwner" from name
            const initialisedHcp = await ctx.dataOwnerApi(hcpApi).getDataOwner(userDto.healthcarePartyId!)
            expect(ctx.dataOwnerApi(hcpApi).getPublicKeysOf(initialisedHcp)).toHaveLength(1)
            // Then, HCP can create and retrievedata
            const createdPatient = await ctx.createPatient(hcpApi)
            expect(createdPatient).toBeTruthy()
            const retrievedPatient = await ctx.patientApi(hcpApi).get(ctx.toPatientDto(createdPatient).id)
            expect(retrievedPatient).toEqual(createdPatient)
        })
    })
}
