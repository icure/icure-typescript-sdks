import {Condition} from "../../src/models/Condition.model";
import {ClinicalStatusEnum} from "../../src/models/enums/ClinicalStatus.enum";
import {VerificationStatusEnum} from "../../src/models/enums/VerificationStatus.enum";
import {CategoryEnum} from "../../src/models/enums/Category.enum";
import {SeverityEnum} from "../../src/models/enums/Severity.enum";
import {generateCodingReference} from "../../../common/test/models/CodingReference.model";
import {generateAnnotation} from "../../../common/test/models/Annotation.model";
import {generateIdentifier} from "../../../common/test/models/Identifier.model";
import {generateSystemMetaDataEncrypted} from "../../../common/test/models/SystemMetaDataEncrypted.model";

export function generateCondition(): Condition {
    const condition = {
        id: 'sampleId',
        identifiers: new Set([generateIdentifier(), generateIdentifier()]),
        rev: 'sampleRev',
        created: 1621845600,
        modified: 1621845600,
        author: 'sampleAuthor',
        responsible: 'sampleResponsible',
        medicalLocationId: 'sampleMedicalLocationId',
        clinicalStatus: ClinicalStatusEnum.ACTIVE,
        verificationStatus: VerificationStatusEnum.CONFIRMED,
        category: CategoryEnum['ENCOUNTER_DIAGNOSIS'],
        severity: SeverityEnum.MODERATE,
        bodySite: new Set([generateCodingReference(), generateCodingReference()]),
        tags: new Set([generateCodingReference(), generateCodingReference()]),
        codes: new Set([generateCodingReference(), generateCodingReference()]),
        endOfLife: 1621845600,
        deletionDate: 1621845600,
        healthcareElementId: 'sampleHealthcareElementId',
        recordedDate: 1621845600,
        openingDate: 1621845600,
        closingDate: 1621845600,
        description: 'Sample condition description',
        notes: [generateAnnotation(), generateAnnotation()],
        systemMetaData: generateSystemMetaDataEncrypted(),
    }

    return new Condition(condition)
}