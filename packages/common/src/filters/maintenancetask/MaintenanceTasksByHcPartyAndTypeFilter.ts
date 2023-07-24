import { Filter } from '../Filter'
import { MaintenanceTask } from '@icure/api'

export interface MaintenanceTasksByHcPartyAndTypeFilter extends Filter<MaintenanceTask> {
    description?: string
    healthcarePartyId?: string
    type?: string
    $type: 'MaintenanceTasksByHcPartyAndTypeFilter'
}
