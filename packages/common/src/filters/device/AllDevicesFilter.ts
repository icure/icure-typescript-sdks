import { Filter } from '../Filter'
import { Device } from '@icure/api'

export interface AllDevicesFilter extends Filter<Device> {
    description?: string
    $type: 'AllDevicesFilter'
}
