import {Filter} from "../filter/Filter";
import {
  AbstractFilter,
  AbstractFilterCode,
  AbstractFilterDevice,
  AbstractFilterHealthcareParty,
  AbstractFilterHealthElement,
  AbstractFilterMaintenanceTask,
  AbstractFilterPatient,
  AbstractFilterService,
  AbstractFilterUser,
  AllCodesFilter as AllCodesFilterDto,
  AllDevicesFilter as AllDevicesFilterDto,
  AllHealthcarePartiesFilter as AllHealthcarePartiesFilterDto,
  AllUsersFilter as AllUsersFilterDto,
  Code as Code,
  CodeByIdsFilter as CodeByIdsFilterDto,
  CodeByRegionTypeLabelLanguageFilter as CodeByRegionTypeLabelLanguageFilterDto,
  ComplementFilter as ComplementFilterDto, Device,
  Device as DeviceDto,
  DeviceByIdsFilter as DeviceByIdsFilterDto, HealthcareParty,
  HealthcarePartyByIdsFilter as HealthcarePartyByIdsFilterDto,
  HealthcarePartyByNameFilter as HealthcarePartyByNameFilterDto,
  HealthcarePartyByTagCodeFilter as HealthcarePartyByTagCodeFilterDto,
  HealthElement as HealthElement,
  HealthElementByHcPartyFilter as HealthElementByHcPartyFilterDto,
  HealthElementByHcPartyIdentifiersFilter as HealthElementByHcPartyIdentifiersFilterDto,
  HealthElementByHcPartySecretForeignKeysFilter as HealthElementByHcPartySecretForeignKeysFilterDto,
  HealthElementByHcPartyTagCodeFilter as HealthElementByHcPartyTagCodeFilterDto,
  HealthElementByIdsFilter as HealthElementByIdsFilterDto,
  IntersectionFilter as IntersectionFilterDto,
  MaintenanceTask as MaintenanceTask,
  Patient,
  PatientByHcPartyAndIdentifiersFilter as PatientByHcPartyAndIdentifiersFilterDto,
  PatientByHcPartyAndSsinsFilter as PatientByHcPartyAndSsinsFilterDto,
  PatientByHcPartyDateOfBirthBetweenFilter as PatientByHcPartyDateOfBirthBetweenFilterDto,
  PatientByHcPartyFilter as PatientByHcPartyFilterDto,
  PatientByHcPartyGenderEducationProfession as PatientByHcPartyGenderEducationProfessionDto,
  PatientByHcPartyNameContainsFuzzyFilter as PatientByHcPartyNameContainsFuzzyFilterDto,
  PatientByIdsFilter as PatientByIdsFilterDto, Service,
  ServiceByHcPartyFilter as ServiceByHcPartyFilterDto,
  ServiceByHcPartyHealthElementIdsFilter as ServiceByHcPartyHealthElementIdsFilterDto,
  ServiceByHcPartyIdentifiersFilter as ServiceByHcPartyIdentifiersFilterDto,
  ServiceByHcPartyTagCodeDateFilter as ServiceByHcPartyTagCodeDateFilterDto,
  ServiceByIdsFilter as ServiceByIdsFilterDto,
  ServiceBySecretForeignKeys as ServiceBySecretForeignKeysDto,
  UnionFilter as UnionFilterDto,
  User,
  UserByIdsFilter as UserByIdsFilterDto,
} from "@icure/api";
import {
  MaintenanceTaskByIdsFilter as MaintenanceTaskByIdsFilterDto
} from "@icure/api/icc-x-api/filters/MaintenanceTaskByIdsFilter";
import {
  MaintenanceTaskByHcPartyAndTypeFilter as MaintenanceTaskByHcPartyAndTypeFilterDto
} from "@icure/api/icc-x-api/filters/MaintenanceTaskByHcPartyAndTypeFilter";
import {
  MaintenanceTaskAfterDateFilter as MaintenanceTaskAfterDateFilterDto
} from "@icure/api/icc-x-api/filters/MaintenanceTaskAfterDateFilter";
import {UsersByPatientIdFilter as UsersByPatientIdFilterDto} from "@icure/api/icc-x-api/filters/UsersByPatientIdFilter"
import {Coding} from "../models/Coding";
import {ComplementFilter} from "../filter/ComplementFilter";
import {UnionFilter} from "../filter/UnionFilter";
import {IntersectionFilter} from "../filter/IntersectionFilter";
import {AllCodingsFilter} from "../filter/coding/AllCodingsFilter";
import {CodingByIdsFilter} from "../filter/coding/CodingByIdsFilter";
import {CodingByRegionTypeLabelFilter} from "../filter/coding/CodingByRegionTypeLabelFilter";
import {DeviceByIdsFilter} from "../filter/device/DeviceByIdsFilter";
import {AllDevicesFilter} from "../filter/device/AllDevicesFilter";
import {
  HealthElementByHealthcarePartyFilter
} from "../filter/healthelement/HealthElementByHealthcarePartyFilter";
import {
  HealthElementByHealthcarePartyIdentifiersFilter
} from "../filter/healthelement/HealthElementByHealthcarePartyIdentifiersFilter";
import {
  HealthElementByHealthcarePartyPatientFilter
} from "../filter/healthelement/HealthElementByHealthcarePartyPatientFilter";
import {
  HealthElementByHealthcarePartyLabelCodeFilter
} from "../filter/healthelement/HealthElementByHealthcarePartyLabelCodeFilter";
import {HealthElementByIdsFilter} from "../filter/healthelement/HealthElementByIdsFilter";
import {AllHealthcarePartysFilter} from "../filter/hcp/AllHealthcarePartysFilter";
import {HealthcarePartyByIdsFilter} from "../filter/hcp/HealthcarePartyByIdsFilter";
import {HealthcarePartyByNameFilter} from "../filter/hcp/HealthcarePartyByNameFilter";
import {UserByIdsFilter} from "../filter/user/UserByIdsFilter";
import {AllUsersFilter} from "../filter/user/AllUsersFilter";
import {PatientByHealthcarePartyFilter} from "../filter/patient/PatientByHealthcarePartyFilter";
import {PatientByHealthcarePartyIdentifiersFilter} from "../filter/patient/PatientByHealthcarePartyIdentifiersFilter";
import {PatientByHealthcarePartySsinsFilter} from "../filter/patient/PatientByHealthcarePartySsinsFilter";
import {
  PatientByHealthcarePartyDateOfBirthBetweenFilter
} from "../filter/patient/PatientByHealthcarePartyDateOfBirthBetweenFilter";
import {
  PatientByHealthcarePartyNameContainsFuzzyFilter
} from "../filter/patient/PatientByHealthcarePartyNameContainsFuzzyFilter";
import {
  PatientByHealthcarePartyGenderEducationProfessionFilter
} from "../filter/patient/PatientByHealthcarePartyGenderEducationProfessionFilter";
import {PatientByIdsFilter} from "../filter/patient/PatientByIdsFilter";
import {UsersByPatientIdFilter} from "../filter/user/UsersByPatientIdFilter";
import {NotificationsByIdFilter} from "../filter/notification/NotificationsByIdFilter";
import {NotificationsByHcPartyAndTypeFilter} from "../filter/notification/NotificationsByHcPartyAndTypeFilter";
import {NotificationsAfterDateFilter} from "../filter/notification/NotificationsAfterDateFilter";
import {HealthcarePartyByLabelCodeFilter} from "../filter/hcp/HealthcarePartyByLabelCodeFilter";
import {ServiceByHealthcarePartyFilter} from "../filter/service/ServiceByHealthcarePartyFilter";
import {ServiceByHealthcarePartyIdentifiersFilter} from "../filter/service/ServiceByHealthcarePartyIdentifiersFilter";
import {
  ServiceByHealthcarePartyHealthElementIdsFilter
} from "../filter/service/ServiceByHealthcarePartyHealthElementIdsFilter";
import {ServiceByHealthcarePartyTagCodeDateFilter} from "../filter/service/ServiceByHealthcarePartyTagCodeDateFilter";
import {ServiceByIdsFilter} from "../filter/service/ServiceByIdsFilter";
import {ServiceByHealthcarePartyPatientFilter} from "../filter/service/ServiceByHealthcarePartyPatientFilter";


