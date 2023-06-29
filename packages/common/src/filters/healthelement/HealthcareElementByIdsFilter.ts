import {Filter} from "../Filter";
import {HealthElement} from "@icure/api";

export interface HealthElementByIdsFilter extends Filter<HealthElement> {
    description?: string
    ids: string[]
  '$type': 'HealthElementByIdsFilter'

}
