import { ContactPoint } from '../models/ContactPoint.model'
import { TelecomDto } from '@icure/typescript-common'
import { ContactPointTelecomTypeEnum } from '../models/enums/ContactPointTelecomType.enum'

function toTelecomTelecomType(domain: ContactPoint): TelecomDto.TelecomTypeEnum | undefined {
    return domain.system
}

function toTelecomTelecomNumber(domain: ContactPoint): string | undefined {
    return domain.value
}

function toTelecomTelecomDescription(domain: ContactPoint): string | undefined {
    return domain.description
}

function toTelecomEncryptedSelf(domain: ContactPoint): string | undefined {
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

export function mapTelecomToContactPoint(dto: TelecomDto): ContactPoint {
    return new ContactPoint({
        system: toContactPointSystem(dto),
        value: toContactPointValue(dto),
        description: toContactPointDescription(dto),
        encryptedSelf: toContactPointEncryptedSelf(dto),
    })
}

export function mapContactPointToTelecom(domain: ContactPoint): TelecomDto {
    return new TelecomDto({
        telecomType: toTelecomTelecomType(domain),
        telecomNumber: toTelecomTelecomNumber(domain),
        telecomDescription: toTelecomTelecomDescription(domain),
        encryptedSelf: toTelecomEncryptedSelf(domain),
    })
}
