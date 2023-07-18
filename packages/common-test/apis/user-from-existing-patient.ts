// import 'isomorphic-fetch'
// import { medTechApi, MedTechApi } from '../../src/apis/MedTechApi'
// import { webcrypto } from 'crypto'
// import { sleep } from '@icure/api'
// import {
//   getEnvironmentInitializer,
//   getTempEmail,
//   hcp1Username,
//   hcp3Username,
//   patUsername,
//   setLocalStorage,
//   TestMessageFactory,
//   TestUtils
// } from '../test-utils'
// import { assert, expect, use as chaiUse } from 'chai'
// import { getEnvVariables, TestVars } from '@icure/test-setup/types'
// import { NotificationTypeEnum, User } from '@icure/typescript-common'
// import { HealthcareProfessional } from '../../src/models/HealthcareProfessional.model'
// import { Patient } from '../../src/models/Patient.model'
// import { Address } from '../../src/models/Address.model'
// import { Telecom } from '../../src/models/Telecom.model'
// import { AnonymousMedTechApi } from '../../src/apis/AnonymousMedTechApi'
// import { SimpleMedTechCryptoStrategies } from '../../src/services/MedTechCryptoStrategies'
// import { HealthcareElementFilter } from '../../src/filter/HealthcareElementFilterDsl'
// import { mapPatientToPatientDto } from '../../src/mappers/Patient.mapper'
// import { describe, before, it } from 'mocha'
//
// chaiUse(require('chai-as-promised'))
//
// setLocalStorage(fetch)
//
// let env: TestVars
// let hcp1Api: MedTechApi
// let hcp1User: User
// let hcp1: HealthcareProfessional
// let hcp3Api: MedTechApi
// let hcp3User: User
// let patApi: MedTechApi
// let patUser: User
//
// describe('A Healthcare Party', () => {
//   before(async function () {
//     this.timeout(600000)
//     const initializer = await getEnvironmentInitializer()
//     env = await initializer.execute(getEnvVariables())
//
//     if (env.backendType === 'oss') this.skip()
//
//     const hcpApi1AndUser = await TestUtils.createMedTechApiAndLoggedUserFor(
//       env.iCureUrl,
//       env.dataOwnerDetails[hcp1Username],
//       (b) => b
//           .withMsgGwUrl(env!.msgGtwUrl)
//           .withMsgGwSpecId(env!.specId)
//           .withMessageFactory(new TestMessageFactory())
//     )
//     hcp1Api = hcpApi1AndUser.api
//     hcp1User = hcpApi1AndUser.user
//     hcp1 = await hcp1Api.healthcareProfessionalApi.getHealthcareProfessional(hcp1User.healthcarePartyId!)
//
//     const hcpApi3AndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env.iCureUrl, env.dataOwnerDetails[hcp3Username])
//     hcp3Api = hcpApi3AndUser.api
//     hcp3User = hcpApi3AndUser.user
//
//     const patApiAndUser = await TestUtils.createMedTechApiAndLoggedUserFor(env.iCureUrl, env.dataOwnerDetails[patUsername])
//     patApi = patApiAndUser.api
//     patUser = patApiAndUser.user
//   })
//
//   async function userFromPatient(api: MedTechApi, patient: Patient, hcp: HealthcareProfessional) {
//     const existingPatient = await api.patientApi.createOrModifyPatient(patient)
//     assert(!!existingPatient)
//
//     const createdUser = await api.userApi.createAndInviteUser(existingPatient)
//     assert(!!createdUser)
//     assert(createdUser.patientId === existingPatient.id)
//   }
//

