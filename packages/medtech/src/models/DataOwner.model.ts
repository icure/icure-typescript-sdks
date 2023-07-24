import { HealthcareProfessional } from './HealthcareProfessional.model'
import { MedicalDevice } from './MedicalDevice.model'
import { Patient } from './Patient.model'

export enum DataOwnerTypeEnum {
    Patient = 'Patient',
    HealthcareProfessional = 'HealthcareProfessional',
    MedicalDevice = 'MedicalDevice',
}
export type DataOwner = Patient | HealthcareProfessional | MedicalDevice
export type DataOwnerWithType = { type: DataOwnerTypeEnum.Patient; dataOwner: Patient } | { type: DataOwnerTypeEnum.HealthcareProfessional; dataOwner: HealthcareProfessional } | { type: DataOwnerTypeEnum.MedicalDevice; dataOwner: MedicalDevice }
