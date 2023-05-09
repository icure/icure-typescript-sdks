import { TypeEnum } from "./enums/Type.enum";

export class TypedValueObject {
  type?: TypeEnum;
  booleanValue?: boolean;
  integerValue?: number;
  doubleValue?: number;
  stringValue?: string;
  dateValue?: number;

  static toJSON(instance: TypedValueObject): any {
    const pojo: any = {};
    pojo["type"] = instance.type;
    pojo["booleanValue"] = instance.booleanValue;
    pojo["integerValue"] = instance.integerValue;
    pojo["doubleValue"] = instance.doubleValue;
    pojo["stringValue"] = instance.stringValue;
    pojo["dateValue"] = instance.dateValue;
    return pojo;
  }

  static fromJSON(pojo: any): TypedValueObject {
    const instance = new TypedValueObject();
    if (pojo["type"] === undefined) instance.type = undefined;
    instance.type = pojo["type"];
    if (pojo["booleanValue"] === undefined) instance.booleanValue = undefined;
    instance.booleanValue = pojo["booleanValue"];
    if (pojo["integerValue"] === undefined) instance.integerValue = undefined;
    instance.integerValue = pojo["integerValue"];
    if (pojo["doubleValue"] === undefined) instance.doubleValue = undefined;
    instance.doubleValue = pojo["doubleValue"];
    if (pojo["stringValue"] === undefined) instance.stringValue = undefined;
    instance.stringValue = pojo["stringValue"];
    if (pojo["dateValue"] === undefined) instance.dateValue = undefined;
    instance.dateValue = pojo["dateValue"];
    return instance;
  }
}
