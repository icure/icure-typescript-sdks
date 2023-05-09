import { PropertyType } from "./PropertyType.model";
import { TypedValueObject } from "./TypedValueObject.model";

export class Property {
  id?: string;
  type?: PropertyType;
  typedValue?: TypedValueObject;
  deleted?: number;

  static toJSON(instance: Property): any {
    const pojo: any = {};
    pojo["id"] = instance.id;
    pojo["type"] = !!instance.type
      ? PropertyType.toJSON(instance.type)
      : undefined;
    pojo["typedValue"] = !!instance.typedValue
      ? TypedValueObject.toJSON(instance.typedValue)
      : undefined;
    pojo["deleted"] = instance.deleted;
    return pojo;
  }

  static fromJSON(pojo: any): Property {
    const instance = new Property();
    if (pojo["id"] === undefined) instance.id = undefined;
    instance.id = pojo["id"];
    if (pojo["type"] === undefined) instance.type = undefined;
    instance.type = !!pojo["type"]
      ? PropertyType.fromJSON(pojo["type"])
      : undefined;
    if (pojo["typedValue"] === undefined) instance.typedValue = undefined;
    instance.typedValue = !!pojo["typedValue"]
      ? TypedValueObject.fromJSON(pojo["typedValue"])
      : undefined;
    if (pojo["deleted"] === undefined) instance.deleted = undefined;
    instance.deleted = pojo["deleted"];
    return instance;
  }
}
