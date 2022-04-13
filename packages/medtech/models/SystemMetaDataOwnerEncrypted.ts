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

import { Delegation } from './Delegation';

export class SystemMetaDataOwnerEncrypted {
constructor(json: ISystemMetaDataOwnerEncrypted) {
  Object.assign(this as SystemMetaDataOwnerEncrypted, json)
}

    'publicKey': string;
    'hcPartyKeys': { [key: string]: Array<string>; };
    'privateKeyShamirPartitions': { [key: string]: string; };
    'secretForeignKeys': Array<string>;
    'cryptedForeignKeys': { [key: string]: Set<Delegation>; };
    'delegations': { [key: string]: Set<Delegation>; };
    'encryptionKeys': { [key: string]: Set<Delegation>; };
    'aesExchangeKeys' : { [key: string]: { [key: string]: Array<string>; }; };
    'transferKeys' : { [key: string]: { [key: string]: string; }; };
    'lostHcPartyKeys' : Array<string>;
}

interface ISystemMetaDataOwnerEncrypted {
  'publicKey'?: string;
  'hcPartyKeys'?: { [key: string]: Array<string>; };
  'privateKeyShamirPartitions'?: { [key: string]: string; };
  'secretForeignKeys'?: Array<string>;
  'cryptedForeignKeys'?: { [key: string]: Set<Delegation>; };
  'delegations'?: { [key: string]: Set<Delegation>; };
  'encryptionKeys'?: { [key: string]: Set<Delegation>; };
  'aesExchangeKeys' ?: { [key: string]: { [key: string]: Array<string>; }; };
  'transferKeys' ?: { [key: string]: { [key: string]: string; }; };
  'lostHcPartyKeys' ?: Array<string>;
}

