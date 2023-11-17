import { PersonName, PersonNameUseEnum } from '../models/PersonName.model'
import { PersonNameDto } from '@icure/typescript-common'

function toPersonNameDtoLastName(domain: PersonName): string | undefined {
    return domain.lastName
}

function toPersonNameDtoFirstNames(domain: PersonName): string[] | undefined {
    return domain.firstNames
}

function toPersonNameDtoStart(domain: PersonName): number | undefined {
    return domain.start
}

function toPersonNameDtoEnd(domain: PersonName): number | undefined {
    return domain.end
}

function toPersonNameDtoPrefix(domain: PersonName): string[] | undefined {
    return domain.prefix
}

function toPersonNameDtoSuffix(domain: PersonName): string[] | undefined {
    return domain.suffix
}

function toPersonNameDtoText(domain: PersonName): string | undefined {
    return domain.text
}

function toPersonNameDtoUse(domain: PersonName): PersonNameDto.UseEnum | undefined {
    return domain.use
}

function toPersonNameLastName(dto: PersonNameDto): string | undefined {
    return dto.lastName
}

function toPersonNameFirstNames(dto: PersonNameDto): string[] | undefined {
    return dto.firstNames
}

function toPersonNameStart(dto: PersonNameDto): number | undefined {
    return dto.start
}

function toPersonNameEnd(dto: PersonNameDto): number | undefined {
    return dto.end
}

function toPersonNamePrefix(dto: PersonNameDto): string[] | undefined {
    return dto.prefix
}

function toPersonNameSuffix(dto: PersonNameDto): string[] | undefined {
    return dto.suffix
}

function toPersonNameText(dto: PersonNameDto): string | undefined {
    return dto.text
}

function toPersonNameUse(dto: PersonNameDto): PersonNameUseEnum | undefined {
    return dto.use
}

export function mapPersonNameDtoToPersonName(dto: PersonNameDto): PersonName {
    return new PersonName({
        lastName: toPersonNameLastName(dto),
        firstNames: toPersonNameFirstNames(dto),
        start: toPersonNameStart(dto),
        end: toPersonNameEnd(dto),
        prefix: toPersonNamePrefix(dto),
        suffix: toPersonNameSuffix(dto),
        text: toPersonNameText(dto),
        use: toPersonNameUse(dto),
    })
}

export function mapPersonNameToPersonNameDto(domain: PersonName): PersonNameDto {
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
