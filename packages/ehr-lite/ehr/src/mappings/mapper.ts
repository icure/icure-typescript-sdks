import { classes } from '@automapper/classes'
import { CamelCaseNamingConvention, createMapper } from '@automapper/core'
import { initializeAnnotationMapper } from './Annotation.mapper'
import { initializeCodingReferenceMapper } from './CodingReference.mapper'
import { initializeComponentMapper } from "./Component.mapper"
import { initializeConditionMapper } from './Condition.mapper'
import { initializeContactPointMapper } from "./ContactPoint.mapper"
import { initializeDelegationMapper } from "./Delegation.mapper"
import { initializeHumanNameMapper } from "./HumanName.mapper"
import { initializeIdentifierMapper } from './Identifier.mapper'
import { initializeLocalComponentMapper } from "./LocalComponent.mapper"
import { initializeLocationMapper } from "./Location.mapper"
import { initializeMeasureMapper } from "./Measure.mapper"
import { initializeObservationMapper } from "./Observation.mapper"
import { initializeOrganisationMapper } from "./Organisation.mapper"
import { initializePatientMapper } from "./Patient.mapper"
import { initializePractitionerMapper } from "./Practitioner.mapper"
import { initializePropertyMapper } from "./Property.mapper"
import { initializePropertyTypeMapper } from "./PropertyType.mapper"
import { initializeRelatedPersonMapper } from "./RelatedPerson.mapper"
import { initializeRelatedPractitionerMapper } from "./RelatedPractitioner.mapper"
import { initializeSecureDelegationMapper } from "./SecureDelegation.mapper"
import { initializeSecurityMetadataMapper } from "./SecurityMetadata.mapper"
import { initializeTimeSeriesMapper } from "./TimeSeries.mapper"
import { initializeTypedValueObjectMapper } from "./TypedValueObject.mapper"

export const mapper = createMapper({
    strategyInitializer: classes(),
    namingConventions: {
        source: new CamelCaseNamingConvention(),
        destination: new CamelCaseNamingConvention(),
    },
})

export function mapTo(targetClass: Function) {
    return function (constructor: Function) {
        Reflect.defineMetadata('mapTo', targetClass, constructor)
    }
}

export function initializeMapper() {
    initializeAnnotationMapper()
    initializeCodingReferenceMapper()
    initializeComponentMapper()
    initializeConditionMapper()
    initializeContactPointMapper()
    initializeDelegationMapper()
    initializeHumanNameMapper()
    initializeIdentifierMapper()
    initializeLocalComponentMapper()
    initializeLocationMapper()
    initializeMeasureMapper()
    initializeObservationMapper()
    initializeOrganisationMapper()
    initializePatientMapper()
    initializePractitionerMapper()
    initializePropertyMapper()
    initializePropertyTypeMapper()
    initializeRelatedPersonMapper()
    initializeRelatedPractitionerMapper()
    initializeSecureDelegationMapper()
    initializeSecurityMetadataMapper()
    initializeTimeSeriesMapper()
    initializeTypedValueObjectMapper()
}
