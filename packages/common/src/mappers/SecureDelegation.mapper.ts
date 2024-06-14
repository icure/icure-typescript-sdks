import { SecureDelegation } from '../models/SecureDelegation.model'
import { SecureDelegation as SecureDelegationDto } from '@icure/api'
import { AccessLevelEnum } from '../models/enums/AccessLevel.enum'

function toSecureDelegationDtoDelegator(domain: SecureDelegation): string | undefined {
    return domain.delegator
}

function toSecureDelegationDtoDelegate(domain: SecureDelegation): string | undefined {
    return domain.delegate
}

function toSecureDelegationDtoSecretIds(domain: SecureDelegation): string[] | undefined {
    return [...domain.secretIds]
}

function toSecureDelegationDtoEncryptionKeys(domain: SecureDelegation): string[] | undefined {
    return [...domain.encryptionKeys]
}

function toSecureDelegationDtoOwningEntityIds(domain: SecureDelegation): string[] | undefined {
    return [...domain.owningEntityIds]
}

function toSecureDelegationDtoParentDelegations(domain: SecureDelegation): string[] | undefined {
    return [...domain.parentDelegations]
}

function toSecureDelegationDtoExchangeDataId(domain: SecureDelegation): string | undefined {
    return domain.exchangeDataId
}

function toSecureDelegationDtoPermissions(domain: SecureDelegation): SecureDelegationDto.AccessLevelEnum {
    return domain.permissions
}

function toSecureDelegationDelegator(dto: SecureDelegationDto): string | undefined {
    return dto.delegator
}

function toSecureDelegationDelegate(dto: SecureDelegationDto): string | undefined {
    return dto.delegate
}

function toSecureDelegationSecretIds(dto: SecureDelegationDto): Array<string> {
    return dto.secretIds ?? []
}

function toSecureDelegationEncryptionKeys(dto: SecureDelegationDto): Array<string> {
    return dto.encryptionKeys ?? []
}

function toSecureDelegationOwningEntityIds(dto: SecureDelegationDto): Array<string> {
    return dto.owningEntityIds ?? []
}

function toSecureDelegationParentDelegations(dto: SecureDelegationDto): Array<string> {
    return dto.parentDelegations ?? []
}

function toSecureDelegationExchangeDataId(dto: SecureDelegationDto): string | undefined {
    return dto.exchangeDataId
}

function toSecureDelegationPermissions(dto: SecureDelegationDto): AccessLevelEnum {
    return dto.permissions as AccessLevelEnum
}

export function mapSecureDelegationDtoToSecureDelegation(dto: SecureDelegationDto): SecureDelegation {
    return new SecureDelegation({
        delegator: toSecureDelegationDelegator(dto),
        delegate: toSecureDelegationDelegate(dto),
        secretIds: toSecureDelegationSecretIds(dto),
        encryptionKeys: toSecureDelegationEncryptionKeys(dto),
        owningEntityIds: toSecureDelegationOwningEntityIds(dto),
        parentDelegations: toSecureDelegationParentDelegations(dto),
        exchangeDataId: toSecureDelegationExchangeDataId(dto),
        permissions: toSecureDelegationPermissions(dto),
    })
}

export function mapSecureDelegationToSecureDelegationDto(domain: SecureDelegation): SecureDelegationDto {
    return new SecureDelegationDto({
        delegator: toSecureDelegationDtoDelegator(domain),
        delegate: toSecureDelegationDtoDelegate(domain),
        secretIds: toSecureDelegationDtoSecretIds(domain),
        encryptionKeys: toSecureDelegationDtoEncryptionKeys(domain),
        owningEntityIds: toSecureDelegationDtoOwningEntityIds(domain),
        parentDelegations: toSecureDelegationDtoParentDelegations(domain),
        exchangeDataId: toSecureDelegationDtoExchangeDataId(domain),
        permissions: toSecureDelegationDtoPermissions(domain),
    })
}
