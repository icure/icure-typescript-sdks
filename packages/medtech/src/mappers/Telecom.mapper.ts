import { Telecom, TelecomTelecomTypeEnum } from '../models/Telecom.model'
import { Telecom as TelecomDto } from '@icure/api'

function toTelecomDtoTelecomType(domain: Telecom): TelecomDto.TelecomTypeEnum | undefined {
    return domain.telecomType
}

function toTelecomDtoTelecomNumber(domain: Telecom): string | undefined {
    return domain.telecomNumber
}

function toTelecomDtoTelecomDescription(domain: Telecom): string | undefined {
    return domain.telecomDescription
}

function toTelecomDtoEncryptedSelf(domain: Telecom): string | undefined {
    return undefined
}

function toTelecomTelecomType(dto: TelecomDto): TelecomTelecomTypeEnum | undefined {
    return dto.telecomType
}

function toTelecomTelecomNumber(dto: TelecomDto): string | undefined {
    return dto.telecomNumber
}

function toTelecomTelecomDescription(dto: TelecomDto): string | undefined {
    return dto.telecomDescription
}

export function mapTelecomDtoToTelecom(dto: TelecomDto): Telecom {
    return new Telecom({
        telecomType: toTelecomTelecomType(dto),
        telecomNumber: toTelecomTelecomNumber(dto),
        telecomDescription: toTelecomTelecomDescription(dto),
    })
}

export function mapTelecomToTelecomDto(domain: Telecom): TelecomDto {
    return new TelecomDto({
        telecomType: toTelecomDtoTelecomType(domain),
        telecomNumber: toTelecomDtoTelecomNumber(domain),
        telecomDescription: toTelecomDtoTelecomDescription(domain),
        encryptedSelf: toTelecomDtoEncryptedSelf(domain),
    })
}