export namespace FilterMapper {
  export function toAbstractFilterDto<Service>(filter: Filter<Service>, input: "Service"): AbstractFilterService
  export function toAbstractFilterDto<Coding>(filter: Filter<Coding>, input: "Coding"): AbstractFilterCode
  export function toAbstractFilterDto<Device>(filter: Filter<Device>, input: "Device"): AbstractFilterDevice
  export function toAbstractFilterDto<HealthcareParty>(filter: Filter<HealthcareParty>, input: "HealthcareParty"): AbstractFilterHealthcareParty
  export function toAbstractFilterDto<HealthElement>(filter: Filter<HealthElement>, input: "HealthElement"): AbstractFilterHealthElement
  export function toAbstractFilterDto<Patient>(filter: Filter<Patient>, input: "Patient"): AbstractFilterPatient
  export function toAbstractFilterDto<User>(filter: Filter<User>, input: "User"): AbstractFilterUser
  export function toAbstractFilterDto<Notification>(filter: Filter<Notification>, input: "Notification"): AbstractFilterMaintenanceTask
  export function toAbstractFilterDto<T>(filter: Filter<T>, input: "Service" | "Coding" | "Device" | "HealthcareParty" | "HealthElement" | "Patient" | "User" | "Notification"):
    AbstractFilter<Service | Code | DeviceDto | HealthcareParty | HealthElement | Patient | User | MaintenanceTask> {
    const res = input === "Service" ? toAbstractFilterService(filter) :
      input === "Coding" ? toAbstractFilterCodeDto(filter) :
        input === "Device" ? toAbstractFilterDeviceDto(filter) :
          input === "HealthcareParty" ? toAbstractFilterHealthcarePartyDto(filter) :
            input === "HealthElement" ? toAbstractFilterHealthElementDto(filter) :
              input === "Patient" ? toAbstractFilterPatientDto(filter) :
                input === "User" ? toAbstractFilterUserDto(filter) :
                  input === "Notification" ? toAbstractFilterMaintenanceTaskDto(filter) :
                    null;
    if (!res) {
      throw Error("Filter is not recognized");
    }
    return res
  }

