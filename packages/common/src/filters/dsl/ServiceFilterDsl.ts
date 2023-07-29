import { Filter } from '../Filter'
import { DataOwnerFilterBuilder, FilterBuilder, NoOpFilter, SortableFilterBuilder } from './filterDsl'
import { IntersectionFilter } from '../IntersectionFilter'
import { ServiceByHealthcarePartyFilter, ServiceByHealthcarePartyHealthElementIdsFilter } from '../service'
import { Patient, Service } from '@icure/api'
import { CommonApi } from '../../apis/CommonApi'
import { Mapper } from '../../apis/Mapper'
import { mapIdentifierToIdentifierDto } from '../../mappers/Identifier.mapper'
import { Identifier } from '../../models/Identifier.model'

interface BaseServiceFilterBuilder<F, DSPatient> {
    /**
     * Includes all the data samples with the specified ids.
     * @param byIds the ids of the data samples.
     */
    byIds(byIds: string[]): F

    /**
     * Includes all the data samples that have at least one of the specified identifiers.
     * @param identifiers
     */
    byIdentifiers(identifiers: Identifier[]): F

    /**
     * Includes all the data samples with at least one of the specified tags or codes.
     * At least one parameter must be specified.
     * @param tagType the type of the tag. If undefined, it will be ignored.
     * @param tagCode the code of the tag. If undefined, it will be ignored.
     * @param codeType the type of the code. If undefined, it will be ignored.
     * @param codeCode the code of the code. If undefined, it will be ignored.
     * @param startValueDate if specified, it will include only the data samples created after this date.
     * @param endValueDate if specified, it will include only the data samples created before this date.
     * @param descending
     */
    byLabelCodeDateFilter(tagType?: string, tagCode?: string, codeType?: string, codeCode?: string, startValueDate?: number, endValueDate?: number, descending?: boolean): F

    /**
     * Includes all the healthcare elements that were created for the patients passed as parameter.
     * @param patients
     */
    forPatients(patients: DSPatient[]): F

    /**
     * Includes all the data samples with the specified health elements ids.
     * @param byHealthElementIds
     */
    byHealthElementIds(byHealthElementIds: string[]): F
}

export class ServiceFilter<DSPatient> implements DataOwnerFilterBuilder<Service, ServiceFilterWithDataOwner<DSPatient>> {
    constructor(
        private api: CommonApi,
        private patientMapper: Mapper<DSPatient, Patient>,
        private additionalFilters?: Promise<Filter<Service>>[],
    ) {}

    forDataOwner(dataOwnerId: string): ServiceFilterWithDataOwner<DSPatient> {
        return new ServiceFilterWithDataOwner(this.api, this.patientMapper, this.additionalFilters ?? [], dataOwnerId)
    }

    forSelf(): ServiceFilterWithDataOwner<DSPatient> {
        return new ServiceFilterWithDataOwner(this.api, this.patientMapper, this.additionalFilters ?? [])
    }
}

class ServiceFilterWithDataOwner<DSPatient> extends SortableFilterBuilder<Service, ServiceFilterSortStepDecorator<DSPatient>> implements BaseServiceFilterBuilder<ServiceFilterWithDataOwner<DSPatient>, DSPatient>, FilterBuilder<Service> {
    _dataOwnerId: Promise<string>

    constructor(
        private api: CommonApi,
        private patientMapper: Mapper<DSPatient, Patient>,
        private additionalFilters: Promise<Filter<Service>>[],
        dataOwnerId?: string,
    ) {
        super()
        this._dataOwnerId = !!dataOwnerId ? Promise.resolve(dataOwnerId) : api.baseApi.userApi.getCurrentUser().then((u) => api.baseApi.dataOwnerApi.getDataOwnerIdOf(u))
    }

    get sort(): ServiceFilterSortStepDecorator<DSPatient> {
        return new ServiceFilterSortStepDecorator(this)
    }

    getDataOwner(): Promise<string> {
        return this._dataOwnerId
    }

    byIds(byIds: string[]): ServiceFilterWithDataOwner<DSPatient> {
        this._builderAccumulator.addByIdsFilter(Promise.resolve({ ids: byIds, $type: 'ServiceByIdsFilter' }), 'ids')
        return this
    }

    byIdentifiers(identifiers: Identifier[]): ServiceFilterWithDataOwner<DSPatient> {
        const dtos = identifiers.map(mapIdentifierToIdentifierDto)

        const filter = this._dataOwnerId.then((id) => {
            return {
                healthcarePartyId: id,
                identifiers: dtos,
                $type: 'ServiceByHealthcarePartyIdentifiersFilter',
            }
        })
        this._builderAccumulator.addFilter(filter)
        return this
    }

