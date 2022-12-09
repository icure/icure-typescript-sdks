/**
 * ICure Medical Device Micro Service
 * ICure Medical Device Micro Service
 *
 * OpenAPI spec version: v2
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


/**
* List of partners, or persons of contact (of class Partnership, see below).
*/
export class Partnership {
constructor(json: IPartnership) {
  const { type, status, ...simpleProperties } = json
  Object.assign(this as Partnership, simpleProperties as IPartnership)
  this.type = type as PartnershipTypeEnum
  this.status = status as PartnershipStatusEnum
}

    'type'?: PartnershipTypeEnum;
    'status'?: PartnershipStatusEnum;
    'partnerId'?: string;

    marshal(): IPartnership {
      return {
        ...this,
      }
    }
}

interface IPartnership {
  'type'?: PartnershipTypeEnum;
  'status'?: PartnershipStatusEnum;
  'partnerId'?: string;
}


export type PartnershipTypeEnum = "primary_contact" | "primary_contact_for" | "family" | "friend" | "counselor" | "contact" | "brother" | "brotherinlaw" | "child" | "daughter" | "employer" | "father" | "grandchild" | "grandparent" | "husband" | "lawyer" | "mother" | "neighbour" | "notary" | "partner" | "sister" | "sisterinlaw" | "son" | "spouse" | "stepdaughter" | "stepfather" | "stepmother" | "stepson" | "tutor" | "next_of_kin" | "federal_agency" | "insurance_company" | "state_agency" | "unknown" | "seealso" | "refer" ;
export type PartnershipStatusEnum = "active" | "complicated" | "past" ;
