import {Filter} from "../Filter";
import {Code} from "@icure/api";

export interface CodeByIdsFilter extends Filter<Code> {
    description?: string
    ids: string[]
  '$type': 'CodeByIdsFilter'
}
