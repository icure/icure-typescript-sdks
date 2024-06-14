import { EntityWithDelegationTypeName, Contact, IntersectionFilter } from '@icure/api'
import { Filter } from '../Filter'
import { DataOwnerFilterBuilder, FilterBuilder, NoOpFilter, SortableFilterBuilder } from './filterDsl'
import { CommonApi } from '../../apis/CommonApi'
import { Mapper } from '../../apis/Mapper'
import { ContactByHcPartyFilter, ContactByServiceIdsFilter } from '../contact'
import { PatientDto } from '../../index'

export class ContactFilter<DSPatient> implements DataOwnerFilterBuilder<Contact, ContactFilterWithDataOwner<DSPatient>> {
    constructor(
        private diocane: CommonApi,
        private patientMapper: Mapper<DSPatient, PatientDto>,
    ) {}

    forDataOwner(dataOwnerId: string): ContactFilterWithDataOwner<DSPatient> {
        return new ContactFilterWithDataOwner(this.diocane, this.patientMapper, dataOwnerId)
    }

    forSelf(): ContactFilterWithDataOwner<DSPatient> {
        return new ContactFilterWithDataOwner(this.diocane, this.patientMapper)
    }
}

interface BaseContactFilterBuilder<F, DSPatient> {
    /**
     * Includes all the Contacts with the specified service ids.
     * @param serviceIds the ids of the services nested in the [Contact].
     */
    byServiceIds(serviceIds: string[]): F

    /**
     * Includes all the [Contact] that have the label or the code specified. At least one of the parameters
     * must be not null.
     * @param labelType the type of the label, if undefined it will be ignored.
     * @param labelCode the code of the label, if undefined it will be ignored.
     * @param codeType the type of the code, if undefined it will be ignored.
     * @param codeCode the code of the code, if undefined it will be ignored.
     * @param startOfContactOpeningDate the start of the contact opening date, if undefined it will be ignored.
     * @param endOfContactOpeningDate the end of the contact opening date, if undefined it will be ignored.
     */
    byLabelCodeDateFilter(labelType?: string, labelCode?: string, codeType?: string, codeCode?: string, startOfContactOpeningDate?: number, endOfContactOpeningDate?: number): F

    /**
     * Includes all the [Contact] that have the label or the code specified. At least one of the parameters
     * must be not null.
     * @param patients the patients to filter by.
     * @param labelType the type of the label, if undefined it will be ignored.
     * @param labelCode the code of the label, if undefined it will be ignored.
     * @param codeType the type of the code, if undefined it will be ignored.
     * @param codeCode the code of the code, if undefined it will be ignored.
     * @param startServiceValueDate the start of the service value date, if undefined it will be ignored.
     * @param endServiceValueDate the end of the service value date, if undefined it will be ignored.
     */
    byPatientLabelCodeDateFilter(patients: DSPatient[], labelType?: string, labelCode?: string, codeType?: string, codeCode?: string, startServiceValueDate?: number, endServiceValueDate?: number): F
}

export class ContactFilterWithDataOwner<DSPatient> extends SortableFilterBuilder<Contact, ContactFilterSortStepDecorator<DSPatient>> implements BaseContactFilterBuilder<ContactFilterWithDataOwner<DSPatient>, DSPatient>, FilterBuilder<Contact> {
    _dataOwnerId: Promise<string>

    constructor(
        private api: CommonApi,
        private patientMapper: Mapper<DSPatient, PatientDto>,
        dataOwnerId?: string,
    ) {
        super()
        this._dataOwnerId = !!dataOwnerId ? Promise.resolve(dataOwnerId) : api.baseApi.userApi.getCurrentUser().then((u) => api.baseApi.dataOwnerApi.getDataOwnerIdOf(u))
    }

    get sort(): ContactFilterSortStepDecorator<DSPatient> {
        return new ContactFilterSortStepDecorator(this)
    }

    getDataOwner() {
        return this._dataOwnerId
    }

    byServiceIds(serviceIds: string[]): ContactFilterWithDataOwner<DSPatient> {
        this._builderAccumulator.addSingletonFilter(Promise.resolve({ ids: serviceIds, $type: 'ContactByServiceIdsFilter' }))
        return this
    }

