import { ContactPoint } from '../models/ContactPoint.model'
import { TelecomDto } from '@icure/typescript-common'
import { ContactPointTelecomTypeEnum } from '../models/enums/ContactPointTelecomType.enum'

function toTelecomDtoTelecomType(domain: ContactPoint): TelecomDto.TelecomTypeEnum | undefined {
    return domain.system
}

function toTelecomDtoTelecomNumber(domain: ContactPoint): string | undefined {
    return domain.value
}

function toTelecomDtoTelecomDescription(domain: ContactPoint): string | undefined {
    return domain.description
}

function toTelecomDtoEncryptedSelf(domain: ContactPoint): string | undefined {
    return domain.encryptedSelf
}

function toContactPointSystem(dto: TelecomDto): ContactPointTelecomTypeEnum | undefined {
    return dto.telecomType as ContactPointTelecomTypeEnum | undefined
}

function toContactPointValue(dto: TelecomDto): string | undefined {
    return dto.telecomNumber
}

function toContactPointDescription(dto: TelecomDto): string | undefined {
    return dto.telecomDescription
}

function toContactPointEncryptedSelf(dto: TelecomDto): string | undefined {
    return dto.encryptedSelf
}

export function mapTelecomDtoToContactPoint(dto: TelecomDto): ContactPoint {
    return new ContactPoint({
        system: toContactPointSystem(dto),
        value: toContactPointValue(dto),
        description: toContactPointDescription(dto),
        encryptedSelf: toContactPointEncryptedSelf(dto),
    })
}

export function mapContactPointToTelecomDto(domain: ContactPoint): TelecomDto {
    return new TelecomDto({
        telecomType: toTelecomDtoTelecomType(domain),
        telecomNumber: toTelecomDtoTelecomNumber(domain),
        telecomDescription: toTelecomDtoTelecomDescription(domain),
        encryptedSelf: toTelecomDtoEncryptedSelf(domain),
    })
}
