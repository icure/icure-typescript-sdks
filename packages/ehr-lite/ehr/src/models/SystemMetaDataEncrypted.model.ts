import { Delegation } from "./Delegation.model";

export class SystemMetaDataEncrypted {
  secretForeignKeys?: string[];
  cryptedForeignKeys?: Map<string, Delegation[]>;
  delegations?: Map<string, Delegation[]>;
  encryptionKeys?: Map<string, Delegation[]>;
  encryptedSelf?: string;

  static toJSON(instance: SystemMetaDataEncrypted): any {
    const pojo: any = {};
    pojo["secretForeignKeys"] = instance.secretForeignKeys?.map((item) => item);
    pojo["cryptedForeignKeys"] = !!instance.cryptedForeignKeys
      ? Object.fromEntries(
          [...instance.cryptedForeignKeys.entries()].map(([k, v]) => [
            k,
            v.map((item) => Delegation.toJSON(item)),
          ])
        )
      : undefined;
    pojo["delegations"] = !!instance.delegations
      ? Object.fromEntries(
          [...instance.delegations.entries()].map(([k, v]) => [
            k,
            v.map((item) => Delegation.toJSON(item)),
          ])
        )
      : undefined;
    pojo["encryptionKeys"] = !!instance.encryptionKeys
      ? Object.fromEntries(
          [...instance.encryptionKeys.entries()].map(([k, v]) => [
            k,
            v.map((item) => Delegation.toJSON(item)),
          ])
        )
      : undefined;
    pojo["encryptedSelf"] = instance.encryptedSelf;
    return pojo;
  }

  static fromJSON(pojo: any): SystemMetaDataEncrypted {
    const instance = new SystemMetaDataEncrypted();
    if (pojo["secretForeignKeys"] === undefined)
      instance.secretForeignKeys = undefined;
    instance.secretForeignKeys = pojo["secretForeignKeys"]?.map(
      (item: any) => item
    );
    if (pojo["cryptedForeignKeys"] === undefined)
      instance.cryptedForeignKeys = undefined;
    instance.cryptedForeignKeys = pojo["cryptedForeignKeys"]
      ? new Map(
          pojo["cryptedForeignKeys"].map(([k, v]: [any, any]) => [
            k,
            v.map((item: any) => Delegation.fromJSON(item)),
          ])
        )
      : undefined;
    if (pojo["delegations"] === undefined) instance.delegations = undefined;
    instance.delegations = pojo["delegations"]
      ? new Map(
          pojo["delegations"].map(([k, v]: [any, any]) => [
            k,
            v.map((item: any) => Delegation.fromJSON(item)),
          ])
        )
      : undefined;
    if (pojo["encryptionKeys"] === undefined)
      instance.encryptionKeys = undefined;
    instance.encryptionKeys = pojo["encryptionKeys"]
      ? new Map(
          pojo["encryptionKeys"].map(([k, v]: [any, any]) => [
            k,
            v.map((item: any) => Delegation.fromJSON(item)),
          ])
        )
      : undefined;
    if (pojo["encryptedSelf"] === undefined) instance.encryptedSelf = undefined;
    instance.encryptedSelf = pojo["encryptedSelf"];
    return instance;
  }
}