  function toAbstractFilterCodeDto(filter: Filter<Coding>): AbstractFilter<Code> {
    if (filter['$type'] === 'ComplementFilter') {
      return toComplementFilterCodeDto(filter as ComplementFilter<Coding>);
    }
    if (filter['$type'] === 'UnionFilter') {
      return toUnionFilterCodeDto(filter as UnionFilter<Coding>);
    }
    if (filter['$type'] === 'IntersectionFilter') {
      return toIntersectionFilterCodeDto(filter as IntersectionFilter<Coding>);
    }
    if (filter['$type'] === 'AllCodingsFilter') {
      return toAllCodesFilterDto();
    }
    if (filter['$type'] === 'CodingByIdsFilter') {
      return toCodeByIdsFilterDto(filter as CodingByIdsFilter);
    }
    if (filter['$type'] === 'CodingByRegionTypeLabelFilter') {
      return toCodeByRegionTypeLabelLanguageFilterDto(filter as CodingByRegionTypeLabelFilter);
    }
    throw Error(`No mapper for ${filter['$type']}`);
  }

  const toAllCodesFilterDto = () => new AllCodesFilterDto({});

  const toComplementFilterCodeDto = (filter: ComplementFilter<Coding>) =>
    new ComplementFilterDto<Code>(toAbstractFilterCodeDto(filter.superSet), toAbstractFilterCodeDto(filter.subSet));

  const toUnionFilterCodeDto = (filter: UnionFilter<Coding>) =>
    new UnionFilterDto<Code>(filter.filters.map((it) => toAbstractFilterCodeDto(it)));

  const toIntersectionFilterCodeDto = (filter: IntersectionFilter<Coding>) =>
    new IntersectionFilterDto<Code>(filter.filters.map((it) => toAbstractFilterCodeDto(it)));


  const toCodeByIdsFilterDto = (filter: CodingByIdsFilter) => new CodeByIdsFilterDto({
    desc: filter.description,
    ids: filter.ids
  });

  const toCodeByRegionTypeLabelLanguageFilterDto = (filter: CodingByRegionTypeLabelFilter) =>
    new CodeByRegionTypeLabelLanguageFilterDto({
      desc: filter.description,
      region: filter.region,
      type: filter.type,
      language: filter.language,
      label: filter.label
    })


