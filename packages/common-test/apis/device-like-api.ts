import { AnonymousApiBuilder, CommonAnonymousApi, CommonApi, CryptoStrategies, DeviceFilter, forceUuid } from '@icure/typescript-common'
import { BaseApiTestContext, WithDeviceApi } from './TestContexts'
import { getEnvironmentInitializer, hcp1Username, setLocalStorage } from '../test-utils'
import { getEnvVariables, TestVars } from '@icure/test-setup/types'
import { Device, sleep } from '@icure/api'
import 'isomorphic-fetch'
import { doXOnYAndSubscribe } from '../websocket-utils'

setLocalStorage(fetch)

export function testDeviceLikeApi<DSAnonymousApiBuilder extends AnonymousApiBuilder<DSCryptoStrategies, DSAnonymousApi>, DSAnonymousApi extends CommonAnonymousApi<DSApi>, DSApi extends CommonApi, DSCryptoStrategies extends CryptoStrategies<any>, DSUser, DSDevice>(
    ctx: BaseApiTestContext<DSAnonymousApiBuilder, DSAnonymousApi, DSApi, DSCryptoStrategies, DSUser, any> & WithDeviceApi<DSApi, DSDevice>,
) {
    describe('Device-like API', () => {
        let env: TestVars

        beforeAll(async () => {
            const initializer = await getEnvironmentInitializer()
            env = await initializer.execute(getEnvVariables())
        }, 600_000)

        it('Can create a medical device', async () => {
            const apiAndUser = await ctx.apiForEnvUser(env, hcp1Username)
            const api = apiAndUser.api
            const createdMedicalDevice = await ctx.deviceApi(api).createOrModify(
                ctx.toDSDevice(
                    new Device({
                        serialNumber: '123456789',
                        name: 'What-If Machine',
                        brand: 'Farnsworth',
                        model: '2ACV16',
                    }),
                ),
            )
            const createdMedicalDeviceDto = ctx.toDeviceDto(createdMedicalDevice)
            expect(createdMedicalDeviceDto.id).toBeTruthy()
            expect(forceUuid(createdMedicalDeviceDto.id)).toEqual(createdMedicalDeviceDto.id)
            expect(createdMedicalDeviceDto.serialNumber).toEqual('123456789')
            expect(createdMedicalDeviceDto.name).toEqual('What-If Machine')
            expect(createdMedicalDeviceDto.brand).toEqual('Farnsworth')
            expect(createdMedicalDeviceDto.model).toEqual('2ACV16')
            expect(createdMedicalDeviceDto.created).toBeTruthy()
            expect(createdMedicalDeviceDto.modified).toBeTruthy()
        })

        it('Can create a medical device and update it', async () => {
            const apiAndUser = await ctx.apiForEnvUser(env, hcp1Username)
            const api = apiAndUser.api
            const createdMedicalDevice = await ctx.deviceApi(api).createOrModify(
                ctx.toDSDevice(
                    new Device({
                        serialNumber: '123456789',
                        name: 'What-If Machine',
                        brand: 'Farnsworth',
                        model: '2ACV16',
                    }),
                ),
            )
            const createdMedicalDeviceDto = ctx.toDeviceDto(createdMedicalDevice)
            const newSerialNumber = forceUuid()
            const updatedMedicalDevice = await ctx.deviceApi(api).createOrModify(
                ctx.toDSDevice(
                    new Device({
                        ...ctx.toDeviceDto(createdMedicalDevice),
                        serialNumber: newSerialNumber,
                        modified: undefined,
                        model: '2ACV16',
                    }),
                ),
            )
            const updatedMedicalDeviceDto = ctx.toDeviceDto(updatedMedicalDevice)
            expect(updatedMedicalDeviceDto.id).toBeTruthy()
            expect(forceUuid(updatedMedicalDeviceDto.id)).toEqual(updatedMedicalDeviceDto.id)
            expect(updatedMedicalDeviceDto.serialNumber).toEqual(newSerialNumber)
            expect(updatedMedicalDeviceDto.rev!.startsWith('2-')).toBe(true)
            expect(updatedMedicalDeviceDto.name).toEqual('What-If Machine')
            expect(updatedMedicalDeviceDto.brand).toEqual('Farnsworth')
            expect(updatedMedicalDeviceDto.model).toEqual('2ACV16')
            expect(updatedMedicalDeviceDto.created).toEqual(createdMedicalDeviceDto.created)
            expect(updatedMedicalDeviceDto.modified).toBeGreaterThan(createdMedicalDeviceDto.modified!)
        })

        const subscribeAndCreateDevice = async (options: {}, eventTypes: ('CREATE' | 'UPDATE')[]) => {
            const apiAndUser = await ctx.apiForEnvUser(env, hcp1Username)
            const api = apiAndUser.api
            const user = apiAndUser.user

            const connectionPromise = async (options: {}, dataOwnerId: string, eventListener: (patient: Device) => Promise<void>) => {
                await sleep(2000)
                // TODO fix eventListenerTyping
                return ctx.deviceApi(api).subscribeToEvents(eventTypes, await new DeviceFilter(api).build(), eventListener as unknown as any, options)
            }

            const events: Device[] = []
            const statuses: string[] = []

            let eventReceivedPromiseResolve!: (value: void | PromiseLike<void>) => void
            let eventReceivedPromiseReject!: (reason?: any) => void
            const eventReceivedPromise = new Promise<void>((res, rej) => {
                eventReceivedPromiseResolve = res
                eventReceivedPromiseReject = rej
            })

            await doXOnYAndSubscribe(
                api!!,
                options,
                connectionPromise(options, user.healthcarePartyId!, async (patient) => {
                    events.push(patient)
                    eventReceivedPromiseResolve()
                }),
                async () => {
                    await ctx.deviceApi(api).createOrModify(
                        ctx.toDSDevice(
                            new Device({
                                serialNumber: '123456789',
                                name: 'What-If Machine',
                                brand: 'Farnsworth',
                                model: '2ACV16',
                            }),
                        ),
                    )
                },
                (status) => {
                    statuses.push(status)
                },
                eventReceivedPromiseReject,
                eventReceivedPromise,
            )

            events?.forEach((event) => console.log(`Event : ${event}`))
            statuses?.forEach((status) => console.log(`Status : ${status}`))

            expect(events.length).toEqual(1)
            expect(statuses.length).toEqual(2)
        }

        it('Can subscribe to DeviceLike - CREATE without option', async () => {
            await subscribeAndCreateDevice({}, ['CREATE'])
        }, 60_000)

        it('Can subscribe to DeviceLike - CREATE with options', async () => {
            await subscribeAndCreateDevice(
                {
                    connectionRetryIntervalMs: 10_000,
                    connectionMaxRetry: 5,
                },
                ['CREATE'],
            )
        }, 60_000)
    })
}
