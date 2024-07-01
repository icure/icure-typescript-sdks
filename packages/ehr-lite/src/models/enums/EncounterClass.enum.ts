import { CodeStub } from '@icure/api'

export enum EncounterClass {
    /**
     * A comprehensive term for health care provided in a healthcare facility (e.g. a practitioneraTMs office, clinic setting, or hospital) on a nonresident basis. The term ambulatory usually implies that the patient has come to the location and is not assigned to a bed. Sometimes referred to as an outpatient encounter.
     */
    Ambulatory = 'AMB',
    /**
     * A patient encounter that takes place at a dedicated healthcare service delivery location where the patient receives immediate evaluation and treatment, provided until the patient can be discharged or responsibility for the patient's care is transferred elsewhere (for example, the patient could be admitted as an inpatient or transferred to another facility.)
     */
    Emergency = 'EMER',
    /**
     * A patient encounter that takes place both outside a dedicated service delivery location and outside a patient's residence. Example locations might include an accident site and at a supermarket.
     */
    Field = 'FLD',
    /**
     * Healthcare encounter that takes place in the residence of the patient or a designee
     */
    Home = 'HH',
    /**
     * A patient encounter where a patient is admitted by a hospital or equivalent facility, assigned to a location where patients generally stay at least overnight and provided with room, board, and continuous nursing service.
     */
    InpatientEncounter = 'IMP',
    /**
     * An acute inpatient encounter.
     */
    InpatientAcute = 'ACUTE',
    /**
     * Any category of inpatient encounter except 'acute'
     */
    InpatientNonAcute = 'NONAC',
    /**
     * An encounter where the patient usually will start in different encounter, such as one in the emergency department (EMER) but then transition to this type of encounter because they require a significant period of treatment and monitoring to determine whether or not their condition warrants an inpatient admission or discharge. In the majority of cases the decision about admission or discharge will occur within a time period determined by local, regional or national regulation, often between 24 and 48 hours.
     */
    ObservationEncounter = 'OBSENC',
    /**
     * A patient encounter where patient is scheduled or planned to receive service delivery in the future, and the patient is given a pre-admission account number. When the patient comes back for subsequent service, the pre-admission encounter is selected and is encapsulated into the service registration, and a new account number is generated. Usage Note: This is intended to be used in advance of encounter types such as ambulatory, inpatient encounter, virtual, etc.
     */
    PreAdmission = 'PRENC',
    /**
     * An encounter where the patient is admitted to a health care facility for a predetermined length of time, usually less than 24 hours.
     */
    ShortStay = 'SS',
    /**
     * A patient encounter where the patient and the practitioner(s) are not in the same physical location. Examples include telephone conference, email exchange, robotic surgery, and televideo conference.
     */
    Virtual = 'VR',
}

export namespace EncounterClass {
    export function toCodeStub(encounterClass: EncounterClass): CodeStub {
        const type = 'http://terminology.hl7.org/CodeSystem/v3-ActCode'
        const code = encounterClass
        const version = '4.0.1'
        return new CodeStub({
            id: `${type}|${code}|${version}`,
            type,
            code,
            version,
        })
    }

    export function fromCodeStub(codeStub: CodeStub): EncounterClass {
        // TODO consider version in future
        if (codeStub.type !== 'http://terminology.hl7.org/CodeSystem/v3-ActCode') throw new Error('Unexpected codeStub.type for encounterClass: ' + codeStub.type)
        switch (codeStub.code) {
            case 'AMB':
                return EncounterClass.Ambulatory
            case 'EMER':
                return EncounterClass.Emergency
            case 'FLD':
                return EncounterClass.Field
            case 'HH':
                return EncounterClass.Home
            case 'IMP':
                return EncounterClass.InpatientEncounter
            case 'ACUTE':
                return EncounterClass.InpatientAcute
            case 'NONAC':
                return EncounterClass.InpatientNonAcute
            case 'OBSENC':
                return EncounterClass.ObservationEncounter
            case 'PRENC':
                return EncounterClass.PreAdmission
            case 'SS':
                return EncounterClass.ShortStay
            case 'VR':
                return EncounterClass.Virtual
            default:
                throw new Error('Unexpected codeStub.code for encounterClass: ' + codeStub.code)
        }
    }
}
