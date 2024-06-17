import 'isomorphic-fetch'
import { getEnvironmentInitializer, hcp1Username, hcp2Username, hcp3Username, patUsername, setLocalStorage } from '../test-utils'
import { getEnvVariables, TestVars } from '@icure/test-setup/types'
import { IccDocumentApi, ISO639_1, Service, sleep, SubscriptionOptions, ua2utf8, utf8_2ua } from '@icure/api'
import { BasicAuthenticationProvider } from '@icure/api/icc-x-api/auth/AuthenticationProvider'
import { Annotation, AnonymousApiBuilder, CommonAnonymousApi, CommonApi, CryptoStrategies, domainTypeTag, forceUuid, ServiceLikeApiImpl } from '@icure/typescript-common'
import { BaseApiTestContext, WithHelementApi, WithPatientApi, WithServiceApi } from './TestContexts'
import { expectArrayContainsExactlyInAnyOrder } from '../assertions'
import { doXOnYAndSubscribe } from '../websocket-utils'
import { beforeAll, describe, it } from '@jest/globals'
import { IMMUNIZATION_FHIR_TYPE } from '@icure/ehr-lite-sdk/dist/mappers/Immunization.mapper'

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
    DSHelement,
>(name: string, ctx: BaseApiTestContext<DSAnonymousApiBuilder, DSAnonymousApi, DSApi, DSCryptoStrategies, DSUser, any> & WithPatientApi<DSApi, DSPatient> & WithServiceApi<DSApi, DSService, DSPatient, DSDocument> & WithHelementApi<DSApi, DSHelement, DSPatient>) {
    let env: TestVars

    describe(`${name} (Service like API)`, () => {
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
            expect(deletedServiceDto.created).toBeLessThan(deletedServiceDto.endOfLife!)
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
            expectArrayContainsExactlyInAnyOrder(
                deletedServicesIds,
                createdServicesDto.map((ds) => ds.id!),
            )
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
            expectArrayContainsExactlyInAnyOrder(
                deletedServicesIds,
                createdServicesDto.map((ds) => ds.id!),
            )
        })

        // TODO: This test is wrong, healthElementIds should no be used, instead healthElement link should be created through SubContact which can reference a healthElement to 1..* services)
        it.skip('Create Data Sample linked to HealthElement - Success', async () => {
            // Given
            const api = (await ctx.apiForEnvUser(env, hcp1Username)).api

            const patient = await ctx.createPatient(api)
            const patientId = ctx.toPatientDto(patient).id!

            const healthElementDto = ctx.toHelementDto(await ctx.createHelementForPatient(api, patient))
            const serviceToCreate = ctx.toDSService(
                new Service({
                    tags: [{ type: 'IC-TEST', code: 'TEST' }],
                    content: { en: { stringValue: 'Hello world' } },
                    healthElementsIds: [healthElementDto!.id!],
                }),
            )

            // When creating a data sample, linked to this healthcare element
            const createdService = await ctx.serviceApi(api).createOrModifyFor(patientId, serviceToCreate)

            // Then
            expect(createdService).toBeTruthy()
            const createdServiceDto = ctx.toServiceDto(createdService)
            expect(createdServiceDto.id).toBeTruthy()
            expect(createdServiceDto.healthElementsIds).toContain(healthElementDto.id)
        })

        // TODO: This test is wrong, healthElementIds should no be used, instead healthElement link should be created through SubContact which can reference a healthElement to 1..* services)
        it.skip('Create Data Sample and modify it to link it to HealthElement - Success', async () => {
            // Given
            const api = (await ctx.apiForEnvUser(env, hcp1Username)).api

            const patient = await ctx.createPatient(api)
            const patientId = ctx.toPatientDto(patient).id!

            const healthElementDto = ctx.toHelementDto(await ctx.createHelementForPatient(api, patient))
            const createdServiceDto = ctx.toServiceDto(await ctx.createServiceForPatient(api, patient))

            // When
            const modifiedService = await ctx.serviceApi(api).createOrModifyFor(
                patientId,
                ctx.toDSService(
                    new Service({
                        ...createdServiceDto,
                        healthElementsIds: [healthElementDto.id!],
                    }),
                ),
            )

            // Then
            expect(modifiedService).toBeTruthy()
            const modifiedServiceDto = ctx.toServiceDto(modifiedService)
            expect(modifiedServiceDto.id).toBeTruthy()
            expect(modifiedServiceDto.healthElementsIds).toContain(healthElementDto.id)
        })

        // TODO: This test is wrong, healthElementIds should no be used, instead healthElement link should be created through SubContact which can reference a healthElement to 1..* services)
        it.skip('Can not create Data Sample with invalid healthElementId', async () => {
            // Given
            const api = (await ctx.apiForEnvUser(env, hcp1Username)).api

            const patient = await ctx.createPatient(api)
            const patientId = ctx.toPatientDto(patient).id!

            const nonExistingHeId = 'THIS-DOES-NOT-EXIST'
            const serviceToCreate = ctx.toDSService(
                new Service({
                    tags: [{ type: 'IC-TEST', code: 'TEST' }],
                    content: { en: { stringValue: 'Hello world' } },
                    healthElementsIds: [nonExistingHeId],
                }),
            )

            const creationPromiseResult = await ctx
                .serviceApi(api)
                .createOrModifyFor(patientId, serviceToCreate)
                .catch((e) => e)
            expect(creationPromiseResult).toBeInstanceOf(Error)
            expect(creationPromiseResult.message).toContain(nonExistingHeId)
        })

        it('Filter Data Samples', async () => {
            const { api } = await ctx.apiForEnvUser(env, hcp1Username)

            const patient = await ctx.createPatient(api)
            const patientId = ctx.toPatientDto(patient).id!
            const createdService = await ctx.serviceApi(api).createOrModifyFor(
                patientId,
                ctx.toDSService(
                    new Service({
                        tags: [{ type: 'FILTER-IC-TEST', code: 'TEST' }],
                        content: { en: { stringValue: 'Hello world' } },
                    }),
                ),
            )
            const createdServiceDto = ctx.toServiceDto(createdService)

            const filter = await ctx.newServiceFilter(api).forSelf().byLabelCodeDateFilter('FILTER-IC-TEST', 'TEST').forPatients([patient]).build()

            const filteredServices = await ctx.serviceApi(api).filterBy(filter)
            expect(filteredServices.rows).toHaveLength(1)
            expect(ctx.toServiceDto(filteredServices.rows[0]).id).toEqual(createdServiceDto.id)
        })

        // TODO: This test is wrong, healthElementIds should no be used, instead healthElement link should be created through SubContact which can reference a healthElement to 1..* services)
        it.skip('Filter data samples by HealthElementIds - Success', async () => {
            // Given
            const { api } = await ctx.apiForEnvUser(env, hcp1Username)

            const patient = await ctx.createPatient(api)
            const patientId = ctx.toPatientDto(patient).id!
            const healthElement = ctx.toHelementDto(await ctx.createHelementForPatient(api, patient))
            const createdService = await ctx.serviceApi(api).createOrModifyFor(
                patientId,
                ctx.toDSService(
                    new Service({
                        tags: [{ type: 'FILTER-HE-IC-TEST', code: 'TEST' }],
                        content: { en: { stringValue: 'Hello world' } },
                        healthElementsIds: [healthElement.id!],
                    }),
                ),
            )
            const createdServiceDto = ctx.toServiceDto(createdService)

            const filter = await ctx.newServiceFilter(api).forSelf().byLabelCodeDateFilter('FILTER-HE-IC-TEST', 'TEST').byHealthElementIds([healthElement!.id!]).build()

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
                [createdServiceSingle, ...createdServiceMany].map((x) => ctx.toServiceDto(x).id),
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
                    ctx.toDSService(
                        new Service({
                            content: { en: { stringValue: `Some sample at ${valueDate}` } },
                            tags: [codeRef],
                            valueDate,
                        }),
                    ),
                )
            const createdServices: Service[] = []
            for (let i = 0; i < 50; i++) {
                createdServices.push(ctx.toServiceDto(await createService(Math.floor(Math.random() * 10000))))
            }
            const filter = await ctx.newServiceFilter(h1api).forSelf().sort.byLabelCodeDateFilter(labelType, labelCode, undefined, undefined, undefined, undefined, true).build()
            const filteredServices = await ctx.serviceApi(h1api).filterBy(filter)
            expectArrayContainsExactlyInAnyOrder(
                filteredServices.rows.map((x) => ctx.toServiceDto(x).id),
                createdServices.map((x) => x.id),
            )
            const sortedIds = [...filteredServices.rows].sort((a, b) => ctx.toServiceDto(b).valueDate! - ctx.toServiceDto(a).valueDate!).map((x) => ctx.toServiceDto(x).id)
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
                ctx.toDSService(
                    new Service({
                        content: {
                            en: { stringValue: valueEn },
                            fr: { stringValue: valueFr },
                        },
                    }),
                ),
            )
            const serviceDto = ctx.toServiceDto(service)
            const documentNameEn = 'something.png'
            const documentVersionEn = '1.0'
            const documentExternalUuidEn = h1api.baseApi.cryptoApi.primitives.randomUuid()
            const attachmentEn = 'World'
            const attachmentFr = 'Monde'
            const attachmentDocEn = await ctx.serviceApi(h1api).setAttachment(serviceDto.id!, utf8_2ua(attachmentEn), documentNameEn, documentVersionEn, documentExternalUuidEn, 'en')
            const attachmentDocEnDto = ctx.toDocumentDto(attachmentDocEn)
            expect(attachmentDocEnDto.name).toEqual(documentNameEn)
            expect(attachmentDocEnDto.version).toEqual(documentVersionEn)
            expect(attachmentDocEnDto.externalUuid).toEqual(documentExternalUuidEn)
            expect(attachmentDocEnDto.size).toEqual(attachmentEn.length)
            expect(attachmentDocEnDto.mainUti).toEqual('public.png')
            const attachmentDocFr = await ctx.serviceApi(h1api).setAttachment(serviceDto.id!, utf8_2ua(attachmentFr), undefined, undefined, undefined, 'fr')
            const attachmentDocFrDto = ctx.toDocumentDto(attachmentDocFr)
            expect(attachmentDocFrDto.size).toEqual(attachmentFr.length)
            const updatedService = ctx.toServiceDto(await ctx.serviceApi(h1api).get(serviceDto.id!))
            if (!serviceDto?.tags?.some((tag) => tag.code === IMMUNIZATION_FHIR_TYPE.toUpperCase())) {
                expect(updatedService.content!['en']!.stringValue).toEqual(valueEn)
                expect(updatedService.content!['en']!.documentId).toEqual(attachmentDocEnDto.id)
                expect(updatedService.content!['fr']!.stringValue).toEqual(valueFr)
                expect(updatedService.content!['fr']!.documentId).toEqual(attachmentDocFrDto.id)
                const attachmentEnContent = await ctx.serviceApi(h1api).getAttachmentContent(serviceDto.id!, attachmentDocEnDto.id!)
                expect(ua2utf8(attachmentEnContent)).toEqual(attachmentEn)
                const attachmentFrContent = await ctx.serviceApi(h1api).getAttachmentContent(serviceDto.id!, attachmentDocFrDto.id!)
                expect(ua2utf8(attachmentFrContent)).toEqual(attachmentFr)
                await expect(ctx.serviceApi(h1api).getAttachmentContent(serviceDto.id!, 'non-existing-id')).rejects.toBeInstanceOf(Error)
                const docApi = new IccDocumentApi(env!.iCureUrl, {}, new BasicAuthenticationProvider(hcp1Username, env!.dataOwnerDetails[hcp1Username].password), fetch)
                // Attachment should be encrypted
                expect(await docApi.getDocumentAttachment(attachmentDocEnDto.id!, 'ignored').then((x) => ua2utf8(x))).not.toEqual(attachmentEn)
                expect(await docApi.getDocumentAttachment(attachmentDocFrDto.id!, 'ignored').then((x) => ua2utf8(x))).not.toEqual(attachmentFr)
            }
        })

        it('Created attachments should be accessible to all data owners with access to the data sample', async () => {
            const { api: h1api } = await ctx.apiForEnvUser(env, hcp1Username)
            const { api: h2api, user: h2user } = await ctx.apiForEnvUser(env, hcp2Username)
            // TODO in order to modify a data sample currently the user needs to have access also to the patient of the data sample (client-side requirement due to implementation)
            const patient = await ctx.createPatient(h1api)
            await ctx.patientApi(h1api).giveAccessTo(patient, h2user.healthcarePartyId!)
            const dataSample = await ctx.serviceApi(h1api).giveAccessTo(await ctx.createServiceForPatient(h1api, patient), h2user.healthcarePartyId!)
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

            if (ctx.toServiceDto(dataSample)?.tags?.some((tag) => tag.code === IMMUNIZATION_FHIR_TYPE.toUpperCase())) {
                // Not applicable for immunization
                return
            }

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

        it('A shared service should still be shared after modification, even if it required to create a new contact', async () => {
            const { api: h1api } = await ctx.apiForEnvUser(env, hcp1Username)
            const { api: h2api, user: h2user } = await ctx.apiForEnvUser(env, hcp2Username)
            const patient = await ctx.createPatient(h1api)
            const service = await ctx.createServiceForPatient(h1api, patient)
            const sharedService = await ctx.serviceApi(h1api).giveAccessTo(service, h2user.healthcarePartyId!)
            await ctx.checkServiceAccessibleAndDecrypted(h2api, sharedService, true)
            ;(ctx.serviceApi(h1api) as ServiceLikeApiImpl<any, any, any>).clearContactCache()
            const modifiedService = await ctx.serviceApi(h1api).createOrModifyFor(
                ctx.toPatientDto(patient).id!,
                ctx.toDSService({
                    ...ctx.toServiceDto(sharedService),
                    notes: [
                        new Annotation({
                            markdown: {
                                en: 'Modified service',
                            } as Record<ISO639_1, string>,
                        }),
                    ],
                }),
            )
            expect(ctx.toServiceDto(modifiedService).notes![0]!.markdown!['en']!).toEqual('Modified service')
            await ctx.checkServiceAccessibleAndDecrypted(h2api, modifiedService, true)
        })

        it('If multiple services are created at once they should be part of the same contact', async () => {
            const { api: h1api } = await ctx.apiForEnvUser(env, hcp1Username)
            const patient = await ctx.createPatient(h1api)
            const services = await ctx.createServicesForPatient(h1api, patient)
            const servicesDtos = services.map((s) => ctx.toServiceDto(s))
            expect(servicesDtos.length).toBeGreaterThan(1)
            expect(servicesDtos[0].contactId).toBeTruthy()
            expect(forceUuid(servicesDtos[0].contactId)).toEqual(servicesDtos[0].contactId)
            expect(new Set(servicesDtos.map((s) => s.contactId)).size).toEqual(1)
            expect(new Set(servicesDtos.map((s) => s.id)).size).toEqual(servicesDtos.length)
        })

        it('If multiple services are created in quick succession but over different calls the services should NOT be part of the same contact', async () => {
            const { api: h1api } = await ctx.apiForEnvUser(env, hcp1Username)
            const patient = await ctx.createPatient(h1api)
            const service1 = ctx.toServiceDto(await ctx.createServiceForPatient(h1api, patient))
            const service2 = ctx.toServiceDto(await ctx.createServiceForPatient(h1api, patient))
            expect(service1.contactId).toBeTruthy()
            expect(service2.contactId).toBeTruthy()
            expect(service1.contactId).not.toEqual(service2.contactId)
        })

        it('Should allow to share a batch fully', async () => {
            const { api: h1api } = await ctx.apiForEnvUser(env, hcp1Username)
            const { api: h2api, user: h2user } = await ctx.apiForEnvUser(env, hcp2Username)
            const patient = await ctx.createPatient(h1api)
            const services = await ctx.createServicesForPatient(h1api, patient)
            const servicesDto = services.map((s) => ctx.toServiceDto(s))
            for (const service of services) {
                await ctx.checkServiceInaccessible(h2api, service)
            }
            const sharedServices = await ctx.serviceApi(h1api).giveAccessToMany(services, h2user.healthcarePartyId!)
            for (const sharedService of sharedServices) {
                const sharedServiceDto = ctx.toServiceDto(sharedService)
                expect(Object.keys(sharedServiceDto.content ?? {}).length).toBeGreaterThan(0)
                expect(sharedServiceDto.content).toEqual(servicesDto.find((s) => s.id === sharedServiceDto.id)!.content)
                await ctx.checkServiceAccessibleAndDecrypted(h2api, sharedService, true)
            }
            expect(new Set(sharedServices.map((s) => ctx.toServiceDto(s).contactId)).size).toEqual(1)
        })

        it('Should allow to share only some services of a batch', async () => {
            const { api: h1api } = await ctx.apiForEnvUser(env, hcp1Username)
            const { api: h2api, user: h2user } = await ctx.apiForEnvUser(env, hcp2Username)
            const patient = await ctx.createPatient(h1api)
            const services = await ctx
                .serviceApi(h1api)
                .createOrModifyManyFor(ctx.toPatientDto(patient).id!, [
                    ctx.toDSService({ notes: [new Annotation({ markdown: { en: 'Service 1' } as Record<ISO639_1, string> })] }),
                    ctx.toDSService({ notes: [new Annotation({ markdown: { en: 'Service 2' } as Record<ISO639_1, string> })] }),
                    ctx.toDSService({ notes: [new Annotation({ markdown: { en: 'Service 3' } as Record<ISO639_1, string> })] }),
                    ctx.toDSService({ notes: [new Annotation({ markdown: { en: 'Service 4' } as Record<ISO639_1, string> })] }),
                ])
            const servicesDto = services.map((s) => ctx.toServiceDto(s))
            expect(new Set(servicesDto.map((s) => s.contactId)).size).toEqual(1)
            for (const service of services) {
                await ctx.checkServiceInaccessible(h2api, service)
            }
            const servicesToShare = [services[0], services[2]]
            const sharedServices = await ctx.serviceApi(h1api).giveAccessToMany(servicesToShare, h2user.healthcarePartyId!)
            expect(sharedServices).toHaveLength(2)
            for (const sharedService of sharedServices) {
                const sharedServiceDto = ctx.toServiceDto(sharedService)
                expect(Object.keys(sharedServiceDto.notes ?? {}).length).toBeGreaterThan(0)
                expect(sharedServiceDto.notes?.map((n) => n.markdown)).toEqual(servicesDto.find((s) => s.id === sharedServiceDto.id)?.notes?.map((n) => n.markdown))
                await ctx.checkServiceAccessibleAndDecrypted(h2api, sharedService, true)
            }
            expect(new Set(sharedServices.map((s) => ctx.toServiceDto(s).contactId)).size).toEqual(1)
            await ctx.checkServiceInaccessible(h2api, services[1])
            await ctx.checkServiceInaccessible(h2api, services[3])
            expect(ctx.toServiceDto(await ctx.serviceApi(h1api).get(servicesDto[0].id!)).contactId).not.toEqual(servicesDto[0].contactId)
            expect(ctx.toServiceDto(await ctx.serviceApi(h1api).get(servicesDto[1].id!)).contactId).toEqual(servicesDto[1].contactId)
            expect(ctx.toServiceDto(await ctx.serviceApi(h1api).get(servicesDto[2].id!)).contactId).not.toEqual(servicesDto[2].contactId)
            expect(ctx.toServiceDto(await ctx.serviceApi(h1api).get(servicesDto[3].id!)).contactId).toEqual(servicesDto[3].contactId)
        })

        it('Changing part of a batch while batch is not closed allowed should not extract the service in a new batch', async () => {
            const { api } = await ctx.apiForEnvUser(env, hcp1Username)
            const patient = await ctx.createPatient(api)
            const patientId = ctx.toPatientDto(patient).id
            const services = await ctx.createServicesForPatient(api, patient)
            const servicesDto = services.map((s) => ctx.toServiceDto(s))
            const updatedService = await ctx.serviceApi(api).createOrModifyFor(
                patientId!,
                ctx.toDSService({
                    ...servicesDto[0],
                    notes: [
                        new Annotation({
                            markdown: {
                                en: 'Updated content',
                            } as Record<ISO639_1, string>,
                        }),
                    ],
                }),
            )
            const updatedServiceDto = ctx.toServiceDto(updatedService)
            expect(updatedServiceDto.id).toEqual(servicesDto[0].id)
            expect(updatedServiceDto.contactId).toEqual(servicesDto[0].contactId)
            expect(updatedServiceDto.contactId).toEqual(servicesDto[1].contactId)
            expect(updatedServiceDto.notes![0].markdown!.en!).toEqual('Updated content')
            expect(await ctx.serviceApi(api).get(servicesDto[0].id!)).toEqual(updatedService)
            // Other service should still exist and be equivalent.
            const retrievedUnmodifiedService = await ctx.serviceApi(api).get(servicesDto[1].id!)
            const retrievedUnmodifiedServiceDto = ctx.toServiceDto(retrievedUnmodifiedService)
            // Compare without considering encrypted self: random IV will make it different
            expect({
                ...retrievedUnmodifiedServiceDto,
                notes: retrievedUnmodifiedServiceDto?.notes?.map((n) => ({ markdown: n.markdown })),
                encryptedSelf: undefined,
            }).toEqual({
                ...servicesDto[1],
                notes: servicesDto[1]?.notes?.map((n) => ({ markdown: n.markdown })),
                encryptedSelf: undefined,
            })
        })

        const subscribeAndCreateContactOrService = async (options: SubscriptionOptions, eventTypes: ('CREATE' | 'UPDATE')[], supplier: () => Promise<void>) => {
            const { api, user } = await ctx.apiForEnvUser(env, hcp1Username)
            // TODO fix eventListener typing
            const connectionPromise = async (options: SubscriptionOptions, dataOwnerId: string, eventListener: (ds: Service) => Promise<void>) =>
                ctx.serviceApi(api).subscribeToEvents(eventTypes, await ctx.newServiceFilter(api).forSelf().build(), eventListener as unknown as any, options)

            const events: Service[] = []
            const statuses: string[] = []

            let eventReceivedPromiseResolve!: (value: void | PromiseLike<void>) => void
            let eventReceivedPromiseReject!: (reason?: any) => void
            const eventReceivedPromise = new Promise<void>((res, rej) => {
                eventReceivedPromiseResolve = res
                eventReceivedPromiseReject = rej
            })

            await doXOnYAndSubscribe(
                api!,
                options,
                connectionPromise({}, user.healthcarePartyId!, async (ds) => {
                    events.push(ds)
                    eventReceivedPromiseResolve()
                }),
                supplier,
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

        const createService = async () => {
            const { api, user } = await ctx.apiForEnvUser(env, hcp1Username)

            const newPatient = await ctx.createPatient(api)
            const newService = await ctx.createServiceForPatient(api, newPatient)

            return {
                service: ctx.toServiceDto(newService),
                patient: ctx.toPatientDto(newPatient),
            }
        }

        const deleteService = async () => {
            const { api, user } = await ctx.apiForEnvUser(env, hcp1Username)
            const { service } = await createService()

            await sleep(200)

            await ctx.serviceApi(api).delete(service.id!)
        }

        it('Can subscribe ServiceLike CREATE without options', async () => {
            await subscribeAndCreateContactOrService({}, ['CREATE'], async () => {
                await createService()
            })
        }, 60_000)

        it('Can subscribe ServiceLike CREATE with options', async () => {
            await subscribeAndCreateContactOrService(
                {
                    connectionRetryIntervalMs: 10_000,
                    connectionMaxRetry: 5,
                },
                ['CREATE'],
                async () => {
                    await createService()
                },
            )
        }, 60_000)

        it('Can subscribe ServiceLike CREATE without options with another instance of api', async () => {
            await subscribeAndCreateContactOrService({}, ['CREATE'], async () => {
                await createService()
            })
        }, 60_000)

        it('Can subscribe ServiceLike CREATE with options with another instance of api', async () => {
            await subscribeAndCreateContactOrService(
                {
                    connectionRetryIntervalMs: 10_000,
                    connectionMaxRetry: 5,
                },
                ['CREATE'],
                async () => {
                    await createService()
                },
            )
        }, 60_000)

        // Delete is not supported yet
        // it('Can subscribe ServiceLike DELETE without options', async () => {
        //     await subscribeAndCreateContactOrService({}, ['DELETE'], async () => deleteService())
        // }, 60_000)
        //
        // it('Can subscribe ServiceLike DELETE with options', async () => {
        //     await subscribeAndCreateContactOrService(
        //         {
        //             connectionRetryIntervalMs: 10_000,
        //             connectionMaxRetry: 5,
        //         },
        //         ['DELETE'],
        //         async () => deleteService(),
        //     )
        // }, 60_000)
    })
}
