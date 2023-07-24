import { MedicalDeviceApiAware, MedTechBaseTestContext } from './TestContexts'
import { testDeviceLikeApi } from '../../../common-test/apis/device-like-api'

const MedicalDeviceApiTestContext = MedicalDeviceApiAware(MedTechBaseTestContext)

testDeviceLikeApi(new MedicalDeviceApiTestContext())
