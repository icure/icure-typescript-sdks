import {HealthcareElement} from "../../models/HealthcareElement";
import {Filter} from "../../filter/Filter";
import {PaginatedListHealthcareElement} from "../../models/PaginatedListHealthcareElement";
import {HealthcareElementApi} from "../HealthcareElementApi";
import {FilterChainPatient, IccAuthApi, IccCodeApi, IccDocumentXApi, IccPatientXApi, IccUserXApi} from "@icure/api";
import {IccHcpartyXApi} from "@icure/api/icc-x-api/icc-hcparty-x-api";
import {IccCryptoXApi} from "@icure/api/icc-x-api/icc-crypto-x-api";
import {IccContactXApi} from "@icure/api/icc-x-api/icc-contact-x-api";
import {IccHelementXApi} from "@icure/api/icc-x-api/icc-helement-x-api";
import {HealthcareElementMapper} from "../../dist/mappers/HealthcareElement";
import {forceUuid} from "../../mappers/utils";
import {PaginatedListMapper} from "../../mappers/paginatedList";
import {FilterMapper} from "../../mappers/filter";
import toHealthcareElement = HealthcareElementMapper.toHealthcareElement;
import toHealthElementDto = HealthcareElementMapper.toHealthElementDto;
import toAbstractFilterDto = FilterMapper.toAbstractFilterDto;
import toPaginatedListHealthcareElement = PaginatedListMapper.toPaginatedListHealthcareElement;

class HealthcareElementApiImpl implements HealthcareElementApi {
  userApi: IccUserXApi;
  heApi: IccHelementXApi;

  constructor(api: { cryptoApi: IccCryptoXApi; codeApi: IccCodeApi, authApi: IccAuthApi; userApi: IccUserXApi; patientApi: IccPatientXApi; healthcarePartyApi: IccHcpartyXApi; contactApi: IccContactXApi; healthcareElementApi: IccHelementXApi; documentApi: IccDocumentXApi; }) {
    this.userApi = api.userApi;
    this.heApi = api.healthcareElementApi;
  }

  async createOrModifyHealthcareElement(healthcareElement: HealthcareElement): Promise<HealthcareElement> {
    let createdOrUpdateHealthElement = healthcareElement.rev
      ? await this.heApi.modifyHealthElement(toHealthElementDto(healthcareElement))
      : await this.heApi.createHealthElement(toHealthElementDto(healthcareElement))

    if (createdOrUpdateHealthElement) {
      return toHealthcareElement(createdOrUpdateHealthElement)!;
    }

    throw Error(`Could not create / modify healthElement ${healthcareElement.id}`)
  }

  async createOrModifyHealthcareElements(healthcareElement: Array<HealthcareElement>): Promise<Array<HealthcareElement>> {
    const heToCreate = healthcareElement.filter(he => he.rev == null)
    const heToUpdate = healthcareElement.filter(he => he != null)

    if (!heToUpdate.every(he => he.id != null && forceUuid(he.id))) {
      throw Error("Update id should be provided as an UUID");
    }

    const hesCreated = await this.heApi.createHealthElements(heToCreate.map(he => toHealthElementDto(he)))
    const hesUpdated = await this.heApi.modifyHealthElements(heToUpdate.map(he => toHealthElementDto(he)))

    return [...hesCreated, ...hesUpdated].map(he => toHealthcareElement(he))
  }

  async deleteHealthcareElement(id: string): Promise<string> {
    const deletedHeRev = (await this.heApi.deleteHealthElements(id)).find(e => true)?.rev
    if (deletedHeRev) {
      return deletedHeRev
    }
    throw Error(`Could not delete healthcare element ${id}`)
  }

  async filterHealthcareElement(filter: Filter<HealthcareElement>, nextHealthElementId?: string, limit?: number): Promise<PaginatedListHealthcareElement> {
    return toPaginatedListHealthcareElement(await this.heApi.filterHealthElementsBy(nextHealthElementId, limit, new FilterChainPatient({
      filter: toAbstractFilterDto<HealthcareElement>(filter, 'HealthcareElement')
    })))!
  }

  async getHealthcareElement(id: string): Promise<HealthcareElement> {
    return toHealthcareElement(await this.heApi.getHealthElement(id))
  }

  async matchHealthcareElement(filter: Filter<HealthcareElement>): Promise<Array<string>> {
    return await this.heApi.matchHealthElementsBy(toAbstractFilterDto<HealthcareElement>(filter, 'HealthcareElement'));
  }
}