  function toAbstractFilterService(filter: Filter<Service>): AbstractFilter<Service> {
    if (filter['$type'] === 'ComplementFilter') {
      return toComplementFilterService(filter as ComplementFilter<Service>);
    }
    if (filter['$type'] === 'UnionFilter') {
      return toUnionFilterService(filter as UnionFilter<Service>);
    }
    if (filter['$type'] === 'IntersectionFilter') {
      return toIntersectionFilterService(filter as IntersectionFilter<Service>);
    }
    if (filter['$type'] === 'ServiceByHealthcarePartyFilter') {
      return toServiceByHcPartyFilterDto(filter as ServiceByHealthcarePartyFilter);
    }
    if (filter['$type'] === 'ServiceByHealthcarePartyIdentifiersFilter') {
      return toServiceByHcPartyIdentifiersFilterDto(filter as ServiceByHealthcarePartyIdentifiersFilter);
    }
    if (filter['$type'] === 'ServiceByHealthcarePartyHealthElementIdsFilter') {
      return toServiceByHcPartyHealthElementIdsFilterDto(filter as ServiceByHealthcarePartyHealthElementIdsFilter);
    }
    if (filter['$type'] === 'ServiceByHealthcarePartyTagCodeDateFilter') {
      return toServiceByHcPartyTagCodeDateFilterDto(filter as ServiceByHealthcarePartyTagCodeDateFilter);
    }
    if (filter['$type'] === 'ServiceByIdsFilter') {
      return toServiceByIdsFilterDto(filter as ServiceByIdsFilter);
    }
    if (filter['$type'] === 'ServiceByHealthcarePartyPatientFilter') {
      return toServiceBySecretForeignKeysDto(filter as ServiceByHealthcarePartyPatientFilter);
    }
    throw Error(`No mapper for ${filter['$type']}`);
  }

  const toComplementFilterService = (filter: ComplementFilter<Service>) =>
    new ComplementFilterDto<Service>(toAbstractFilterService(filter.superSet), toAbstractFilterService(filter.subSet));

  const toUnionFilterService = (filter: UnionFilter<Service>) =>
    new UnionFilterDto<Service>(filter.filters.map((it) => toAbstractFilterService(it)));

  const toIntersectionFilterService = (filter: IntersectionFilter<Service>) =>
    new IntersectionFilterDto<Service>(filter.filters.map((it) => toAbstractFilterService(it)));


  const toServiceByIdsFilterDto = (filter: ServiceByIdsFilter) =>
    new ServiceByIdsFilterDto({
      desc: filter.description,
      ids: filter.ids
    })

  const toServiceByHcPartyHealthElementIdsFilterDto = (filter: ServiceByHealthcarePartyHealthElementIdsFilter) =>
    new ServiceByHcPartyHealthElementIdsFilterDto({
      desc: filter.description,
      healthcarePartyId: filter.healthcarePartyId,
      healthElementIds: filter.healthcareElementIds
    })

  const toServiceByHcPartyIdentifiersFilterDto = (filter: ServiceByHealthcarePartyIdentifiersFilter) =>
    new ServiceByHcPartyIdentifiersFilterDto({
      desc: filter.description,
      healthcarePartyId: filter.healthcarePartyId,
      identifiers: filter.identifiers.map((it) => toIdentifierDto(it))
    })

  const toServiceByHcPartyTagCodeDateFilterDto = (filter: ServiceByHealthcarePartyTagCodeDateFilter) =>
    new ServiceByHcPartyTagCodeDateFilterDto({
      desc: filter.description,
      healthcarePartyId: filter.healthcarePartyId,
      patientSecretForeignKey: filter.patientSecretForeignKey,
      tagType: filter.tagType,
      tagCode: filter.tagCode,
      codeType: filter.codeType,
      codeCode: filter.codeCode,
      startValueDate: filter.startValueDate,
      endValueDate: filter.endValueDate
    })


  const toServiceByHcPartyFilterDto = (filter: ServiceByHealthcarePartyFilter) => new ServiceByHcPartyFilterDto({
    desc: filter.description,
    hcpId: filter.hcpId
  })

  const toServiceBySecretForeignKeysDto = (filter: ServiceByHealthcarePartyPatientFilter) => new ServiceBySecretForeignKeysDto({
    desc: filter.description,
    healthcarePartyId: filter.healthcarePartyId,
    patientSecretForeignKeys: filter.patientSecretForeignKeys
  });

  function toAbstractFilterDeviceDto(filter: Filter<Device>): AbstractFilter<DeviceDto> {
    if (filter['$type'] === 'ComplementFilter') {
      return toComplementFilterDeviceDto(filter as ComplementFilter<Device>);
    }
    if (filter['$type'] === 'UnionFilter') {
      return toUnionFilterDeviceDto(filter as UnionFilter<Device>);
    }
    if (filter['$type'] === 'IntersectionFilter') {
      return toIntersectionFilterDeviceDto(filter as IntersectionFilter<Device>);
    }
    if (filter['$type'] === 'AllDevicesFilter') {
      return toAllDevicesFilterDto(filter as AllDevicesFilter);
    }
    if (filter['$type'] === 'DeviceByIdsFilter') {
      return toDeviceByIdsFilterDto(filter as DeviceByIdsFilter);
    }
    throw Error(`No mapper for ${filter['$type']}`);
  }

