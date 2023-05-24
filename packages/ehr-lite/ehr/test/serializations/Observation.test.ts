import {Component} from "../../src/models/Component.model";
import {LocalComponent} from "../../src/models/LocalComponent.model";
import {CodingReference} from "../../src/models/CodingReference.model";
import {SystemMetaDataEncrypted} from "../../src/models/SystemMetaDataEncrypted.model";
import {Annotation} from "../../src/models/Annotation.model";
import {Identifier} from "../../src/models/Identifier.model";
import {Measure} from "../../src/models/Measure.model";
import {TimeSeries} from "../../src/models/TimeSeries.model";
import {Observation} from "../../src/models/Observation.model";
import {Delegation} from "../../src/models/Delegation.model";
import {SecureDelegation} from "../../src/models/SecureDelegation.model";
import {ISO639_1} from "@icure/api";
import {SecurityMetadata} from "../../src/models/SecurityMetadata.model";

describe('Observation', () => {
    const measureData: Measure = {
        value: 10,
        min: 5,
        max: 15,
        unit: 'cm',
        comment: 'Measurement of length'
    };

    const timeSeriesData: TimeSeries = {
        fields: ['time', 'value'],
        samples: [
            [1, 10],
            [2, 12],
            [3, 15]
        ],
        min: [1, 10],
        max: [3, 15],
        mean: [2, 12.3],
        median: [2, 12],
        variance: [1, 4.67]
    };

    const componentData = {
        numberValue: 10,
        booleanValue: true,
        instantValue: 1641532200,
        fuzzyDateValue: 202201,
        measureValue: measureData,
        timeSeries: timeSeriesData,
        compoundValue: [
            { stringValue: 'Compound value 1' },
            { stringValue: 'Compound value 2' }
        ],
        ratio: [
            { value: 0.5, unit: 'mg' },
            { value: 1.5, unit: 'mg' }
        ],
        range: [
            { min: 5, max: 15, unit: 'cm' },
            { min: 2, max: 8, unit: 'cm' }
        ]
    };

    const observationData: Observation = {
        id: 'obs-123',
        transactionId: 'transaction-456',
        identifiers: [
            new Identifier({ assigner: 'assigner-1', value: 'value-1' }),
            new Identifier({ assigner: 'assigner-2', value: 'value-2' })
        ],
        batchId: 'batch-789',
        healthcareElementIds: ['element-1', 'element-2'],
        index: 1,
        component: new Component({
            numberValue: 42,
            booleanValue: true,
            instantValue: 1621234567,
            fuzzyDateValue: 1620000000,
            measureValue: new Measure({ value: 10, unit: 'kg' }),
            timeSeries: new TimeSeries({
                fields: ['time', 'value'],
                samples: [[1, 10], [2, 20], [3, 30]],
                min: [1, 10],
                max: [3, 30],
                mean: [2, 20],
                median: [2, 20],
                variance: [1, 100]
            }),
            compoundValue: [
                new LocalComponent({ stringValue: 'string-value-1', documentId: 'document-1' }),
                new LocalComponent({ stringValue: 'string-value-2', documentId: 'document-2' })
            ],
            ratio: [
                new Measure({ value: 1, unit: 'cm' }),
                new Measure({ value: 2, unit: 'inch' })
            ],
            range: [
                new Measure({ value: 5, unit: 'cm' }),
                new Measure({ value: 10, unit: 'cm' })
            ]
        }),
        valueDate: 1622345678,
        openingDate: 1621000000,
        closingDate: 1622000000,
        created: 1620000000,
        modified: 1621000000,
        endOfLife: 1623000000,
        author: 'John Doe',
        performer: 'Jane Smith',
        localContent: new Map<ISO639_1, LocalComponent>([
            ['en', new LocalComponent({ stringValue: 'English content', documentId: 'en-document' })],
            ['fr', new LocalComponent({ stringValue: 'Contenu français', documentId: 'fr-document' })]
        ]),
        qualifiedLinks: new Map<string, Map<ISO639_1, string>>([
            [
                'link_1',
                new Map<ISO639_1, string>([
                    ['en', 'english-link-1'],
                    ['fr', 'french-link-1']
                ])
            ],
            [
                'link_2',
                new Map<ISO639_1, string>([
                    ['en', 'english-link-2'],
                    ['fr', 'french-link-2']
                ])
            ]
        ]),
        codes: new Set<CodingReference>([
            new CodingReference({ code: 'code-1', system: 'system-1' }),
            new CodingReference({ code: 'code-2', system: 'system-2' })
        ]),
        tags: new Set<CodingReference>([
            new CodingReference({ code: 'tag-1', system: 'system-1' }),
            new CodingReference({ code: 'tag-2', system: 'system-2' })
        ]),
        systemMetaData: new SystemMetaDataEncrypted({
            secretForeignKeys: ['secret-key-1', 'secret-key-2'],
            cryptedForeignKeys: new Map<string, Delegation[]>([
                [
                    'key-1',
                    [
                        new Delegation({ owner: 'owner-1', delegateTo: 'delegate-1', key: 'key-1' })
                    ]
                ]
            ]),
            delegations: new Map<string, Delegation[]>([
                [
                    'key-1',
                    [
                        new Delegation({ owner: 'owner-1', delegateTo: 'delegate-1', key: 'key-1' })
                    ]
                ]
            ]),
            encryptionKeys: new Map<string, Delegation[]>([
                [
                    'key-1',
                    [
                        new Delegation({ owner: 'owner-1', delegateTo: 'delegate-1', key: 'key-1' })
                    ]
                ]
            ]),
            securityMetadata: new SecurityMetadata({
                secureDelegations: new Map<string, Delegation>([
                    [
                        'key-1',
                        new Delegation({ owner: 'owner-1', delegateTo: 'delegate-1', key: 'key-1' })
                    ]
                ]),
                keysEquivalences: new Map<string, string>([['key-1', 'equivalence-1']])
            }),
            encryptedSelf: 'encrypted-data'
        }),
        notes: [
            new Annotation({ text: 'Note 1', author: 'Author 1' }),
            new Annotation({ text: 'Note 2', author: 'Author 2' })
        ]
    };


    const observationJSON = {
        "id": "obs-123",
        "transactionId": "transaction-456",
        "identifiers": [
            {
                "assigner": "assigner-1",
                "value": "value-1"
            },
            {
                "assigner": "assigner-2",
                "value": "value-2"
            }
        ],
        "batchId": "batch-789",
        "healthcareElementIds": ["element-1", "element-2"],
        "index": 1,
        "component": {
            "numberValue": 42,
            "booleanValue": true,
            "instantValue": 1621234567,
            "fuzzyDateValue": 1620000000,
            "measureValue": {
                "value": 10,
                "unit": "kg"
            },
            "timeSeries": {
                "fields": ["time", "value"],
                "samples": [[1, 10], [2, 20], [3, 30]],
                "min": [1, 10],
                "max": [3, 30],
                "mean": [2, 20],
                "median": [2, 20],
                "variance": [1, 100]
            },
            "compoundValue": [
                {
                    "stringValue": "string-value-1",
                    "documentId": "document-1"
                },
                {
                    "stringValue": "string-value-2",
                    "documentId": "document-2"
                }
            ],
            "ratio": [
                {
                    "value": 1,
                    "unit": "cm"
                },
                {
                    "value": 2,
                    "unit": "inch"
                }
            ],
            "range": [
                {
                    "value": 5,
                    "unit": "cm"
                },
                {
                    "value": 10,
                    "unit": "cm"
                }
            ]
        },
        "valueDate": 1622345678,
        "openingDate": 1621000000,
        "closingDate": 1622000000,
        "created": 1620000000,
        "modified": 1621000000,
        "endOfLife": 1623000000,
        "author": "John Doe",
        "performer": "Jane Smith",
        "localContent": {
            "en": {
                "stringValue": "English content",
                "documentId": "en-document"
            },
            "fr": {
                "stringValue": "Contenu français",
                "documentId": "fr-document"
            }
        },
        "qualifiedLinks": {
            "link_1": {
                "en": "english-link-1",
                "fr": "french-link-1"
            },
            "link_2": {
                "en": "english-link-2",
                "fr": "french-link-2"
            }
        },
        "codes": [
            {
                "code": "code-1",
                "system": "system-1"
            },
            {
                "code": "code-2",
                "system": "system-2"
            }
        ],
        "tags": [
            {
                "code": "tag-1",
                "system": "system-1"
            },
            {
                "code": "tag-2",
                "system": "system-2"
            }
        ],
        "systemMetaData": {
            "secretForeignKeys": ["secret-key-1", "secret-key-2"],
            "cryptedForeignKeys": {
                "key-1": [
                    {
                        "owner": "owner-1",
                        "delegateTo": "delegate-1",
                        "key": "key-1"
                    }
                ]
            },
            "delegations": {
                "key-1": [
                    {
                        "owner": "owner-1",
                        "delegateTo": "delegate-1",
                        "key": "key-1"
                    }
                ]
            },
            "encryptionKeys": {
                "key-1": [
                    {
                        "owner": "owner-1",
                        "delegateTo": "delegate-1",
                        "key": "key-1"
                    }
                ]
            },
            "securityMetadata": {
                "secureDelegations": {
                    "key-1": {
                        "owner": "owner-1",
                        "delegateTo": "delegate-1",
                        "key": "key-1"
                    }
                },
                "keysEquivalences": {
                    "key-1": "equivalence-1"
                }
            },
            "encryptedSelf": "encrypted-data"
        },
        "notes": [
            {
                "text": "Note 1",
                "author": "Author 1"
            },
            {
                "text": "Note 2",
                "author": "Author 2"
            }
        ]
    }


    test('should convert instance to JSON', () => {
        const observation = new Observation(observationData);

        expect(Observation.toJSON(observation)).toEqual(observationJSON);
    });

    test('should convert JSON to instance', () => {
        const observation = Observation.fromJSON(observationJSON);

        expect(observation).toEqual(new Observation(observationData));
    });

    test('should serialize and deserialize correctly', () => {
        const observation = new Observation(observationData);
        const serialized = Observation.toJSON(observation);
        const deserialized = Observation.fromJSON(serialized);

        expect(deserialized).toEqual(observation);
    });
});
