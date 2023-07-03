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
    Code as CodeDto,
    CodeByIdsFilter as CodeByIdsFilterDto,
    CodeByRegionTypeLabelLanguageFilter as CodeByRegionTypeLabelLanguageFilterDto,
    ComplementFilter as ComplementFilterDto,
    Device as DeviceDto,
    DeviceByIdsFilter as DeviceByIdsFilterDto,
    HealthcareParty as HealthcarePartyDto,
    HealthcarePartyByIdsFilter as HealthcarePartyByIdsFilterDto,
    HealthcarePartyByNameFilter as HealthcarePartyByNameFilterDto,
    HealthcarePartyByTagCodeFilter as HealthcarePartyByTagCodeFilterDto,
    HealthElement as HealthElementDto,
    HealthElementByHcPartyFilter as HealthElementByHcPartyFilterDto,
    HealthElementByHcPartyIdentifiersFilter as HealthElementByHcPartyIdentifiersFilterDto,
    HealthElementByHcPartySecretForeignKeysFilter as HealthElementByHcPartySecretForeignKeysFilterDto,
    HealthElementByHcPartyTagCodeFilter as HealthElementByHcPartyTagCodeFilterDto,
    HealthElementByIdsFilter as HealthElementByIdsFilterDto,
    IntersectionFilter as IntersectionFilterDto,
    MaintenanceTask as MaintenanceTaskDto,
    Patient as PatientDto,
    PatientByHcPartyAndIdentifiersFilter as PatientByHcPartyAndIdentifiersFilterDto,
    PatientByHcPartyAndSsinsFilter as PatientByHcPartyAndSsinsFilterDto,
    PatientByHcPartyDateOfBirthBetweenFilter as PatientByHcPartyDateOfBirthBetweenFilterDto,
    PatientByHcPartyFilter as PatientByHcPartyFilterDto,
    PatientByHcPartyGenderEducationProfession as PatientByHcPartyGenderEducationProfessionDto,
    PatientByHcPartyNameContainsFuzzyFilter as PatientByHcPartyNameContainsFuzzyFilterDto,
    PatientByIdsFilter as PatientByIdsFilterDto,
    Service as ServiceDto,
    ServiceByHcPartyFilter as ServiceByHcPartyFilterDto,
    ServiceByHcPartyHealthElementIdsFilter,
    ServiceByHcPartyIdentifiersFilter as ServiceByHcPartyIdentifiersFilterDto,
    ServiceByHcPartyTagCodeDateFilter as ServiceByHcPartyTagCodeDateFilterDto,
    ServiceByIdsFilter,
    ServiceBySecretForeignKeys as ServiceBySecretForeignKeysDto,
    UnionFilter as UnionFilterDto,
    User as UserDto,
    UserByIdsFilter as UserByIdsFilterDto,
} from '@icure/api'
import { MaintenanceTaskByIdsFilter as MaintenanceTaskByIdsFilterDto } from '@icure/api/icc-x-api/filters/maintenancetaskByIdsFilter'
import { MaintenanceTaskByHcPartyAndTypeFilter as MaintenanceTaskByHcPartyAndTypeFilterDto } from '@icure/api/icc-x-api/filters/maintenancetaskByHcPartyAndTypeFilter'
import { MaintenanceTaskAfterDateFilter as MaintenanceTaskAfterDateFilterDto } from '@icure/api/icc-x-api/filters/maintenancetaskAfterDateFilter'
import { UsersByPatientIdFilter as UsersByPatientIdFilterDto } from '@icure/api/icc-x-api/filters/UsersByPatientIdFilter'
import { ComplementFilter } from '../filters/ComplementFilter'
import { UnionFilter } from '../filters/UnionFilter'
import { IntersectionFilter } from '../filters/IntersectionFilter'
import { AllCodesFilter } from '../filters/code/AllCodesFilter'
import { CodeByIdsFilter } from '../filters/code/CodeByIdsFilter'
import { CodeByRegionTypeLabelFilter } from '../filters/code/CodeByRegionTypeLabelFilter'
import { ServiceByHealthcarePartyTagCodeDateFilter } from '../filters/service/ServiceByHealthcarePartyTagCodeDateFilter'
import { ServiceByHealthcarePartyFilter } from '../filters/service/ServiceByHealthcarePartyFilter'
import { ServiceByHealthcarePartyIdentifiersFilter } from '../filters/service/ServiceByHealthcarePartyIdentifiersFilter'
import { ServiceByHealthcarePartyPatientFilter } from '../filters/service/ServiceByHealthcarePartyPatientFilter'
import { DeviceByIdsFilter } from '../filters/device/DeviceByIdsFilter'
import { AllDevicesFilter } from '../filters/device/AllDevicesFilter'
import { HealthElementByHealthcarePartyFilter } from '../filters/healthelement/HealthElementByHealthcarePartyFilter'
import { HealthElementByHealthcarePartyIdentifiersFilter } from '../filters/healthelement/HealthElementByHealthcarePartyIdentifiersFilter'
import { HealthElementByHealthcarePartyPatientFilter } from '../filters/healthelement/HealthElementByHealthcarePartyPatientFilter'
import { HealthElementByHealthcarePartyLabelCodeFilter } from '../filters/healthelement/HealthElementByHealthcarePartyLabelCodeFilter'
import { AllHealthcarePartiesFilter } from '../filters/hcp/AllHealthcarePartiesFilter'
import { HealthcarePartyByIdsFilter } from '../filters/hcp/HealthcarePartyByIdsFilter'
import { HealthcarePartyByNameFilter } from '../filters/hcp/HealthcarePartyByNameFilter'
import { UserByIdsFilter } from '../filters/user/UserByIdsFilter'
import { AllUsersFilter } from '../filters/user/AllUsersFilter'
import { PatientByHealthcarePartyFilter } from '../filters/patient/PatientByHealthcarePartyFilter'
import { PatientByHealthcarePartyIdentifiersFilter } from '../filters/patient/PatientByHealthcarePartyIdentifiersFilter'
import { PatientByHealthcarePartySsinsFilter } from '../filters/patient/PatientByHealthcarePartySsinsFilter'
import { PatientByHealthcarePartyDateOfBirthBetweenFilter } from '../filters/patient/PatientByHealthcarePartyDateOfBirthBetweenFilter'
import { PatientByHealthcarePartyNameContainsFuzzyFilter } from '../filters/patient/PatientByHealthcarePartyNameContainsFuzzyFilter'
import { PatientByHealthcarePartyGenderEducationProfessionFilter } from '../filters/patient/PatientByHealthcarePartyGenderEducationProfessionFilter'
import { PatientByIdsFilter } from '../filters/patient/PatientByIdsFilter'
import { UsersByPatientIdFilter } from '../filters/user/UsersByPatientIdFilter'
import { MaintenanceTasksByIdFilter } from '../filters/maintenancetask/MaintenanceTasksByIdFilter'
import { MaintenanceTasksByHcPartyAndTypeFilter } from '../filters/maintenancetask/MaintenanceTasksByHcPartyAndTypeFilter'
import { MaintenanceTasksAfterDateFilter } from '../filters/maintenancetask/MaintenanceTasksAfterDateFilter'
import { HealthcarePartyByLabelCodeFilter } from '../filters/hcp/HealthcarePartyByLabelCodeFilter'
import { Filter } from '../filters/Filter'
import { ServiceByHealthcarePartyHealthElementIdsFilter } from '../filters/service/ServiceByHealthcarePartyHealthcareElementIdsFilter'
import { HealthElementByIdsFilter } from '../filters/healthelement/HealthElementByIdsFilter'

