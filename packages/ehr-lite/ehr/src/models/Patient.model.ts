import { b64_2ab, ua2b64 } from "@icure/api";
import { Annotation } from "./Annotation.model";
import { CodingReference } from "./CodingReference.model";
import { HumanName } from "./HumanName.model";
import { Identifier } from "./Identifier.model";
import { Location } from "./Location.model";
import { Property } from "./Property.model";
import { RelatedPerson } from "./RelatedPerson.model";
import { RelatedPractitioner } from "./RelatedPractitioner.model";
import { SystemMetaDataOwnerEncrypted } from "./SystemMetaDataOwnerEncrypted.model";
import { GenderEnum } from "./enums/Gender.enum";
import { PatientDeactivationReasonEnum } from "./enums/PatientDeactivationReason.enum";
import { PatientPersonalStatusEnum } from "./enums/PatientPersonalStatus.enum";

export class Patient {
  id?: string;
  rev?: string;
  identifiers?: Identifier[];
  created?: number;
  modified?: number;
  author?: string;
  responsible?: string;
  tags?: CodingReference[];
  codes?: CodingReference[];
  endOfLife?: number;
  deletionDate?: number;
  name?: HumanName[];
  languages?: string[];
  addresses?: Location[];
  civility?: string;
  gender?: GenderEnum;
  birthSex?: GenderEnum;
  mergeToPatientId?: string;
  mergedIds?: string[];
  active?: boolean;
  deactivationReason?: PatientDeactivationReasonEnum;
  personalStatus?: PatientPersonalStatusEnum;
  dateOfBirth?: number;
  dateOfDeath?: number;
  placeOfBirth?: string;
  placeOfDeath?: string;
  deceased?: boolean;
  education?: string;
  profession?: string;
  notes?: Annotation[];
  nationality?: string;
  race?: string;
  ethnicity?: string;
  picture?: ArrayBuffer;
  externalId?: string;
  relatives?: RelatedPerson[];
  patientPractioners?: RelatedPractitioner[];
  patientProfessions?: CodingReference[];
  properties?: Property[];
  systemMetaData?: SystemMetaDataOwnerEncrypted;

  static toJSON(instance: Patient): any {
    const pojo: any = {};
    pojo["id"] = instance.id;
    pojo["rev"] = instance.rev;
    pojo["identifiers"] = instance.identifiers?.map((item) =>
      Identifier.toJSON(item)
    );
    pojo["created"] = instance.created;
    pojo["modified"] = instance.modified;
    pojo["author"] = instance.author;
    pojo["responsible"] = instance.responsible;
    pojo["tags"] = instance.tags?.map((item) => CodingReference.toJSON(item));
    pojo["codes"] = instance.codes?.map((item) => CodingReference.toJSON(item));
    pojo["endOfLife"] = instance.endOfLife;
    pojo["deletionDate"] = instance.deletionDate;
    pojo["name"] = instance.name?.map((item) => HumanName.toJSON(item));
    pojo["languages"] = instance.languages?.map((item) => item);
    pojo["addresses"] = instance.addresses?.map((item) =>
      Location.toJSON(item)
    );
    pojo["civility"] = instance.civility;
    pojo["gender"] = instance.gender;
    pojo["birthSex"] = instance.birthSex;
    pojo["mergeToPatientId"] = instance.mergeToPatientId;
    pojo["mergedIds"] = instance.mergedIds?.map((item) => item);
    pojo["active"] = instance.active;
    pojo["deactivationReason"] = instance.deactivationReason;
    pojo["personalStatus"] = instance.personalStatus;
    pojo["dateOfBirth"] = instance.dateOfBirth;
    pojo["dateOfDeath"] = instance.dateOfDeath;
    pojo["placeOfBirth"] = instance.placeOfBirth;
    pojo["placeOfDeath"] = instance.placeOfDeath;
    pojo["deceased"] = instance.deceased;
    pojo["education"] = instance.education;
    pojo["profession"] = instance.profession;
    pojo["notes"] = instance.notes?.map((item) => Annotation.toJSON(item));
    pojo["nationality"] = instance.nationality;
    pojo["race"] = instance.race;
    pojo["ethnicity"] = instance.ethnicity;
    pojo["picture"] = !!instance.picture ? ua2b64(instance.picture) : undefined;
    pojo["externalId"] = instance.externalId;
    pojo["relatives"] = instance.relatives?.map((item) =>
      RelatedPerson.toJSON(item)
    );
    pojo["patientPractioners"] = instance.patientPractioners?.map((item) =>
      RelatedPractitioner.toJSON(item)
    );
    pojo["patientProfessions"] = instance.patientProfessions?.map((item) =>
      CodingReference.toJSON(item)
    );
    pojo["properties"] = instance.properties?.map((item) =>
      Property.toJSON(item)
    );
    pojo["systemMetaData"] = !!instance.systemMetaData
      ? SystemMetaDataOwnerEncrypted.toJSON(instance.systemMetaData)
      : undefined;
    return pojo;
  }

