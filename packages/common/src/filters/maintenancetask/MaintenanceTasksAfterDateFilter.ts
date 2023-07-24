import { Filter } from '../Filter'
import { MaintenanceTask } from '@icure/api'

export interface MaintenanceTasksAfterDateFilter extends Filter<MaintenanceTask> {
    description?: string
    healthcarePartyId?: string
    date: number
    $type: 'MaintenanceTasksAfterDateFilter'
}
