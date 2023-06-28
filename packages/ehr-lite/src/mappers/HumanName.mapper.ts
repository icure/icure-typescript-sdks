import { HumanName } from '../models/HumanName.model'
import { PersonName } from '@icure/api'
import { HumanNameUseEnum } from '../models/enums/HumanNameUse.enum'

function toPersonNameLastName(domain: HumanName): string | undefined {
    return domain.lastName
}

function toPersonNameFirstNames(domain: HumanName): string[] | undefined {
    return domain.firstNames
}

function toPersonNameStart(domain: HumanName): number | undefined {
    return domain.start
}

function toPersonNameEnd(domain: HumanName): number | undefined {
    return domain.end
}

function toPersonNamePrefix(domain: HumanName): string[] | undefined {
    return domain.prefix
}

function toPersonNameSuffix(domain: HumanName): string[] | undefined {
    return domain.suffix
}

function toPersonNameText(domain: HumanName): string | undefined {
    return domain.text
}

function toPersonNameUse(domain: HumanName): PersonName.UseEnum | undefined {
    return domain.use as PersonName.UseEnum | undefined
}

function toHumanNameLastName(dto: PersonName): string | undefined {
    return dto.lastName
}

function toHumanNameFirstNames(dto: PersonName): string[] | undefined {
    return dto.firstNames
}

function toHumanNameStart(dto: PersonName): number | undefined {
    return dto.start
}

function toHumanNameEnd(dto: PersonName): number | undefined {
    return dto.end
}

function toHumanNamePrefix(dto: PersonName): string[] | undefined {
    return dto.prefix
}

function toHumanNameSuffix(dto: PersonName): string[] | undefined {
    return dto.suffix
}

function toHumanNameText(dto: PersonName): string | undefined {
    return dto.text
}

function toHumanNameUse(dto: PersonName): HumanNameUseEnum | undefined {
    return dto.use as HumanNameUseEnum
}

export function mapPersonNameToHumanName(dto: PersonName): HumanName {
    return new HumanName({
        lastName: toHumanNameLastName(dto),
        firstNames: toHumanNameFirstNames(dto),
        start: toHumanNameStart(dto),
        end: toHumanNameEnd(dto),
        prefix: toHumanNamePrefix(dto),
        suffix: toHumanNameSuffix(dto),
        text: toHumanNameText(dto),
        use: toHumanNameUse(dto),
    })
}

export function mapHumanNameToPersonName(domain: HumanName): PersonName {
    return new PersonName({
        lastName: toPersonNameLastName(domain),
        firstNames: toPersonNameFirstNames(domain),
        start: toPersonNameStart(domain),
        end: toPersonNameEnd(domain),
        prefix: toPersonNamePrefix(domain),
        suffix: toPersonNameSuffix(domain),
        text: toPersonNameText(domain),
        use: toPersonNameUse(domain),
    })
}
