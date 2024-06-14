import { EntityWithDelegationTypeName, HealthElement, IntersectionFilter } from '@icure/api'
import { Filter } from '../Filter'
import { DataOwnerFilterBuilder, FilterBuilder, NoOpFilter, SortableFilterBuilder } from './filterDsl'
import { CommonApi } from '../../apis/CommonApi'
import { HealthElementByHealthcarePartyFilter } from '../healthelement'
import { Mapper } from '../../apis/Mapper'
import { Identifier } from '../../models/Identifier.model'
import { mapIdentifierToIdentifierDto } from '../../mappers/Identifier.mapper'
import { PatientDto } from '../../index'

export class HealthElementFilter<DSPatient> implements DataOwnerFilterBuilder<HealthElement, HealthElementFilterWithDataOwner<DSPatient>> {
    constructor(
        private api: CommonApi,
        private patientMapper: Mapper<DSPatient, PatientDto>,
    ) {}

    forDataOwner(dataOwnerId: string): HealthElementFilterWithDataOwner<DSPatient> {
        return new HealthElementFilterWithDataOwner(this.api, this.patientMapper, dataOwnerId)
    }

    forSelf(): HealthElementFilterWithDataOwner<DSPatient> {
        return new HealthElementFilterWithDataOwner(this.api, this.patientMapper)
    }
}

interface BaseHealthElementFilterBuilder<F, DSPatient> {
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
    forPatients(patients: DSPatient[]): F
}

export class HealthElementFilterWithDataOwner<DSPatient> extends SortableFilterBuilder<HealthElement, HealthElementFilterSortStepDecorator<DSPatient>> implements BaseHealthElementFilterBuilder<HealthElementFilterWithDataOwner<DSPatient>, DSPatient>, FilterBuilder<HealthElement> {
    _dataOwnerId: Promise<string>

    constructor(
        private api: CommonApi,
        private patientMapper: Mapper<DSPatient, PatientDto>,
        dataOwnerId?: string,
    ) {
        super()
        this._dataOwnerId = !!dataOwnerId ? Promise.resolve(dataOwnerId) : api.baseApi.userApi.getCurrentUser().then((u) => api.baseApi.dataOwnerApi.getDataOwnerIdOf(u))
    }

    get sort(): HealthElementFilterSortStepDecorator<DSPatient> {
        return new HealthElementFilterSortStepDecorator(this)
    }

    getDataOwner() {
        return this._dataOwnerId
    }

    byIds(byIds: string[]): HealthElementFilterWithDataOwner<DSPatient> {
        this._builderAccumulator.addByIdsFilter(Promise.resolve({ ids: byIds, $type: 'HealthElementByIdsFilter' }), 'ids')
        return this
    }

    byIdentifiers(identifiers: Identifier[]): HealthElementFilterWithDataOwner<DSPatient> {
        const dtos = identifiers.map(mapIdentifierToIdentifierDto)

        const filter = this._dataOwnerId.then((id) => {
            return {
                healthcarePartyId: id,
                identifiers: dtos,
                $type: 'HealthElementByHealthcarePartyIdentifiersFilter',
            }
        })
        this._builderAccumulator.addFilter(filter)
        return this
    }

    byLabelCodeFilter(labelType?: string, labelCode?: string, codeType?: string, codeCode?: string): HealthElementFilterWithDataOwner<DSPatient> {
        if (!labelType && !labelCode && !codeType && !codeCode) {
            throw Error('To instantiate the filter, you must specify at least one of these parameters: labelType, labelCode, codeType, or codeCode')
        }

        const filter = this._dataOwnerId.then((id) => {
            return {
                healthcarePartyId: id,
                tagType: labelType,
                tagCode: labelCode,
                codeType,
                codeCode,
                $type: 'HealthElementByHealthcarePartyTagCodeFilter',
            }
        })
        this._builderAccumulator.addFilter(filter)
        return this
    }

    forPatients(patients: DSPatient[]): HealthElementFilterWithDataOwner<DSPatient> {
        const filter = this._dataOwnerId.then((id) => {
            const mappedPatients = patients.map((p) => this.patientMapper.toDto(p))
            return Promise.all(
                mappedPatients.map((p) =>
                    this.api.baseApi.cryptoApi.xapi.secretIdsOf(
                        {
                            type: EntityWithDelegationTypeName.Patient,
                            entity: p,
                        },
                        undefined,
                    ),
                ),
            )
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

type NonSortableHealthElementFilter<DSPatient> = BaseHealthElementFilterBuilder<HealthElementFilterWithDataOwner<DSPatient>, DSPatient> & FilterBuilder<HealthElement>

class HealthElementFilterSortStepDecorator<DSPatient> implements BaseHealthElementFilterBuilder<NonSortableHealthElementFilter<DSPatient>, DSPatient> {
    constructor(private healthcareElementFilter: HealthElementFilterWithDataOwner<DSPatient>) {}

    byIds(byIds: string[]): NonSortableHealthElementFilter<DSPatient> {
        this.healthcareElementFilter.byIds(byIds)
        this.healthcareElementFilter._builderAccumulator.setLastElementAsSortKey()
        return this.healthcareElementFilter
    }

    byIdentifiers(identifiers: Identifier[]): NonSortableHealthElementFilter<DSPatient> {
        this.healthcareElementFilter.byIdentifiers(identifiers)
        this.healthcareElementFilter._builderAccumulator.setLastElementAsSortKey()
        return this.healthcareElementFilter
    }

    byLabelCodeFilter(labelType?: string, labelCode?: string, codeType?: string, codeCode?: string): NonSortableHealthElementFilter<DSPatient> {
        this.healthcareElementFilter.byLabelCodeFilter(labelType, labelCode, codeType, codeCode)
        this.healthcareElementFilter._builderAccumulator.setLastElementAsSortKey()
        return this.healthcareElementFilter
    }

    forPatients(patients: DSPatient[]): NonSortableHealthElementFilter<DSPatient> {
        this.healthcareElementFilter.forPatients(patients)
        this.healthcareElementFilter._builderAccumulator.setLastElementAsSortKey()
        return this.healthcareElementFilter
    }
}
