import {Patient} from "../../src/models/Patient.model";
import {generateIdentifier} from "./Identifier.model";
import {generateCodingReference} from "./CodingReference.model";
import {generateHumanName} from "./HumanName.model";
import {generateLocation} from "./Location.model";
import {GenderEnum} from "../../src/models/enums/Gender.enum";
import {PatientDeactivationReasonEnum} from "../../src/models/enums/PatientDeactivationReason.enum";
import {PatientPersonalStatusEnum} from "../../src/models/enums/PatientPersonalStatus.enum";
import {generateAnnotation} from "./Annotation.model";
import {generateProperty} from "./Property.model";
import {generateRelatedPerson} from "./RelatedPerson.model";
import {generateRelatedPractitioner} from "./RelatedPractitioner.model";
import {generateSystemMetaDataOwnerEncrypted} from "./SystemMetaDataOwnerEncrypted.model";

export function generatePatient(): Patient {
    const patient = {
        id: 'sampleId',
        rev: 'sampleRev',
        identifiers: [generateIdentifier()],
        created: 1621872000000,
        modified: 1621872000000,
        author: 'sampleAuthor',
        responsible: 'sampleResponsible',
        tags: [generateCodingReference()],
        codes: [generateCodingReference()],
        endOfLife: 1621872000000,
        deletionDate: 1621872000000,
        names: [generateHumanName()],
        languages: ['English'],
        addresses: [generateLocation()],
        civility: 'sampleCivility',
        gender: GenderEnum.male,
        birthSex: GenderEnum.male,
        mergeToPatientId: 'sampleMergeToPatientId',
        mergedIds: ['sampleMergedId'],
        active: true,
        deactivationDate: 1621872000000,
        deactivationReason: PatientDeactivationReasonEnum.moved,
        ssin: 'sampleSSIN',
        personalStatus: PatientPersonalStatusEnum.single,
        dateOfBirth: 631152000000,
        dateOfDeath: 1621872000000,
        placeOfBirth: 'samplePlaceOfBirth',
        placeOfDeath: 'samplePlaceOfDeath',
        deceased: true,
        education: 'sampleEducation',
        profession: 'sampleProfession',
        notes: [generateAnnotation()],
        nationality: 'sampleNationality',
        race: 'sampleRace',
        ethnicity: 'sampleEthnicity',
        picture: new ArrayBuffer(8),
        externalId: 'sampleExternalId',
        relatives: [generateRelatedPerson()],
        patientPractitioners: [generateRelatedPractitioner()],
        patientProfessions: [generateCodingReference()],
        properties: [generateProperty()],
        systemMetaData: generateSystemMetaDataOwnerEncrypted(),
    }

    return new Patient(patient)
}