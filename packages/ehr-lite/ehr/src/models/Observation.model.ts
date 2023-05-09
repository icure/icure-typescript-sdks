import { ISO639_1 } from "@icure/api";
import { Annotation } from "./Annotation.model";
import { CodingReference } from "./CodingReference.model";
import { Component } from "./Component.model";
import { Identifier } from "./Identifier.model";
import { LocalComponent } from "./LocalComponent.model";

export class Observation {
  id?: string;
  transactionId?: string;
  identifiers?: Identifier[];
  batchId?: string;
  healthcareElementIds?: string[];
  index?: number;
  component?: Component;
  valueDate?: number;
  openingDate?: number;
  closingDate?: number;
  created?: number;
  modified?: number;
  endOfLife?: number;
  author?: string;
  performer?: string;
  localContent?: Map<ISO639_1, LocalComponent>;
  qualifiedLinks?: Map<string, Map<string, string>>;
  codes?: CodingReference[];
  tags?: CodingReference[];
  // systemMetaData?: SystemMetaDataEncrypted
  note?: Annotation[];

  static toJSON(instance: Observation): any {
    const pojo: any = {};
    pojo["id"] = instance.id;
    pojo["transactionId"] = instance.transactionId;
    pojo["identifiers"] = instance.identifiers?.map((item) =>
      Identifier.toJSON(item)
    );
    pojo["batchId"] = instance.batchId;
    pojo["healthcareElementIds"] = instance.healthcareElementIds?.map(
      (item) => item
    );
    pojo["index"] = instance.index;
    pojo["component"] = !!instance.component
      ? Component.toJSON(instance.component)
      : undefined;
    pojo["valueDate"] = instance.valueDate;
    pojo["openingDate"] = instance.openingDate;
    pojo["closingDate"] = instance.closingDate;
    pojo["created"] = instance.created;
    pojo["modified"] = instance.modified;
    pojo["endOfLife"] = instance.endOfLife;
    pojo["author"] = instance.author;
    pojo["performer"] = instance.performer;
    pojo["localContent"] = !!instance.localContent
      ? Object.fromEntries(
          [...instance.localContent.entries()].map(([k, v]) => [
            k,
            LocalComponent.toJSON(v),
          ])
        )
      : undefined;
    pojo["qualifiedLinks"] = !!instance.qualifiedLinks
      ? Object.fromEntries(
          [...instance.qualifiedLinks.entries()].map(([k, v]) => [
            k,
            Object.fromEntries([...v.entries()].map(([k, v]) => [k, v])),
          ])
        )
      : undefined;
    pojo["codes"] = instance.codes?.map((item) => CodingReference.toJSON(item));
    pojo["tags"] = instance.tags?.map((item) => CodingReference.toJSON(item));
    pojo["note"] = instance.note?.map((item) => Annotation.toJSON(item));
    return pojo;
  }

  static fromJSON(pojo: any): Observation {
    const instance = new Observation();
    if (pojo["id"] === undefined) instance.id = undefined;
    instance.id = pojo["id"];
    if (pojo["transactionId"] === undefined) instance.transactionId = undefined;
    instance.transactionId = pojo["transactionId"];
    if (pojo["identifiers"] === undefined) instance.identifiers = undefined;
    instance.identifiers = pojo["identifiers"]?.map((item: any) =>
      Identifier.fromJSON(item)
    );
    if (pojo["batchId"] === undefined) instance.batchId = undefined;
    instance.batchId = pojo["batchId"];
    if (pojo["healthcareElementIds"] === undefined)
      instance.healthcareElementIds = undefined;
    instance.healthcareElementIds = pojo["healthcareElementIds"]?.map(
      (item: any) => item
    );
    if (pojo["index"] === undefined) instance.index = undefined;
    instance.index = pojo["index"];
    if (pojo["component"] === undefined) instance.component = undefined;
    instance.component = !!pojo["component"]
      ? Component.fromJSON(pojo["component"])
      : undefined;
    if (pojo["valueDate"] === undefined) instance.valueDate = undefined;
    instance.valueDate = pojo["valueDate"];
    if (pojo["openingDate"] === undefined) instance.openingDate = undefined;
    instance.openingDate = pojo["openingDate"];
    if (pojo["closingDate"] === undefined) instance.closingDate = undefined;
    instance.closingDate = pojo["closingDate"];
    if (pojo["created"] === undefined) instance.created = undefined;
    instance.created = pojo["created"];
    if (pojo["modified"] === undefined) instance.modified = undefined;
    instance.modified = pojo["modified"];
    if (pojo["endOfLife"] === undefined) instance.endOfLife = undefined;
    instance.endOfLife = pojo["endOfLife"];
    if (pojo["author"] === undefined) instance.author = undefined;
    instance.author = pojo["author"];
    if (pojo["performer"] === undefined) instance.performer = undefined;
    instance.performer = pojo["performer"];
    if (pojo["localContent"] === undefined) instance.localContent = undefined;
    instance.localContent = pojo["localContent"]
      ? new Map(
          pojo["localContent"].map(([k, v]: [any, any]) => [
            k,
            LocalComponent.fromJSON(v),
          ])
        )
      : undefined;
    if (pojo["qualifiedLinks"] === undefined)
      instance.qualifiedLinks = undefined;
    instance.qualifiedLinks = pojo["qualifiedLinks"]
      ? new Map(
          pojo["qualifiedLinks"].map(([k, v]: [any, any]) => [
            k,
            new Map(v.map(([k, v]: [any, any]) => [k, v])),
          ])
        )
      : undefined;
    if (pojo["codes"] === undefined) instance.codes = undefined;
    instance.codes = pojo["codes"]?.map((item: any) =>
      CodingReference.fromJSON(item)
    );
    if (pojo["tags"] === undefined) instance.tags = undefined;
    instance.tags = pojo["tags"]?.map((item: any) =>
      CodingReference.fromJSON(item)
    );
    if (pojo["note"] === undefined) instance.note = undefined;
    instance.note = pojo["note"]?.map((item: any) => Annotation.fromJSON(item));
    return instance;
  }
}