export namespace FilterMapper {
    export function toAbstractFilterDto<ServiceDto>(filter: Filter<ServiceDto>, input: 'Service'): AbstractFilterService
    export function toAbstractFilterDto<CodeDto>(filter: Filter<CodeDto>, input: 'Code'): AbstractFilterCode
    export function toAbstractFilterDto<DeviceDto>(filter: Filter<DeviceDto>, input: 'Device'): AbstractFilterDevice
    export function toAbstractFilterDto<HealthcarePartyDto>(filter: Filter<HealthcarePartyDto>, input: 'HealthcareParty'): AbstractFilterHealthcareParty
    export function toAbstractFilterDto<HealthElementDto>(filter: Filter<HealthElementDto>, input: 'HealthElement'): AbstractFilterHealthElement
    export function toAbstractFilterDto<PatientDto>(filter: Filter<PatientDto>, input: 'Patient'): AbstractFilterPatient
    export function toAbstractFilterDto<UserDto>(filter: Filter<UserDto>, input: 'User'): AbstractFilterUser
    export function toAbstractFilterDto<MaintenanceTaskDto>(filter: Filter<MaintenanceTaskDto>, input: 'MaintenanceTask'): AbstractFilterMaintenanceTask
    export function toAbstractFilterDto<T>(
        filter: Filter<T>,
        input: 'Service' | 'Code' | 'Device' | 'HealthcareParty' | 'HealthElement' | 'Patient' | 'User' | 'MaintenanceTask'
    ): AbstractFilter<ServiceDto | CodeDto | DeviceDto | HealthcarePartyDto | HealthElementDto | PatientDto | UserDto | MaintenanceTaskDto> {
        const res =
            input === 'Service'
                ? toAbstractFilterServiceDto(filter)
                : input === 'Code'
                ? toAbstractFilterCodeDto(filter)
                : input === 'Device'
                ? toAbstractFilterDeviceDto(filter)
                : input === 'HealthcareParty'
                ? toAbstractFilterHealthcarePartyDto(filter)
                : input === 'HealthElement'
                ? toAbstractFilterHealthElementDto(filter)
                : input === 'Patient'
                ? toAbstractFilterPatientDto(filter)
                : input === 'User'
                ? toAbstractFilterUserDto(filter)
                : input === 'MaintenanceTask'
                ? toAbstractFilterMaintenanceTaskDto(filter)
                : null
        if (!res) {
            throw Error('Filter is not recognized')
        }
        return res
    }

