import { AuthenticationToken } from '../models/AuthenticationToken.model'
import { AuthenticationToken as AuthenticationTokenDto } from '@icure/api'

function toAuthenticationTokenDtoToken(domain: AuthenticationToken): string | undefined {
    return domain.token
}

function toAuthenticationTokenDtoCreationTime(domain: AuthenticationToken): number | undefined {
    return domain.creationTime
}

function toAuthenticationTokenDtoValidity(domain: AuthenticationToken): number | undefined {
    return domain.validity
}

function toAuthenticationTokenDtoDeletionDate(domain: AuthenticationToken): number | undefined {
    return undefined
}

function toAuthenticationTokenToken(dto: AuthenticationTokenDto): string | undefined {
    return dto.token
}

function toAuthenticationTokenCreationTime(dto: AuthenticationTokenDto): number {
    if (!dto.creationTime) {
        throw new Error('CreationTime is required')
    }
    return dto.creationTime
}

function toAuthenticationTokenValidity(dto: AuthenticationTokenDto): number {
    if (!dto.validity) {
        throw new Error('Validity is required')
    }
    return dto.validity
}

export function mapAuthenticationTokenDtoToAuthenticationToken(dto: AuthenticationTokenDto): AuthenticationToken {
    return new AuthenticationToken({
        token: toAuthenticationTokenToken(dto),
        creationTime: toAuthenticationTokenCreationTime(dto),
        validity: toAuthenticationTokenValidity(dto),
    })
}

export function mapAuthenticationTokenToAuthenticationTokenDto(domain: AuthenticationToken): AuthenticationTokenDto {
    return new AuthenticationTokenDto({
        token: toAuthenticationTokenDtoToken(domain),
        creationTime: toAuthenticationTokenDtoCreationTime(domain),
        validity: toAuthenticationTokenDtoValidity(domain),
        deletionDate: toAuthenticationTokenDtoDeletionDate(domain),
    })
}
