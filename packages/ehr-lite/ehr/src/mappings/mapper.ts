import {CamelCaseNamingConvention, createMapper} from "@automapper/core";
import {classes} from "@automapper/classes";
import {initializeConditionMapper} from "./healthelement/Condition.mapper";
import {initializeIdentifierMapper} from "./Identifier.mapper";
import {initializeCodingReferenceMapper} from "./CodingReference.mapper";
import {initializeAnnotationMapper} from "./Annotation.mapper";

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

export const initializeMapper = () => {
    initializeAnnotationMapper()
    initializeCodingReferenceMapper()
    initializeConditionMapper()
    initializeIdentifierMapper()
}
