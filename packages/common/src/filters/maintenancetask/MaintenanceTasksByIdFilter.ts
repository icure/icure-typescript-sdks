import {Filter} from "../Filter";
import {MaintenanceTask} from "@icure/api";

export interface MaintenanceTasksByIdFilter extends Filter<MaintenanceTask>{
  description?: string
  ids: string[]
  '$type': 'MaintenanceTasksByIdFilter'
}
