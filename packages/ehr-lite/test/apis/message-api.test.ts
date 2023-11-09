import { ConditionApiAware, DataOwnerApiAware, EhrLiteBaseTestContext, MessageApiAware, ObservationApiAware, PatientApiAware, PractitionerApiAware, TopicApiAware } from './TestContexts'
import { testMessageLikeApi } from '../../../common-test/apis/message-like-api'

const MessageApiTestContext = MessageApiAware(TopicApiAware(PractitionerApiAware(PatientApiAware(DataOwnerApiAware(ObservationApiAware(ConditionApiAware(EhrLiteBaseTestContext)))))))

testMessageLikeApi('EhrLite Message', new MessageApiTestContext())
