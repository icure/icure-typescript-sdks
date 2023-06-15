import { classes } from '@automapper/classes';
import { CamelCaseNamingConvention, createMapper } from "@automapper/core";
import { initializeCodingMapper } from "./Coding.mapper";
import { initializeCodingReferenceMapper } from "./CodingReference.mapper";
import { initializeDocumentMapper } from "./Document.mapper";
import { initializeIdentifierMapper } from "./Identifier.mapper";
import { initializeTimeSeriesMapper } from "./TimeSeries.mapper";
import { initializeUserMapper } from "./User.mapper";

export const mapper = createMapper({
    strategyInitializer: classes(),
    namingConventions: {
        source: new CamelCaseNamingConvention(),
        destination: new CamelCaseNamingConvention(),
    },
})
export { mapCodeToCoding, mapCodingToCode } from './Coding.mapper';
export { mapCodeStubToCodingReference, mapCodingReferenceToCodeStub } from './CodingReference.mapper';
export { mapDocumentDtoToDocument, mapDocumentToDocumentDto } from './Document.mapper';
export { mapIdentifierDtoToIdentifier, mapIdentifierToIdentifierDto } from './Identifier.mapper';
export { mapTimeSeriesDtoToTimeSeries, mapTimeSeriesToTimeSeriesDto } from './TimeSeries.mapper';
export { mapUserDtoToUser, mapUserToUserDto } from './User.mapper';

export function initializeMapper() {
    initializeCodingMapper()
    initializeCodingReferenceMapper()
    initializeDocumentMapper()
    initializeIdentifierMapper()
    initializeTimeSeriesMapper()
    initializeUserMapper()
}
