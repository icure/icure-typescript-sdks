import { CodingReference } from "./CodingReference.model";

interface IIdentifier {
  id?: string;
  assigner?: string;
  start?: string;
  end?: string;
  system?: string;
  type?: CodingReference;
  use?: string;
  value?: string;
}

export class Identifier implements IIdentifier {
  assigner?: string;
  end?: string;
  id?: string;
  start?: string;
  system?: string;
  type?: CodingReference;
  use?: string;
  value?: string;

  static toJSON(instance: Identifier): any {
    const pojo: any = {};
    pojo["assigner"] = instance.assigner;
    pojo["end"] = instance.end;
    pojo["id"] = instance.id;
    pojo["start"] = instance.start;
    pojo["system"] = instance.system;
    pojo["type"] = !!instance.type
      ? CodingReference.toJSON(instance.type)
      : undefined;
    pojo["use"] = instance.use;
    pojo["value"] = instance.value;
    return pojo;
  }

  static fromJSON(pojo: any): Identifier {
    const instance = new Identifier();
    if (pojo["assigner"] === undefined) instance.assigner = undefined;
    instance.assigner = pojo["assigner"];
    if (pojo["end"] === undefined) instance.end = undefined;
    instance.end = pojo["end"];
    if (pojo["id"] === undefined) instance.id = undefined;
    instance.id = pojo["id"];
    if (pojo["start"] === undefined) instance.start = undefined;
    instance.start = pojo["start"];
    if (pojo["system"] === undefined) instance.system = undefined;
    instance.system = pojo["system"];
    if (pojo["type"] === undefined) instance.type = undefined;
    instance.type = !!pojo["type"]
      ? CodingReference.fromJSON(pojo["type"])
      : undefined;
    if (pojo["use"] === undefined) instance.use = undefined;
    instance.use = pojo["use"];
    if (pojo["value"] === undefined) instance.value = undefined;
    instance.value = pojo["value"];
    return instance;
  }
}
