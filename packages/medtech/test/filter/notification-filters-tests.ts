import 'isomorphic-fetch'
import { MedTechApi } from '../../src/apis/MedTechApi'
import { FilterComposition, NoOpFilter, Notification, NotificationStatusEnum, NotificationTypeEnum, User } from '@icure/typescript-common'
import { NotificationFilter } from '../../src/filter/NotificationFilterDsl'
import { expect } from 'chai'
import { getEnvVariables, TestVars } from '@icure/test-setup/types'
import { v4 as uuid } from 'uuid'
import { getEnvironmentInitializer, hcp1Username, setLocalStorage } from '../../../common-test/test-utils'
import { TestUtils } from '../test-utils'

setLocalStorage(fetch)

let env: TestVars
let hcp1Api: MedTechApi
let hcp1User: User

let notification1: Notification
let notification2: Notification
let notification3: Notification

let startingDate: Date

describe('Notification Filters Tests', function () {
    before(async function () {
        this.timeout(600000)
        const initializer = await getEnvironmentInitializer()
        env = await initializer.execute(getEnvVariables())

        const hcp1ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env.iCureUrl, env.dataOwnerDetails[hcp1Username])
        hcp1Api = hcp1ApiAndUser.api
        hcp1User = hcp1ApiAndUser.user

        startingDate = new Date()

        notification1 = (await hcp1Api.notificationApi.createOrModifyNotification(
            new Notification({
                status: NotificationStatusEnum.Pending,
                created: startingDate.getTime() - 10000,
                type: NotificationTypeEnum.KeyPairUpdate,
            }),
            hcp1User.healthcarePartyId!,
        ))!

        notification2 = (await hcp1Api.notificationApi.createOrModifyNotification(
            new Notification({
                status: NotificationStatusEnum.Pending,
                created: startingDate.getTime() - 10000,
                type: NotificationTypeEnum.NewUserOwnDataAccess,
            }),
            hcp1User.healthcarePartyId!,
        ))!

        notification3 = (await hcp1Api.notificationApi.createOrModifyNotification(
            new Notification({
                status: NotificationStatusEnum.Ongoing,
                created: startingDate.getTime() + 10000,
                type: NotificationTypeEnum.NewUserOwnDataAccess,
            }),
            hcp1User.healthcarePartyId!,
        ))!
    })

    it('If no parameter is specified, all the Notifications are returned', async function () {
        const notes = await hcp1Api.notificationApi.filterNotifications(await new NotificationFilter(hcp1Api).forDataOwner(hcp1User.healthcarePartyId!).build())

        expect(notes.rows.length).to.be.greaterThan(0)
    })

    it('Can filter Notifications by ids', async function () {
        const notes = await hcp1Api.notificationApi.filterNotifications(await new NotificationFilter(hcp1Api).forDataOwner(hcp1User.healthcarePartyId!).byIds([notification1.id!, notification2.id!]).build())

        expect(notes.rows.length).to.be.equal(2)
        expect(notes.rows.map((it) => it.id)).to.contain(notification1.id)
        expect(notes.rows.map((it) => it.id)).to.contain(notification2.id)
    })

    it('Can filter Notifications by type', async function () {
        const notes = await hcp1Api.notificationApi.filterNotifications(await new NotificationFilter(hcp1Api).forDataOwner(hcp1User.healthcarePartyId!).withType(NotificationTypeEnum.NewUserOwnDataAccess).build())

        expect(notes.rows.length).to.be.greaterThan(0)
        notes.rows.forEach((note) => {
            expect(note.type).to.be.equal(NotificationTypeEnum.NewUserOwnDataAccess)
        })
    })

    it('Can filter Notifications after date', async function () {
        const notes = await hcp1Api.notificationApi.filterNotifications(await new NotificationFilter(hcp1Api).forDataOwner(hcp1User.healthcarePartyId!).afterDate(startingDate.getTime()).build())

        expect(notes.rows.length).to.be.greaterThan(0)
        notes.rows.forEach((note) => {
            expect(note.created).to.be.greaterThanOrEqual(startingDate.getTime())
        })
    })

    it('Can filter Notifications by union filter', async function () {
        const afterDateFilter = await new NotificationFilter(hcp1Api).forDataOwner(hcp1User.healthcarePartyId!).afterDate(startingDate.getTime()).build()

        const filterByType = await new NotificationFilter(hcp1Api).forDataOwner(hcp1User.healthcarePartyId!).withType(NotificationTypeEnum.KeyPairUpdate).build()

        const unionFilter = FilterComposition.union(afterDateFilter, filterByType)

        const notes = await hcp1Api.notificationApi.filterNotifications(unionFilter)

        expect(notes.rows.length).to.be.greaterThan(0)
        notes.rows.forEach((note) => {
            expect(note).to.satisfy((n: Notification) => {
                return (!!n.created && n.created >= startingDate.getTime()) || n.type === NotificationTypeEnum.KeyPairUpdate
            })
        })
    })

    it('Can filter Notifications by implicit intersection filter', async function () {
        const filterAfterDateOrType = await new NotificationFilter(hcp1Api).forDataOwner(hcp1User.healthcarePartyId!).withType(NotificationTypeEnum.NewUserOwnDataAccess).afterDate(startingDate.getTime()).build()

        const notes = await hcp1Api.notificationApi.filterNotifications(filterAfterDateOrType)

        expect(notes.rows.length).to.be.greaterThan(0)
        notes.rows.forEach((note) => {
            expect(note.type).to.be.equal(NotificationTypeEnum.NewUserOwnDataAccess)
            expect(note.created).to.be.greaterThanOrEqual(startingDate.getTime())
        })
    })

    it('Can filter Notifications by explicit intersection filter', async function () {
        const afterDateFilter = await new NotificationFilter(hcp1Api).forDataOwner(hcp1User.healthcarePartyId!).afterDate(startingDate.getTime()).build()

        const filterByType = await new NotificationFilter(hcp1Api).forDataOwner(hcp1User.healthcarePartyId!).withType(NotificationTypeEnum.NewUserOwnDataAccess).build()

        const intersectionFilter = FilterComposition.intersection(afterDateFilter, filterByType)

        const notes = await hcp1Api.notificationApi.filterNotifications(intersectionFilter)

        expect(notes.rows.length).to.be.greaterThan(0)
        notes.rows.forEach((note) => {
            expect(note.type).to.be.equal(NotificationTypeEnum.NewUserOwnDataAccess)
            expect(note.created).to.be.greaterThanOrEqual(startingDate.getTime())
        })
    })

    it('Intersection between disjoint sets return empty result', async function () {
        const notes = await hcp1Api.notificationApi.filterNotifications(await new NotificationFilter(hcp1Api).forDataOwner(hcp1User.healthcarePartyId!).withType(NotificationTypeEnum.NewUserOwnDataAccess).byIds([notification1.id!]).build())

        expect(notes.rows.length).to.be.equal(0)
    })
    it('If a NoOpFilter is generated as result, an empty result is returned', async function () {
        const noOpFilter = await new NotificationFilter(hcp1Api).forSelf().byIds([uuid()]).byIds([uuid()]).build()

        expect(NoOpFilter.isNoOp(noOpFilter)).to.be.true

        const notifications = await hcp1Api.notificationApi.filterNotifications(noOpFilter)
        expect(notifications.rows.length).to.be.equal(0)
    })
})
