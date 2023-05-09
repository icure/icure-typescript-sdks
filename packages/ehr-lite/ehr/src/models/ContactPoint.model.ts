import { ContactPointTelecomTypeEnum } from "./enums/ContactPointTelecomType.enum";

export class ContactPoint {
  system?: ContactPointTelecomTypeEnum;
  value?: string;
  description?: string;

  static toJSON(instance: ContactPoint): any {
    const pojo: any = {};
    pojo["system"] = instance.system;
    pojo["value"] = instance.value;
    pojo["description"] = instance.description;
    return pojo;
  }

  static fromJSON(pojo: any): ContactPoint {
    const instance = new ContactPoint();
    if (pojo["system"] === undefined) instance.system = undefined;
    instance.system = pojo["system"];
    if (pojo["value"] === undefined) instance.value = undefined;
    instance.value = pojo["value"];
    if (pojo["description"] === undefined) instance.description = undefined;
    instance.description = pojo["description"];
    return instance;
  }
}
