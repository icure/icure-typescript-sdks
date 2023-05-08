export enum SeverityEnum {
    "mild",
    "moderate",
    "severe",
}

export const SeverityValueSet = [
    {
        system: "http://snomed.info/sct",
        code: 255604002,
        display: "Mild",
        enum: SeverityEnum.mild,
    },
    {
        system: "http://snomed.info/sct",
        code: 6736007,
        display: "Moderate",
        enum: SeverityEnum.moderate,
    },
    {
        system: "http://snomed.info/sct",
        code: 24484000,
        display: "Severe",
        enum: SeverityEnum.severe,
    }
]
