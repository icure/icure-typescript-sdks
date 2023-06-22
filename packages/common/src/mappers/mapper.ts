import { classes } from '@automapper/classes';
import { CamelCaseNamingConvention, createMapper, Mapper } from "@automapper/core";
import { initializeAnnotationMapper } from "./Annotation.mapper";
import { initializeCodingMapper } from "./Coding.mapper";
import { initializeCodingReferenceMapper } from "./CodingReference.mapper";
import { initializeDelegationMapper } from "./Delegation.mapper";
import { initializeDocumentMapper } from "./Document.mapper";
import { initializeIdentifierMapper } from "./Identifier.mapper";
import { initializeMeasureMapper } from "./Measure.mapper";
import { initializeNotificationMapper } from "./Notification.mapper";
import { initializePropertyMapper } from "./Property.mapper";
import { initializePropertyTypeMapper } from "./PropertyType.mapper";
import { initializeSecureDelegationMapper } from "./SecureDelegation.mapper";
import { initializeSecurityMetadataMapper } from "./SecurityMetadata.mapper";
import { initializeTimeSeriesMapper } from "./TimeSeries.mapper";
import { initializeTypedValueObjectMapper } from "./TypedValueObject.mapper";
import { initializeUserMapper } from "./User.mapper";

export const mapper: Mapper = createMapper({
    strategyInitializer: classes(),
    namingConventions: {
        source: new CamelCaseNamingConvention(),
        destination: new CamelCaseNamingConvention(),
    },
})

export function initializeMapper(mapper: Mapper) {
    initializeAnnotationMapper(mapper)
    initializeCodingMapper(mapper)
    initializeCodingReferenceMapper(mapper)
    initializeDelegationMapper(mapper)
    initializeDocumentMapper(mapper)
    initializeIdentifierMapper(mapper)
    initializeMeasureMapper(mapper)
    initializeNotificationMapper(mapper)
    initializePropertyMapper(mapper)
    initializePropertyTypeMapper(mapper)
    initializeSecureDelegationMapper(mapper)
    initializeSecurityMetadataMapper(mapper)
    initializeTimeSeriesMapper(mapper)
    initializeTypedValueObjectMapper(mapper)
    initializeUserMapper(mapper)
    initializeNotificationMapper(mapper)
}