    function toAbstractFilterCodeDto(filter: Filter<CodeDto>): AbstractFilter<CodeDto> {
        if (filter['$type'] === 'ComplementFilter') {
            return toComplementFilterCodeDto(filter as ComplementFilter<CodeDto>)
        }
        if (filter['$type'] === 'UnionFilter') {
            return toUnionFilterCodeDto(filter as UnionFilter<CodeDto>)
        }
        if (filter['$type'] === 'IntersectionFilter') {
            return toIntersectionFilterCodeDto(filter as IntersectionFilter<CodeDto>)
        }
        if (filter['$type'] === 'AllCodesFilter') {
            return toAllCodesFilterDto()
        }
        if (filter['$type'] === 'CodeByIdsFilter') {
            return toCodeByIdsFilterDto(filter as CodeByIdsFilter)
        }
        if (filter['$type'] === 'CodeByRegionTypeLabelFilter') {
            return toCodeByRegionTypeLabelLanguageFilterDto(filter as CodeByRegionTypeLabelFilter)
        }
        throw Error(`No mapper for ${filter['$type']}`)
    }

    const toAllCodesFilterDto = () => new AllCodesFilterDto({})

    const toComplementFilterCodeDto = (filter: ComplementFilter<CodeDto>) => new ComplementFilterDto<CodeDto>(toAbstractFilterCodeDto(filter.superSet), toAbstractFilterCodeDto(filter.subSet))

    const toUnionFilterCodeDto = (filter: UnionFilter<CodeDto>) => new UnionFilterDto<CodeDto>(filter.filters.map((it) => toAbstractFilterCodeDto(it)))

    const toIntersectionFilterCodeDto = (filter: IntersectionFilter<CodeDto>) => new IntersectionFilterDto<CodeDto>(filter.filters.map((it) => toAbstractFilterCodeDto(it)))

    const toCodeByIdsFilterDto = (filter: CodeByIdsFilter) =>
        new CodeByIdsFilterDto({
            desc: filter.description,
            ids: filter.ids,
        })

    const toCodeByRegionTypeLabelLanguageFilterDto = (filter: CodeByRegionTypeLabelFilter) =>
        new CodeByRegionTypeLabelLanguageFilterDto({
            desc: filter.description,
            region: filter.region,
            type: filter.type,
            language: filter.language,
            label: filter.label,
        })

    function toAbstractFilterServiceDto(filter: Filter<ServiceDto>): AbstractFilter<ServiceDto> {
        if (filter['$type'] === 'ComplementFilter') {
            return toComplementFilterServiceDto(filter as ComplementFilter<ServiceDto>)
        }
        if (filter['$type'] === 'UnionFilter') {
            return toUnionFilterServiceDto(filter as UnionFilter<ServiceDto>)
        }
        if (filter['$type'] === 'IntersectionFilter') {
            return toIntersectionFilterServiceDto(filter as IntersectionFilter<ServiceDto>)
        }
        if (filter['$type'] === 'ServiceByHealthcarePartyFilter') {
            return toServiceByHcPartyFilterDto(filter as ServiceByHealthcarePartyFilter)
        }
        if (filter['$type'] === 'ServiceByHealthcarePartyIdentifiersFilter') {
            return toServiceByHcPartyIdentifiersFilterDto(filter as ServiceByHealthcarePartyIdentifiersFilter)
        }
        if (filter['$type'] === 'ServiceByHealthcarePartyHealthElementIdsFilter') {
            return toServiceByHcPartyHealthElementIdsFilterDto(filter as ServiceByHealthcarePartyHealthElementIdsFilter)
        }
        if (filter['$type'] === 'ServiceByHealthcarePartyTagCodeDateFilter') {
            return toServiceByHcPartyTagCodeDateFilterDto(filter as ServiceByHealthcarePartyTagCodeDateFilter)
        }
        if (filter['$type'] === 'ServiceByIdsFilter') {
            return toServiceByIdsFilterDto(filter as ServiceByIdsFilter)
        }
        if (filter['$type'] === 'ServiceByHealthcarePartyPatientFilter') {
            return toServiceBySecretForeignKeysDto(filter as ServiceByHealthcarePartyPatientFilter)
        }
        throw Error(`No mapper for ${filter['$type']}`)
    }

