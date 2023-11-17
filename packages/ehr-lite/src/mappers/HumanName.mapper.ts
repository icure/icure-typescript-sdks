import { HumanName } from '../models/HumanName.model'
import { PersonNameDto } from '@icure/typescript-common'
import { HumanNameUseEnum } from '../models/enums/HumanNameUse.enum'

function toPersonNameLastName(domain: HumanName): string | undefined {
    return domain.family
}

function toPersonNameFirstNames(domain: HumanName): string[] | undefined {
    return domain.given
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

function toPersonNameUse(domain: HumanName): PersonNameDto.UseEnum | undefined {
    return domain.use as PersonNameDto.UseEnum | undefined
}

function toHumanNameFamily(dto: PersonNameDto): string | undefined {
    return dto.lastName
}

function toHumanNameGiven(dto: PersonNameDto): string[] | undefined {
    return dto.firstNames
}

function toHumanNameStart(dto: PersonNameDto): number | undefined {
    return dto.start
}

function toHumanNameEnd(dto: PersonNameDto): number | undefined {
    return dto.end
}

function toHumanNamePrefix(dto: PersonNameDto): string[] | undefined {
    return dto.prefix
}

function toHumanNameSuffix(dto: PersonNameDto): string[] | undefined {
    return dto.suffix
}

function toHumanNameText(dto: PersonNameDto): string | undefined {
    return dto.text
}

function toHumanNameUse(dto: PersonNameDto): HumanNameUseEnum | undefined {
    return dto.use as HumanNameUseEnum
}

export function mapPersonNameToHumanName(dto: PersonNameDto): HumanName {
    return new HumanName({
        family: toHumanNameFamily(dto),
        given: toHumanNameGiven(dto),
        start: toHumanNameStart(dto),
        end: toHumanNameEnd(dto),
        prefix: toHumanNamePrefix(dto),
        suffix: toHumanNameSuffix(dto),
        text: toHumanNameText(dto),
        use: toHumanNameUse(dto),
    })
}

export function mapHumanNameToPersonName(domain: HumanName): PersonNameDto {
    return new PersonNameDto({
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
