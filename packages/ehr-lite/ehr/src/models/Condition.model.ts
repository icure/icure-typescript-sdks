import { Annotation } from "./Annotation.model";
import { CodingReference } from "./CodingReference.model";
import { Identifier } from "./Identifier.model";
import { SystemMetaDataEncrypted } from "./SystemMetaDataEncrypted.model";
import { CategoryEnum } from "./enums/Category.enum";
import { ClinicalStatusEnum } from "./enums/ClinicalStatus.enum";
import { SeverityEnum } from "./enums/Severity.enum";
import { VerificationStatusEnum } from "./enums/VerificationStatus.enum";
// import {SystemMetaDataEncrypted} from "./SystemMetaDataEncrypted";

export class Condition {
  id?: string;
  identifiers?: Set<Identifier>;
  rev?: string;
  created?: number;
  modified?: number;
  author?: string;
  responsible?: string;
  medicalLocationId?: string;
  clinicalStatus?: ClinicalStatusEnum;
  verificationStatus?: VerificationStatusEnum;
  category?: CategoryEnum;
  severity?: SeverityEnum;
  bodySite?: Set<CodingReference>;
  tags?: Set<CodingReference>;
  codes?: Set<CodingReference>;
  endOfLife?: number;
  deletionDate?: number;
  healthcareElementId?: string;
  recordedDate?: number;
  openingDate?: number;
  closingDate?: number;
  description?: string;
  notes?: Annotation[];
  systemMetaData?: SystemMetaDataEncrypted;

  static toJSON(instance: Condition): any {
    const pojo: any = {};
    pojo["id"] = instance.id;
    pojo["identifiers"] = Array.from(
      [...(instance.identifiers ?? [])]?.map((item) =>
        Identifier.toJSON(item)
      ) ?? []
    );
    pojo["rev"] = instance.rev;
    pojo["created"] = instance.created;
    pojo["modified"] = instance.modified;
    pojo["author"] = instance.author;
    pojo["responsible"] = instance.responsible;
    pojo["medicalLocationId"] = instance.medicalLocationId;
    pojo["clinicalStatus"] = instance.clinicalStatus;
    pojo["verificationStatus"] = instance.verificationStatus;
    pojo["category"] = instance.category;
    pojo["severity"] = instance.severity;
    pojo["bodySite"] = Array.from(
      [...(instance.bodySite ?? [])]?.map((item) =>
        CodingReference.toJSON(item)
      ) ?? []
    );
    pojo["tags"] = Array.from(
      [...(instance.tags ?? [])]?.map((item) => CodingReference.toJSON(item)) ??
        []
    );
    pojo["codes"] = Array.from(
      [...(instance.codes ?? [])]?.map((item) =>
        CodingReference.toJSON(item)
      ) ?? []
    );
    pojo["endOfLife"] = instance.endOfLife;
    pojo["deletionDate"] = instance.deletionDate;
    pojo["healthcareElementId"] = instance.healthcareElementId;
    pojo["recordedDate"] = instance.recordedDate;
    pojo["openingDate"] = instance.openingDate;
    pojo["closingDate"] = instance.closingDate;
    pojo["description"] = instance.description;
    pojo["notes"] = instance.notes?.map((item) => Annotation.toJSON(item));
    pojo["systemMetaData"] = !!instance.systemMetaData
      ? SystemMetaDataEncrypted.toJSON(instance.systemMetaData)
      : undefined;
    return pojo;
  }

  static fromJSON(pojo: any): Condition {
    const instance = new Condition();
    if (pojo["id"] === undefined) instance.id = undefined;
    instance.id = pojo["id"];
    if (pojo["identifiers"] === undefined) instance.identifiers = undefined;
    instance.identifiers = new Set(
      pojo["identifiers"]?.map((item: any) => Identifier.fromJSON(item)) ?? []
    );
    if (pojo["rev"] === undefined) instance.rev = undefined;
    instance.rev = pojo["rev"];
    if (pojo["created"] === undefined) instance.created = undefined;
    instance.created = pojo["created"];
    if (pojo["modified"] === undefined) instance.modified = undefined;
    instance.modified = pojo["modified"];
    if (pojo["author"] === undefined) instance.author = undefined;
    instance.author = pojo["author"];
    if (pojo["responsible"] === undefined) instance.responsible = undefined;
    instance.responsible = pojo["responsible"];
    if (pojo["medicalLocationId"] === undefined)
      instance.medicalLocationId = undefined;
    instance.medicalLocationId = pojo["medicalLocationId"];
    if (pojo["clinicalStatus"] === undefined)
      instance.clinicalStatus = undefined;
    instance.clinicalStatus = pojo["clinicalStatus"];
    if (pojo["verificationStatus"] === undefined)
      instance.verificationStatus = undefined;
    instance.verificationStatus = pojo["verificationStatus"];
    if (pojo["category"] === undefined) instance.category = undefined;
    instance.category = pojo["category"];
    if (pojo["severity"] === undefined) instance.severity = undefined;
    instance.severity = pojo["severity"];
    if (pojo["bodySite"] === undefined) instance.bodySite = undefined;
    instance.bodySite = new Set(
      pojo["bodySite"]?.map((item: any) => CodingReference.fromJSON(item)) ?? []
    );
    if (pojo["tags"] === undefined) instance.tags = undefined;
    instance.tags = new Set(
      pojo["tags"]?.map((item: any) => CodingReference.fromJSON(item)) ?? []
    );
    if (pojo["codes"] === undefined) instance.codes = undefined;
    instance.codes = new Set(
      pojo["codes"]?.map((item: any) => CodingReference.fromJSON(item)) ?? []
    );
    if (pojo["endOfLife"] === undefined) instance.endOfLife = undefined;
    instance.endOfLife = pojo["endOfLife"];
    if (pojo["deletionDate"] === undefined) instance.deletionDate = undefined;
    instance.deletionDate = pojo["deletionDate"];
    if (pojo["healthcareElementId"] === undefined)
      instance.healthcareElementId = undefined;
    instance.healthcareElementId = pojo["healthcareElementId"];
    if (pojo["recordedDate"] === undefined) instance.recordedDate = undefined;
    instance.recordedDate = pojo["recordedDate"];
    if (pojo["openingDate"] === undefined) instance.openingDate = undefined;
    instance.openingDate = pojo["openingDate"];
    if (pojo["closingDate"] === undefined) instance.closingDate = undefined;
    instance.closingDate = pojo["closingDate"];
    if (pojo["description"] === undefined) instance.description = undefined;
    instance.description = pojo["description"];
    if (pojo["notes"] === undefined) instance.notes = undefined;
    instance.notes = pojo["notes"]?.map((item: any) =>
      Annotation.fromJSON(item)
    );
    if (pojo["systemMetaData"] === undefined)
      instance.systemMetaData = undefined;
    instance.systemMetaData = !!pojo["systemMetaData"]
      ? SystemMetaDataEncrypted.fromJSON(pojo["systemMetaData"])
      : undefined;
    return instance;
  }
}