  const toComplementFilterDeviceDto = (filter: ComplementFilter<Device>) =>
    new ComplementFilterDto<DeviceDto>(toAbstractFilterDeviceDto(filter.superSet), toAbstractFilterDeviceDto(filter.subSet));

  const toUnionFilterDeviceDto = (filter: UnionFilter<Device>) =>
    new UnionFilterDto<DeviceDto>(filter.filters.map((it) => toAbstractFilterDeviceDto(it)))

  const toIntersectionFilterDeviceDto = (filter: IntersectionFilter<Device>) =>
    new IntersectionFilterDto<DeviceDto>(filter.filters.map((it) => toAbstractFilterDeviceDto(it)))

  const toAllDevicesFilterDto = (filter: AllDevicesFilter) => new AllDevicesFilterDto({})

  const toDeviceByIdsFilterDto = (filter: DeviceByIdsFilter) =>
    new DeviceByIdsFilterDto({desc: filter.description, ids: filter.ids})

  function toAbstractFilterHealthcarePartyDto(filter: Filter<HealthcareParty>): AbstractFilter<HealthcareParty> {
    if (filter['$type'] === 'ComplementFilter') {
      return toComplementFilterHealthcarePartyDto(filter as ComplementFilter<HealthcareParty>);
    }
    if (filter['$type'] === 'UnionFilter') {
      return toUnionFilterHealthcarePartyDto(filter as UnionFilter<HealthcareParty>);
    }
    if (filter['$type'] === 'IntersectionFilter') {
      return toIntersectionFilterHealthcarePartyDto(filter as IntersectionFilter<HealthcareParty>);
    }
    if (filter['$type'] === 'AllHealthcarePartysFilter') {
      return toAllHealthcarePartiesFilterDto(filter as AllHealthcarePartysFilter);
    }
    if (filter['$type'] === 'HealthcarePartyByIdsFilter') {
      return toHealthcarePartyByIdsFilterDto(filter as HealthcarePartyByIdsFilter);
    }
    if (filter['$type'] === 'HealthcarePartyByNameFilter') {
      return toHealthcarePartyByNameFilterDto(filter as HealthcarePartyByNameFilter);
    }
    if (filter['$type'] === 'HealthcarePartyByLabelCodeFilter') {
      return toHealthcarePartyByTagCodeFilterDto(filter as HealthcarePartyByLabelCodeFilter);
    }
    throw Error(`No mapper for ${filter['$type']}`);
  }

  const toComplementFilterHealthcarePartyDto = (filter: ComplementFilter<HealthcareParty>) =>
    new ComplementFilterDto<HealthcareParty>(toAbstractFilterHealthcarePartyDto(filter.superSet), toAbstractFilterHealthcarePartyDto(filter.subSet));

  const toUnionFilterHealthcarePartyDto = (filter: UnionFilter<HealthcareParty>) =>
    new UnionFilterDto<HealthcareParty>(filter.filters.map((it) => toAbstractFilterHealthcarePartyDto(it)))

  const toIntersectionFilterHealthcarePartyDto = (filter: IntersectionFilter<HealthcareParty>) =>
    new IntersectionFilterDto<HealthcareParty>(filter.filters.map((it) => toAbstractFilterHealthcarePartyDto(it)));

  const toAllHealthcarePartiesFilterDto = (filter: AllHealthcarePartysFilter) => new AllHealthcarePartiesFilterDto({})

  const toHealthcarePartyByIdsFilterDto = (filter: HealthcarePartyByIdsFilter) =>
    new HealthcarePartyByIdsFilterDto({desc: filter.description, ids: filter.ids})

  const toHealthcarePartyByNameFilterDto = (filter: HealthcarePartyByNameFilter) =>
    new HealthcarePartyByNameFilterDto({desc: filter.description, name: filter.name, descending: filter.descending})

  const toHealthcarePartyByTagCodeFilterDto = (filter: HealthcarePartyByLabelCodeFilter) =>
    new HealthcarePartyByTagCodeFilterDto({desc: filter.description, tagType: filter.labelType, tagCode: filter.labelCode, codeType: filter.codeType, codeCode: filter.codeCode})