    const toComplementFilterServiceDto = (filter: ComplementFilter<ServiceDto>) => new ComplementFilterDto<ServiceDto>(toAbstractFilterServiceDto(filter.superSet), toAbstractFilterServiceDto(filter.subSet))

    const toUnionFilterServiceDto = (filter: UnionFilter<ServiceDto>) => new UnionFilterDto<ServiceDto>(filter.filters.map((it) => toAbstractFilterServiceDto(it)))

    const toIntersectionFilterServiceDto = (filter: IntersectionFilter<ServiceDto>) => new IntersectionFilterDto<ServiceDto>(filter.filters.map((it) => toAbstractFilterServiceDto(it)))

    const toServiceByIdsFilterDto = (filter: ServiceByIdsFilter) =>
        new ServiceByIdsFilter({
            desc: filter.desc,
            ids: filter.ids,
        })

    const toServiceByHcPartyHealthElementIdsFilterDto = (filter: ServiceByHealthcarePartyHealthElementIdsFilter) =>
        new ServiceByHcPartyHealthElementIdsFilter({
            desc: filter.description,
            healthcarePartyId: filter.healthcarePartyId,
            healthElementIds: filter.healthElementIds,
        })

    const toServiceByHcPartyIdentifiersFilterDto = (filter: ServiceByHealthcarePartyIdentifiersFilter) =>
        new ServiceByHcPartyIdentifiersFilterDto({
            desc: filter.description,
            healthcarePartyId: filter.healthcarePartyId,
            identifiers: filter.identifiers,
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
            endValueDate: filter.endValueDate,
            descending: filter.descending,
        })

    const toServiceByHcPartyFilterDto = (filter: ServiceByHealthcarePartyFilter) =>
        new ServiceByHcPartyFilterDto({
            desc: filter.description,
            hcpId: filter.hcpId,
        })

    const toServiceBySecretForeignKeysDto = (filter: ServiceByHealthcarePartyPatientFilter) =>
        new ServiceBySecretForeignKeysDto({
            desc: filter.description,
            healthcarePartyId: filter.healthcarePartyId,
            patientSecretForeignKeys: filter.patientSecretForeignKeys,
        })

    function toAbstractFilterDeviceDto(filter: Filter<DeviceDto>): AbstractFilter<DeviceDto> {
        if (filter['$type'] === 'ComplementFilter') {
            return toComplementFilterDeviceDto(filter as ComplementFilter<DeviceDto>)
        }
        if (filter['$type'] === 'UnionFilter') {
            return toUnionFilterDeviceDto(filter as UnionFilter<DeviceDto>)
        }
        if (filter['$type'] === 'IntersectionFilter') {
            return toIntersectionFilterDeviceDto(filter as IntersectionFilter<DeviceDto>)
        }
        if (filter['$type'] === 'AllDevicesFilter') {
            return toAllDevicesFilterDto(filter as AllDevicesFilter)
        }
        if (filter['$type'] === 'DeviceByIdsFilter') {
            return toDeviceByIdsFilterDto(filter as DeviceByIdsFilter)
        }
        throw Error(`No mapper for ${filter['$type']}`)
    }

    const toComplementFilterDeviceDto = (filter: ComplementFilter<DeviceDto>) => new ComplementFilterDto<DeviceDto>(toAbstractFilterDeviceDto(filter.superSet), toAbstractFilterDeviceDto(filter.subSet))

    const toUnionFilterDeviceDto = (filter: UnionFilter<DeviceDto>) => new UnionFilterDto<DeviceDto>(filter.filters.map((it) => toAbstractFilterDeviceDto(it)))