//
//   it('should not be able to create a new User if the Patient has no contact information', async () => {
//     const newPatient = new Patient({
//       firstName: 'Marc',
//       lastName: 'Specter',
//     })
//
//     await expect(userFromPatient(hcp1Api, newPatient, hcp1)).to.be.rejected
//   })
//
//   it('should not be able to create a new User if it already exists for that Patient', async () => {
//     const email = getTempEmail()
//     const newPatient = await hcp1Api.patientApi.createOrModifyPatient(
//       new Patient({
//         firstName: 'Marc',
//         lastName: 'Specter',
//       })
//     )
//     assert(!!newPatient)
//     const newUser = await hcp1Api.userApi.createOrModifyUser(
//       new User({
//         login: email,
//         patientId: newPatient.id,
//         email: email,
//       })
//     )
//     assert(!!newUser)
//
//     await expect(hcp1Api.userApi.createAndInviteUser(newPatient, 3600)).to.be.rejected
//   })
// })
//
// describe('A patient user', () => {
//   it('should be able to create new data and modify non-encrypted data before being given full access to existing data', async () => {
//     const email = getTempEmail()
//     const patientNote = 'He is moon knight'
//     const patient = await hcp1Api.patientApi.createOrModifyPatient(
//       new Patient({
//         firstName: 'Marc',
//         lastName: 'Specter',
//         note: patientNote,
//         addresses: [
//           new Address({
//             addressType: 'home',
//             description: 'London',
//             telecoms: [
//               new Telecom({
//                 telecomType: 'email',
//                 telecomNumber: email,
//               }),
//             ],
//           }),
//         ],
//       })
//     )
//     const heByHcp = await TestUtils.createHealthElementForPatient(hcp1Api, patient)
//     // Create patient api
//     await hcp1Api.userApi.createAndInviteUser(patient, 3600)
//
//     await sleep(3_000)
//
//     const anonymousMedTechApi = await new AnonymousMedTechApi.Builder()
//       .withICureBaseUrl(env!.iCureUrl)
//       .withMsgGwUrl(env!.msgGtwUrl)
//       .withMsgGwSpecId(env!.specId)
//       .withCrypto(webcrypto as any)
//       .withAuthProcessByEmailId(env!.patAuthProcessId)
//       .withAuthProcessBySmsId(env!.patAuthProcessId)
//       .withCryptoStrategies(new SimpleMedTechCryptoStrategies([]))
//       .build()
//     const loginAndPassword = (await TestUtils.getEmail(email)).subject!
//     const authResult = await anonymousMedTechApi.authenticationApi.authenticateAndAskAccessToItsExistingData(
//       loginAndPassword.split('|')[0],
//       loginAndPassword.split('|')[1]
//     )
//     const patientApi = authResult!.medTechApi
//
//     // When the patient has not been given access to his data he...
//
//     // ...can modify only non-encrypted data of patient and...
//     const encryptedPatient = await patientApi.patientApi.getPatientAndTryDecrypt(patient.id!)
//     expect(encryptedPatient.decrypted).to.be.false
//     encryptedPatient.patient.note = 'This is not allowed'
//     await expect(patientApi.patientApi.createOrModify(encryptedPatient.patient)).to.be.rejected
//     encryptedPatient.patient.note = undefined
//     encryptedPatient.patient.lastName = 'Ghost'
//     const modifiedPatient = await patientApi.patientApi.createOrModify(encryptedPatient.patient)
//     const modifiedPatientDto = mapPatientToPatientDto(modifiedPatient)
//     expect((await patientApi.patientApi.getPatientAndTryDecrypt(patient.id!)).patient.lastName).to.equal('Ghost')
//     expect((await hcp1Api.patientApi.getPatient(patient.id!)).note).to.equal(patientNote) // Should not destroy encrypted data
//     // ...can create medical data
//     const heByPatient = await TestUtils.createHealthElementForPatient(patientApi, modifiedPatient)
//     // Originally medical data can't be accessed by others...
//     await expect(hcp1Api.healthcareElementApi.getHealthcareElement(heByPatient.id!)).to.be.rejected
//     await expect(patientApi.healthcareElementApi.getHealthcareElement(heByHcp.id!)).to.be.rejected
//     // ...but it can be shared
//     const heByPatientWithUpdatedAccess = await patientApi.healthcareElementApi.giveAccessTo(heByPatient, hcp1.id!)
//     expect(heByPatientWithUpdatedAccess.note).to.not.be.undefined
//     const heByHcpWithUpdatedAccess = await hcp1Api.healthcareElementApi.giveAccessTo(heByHcp, patient.id!)
//     expect(heByHcpWithUpdatedAccess.note).to.not.be.undefined
//     await patientApi.forceReload()
//     await hcp1Api.forceReload()
//     expect(await hcp1Api.healthcareElementApi.getHealthcareElement(heByPatient.id!)).to.deep.equal(heByPatientWithUpdatedAccess)
//     expect(await patientApi.healthcareElementApi.getHealthcareElement(heByHcp.id!)).to.deep.equal(heByHcpWithUpdatedAccess)
//     // Originally medical data even if accessible can't be found by the other...
//     const filterPatient1 = await new HealthcareElementFilter(patientApi).forDataOwner(patient.id!).forPatients([modifiedPatientDto]).build()
//     const patientFound1 = await patientApi.healthcareElementApi.matchHealthcareElement(filterPatient1)
//     const filterHcp1 = await new HealthcareElementFilter(hcp1Api).forDataOwner(hcp1User.healthcarePartyId!).forPatients([modifiedPatientDto]).build()
//     const hcpFound1 = await hcp1Api.healthcareElementApi.matchHealthcareElement(filterHcp1)
//     expect(patientFound1).to.have.length(1)
//     expect(patientFound1).to.contain(heByPatient.id)
//     expect(hcpFound1).to.have.length(1)
//     expect(hcpFound1).to.contain(heByHcp.id)
//
//     //. ..but by sharing the patient with each other it can be found
//     await patientApi.patientApi.giveAccessToPotentiallyEncrypted((await patientApi.patientApi.getPatientAndTryDecrypt(patient.id!)).patient, hcp1.id!)
//     const fullySharedPatient = await hcp1Api.patientApi.giveAccessTo(await hcp1Api.patientApi.getPatient(patient.id!), patient.id!)
//     const fullySharedPatientDto = mapPatientToPatientDto(fullySharedPatient)
//     await patientApi.forceReload()
//     await hcp1Api.forceReload()
//     expect((await patientApi.patientApi.getPatient(patient.id!)).note).to.equal(patientNote)
//     expect((await hcp1Api.patientApi.getPatient(patient.id!)).note).to.equal(patientNote)
//     const filterPatient2 = await new HealthcareElementFilter(patientApi).forDataOwner(patient.id!).forPatients([fullySharedPatientDto]).build()
//     const patientFound2 = await patientApi.healthcareElementApi.matchHealthcareElement(filterPatient2)
//     const filterHcp2 = await new HealthcareElementFilter(hcp1Api)
//       .forDataOwner(hcp1User.healthcarePartyId!)
//       .forPatients([fullySharedPatientDto])
//       .build()
//     const hcpFound2 = await hcp1Api.healthcareElementApi.matchHealthcareElement(filterHcp2)
//     expect(hcpFound2).to.have.length(2)
//     expect(hcpFound2).to.contain(heByPatient.id)
//     expect(hcpFound2).to.contain(heByHcp.id)
//     expect(patientFound2).to.have.length(2)
//     expect(patientFound2).to.contain(heByPatient.id)
//     expect(patientFound2).to.contain(heByHcp.id)
//   })
// })