  static fromJSON(pojo: any): Patient {
    const instance = new Patient();
    if (pojo["id"] === undefined) instance.id = undefined;
    instance.id = pojo["id"];
    if (pojo["rev"] === undefined) instance.rev = undefined;
    instance.rev = pojo["rev"];
    if (pojo["identifiers"] === undefined) instance.identifiers = undefined;
    instance.identifiers = pojo["identifiers"]?.map((item: any) =>
      Identifier.fromJSON(item)
    );
    if (pojo["created"] === undefined) instance.created = undefined;
    instance.created = pojo["created"];
    if (pojo["modified"] === undefined) instance.modified = undefined;
    instance.modified = pojo["modified"];
    if (pojo["author"] === undefined) instance.author = undefined;
    instance.author = pojo["author"];
    if (pojo["responsible"] === undefined) instance.responsible = undefined;
    instance.responsible = pojo["responsible"];
    if (pojo["tags"] === undefined) instance.tags = undefined;
    instance.tags = pojo["tags"]?.map((item: any) =>
      CodingReference.fromJSON(item)
    );
    if (pojo["codes"] === undefined) instance.codes = undefined;
    instance.codes = pojo["codes"]?.map((item: any) =>
      CodingReference.fromJSON(item)
    );
    if (pojo["endOfLife"] === undefined) instance.endOfLife = undefined;
    instance.endOfLife = pojo["endOfLife"];
    if (pojo["deletionDate"] === undefined) instance.deletionDate = undefined;
    instance.deletionDate = pojo["deletionDate"];
    if (pojo["name"] === undefined) instance.name = undefined;
    instance.name = pojo["name"]?.map((item: any) => HumanName.fromJSON(item));
    if (pojo["languages"] === undefined) instance.languages = undefined;
    instance.languages = pojo["languages"]?.map((item: any) => item);
    if (pojo["addresses"] === undefined) instance.addresses = undefined;
    instance.addresses = pojo["addresses"]?.map((item: any) =>
      Location.fromJSON(item)
    );
    if (pojo["civility"] === undefined) instance.civility = undefined;
    instance.civility = pojo["civility"];
    if (pojo["gender"] === undefined) instance.gender = undefined;
    instance.gender = pojo["gender"];
    if (pojo["birthSex"] === undefined) instance.birthSex = undefined;
    instance.birthSex = pojo["birthSex"];
    if (pojo["mergeToPatientId"] === undefined)
      instance.mergeToPatientId = undefined;
    instance.mergeToPatientId = pojo["mergeToPatientId"];
    if (pojo["mergedIds"] === undefined) instance.mergedIds = undefined;
    instance.mergedIds = pojo["mergedIds"]?.map((item: any) => item);
    if (pojo["active"] === undefined) instance.active = undefined;
    instance.active = pojo["active"];
    if (pojo["deactivationReason"] === undefined)
      instance.deactivationReason = undefined;
    instance.deactivationReason = pojo["deactivationReason"];
    if (pojo["personalStatus"] === undefined)
      instance.personalStatus = undefined;
    instance.personalStatus = pojo["personalStatus"];
    if (pojo["dateOfBirth"] === undefined) instance.dateOfBirth = undefined;
    instance.dateOfBirth = pojo["dateOfBirth"];
    if (pojo["dateOfDeath"] === undefined) instance.dateOfDeath = undefined;
    instance.dateOfDeath = pojo["dateOfDeath"];
    if (pojo["placeOfBirth"] === undefined) instance.placeOfBirth = undefined;
    instance.placeOfBirth = pojo["placeOfBirth"];
    if (pojo["placeOfDeath"] === undefined) instance.placeOfDeath = undefined;
    instance.placeOfDeath = pojo["placeOfDeath"];
    if (pojo["deceased"] === undefined) instance.deceased = undefined;
    instance.deceased = pojo["deceased"];
    if (pojo["education"] === undefined) instance.education = undefined;
    instance.education = pojo["education"];
    if (pojo["profession"] === undefined) instance.profession = undefined;
    instance.profession = pojo["profession"];
    if (pojo["notes"] === undefined) instance.notes = undefined;
    instance.notes = pojo["notes"]?.map((item: any) =>
      Annotation.fromJSON(item)
    );
    if (pojo["nationality"] === undefined) instance.nationality = undefined;
    instance.nationality = pojo["nationality"];
    if (pojo["race"] === undefined) instance.race = undefined;
    instance.race = pojo["race"];
    if (pojo["ethnicity"] === undefined) instance.ethnicity = undefined;
    instance.ethnicity = pojo["ethnicity"];
    if (pojo["picture"] === undefined) instance.picture = undefined;
    instance.picture = !!pojo["picture"] ? b64_2ab(pojo["picture"]) : undefined;
    if (pojo["externalId"] === undefined) instance.externalId = undefined;
    instance.externalId = pojo["externalId"];
    if (pojo["relatives"] === undefined) instance.relatives = undefined;
    instance.relatives = pojo["relatives"]?.map((item: any) =>
      RelatedPerson.fromJSON(item)
    );
    if (pojo["patientPractioners"] === undefined)
      instance.patientPractioners = undefined;
    instance.patientPractioners = pojo["patientPractioners"]?.map((item: any) =>
      RelatedPractitioner.fromJSON(item)
    );
    if (pojo["patientProfessions"] === undefined)
      instance.patientProfessions = undefined;
    instance.patientProfessions = pojo["patientProfessions"]?.map((item: any) =>
      CodingReference.fromJSON(item)
    );
    if (pojo["properties"] === undefined) instance.properties = undefined;
    instance.properties = pojo["properties"]?.map((item: any) =>
      Property.fromJSON(item)
    );
    if (pojo["systemMetaData"] === undefined)
      instance.systemMetaData = undefined;
    instance.systemMetaData = !!pojo["systemMetaData"]
      ? SystemMetaDataOwnerEncrypted.fromJSON(pojo["systemMetaData"])
      : undefined;
    return instance;
  }
}
