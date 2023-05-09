export class Delegation {
  owner?: string;
  delegateTo?: string;
  key?: string;

  static toJSON(instance: Delegation): any {
    const pojo: any = {};
    pojo["owner"] = instance.owner;
    pojo["delegateTo"] = instance.delegateTo;
    pojo["key"] = instance.key;
    return pojo;
  }

  static fromJSON(pojo: any): Delegation {
    const instance = new Delegation();
    if (pojo["owner"] === undefined) instance.owner = undefined;
    instance.owner = pojo["owner"];
    if (pojo["delegateTo"] === undefined) instance.delegateTo = undefined;
    instance.delegateTo = pojo["delegateTo"];
    if (pojo["key"] === undefined) instance.key = undefined;
    instance.key = pojo["key"];
    return instance;
  }
}
