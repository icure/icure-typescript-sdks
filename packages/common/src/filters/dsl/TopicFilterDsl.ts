import { DataOwnerFilterBuilder, FilterBuilder, NoOpFilter, SortableFilterBuilder } from './filterDsl'
import { Topic } from '@icure/api'
import { CommonApi } from '../../apis/CommonApi'
import { Filter } from '../Filter'
import { IntersectionFilter } from '../IntersectionFilter'
import { TopicByHcPartyFilter } from '../topic'

export class TopicFilter implements DataOwnerFilterBuilder<Topic, TopicFilterWithDataOwner> {
    constructor(private api: CommonApi) {}

    forDataOwner(dataOwnerId: string): TopicFilterWithDataOwner {
        return new TopicFilterWithDataOwner(this.api, dataOwnerId)
    }

    forSelf(): TopicFilterWithDataOwner {
        return new TopicFilterWithDataOwner(this.api)
    }
}

interface BaseTopicFilterBuilder<F> {
    /**
     * Includes all the topics with the specified participant.
     * @param participantId the data owner id of the participant.
     */
    byParticipant(participantId: string): F
}

type NonSortableTopicFilter = BaseTopicFilterBuilder<TopicFilterWithDataOwner> & FilterBuilder<Topic>

class TopicFilterWithDataOwner extends SortableFilterBuilder<Topic, TopicFilterSortStepDecorator> implements BaseTopicFilterBuilder<TopicFilterWithDataOwner>, FilterBuilder<Topic> {
    _dataOwnerId: Promise<string>

    constructor(api: CommonApi, dataOwnerId?: string) {
        super()
        this._dataOwnerId = !!dataOwnerId ? Promise.resolve(dataOwnerId) : api.baseApi.userApi.getCurrentUser().then((u) => api.baseApi.dataOwnerApi.getDataOwnerIdOf(u))
    }

    get sort(): TopicFilterSortStepDecorator {
        return new TopicFilterSortStepDecorator(this)
    }

    byParticipant(participantId: string): TopicFilterWithDataOwner {
        const filter = {
            participantId: participantId,
            $type: 'TopicByParticipantFilter',
        }
        this._builderAccumulator.addFilter(Promise.resolve(filter))
        return this
    }

    async build(): Promise<Filter<Topic>> {
        const filters = await this._builderAccumulator.getAndSortFilters()

        if (filters.some((f) => NoOpFilter.isNoOp(f))) {
            console.warn('Warning: the filter you built cannot be resolved and will return no entity')
            return new NoOpFilter()
        } else if (filters.length > 1) {
            return {
                filters: filters,
                $type: 'IntersectionFilter',
            } as IntersectionFilter<Topic>
        } else if (filters.length === 1) {
            return filters[0]
        } else {
            return {
                hcpId: await this._dataOwnerId,
                $type: 'TopicByHcPartyFilter',
            } as TopicByHcPartyFilter
        }
    }
}

class TopicFilterSortStepDecorator implements BaseTopicFilterBuilder<NonSortableTopicFilter> {
    constructor(private topicFilter: TopicFilterWithDataOwner) {}

    byParticipant(participantId: string): NonSortableTopicFilter {
        this.topicFilter.byParticipant(participantId)
        this.topicFilter._builderAccumulator.setLastElementAsSortKey()
        return this.topicFilter
    }
}
