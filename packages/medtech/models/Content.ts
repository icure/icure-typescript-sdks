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

import { DataSample } from './DataSample';
import { Measure } from './Measure';
import { TimeSeries } from './TimeSeries';

/**
* Information contained in the data sample (Measure, number, ...). Content is localized, using ISO language code as key
*/
export class Content {
constructor(json: IContent) {
  Object.assign(this as Content, json)
}

    'stringValue'?: string;
    'numberValue'?: number;
    'booleanValue'?: boolean;
    'instantValue'?: Date;
    /**
    * Value as date. The format could have a all three (day, month and year) or values on any of these three, whatever is known.
    */
    'fuzzyDateValue'?: number;
    'binaryValue'?: string;
    /**
    * Linked document.
    */
    'documentId'?: string;
    'measureValue'?: Measure;
    'timeSeries'?: TimeSeries;
    'compoundValue'?: Array<DataSample>;
    'ratio'?: Array<Measure>;
    'range'?: Array<Measure>;

}

interface IContent {
  'stringValue'?: string;
  'numberValue'?: number;
  'booleanValue'?: boolean;
  'instantValue'?: Date;
  'fuzzyDateValue'?: number;
  'binaryValue'?: string;
  'documentId'?: string;
  'measureValue'?: Measure;
  'timeSeries'?: TimeSeries;
  'compoundValue'?: Array<DataSample>;
  'ratio'?: Array<Measure>;
  'range'?: Array<Measure>;
}

