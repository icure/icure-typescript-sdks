import {SystemMetaDataEncrypted} from "../SystemMetaDataEncrypted.model";
import {SystemMetaDataOwnerEncrypted} from "../SystemMetaDataOwnerEncrypted.model";

export const exportSecretForeignKeys = (value?: SystemMetaDataOwnerEncrypted | SystemMetaDataEncrypted) => {
    return value?.secretForeignKeys
}

export const exportCryptedForeignKeys = (value?: SystemMetaDataOwnerEncrypted | SystemMetaDataEncrypted) => {
    return value?.cryptedForeignKeys
}

export const exportEncryptionKeys = (value?: SystemMetaDataOwnerEncrypted | SystemMetaDataEncrypted) => {
    return value?.encryptionKeys
}

export const exportDelegations = (value?: SystemMetaDataOwnerEncrypted | SystemMetaDataEncrypted) => {
    return value?.delegations
}

export const exportEncryptedSelf = (value?: SystemMetaDataOwnerEncrypted | SystemMetaDataEncrypted) => {
    return value?.encryptedSelf
}

export const exportSecurityMetadata = (value?: SystemMetaDataOwnerEncrypted | SystemMetaDataEncrypted) => {
    return value?.securityMetadata
}