    const toIntersectionFilterDeviceDto = (filter: IntersectionFilter<DeviceDto>) => new IntersectionFilterDto<DeviceDto>(filter.filters.map((it) => toAbstractFilterDeviceDto(it)))

    const toAllDevicesFilterDto = (filter: AllDevicesFilter) => new AllDevicesFilterDto({})

    const toDeviceByIdsFilterDto = (filter: DeviceByIdsFilter) => new DeviceByIdsFilterDto({ desc: filter.description, ids: filter.ids })

    function toAbstractFilterHealthcarePartyDto(filter: Filter<HealthcarePartyDto>): AbstractFilter<HealthcarePartyDto> {
        if (filter['$type'] === 'ComplementFilter') {
            return toComplementFilterHealthcarePartyDto(filter as ComplementFilter<HealthcarePartyDto>)
        }
        if (filter['$type'] === 'UnionFilter') {
            return toUnionFilterHealthcarePartyDto(filter as UnionFilter<HealthcarePartyDto>)
        }
        if (filter['$type'] === 'IntersectionFilter') {
            return toIntersectionFilterHealthcarePartyDto(filter as IntersectionFilter<HealthcarePartyDto>)
        }
        if (filter['$type'] === 'AllHealthcarePartiesFilter') {
            return toAllHealthcarePartiesFilterDto(filter as AllHealthcarePartiesFilter)
        }
        if (filter['$type'] === 'HealthcarePartyByIdsFilter') {
            return toHealthcarePartyByIdsFilterDto(filter as HealthcarePartyByIdsFilter)
        }
        if (filter['$type'] === 'HealthcarePartyByNameFilter') {
            return toHealthcarePartyByNameFilterDto(filter as HealthcarePartyByNameFilter)
        }
        if (filter['$type'] === 'HealthcarePartyByLabelCodeFilter') {
            return toHealthcarePartyByTagCodeFilterDto(filter as HealthcarePartyByLabelCodeFilter)
        }
        throw Error(`No mapper for ${filter['$type']}`)
    }

    const toComplementFilterHealthcarePartyDto = (filter: ComplementFilter<HealthcarePartyDto>) => new ComplementFilterDto<HealthcarePartyDto>(toAbstractFilterHealthcarePartyDto(filter.superSet), toAbstractFilterHealthcarePartyDto(filter.subSet))

    const toUnionFilterHealthcarePartyDto = (filter: UnionFilter<HealthcarePartyDto>) => new UnionFilterDto<HealthcarePartyDto>(filter.filters.map((it) => toAbstractFilterHealthcarePartyDto(it)))

    const toIntersectionFilterHealthcarePartyDto = (filter: IntersectionFilter<HealthcarePartyDto>) => new IntersectionFilterDto<HealthcarePartyDto>(filter.filters.map((it) => toAbstractFilterHealthcarePartyDto(it)))

    const toAllHealthcarePartiesFilterDto = (filter: AllHealthcarePartiesFilter) => new AllHealthcarePartiesFilterDto({})

    const toHealthcarePartyByIdsFilterDto = (filter: HealthcarePartyByIdsFilter) => new HealthcarePartyByIdsFilterDto({ desc: filter.description, ids: filter.ids })

    const toHealthcarePartyByNameFilterDto = (filter: HealthcarePartyByNameFilter) => new HealthcarePartyByNameFilterDto({ desc: filter.description, name: filter.name, descending: filter.descending })

    const toHealthcarePartyByTagCodeFilterDto = (filter: HealthcarePartyByLabelCodeFilter) =>
        new HealthcarePartyByTagCodeFilterDto({
            desc: filter.description,
            tagType: filter.labelType,
            tagCode: filter.labelCode,
            codeType: filter.codeType,
            codeCode: filter.codeCode,
        })

