import axios, { Method } from 'axios'
import { tmpdir } from 'os'
import { TextDecoder, TextEncoder } from 'util'
import { v4 as uuid } from 'uuid'
import { EnvInitializer } from '@icure/test-setup/decorators'
import {getEnvVariables, TestVars} from '@icure/test-setup/types'
import { TestEnvironmentBuilder } from '@icure/test-setup/builder'
import {BasicApis, retry} from "@icure/api";
import {webcrypto} from "crypto";
import {domainTypeTag} from "@icure/typescript-common";

let cachedInitializer: EnvInitializer | undefined

export function getTempEmail(): string {
  return `${uuid().substring(0, 8)}@icure.com`
}

export const hcp1Username = process.env.ICURE_TS_TEST_HCP_USER ?? getTempEmail()
export const hcp2Username = process.env.ICURE_TS_TEST_HCP_2_USER ?? getTempEmail()
export const hcp3Username = process.env.ICURE_TS_TEST_HCP_3_USER ?? getTempEmail()
export const patUsername = process.env.ICURE_TS_TEST_PAT_USER ?? getTempEmail()

export async function getEnvironmentInitializer(): Promise<EnvInitializer> {
  if (!cachedInitializer) {
    const env = getEnvVariables()
    const scratchDir = 'test/scratch'
    const baseEnvironment =
        env.testEnvironment === 'docker' ? new TestEnvironmentBuilder().setUpDockerEnvironment(scratchDir, ['mock']) : new TestEnvironmentBuilder()
    const baseInitializer = await baseEnvironment
        .withGroup(fetch)
        .withMasterUser(fetch)
        .addHcp({ login: hcp1Username })
        .addHcp({ login: hcp2Username })
        .addHcp({ login: hcp3Username })
        .addPatient({ login: patUsername })
        .withSafeguard()
        .withEnvironmentSummary()
        .build()
    cachedInitializer = {
      ...baseInitializer,
      execute: async (env: TestVars): Promise<TestVars> => {
        const updatedEnvs = await baseInitializer.execute(env)
        const masterApi = await BasicApis(updatedEnvs.iCureUrl, updatedEnvs.masterHcp.user, updatedEnvs.masterHcp.password, webcrypto as any, fetch)
        await retry(() => masterApi.userApi.getCurrentUser(), 10, 1000) // Ensure the user is available
        const hcp1 = await masterApi.healthcarePartyApi.getHealthcareParty(updatedEnvs.dataOwnerDetails[hcp1Username].dataOwnerId)
        await masterApi.healthcarePartyApi.modifyHealthcareParty({
          ...hcp1,
          tags: [...hcp1.tags, domainTypeTag('Practitioner')],
        })
        const hcp2 = await masterApi.healthcarePartyApi.getHealthcareParty(updatedEnvs.dataOwnerDetails[hcp2Username].dataOwnerId)
        await masterApi.healthcarePartyApi.modifyHealthcareParty({
          ...hcp2,
          tags: [...hcp2.tags, domainTypeTag('Practitioner')],
        })
        const hcp3 = await masterApi.healthcarePartyApi.getHealthcareParty(updatedEnvs.dataOwnerDetails[hcp3Username].dataOwnerId)
        await masterApi.healthcarePartyApi.modifyHealthcareParty({
          ...hcp3,
          tags: [...hcp3.tags, domainTypeTag('Organisation')],
        })
        return updatedEnvs
      }
    }
  }
  return cachedInitializer
}

export function setLocalStorage(fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>) {
  ;(global as any).localStorage = new (require('node-localstorage').LocalStorage)(tmpdir(), 5 * 1024 ** 3)
  ;(global as any).fetch = fetch
  ;(global as any).Storage = ''
  ;(global as any).TextDecoder = TextDecoder
  ;(global as any).TextEncoder = TextEncoder
  ;(global as any).headers = Headers
}

export class TestUtils {
  static async getEmail(email: string): Promise<any> {
    const {msgGtwUrl, specId} = getEnvVariables()
    const emailOptions = {
      method: 'GET' as Method,
      url: `${msgGtwUrl}/${specId}/lastEmail/${email}`,
    }
    const {data: response} = await axios.request(emailOptions)
    return response
  }

  static async getSMS(phoneNumber: string): Promise<any> {
    const {msgGtwUrl, specId} = getEnvVariables()
    const smsOptions = {
      method: 'GET' as Method,
      url: `${msgGtwUrl}/${specId}/lastSMS/${phoneNumber}`,
    }
    const {data: response} = await axios.request(smsOptions)
    return response
  }
}
