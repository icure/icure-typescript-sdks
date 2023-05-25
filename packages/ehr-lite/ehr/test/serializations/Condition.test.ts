import {Condition} from '../../src/models/Condition.model'
import {generateAnnotation} from './Annotation.test'
import {generateCodingReference} from './CodingReference.test'
import {SeverityEnum} from '../../src/models/enums/Severity.enum'
import {CategoryEnum} from '../../src/models/enums/Category.enum'
import {VerificationStatusEnum} from '../../src/models/enums/VerificationStatus.enum'
import {ClinicalStatusEnum} from '../../src/models/enums/ClinicalStatus.enum'
import {generateIdentifier} from './Identifier.test'
import {generateSystemMetaDataEncrypted} from './SystemMetaDataEncrypted.test'

export function generateCondition(): Condition {
    const condition = {
        id: 'sampleId',
        identifiers: new Set([generateIdentifier(), generateIdentifier()]), // Exemple avec deux identifiants
        rev: 'sampleRev',
        created: 1621845600, // Exemple de timestamp UNIX
        modified: 1621845600, // Exemple de timestamp UNIX
        author: 'sampleAuthor',
        responsible: 'sampleResponsible',
        medicalLocationId: 'sampleMedicalLocationId',
        clinicalStatus: ClinicalStatusEnum.active,
        verificationStatus: VerificationStatusEnum.confirmed,
        category: CategoryEnum['encounter-diagnosis'],
        severity: SeverityEnum.moderate,
        bodySite: new Set([generateCodingReference(), generateCodingReference()]), // Exemple avec deux body sites
        tags: new Set([generateCodingReference(), generateCodingReference()]), // Exemple avec deux tags
        codes: new Set([generateCodingReference(), generateCodingReference()]), // Exemple avec deux codes
        endOfLife: 1621845600, // Exemple de timestamp UNIX
        deletionDate: 1621845600, // Exemple de timestamp UNIX
        healthcareElementId: 'sampleHealthcareElementId',
        recordedDate: 1621845600, // Exemple de timestamp UNIX
        openingDate: 1621845600, // Exemple de timestamp UNIX
        closingDate: 1621845600, // Exemple de timestamp UNIX
        description: 'Sample condition description',
        notes: [generateAnnotation(), generateAnnotation()], // Exemple avec deux annotations
        systemMetaData: generateSystemMetaDataEncrypted(),
    }

    return new Condition(condition)
}

describe(`Condition serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generateCondition()

        const json = Condition.toJSON(instance)
        const newInstance = Condition.fromJSON(json)

        expect(newInstance).toEqual(instance)
    })
})
