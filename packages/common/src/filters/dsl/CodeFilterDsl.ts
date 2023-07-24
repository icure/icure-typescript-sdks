import { FilterBuilder, NoOpFilter, SortableFilterBuilder } from './filterDsl'
import { CodeByRegionTypeLabelFilter } from '../code/CodeByRegionTypeLabelFilter'
import { Filter } from '../Filter'
import { AllCodesFilter } from '../code/AllCodesFilter'
import { Code, IntersectionFilter } from '@icure/api'
import { CodeByIdsFilter } from '../code/CodeByIdsFilter'
import { CommonApi } from '../../apis/CommonApi'

interface BaseCodeFilterBuilder<F> {
    /**
     * Includes all the codes with the specified ids.
     * @param byIds the ids of the codes.
     */
    byIds(byIds: string[]): F

    /**
     * Includes all the codes with the specified region, language, type, and label.
     * At least one of the parameters must be specified.
     * @param region the region of the code, if undefined it will be ignored.
     * @param language the language of the code, if undefined it will be ignored.
     * @param type the type of the code, if undefined it will be ignored.
     * @param label the label of the code, if undefined it will be ignored.
     */
    byRegionLanguageTypeLabel(region?: string, language?: string, type?: string, label?: string): F
}

export class CodeFilter extends SortableFilterBuilder<Code, CodeFilterSortStepDecorator> implements BaseCodeFilterBuilder<CodeFilter>, FilterBuilder<Code> {
    constructor(_: CommonApi) {
        super()
    }

    get sort(): CodeFilterSortStepDecorator {
        return new CodeFilterSortStepDecorator(this)
    }

    byIds(byIds: string[]): CodeFilter {
        this._builderAccumulator.addByIdsFilter(Promise.resolve({ ids: byIds, $type: 'CodeByIdsFilter' }), 'ids')
        return this
    }

    byRegionLanguageTypeLabel(region?: string, language?: string, type?: string, label?: string): CodeFilter {
        if (!region && !language && !type && !label) {
            throw Error('To instantiate the filter, you must specify at least one of these parameters: labelType, labelCode, codeType, or codeCode')
        }
        this._builderAccumulator.addFilter(Promise.resolve({ region, type, language, label, $type: 'CodeByRegionTypeLabelFilter' }))
        return this
    }

    async build(): Promise<Filter<Code>> {
        const filters = await this._builderAccumulator.getAndSortFilters()

        if (filters.some((f) => NoOpFilter.isNoOp(f))) {
            console.warn('Warning: the filter you built cannot be resolved and will return no entity')
            return new NoOpFilter()
        } else if (filters.length > 1) {
            return {
                filters: filters,
                $type: 'IntersectionFilter',
            } as IntersectionFilter<Code>
        } else if (filters.length === 1) {
            return filters[0]
        } else {
            return { $type: 'AllCodesFilter' } as AllCodesFilter
        }
    }
}

type NonSortableCodeFilter = BaseCodeFilterBuilder<CodeFilter> & FilterBuilder<CodeFilter>

class CodeFilterSortStepDecorator implements BaseCodeFilterBuilder<NonSortableCodeFilter> {
    constructor(private codeFilter: CodeFilter) {}

    byIds(byIds: string[]): NonSortableCodeFilter {
        this.codeFilter.byIds(byIds)
        this.codeFilter._builderAccumulator.setLastElementAsSortKey()
        return this.codeFilter
    }

    byRegionLanguageTypeLabel(region?: string, language?: string, type?: string, label?: string): NonSortableCodeFilter {
        this.codeFilter.byRegionLanguageTypeLabel(region, language, type, label)
        this.codeFilter._builderAccumulator.setLastElementAsSortKey()
        return this.codeFilter
    }
}
