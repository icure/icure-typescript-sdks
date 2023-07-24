import { Filter } from '../Filter'
import { Code } from '@icure/api'

export interface CodeByRegionTypeLabelFilter extends Filter<Code> {
    description?: string
    label?: string
    language?: string
    region?: string
    type?: string
    $type: 'CodeByRegionTypeLabelFilter'
}