  function toAbstractFilterHealthElementDto(filter: Filter<HealthElement>): AbstractFilter<HealthElement> {
    if (filter['$type'] === 'ComplementFilter') {
      return toComplementFilterHealthElementDto(filter as ComplementFilter<HealthElement>);
    }
    if (filter['$type'] === 'UnionFilter') {
      return toUnionFilterHealthElementDto(filter as UnionFilter<HealthElement>);
    }
    if (filter['$type'] === 'IntersectionFilter') {
      return toIntersectionFilterHealthElementDto(filter as IntersectionFilter<HealthElement>);
    }
    if (filter['$type'] === 'HealthElementByHealthcarePartyFilter') {
      return toHealthElementByHcPartyFilterDto(filter as HealthElementByHealthcarePartyFilter);
    }
    if (filter['$type'] === 'HealthElementByHealthcarePartyIdentifiersFilter') {
      return toHealthElementByHcPartyIdentifiersFilterDto(filter as HealthElementByHealthcarePartyIdentifiersFilter);
    }
    if (filter['$type'] === 'HealthElementByHealthcarePartyPatientFilter') {
      return toHealthElementByHcPartySecretForeignKeysFilterDto(filter as HealthElementByHealthcarePartyPatientFilter);
    }
    if (filter['$type'] === 'HealthElementByHealthcarePartyLabelCodeFilter') {
      return toHealthElementByHcPartyTagCodeFilterDto(filter as HealthElementByHealthcarePartyLabelCodeFilter);
    }
    if (filter['$type'] === 'HealthElementByIdsFilter') {
      return toHealthElementByIdsFilterDto(filter as HealthElementByIdsFilter);
    }
    throw Error(`No mapper for ${filter['$type']}`);
  }

  const toComplementFilterHealthElementDto = (filter: ComplementFilter<HealthElement>) =>
    new ComplementFilterDto<HealthElement>(toAbstractFilterHealthElementDto(filter.superSet), toAbstractFilterHealthElementDto(filter.subSet));

  const toUnionFilterHealthElementDto = (filter: UnionFilter<HealthElement>) =>
    new UnionFilterDto<HealthElement>(filter.filters.map((it) => toAbstractFilterHealthElementDto(it)))

  const toIntersectionFilterHealthElementDto = (filter: IntersectionFilter<HealthElement>) =>
    new IntersectionFilterDto<HealthElement>(filter.filters.map((it) => toAbstractFilterHealthElementDto(it)));

  const toHealthElementByHcPartyFilterDto = (filter: HealthElementByHealthcarePartyFilter) =>
    new HealthElementByHcPartyFilterDto({desc: filter.description, hcpId: filter.healthcarePartyId});

  const toHealthElementByHcPartyIdentifiersFilterDto = (filter: HealthElementByHealthcarePartyIdentifiersFilter) =>
    new HealthElementByHcPartyIdentifiersFilterDto({
      desc: filter.description,
      healthcarePartyId: filter.healthcarePartyId,
      identifiers: filter.identifiers.map((it) => toIdentifierDto(it))
    });

  const toHealthElementByHcPartySecretForeignKeysFilterDto = (filter: HealthElementByHealthcarePartyPatientFilter) =>
    new HealthElementByHcPartySecretForeignKeysFilterDto({
      desc: filter.description,
      healthcarePartyId: filter.healthcarePartyId,
      patientSecretForeignKeys: filter.patientSecretForeignKeys
    });

  const toHealthElementByHcPartyTagCodeFilterDto = (filter: HealthElementByHealthcarePartyLabelCodeFilter) =>
    new HealthElementByHcPartyTagCodeFilterDto({
      desc: filter.description,
      healthcarePartyId: filter.healthcarePartyId,
      codeType: filter.codeType,
      codeCode: filter.codeCode,
      tagType: filter.tagType,
      tagCode: filter.tagCode,
      status: filter.status
    });

  const toHealthElementByIdsFilterDto = (filter: HealthElementByIdsFilter) =>
    new HealthElementByIdsFilterDto({desc: filter.description, ids: filter.ids});

  function toAbstractFilterUserDto(filter: Filter<User>): AbstractFilter<User> {
    if (filter['$type'] === 'ComplementFilter') {
      return toComplementFilterUserDto(filter as ComplementFilter<User>);
    }
    if (filter['$type'] === 'UnionFilter') {
      return toUnionFilterUserDto(filter as UnionFilter<User>);
    }
    if (filter['$type'] === 'IntersectionFilter') {
      return toIntersectionFilterUserDto(filter as IntersectionFilter<User>);
    }
    if (filter['$type'] === 'AllUsersFilter') {
      return toAllUsersFilterDto(filter as AllUsersFilter);
    }
    if (filter['$type'] === 'UserByIdsFilter') {
      return toUserByIdsFilterDto(filter as UserByIdsFilter);
    }
    if (filter['$type'] === 'UsersByPatientIdFilter') {
      return toUsersByPatientIdFilterDto(filter as UsersByPatientIdFilter)
    }
    throw Error(`No mapper for ${filter['$type']}`);
  }

