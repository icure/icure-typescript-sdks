import { Annotation } from "./Annotation.model";
import { ContactPoint } from "./ContactPoint.model";
import { LocationAddressTypeEnum } from "./enums/LocationAddressType.enum";

export class Location {
  addressType?: LocationAddressTypeEnum;
  description?: string;
  street?: string;
  houseNumber?: string;
  postboxNumber?: string;
  postalCode?: string;
  city?: string;
  state?: string;
  country?: string;
  notes?: Annotation[];
  telecoms?: ContactPoint[];

  static toJSON(instance: Location): any {
    const pojo: any = {};
    pojo["addressType"] = instance.addressType;
    pojo["description"] = instance.description;
    pojo["street"] = instance.street;
    pojo["houseNumber"] = instance.houseNumber;
    pojo["postboxNumber"] = instance.postboxNumber;
    pojo["postalCode"] = instance.postalCode;
    pojo["city"] = instance.city;
    pojo["state"] = instance.state;
    pojo["country"] = instance.country;
    pojo["notes"] = instance.notes?.map((item) => Annotation.toJSON(item));
    pojo["telecoms"] = instance.telecoms?.map((item) =>
      ContactPoint.toJSON(item)
    );
    return pojo;
  }

  static fromJSON(pojo: any): Location {
    const instance = new Location();
    if (pojo["addressType"] === undefined) instance.addressType = undefined;
    instance.addressType = pojo["addressType"];
    if (pojo["description"] === undefined) instance.description = undefined;
    instance.description = pojo["description"];
    if (pojo["street"] === undefined) instance.street = undefined;
    instance.street = pojo["street"];
    if (pojo["houseNumber"] === undefined) instance.houseNumber = undefined;
    instance.houseNumber = pojo["houseNumber"];
    if (pojo["postboxNumber"] === undefined) instance.postboxNumber = undefined;
    instance.postboxNumber = pojo["postboxNumber"];
    if (pojo["postalCode"] === undefined) instance.postalCode = undefined;
    instance.postalCode = pojo["postalCode"];
    if (pojo["city"] === undefined) instance.city = undefined;
    instance.city = pojo["city"];
    if (pojo["state"] === undefined) instance.state = undefined;
    instance.state = pojo["state"];
    if (pojo["country"] === undefined) instance.country = undefined;
    instance.country = pojo["country"];
    if (pojo["notes"] === undefined) instance.notes = undefined;
    instance.notes = pojo["notes"]?.map((item: any) =>
      Annotation.fromJSON(item)
    );
    if (pojo["telecoms"] === undefined) instance.telecoms = undefined;
    instance.telecoms = pojo["telecoms"]?.map((item: any) =>
      ContactPoint.fromJSON(item)
    );
    return instance;
  }
}
