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

import { HealthcareProfessional } from './HealthcareProfessional';
import { PaginatedDocumentKeyAndIdPairObject } from './PaginatedDocumentKeyAndIdPairObject';

export class PaginatedListHealthcareProfessional {
    'pageSize': number;
    'totalSize': number;
    'rows': Array<HealthcareProfessional>;
    'nextKeyPair'?: PaginatedDocumentKeyAndIdPairObject;

}

