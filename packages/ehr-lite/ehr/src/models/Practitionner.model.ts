import { b64_2ab, ua2b64 } from "@icure/api";
import { CodingReference } from "./CodingReference.model";
import { HumanName } from "./HumanName.model";
import { Location } from "./Location.model";
import { Property } from "./Property.model";
import { SystemMetaDataOwner } from "./SystemMetaDataOwner.model";
import { GenderEnum } from "./enums/Gender.enum";

export class Practitioner {
  id?: string;
  rev?: string;
  created?: number;
  modified?: number;
  tags?: CodingReference[];
  codes?: CodingReference[];
  deletionDate?: number;
  name?: string;
  lastName?: string;
  firstName?: string;
  names?: HumanName[];
  gender?: GenderEnum;
  civility?: string;
  speciality?: string;
  parentId?: string;
  addresses?: Location[];
  languages?: string[];
  picture?: ArrayBuffer;
  specialityCodes?: CodingReference[];
  description?: string;
  properties?: Property[];
  systemMetaData?: SystemMetaDataOwner;

  static toJSON(instance: Practitioner): any {
    const pojo: any = {};
    pojo["id"] = instance.id;
    pojo["rev"] = instance.rev;
    pojo["created"] = instance.created;
    pojo["modified"] = instance.modified;
    pojo["tags"] = instance.tags?.map((item) => CodingReference.toJSON(item));
    pojo["codes"] = instance.codes?.map((item) => CodingReference.toJSON(item));
    pojo["deletionDate"] = instance.deletionDate;
    pojo["name"] = instance.name;
    pojo["lastName"] = instance.lastName;
    pojo["firstName"] = instance.firstName;
    pojo["names"] = instance.names?.map((item) => HumanName.toJSON(item));
    pojo["gender"] = instance.gender;
    pojo["civility"] = instance.civility;
    pojo["speciality"] = instance.speciality;
    pojo["parentId"] = instance.parentId;
    pojo["addresses"] = instance.addresses?.map((item) =>
      Location.toJSON(item)
    );
    pojo["languages"] = instance.languages?.map((item) => item);
    pojo["picture"] = !!instance.picture ? ua2b64(instance.picture) : undefined;
    pojo["specialityCodes"] = instance.specialityCodes?.map((item) =>
      CodingReference.toJSON(item)
    );
    pojo["description"] = instance.description;
    pojo["properties"] = instance.properties?.map((item) =>
      Property.toJSON(item)
    );
    pojo["systemMetaData"] = !!instance.systemMetaData
      ? SystemMetaDataOwner.toJSON(instance.systemMetaData)
      : undefined;
    return pojo;
  }

  static fromJSON(pojo: any): Practitioner {
    const instance = new Practitioner();
    if (pojo["id"] === undefined) instance.id = undefined;
    instance.id = pojo["id"];
    if (pojo["rev"] === undefined) instance.rev = undefined;
    instance.rev = pojo["rev"];
    if (pojo["created"] === undefined) instance.created = undefined;
    instance.created = pojo["created"];
    if (pojo["modified"] === undefined) instance.modified = undefined;
    instance.modified = pojo["modified"];
    if (pojo["tags"] === undefined) instance.tags = undefined;
    instance.tags = pojo["tags"]?.map((item: any) =>
      CodingReference.fromJSON(item)
    );
    if (pojo["codes"] === undefined) instance.codes = undefined;
    instance.codes = pojo["codes"]?.map((item: any) =>
      CodingReference.fromJSON(item)
    );
    if (pojo["deletionDate"] === undefined) instance.deletionDate = undefined;
    instance.deletionDate = pojo["deletionDate"];
    if (pojo["name"] === undefined) instance.name = undefined;
    instance.name = pojo["name"];
    if (pojo["lastName"] === undefined) instance.lastName = undefined;
    instance.lastName = pojo["lastName"];
    if (pojo["firstName"] === undefined) instance.firstName = undefined;
    instance.firstName = pojo["firstName"];
    if (pojo["names"] === undefined) instance.names = undefined;
    instance.names = pojo["names"]?.map((item: any) =>
      HumanName.fromJSON(item)
    );
    if (pojo["gender"] === undefined) instance.gender = undefined;
    instance.gender = pojo["gender"];
    if (pojo["civility"] === undefined) instance.civility = undefined;
    instance.civility = pojo["civility"];
    if (pojo["speciality"] === undefined) instance.speciality = undefined;
    instance.speciality = pojo["speciality"];
    if (pojo["parentId"] === undefined) instance.parentId = undefined;
    instance.parentId = pojo["parentId"];
    if (pojo["addresses"] === undefined) instance.addresses = undefined;
    instance.addresses = pojo["addresses"]?.map((item: any) =>
      Location.fromJSON(item)
    );
    if (pojo["languages"] === undefined) instance.languages = undefined;
    instance.languages = pojo["languages"]?.map((item: any) => item);
    if (pojo["picture"] === undefined) instance.picture = undefined;
    instance.picture = !!pojo["picture"] ? b64_2ab(pojo["picture"]) : undefined;
    if (pojo["specialityCodes"] === undefined)
      instance.specialityCodes = undefined;
    instance.specialityCodes = pojo["specialityCodes"]?.map((item: any) =>
      CodingReference.fromJSON(item)
    );
    if (pojo["description"] === undefined) instance.description = undefined;
    instance.description = pojo["description"];
    if (pojo["properties"] === undefined) instance.properties = undefined;
    instance.properties = pojo["properties"]?.map((item: any) =>
      Property.fromJSON(item)
    );
    if (pojo["systemMetaData"] === undefined)
      instance.systemMetaData = undefined;
    instance.systemMetaData = !!pojo["systemMetaData"]
      ? SystemMetaDataOwner.fromJSON(pojo["systemMetaData"])
      : undefined;
    return instance;
  }
}
