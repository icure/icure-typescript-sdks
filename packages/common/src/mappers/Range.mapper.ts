import { Range } from '../models/Range.model'
import { Range as RangeDto } from '@icure/api'

function toRangeDtoLow(domain: Range): number | undefined {
    return domain.low
}

function toRangeDtoHigh(domain: Range): number | undefined {
    return domain.high
}

function toRangeLow(dto: RangeDto): number | undefined {
    return dto.low
}

function toRangeHigh(dto: RangeDto): number | undefined {
    return dto.high
}

export function mapRangeDtoToRange(dto: RangeDto): Range {
    return new Range({
    low: toRangeLow(dto),
    high: toRangeHigh(dto),
    })
}

export function mapRangeToRangeDto(domain: Range): RangeDto {
    return new RangeDto({
    low: toRangeDtoLow(domain),
    high: toRangeDtoHigh(domain),
    })
}
