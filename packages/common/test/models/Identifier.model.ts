import {Identifier} from "../../src/models/Identifier.model";
import {generateCodingReference} from "./CodingReference.model";

export function generateIdentifier(): Identifier {
    const identifier = {
        assigner: 'sampleAssigner',
        end: '2023-05-24',
        id: 'sampleId',
        start: '2023-01-01',
        system: 'sampleSystem',
        type: generateCodingReference(),
        use: 'official',
        value: 'sampleValue',
    }

    return new Identifier(identifier)
}