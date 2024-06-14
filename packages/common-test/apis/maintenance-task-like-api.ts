import 'isomorphic-fetch'
import { getEnvironmentInitializer, hcp1Username, hcp2Username, hcp3Username, patUsername, setLocalStorage } from '../test-utils'
import { getEnvVariables, TestVars } from '@icure/test-setup/types'
import { AnonymousApiBuilder, CommonAnonymousApi, CommonApi, CryptoStrategies, DataOwnerWithType, forceUuid, MaintenanceTaskLikeApiImpl, NotificationStatusEnum, NotificationTypeEnum } from '@icure/typescript-common'
import { assert } from 'chai'
import { BaseApiTestContext, WithMaintenanceTaskApi } from './TestContexts'
import { expectArrayContainsExactlyInAnyOrder } from '../assertions'
import { MaintenanceTask, User } from '@icure/api'
import { doXOnYAndSubscribe } from '../websocket-utils'
import { beforeAll, describe, it } from '@jest/globals'

setLocalStorage(fetch)

export function testMaintenanceTaskLikeApi<
    DSAnonymousApiBuilder extends AnonymousApiBuilder<DSCryptoStrategies, DSAnonymousApi>,
    DSAnonymousApi extends CommonAnonymousApi<DSApi>,
    DSApi extends CommonApi,
    DSCryptoStrategies extends CryptoStrategies<any>,
    DSUser,
    DSHcp,
    DSPatient,
    DSDataOwner extends DataOwnerWithType,
    DSService,
    DSMaintenanceTask,
