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

import { Coding } from './Coding';
import { PaginatedDocumentKeyAndIdPairObject } from './PaginatedDocumentKeyAndIdPairObject';

export class PaginatedListCoding {
    'pageSize': number;
    'totalSize': number;
    'rows': Array<Coding>;
    'nextKeyPair'?: PaginatedDocumentKeyAndIdPairObject;

}

