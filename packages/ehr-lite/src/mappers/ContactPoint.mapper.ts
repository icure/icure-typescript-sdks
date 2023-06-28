import { ContactPoint } from '../models/ContactPoint.model'
import { Telecom } from '@icure/api'
import { ContactPointTelecomTypeEnum } from '../models/enums/ContactPointTelecomType.enum'

function toTelecomTelecomType(domain: ContactPoint): Telecom.TelecomTypeEnum | undefined {
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

function toContactPointSystem(dto: Telecom): ContactPointTelecomTypeEnum | undefined {
    return dto.telecomType as ContactPointTelecomTypeEnum | undefined
}

function toContactPointValue(dto: Telecom): string | undefined {
    return dto.telecomNumber
}

function toContactPointDescription(dto: Telecom): string | undefined {
    return dto.telecomDescription
}

function toContactPointEncryptedSelf(dto: Telecom): string | undefined {
    return dto.encryptedSelf
}

export function mapTelecomToContactPoint(dto: Telecom): ContactPoint {
    return new ContactPoint({
        system: toContactPointSystem(dto),
        value: toContactPointValue(dto),
        description: toContactPointDescription(dto),
        encryptedSelf: toContactPointEncryptedSelf(dto),
    })
}

export function mapContactPointToTelecom(domain: ContactPoint): Telecom {
    return new Telecom({
        telecomType: toTelecomTelecomType(domain),
        telecomNumber: toTelecomTelecomNumber(domain),
        telecomDescription: toTelecomTelecomDescription(domain),
        encryptedSelf: toTelecomEncryptedSelf(domain),
    })
}
