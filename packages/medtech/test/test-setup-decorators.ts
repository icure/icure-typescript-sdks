import {
  bootstrapOssKraken,
  retry,
  setup,
  setupCouchDb,
  checkIfDockerIsOnline,
  bootstrapCloudKraken
} from "@icure/test-setup";
import {Api, Apis, hex2ua, pkcs8ToJwk, spkiToJwk} from "@icure/api";
import {webcrypto} from "crypto";
import {TestVars, UserDetails} from "./test-utils";
import {createGroup} from "@icure/test-setup/groups";
import {
  createDeviceUser,
  createHealthcarePartyUser,
  createMasterHcpUser,
  createPatientUser
} from "@icure/test-setup/creation";
import { v4 as uuid } from 'uuid'

/**
 * Base interface for the decorator classes.
 * The execute method gets a set of environment variables and returns a copy that could be modified
 * The steps are executed in a FIFO fashion (the first istantiated is the first executed) except for the
 * SafeguardInitializer
 */
export interface EnvInitializer {
  execute(env: TestVars): Promise<TestVars>;
}

/**
 * Base interface for the composite classes
 */
export interface EnvComponent {
  create(dataOwnerApi: Apis): Promise<{[key: string]: UserDetails}>;
}

/**
 * This decorator class ensures that the execute method is called only once.
 * Any other call after the first will only return the variables as modified by the first call.
 */
export class SafeguardInitializer implements EnvInitializer {

  private testVars: TestVars | undefined;

  constructor(
    private initializer: EnvInitializer
  ) {}

  async execute(env: TestVars): Promise<TestVars> {
    if(!this.testVars) {
      this.testVars = await this.initializer.execute(env);
    }
    return this.testVars;
  }
}

/**
 * This step calls the original execute method and decorates it by setting up the docker with the given parameters.
 */
export class DockerComposeInitializer implements EnvInitializer {

  /**
   * Constructor method
   *
   * @param scratchDir the directory where to save the docker compose file
   * @param profiles the profiles for the docker compose file
   * @param initializer a previous step of the initialization pipeline
   */
  constructor(
    private scratchDir: string,
    private profiles: string[] = [],
    private initializer?: EnvInitializer
  ) {}

  async execute(env: TestVars): Promise<TestVars> {
    const updatedEnvs = !!this.initializer ? await this.initializer.execute(env) : undefined;
    await setup(this.scratchDir, env.composeFileUrl, ...this.profiles);
    await setupCouchDb(env.couchDbUrl);
    await retry( async () => {
      if (!(await checkIfDockerIsOnline(this.scratchDir, env.composeFileUrl))) throw new Error("Docker not ready");
    });
    return !!updatedEnvs ? updatedEnvs : env;
  }

}

/**
 * This step calls the original execute method and then decorates it by initializing the OSS Kraken
 */
export class OssInitializer implements EnvInitializer {

  /**
   * Constructor method
   *
   * @param initializer a previous step of the initialization pipeline
   * @param passwordHash the password hash for the admin user
   */
  constructor(
    private initializer: EnvInitializer | null,
    private passwordHash?: string,
  ) {}

  async execute(env: TestVars): Promise<TestVars> {
    const updatedEnvs = !!this.initializer ? await this.initializer.execute(env) : undefined;
    await bootstrapOssKraken(env.adminId, env.adminLogin, this.passwordHash, env.couchDbUrl);
    return !!updatedEnvs ? updatedEnvs : env;
  }

}

/**
 * This step calls the original execute method and decorates it by initializing the Kraken
 */
export class KrakenInitializer implements EnvInitializer {

  /**
   * Constructor method
   *
   * @param initializer a previous step of the initialization pipeline
   * @param passwordHash the password hash for the admin user
   * @param masterGroupId the master group id
   * @param masterGroupPassword the master group password
   */
  constructor(
    private initializer: EnvInitializer | null,
    private passwordHash?: string,
    private masterGroupId?: string,
    private masterGroupPassword?: string,
  ) {}

  async execute(env: TestVars): Promise<TestVars> {
    const updatedEnvs = !!this.initializer ? await this.initializer.execute(env) : undefined;
    await bootstrapCloudKraken(env.adminId, env.adminLogin, this.passwordHash, this.masterGroupId, this.masterGroupPassword, env.couchDbUrl);
    return !!updatedEnvs ? updatedEnvs : env;
  }
}

