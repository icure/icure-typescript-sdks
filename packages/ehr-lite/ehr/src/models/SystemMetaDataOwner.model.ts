export class SystemMetaDataOwner {
  publicKey?: string;
  hcPartyKeys?: Map<string, string[]>;
  privateKeyShamirPartitions?: Map<string, string>;
  aesExchangeKeys?: Map<string, Map<string, Map<string, string>>>;
  transferKeys?: Map<string, Map<string, string>>;

  static toJSON(instance: SystemMetaDataOwner): any {
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
    return pojo;
  }

  static fromJSON(pojo: any): SystemMetaDataOwner {
    const instance = new SystemMetaDataOwner();
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
    return instance;
  }
}
