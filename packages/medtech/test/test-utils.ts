import { MedTechApi } from '../src/apis/MedTechApi'
import { webcrypto } from 'crypto'
import { KeyStorageFacade, sleep, StorageFacade } from '@icure/api'
import { AnonymousMedTechApi } from '../src/apis/AnonymousMedTechApi'
import axios, { Method } from 'axios'
import { assert, expect } from 'chai'
import { tmpdir } from 'os'
import { TextDecoder, TextEncoder } from 'util'
import { v4 as uuid } from 'uuid'
import { testStorageWithKeys } from './TestStorage'
import { DefaultStorageEntryKeysFactory } from '@icure/api/icc-x-api/storage/DefaultStorageEntryKeysFactory'
import { EnvInitializer } from '@icure/test-setup/decorators'
import { getEnvVariables, UserDetails } from '@icure/test-setup/types'
import { TestEnvironmentBuilder } from '@icure/test-setup/builder'
import { CodingReference, EmailMessage, ICureMessageFactory, mapOf, RecaptchaType, SMSMessage, User } from '@icure/typescript-common'
import { HealthcareElement } from '../src/models/HealthcareElement.model'
import { Patient } from '../src/models/Patient.model'
import { SimpleMedTechCryptoStrategies } from '../src/services/MedTechCryptoStrategies'
import { DataSample } from '../src/models/DataSample.model'
import { Content } from '../src/models/Content.model'
import { MedTechMessageFactory } from '../src/services/MedTechMessageFactory'
import { HealthcareProfessional } from '../src/models/HealthcareProfessional.model'

export class TestMessageFactory implements MedTechMessageFactory {
  readonly preferredMessageType = 'email'

  getPatientInvitationEmail(
    recipientUser: User,
    recipientPatient: Patient,
    recipientPassword: string,
    invitingUser: User,
    invitingDataOwner: HealthcareProfessional
  ): EmailMessage {
    return {
      from: 'nobody@nowhere.boh',
      subject: `${recipientUser.login}|${recipientPassword}`,
      html: `User: ${recipientUser.id}`,
    }
  }

  getPatientInvitationSMS(
    recipientUser: User,
    recipientPatient: Patient,
    recipientPassword: string,
    invitingUser: User,
    invitingDataOwner: HealthcareProfessional
  ): SMSMessage {
    return {
      message: `${recipientUser.login}|${recipientPassword}`,
    }
  }
}

export class TestUtils {
  static async createMedTechApiAndLoggedUserFor(
    iCureUrl: string,
    credentials: UserDetails,
    additionalBuilderSteps: (b: MedTechApi.Builder) => MedTechApi.Builder = (b) => b
  ): Promise<{ api: MedTechApi; user: User }> {
    const storage = await testStorageWithKeys(new DefaultStorageEntryKeysFactory(), [
      {
        dataOwnerId: credentials.dataOwnerId,
        pairs: [{ keyPair: { publicKey: credentials.publicKey, privateKey: credentials.privateKey } }],
      },
    ])
    const builderApi = new MedTechApi.Builder()
      .withICureBaseUrl(iCureUrl)
      .withUserName(credentials.user)
      .withPassword(credentials.password)
      .withCrypto(webcrypto as any)
      .withStorage(storage.storage)
      .withKeyStorage(storage.keyStorage)
      .withCryptoStrategies(new SimpleMedTechCryptoStrategies([]))
    const medtechApi = await additionalBuilderSteps(builderApi).build()

    const foundUser = await medtechApi.userApi.getLoggedUser()

    return { api: medtechApi, user: foundUser }
  }
}