    byLabelCodeDateFilter(tagType?: string, tagCode?: string, codeType?: string, codeCode?: string, startValueDate?: number, endValueDate?: number, descending?: boolean): ServiceFilterWithDataOwner<DSPatient> {
        if (!tagType && !tagCode && !codeType && !codeCode && !startValueDate && !endValueDate) {
            throw new Error('At least one parameter must be specified')
        }
        const filter = this._dataOwnerId.then((id) => {
            return {
                tagType,
                tagCode,
                codeType,
                codeCode,
                startValueDate,
                endValueDate,
                descending: descending ?? false,
                healthcarePartyId: id,
                $type: 'ServiceByHealthcarePartyTagCodeDateFilter',
            }
        })
        this._builderAccumulator.addFilter(Promise.resolve(filter))
        return this
    }

    forPatients(patients: DSPatient[]): ServiceFilterWithDataOwner<DSPatient> {
        const filter = this._dataOwnerId.then((id) => {
            const mappedPatients = patients.map((p) => this.patientMapper.toDto(p))
            return Promise.all(mappedPatients.map((p) => this.api.baseApi.cryptoApi.entities.secretIdsOf(p!, undefined)))
                .then((sfksForPatients) => sfksForPatients.flat())
                .then((sfks) => {
                    return {
                        healthcarePartyId: id,
                        patientSecretForeignKeys: sfks,
                        $type: 'ServiceByHealthcarePartyPatientFilter',
                    }
                })
        })
        this._builderAccumulator.addByIdsFilter(filter, 'patientSecretForeignKeys')
        return this
    }

    byHealthElementIds(byHealthElementIds: string[]): ServiceFilterWithDataOwner<DSPatient> {
        const filter = this._dataOwnerId.then((id) => {
            return {
                healthcarePartyId: id,
                healthElementIds: byHealthElementIds,
                $type: 'ServiceByHealthcarePartyHealthElementIdsFilter',
            } satisfies ServiceByHealthcarePartyHealthElementIdsFilter
        })
        this._builderAccumulator.addByIdsFilter(filter, 'healthElementIds')
        return this
    }

    async build(): Promise<Filter<Service>> {
        const filters = await this._builderAccumulator.getAndSortFilters()

        filters.push(...(await Promise.all(this.additionalFilters)))

        if (filters.some((f) => NoOpFilter.isNoOp(f))) {
            console.warn('Warning: the filter you built cannot be resolved and will return no entity')
            return new NoOpFilter()
        } else if (filters.length > 1) {
            return {
                filters: filters,
                $type: 'IntersectionFilter',
            } as IntersectionFilter<Service>
        } else if (filters.length === 1) {
            return filters[0]
        } else {
            return {
                hcpId: await this._dataOwnerId,
                $type: 'ServiceByHealthcarePartyFilter',
            } as ServiceByHealthcarePartyFilter
        }
    }
}

type NonSortableDataOwnerFilter<DSPatient> = BaseServiceFilterBuilder<ServiceFilterWithDataOwner<DSPatient>, DSPatient> & FilterBuilder<Service>

class ServiceFilterSortStepDecorator<DSPatient> implements BaseServiceFilterBuilder<NonSortableDataOwnerFilter<DSPatient>, DSPatient> {
    constructor(private serviceFilter: ServiceFilterWithDataOwner<DSPatient>) {}

    byIds(byIds: string[]): NonSortableDataOwnerFilter<DSPatient> {
        this.serviceFilter.byIds(byIds)
        this.serviceFilter._builderAccumulator.setLastElementAsSortKey()
        return this.serviceFilter
    }

    byIdentifiers(identifiers: Identifier[]): NonSortableDataOwnerFilter<DSPatient> {
        this.serviceFilter.byIdentifiers(identifiers)
        this.serviceFilter._builderAccumulator.setLastElementAsSortKey()
        return this.serviceFilter
    }

    byLabelCodeDateFilter(tagType?: string, tagCode?: string, codeType?: string, codeCode?: string, startValueDate?: number, endValueDate?: number, descending?: boolean): NonSortableDataOwnerFilter<DSPatient> {
        this.serviceFilter.byLabelCodeDateFilter(tagType, tagCode, codeType, codeCode, startValueDate, endValueDate, descending)
        this.serviceFilter._builderAccumulator.setLastElementAsSortKey()
        return this.serviceFilter
    }

    forPatients(patients: DSPatient[]): NonSortableDataOwnerFilter<DSPatient> {
        this.serviceFilter.forPatients(patients)
        this.serviceFilter._builderAccumulator.setLastElementAsSortKey()
        return this.serviceFilter
    }

    byHealthElementIds(byHealthElementIds: string[]): NonSortableDataOwnerFilter<DSPatient> {
        this.serviceFilter.byHealthElementIds(byHealthElementIds)
        this.serviceFilter._builderAccumulator.setLastElementAsSortKey()
        return this.serviceFilter
    }
}
