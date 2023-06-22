import { classes } from '@automapper/classes';
import { CamelCaseNamingConvention, Mapper, createMapper } from '@automapper/core';
import { initializeComponentMapper } from "./Component.mapper";
import { initializeConditionMapper } from "./Condition.mapper";
import { initializeContactPointMapper } from "./ContactPoint.mapper";
import { initializeHumanNameMapper } from "./HumanName.mapper";
import { initializeLocalComponentMapper } from "./LocalComponent.mapper";
import { initializeLocationMapper } from "./Location.mapper";
import { initializeObservationMapper } from "./Observation.mapper";
import { initializeOrganisationMapper } from "./Organisation.mapper";
import { initializePatientMapper } from "./Patient.mapper";
import { initializePractitionerMapper } from "./Practitioner.mapper";
import { initializeRelatedPersonMapper } from "./RelatedPerson.mapper";
import { initializeRelatedPractitionerMapper } from "./RelatedPractitioner.mapper";

export const mapper = createMapper({
    strategyInitializer: classes(),
    namingConventions: {
        source: new CamelCaseNamingConvention(),
        destination: new CamelCaseNamingConvention(),
    },
})

export function initializeMapper(mapper: Mapper) {
    initializeComponentMapper(mapper)
    initializeConditionMapper(mapper)
    initializeContactPointMapper(mapper)
    initializeHumanNameMapper(mapper)
    initializeLocalComponentMapper(mapper)
    initializeLocationMapper(mapper)
    initializeObservationMapper(mapper)
    initializeOrganisationMapper(mapper)
    initializePatientMapper(mapper)
    initializePractitionerMapper(mapper)
    initializeRelatedPersonMapper(mapper)
    initializeRelatedPractitionerMapper(mapper)
}
