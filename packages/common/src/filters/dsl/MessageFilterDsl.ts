import { DataOwnerFilterBuilder, FilterBuilder, NoOpFilter, SortableFilterBuilder } from './filterDsl'
import { Message } from '@icure/api'
import { Filter } from '../Filter'
import { CommonApi } from '../../apis/CommonApi'
import { IntersectionFilter } from '../IntersectionFilter'
import { MessageByHcPartyFilter } from '../message'

export class MessageFilter implements DataOwnerFilterBuilder<Message, MessageFilterWithDataOwner> {
    constructor(private api: CommonApi) {}

    forDataOwner(dataOwnerId: string): MessageFilterWithDataOwner {
        return new MessageFilterWithDataOwner(this.api, dataOwnerId)
    }

    forSelf(): MessageFilterWithDataOwner {
        return new MessageFilterWithDataOwner(this.api)
    }
}

interface BaseMessageFilterBuilder<F> {
    byTransportGuid(transportGuid: string, latest: boolean): F
}

class MessageFilterWithDataOwner extends SortableFilterBuilder<Message, MessageFilterSortStepDecorator> implements BaseMessageFilterBuilder<MessageFilterWithDataOwner>, FilterBuilder<Message> {
    _dataOwnerId: Promise<string>

    constructor(api: CommonApi, dataOwnerId?: string) {
        super()
        this._dataOwnerId = !!dataOwnerId ? Promise.resolve(dataOwnerId) : api.baseApi.userApi.getCurrentUser().then((u) => api.baseApi.dataOwnerApi.getDataOwnerIdOf(u))
    }

    async build(): Promise<Filter<Message>> {
        const filters = await this._builderAccumulator.getAndSortFilters()

        if (filters.some((f) => NoOpFilter.isNoOp(f))) {
            console.warn('Warning: the filter you built cannot be resolved and will return no entity')
            return new NoOpFilter()
        } else if (filters.length > 1) {
            return {
                filters: filters,
                $type: 'IntersectionFilter',
            } as IntersectionFilter<Message>
        } else if (filters.length === 1) {
            return filters[0]
        } else {
            return {
                hcpId: await this._dataOwnerId,
                $type: 'MessageByHcPartyFilter',
            } as MessageByHcPartyFilter
        }
    }

    get sort(): MessageFilterSortStepDecorator {
        return new MessageFilterSortStepDecorator(this)
    }

    byTransportGuid(transportGuid: string, latest: boolean): MessageFilterWithDataOwner {
        const filter = this._dataOwnerId.then((dataOwnerId) => ({
            transportGuid: transportGuid,
            healthcarePartyId: dataOwnerId,
            $type: latest ? 'LatestMessageByHcPartyTransportGuidFilter' : 'MessageByHcPartyTransportGuidFilter',
        }))
        this._builderAccumulator.addSingletonFilter(filter)
        return this
    }
}

type NonSortableMessageFilter = BaseMessageFilterBuilder<MessageFilterWithDataOwner> & FilterBuilder<Message>

class MessageFilterSortStepDecorator implements BaseMessageFilterBuilder<NonSortableMessageFilter> {
    constructor(private topicFilter: MessageFilterWithDataOwner) {}

    byTransportGuid(transportGuid: string, latest: boolean): NonSortableMessageFilter {
        this.topicFilter.byTransportGuid(transportGuid, latest)
        this.topicFilter._builderAccumulator.setLastElementAsSortKey()
        return this.topicFilter
    }
}