    function toAbstractFilterHealthElementDto(filter: Filter<HealthElementDto>): AbstractFilter<HealthElementDto> {
        if (filter['$type'] === 'ComplementFilter') {
            return toComplementFilterHealthElementDto(filter as ComplementFilter<HealthElementDto>)
        }
        if (filter['$type'] === 'UnionFilter') {
            return toUnionFilterHealthElementDto(filter as UnionFilter<HealthElementDto>)
        }
        if (filter['$type'] === 'IntersectionFilter') {
            return toIntersectionFilterHealthElementDto(filter as IntersectionFilter<HealthElementDto>)
        }
        if (filter['$type'] === 'HealthElementByHealthcarePartyFilter') {
            return toHealthElementByHcPartyFilterDto(filter as HealthElementByHealthcarePartyFilter)
        }
        if (filter['$type'] === 'HealthElementByHealthcarePartyIdentifiersFilter') {
            return toHealthElementByHcPartyIdentifiersFilterDto(filter as HealthElementByHealthcarePartyIdentifiersFilter)
        }
        if (filter['$type'] === 'HealthElementByHealthcarePartyPatientFilter') {
            return toHealthElementByHcPartySecretForeignKeysFilterDto(filter as HealthElementByHealthcarePartyPatientFilter)
        }
        if (filter['$type'] === 'HealthElementByHealthcarePartyLabelCodeFilter') {
            return toHealthElementByHcPartyTagCodeFilterDto(filter as HealthElementByHealthcarePartyLabelCodeFilter)
        }
        if (filter['$type'] === 'HealthElementByIdsFilter') {
            return toHealthElementByIdsFilterDto(filter as HealthElementByIdsFilter)
        }
        throw Error(`No mapper for ${filter['$type']}`)
    }

    const toComplementFilterHealthElementDto = (filter: ComplementFilter<HealthElementDto>) => new ComplementFilterDto<HealthElementDto>(toAbstractFilterHealthElementDto(filter.superSet), toAbstractFilterHealthElementDto(filter.subSet))

    const toUnionFilterHealthElementDto = (filter: UnionFilter<HealthElementDto>) => new UnionFilterDto<HealthElementDto>(filter.filters.map((it) => toAbstractFilterHealthElementDto(it)))

    const toIntersectionFilterHealthElementDto = (filter: IntersectionFilter<HealthElementDto>) => new IntersectionFilterDto<HealthElementDto>(filter.filters.map((it) => toAbstractFilterHealthElementDto(it)))

    const toHealthElementByHcPartyFilterDto = (filter: HealthElementByHealthcarePartyFilter) => new HealthElementByHcPartyFilterDto({ desc: filter.description, hcpId: filter.healthcarePartyId })

    const toHealthElementByHcPartyIdentifiersFilterDto = (filter: HealthElementByHealthcarePartyIdentifiersFilter) =>
        new HealthElementByHcPartyIdentifiersFilterDto({
            desc: filter.description,
            healthcarePartyId: filter.healthcarePartyId,
            identifiers: filter.identifiers,
        })

    const toHealthElementByHcPartySecretForeignKeysFilterDto = (filter: HealthElementByHealthcarePartyPatientFilter) =>
        new HealthElementByHcPartySecretForeignKeysFilterDto({
            desc: filter.description,
            healthcarePartyId: filter.healthcarePartyId,
            patientSecretForeignKeys: filter.patientSecretForeignKeys,
        })

    const toHealthElementByHcPartyTagCodeFilterDto = (filter: HealthElementByHealthcarePartyLabelCodeFilter) =>
        new HealthElementByHcPartyTagCodeFilterDto({
            desc: filter.description,
            healthcarePartyId: filter.healthcarePartyId,
            codeType: filter.codeType,
            codeCode: filter.codeCode,
            tagType: filter.tagType,
            tagCode: filter.tagCode,
            status: filter.status,
        })

    const toHealthElementByIdsFilterDto = (filter: HealthElementByIdsFilter) => new HealthElementByIdsFilterDto({ desc: filter.description, ids: filter.ids })

    function toAbstractFilterUserDto(filter: Filter<UserDto>): AbstractFilter<UserDto> {
        if (filter['$type'] === 'ComplementFilter') {
            return toComplementFilterUserDto(filter as ComplementFilter<UserDto>)
        }
        if (filter['$type'] === 'UnionFilter') {
            return toUnionFilterUserDto(filter as UnionFilter<UserDto>)
        }
        if (filter['$type'] === 'IntersectionFilter') {
            return toIntersectionFilterUserDto(filter as IntersectionFilter<UserDto>)
        }
        if (filter['$type'] === 'AllUsersFilter') {
            return toAllUsersFilterDto(filter as AllUsersFilter)
        }
        if (filter['$type'] === 'UserByIdsFilter') {
            return toUserByIdsFilterDto(filter as UserByIdsFilter)
        }
        if (filter['$type'] === 'UsersByPatientIdFilter') {
            return toUsersByPatientIdFilterDto(filter as UsersByPatientIdFilter)
        }
        throw Error(`No mapper for ${filter['$type']}`)
    }

    const toComplementFilterUserDto = (filter: ComplementFilter<UserDto>) => new ComplementFilterDto<UserDto>(toAbstractFilterUserDto(filter.superSet), toAbstractFilterUserDto(filter.subSet))

