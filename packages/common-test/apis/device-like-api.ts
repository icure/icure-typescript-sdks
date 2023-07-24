import {
  AnonymousApiBuilder,
  CommonAnonymousApi,
  CommonApi,
  CryptoStrategies,
  DataOwnerWithType, forceUuid
} from "@icure/typescript-common";
import {BaseApiTestContext, WithDataOwnerApi, WithDeviceApi, WithHcpApi, WithPatientApi} from "./TestContexts";
import {getEnvironmentInitializer, hcp1Username, setLocalStorage} from "../test-utils";
import {getEnvVariables, TestVars} from "@icure/test-setup/types";
import {Device} from "@icure/api";
import 'isomorphic-fetch'

setLocalStorage(fetch)

export function testDeviceLikeApi<
  DSAnonymousApiBuilder extends AnonymousApiBuilder<DSCryptoStrategies, DSAnonymousApi>,
  DSAnonymousApi extends CommonAnonymousApi<DSApi>,
  DSApi extends CommonApi,
  DSCryptoStrategies extends CryptoStrategies<any>,
  DSUser,
  DSDevice
>(
  ctx: BaseApiTestContext<
    DSAnonymousApiBuilder,
    DSAnonymousApi,
    DSApi,
    DSCryptoStrategies,
    DSUser,
    any
  > & WithDeviceApi<DSApi, DSDevice>
) {
  describe('Hcp-like API', () => {
    let env: TestVars

    beforeAll(async () => {
      const initializer = await getEnvironmentInitializer()
      env = await initializer.execute(getEnvVariables())
    }, 600_000)

    it('Can create a medical device', async () => {
      const apiAndUser = await ctx.apiForEnvUser(env, hcp1Username)
      const api = apiAndUser.api
      const createdMedicalDevice = await ctx.deviceApi(api).createOrModify(
        ctx.toDSDevice(new Device({
          serialNumber: '123456789',
          name: 'What-If Machine',
          brand: 'Farnsworth',
          model: '2ACV16',
        }))
      )
      const createdMedicalDeviceDto = ctx.toDeviceDto(createdMedicalDevice)
      expect(createdMedicalDeviceDto.id).toBeTruthy()
      expect(forceUuid(createdMedicalDeviceDto.id)).toEqual(createdMedicalDeviceDto.id)
      expect(createdMedicalDeviceDto.serialNumber).toEqual('123456789')
      expect(createdMedicalDeviceDto.name).toEqual('What-If Machine')
      expect(createdMedicalDeviceDto.brand).toEqual('Farnsworth')
      expect(createdMedicalDeviceDto.model).toEqual('2ACV16')
      expect(createdMedicalDeviceDto.created).toBeTruthy()
      expect(createdMedicalDeviceDto.modified).toBeTruthy()
    })

    it('Can create a medical device and update it', async () => {
      const apiAndUser = await ctx.apiForEnvUser(env, hcp1Username)
      const api = apiAndUser.api
      const createdMedicalDevice = await ctx.deviceApi(api).createOrModify(
        ctx.toDSDevice(new Device({
          serialNumber: '123456789',
          name: 'What-If Machine',
          brand: 'Farnsworth',
          model: '2ACV16',
        }))
      )
      const createdMedicalDeviceDto = ctx.toDeviceDto(createdMedicalDevice)
      const newSerialNumber = forceUuid()
      const updatedMedicalDevice = await ctx.deviceApi(api).createOrModify(
        ctx.toDSDevice(new Device({
          ...ctx.toDeviceDto(createdMedicalDevice),
          serialNumber: newSerialNumber,
          modified: undefined,
          model: '2ACV16',
        }))
      )
      const updatedMedicalDeviceDto = ctx.toDeviceDto(updatedMedicalDevice)
      expect(updatedMedicalDeviceDto.id).toBeTruthy()
      expect(forceUuid(updatedMedicalDeviceDto.id)).toEqual(updatedMedicalDeviceDto.id)
      expect(updatedMedicalDeviceDto.serialNumber).toEqual(newSerialNumber)
      expect(updatedMedicalDeviceDto.rev.startsWith('2-')).toBe(true)
      expect(updatedMedicalDeviceDto.name).toEqual('What-If Machine')
      expect(updatedMedicalDeviceDto.brand).toEqual('Farnsworth')
      expect(updatedMedicalDeviceDto.model).toEqual('2ACV16')
      expect(updatedMedicalDeviceDto.created).toEqual(createdMedicalDeviceDto.created)
      expect(updatedMedicalDeviceDto.modified).toBeGreaterThan(createdMedicalDeviceDto.modified)
    })
  })
}