/**
 * This step calls the original execute method and then decorates it by creating a group.
 */
export class GroupInitializer implements EnvInitializer {

  /**
   * Constructor method
   *
   * @param initializer a previous step of the initialization pipeline
   * @param fetchImpl an implementation of the fetch method
   */
  constructor(
    private initializer: EnvInitializer | null,
    private fetchImpl: (input: RequestInfo, init?: RequestInit) => Promise<Response>,
  ) {}

  async execute(env: TestVars): Promise<TestVars> {
    const updatedEnvs = !!this.initializer ? await this.initializer.execute(env) : undefined;
    const api = await Api(env.iCureUrl, env.adminLogin, env.adminPassword, webcrypto as any, this.fetchImpl);
    await createGroup(api, env.testGroupId);
    return !!updatedEnvs ? updatedEnvs : env;
  }
}

/**
 * Base abstract class for the Composite hierarchy.
 */
export abstract class UserCreationComposite implements EnvComponent {

  private components: EnvComponent[] = []

  /**
   * The create methods calls all the create methods of the components, await for all of them to be finished and then
   * combines the results in a single object.
   *
   * @param dataOwnerApi an instance of the ICC Api capable of creating all types of users
   */
  async create(dataOwnerApi: Apis): Promise<{[key: string]: UserDetails}> {
    return Promise.all(
      this.components.map( async (component): Promise<{ [key: string]: UserDetails }> => {
        const result = await component.create(dataOwnerApi);
        return { [Object.keys(result)[0]]: result[Object.keys(result)[0]] }
      })
    ).then( (dataOwners) => {
      return dataOwners.reduce(
        (previous, current) => { return {...previous, ...current} },
        {});
    });
  }

  /**
   * Adds one component to the components list
   *
   * @param component the component to add
   */
  add(component: EnvComponent) {
    this.components = [...this.components, component]
  }

}

/**
 * This class is part both of the composite and the decorator hierarchy.
 * It calls the original execute method, then decorates it by creating a master HCP user with the credentials passed
 * in the env parameter, and finally use the master HCP to create all the other users passed in the add method of the
 * composite.
 */
export class NewMasterUserInitializerComposite extends UserCreationComposite implements EnvInitializer {

  /**
   * Constructor method
   *
   * @param initializer a previous step of the initialization pipeline
   * @param fetchImpl an implementation of the fetch method
   */
  constructor(
    private initializer: EnvInitializer | null,
    private fetchImpl: (input: RequestInfo, init?: RequestInit) => Promise<Response>,
  ) { super(); }

  async execute(env: TestVars): Promise<TestVars> {
    const updatedEnvs = !!this.initializer ? await this.initializer.execute(env) : undefined;
    const masterCredentials = await createMasterHcpUser(env.adminLogin, env.adminPassword, env.testGroupId, this.fetchImpl, env.iCureUrl);
    const api = await Api(env.iCureUrl, masterCredentials.login, masterCredentials.password, webcrypto as any, this.fetchImpl);
    const jwk = {
      publicKey: spkiToJwk(hex2ua(masterCredentials.publicKey)),
      privateKey: pkcs8ToJwk(hex2ua(masterCredentials.privateKey)),
    };
    await api.cryptoApi.cacheKeyPair(jwk)
    await api.cryptoApi.storeKeyPair(`${masterCredentials.dataOwnerId}.${masterCredentials.publicKey.slice(-32)}`, jwk)
    const createdUsers = await this.create(api);
    return !!updatedEnvs
      ? {...updatedEnvs, dataOwnerDetails: { ...updatedEnvs.dataOwnerDetails, ...createdUsers }}
      : {...env, dataOwnerDetails: { ...env.dataOwnerDetails, ...createdUsers }}
  }
}

/**
 * This class is part both of the composite and the decorator hierarchy.
 * It calls the original execute method, then decorates it by creating an instance of the ICC API for an existing
 * master HCP with the credentials passed in the env parameter, and finally use the master HCP to create all the other
 * users passed in the add method of the composite.
 */