>(name: string, ctx: BaseApiTestContext<DSAnonymousApiBuilder, DSAnonymousApi, DSApi, DSCryptoStrategies, DSUser, any> & WithMaintenanceTaskApi<DSApi, DSMaintenanceTask>) {
    describe(`${name} (MaintenanceTask-like API)`, function () {
        let env: TestVars
        let hcp1Api: DSApi
        let hcp1User: User
        let hcp2Api: DSApi
        let hcp2User: User
        let hcp3Api: DSApi
        let hcp3User: User
        let patApi: DSApi
        let patUser: User
        let idFilterNotification1: MaintenanceTask
        let idFilterNotification2: MaintenanceTask
        let idFilterNotification3: MaintenanceTask

        beforeAll(async function () {
            const initializer = await getEnvironmentInitializer()
            env = await initializer.execute(getEnvVariables())
            const hcpApi1AndUser = await ctx.apiForEnvUser(env, hcp1Username)
            hcp1Api = hcpApi1AndUser.api
            hcp1User = hcpApi1AndUser.user
            const hcpApi2AndUser = await ctx.apiForEnvUser(env, hcp2Username)
            hcp2Api = hcpApi2AndUser.api
            hcp2User = hcpApi2AndUser.user
            const hcpApi3AndUser = await ctx.apiForEnvUser(env, hcp3Username)
            hcp3Api = hcpApi3AndUser.api
            hcp3User = hcpApi3AndUser.user
            const patApiAndUser = await ctx.apiForEnvUser(env, patUsername)
            patApi = patApiAndUser.api
            patUser = patApiAndUser.user
            idFilterNotification1 = (await ctx.mtApi(hcp1Api).createOrModify(
                ctx.toDSMt(
                    new MaintenanceTask({
                        taskType: NotificationTypeEnum.KeyPairUpdate,
                    }),
                ),
                hcp2User.healthcarePartyId,
            ))!
            expect(idFilterNotification1).toBeTruthy()
            idFilterNotification2 = (await ctx.mtApi(hcp1Api).createOrModify(
                ctx.toDSMt(
                    new MaintenanceTask({
                        taskType: NotificationTypeEnum.NewUserOwnDataAccess,
                    }),
                ),
                hcp2User.healthcarePartyId,
            ))!
            expect(idFilterNotification2).toBeTruthy()
            idFilterNotification3 = (await ctx.mtApi(hcp1Api).createOrModify(
                ctx.toDSMt(
                    new MaintenanceTask({
                        taskType: NotificationTypeEnum.Other,
                    }),
                ),
                hcp2User.healthcarePartyId,
            ))!
            expect(idFilterNotification3).toBeTruthy()
            console.log('All prerequisites are started')
        }, 600_000)

        it('should be able to create a new Notification with a logged in HCP', async () => {
            const notification = new MaintenanceTask({ id: forceUuid(), taskType: NotificationTypeEnum.KeyPairUpdate })
            const createdNotification = await ctx.mtApi(hcp1Api).createOrModify(ctx.toDSMt(notification), hcp2User!.healthcarePartyId)
            const createdNotificationDto = ctx.toMtDto(createdNotification!)
            expect(createdNotificationDto).toBeTruthy()
            expect(createdNotificationDto.id).toEqual(notification.id)
            expect(createdNotificationDto.status).toEqual('pending')
            expect(createdNotificationDto.rev).toBeTruthy()
            expect(createdNotificationDto.created).toBeTruthy()
            expect(createdNotificationDto.taskType).toEqual(notification.taskType)
            expect(createdNotificationDto.author).toEqual(hcp1User!.id!)
            expect(createdNotificationDto.responsible).toEqual(hcp1User!.healthcarePartyId)
            const retrievedNotification = await ctx.mtApi(hcp1Api).get(createdNotificationDto.id!)
            expect(retrievedNotification).toEqual(createdNotification)
            const retrievedByHcp2Notification = await ctx.mtApi(hcp2Api).get(createdNotificationDto.id!)
            expect(retrievedByHcp2Notification).toEqual(createdNotification)
        })

        it('should be able to create a new Notification with a logged in Patient', async () => {
            const notification = new MaintenanceTask({ id: forceUuid(), taskType: NotificationTypeEnum.KeyPairUpdate })
            const createdNotification = await ctx.mtApi(patApi).createOrModify(ctx.toDSMt(notification), hcp3User!.healthcarePartyId)
            const createdNotificationDto = ctx.toMtDto(createdNotification!)
            expect(createdNotificationDto).toBeTruthy()
            expect(createdNotificationDto.id).toEqual(notification.id)
            expect(createdNotificationDto.status).toEqual('pending')
            expect(createdNotificationDto.rev).toBeTruthy()
            expect(createdNotificationDto.created).toBeTruthy()
            expect(createdNotificationDto.taskType).toEqual(notification.taskType)
            expect(createdNotificationDto.author).toEqual('*') // Patient is an anonymous data owner: omit user id
            expect(createdNotificationDto.responsible).toEqual('*') // Patient is an anonymous data owner: omit data owner id
            const retrievedNotification = await ctx.mtApi(patApi).get(createdNotificationDto.id!)
            expect(retrievedNotification).toEqual(createdNotification)
            const retrievedByHcp2Notification = await ctx.mtApi(hcp3Api).get(createdNotificationDto.id!)
            expect(retrievedByHcp2Notification).toEqual(createdNotification)
        })

        it('should not be able to create a new Notification if the responsible is another Patient', async () => {
            const notification = new MaintenanceTask({
                taskType: NotificationTypeEnum.KeyPairUpdate,
                responsible: forceUuid(),
            })
            await expect(ctx.mtApi(patApi).createOrModify(ctx.toDSMt(notification), hcp2User!.healthcarePartyId)).rejects.toBeInstanceOf(Error)
        })

        it('should be able to get an existing Notification by Id as the creator', async () => {
            const createdNotification = await ctx.createMt(hcp1Api!, hcp2User!.healthcarePartyId!)
            const createdNotificationDto = ctx.toMtDto(createdNotification)
            const retrievedNotification = await ctx.mtApi(hcp1Api).get(createdNotificationDto.id!)
            const retrievedNotificationDto = ctx.toMtDto(retrievedNotification!)
            expect(retrievedNotification).toBeTruthy()
            expect(createdNotificationDto.id).toEqual(retrievedNotificationDto.id)
            expect(createdNotificationDto.rev).toEqual(retrievedNotificationDto.rev)
        })

        it('should be able to get an existing Notification by Id as a delegate', async () => {
            const createdNotification = await ctx.createMt(hcp1Api!, hcp2User!.healthcarePartyId!)
            const createdNotificationDto = ctx.toMtDto(createdNotification)
            const retrievedNotification = await ctx.mtApi(hcp2Api).get(createdNotificationDto.id!)
            const retrievedNotificationDto = ctx.toMtDto(retrievedNotification!)
            expect(retrievedNotification).toBeTruthy()
            expect(createdNotificationDto.id).toEqual(retrievedNotificationDto.id)
            expect(createdNotificationDto.rev).toEqual(retrievedNotificationDto.rev)
        })

        it('should not be able to get an existing Notification if not author or delegate', async () => {
            const createdNotification = await ctx.createMt(hcp1Api!, hcp2User!.healthcarePartyId!)
            const createdNotificationDto = ctx.toMtDto(createdNotification)
            await expect(ctx.mtApi(hcp3Api).get(createdNotificationDto.id!)).rejects.toBeInstanceOf(Error)
        })

        it('should be able to modify an existing Notification as the creator', async () => {
            const createdNotification = await ctx.createMt(hcp1Api!, hcp2User!.healthcarePartyId!)
            const createdNotificationDto = ctx.toMtDto(createdNotification)
            const modifiedNotification = await ctx.mtApi(hcp1Api).createOrModify(
                ctx.toDSMt({
                    ...ctx.toMtDto(createdNotification),
                    status: NotificationStatusEnum.Ongoing,
                }),
            )
            const modifiedNotificationDto = ctx.toMtDto(modifiedNotification!)
            expect(modifiedNotification).toBeTruthy()
            assert(createdNotificationDto.id === modifiedNotificationDto.id)
            assert(createdNotificationDto.rev !== modifiedNotificationDto.rev)
            assert(modifiedNotificationDto.status === 'ongoing')
        })

        it('should be able to modify an existing Notification as the delegate', async () => {
            const createdNotification = await ctx.createMt(hcp1Api!, hcp2User!.healthcarePartyId!)
            const createdNotificationDto = ctx.toMtDto(createdNotification)
            const modifiedNotification = await ctx.mtApi(hcp2Api).createOrModify(
                ctx.toDSMt({
                    ...ctx.toMtDto(createdNotification),
                    status: NotificationStatusEnum.Ongoing,
                }),
            )
            const modifiedNotificationDto = ctx.toMtDto(modifiedNotification!)
            expect(modifiedNotification).toBeTruthy()
            assert(createdNotificationDto.id === modifiedNotificationDto.id)
            assert(createdNotificationDto.rev !== modifiedNotificationDto.rev)
            assert(modifiedNotificationDto.status === 'ongoing')
        })

        it('should not be able to modify an existing Notification if not author or delegate', async () => {
            const createdNotification = await ctx.createMt(hcp1Api!, hcp2User!.healthcarePartyId!)
            const modifyDto = ctx.toDSMt({ ...ctx.toMtDto(createdNotification), status: NotificationStatusEnum.Ongoing })
            await expect(ctx.mtApi(hcp3Api).createOrModify(modifyDto)).rejects.toBeInstanceOf(Error)
            expect(await ctx.mtApi(hcp1Api).get(ctx.toMtDto(createdNotification).id!)).toEqual(createdNotification)
        })

        it('should not be able to modify an existing Notification if rev changes', async () => {
            const createdNotification = await ctx.createMt(hcp1Api!, hcp2User!.healthcarePartyId!)
            const modifyDto1 = ctx.toDSMt({ ...ctx.toMtDto(createdNotification), status: NotificationStatusEnum.Ongoing })
            const modifyDto2 = ctx.toDSMt({ ...ctx.toMtDto(createdNotification), status: NotificationStatusEnum.Ongoing })
            const actuallyModified = await ctx.mtApi(hcp1Api).createOrModify(modifyDto1)
            await expect(ctx.mtApi(hcp1Api).createOrModify(modifyDto2)).rejects.toBeInstanceOf(Error)
            expect(await ctx.mtApi(hcp1Api).get(ctx.toMtDto(createdNotification).id!)).toEqual(actuallyModified)
        })

        it('should be able to delete an existing Notification as the creator', async () => {
            const createdNotification = await ctx.createMt(hcp1Api!, hcp2User!.healthcarePartyId!)
            const createdNotificationDto = ctx.toMtDto(createdNotification)
            expect(createdNotificationDto.deletionDate).toBe(undefined)
            const beforeDeletion = new Date().getTime()
            const deletedId = await ctx.mtApi(hcp1Api).delete(createdNotificationDto.id!)
            expect(deletedId).toEqual(createdNotificationDto.id)
            const deletedNotification = await ctx.mtApi(hcp1Api).get(createdNotificationDto.id!)
            expect(deletedNotification).toBeTruthy()
            const deletedDto = ctx.toMtDto(deletedNotification!)
            expect(deletedDto.deletionDate).toBeTruthy()
            expect(deletedDto.deletionDate).toBeGreaterThan(beforeDeletion)
        })

        it('should be able to delete an existing Notification as the delegate', async () => {
            const createdNotification = await ctx.createMt(hcp1Api!, hcp2User!.healthcarePartyId!)
            const createdNotificationDto = ctx.toMtDto(createdNotification)
            expect(createdNotificationDto.deletionDate).toBe(undefined)
            const beforeDeletion = new Date().getTime() - 100
            const deletedId = await ctx.mtApi(hcp2Api).delete(createdNotificationDto.id!)
            expect(deletedId).toEqual(createdNotificationDto.id)
            const deletedNotification = await ctx.mtApi(hcp2Api).get(createdNotificationDto.id!)
            expect(deletedNotification).toBeTruthy()
            const deletedNotificationDto = ctx.toMtDto(deletedNotification!)
            expect(deletedNotificationDto.deletionDate).toBeTruthy()
            expect(deletedNotificationDto.deletionDate).toBeGreaterThan(beforeDeletion)
        })

        it('should not be able to delete an existing Notification if not author or delegate', async () => {
            const createdNotification = await ctx.createMt(hcp1Api!, hcp2User!.healthcarePartyId!)
            await expect(ctx.mtApi(hcp3Api).delete(ctx.toMtDto(createdNotification).id!)).rejects.toBeInstanceOf(Error)
            const retrievedNotification = await ctx.mtApi(hcp1Api).get(ctx.toMtDto(createdNotification).id!)
            expect(retrievedNotification).toEqual(createdNotification)
        })

        it('should be able to filter Notifications by id as the creator', async () => {
            const result = await ctx.mtApi(hcp1Api).filterBy(await ctx.newMtFilter(hcp1Api!).forSelf().byIds([idFilterNotification1!.id!, idFilterNotification2!.id!]).build())
            expectArrayContainsExactlyInAnyOrder(result.rows, [idFilterNotification1!, idFilterNotification2!])
        })

        it('should be able to filter Notifications by id as the delegate', async () => {
            const result = await ctx.mtApi(hcp2Api).filterBy(await ctx.newMtFilter(hcp2Api!).forSelf().byIds([idFilterNotification1!.id!, idFilterNotification2!.id!]).build())
            expectArrayContainsExactlyInAnyOrder(result.rows, [idFilterNotification1!, idFilterNotification2!])
        })

        it('should be able to filter Notifications by HcParty id and type as the creator', async () => {
            const result = await ctx.mtApi(hcp1Api).filterBy(await ctx.newMtFilter(hcp1Api!).forSelf().withType(NotificationTypeEnum.NewUserOwnDataAccess).build())
            expect(result.rows.length).toBeGreaterThan(0)
            for (const notification of result.rows) {
                const mt = ctx.toMtDto(notification)
                expect(mt.taskType).toEqual(NotificationTypeEnum.NewUserOwnDataAccess)
                const retrievedIndividually = await ctx.mtApi(hcp1Api).get(mt.id!)
                expect(retrievedIndividually).toEqual(notification)
            }
        })

        it('should be able to filter Notifications by HcParty id and type as the delegate', async () => {
            const result = await ctx.mtApi(hcp1Api).filterBy(await ctx.newMtFilter(hcp1Api!).forSelf().withType(NotificationTypeEnum.NewUserOwnDataAccess).build())
            expect(result.rows.length).toBeGreaterThan(0)
            for (const notification of result.rows) {
                const mt = ctx.toMtDto(notification)
                expect(mt.taskType).toEqual(NotificationTypeEnum.NewUserOwnDataAccess)
                const retrievedIndividually = await ctx.mtApi(hcp1Api).get(mt.id!)
                expect(retrievedIndividually).toEqual(notification)
            }
        })

        it('should be able to filter Notifications after date', async () => {
            const startTimestamp = new Date().getTime() - 100000
            const result = await ctx.mtApi(hcp1Api).filterBy(await ctx.newMtFilter(hcp1Api!).forSelf().afterDate(startTimestamp).build())
            expect(result.rows.length).toBeGreaterThan(0)
            result.rows.forEach((notification) => {
                expect(ctx.toMtDto(notification).created).toBeGreaterThanOrEqual(startTimestamp)
            })
        })

        it('should be able to get all the Notifications as the creator', async () => {
            const result = await ctx.mtApi(hcp1Api).filterBy(await ctx.newMtFilter(hcp1Api!).forSelf().build())
            expect(result.rows.length).toBeGreaterThan(0)
        })

        it('should be able to get all the Notifications from multiple paginated lists', async () => {
            const filter = await ctx.newMtFilter(hcp1Api!).forSelf().withType(NotificationTypeEnum.NewUserOwnDataAccess).build()
            let nextId
            let page
            let existingNotifications: string[] = []
            do {
                page = await ctx.mtApi(hcp1Api).filterBy(filter, nextId)
                existingNotifications = existingNotifications.concat(page.rows.map((it) => ctx.toMtDto(it).id!) ?? [])
                nextId = page?.nextKeyPair?.startKeyDocId
            } while (!!nextId)

            const result = await (ctx.mtApi(hcp1Api) as unknown as MaintenanceTaskLikeApiImpl<any>).concatenateFilterResults(filter, undefined, Math.floor(existingNotifications.length / 3))
            expect(result.length).toEqual(existingNotifications.length)
            result.forEach((notification) => {
                expect(existingNotifications).toContain(notification.id)
            })
        })

        it('should be able to get all the pending Notification of Users asking for data access', async () => {
            const createdNotification = await ctx.mtApi(hcp2Api).createOrModify(
                ctx.toDSMt(
                    new MaintenanceTask({
                        taskType: NotificationTypeEnum.NewUserOwnDataAccess,
                    }),
                ),
                hcp1User?.healthcarePartyId!,
            )
            expect(createdNotification).toBeTruthy()

            const notifications = await ctx.mtApi(hcp1Api).getPendingAfter()
            expect(notifications.length).toBeGreaterThan(0)
            for (const notification of notifications) {
                const mt = ctx.toMtDto(notification)
                expect(mt.status).toEqual('pending')
                const retrievedIndividually = await ctx.mtApi(hcp1Api).get(mt.id!)
                expect(retrievedIndividually).toEqual(notification)
            }
        })

        it('should be able to update the status of a Notification', async () => {
            const createdNotification = await ctx.createMt(hcp1Api!, hcp2User!.healthcarePartyId!)
            expect(createdNotification).toBeTruthy()
            const updatedNotification = await ctx.mtApi(hcp1Api).updateStatus(createdNotification, MaintenanceTask.StatusEnum.Completed)
            expect(updatedNotification).toBeTruthy()
            expect(ctx.toMtDto(updatedNotification).status).toEqual('completed')
        })

        const subscribeAndCreateMaintenanceTask = async (options: {}, eventTypes: ('CREATE' | 'UPDATE')[]) => {
            const { api, user } = await ctx.apiForEnvUser(env, hcp1Username)
            // TODO fix eventListener typing
            const connectionPromise = async (options: {}, dataOwnerId: string, eventListener: (notification: MaintenanceTask) => Promise<void>) =>
                ctx.mtApi(api).subscribeToEvents(eventTypes, await ctx.newMtFilter(api).forSelf().withType(MaintenanceTask.TaskTypeEnum.KeyPairUpdate).build(), eventListener as unknown as any, options)

            const events: MaintenanceTask[] = []
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
                connectionPromise({}, user.healthcarePartyId!, async (notification) => {
                    events.push(notification)
                    eventReceivedPromiseResolve()
                }),
                async () => {
                    const createdMaintenanceTask = await ctx.mtApi(hcp2Api).createOrModify(
                        ctx.toDSMt(
                            new MaintenanceTask({
                                taskType: NotificationTypeEnum.KeyPairUpdate,
                                status: 'pending',
                            }),
                        ),
                        hcp1User?.healthcarePartyId!,
                    )
                    assert(!!createdMaintenanceTask)
                    return createdMaintenanceTask
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

        it('Can subscribe MaintenanceTaskLike CREATE without options', async () => {
            await subscribeAndCreateMaintenanceTask({}, ['CREATE'])
        }, 60_000)

        it('Can subscribe MaintenanceTaskLike CREATE with options', async () => {
            await subscribeAndCreateMaintenanceTask(
                {
                    connectionRetryIntervalMs: 10_000,
                    connectionMaxRetry: 5,
                },
                ['CREATE'],
            )
        }, 60_000)
    })
}
