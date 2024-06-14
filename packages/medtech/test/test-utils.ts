import { MedTechApi } from '../src/apis/MedTechApi'
import { webcrypto } from 'crypto'
import { DefaultStorageEntryKeysFactory } from '@icure/api/icc-x-api/storage/DefaultStorageEntryKeysFactory'
import { UserDetails } from '@icure/test-setup/types'
import { EmailMessage, SMSMessage, User } from '@icure/typescript-common'
import { Patient } from '../src/models/Patient.model'
import { SimpleMedTechCryptoStrategies } from '../src/services/MedTechCryptoStrategies'
import { MedTechMessageFactory } from '../src/services/MedTechMessageFactory'
import { HealthcareProfessional } from '../src/models/HealthcareProfessional.model'
import { testStorageWithKeys } from '../../common-test/test-storage'
import { ShaVersion } from '@icure/api'

export class TestMessageFactory implements MedTechMessageFactory {
    readonly preferredMessageType = 'email'

    getPatientInvitationEmail(recipientUser: User, recipientPatient: Patient, recipientPassword: string, invitingUser: User, invitingDataOwner: HealthcareProfessional): EmailMessage {
        return {
            from: 'nobody@nowhere.boh',
            subject: `${recipientUser.login}|${recipientPassword}`,
            html: `User: ${recipientUser.id}`,
        }
    }

    getPatientInvitationSMS(recipientUser: User, recipientPatient: Patient, recipientPassword: string, invitingUser: User, invitingDataOwner: HealthcareProfessional): SMSMessage {
        return {
            message: `${recipientUser.login}|${recipientPassword}`,
        }
    }
}

export class TestUtils {
    static async createMedTechApiAndLoggedUserFor(
        iCureUrl: string,
        credentials: UserDetails,
        additionalBuilderSteps: (b: MedTechApi.Builder) => MedTechApi.Builder = (b) => b,
    ): Promise<{
        api: MedTechApi
        user: User
    }> {
        const storage = await testStorageWithKeys(new DefaultStorageEntryKeysFactory(), [
            {
                dataOwnerId: credentials.dataOwnerId,
                pairs: [
                    {
                        keyPair: { publicKey: credentials.publicKey, privateKey: credentials.privateKey },
                        shaVersion: ShaVersion.Sha256,
                    },
                ],
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
