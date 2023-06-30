import { HealthElement, Identifier, IntersectionFilter, Patient } from '@icure/api'
import { Filter } from '../Filter'
import { DataOwnerFilterBuilder, FilterBuilder, NoOpFilter, SortableFilterBuilder } from './filterDsl'
import { CommonApi } from '../../apis/CommonApi'
import { HealthElementByHealthcarePartyFilter } from '../healthelement/HealthElementByHealthcarePartyFilter'

export class HealthElementFilter implements DataOwnerFilterBuilder<HealthElement, HealthElementFilterWithDataOwner> {
    constructor(private api: CommonApi) {}

    forDataOwner(dataOwnerId: string): HealthElementFilterWithDataOwner {
        return new HealthElementFilterWithDataOwner(this.api, dataOwnerId)
    }

    forSelf(): HealthElementFilterWithDataOwner {
        return new HealthElementFilterWithDataOwner(this.api)
    }
}

interface BaseHealthElementFilterBuilder<F> {
    /**
     * Includes all the healthcare elements with the specified ids.
     * @param byIds the ids of the healthcare elements.
     */
    byIds(byIds: string[]): F

    /**
     * Includes all the healthcare elements that have at least one of the specified identifiers.
     * @param identifiers
     */
    byIdentifiers(identifiers: Identifier[]): F

    /**
     * Includes all the healthcare elements that have the label or the code specified. At least one of the parameters
     * must be not null.
     * @param labelType the type of the label, if undefined it will be ignored.
     * @param labelCode the code of the label, if undefined it will be ignored.
     * @param codeType the type of the code, if undefined it will be ignored.
     * @param codeCode the code of the code, if undefined it will be ignored.
     */
    byLabelCodeFilter(labelType?: string, labelCode?: string, codeType?: string, codeCode?: string): F

    /**
     * Includes all the healthcare elements that were created for the patients passed as parameter.
     * @param patients
     */
    forPatients(patients: Patient[]): F
}

export class HealthElementFilterWithDataOwner extends SortableFilterBuilder<HealthElement, DeviceFilterSortStepDecorator> implements BaseHealthElementFilterBuilder<HealthElementFilterWithDataOwner>, FilterBuilder<HealthElement> {
    _dataOwnerId: Promise<string>

    constructor(private api: CommonApi, dataOwnerId?: string) {
        super()
        this._dataOwnerId = !!dataOwnerId ? Promise.resolve(dataOwnerId) : api.baseApi.userApi.getCurrentUser().then((u) => api.baseApi.dataOwnerApi.getDataOwnerIdOf(u))
    }

    get sort(): DeviceFilterSortStepDecorator {
        return new DeviceFilterSortStepDecorator(this)
    }

    getDataOwner() {
        return this._dataOwnerId
    }

    byIds(byIds: string[]): HealthElementFilterWithDataOwner {
        this._builderAccumulator.addByIdsFilter(Promise.resolve({ ids: byIds, $type: 'HealthElementByIdsFilter' }), 'ids')
        return this
    }

    byIdentifiers(identifiers: Identifier[]): HealthElementFilterWithDataOwner {
        const filter = this._dataOwnerId.then((id) => {
            return {
                healthcarePartyId: id,
                identifiers: identifiers,
                $type: 'HealthElementByHealthcarePartyIdentifiersFilter',
            }
        })
        this._builderAccumulator.addFilter(filter)
        return this
    }

    byLabelCodeFilter(labelType?: string, labelCode?: string, codeType?: string, codeCode?: string): HealthElementFilterWithDataOwner {
        if (!labelType && !labelCode && !codeType && !codeCode) {
            throw Error('To instantiate the filter, you must specify at least one of these parameters: labelType, labelCode, codeType, or codeCode')
        }
        this._builderAccumulator.addFilter(
            Promise.resolve({
                tagType: labelType,
                tagCode: labelCode,
                codeType,
                codeCode,
                $type: 'HealthElementByHealthcarePartyLabelCodeFilter',
            })
        )
        return this
    }

    forPatients(patients: Patient[]): HealthElementFilterWithDataOwner {
        const filter = this._dataOwnerId.then((id) => {
            return Promise.all(patients.map((p) => this.api.baseApi.cryptoApi.xapi.secretIdsOf({ entity: p!, type: 'Patient' }, undefined)))
                .then((sfksForPatients) => sfksForPatients.flat())
                .then((sfks) => {
                    return {
                        healthcarePartyId: id,
                        patientSecretForeignKeys: sfks,
                        $type: 'HealthElementByHealthcarePartyPatientFilter',
                    }
                })
        })
        this._builderAccumulator.addByIdsFilter(filter, 'patientSecretForeignKeys')
        return this
    }

    async build(): Promise<Filter<HealthElement>> {
        const filters = await this._builderAccumulator.getAndSortFilters()

        if (filters.some((f) => NoOpFilter.isNoOp(f))) {
            console.warn('Warning: the filter you built cannot be resolved and will return no entity')
            return new NoOpFilter()
        } else if (filters.length > 1) {
            return {
                filters: filters,
                $type: 'IntersectionFilter',
            } as IntersectionFilter<HealthElement>
        } else if (filters.length === 1) {
            return filters[0]
        } else {
            return {
                healthcarePartyId: await this._dataOwnerId,
                $type: 'HealthElementByHealthcarePartyFilter',
            } as HealthElementByHealthcarePartyFilter
        }
    }
}

type NonSortableHealthElementFilter = BaseHealthElementFilterBuilder<HealthElementFilterWithDataOwner> & FilterBuilder<HealthElement>

class DeviceFilterSortStepDecorator implements BaseHealthElementFilterBuilder<NonSortableHealthElementFilter> {
    constructor(private healthcareElementFilter: HealthElementFilterWithDataOwner) {}

    byIds(byIds: string[]): NonSortableHealthElementFilter {
        this.healthcareElementFilter.byIds(byIds)
        this.healthcareElementFilter._builderAccumulator.setLastElementAsSortKey()
        return this.healthcareElementFilter
    }

    byIdentifiers(identifiers: Identifier[]): NonSortableHealthElementFilter {
        this.healthcareElementFilter.byIdentifiers(identifiers)
        this.healthcareElementFilter._builderAccumulator.setLastElementAsSortKey()
        return this.healthcareElementFilter
    }

    byLabelCodeFilter(labelType?: string, labelCode?: string, codeType?: string, codeCode?: string): NonSortableHealthElementFilter {
        this.healthcareElementFilter.byLabelCodeFilter(labelType, labelCode, codeType, codeCode)
        this.healthcareElementFilter._builderAccumulator.setLastElementAsSortKey()
        return this.healthcareElementFilter
    }

    forPatients(patients: Patient[]): NonSortableHealthElementFilter {
        this.healthcareElementFilter.forPatients(patients)
        this.healthcareElementFilter._builderAccumulator.setLastElementAsSortKey()
        return this.healthcareElementFilter
    }
}
