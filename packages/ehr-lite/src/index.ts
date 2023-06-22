import 'reflect-metadata'

import {initializeMapper, mapper} from './mappers/mapper'
import {initializeMapper as commonInitializeMapper} from '@icure/typescript-common'

initializeMapper(mapper)
commonInitializeMapper(mapper)
