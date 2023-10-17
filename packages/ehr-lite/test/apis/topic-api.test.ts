import { ConditionApiAware, DataOwnerApiAware, EhrLiteBaseTestContext, ObservationApiAware, PatientApiAware, PractitionerApiAware, TopicApiAware } from './TestContexts'
import { testTopicLikeApi } from '../../../common-test/apis/topic-like-api'

const TopicApiTestContext = TopicApiAware(PractitionerApiAware(PatientApiAware(DataOwnerApiAware(ObservationApiAware(ConditionApiAware(EhrLiteBaseTestContext))))))

testTopicLikeApi('EhrLite Topic', new TopicApiTestContext())
