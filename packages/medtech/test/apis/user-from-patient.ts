import { before, describe, it } from 'mocha'

import 'isomorphic-fetch'
import { tmpdir } from 'os'

import { TextDecoder, TextEncoder } from 'util'
  ;
import {
  Api,
  HealthcareParty, IccCryptoXApi, Remote,
  ua2hex, User
} from "@icure/api";

import {webcrypto} from "crypto";
import axios, {Method} from "axios";
import { v4 as uuid } from 'uuid'
import {assert} from "chai";
import {DockerTestBackend, RemoteTestBackend} from "../test-utils-backend";
import { medTechApi } from "../../src/apis/medTechApi";
import { SystemMetaDataOwnerEncrypted } from "../../src/models/SystemMetaDataOwnerEncrypted";
import {Patient} from "../../src/models/Patient";

(global as any).localStorage = new (require('node-localstorage').LocalStorage)(tmpdir(), 5 * 1024 * 1024 * 1024)
;(global as any).fetch = fetch
;(global as any).Storage = ''
;(global as any).TextDecoder = TextDecoder
;(global as any).TextEncoder = TextEncoder

const backend = RemoteTestBackend.getInstance(
  process.env.ICURE_USR!,
  process.env.ICURE_PWD!,
  process.env.TEST_ICURE_URL!
);

const id = uuid();
const hcpLogin = `hcp-${id}-delegate`;
let delegateUser: User | undefined = undefined;
let delegateHcp: HealthcareParty | undefined = undefined;
let delegateToken: string | undefined = undefined;
const privateKeys = {} as Record<string, Record<string, string>>

async function getTempEmailAddress() {
  const emailOptions = {
    method: 'GET' as Method,
    url: 'https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1'
  };

  const { data: emails } = await axios.request(emailOptions)
  return { email: emails[0], login: emails[0].split('@')[0], domain: emails[0].split('@')[1] }
}

async function makeKeyPair(cryptoApi: IccCryptoXApi, login: string) {
  const { publicKey, privateKey } = await cryptoApi.RSA.generateKeyPair()
  const publicKeyHex = ua2hex(await cryptoApi.RSA.exportKey(publicKey!, 'spki'))
  privateKeys[login] = { [publicKeyHex]: ua2hex((await cryptoApi.RSA.exportKey(privateKey!, 'pkcs8')) as ArrayBuffer) }
  return publicKeyHex
}

describe('Testing use case for mdt-69', async function () {
  this.timeout(600000)

  before(async function () {
    this.timeout(300000)

    await backend.init();

    const api = await Api(backend.iCureURL, backend.iCureUser, backend.iCurePwd, webcrypto as unknown as Crypto)
    const { userApi, healthcarePartyApi, cryptoApi } = api

    const publicKeyDelegate = await makeKeyPair(cryptoApi, hcpLogin)
    delegateHcp = await healthcarePartyApi.createHealthcareParty(
      new HealthcareParty({ id: id, publicKey: publicKeyDelegate, firstName: 'test', lastName: 'test' })
    )
    delegateUser = await userApi.createUser(
      new User({
        id: `user-${id}-hcp`,
        login: hcpLogin,
        status: 'ACTIVE',
        healthcarePartyId: delegateHcp.id,
      })
    );
    assert(delegateUser);
    delegateToken = await userApi.getToken(delegateUser.id!, uuid(), 60*60*1000);
    assert(delegateToken);


    console.log('All prerequisites are started')
  })

  after(async () => {
    // await backend.shutdown();
    console.log('Cleanup complete')
  })

  it("As a doctor, I'm creating an account to a patient and gives him access back to his data", async () => {
    // Given the medTechApi, login as Healthcare Professional
    const mtApi = await medTechApi()
      .withICureBasePath(backend.iCureURL)
      .withUserName(hcpLogin)
      .withPassword(delegateToken!)
      .withCrypto(webcrypto as any)
      .preventCookieUsage()
      .build();
    const loggedHCP = await mtApi.userApi.getLoggedUser();
    const healthcareParty = await mtApi.healthcareProfessionalApi.getHealthcareProfessional(loggedHCP.healthcarePartyId!)

    await mtApi.addKeyPair(
      loggedHCP.healthcarePartyId!,
      {
        publicKey: healthcareParty.systemMetaData!.publicKey!,
        privateKey: privateKeys[hcpLogin][healthcareParty.systemMetaData!.publicKey!]
      }
    )

    // A temp email address for the patient, that will be also the login
    const patientEmail = await getTempEmailAddress();

    // The healthcare professional creates the key pair for the user
    const publicKeyUser = await makeKeyPair(mtApi.cryptoApi, patientEmail.email)

    const createdPatient = await mtApi.patientApi.createOrModifyPatient(
      new Patient({
        firstName: "Giskard",
        lastName: "Reventlov",
        note: "Bip bup I'm a robot",
        addresses: [{
          addressType: "home",
          description: "Solaria",
          telecoms: [{
            telecomType: "email",
            telecomNumber: patientEmail.email,
            telecomDescription: "Do androids use electrical mails?"
          }]
        }],
        systemMetaData: new SystemMetaDataOwnerEncrypted(
          {
            publicKey: publicKeyUser
          }
        )
      })
    );
    /* TODO the rest of the test needs to be updated, feature was not complete
    // Then the HCP creates a User for the patient
    const newUser = await mtApi.userApi.newUserFromPatient(createdPatient);

    const createdUser = await mtApi.userApi.createOrModifyUser(newUser);
    assert(createdUser)

    const token = await mtApi.userApi.createToken(createdUser.id!)
    assert(token)

    const user = await mtApi.userApi.getUser(createdUser.id!)
    assert(user)

    // Now I log the user in
    const mtApiUser = await medTechApi()
      .withICureBasePath(backend.iCureURL)
      .withUserName(user.login!)
      .withPassword(token)
      .withCrypto(webcrypto as any)
      .preventCookieUsage()
      .build();

    const loggedUser = await mtApiUser.userApi.getLoggedUser();
    assert(loggedUser)

    await mtApi.addKeyPair(
      loggedUser.patientId!,
      {
        publicKey: createdPatient.systemMetaData!.publicKey!,
        privateKey: privateKeys[patientEmail.email][createdPatient.systemMetaData!.publicKey!]
      }
    )

    // Now a maintenance task must be created in order to allow the delegation between Patient and Hcp
    const maintenanceTask = await mtApi.healthcareProfessionalApi.createMaintenanceTask(healthcareParty.id!, loggedUser.id!);
    assert(maintenanceTask)

     */

  });
});
