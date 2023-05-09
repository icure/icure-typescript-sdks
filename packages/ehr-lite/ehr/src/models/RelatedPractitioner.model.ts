import { PractitionerTypeEnum } from "./enums/PractitionerType.enum";

export class RelatedPractitioner {
  type?: PractitionerTypeEnum;
  healthcarePartyId?: string;

  static toJSON(instance: RelatedPractitioner): any {
    const pojo: any = {};
    pojo["type"] = instance.type;
    pojo["healthcarePartyId"] = instance.healthcarePartyId;
    return pojo;
  }

  static fromJSON(pojo: any): RelatedPractitioner {
    const instance = new RelatedPractitioner();
    if (pojo["type"] === undefined) instance.type = undefined;
    instance.type = pojo["type"];
    if (pojo["healthcarePartyId"] === undefined)
      instance.healthcarePartyId = undefined;
    instance.healthcarePartyId = pojo["healthcarePartyId"];
    return instance;
  }
}
