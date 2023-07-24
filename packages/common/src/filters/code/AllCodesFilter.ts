import { Filter } from '../Filter'
import { Code } from '@icure/api'

export interface AllCodesFilter extends Filter<Code> {
    description?: string
    $type: 'AllCodesFilter'
}
