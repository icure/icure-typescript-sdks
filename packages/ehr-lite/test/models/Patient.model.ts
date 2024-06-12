import { Patient } from '../../src/models/Patient.model'
import { generateIdentifier } from '../../../common/test/models/Identifier.model'
import { generateCodingReference } from '../../../common/test/models/CodingReference.model'
import { generateHumanName } from './HumanName.model'
import { generateLocation } from './Location.model'
import { GenderEnum } from '../../src/models/enums/Gender.enum'
import { PatientDeactivationReasonEnum } from '../../src/models/enums/PatientDeactivationReason.enum'
import { PatientPersonalStatusEnum } from '../../src/models/enums/PatientPersonalStatus.enum'
import { generateAnnotation } from '../../../common/test/models/Annotation.model'
import { generateProperty } from '../../../common/test/models/Property.model'
import { generateRelatedPerson } from './RelatedPerson.model'
import { generateRelatedPractitioner } from './RelatedPractitioner.model'
import { generateSystemMetaDataOwnerEncrypted } from '../../../common/test/models/SystemMetaDataOwnerEncrypted.model'
import { v4 } from 'uuid'

export function generatePatient(): Patient {
    const patient = {
        id: v4(),
        rev: 'sampleRev',
        identifiers: [generateIdentifier()],
        created: 1621872000000,
        modified: 1621872000000,
        author: 'sampleAuthor',
        responsible: 'sampleResponsible',
        tags: ([generateCodingReference()]),
        codes: ([generateCodingReference()]),
        endOfLife: 1621872000000,
        deletionDate: 1621872000000,
        names: [generateHumanName()],
        languages: ['English'],
        addresses: [generateLocation()],
        civility: 'sampleCivility',
        gender: GenderEnum.MALE,
        birthSex: GenderEnum.MALE,
        mergeToPatientId: 'sampleMergeToPatientId',
        mergedIds: ['sampleMergedId'],
        active: true,
        deactivationDate: 1621872000000,
        deactivationReason: PatientDeactivationReasonEnum.MOVED,
        ssin: 'sampleSSIN',
        personalStatus: PatientPersonalStatusEnum.SINGLE,
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
        properties: ([generateProperty()]),
        systemMetaData: generateSystemMetaDataOwnerEncrypted(),
    } satisfies Patient

    return new Patient(patient)
}