  const toComplementFilterUserDto = (filter: ComplementFilter<User>) =>
    new ComplementFilterDto<User>(toAbstractFilterUserDto(filter.superSet), toAbstractFilterUserDto(filter.subSet));

  const toUnionFilterUserDto = (filter: UnionFilter<User>) =>
    new UnionFilterDto<User>(filter.filters.map((it) => toAbstractFilterUserDto(it)))

  const toIntersectionFilterUserDto = (filter: IntersectionFilter<User>) =>
    new IntersectionFilterDto<User>(filter.filters.map((it) => toAbstractFilterUserDto(it)));

  const toAllUsersFilterDto = (filter: AllUsersFilter) =>
    new AllUsersFilterDto({desc: filter.description})

  const toUserByIdsFilterDto = (filter: UserByIdsFilter) =>
    new UserByIdsFilterDto({desc: filter.description, ids: filter.ids})

  const toUsersByPatientIdFilterDto = (filter: UsersByPatientIdFilter) =>
    new UsersByPatientIdFilterDto({desc: filter.description, patientId: filter.patientId})


  function toAbstractFilterPatientDto(filter: Filter<Patient>): AbstractFilter<Patient> {
    if (filter['$type'] === 'ComplementFilter') {
      return toComplementFilterPatientDto(filter as ComplementFilter<Patient>);
    }
    if (filter['$type'] === 'UnionFilter') {
      return toUnionFilterPatientDto(filter as UnionFilter<Patient>);
    }
    if (filter['$type'] === 'IntersectionFilter') {
      return toIntersectionFilterPatientDto(filter as IntersectionFilter<Patient>);
    }
    if (filter['$type'] === 'PatientByHealthcarePartyFilter') {
      return toPatientByHcPartyFilterDto(filter as PatientByHealthcarePartyFilter);
    }
    if (filter['$type'] === 'PatientByHealthcarePartyIdentifiersFilter') {
      return toPatientByHcPartyAndIdentifiersFilterDto(filter as PatientByHealthcarePartyIdentifiersFilter);
    }
    if (filter['$type'] === 'PatientByHealthcarePartySsinsFilter') {
      return toPatientByHcPartyAndSsinsFilterDto(filter as PatientByHealthcarePartySsinsFilter);
    }
    if (filter['$type'] === 'PatientByHealthcarePartyDateOfBirthBetweenFilter') {
      return toPatientByHcPartyDateOfBirthBetweenFilterDto(filter as PatientByHealthcarePartyDateOfBirthBetweenFilter);
    }
    if (filter['$type'] === 'PatientByHealthcarePartyNameContainsFuzzyFilter') {
      return toPatientByHcPartyNameContainsFuzzyFilterDto(filter as PatientByHealthcarePartyNameContainsFuzzyFilter);
    }
    if (filter['$type'] === 'PatientByHealthcarePartyGenderEducationProfessionFilter') {
      return toPatientByHcPartyGenderEducationProfessionDto(filter as PatientByHealthcarePartyGenderEducationProfessionFilter);
    }
    if (filter['$type'] === 'PatientByIdsFilter') {
      return toPatientByIdsFilterDto(filter as PatientByIdsFilter);
    }
    throw Error(`No mapper for ${filter['$type']}`);
  }

  const toComplementFilterPatientDto = (filter: ComplementFilter<Patient>) =>
    new ComplementFilterDto<Patient>(toAbstractFilterPatientDto(filter.superSet), toAbstractFilterPatientDto(filter.subSet));

  const toUnionFilterPatientDto = (filter: UnionFilter<Patient>) =>
    new UnionFilterDto<Patient>(filter.filters.map((it) => toAbstractFilterPatientDto(it)))

  const toIntersectionFilterPatientDto = (filter: IntersectionFilter<Patient>) =>
    new IntersectionFilterDto<Patient>(filter.filters.map((it) => toAbstractFilterPatientDto(it)));

  const toPatientByHcPartyFilterDto = (filter: PatientByHealthcarePartyFilter) =>
    new PatientByHcPartyFilterDto({desc: filter.description, healthcarePartyId: filter.healthcarePartyId})


  const toPatientByHcPartyAndIdentifiersFilterDto = (filter: PatientByHealthcarePartyIdentifiersFilter) =>
    new PatientByHcPartyAndIdentifiersFilterDto({
      desc: filter.description,
      healthcarePartyId: filter.healthcarePartyId,
      identifiers: filter.identifiers.map((it) => toIdentifierDto(it))
    })
  ;

