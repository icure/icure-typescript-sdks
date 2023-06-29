import {Filter} from "../Filter";
import {Device} from "@icure/api";

export interface DeviceByIdsFilter extends Filter<Device> {
    description?: string
    ids: string[]
  '$type': 'DeviceByIdsFilter'
}
