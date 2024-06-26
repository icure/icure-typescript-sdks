import 'isomorphic-fetch'
import { MedTechApi } from '../../src/apis/MedTechApi'
import { expect } from 'chai'
import { HealthcareProfessional } from '../../src/models/HealthcareProfessional.model'
import { v4 as uuid } from 'uuid'
import { CodingReference, FilterComposition, NoOpFilter, User } from '@icure/typescript-common'
import { getEnvVariables, TestVars } from '@icure/test-setup/types'
import { HealthcareProfessionalFilter } from '../../src/filter/HealthcareProfessionalFilterDsl'
import { getEnvironmentInitializer, hcp1Username, patUsername, setLocalStorage } from '../../../common-test/test-utils'
import { TestUtils } from '../test-utils'

setLocalStorage(fetch)

let env: TestVars

let hcp1Api: MedTechApi
let hcp1User: User
let patApi: MedTechApi
let patUser: User
let hcp1: HealthcareProfessional
let hcp2: HealthcareProfessional
let hcp3: HealthcareProfessional

describe('HealthcareProfessional Filters Test', function () {
    const id = uuid()
    before(async function () {
        this.timeout(600000)
        const initializer = await getEnvironmentInitializer()
        env = await initializer.execute(getEnvVariables())

        const hcp1ApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env.iCureUrl, env.dataOwnerDetails[hcp1Username])
        hcp1Api = hcp1ApiAndUser.api
        hcp1User = hcp1ApiAndUser.user

        const patApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env.iCureUrl, env.dataOwnerDetails[patUsername])
        patApi = patApiAndUser.api
        patUser = patApiAndUser.user

        //Create more hcps
        const { api: masterApi } = await TestUtils.createMedTechApiAndLoggedUserFor(env.iCureUrl, env.masterHcp!)
        hcp1 = await masterApi.healthcareProfessionalApi.createOrModifyHealthcareProfessional(
            new HealthcareProfessional({
                name: 'HCP_01',
                labels: [new CodingReference({ type: 'hcp-type', code: `physician-${id}` })],
                codes: [new CodingReference({ type: 'practitioner-specialty', code: `gastroenterologist-${id}` })],
            }),
        )

        hcp2 = await masterApi.healthcareProfessionalApi.createOrModifyHealthcareProfessional(
            new HealthcareProfessional({
                name: 'HCP_02',
                labels: [new CodingReference({ type: 'hcp-type', code: `physician-${id}` })],
                codes: [new CodingReference({ type: 'practitioner-specialty', code: `cardiologist-${id}` })],
            }),
        )

        hcp3 = await masterApi.healthcareProfessionalApi.createOrModifyHealthcareProfessional(
            new HealthcareProfessional({
                firstName: 'John',
                lastName: 'Keats',
                labels: [new CodingReference({ type: 'hcp-type', code: `physician-${id}` })],
                codes: [new CodingReference({ type: 'practitioner-specialty', code: `cardiologist-${id}` })],
            }),
        )
    })

    it('HcpsByPatientIdFilter test - Success', async function () {
        const hcps = await hcp1Api.healthcareProfessionalApi.filterHealthcareProfessionalBy(await new HealthcareProfessionalFilter(hcp1Api).byLabelCodeFilter(undefined, undefined, 'practitioner-specialty', `cardiologist-${id}`).build())

        expect(!!hcps).to.equal(true)
        expect(hcps.rows.length).to.be.greaterThanOrEqual(2)
        hcps.rows.forEach((hcp) => {
            expect(hcp.codes[0].code).to.eq(`cardiologist-${id}`)
        })
    })

    it('HcpsByNameFilter test - Success', async function () {
        const hcps = await hcp1Api.healthcareProfessionalApi.filterHealthcareProfessionalBy(await new HealthcareProfessionalFilter(hcp1Api).byMatches('eat').build())

        expect(!!hcps).to.equal(true)
        expect(hcps.rows.length).to.be.greaterThanOrEqual(1)
        hcps.rows.forEach((hcp) => {
            expect(hcp.lastName?.toLowerCase()).to.include('eat')
        })
    })

    it('HcpsByNameFilter on firstname as well test - Success', async function () {
        const hcps = await hcp1Api.healthcareProfessionalApi.filterHealthcareProfessionalBy(await new HealthcareProfessionalFilter(hcp1Api).byMatches('eatsjo').build())

        expect(!!hcps).to.equal(true)
        expect(hcps.rows.length).to.be.greaterThanOrEqual(1)
        hcps.rows.forEach((hcp) => {
            expect(`${hcp.lastName?.toLowerCase()}${hcp.firstName?.toLowerCase()}`).to.include('eatsjo')
        })
    })

    it('HcpsByPatientIdFilter by type test - Success', async function () {
        const hcps = await hcp1Api.healthcareProfessionalApi.filterHealthcareProfessionalBy(await new HealthcareProfessionalFilter(hcp1Api).byLabelCodeFilter('hcp-type', `physician-${id}`).build())

        expect(!!hcps).to.equal(true)
        expect(hcps.rows.length).to.be.greaterThanOrEqual(1)
        hcps.rows.forEach((hcp) => {
            expect(hcp.labels[0].code).to.eq(`physician-${id}`)
        })
    })

    it('HcpsByPatientIdFilter by combination test - Success', async function () {
        const hcps = await hcp1Api.healthcareProfessionalApi.filterHealthcareProfessionalBy(await new HealthcareProfessionalFilter(hcp1Api).byLabelCodeFilter('hcp-type', `physician-${id}`, 'practitioner-specialty', `gastroenterologist-${id}`).build())

        expect(!!hcps).to.equal(true)
        expect(hcps.rows.length).to.be.greaterThanOrEqual(1)
        hcps.rows.forEach((hcp) => {
            expect(hcp.codes[0].code).to.eq(`gastroenterologist-${id}`)
        })
    })

    it('HcpsByPatientIdFilter test - Failure', async function () {
        const hcps = await hcp1Api.healthcareProfessionalApi.filterHealthcareProfessionalBy(await new HealthcareProfessionalFilter(hcp1Api).byLabelCodeFilter(undefined, undefined, 'practitioner-specialty', 'acrobat').build())

        expect(!!hcps).to.be.true
        expect(hcps.rows.length).to.be.equal(0)
    })

    it('If no criteria is specified, all the HCPs are returned', async function () {
        const hcps = await hcp1Api.healthcareProfessionalApi.filterHealthcareProfessionalBy(await new HealthcareProfessionalFilter(hcp1Api).build())

        expect(!!hcps).to.be.true
        expect(hcps.rows.length).to.be.greaterThan(0)
    })

    it('Can filter HCPs by union filter', async function () {
        const hcpFilterById = await new HealthcareProfessionalFilter(hcp1Api).byIds([hcp2.id!]).build()
        const hcpFilterByLabelCode = await new HealthcareProfessionalFilter(hcp1Api).byLabelCodeFilter('hcp-type', `physician-${id}`, 'practitioner-specialty', `gastroenterologist-${id}`).build()

        const unionFilter = FilterComposition.union(hcpFilterById, hcpFilterByLabelCode)

        const hcps = await hcp1Api.healthcareProfessionalApi.filterHealthcareProfessionalBy(unionFilter)

        expect(!!hcps).to.equal(true)
        expect(hcps.rows.length).to.be.greaterThanOrEqual(2)
        hcps.rows.forEach((hcp) => {
            expect(hcp).to.satisfy((h: HealthcareProfessional) => {
                return h.codes[0].code === `gastroenterologist-${id}` || h.id === hcp2.id
            })
        })
    })

    it('Can filter HCPs by implicit intersection filter', async function () {
        const hcps = await hcp1Api.healthcareProfessionalApi.filterHealthcareProfessionalBy(await new HealthcareProfessionalFilter(hcp1Api).byLabelCodeFilter(undefined, undefined, 'practitioner-specialty', `cardiologist-${id}`).byIds([hcp2.id!]).build())

        expect(!!hcps).to.equal(true)
        expect(hcps.rows.length).to.be.equal(1)
        hcps.rows.forEach((hcp) => {
            expect(hcp.codes[0].code).to.eq(`cardiologist-${id}`)
            expect(hcp.id).to.eq(hcp2.id)
        })
    })

    it('Can filter HCPs by explicit intersection filter', async function () {
        const hcpFilterById = await new HealthcareProfessionalFilter(hcp1Api).byIds([hcp3.id!]).build()
        const hcpFilterByLabelCode = await new HealthcareProfessionalFilter(hcp1Api).byLabelCodeFilter(undefined, undefined, 'practitioner-specialty', `cardiologist-${id}`).build()

        const intersectionFilter = FilterComposition.intersection(hcpFilterById, hcpFilterByLabelCode)

        const hcps = await hcp1Api.healthcareProfessionalApi.filterHealthcareProfessionalBy(intersectionFilter)

        expect(!!hcps).to.equal(true)
        expect(hcps.rows.length).to.be.equal(1)
        hcps.rows.forEach((hcp) => {
            expect(hcp.id).to.eq(hcp3.id)
            expect(hcp.codes[0].code).to.eq(`cardiologist-${id}`)
        })
    })

    it('Can filter HCPs using disjoint sets with intersection filter returns empty result', async function () {
        const hcps = await hcp1Api.healthcareProfessionalApi.filterHealthcareProfessionalBy(await new HealthcareProfessionalFilter(hcp1Api).byLabelCodeFilter(undefined, undefined, 'practitioner-specialty', `cardiologist-${id}`).byIds([hcp1.id!]).build())

        expect(!!hcps).to.equal(true)
        expect(hcps.rows.length).to.be.equal(0)
    })
    it('If a NoOpFilter is generated as result, an empty result is returned', async function () {
        const noOpFilter = await new HealthcareProfessionalFilter(hcp1Api).byIds([uuid()]).byIds([uuid()]).build()

        expect(NoOpFilter.isNoOp(noOpFilter)).to.be.true

        const hcps = await hcp1Api.healthcareProfessionalApi.filterHealthcareProfessionalBy(noOpFilter)
        expect(hcps.rows.length).to.be.equal(0)
    })
})
