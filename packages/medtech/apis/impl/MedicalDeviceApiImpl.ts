import {MedicalDevice} from '../../models/MedicalDevice';
import {Filter} from "../../models/Filter";
import {PaginatedListMedicalDevice} from "../../models/PaginatedListMedicalDevice";
import {MedicalDeviceApi} from "../MedicalDeviceApi";
import {
  IccAuthApi,
  IccCodeApi,
  IccContactXApi,
  IccCryptoXApi,
  IccDocumentXApi,
  IccHcpartyXApi,
  IccHelementXApi,
  IccPatientXApi,
  IccUserXApi
} from "@icure/api";
import {IccDeviceApi} from "@icure/api/icc-api/api/IccDeviceApi";
import {forceUuid} from "../../mappers/utils";

class MedicalDeviceApiImpl implements MedicalDeviceApi {
    createOrModifyMedicalDevice(medicalDevice: MedicalDevice): Promise<MedicalDevice> {
        return Promise.resolve(undefined);
    }

    createOrModifyMedicalDevices(medicalDevice: Array<MedicalDevice>): Promise<Array<MedicalDevice>> {
        return Promise.resolve(undefined);
    }

  deleteMedicalDevice(medicalDeviceId: string): Promise<string> {
    return Promise.resolve("");
  }

  deleteMedicalDevices(requestBody: Array<string>): Promise<Array<string>> {
    return Promise.resolve(undefined);
  }

  filterMedicalDevices(filter: Filter, nextDeviceId?: string, limit?: number): Promise<PaginatedListMedicalDevice> {
    return Promise.resolve(undefined);
  }

  getMedicalDevice(medicalDeviceId: string): Promise<MedicalDevice> {
    return Promise.resolve(undefined);
  }

  matchMedicalDevices(filter: Filter): Promise<Array<string>> {
    return Promise.resolve(undefined);
  }
}
