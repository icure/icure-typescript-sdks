import 'mocha'
import 'isomorphic-fetch'
import { getEnvironmentInitializer, hcp1Username, hcp2Username, hcp3Username, patUsername, setLocalStorage } from '../test-utils'
import { getEnvVariables, TestVars } from '@icure/test-setup/types'
import {IccDocumentApi, Service, ua2utf8, utf8_2ua} from '@icure/api'
import { BasicAuthenticationProvider } from '@icure/api/icc-x-api/auth/AuthenticationProvider'
import {
    AnonymousApiBuilder,
    CommonAnonymousApi,
    CommonApi,
    CryptoStrategies,
    forceUuid,
    ServiceLikeApiImpl
} from '@icure/typescript-common'
import {
    BaseApiTestContext,
    WithHelementApi,
    WithPatientApi,
    WithServiceApi
} from "./TestContexts";
import {expectArrayContainsExactlyInAnyOrder} from "../assertions";

setLocalStorage(fetch)

export function testServiceLikeApi<
    DSAnonymousApiBuilder extends AnonymousApiBuilder<DSCryptoStrategies, DSAnonymousApi>,
    DSAnonymousApi extends CommonAnonymousApi<DSApi>,
    DSApi extends CommonApi,
    DSCryptoStrategies extends CryptoStrategies<any>,
    DSUser,
    DSPatient,
    DSService,
    DSDocument,
    DSHelement