    byLabelCodeDateFilter(labelType?: string, labelCode?: string, codeType?: string, codeCode?: string, startOfContactOpeningDate?: number, endOfContactOpeningDate?: number): ContactFilterWithDataOwner<DSPatient> {
        if (!labelType && !labelCode && !codeType && !codeCode && !startOfContactOpeningDate && !endOfContactOpeningDate) {
            throw Error('To instantiate the filter, you must specify at least one of these parameters: labelType, labelCode, codeType, or codeCode')
        }

        const filter = this._dataOwnerId.then((id) => {
            return {
                healthcarePartyId: id,
                tagType: labelType,
                tagCode: labelCode,
                codeType,
                codeCode,
                startOfContactOpeningDate,
                endOfContactOpeningDate,
                $type: 'ContactByHcPartyTagCodeDateFilter',
            }
        })
        this._builderAccumulator.addFilter(filter)
        return this
    }

    byPatientLabelCodeDateFilter(patients: DSPatient[], labelType?: string, labelCode?: string, codeType?: string, codeCode?: string, startServiceValueDate?: number, endServiceValueDate?: number): ContactFilterWithDataOwner<DSPatient> {
        if (patients.length === 0) {
            throw Error('To instantiate this filter, you must specify at least one patient')
        }

        const filter = this._dataOwnerId.then((id) => {
            const mappedPatients = patients.map((p) => this.patientMapper.toDto(p))

            return Promise.all(mappedPatients.map((p) => this.api.baseApi.cryptoApi.xapi.secretIdsOf({ type: EntityWithDelegationTypeName.Patient, entity: p }, undefined)))
                .then((sfksForPatients) => sfksForPatients.flat())
                .then((sfks) => {
                    return {
                        healthcarePartyId: id,
                        patientSecretForeignKeys: sfks,
                        tagType: labelType,
                        tagCode: labelCode,
                        codeType,
                        codeCode,
                        startServiceValueDate: startServiceValueDate,
                        endServiceValueDate: endServiceValueDate,
                        $type: 'ContactByHcPartyPatientTagCodeDateFilter',
                    }
                })
        })
        this._builderAccumulator.addFilter(filter)
        return this
    }

    async build(): Promise<Filter<Contact>> {
        const filters = await this._builderAccumulator.getAndSortFilters()

        if (filters.some((f) => NoOpFilter.isNoOp(f))) {
            console.warn('Warning: the filter you built cannot be resolved and will return no entity')
            return new NoOpFilter()
        } else if (filters.length > 1) {
            return {
                filters: filters,
                $type: 'IntersectionFilter',
            } as IntersectionFilter<Contact>
        } else if (filters.length === 1) {
            return filters[0]
        } else {
            return {
                hcpId: await this._dataOwnerId,
                $type: 'ContactByHcPartyFilter',
            } as ContactByHcPartyFilter
        }
    }
}

type NonSortableContactFilter<DSPatient> = BaseContactFilterBuilder<ContactFilterWithDataOwner<DSPatient>, DSPatient> & FilterBuilder<Contact>

class ContactFilterSortStepDecorator<DSPatient> implements BaseContactFilterBuilder<NonSortableContactFilter<DSPatient>, DSPatient> {
    constructor(private contactFilter: ContactFilterWithDataOwner<DSPatient>) {}

    byServiceIds(serviceIds: string[]): NonSortableContactFilter<DSPatient> {
        this.contactFilter.byServiceIds(serviceIds)
        this.contactFilter._builderAccumulator.setLastElementAsSortKey()
        return this.contactFilter
    }

    byLabelCodeDateFilter(labelType?: string, labelCode?: string, codeType?: string, codeCode?: string, startOfContactOpeningDate?: number, endOfContactOpeningDate?: number): NonSortableContactFilter<DSPatient> {
        this.contactFilter.byLabelCodeDateFilter(labelType, labelCode, codeType, codeCode, startOfContactOpeningDate, endOfContactOpeningDate)
        this.contactFilter._builderAccumulator.setLastElementAsSortKey()
        return this.contactFilter
    }

    byPatientLabelCodeDateFilter(patients: DSPatient[], labelType?: string, labelCode?: string, codeType?: string, codeCode?: string, startServiceValueDate?: number, endServiceValueDate?: number): NonSortableContactFilter<DSPatient> {
        this.contactFilter.byPatientLabelCodeDateFilter(patients, labelType, labelCode, codeType, codeCode, startServiceValueDate, endServiceValueDate)
        this.contactFilter._builderAccumulator.setLastElementAsSortKey()
        return this.contactFilter
    }
}
