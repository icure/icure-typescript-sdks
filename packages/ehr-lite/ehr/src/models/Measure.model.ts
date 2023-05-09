import { CodingReference } from "./CodingReference.model";

export class Measure {
  value?: number;
  min?: number;
  max?: number;
  ref?: number;
  severity?: number;
  severityCode?: string;
  evolution?: number;
  unit?: string;
  unitCodes?: CodingReference[];
  comment?: string;
  comparator?: string;

  static toJSON(instance: Measure): any {
    const pojo: any = {};
    pojo["value"] = instance.value;
    pojo["min"] = instance.min;
    pojo["max"] = instance.max;
    pojo["ref"] = instance.ref;
    pojo["severity"] = instance.severity;
    pojo["severityCode"] = instance.severityCode;
    pojo["evolution"] = instance.evolution;
    pojo["unit"] = instance.unit;
    pojo["unitCodes"] = instance.unitCodes?.map((item) =>
      CodingReference.toJSON(item)
    );
    pojo["comment"] = instance.comment;
    pojo["comparator"] = instance.comparator;
    return pojo;
  }

  static fromJSON(pojo: any): Measure {
    const instance = new Measure();
    if (pojo["value"] === undefined) instance.value = undefined;
    instance.value = pojo["value"];
    if (pojo["min"] === undefined) instance.min = undefined;
    instance.min = pojo["min"];
    if (pojo["max"] === undefined) instance.max = undefined;
    instance.max = pojo["max"];
    if (pojo["ref"] === undefined) instance.ref = undefined;
    instance.ref = pojo["ref"];
    if (pojo["severity"] === undefined) instance.severity = undefined;
    instance.severity = pojo["severity"];
    if (pojo["severityCode"] === undefined) instance.severityCode = undefined;
    instance.severityCode = pojo["severityCode"];
    if (pojo["evolution"] === undefined) instance.evolution = undefined;
    instance.evolution = pojo["evolution"];
    if (pojo["unit"] === undefined) instance.unit = undefined;
    instance.unit = pojo["unit"];
    if (pojo["unitCodes"] === undefined) instance.unitCodes = undefined;
    instance.unitCodes = pojo["unitCodes"]?.map((item: any) =>
      CodingReference.fromJSON(item)
    );
    if (pojo["comment"] === undefined) instance.comment = undefined;
    instance.comment = pojo["comment"];
    if (pojo["comparator"] === undefined) instance.comparator = undefined;
    instance.comparator = pojo["comparator"];
    return instance;
  }
}
