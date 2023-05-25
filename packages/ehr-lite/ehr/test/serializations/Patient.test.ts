import {generateCodingReference} from './CodingReference.test'
import {generateAnnotation} from './Annotation.test'
import {PatientPersonalStatusEnum} from '../../src/models/enums/PatientPersonalStatus.enum'
import {PatientDeactivationReasonEnum} from '../../src/models/enums/PatientDeactivationReason.enum'
import {GenderEnum} from '../../src/models/enums/Gender.enum'
import {Patient} from '../../src/models/Patient.model'
import {generateLocation} from './Location.test'
import {generateHumanName} from './HumanName.test'
import {generateIdentifier} from './Identifier.test'
import {generateSystemMetaDataOwnerEncrypted} from './SystemMetaDataOwnerEncrypted.test'
import {generateProperty} from './Property.test'
import {generateRelatedPerson} from './RelatedPerson.test'
import {generateRelatedPractitioner} from './RelatedPractitioner.test'

export function generatePatient(): Patient {
    const patient = {
        id: 'sampleId',
        rev: 'sampleRev',
        identifiers: [generateIdentifier()],
        created: 1621872000000, // Sample timestamp in milliseconds
        modified: 1621872000000, // Sample timestamp in milliseconds
        author: 'sampleAuthor',
        responsible: 'sampleResponsible',
        tags: [generateCodingReference()],
        codes: [generateCodingReference()],
        endOfLife: 1621872000000, // Sample timestamp in milliseconds
        deletionDate: 1621872000000, // Sample timestamp in milliseconds
        names: [generateHumanName()],
        languages: ['English'],
        addresses: [generateLocation()],
        civility: 'sampleCivility',
        gender: GenderEnum.male,
        birthSex: GenderEnum.male,
        mergeToPatientId: 'sampleMergeToPatientId',
        mergedIds: ['sampleMergedId'],
        active: true,
        deactivationDate: 1621872000000, // Sample timestamp in milliseconds
        deactivationReason: PatientDeactivationReasonEnum.moved,
        ssin: 'sampleSSIN',
        personalStatus: PatientPersonalStatusEnum.single,
        dateOfBirth: 631152000000, // Sample timestamp in milliseconds
        dateOfDeath: 1621872000000, // Sample timestamp in milliseconds
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

describe(`Patient serialization and deserialization`, () => {
    it('should correctly serialize and deserialize from instance to JSON and back', () => {
        const instance = generatePatient()

        const json = Patient.toJSON(instance)
        const newInstance = Patient.fromJSON(json)

        expect(newInstance).toEqual(instance)
    })
})