export class OldMasterUserInitializerComposite extends UserCreationComposite implements EnvInitializer {

  /**
   * Constructor method
   *
   * @param initializer a previous step of the initialization pipeline
   * @param fetchImpl an implementation of the fetch method
   */
  constructor(
    private initializer: EnvInitializer | null,
    private fetchImpl: (input: RequestInfo, init?: RequestInit) => Promise<Response>,
  ) { super(); }

  async execute(env: TestVars): Promise<TestVars> {
    const updatedEnvs = !!this.initializer ? await this.initializer.execute(env) : undefined;
    const api = await Api(env.iCureUrl, env.masterHcp?.user!, env.masterHcp?.password!, webcrypto as any, this.fetchImpl);
    const jwk = {
      publicKey: spkiToJwk(hex2ua(env.masterHcp?.publicKey!)),
      privateKey: pkcs8ToJwk(hex2ua(env.masterHcp?.privateKey!)),
    };
    await api.cryptoApi.cacheKeyPair(jwk)
    await api.cryptoApi.storeKeyPair(`${env.masterHcpId}.${env.masterHcp?.publicKey.slice(-32)}`, jwk)
    const createdUsers = await this.create(api);
    return !!updatedEnvs
      ? {...updatedEnvs, dataOwnerDetails: { ...updatedEnvs.dataOwnerDetails, ...createdUsers }}
      : {...env, dataOwnerDetails: { ...env.dataOwnerDetails, ...createdUsers }}
  }
}

/**
 * Component class to create a new Patient User
 */
export class CreatePatientComponent implements EnvComponent {

  /**
   * Constructor method
   *
   * @param login the login for the user
   * @param authToken the value for the authentication token. NOTE: If you are using the Kraken OSS version, this value won't be taken into account
   * @param publicKey the public key for the user
   * @param privateKey the private key for the user
   */
  constructor(
    private login: string,
    private authToken: string = uuid(),
    private publicKey?: string | undefined,
    private privateKey?: string | undefined,
  ) {}

  async create(dataOwnerApi: Apis): Promise<{[key: string]: UserDetails}> {
    const details = await createPatientUser(dataOwnerApi, this.login, this.authToken, this.publicKey, this.privateKey);
    return {
      [this.login]: {
        user: details.login,
        password: details.password,
        publicKey: details.publicKey,
        privateKey: details.privateKey
      }
    }
  }

}

/**
 * Component class to create a new HCP User
 */
export class CreateHcpComponent implements EnvComponent {

  /**
   * Constructor method
   *
   * @param login the login for the user
   * @param authToken the value for the authentication token. NOTE: If you are using the Kraken OSS version, this value won't be taken into account
   * @param publicKey the public key for the user
   * @param privateKey the private key for the user
   */
  constructor(
    private login: string,
    private authToken: string = uuid(),
    private publicKey?: string | undefined,
    private privateKey?: string | undefined
  ) {}

  async create(dataOwnerApi: Apis): Promise<{[key: string]: UserDetails}> {
    const details = await createHealthcarePartyUser(dataOwnerApi, this.login, this.authToken, this.publicKey, this.privateKey);
    return {
      [this.login]: {
        user: details.login,
        password: details.password,
        publicKey: details.publicKey,
        privateKey: details.privateKey
      }
    }
  }

}

/**
 * Component class to create a new Device User
 */
export class createDeviceComponent implements EnvComponent {

  /**
   * Constructor method
   *
   * @param login the login for the user
   * @param authToken the value for the authentication token. NOTE: If you are using the Kraken OSS version, this value won't be taken into account
   * @param publicKey the public key for the user
   * @param privateKey the private key for the user
   */
  constructor(
    private login: string,
    private authToken: string = uuid(),
    private publicKey?: string | undefined,
    private privateKey?: string | undefined
  ) {}

  async create(dataOwnerApi: Apis): Promise<{[key: string]: UserDetails}> {
    const details = await createDeviceUser(dataOwnerApi, this.login, this.authToken, this.publicKey, this.privateKey);
    return {
      [this.login]: {
        user: details.login,
        password: details.password,
        publicKey: details.publicKey,
        privateKey: details.privateKey
      }
    }
  }

}