>(
    ctx: BaseApiTestContext<
        DSAnonymousApiBuilder,
        DSAnonymousApi,
        DSApi,
        DSCryptoStrategies,
        DSUser
    > & WithPatientApi<DSApi, DSPatient>
      & WithServiceApi<DSApi, DSService, DSPatient, DSDocument>
      & WithHelementApi<DSApi, DSHelement, DSPatient>
) {
    let env: TestVars

    describe('Data Samples API', () => {
        beforeAll(async function () {
            const initializer = await getEnvironmentInitializer()
            env = await initializer.execute(getEnvVariables())
        }, 600_000)

        it('Create Data Sample - Success', async () => {
            // Given
            const api = (await ctx.apiForEnvUser(env, hcp1Username)).api

            const patient = await ctx.createPatient(api)

            // When
            const createdService = await ctx.createServiceForPatient(api, patient)

            // Then
            expect(createdService).toBeTruthy()

            const mappedServiceDto = ctx.toServiceDto(createdService)
            expect(forceUuid(mappedServiceDto.id)).toEqual(mappedServiceDto.id)
        })

        it('Delete a Data Sample - Success', async () => {
            // Given
            const api = (await ctx.apiForEnvUser(env, hcp1Username)).api

            const patient = await ctx.createPatient(api)

            // When
            const createdService = await ctx.createServiceForPatient(api, patient)
            const createdServiceDto = ctx.toServiceDto(createdService)
            const timeBeforeDeletion = new Date().getTime()
            const deletedServiceId = await ctx.serviceApi(api).delete(createdServiceDto.id!)

            // Then
            expect(createdServiceDto.id).toEqual(deletedServiceId)
            expect(createdServiceDto.endOfLife).toBeFalsy()

            const deletedServiceDto = ctx.toServiceDto(await ctx.serviceApi(api).get(deletedServiceId))
            expect(deletedServiceDto.endOfLife).toBeTruthy()
            expect(deletedServiceDto.endOfLife).toBeGreaterThan(timeBeforeDeletion)
            expect(deletedServiceDto.created).toBeLessThan(deletedServiceDto.endOfLife)
        })

        it('Delete Data Sample - part of same batch - Success', async () => {
            // Given
            const api = (await ctx.apiForEnvUser(env, hcp1Username)).api

            const patient = await ctx.createPatient(api)

            // When
            const createdDataSamples = await ctx.createServicesForPatient(api, patient)
            expect(createdDataSamples.length).toBeGreaterThan(1)
            const createdServicesDto = createdDataSamples.map((ds) => ctx.toServiceDto(ds))
            const expectedBatch = createdServicesDto[0].contactId
            expect(createdServicesDto.every((ds) => ds.contactId === expectedBatch)).toBe(true)
            const deletedServiceId = await ctx.serviceApi(api).delete(createdServicesDto[0].id!)
            // Then
            expect(deletedServiceId).toEqual(createdServicesDto[0].id!)
            const deletedServiceDto = ctx.toServiceDto(await ctx.serviceApi(api).get(deletedServiceId))
            expect(deletedServiceDto.endOfLife).toBeTruthy()
            for (const nonDeletedService of createdServicesDto.slice(1)) {
                const retrievedNotDeletedDto = ctx.toServiceDto(await ctx.serviceApi(api).get(nonDeletedService.id!))
                expect(retrievedNotDeletedDto.endOfLife).toBeFalsy()
            }
        })

        it('Delete Data Samples - with data in cache - Success', async () => {
            // Given
            const api = (await ctx.apiForEnvUser(env, hcp1Username)).api

            const patient = await ctx.createPatient(api)

            // When
            const createdDataSamples = await ctx.createServicesForPatient(api, patient)
            const createdServicesDto = createdDataSamples.map((ds) => ctx.toServiceDto(ds))
            const deletedServicesIds = await ctx.serviceApi(api).deleteMany(createdServicesDto.map((ds) => ds.id!))
            // Then
            expect(deletedServicesIds).toHaveLength(2)
            expectArrayContainsExactlyInAnyOrder(deletedServicesIds, createdServicesDto.map((ds) => ds.id!))
        })

        it('Delete Data Samples - without data in cache - Success', async () => {
            // Given
            const api = (await ctx.apiForEnvUser(env, hcp1Username)).api

            const patient = await ctx.createPatient(api)

            // When
            const createdDataSamples = await ctx.createServicesForPatient(api, patient)
            const createdServicesDto = createdDataSamples.map((ds) => ctx.toServiceDto(ds))
            const deletedServicesIds = await ctx.serviceApi(api).deleteMany(createdServicesDto.map((ds) => ds.id!))
            ;(ctx.serviceApi(api) as ServiceLikeApiImpl<any, any, any>).clearContactCache()
            // Then
            expect(deletedServicesIds).toHaveLength(2)
            expectArrayContainsExactlyInAnyOrder(deletedServicesIds, createdServicesDto.map((ds) => ds.id!))
        })

        it('Create Data Sample linked to HealthElement - Success', async () => {
            // Given
            const api = (await ctx.apiForEnvUser(env, hcp1Username)).api

            const patient = await ctx.createPatient(api)
            const patientId = ctx.toPatientDto(patient).id!

            const healthElementDto = ctx.toHelementDto(await ctx.createHelementForPatient(api, patient))
            const serviceToCreate = ctx.toDSService(new Service({
                tags: [{ type: 'IC-TEST', code: 'TEST' }],
                content: { en: { stringValue: 'Hello world' } },
                healthElementsIds: [healthElementDto!.id!],
            }))

            // When creating a data sample, linked to this healthcare element
            const createdService = await ctx.serviceApi(api).createOrModifyFor(patientId, serviceToCreate)

            // Then
            expect(createdService).toBeTruthy()
            const createdServiceDto = ctx.toServiceDto(createdService)
            expect(createdServiceDto.id).toBeTruthy()
            expect(createdServiceDto.healthElementsIds).toContain(healthElementDto.id)
        })

        it('Create Data Sample and modify it to link it to HealthElement - Success', async () => {
            // Given
            const api = (await ctx.apiForEnvUser(env, hcp1Username)).api

            const patient = await ctx.createPatient(api)
            const patientId = ctx.toPatientDto(patient).id!

            const healthElementDto = ctx.toHelementDto(await ctx.createHelementForPatient(api, patient))
            const createdServiceDto = ctx.toServiceDto(await ctx.createServiceForPatient(api, patient))

            // When
            const modifiedService = await ctx.serviceApi(api).createOrModifyFor(
                patientId,
                ctx.toDSService(new Service({
                    ...createdServiceDto,
                    healthElementsIds: [healthElementDto.id!],
                }))
            )

            // Then
            expect(modifiedService).toBeTruthy()
            const modifiedServiceDto = ctx.toServiceDto(modifiedService)
            expect(modifiedServiceDto.id).toBeTruthy()
            expect(modifiedServiceDto.healthElementsIds).toContain(healthElementDto.id)
        })

        it('Can not create Data Sample with invalid healthElementId', async () => {
            // Given
            const api = (await ctx.apiForEnvUser(env, hcp1Username)).api

            const patient = await ctx.createPatient(api)
            const patientId = ctx.toPatientDto(patient).id!

            const nonExistingHeId = 'THIS-DOES-NOT-EXIST'
            const serviceToCreate = ctx.toDSService(new Service({
                tags: [{ type: 'IC-TEST', code: 'TEST' }],
                content: { en: { stringValue: 'Hello world' } },
                healthElementsIds: [nonExistingHeId],
            }))

            const creationPromiseResult = await ctx.serviceApi(api).createOrModifyFor(patientId, serviceToCreate).catch((e) => e)
            expect(creationPromiseResult).toBeInstanceOf(Error)
            expect(creationPromiseResult.message).toContain(nonExistingHeId)
        })

        it('Filter Data Samples', async () => {
            const { api } = await ctx.apiForEnvUser(env, hcp1Username)

            const patient = await ctx.createPatient(api)
            const patientId = ctx.toPatientDto(patient).id!
            const createdService = await ctx.serviceApi(api).createOrModifyFor(
                patientId,
                ctx.toDSService(new Service({
                    tags: [{ type: 'FILTER-IC-TEST', code: 'TEST' }],
                    content: { en: { stringValue: 'Hello world' } },
                }))
            )
            const createdServiceDto = ctx.toServiceDto(createdService)

            const filter = await ctx.newServiceFilter(api)
                .forSelf()
                .byLabelCodeDateFilter('FILTER-IC-TEST', 'TEST')
                .forPatients([ctx.toPatientDto(patient)]) // TODO COMPATIBILITY: should use DSPatient type
                .build()

            const filteredServices = await ctx.serviceApi(api).filterBy(filter)
            expect(filteredServices.rows).toHaveLength(1)
            expect(ctx.toServiceDto(filteredServices.rows[0]).id).toEqual(createdServiceDto.id)
        })

        it('Filter data samples by HealthElementIds - Success', async () => {
            // Given
            const { api } = await ctx.apiForEnvUser(env, hcp1Username)

            const patient = await ctx.createPatient(api)
            const patientId = ctx.toPatientDto(patient).id!
            const healthElement = ctx.toHelementDto(await ctx.createHelementForPatient(api, patient))
            const createdService = await ctx.serviceApi(api).createOrModifyFor(
                patientId,
                ctx.toDSService(new Service({
                    tags: [{ type: 'FILTER-HE-IC-TEST', code: 'TEST' }],
                    content: { en: { stringValue: 'Hello world' } },
                    healthElementsIds: [healthElement.id!],
                }))
            )
            const createdServiceDto = ctx.toServiceDto(createdService)

            const filter = await ctx.newServiceFilter(api)
                .forSelf()
                .byLabelCodeDateFilter('FILTER-HE-IC-TEST', 'TEST')
                .byHealthElementIds([healthElement!.id!])
                .build()

            const filteredDataSamples = await ctx.serviceApi(api).filterBy(filter)
            expect(filteredDataSamples.rows).toHaveLength(1)
            const testedDataSample = ctx.toServiceDto(filteredDataSamples.rows[0])
            expect(testedDataSample.healthElementsIds).toContain(healthElement.id!)
        })

        it('Patient sharing data sample with HCP', async () => {
            // Given
            const { api: patApi, user: patUser } = await ctx.apiForEnvUser(env, patUsername)
            const currentPatient = await ctx.patientApi(patApi).get(patUser.patientId!)

            const { api: hcpApi, user: hcpUser } = await ctx.apiForEnvUser(env, hcp2Username)
            const createdService = await ctx.createServiceForPatient(patApi, currentPatient)
            // Initially hcp can't get data sample
            await ctx.checkServiceInaccessible(hcpApi, createdService)
            // Patient shares data sample and gets it updated and decrypted
            const sharedService = await ctx.serviceApi(patApi).giveAccessTo(createdService, hcpUser.healthcarePartyId!)
            ctx.checkDefaultServiceDecrypted(sharedService)
            // Hcp can now get data sample and decrypt it
            await ctx.checkServiceAccessibleAndDecrypted(hcpApi, sharedService, true)
        })

        it('HCP sharing data sample with patient', async () => {
            // Given
            const { api: patApi, user: patUser } = await ctx.apiForEnvUser(env, patUsername)
            const { api: hcpApi, user: hcpUser } = await ctx.apiForEnvUser(env, hcp2Username)
            const currentPatient = await ctx.patientApi(patApi).get(patUser.patientId!)
            const updatedPatient = await ctx.patientApi(patApi).giveAccessTo(currentPatient, hcpUser.healthcarePartyId!)
            const createdService = await ctx.createServiceForPatient(hcpApi, updatedPatient)
            // Initially patient can't get data sample
            await ctx.checkServiceInaccessible(patApi, createdService)
            // Hcp shares data sample and gets it updated and decrypted
            const sharedService = await ctx.serviceApi(hcpApi).giveAccessTo(createdService, patUser.patientId!)
            ctx.checkDefaultServiceDecrypted(sharedService)
            // Patient can now get data sample and decrypt it
            await patApi.baseApi.cryptoApi.forceReload()
            await ctx.checkServiceAccessibleAndDecrypted(patApi, sharedService, true)
        })

        it('HCP sharing data sample with another HCP', async () => {
            // Given
            const { api: hcp1Api, user: hcp1User } = await ctx.apiForEnvUser(env, hcp1Username)
            const { api: hcp2Api, user: hcp2User } = await ctx.apiForEnvUser(env, hcp2Username)

            const patient = await ctx.createPatient(hcp1Api)

            const createdService = await ctx.createServiceForPatient(hcp1Api, patient)
            // Initially hcp2 can't get data sample
            await ctx.checkServiceInaccessible(hcp2Api, createdService)
            // Hcp shares data sample and gets it updated and decrypted
            const sharedService = await ctx.serviceApi(hcp1Api).giveAccessTo(createdService, hcp2User.healthcarePartyId!)
            ctx.checkDefaultServiceDecrypted(sharedService)
            // Hcp 2 can now get data sample and decrypt it
            await ctx.checkServiceAccessibleAndDecrypted(hcp2Api, sharedService, true)
        })

        it('Optimization - No delegation sharing if delegated already has access to data sample', async () => {
            const { api: hcp1Api, user: hcp1User } = await ctx.apiForEnvUser(env, hcp1Username)
            const { api: hcp2Api, user: hcp2User } = await ctx.apiForEnvUser(env, hcp2Username)
            const patient = await ctx.createPatient(hcp1Api)
            const createdService = await ctx.createServiceForPatient(hcp1Api, patient)
            const sharedService = await ctx.serviceApi(hcp1Api).giveAccessTo(createdService, hcp2User.healthcarePartyId!)
            const sharedService2 = await ctx.serviceApi(hcp1Api).giveAccessTo(sharedService, hcp2User.healthcarePartyId!)
            expect(sharedService2).toEqual(sharedService)
            expect(ctx.toServiceDto(sharedService2)).toEqual(ctx.toServiceDto(sharedService))
        })

        it('A data owner with no access to a service may not share it', async () => {
            const { api: hcp1Api } = await ctx.apiForEnvUser(env, hcp1Username)
            const { api: hcp3Api } = await ctx.apiForEnvUser(env, hcp3Username)
            const { user: patUser } = await ctx.apiForEnvUser(env, patUsername)
            const patient = await ctx.createPatient(hcp1Api)
            const createdService = await ctx.createServiceForPatient(hcp1Api, patient)

            // When
            await expect(ctx.serviceApi(hcp3Api).giveAccessTo(createdService, patUser.patientId!)).rejects.toBeInstanceOf(Error)
        })

        it('Data Owner can filter all the Services  for a Patient - Success', async () => {
            const { api } = await ctx.apiForEnvUser(env, hcp1Username)
            const patient = await ctx.createPatient(api)
            const createdServiceSingle = await ctx.createServiceForPatient(api, patient)
            const createdServiceMany = await ctx.createServicesForPatient(api, patient)
            const retrievedServices = await ctx.serviceApi(api).getForPatient(patient)
            expect(retrievedServices).toHaveLength(createdServiceMany.length + 1)
            expectArrayContainsExactlyInAnyOrder(
                retrievedServices.map((x) => ctx.toServiceDto(x).id),
                [createdServiceSingle, ...createdServiceMany].map((x) => ctx.toServiceDto(x).id)
            )
        })

        it('getDataSamplesForPatient returns no Data Samples for a Patient with no Data Samples', async () => {
            const { api } = await ctx.apiForEnvUser(env, hcp1Username)
            const patient = await ctx.createPatient(api)
            const filteredSamples = await ctx.serviceApi(api).getForPatient(patient)
            expect(filteredSamples).toHaveLength(0)
        })

        it('Should be able to create a DataSample and retrieve the associated patientId', async () => {
            const { api } = await ctx.apiForEnvUser(env, hcp1Username)
            const patient = await ctx.createPatient(api)
            const patientId = ctx.toPatientDto(patient).id!
            const service = await ctx.createServiceForPatient(api, patient)
            const extractedId = await ctx.serviceApi(api).extractPatientId(service)
            expect(extractedId).toEqual(patientId)
        })

        it('Should be able to filter and sort data samples by descending value date', async () => {
            const { api: h1api } = await ctx.apiForEnvUser(env, hcp1Username)
            const patient = await ctx.createPatient(h1api)
            const patientId = ctx.toPatientDto(patient).id!
            const labelType = `type-${h1api.baseApi.cryptoApi.primitives.randomUuid()}`
            const labelCode = `code-${h1api.baseApi.cryptoApi.primitives.randomUuid()}`
            const codeRef = {
                code: labelCode,
                type: labelType,
                version: '1',
                id: 'Some id',
            }
            const createService = (valueDate: number) =>
                ctx.serviceApi(h1api).createOrModifyFor(
                    patientId,
                    ctx.toDSService(new Service({
                        content: { en: { stringValue: `Some sample at ${valueDate}` } },
                        tags: [codeRef],
                        valueDate,
                    }))
                )
            const createdServices: Service[] = []
            for (let i = 0; i < 50; i++) {
                createdServices.push(ctx.toServiceDto(await createService(Math.floor(Math.random() * 10000))))
            }
            const filter = await ctx.newServiceFilter(h1api)
                .forSelf()
                .sort.byLabelCodeDateFilter(labelType, labelCode, undefined, undefined, undefined, undefined, true)
                .build()
            const filteredServices = await ctx.serviceApi(h1api).filterBy(filter)
            expectArrayContainsExactlyInAnyOrder(filteredServices.rows.map((x) => ctx.toServiceDto(x).id), createdServices.map((x) => x.id))
            const sortedIds = [...filteredServices.rows]
                .sort((a, b) => ctx.toServiceDto(b).valueDate! - ctx.toServiceDto(a).valueDate!)
                .map((x) => ctx.toServiceDto(x).id)
            expect(filteredServices.rows.map((x) => ctx.toServiceDto(x).id)).toEqual(sortedIds)
        })

        it('Should be able to create encrypted attachments to data samples', async () => {
            const { api: h1api } = await ctx.apiForEnvUser(env, hcp1Username)
            const patient = await ctx.createPatient(h1api)
            const patientId = ctx.toPatientDto(patient).id!
            const valueEn = 'Hello'
            const valueFr = 'Bonjour'
            const service = await ctx.serviceApi(h1api).createOrModifyFor(
                patientId,
                ctx.toDSService(new Service({
                    content: {
                        en: { stringValue: valueEn },
                        fr: { stringValue: valueFr },
                    },
                }))
            )
            const serviceDto = ctx.toServiceDto(service)
            const documentNameEn = 'something.png'
            const documentVersionEn = '1.0'
            const documentExternalUuidEn = h1api.baseApi.cryptoApi.primitives.randomUuid()
            const attachmentEn = 'World'
            const attachmentFr = 'Monde'
            const attachmentDocEn = await ctx.serviceApi(h1api).setAttachment(
                serviceDto.id!,
                utf8_2ua(attachmentEn),
                documentNameEn,
                documentVersionEn,
                documentExternalUuidEn,
                'en'
            )
            const attachmentDocEnDto = ctx.toDocumentDto(attachmentDocEn)
            expect(attachmentDocEnDto.name).toEqual(documentNameEn)
            expect(attachmentDocEnDto.version).toEqual(documentVersionEn)
            expect(attachmentDocEnDto.externalUuid).toEqual(documentExternalUuidEn)
            expect(attachmentDocEnDto.size).toEqual(attachmentEn.length)
            expect(attachmentDocEnDto.mainUti).toEqual('public.png')
            const attachmentDocFr = await ctx.serviceApi(h1api).setAttachment(
                serviceDto.id!,
                utf8_2ua(attachmentFr),
                undefined,
                undefined,
                undefined,
                'fr'
            )
            const attachmentDocFrDto = ctx.toDocumentDto(attachmentDocFr)
            expect(attachmentDocFrDto.size).toEqual(attachmentFr.length)
            const updatedDataSampleDto = ctx.toServiceDto(await ctx.serviceApi(h1api).get(serviceDto.id!))
            expect(updatedDataSampleDto.content['en']!.stringValue).toEqual(valueEn)
            expect(updatedDataSampleDto.content['en']!.documentId).toEqual(attachmentDocEnDto.id)
            expect(updatedDataSampleDto.content['fr']!.stringValue).toEqual(valueFr)
            expect(updatedDataSampleDto.content['fr']!.documentId).toEqual(attachmentDocFrDto.id)
            const attachmentEnContent = await ctx.serviceApi(h1api).getAttachmentContent(serviceDto.id!, attachmentDocEnDto.id!)
            expect(ua2utf8(attachmentEnContent)).toEqual(attachmentEn)
            const attachmentFrContent = await ctx.serviceApi(h1api).getAttachmentContent(serviceDto.id!, attachmentDocFrDto.id!)
            expect(ua2utf8(attachmentFrContent)).toEqual(attachmentFr)
            await expect(ctx.serviceApi(h1api).getAttachmentContent(serviceDto.id!, 'non-existing-id')).rejects.toBeInstanceOf(Error)
            const docApi = new IccDocumentApi(
                env!.iCureUrl,
                {},
                new BasicAuthenticationProvider(hcp1Username, env!.dataOwnerDetails[hcp1Username].password),
                fetch
            )
            // Attachment should be encrypted
            expect(await docApi.getDocumentAttachment(attachmentDocEnDto.id!, 'ignored').then((x) => ua2utf8(x))).not.toEqual(attachmentEn)
            expect(await docApi.getDocumentAttachment(attachmentDocFrDto.id!, 'ignored').then((x) => ua2utf8(x))).not.toEqual(attachmentFr)
        })

        it('Created attachments should be accessible to all data owners with access to the data sample', async () => {
            const { api: h1api } = await ctx.apiForEnvUser(env, hcp1Username)
            const { api: h2api, user: h2user } = await ctx.apiForEnvUser(env, hcp2Username)
            // TODO in order to modify a data sample currently the user needs to have access also to the patient of the data sample (client-side requirement due to implementation)
            const patient = await ctx.createPatient(h1api)
            await ctx.patientApi(h1api).giveAccessTo(patient, h2user.healthcarePartyId!)
            const dataSample = await ctx.serviceApi(h1api).giveAccessTo(
                await ctx.createServiceForPatient(h1api, patient),
                h2user.healthcarePartyId!
            )
            const dataSampleId = ctx.toServiceDto(dataSample).id!
            const value = 'Some attachment'
            const attachmentDoc = await ctx.serviceApi(h2api).setAttachment(dataSampleId, utf8_2ua(value))
            const attachmentDocId = ctx.toDocumentDto(attachmentDoc).id!
            expect(ua2utf8(await ctx.serviceApi(h1api).getAttachmentContent(dataSampleId, attachmentDocId))).toEqual(value)
        })

        it('Sharing a data sample should also share attachments of that data sample', async () => {
            const { api: h1api } = await ctx.apiForEnvUser(env, hcp1Username)
            const { api: h2api, user: h2user } = await ctx.apiForEnvUser(env, hcp2Username)
            const patient = await ctx.createPatient(h1api)
            const dataSample = await ctx.createServiceForPatient(h1api, patient)
            const dataSampleId = ctx.toServiceDto(dataSample).id!
            const value1 = 'Some attachment 1'
            const value2 = 'Some attachment 2'
            const attachmentDocEn = await ctx.serviceApi(h1api).setAttachment(dataSampleId, utf8_2ua(value1), undefined, undefined, undefined, 'en')
            const attachmentDocEnId = ctx.toDocumentDto(attachmentDocEn).id!
            const attachmentDocFr = await ctx.serviceApi(h1api).setAttachment(dataSampleId, utf8_2ua(value2), undefined, undefined, undefined, 'fr')
            const attachmentDocFrId = ctx.toDocumentDto(attachmentDocFr).id!
            await expect(ctx.serviceApi(h2api).getAttachmentContent(dataSampleId, attachmentDocEnId)).rejects.toBeInstanceOf(Error)
            await expect(ctx.serviceApi(h2api).getAttachmentContent(dataSampleId, attachmentDocFrId)).rejects.toBeInstanceOf(Error)
            await ctx.serviceApi(h1api).giveAccessTo(dataSample, h2user.healthcarePartyId!)
            expect(ua2utf8(await ctx.serviceApi(h2api).getAttachmentContent(dataSampleId, attachmentDocEnId))).toEqual(value1)
            expect(ua2utf8(await ctx.serviceApi(h2api).getAttachmentContent(dataSampleId, attachmentDocFrId))).toEqual(value2)
        })
    })
}
