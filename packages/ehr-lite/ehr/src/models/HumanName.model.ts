import { HumanNameUseEnum } from "./enums/HumanNameUse.enum";

export class HumanName {
  lastName?: string;
  firstNames?: string[];
  start?: number;
  end?: number;
  prefix?: string[];
  suffix?: string[];
  text?: string;
  use?: HumanNameUseEnum;

  static toJSON(instance: HumanName): any {
    const pojo: any = {};
    pojo["lastName"] = instance.lastName;
    pojo["firstNames"] = instance.firstNames?.map((item) => item);
    pojo["start"] = instance.start;
    pojo["end"] = instance.end;
    pojo["prefix"] = instance.prefix?.map((item) => item);
    pojo["suffix"] = instance.suffix?.map((item) => item);
    pojo["text"] = instance.text;
    pojo["use"] = instance.use;
    return pojo;
  }

  static fromJSON(pojo: any): HumanName {
    const instance = new HumanName();
    if (pojo["lastName"] === undefined) instance.lastName = undefined;
    instance.lastName = pojo["lastName"];
    if (pojo["firstNames"] === undefined) instance.firstNames = undefined;
    instance.firstNames = pojo["firstNames"]?.map((item: any) => item);
    if (pojo["start"] === undefined) instance.start = undefined;
    instance.start = pojo["start"];
    if (pojo["end"] === undefined) instance.end = undefined;
    instance.end = pojo["end"];
    if (pojo["prefix"] === undefined) instance.prefix = undefined;
    instance.prefix = pojo["prefix"]?.map((item: any) => item);
    if (pojo["suffix"] === undefined) instance.suffix = undefined;
    instance.suffix = pojo["suffix"]?.map((item: any) => item);
    if (pojo["text"] === undefined) instance.text = undefined;
    instance.text = pojo["text"];
    if (pojo["use"] === undefined) instance.use = undefined;
    instance.use = pojo["use"];
    return instance;
  }
}
