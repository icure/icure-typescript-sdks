/**
 * ICure Medical Device Micro Service
 * ICure Medical Device Micro Service
 *
 * OpenAPI spec version: v2
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { PropertyType } from './PropertyType';
import { TypedValueObject } from './TypedValueObject';

/**
 * Extra properties for the user. Those properties are typed (see class Property)
 */
import {decodeBase64} from "./ModelHelper";

export class Property { 
    constructor(json: JSON | any) {
        Object.assign(this as Property, json)
    }

    id?: string;
    type?: PropertyType;
    typedValue?: TypedValueObject;
    deleted?: number;
}

