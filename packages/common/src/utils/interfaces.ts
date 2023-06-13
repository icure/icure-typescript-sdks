
export  interface SharingStatus {
  success: boolean | null;
  error: Error | null;
  modified: number | null;
}

export interface SharingResult<DSPatient> {
  patient: DSPatient | undefined
  statuses: {
    dataSamples: SharingStatus | undefined,
    healthcareElements: SharingStatus | undefined,
    patient: SharingStatus | undefined
  }
}
