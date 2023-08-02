import { FilterBuilder, NoOpFilter, SortableFilterBuilder } from './filterDsl'
import { AllHealthcarePartiesFilter, HealthcarePartyByIdsFilter, HealthcarePartyByLabelCodeFilter, HealthcarePartyByNameFilter } from '../hcp'
import { Filter } from '../Filter'
import { IntersectionFilter } from '../IntersectionFilter'
import { HealthcareParty } from '@icure/api'
import { CommonApi } from '../../apis/CommonApi'

interface BaseHealthcarePartyFilterBuilder<F> {
    /**
     * Includes all the healthcare professionals with the specified ids.
     * @param byIds the ids of the healthcare professionals.
     */
    byIds(byIds: string[]): F

    /**
     * Includes all the healthcare professionals that have the label or the code specified. At least one of the parameters
     * must be not null.
     * @param labelType the type of the label, if undefined it will be ignored.
     * @param labelCode the code of the label, if undefined it will be ignored.
     * @param codeType the type of the code, if undefined it will be ignored.
     * @param codeCode the code of the code, if undefined it will be ignored.
     */
    byLabelCodeFilter(labelType?: string, labelCode?: string, codeType?: string, codeCode?: string): F

    /**
     * Includes all the healthcare professionals which name includes the string passed as parameter.
     * @param searchString the name of the healthcare professionals
     */
    byMatches(searchString: string): F
}

export class HealthcarePartyFilter extends SortableFilterBuilder<HealthcareParty, HealthcarePartyFilterSortStepDecorator> implements BaseHealthcarePartyFilterBuilder<HealthcarePartyFilter>, FilterBuilder<HealthcareParty> {
    constructor(_: CommonApi) {
        super()
    }

    get sort(): HealthcarePartyFilterSortStepDecorator {
        return new HealthcarePartyFilterSortStepDecorator(this)
    }

    byIds(byIds: string[]): HealthcarePartyFilter {
        this._builderAccumulator.addByIdsFilter(
            Promise.resolve({
                ids: byIds,
                $type: 'HealthcarePartyByIdsFilter',
            }),
            'ids',
        )
        return this
    }

    byLabelCodeFilter(labelType?: string, labelCode?: string, codeType?: string, codeCode?: string): HealthcarePartyFilter {
        if (!labelType && !labelCode && !codeType && !codeCode) {
            throw Error('To instantiate the filter, you must specify at least one of these parameters: labelType, labelCode, codeType, or codeCode')
        }
        this._builderAccumulator.addFilter(
            Promise.resolve({
                labelType,
                labelCode,
                codeType,
                codeCode,
                $type: 'HealthcarePartyByLabelCodeFilter',
            }),
        )
        return this
    }

    byMatches(searchString: string): HealthcarePartyFilter {
        this._builderAccumulator.addFilter(Promise.resolve({ name: searchString, $type: 'HealthcarePartyByNameFilter' }))
        return this
    }

    async build(): Promise<Filter<HealthcareParty>> {
        const filters = await this._builderAccumulator.getAndSortFilters()

        if (filters.some((f) => NoOpFilter.isNoOp(f))) {
            console.warn('Warning: the filter you built cannot be resolved and will return no entity')
            return new NoOpFilter()
        } else if (filters.length > 1) {
            return {
                filters: filters,
                $type: 'IntersectionFilter',
            } as IntersectionFilter<HealthcareParty>
        } else if (filters.length === 1) {
            return filters[0]
        } else {
            return { $type: 'AllHealthcarePartiesFilter' } as AllHealthcarePartiesFilter
        }
    }
}

type NonSortableHealthcarePartyFilter = BaseHealthcarePartyFilterBuilder<HealthcarePartyFilter> & FilterBuilder<HealthcareParty>

class HealthcarePartyFilterSortStepDecorator implements BaseHealthcarePartyFilterBuilder<NonSortableHealthcarePartyFilter> {
    constructor(private healthcareProfessionalFilter: HealthcarePartyFilter) {}

    byIds(byIds: string[]): NonSortableHealthcarePartyFilter {
        this.healthcareProfessionalFilter.byIds(byIds)
        this.healthcareProfessionalFilter._builderAccumulator.setLastElementAsSortKey()
        return this.healthcareProfessionalFilter
    }

    byLabelCodeFilter(labelType?: string, labelCode?: string, codeType?: string, codeCode?: string): NonSortableHealthcarePartyFilter {
        this.healthcareProfessionalFilter.byLabelCodeFilter(labelType, labelCode, codeType, codeCode)
        this.healthcareProfessionalFilter._builderAccumulator.setLastElementAsSortKey()
        return this.healthcareProfessionalFilter
    }

    byMatches(searchString: string): NonSortableHealthcarePartyFilter {
        this.healthcareProfessionalFilter.byMatches(searchString)
        this.healthcareProfessionalFilter._builderAccumulator.setLastElementAsSortKey()
        return this.healthcareProfessionalFilter
    }
}
