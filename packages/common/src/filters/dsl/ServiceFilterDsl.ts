import { Filter } from '../Filter'
import { DataOwnerFilterBuilder, FilterBuilder, NoOpFilter, SortableFilterBuilder } from './filterDsl'
import { IntersectionFilter } from '../IntersectionFilter'
import { ServiceByHealthcarePartyFilter } from '../service/ServiceByHealthcarePartyFilter'
import { Identifier, Patient, Service } from '@icure/api'
import { CommonApi } from '../../apis/CommonApi'
import { ServiceByHealthcarePartyHealthElementIdsFilter } from '../service/ServiceByHealthcarePartyHealthcareElementIdsFilter'

interface BaseServiceFilterBuilder<F> {
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
    forPatients(patients: Patient[]): F

    /**
     * Includes all the data samples with the specified health elements ids.
     * @param byHealthElementIds
     */
    byHealthElementIds(byHealthElementIds: string[]): F
}

export class ServiceFilter implements DataOwnerFilterBuilder<Service, ServiceFilterWithDataOwner> {
    constructor(private api: CommonApi) {}

    forDataOwner(dataOwnerId: string): ServiceFilterWithDataOwner {
        return new ServiceFilterWithDataOwner(this.api, dataOwnerId)
    }

    forSelf(): ServiceFilterWithDataOwner {
        return new ServiceFilterWithDataOwner(this.api)
    }
}

class ServiceFilterWithDataOwner extends SortableFilterBuilder<Service, ServiceFilterSortStepDecorator> implements BaseServiceFilterBuilder<ServiceFilterWithDataOwner>, FilterBuilder<Service> {
    _dataOwnerId: Promise<string>

    constructor(private api: CommonApi, dataOwnerId?: string) {
        super()
        this._dataOwnerId = !!dataOwnerId ? Promise.resolve(dataOwnerId) : api.baseApi.userApi.getCurrentUser().then((u) => api.baseApi.dataOwnerApi.getDataOwnerIdOf(u))
    }

    get sort(): ServiceFilterSortStepDecorator {
        return new ServiceFilterSortStepDecorator(this)
    }
    getDataOwner(): Promise<string> {
        return this._dataOwnerId
    }

    byIds(byIds: string[]): ServiceFilterWithDataOwner {
        this._builderAccumulator.addByIdsFilter(Promise.resolve({ ids: byIds, $type: 'ServiceByIdsFilter' }), 'ids')
        return this
    }

    byIdentifiers(identifiers: Identifier[]): ServiceFilterWithDataOwner {
        const filter = this._dataOwnerId.then((id) => {
            return {
                healthcarePartyId: id,
                identifiers: identifiers,
                $type: 'ServiceByHealthcarePartyIdentifiersFilter',
            }
        })
        this._builderAccumulator.addFilter(filter)
        return this
    }

    byLabelCodeDateFilter(tagType?: string, tagCode?: string, codeType?: string, codeCode?: string, startValueDate?: number, endValueDate?: number, descending?: boolean): ServiceFilterWithDataOwner {
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

    forPatients(patients: Patient[]): ServiceFilterWithDataOwner {
        const filter = this._dataOwnerId.then((id) => {
            return Promise.all(patients.map((p) => this.api.baseApi.cryptoApi.entities.secretIdsOf(p!, undefined)))
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

    byHealthElementIds(byHealthElementIds: string[]): ServiceFilterWithDataOwner {
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
            return { hcpId: await this._dataOwnerId, $type: 'ServiceByHealthcarePartyFilter' } as ServiceByHealthcarePartyFilter
        }
    }
}

type NonSortableDataOwnerFilter = BaseServiceFilterBuilder<ServiceFilterWithDataOwner> & FilterBuilder<Service>

class ServiceFilterSortStepDecorator implements BaseServiceFilterBuilder<NonSortableDataOwnerFilter> {
    constructor(private serviceFilter: ServiceFilterWithDataOwner) {}

    byIds(byIds: string[]): NonSortableDataOwnerFilter {
        this.serviceFilter.byIds(byIds)
        this.serviceFilter._builderAccumulator.setLastElementAsSortKey()
        return this.serviceFilter
    }

    byIdentifiers(identifiers: Identifier[]): NonSortableDataOwnerFilter {
        this.serviceFilter.byIdentifiers(identifiers)
        this.serviceFilter._builderAccumulator.setLastElementAsSortKey()
        return this.serviceFilter
    }

    byLabelCodeDateFilter(tagType?: string, tagCode?: string, codeType?: string, codeCode?: string, startValueDate?: number, endValueDate?: number, descending?: boolean): NonSortableDataOwnerFilter {
        this.serviceFilter.byLabelCodeDateFilter(tagType, tagCode, codeType, codeCode, startValueDate, endValueDate, descending)
        this.serviceFilter._builderAccumulator.setLastElementAsSortKey()
        return this.serviceFilter
    }

    forPatients(patients: Patient[]): NonSortableDataOwnerFilter {
        this.serviceFilter.forPatients(patients)
        this.serviceFilter._builderAccumulator.setLastElementAsSortKey()
        return this.serviceFilter
    }

    byHealthElementIds(byHealthElementIds: string[]): NonSortableDataOwnerFilter {
        this.serviceFilter.byHealthElementIds(byHealthElementIds)
        this.serviceFilter._builderAccumulator.setLastElementAsSortKey()
        return this.serviceFilter
    }
}
