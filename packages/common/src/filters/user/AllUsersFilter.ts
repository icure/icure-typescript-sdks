import { Filter } from '../Filter'
import {User} from "@icure/api";

export interface AllUsersFilter extends Filter<User> {
  description?: string
  $type: 'AllUsersFilter'
}