    const toUnionFilterUserDto = (filter: UnionFilter<UserDto>) => new UnionFilterDto<UserDto>(filter.filters.map((it) => toAbstractFilterUserDto(it)))

    const toIntersectionFilterUserDto = (filter: IntersectionFilter<UserDto>) => new IntersectionFilterDto<UserDto>(filter.filters.map((it) => toAbstractFilterUserDto(it)))

    const toAllUsersFilterDto = (filter: AllUsersFilter) => new AllUsersFilterDto({ desc: filter.description })

    const toUserByIdsFilterDto = (filter: UserByIdsFilter) => new UserByIdsFilterDto({ desc: filter.description, ids: filter.ids })

    const toUsersByPatientIdFilterDto = (filter: UsersByPatientIdFilter) => new UsersByPatientIdFilterDto({ desc: filter.description, patientId: filter.patientId })

    function toAbstractFilterPatientDto(filter: Filter<PatientDto>): AbstractFilter<PatientDto> {
        if (filter['$type'] === 'ComplementFilter') {
            return toComplementFilterPatientDto(filter as ComplementFilter<PatientDto>)
        }
        if (filter['$type'] === 'UnionFilter') {
            return toUnionFilterPatientDto(filter as UnionFilter<PatientDto>)
        }
        if (filter['$type'] === 'IntersectionFilter') {
            return toIntersectionFilterPatientDto(filter as IntersectionFilter<PatientDto>)
        }
        if (filter['$type'] === 'PatientByHealthcarePartyFilter') {
            return toPatientByHcPartyFilterDto(filter as PatientByHealthcarePartyFilter)
        }
        if (filter['$type'] === 'PatientByHealthcarePartyIdentifiersFilter') {
            return toPatientByHcPartyAndIdentifiersFilterDto(filter as PatientByHealthcarePartyIdentifiersFilter)
        }
        if (filter['$type'] === 'PatientByHealthcarePartySsinsFilter') {
            return toPatientByHcPartyAndSsinsFilterDto(filter as PatientByHealthcarePartySsinsFilter)
        }
        if (filter['$type'] === 'PatientByHealthcarePartyDateOfBirthBetweenFilter') {
            return toPatientByHcPartyDateOfBirthBetweenFilterDto(filter as PatientByHealthcarePartyDateOfBirthBetweenFilter)
        }
        if (filter['$type'] === 'PatientByHealthcarePartyNameContainsFuzzyFilter') {
            return toPatientByHcPartyNameContainsFuzzyFilterDto(filter as PatientByHealthcarePartyNameContainsFuzzyFilter)
        }
        if (filter['$type'] === 'PatientByHealthcarePartyGenderEducationProfessionFilter') {
            return toPatientByHcPartyGenderEducationProfessionDto(filter as PatientByHealthcarePartyGenderEducationProfessionFilter)
        }
        if (filter['$type'] === 'PatientByIdsFilter') {
            return toPatientByIdsFilterDto(filter as PatientByIdsFilter)
        }
        throw Error(`No mapper for ${filter['$type']}`)
    }

    const toComplementFilterPatientDto = (filter: ComplementFilter<PatientDto>) => new ComplementFilterDto<PatientDto>(toAbstractFilterPatientDto(filter.superSet), toAbstractFilterPatientDto(filter.subSet))

    const toUnionFilterPatientDto = (filter: UnionFilter<PatientDto>) => new UnionFilterDto<PatientDto>(filter.filters.map((it) => toAbstractFilterPatientDto(it)))

    const toIntersectionFilterPatientDto = (filter: IntersectionFilter<PatientDto>) => new IntersectionFilterDto<PatientDto>(filter.filters.map((it) => toAbstractFilterPatientDto(it)))

    const toPatientByHcPartyFilterDto = (filter: PatientByHealthcarePartyFilter) => new PatientByHcPartyFilterDto({ desc: filter.description, healthcarePartyId: filter.healthcarePartyId })

    const toPatientByHcPartyAndIdentifiersFilterDto = (filter: PatientByHealthcarePartyIdentifiersFilter) =>
        new PatientByHcPartyAndIdentifiersFilterDto({
            desc: filter.description,
            healthcarePartyId: filter.healthcarePartyId,
            identifiers: filter.identifiers,
        })
    const toPatientByHcPartyAndSsinsFilterDto = (filter: PatientByHealthcarePartySsinsFilter) =>
        new PatientByHcPartyAndSsinsFilterDto({
            desc: filter.description,
            healthcarePartyId: filter.healthcarePartyId,
            ssins: filter.ssins ?? [],
        })
    const toPatientByHcPartyDateOfBirthBetweenFilterDto = (filter: PatientByHealthcarePartyDateOfBirthBetweenFilter) =>
        new PatientByHcPartyDateOfBirthBetweenFilterDto({
            desc: filter.description,
            healthcarePartyId: filter.healthcarePartyId,
            minDateOfBirth: filter.minDateOfBirth,
            maxDateOfBirth: filter.maxDateOfBirth,
        })

