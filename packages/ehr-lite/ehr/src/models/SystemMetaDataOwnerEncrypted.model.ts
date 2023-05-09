import { Delegation } from "./Delegation.model";

export class SystemMetaDataOwnerEncrypted {
  publicKey?: string;
  hcPartyKeys?: Map<string, string[]>;
  privateKeyShamirPartitions?: Map<string, string>;
  secretForeignKeys?: string[];
  cryptedForeignKeys?: Map<string, Delegation[]>;
  delegations?: Map<string, Delegation[]>;
  encryptionKeys?: Map<string, Delegation[]>;
  aesExchangeKeys?: Map<string, Map<string, Map<string, string>>>;
  transferKeys?: Map<string, Map<string, string>>;
  encryptedSelf?: string;

  static toJSON(instance: SystemMetaDataOwnerEncrypted): any {
    const pojo: any = {};
    pojo["publicKey"] = instance.publicKey;
    pojo["hcPartyKeys"] = !!instance.hcPartyKeys
      ? Object.fromEntries(
          [...instance.hcPartyKeys.entries()].map(([k, v]) => [
            k,
            v.map((item) => item),
          ])
        )
      : undefined;
    pojo["privateKeyShamirPartitions"] = !!instance.privateKeyShamirPartitions
      ? Object.fromEntries(
          [...instance.privateKeyShamirPartitions.entries()].map(([k, v]) => [
            k,
            v,
          ])
        )
      : undefined;
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
    pojo["aesExchangeKeys"] = !!instance.aesExchangeKeys
      ? Object.fromEntries(
          [...instance.aesExchangeKeys.entries()].map(([k, v]) => [
            k,
            Object.fromEntries(
              [...v.entries()].map(([k, v]) => [
                k,
                Object.fromEntries([...v.entries()].map(([k, v]) => [k, v])),
              ])
            ),
          ])
        )
      : undefined;
    pojo["transferKeys"] = !!instance.transferKeys
      ? Object.fromEntries(
          [...instance.transferKeys.entries()].map(([k, v]) => [
            k,
            Object.fromEntries([...v.entries()].map(([k, v]) => [k, v])),
          ])
        )
      : undefined;
    pojo["encryptedSelf"] = instance.encryptedSelf;
    return pojo;
  }

  static fromJSON(pojo: any): SystemMetaDataOwnerEncrypted {
    const instance = new SystemMetaDataOwnerEncrypted();
    if (pojo["publicKey"] === undefined) instance.publicKey = undefined;
    instance.publicKey = pojo["publicKey"];
    if (pojo["hcPartyKeys"] === undefined) instance.hcPartyKeys = undefined;
    instance.hcPartyKeys = pojo["hcPartyKeys"]
      ? new Map(
          pojo["hcPartyKeys"].map(([k, v]: [any, any]) => [
            k,
            v.map((item: any) => item),
          ])
        )
      : undefined;
    if (pojo["privateKeyShamirPartitions"] === undefined)
      instance.privateKeyShamirPartitions = undefined;
    instance.privateKeyShamirPartitions = pojo["privateKeyShamirPartitions"]
      ? new Map(
          pojo["privateKeyShamirPartitions"].map(([k, v]: [any, any]) => [k, v])
        )
      : undefined;
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
    if (pojo["aesExchangeKeys"] === undefined)
      instance.aesExchangeKeys = undefined;
    instance.aesExchangeKeys = pojo["aesExchangeKeys"]
      ? new Map(
          pojo["aesExchangeKeys"].map(([k, v]: [any, any]) => [
            k,
            new Map(
              v.map(([k, v]: [any, any]) => [
                k,
                new Map(v.map(([k, v]: [any, any]) => [k, v])),
              ])
            ),
          ])
        )
      : undefined;
    if (pojo["transferKeys"] === undefined) instance.transferKeys = undefined;
    instance.transferKeys = pojo["transferKeys"]
      ? new Map(
          pojo["transferKeys"].map(([k, v]: [any, any]) => [
            k,
            new Map(v.map(([k, v]: [any, any]) => [k, v])),
          ])
        )
      : undefined;
    if (pojo["encryptedSelf"] === undefined) instance.encryptedSelf = undefined;
    instance.encryptedSelf = pojo["encryptedSelf"];
    return instance;
  }
}
