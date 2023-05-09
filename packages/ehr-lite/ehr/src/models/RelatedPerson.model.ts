import { RelatedPersonStatusEnum } from "./enums/RelatedPersonStatus.enum";
import { RelatedPersonTypeEnum } from "./enums/RelatedPersonType.enum";

export class RelatedPerson {
  type?: RelatedPersonTypeEnum;
  status?: RelatedPersonStatusEnum;
  personId?: string;

  static toJSON(instance: RelatedPerson): any {
    const pojo: any = {};
    pojo["type"] = instance.type;
    pojo["status"] = instance.status;
    pojo["personId"] = instance.personId;
    return pojo;
  }

  static fromJSON(pojo: any): RelatedPerson {
    const instance = new RelatedPerson();
    if (pojo["type"] === undefined) instance.type = undefined;
    instance.type = pojo["type"];
    if (pojo["status"] === undefined) instance.status = undefined;
    instance.status = pojo["status"];
    if (pojo["personId"] === undefined) instance.personId = undefined;
    instance.personId = pojo["personId"];
    return instance;
  }
}