    const toPatientByIdsFilterDto = (filter: PatientByIdsFilter) => new PatientByIdsFilterDto({ desc: filter.description, ids: filter.ids })

    const toPatientByHcPartyNameContainsFuzzyFilterDto = (filter: PatientByHealthcarePartyNameContainsFuzzyFilter) =>
        new PatientByHcPartyNameContainsFuzzyFilterDto({
            desc: filter.description,
            healthcarePartyId: filter.healthcarePartyId,
            searchString: filter.searchString,
        })
    const toPatientByHcPartyGenderEducationProfessionDto = (filter: PatientByHealthcarePartyGenderEducationProfessionFilter) =>
        new PatientByHcPartyGenderEducationProfessionDto({
            desc: filter.description,
            healthcarePartyId: filter.healthcarePartyId,
            gender: filter.gender,
            education: filter.education,
            profession: filter.profession,
        })

    function toAbstractFilterMaintenanceTaskDto(filter: Filter<MaintenanceTaskDto>): AbstractFilter<MaintenanceTaskDto> {
        if (filter['$type'] === 'ComplementFilter') {
            return toComplementFilterMaintenanceTaskDto(filter as ComplementFilter<MaintenanceTaskDto>)
        }
        if (filter['$type'] === 'UnionFilter') {
            return toUnionFilterMaintenanceTaskDto(filter as UnionFilter<MaintenanceTaskDto>)
        }
        if (filter['$type'] === 'IntersectionFilter') {
            return toIntersectionFilterMaintenanceTaskDto(filter as IntersectionFilter<MaintenanceTaskDto>)
        }
        if (filter['$type'] === 'MaintenanceTasksByIdFilter') {
            return toMaintenanceTaskByIdsFilterDto(filter as MaintenanceTasksByIdFilter)
        }
        if (filter['$type'] === 'MaintenanceTasksByHcPartyAndTypeFilter') {
            return toMaintenanceTaskByHcPartyAndTypeFilterDto(filter as MaintenanceTasksByHcPartyAndTypeFilter)
        }
        if (filter['$type'] === 'MaintenanceTasksAfterDateFilter') {
            return toMaintenanceTaskAfterDateFilterDto(filter as MaintenanceTasksAfterDateFilter)
        }
        throw Error(`No mapper for ${filter['$type']}`)
    }

    const toComplementFilterMaintenanceTaskDto = (filter: ComplementFilter<MaintenanceTaskDto>) => new ComplementFilterDto<MaintenanceTaskDto>(toAbstractFilterMaintenanceTaskDto(filter.superSet), toAbstractFilterMaintenanceTaskDto(filter.subSet))

    const toUnionFilterMaintenanceTaskDto = (filter: UnionFilter<MaintenanceTaskDto>) => new UnionFilterDto<MaintenanceTaskDto>(filter.filters.map((it) => toAbstractFilterMaintenanceTaskDto(it)))

    const toIntersectionFilterMaintenanceTaskDto = (filter: IntersectionFilter<MaintenanceTaskDto>) => new IntersectionFilterDto<MaintenanceTaskDto>(filter.filters.map((it) => toAbstractFilterMaintenanceTaskDto(it)))

    const toMaintenanceTaskByIdsFilterDto = (filter: MaintenanceTasksByIdFilter) =>
        new MaintenanceTaskByIdsFilterDto({
            desc: filter.description,
            ids: filter.ids,
        })

    const toMaintenanceTaskByHcPartyAndTypeFilterDto = (filter: MaintenanceTasksByHcPartyAndTypeFilter) =>
        new MaintenanceTaskByHcPartyAndTypeFilterDto({
            desc: filter.description,
            healthcarePartyId: filter.healthcarePartyId,
            type: filter.type,
        })

    const toMaintenanceTaskAfterDateFilterDto = (filter: MaintenanceTasksAfterDateFilter) =>
        new MaintenanceTaskAfterDateFilterDto({
            desc: filter.description,
            healthcarePartyId: filter.healthcarePartyId,
            date: filter.date,
        })
}
