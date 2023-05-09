import { TypeEnum } from "./enums/Type.enum";

export class PropertyType {
  identifier?: string;
  type?: TypeEnum;

  static toJSON(instance: PropertyType): any {
    const pojo: any = {};
    pojo["identifier"] = instance.identifier;
    pojo["type"] = instance.type;
    return pojo;
  }

  static fromJSON(pojo: any): PropertyType {
    const instance = new PropertyType();
    if (pojo["identifier"] === undefined) instance.identifier = undefined;
    instance.identifier = pojo["identifier"];
    if (pojo["type"] === undefined) instance.type = undefined;
    instance.type = pojo["type"];
    return instance;
  }
}
