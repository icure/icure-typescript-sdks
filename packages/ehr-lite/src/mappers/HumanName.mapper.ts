import { HumanName } from '../models/HumanName.model'
import { PersonNameDto } from '@icure/typescript-common'
import { HumanNameUseEnum } from '../models/enums/HumanNameUse.enum'

function toPersonNameDtoLastName(domain: HumanName): string | undefined {
    return domain.family
}

function toPersonNameDtoFirstNames(domain: HumanName): string[] | undefined {
    return domain.given
}

function toPersonNameDtoStart(domain: HumanName): number | undefined {
    return domain.start
}

function toPersonNameDtoEnd(domain: HumanName): number | undefined {
    return domain.end
}

function toPersonNameDtoPrefix(domain: HumanName): string[] | undefined {
    return domain.prefix
}

function toPersonNameDtoSuffix(domain: HumanName): string[] | undefined {
    return domain.suffix
}

function toPersonNameDtoText(domain: HumanName): string | undefined {
    return domain.text
}

function toPersonNameDtoUse(domain: HumanName): PersonNameDto.UseEnum | undefined {
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

export function mapPersonNameDtoToHumanName(dto: PersonNameDto): HumanName {
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

export function mapHumanNameToPersonNameDto(domain: HumanName): PersonNameDto {
    return new PersonNameDto({
        lastName: toPersonNameDtoLastName(domain),
        firstNames: toPersonNameDtoFirstNames(domain),
        start: toPersonNameDtoStart(domain),
        end: toPersonNameDtoEnd(domain),
        prefix: toPersonNameDtoPrefix(domain),
        suffix: toPersonNameDtoSuffix(domain),
        text: toPersonNameDtoText(domain),
        use: toPersonNameDtoUse(domain),
    })
}