  const toPatientByHcPartyAndSsinsFilterDto = (filter: PatientByHealthcarePartySsinsFilter) =>
    new PatientByHcPartyAndSsinsFilterDto({
      desc: filter.description,
      healthcarePartyId: filter.healthcarePartyId,
      ssins: filter.ssins ?? []
    })
  ;

  const toPatientByHcPartyDateOfBirthBetweenFilterDto = (filter: PatientByHealthcarePartyDateOfBirthBetweenFilter) =>
    new PatientByHcPartyDateOfBirthBetweenFilterDto({
      desc: filter.description,
      healthcarePartyId: filter.healthcarePartyId,
      minDateOfBirth: filter.minDateOfBirth,
      maxDateOfBirth: filter.maxDateOfBirth})


const toPatientByIdsFilterDto = (filter: PatientByIdsFilter) =>
  new PatientByIdsFilterDto({desc: filter.description, ids: filter.ids})


const toPatientByHcPartyNameContainsFuzzyFilterDto = (filter: PatientByHealthcarePartyNameContainsFuzzyFilter) =>
  new PatientByHcPartyNameContainsFuzzyFilterDto({
    desc: filter.description,
    healthcarePartyId: filter.healthcarePartyId,
    searchString: filter.searchString
  })
;

const toPatientByHcPartyGenderEducationProfessionDto = (filter: PatientByHealthcarePartyGenderEducationProfessionFilter) =>
  new PatientByHcPartyGenderEducationProfessionDto({
    desc: filter.description,
    healthcarePartyId: filter.healthcarePartyId,
    gender: filter.gender,
    education: filter.education, profession: filter.profession,
})

  function toAbstractFilterMaintenanceTaskDto(filter: Filter<Notification>): AbstractFilter<MaintenanceTask> {
    if (filter['$type'] === 'ComplementFilter') {
      return toComplementFilterMaintenanceTaskDto(filter as ComplementFilter<Notification>);
    }
    if (filter['$type'] === 'UnionFilter') {
      return toUnionFilterMaintenanceTaskDto(filter as UnionFilter<Notification>);
    }
    if (filter['$type'] === 'IntersectionFilter') {
      return toIntersectionFilterMaintenanceTaskDto(filter as IntersectionFilter<Notification>);
    }
    if (filter['$type'] === 'NotificationsByIdFilter') {
      return toMaintenanceTaskByIdsFilterDto(filter as NotificationsByIdFilter);
    }
    if (filter['$type'] === 'NotificationsByHcPartyAndTypeFilter') {
      return toMaintenanceTaskByHcPartyAndTypeFilterDto(filter as NotificationsByHcPartyAndTypeFilter);
    }
    if (filter['$type'] === 'NotificationsAfterDateFilter') {
      return toMaintenanceTaskAfterDateFilterDto(filter as NotificationsAfterDateFilter);
    }
    throw Error(`No mapper for ${filter['$type']}`);
  }

  const toComplementFilterMaintenanceTaskDto = (filter: ComplementFilter<Notification>) =>
    new ComplementFilterDto<MaintenanceTask>(toAbstractFilterMaintenanceTaskDto(filter.superSet), toAbstractFilterMaintenanceTaskDto(filter.subSet));

  const toUnionFilterMaintenanceTaskDto = (filter: UnionFilter<Notification>) =>
    new UnionFilterDto<MaintenanceTask>(filter.filters.map((it) => toAbstractFilterMaintenanceTaskDto(it)))

  const toIntersectionFilterMaintenanceTaskDto = (filter: IntersectionFilter<Notification>) =>
    new IntersectionFilterDto<MaintenanceTask>(filter.filters.map((it) => toAbstractFilterMaintenanceTaskDto(it)));

  const toMaintenanceTaskByIdsFilterDto = (filter: NotificationsByIdFilter) =>
    new MaintenanceTaskByIdsFilterDto({
      desc: filter.description,
      ids: filter.ids
    });

  const toMaintenanceTaskByHcPartyAndTypeFilterDto = (filter: NotificationsByHcPartyAndTypeFilter) =>
    new MaintenanceTaskByHcPartyAndTypeFilterDto({
      desc: filter.description,
      healthcarePartyId: filter.healthcarePartyId,
      type: filter.type
    });

  const toMaintenanceTaskAfterDateFilterDto = (filter: NotificationsAfterDateFilter) =>
    new MaintenanceTaskAfterDateFilterDto({
      desc: filter.description,
      healthcarePartyId: filter.healthcarePartyId,
      date: filter.date
    });
}
