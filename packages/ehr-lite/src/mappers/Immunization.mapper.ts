import { Immunization, ImmunizationStatus } from '../models/Immunization.model'
import {
    addUniqueObjectsToArray,
    Annotation,
    AnnotationDto,
    CodeStub,
    CodingReference,
    ContentDto,
    DelegationDto,
    filteringOutInternalTags,
    forceUuid,
    Identifier,
    IdentifierDto,
    ISO639_1,
    mapAnnotationDtoToAnnotation,
    mapAnnotationToAnnotationDto,
    mapCodeStubToCodingReference,
    mapCodingReferenceToCodeStub,
    mapIdentifierDtoToIdentifier,
    mapIdentifierToIdentifierDto,
    MedicationDto,
    MedicinalproductDto,
    mergeTagsWithInternalTags,
    RegimenItemDto,
    SecurityMetadataDto,
    ServiceDto,
    SystemMetaDataEncrypted,
    toCryptedForeignKeys,
    toDelegations,
    toEncryptedSelf,
    toEncryptionKeys,
    toSecretForeignKeys,
    toSecurityMetadataDto,
    toSystemMetaDataEncrypted,
} from '@icure/typescript-common'
import { mapAdministrationQuantityDtoToQuantity, mapQuantityToAdministrationQuantityDto } from './Quantity.mapper'
import { Quantity } from '../models/Quantity.model'

export const IMMUNIZATION_FHIR_TYPE = 'Immunization'

const STATUS_CONTEXT = 'status'
const STATUS_REASON_CONTEXT = 'statusReason'
const VACCINE_CODE_CONTEXT = 'vaccineCode'
const SUB_POTENT_REASON_CONTEXT = 'subPotentReason'
const SITE_CONTEXT = 'site'
const CONTEXTS = [STATUS_CONTEXT, STATUS_REASON_CONTEXT, VACCINE_CODE_CONTEXT, SUB_POTENT_REASON_CONTEXT, SITE_CONTEXT].map((context) => `${IMMUNIZATION_FHIR_TYPE}.${context}`)

function toServiceDtoId({ id }: Immunization): string | undefined {
    return forceUuid(id)
}

function toServiceDtoTransactionId(domain: Immunization): string | undefined {
    return undefined
}

function toServiceDtoIdentifier(domain: Immunization): IdentifierDto[] | undefined {
    return domain.identifiers?.map(mapIdentifierToIdentifierDto)
}

function toServiceDtoContactId(domain: Immunization): string | undefined {
    return domain.encounterId
}

function toServiceDtoSubContactIds(domain: Immunization): string[] | undefined {
    return undefined
}

function toServiceDtoPlansOfActionIds(domain: Immunization): string[] | undefined {
    return undefined
}

function toServiceDtoHealthElementsIds(domain: Immunization): string[] | undefined {
    return undefined
}

function toServiceDtoFormIds(domain: Immunization): string[] | undefined {
    return undefined
}

function toServiceDtoSecretForeignKeys(domain: Immunization): string[] | undefined {
    return !!domain.systemMetaData ? toSecretForeignKeys(domain.systemMetaData) : undefined
}

function toServiceDtoCryptedForeignKeys(domain: Immunization): { [key: string]: DelegationDto[] } | undefined {
    return !!domain.systemMetaData ? toCryptedForeignKeys(domain.systemMetaData) : undefined
}

function toServiceDtoDelegations(domain: Immunization): { [key: string]: DelegationDto[] } | undefined {
    return !!domain.systemMetaData ? toDelegations(domain.systemMetaData) : undefined
}

function toServiceDtoEncryptionKeys(domain: Immunization): { [key: string]: DelegationDto[] } | undefined {
    return !!domain.systemMetaData ? toEncryptionKeys(domain.systemMetaData) : undefined
}

function toServiceDtoLabel(domain: Immunization): string | undefined {
    return undefined
}

function toServiceDtoDataClassName(domain: Immunization): string | undefined {
    return undefined
}

function toServiceDtoIndex({ index }: Immunization): number | undefined {
    return index
}

function toServiceDtoContent({ language, doseQuantity, vaccineCode, occurrenceDateTime }: Immunization):
    | {
          [key: string]: ContentDto
      }
    | undefined {
    return Object.fromEntries([
        [
            language ?? 'xx',
            new ContentDto({
                medicationValue:
                    doseQuantity || vaccineCode || occurrenceDateTime
                        ? new MedicationDto({
                              medicinalProduct: vaccineCode
                                  ? new MedicinalproductDto({
                                        deliveredcds: vaccineCode ? mapCodingReferenceToCodeStub(vaccineCode) : undefined,
                                    })
                                  : undefined,
                              regimen:
                                  doseQuantity && occurrenceDateTime
                                      ? new RegimenItemDto({
                                            administratedQuantity: mapQuantityToAdministrationQuantityDto(doseQuantity),
                                            date: occurrenceDateTime,
                                        })
                                      : undefined,
                          })
                        : undefined,
            }),
        ],
    ])
}

function toServiceDtoEncryptedContent(domain: Immunization): string | undefined {
    return undefined
}

function toServiceDtoTextIndexes(domain: Immunization): { [key: string]: string } | undefined {
    return undefined
}

function toServiceDtoValueDate({ recorded }: Immunization): number | undefined {
    return recorded
}

function toServiceDtoOpeningDate(domain: Immunization): number | undefined {
    return undefined
}

function toServiceDtoClosingDate(domain: Immunization): number | undefined {
    return undefined
}

function toServiceDtoFormId(domain: Immunization): string | undefined {
    return undefined
}

function toServiceDtoCreated({ created }: Immunization): number | undefined {
    return created
}

function toServiceDtoModified({ modified }: Immunization): number | undefined {
    return modified
}

function toServiceDtoEndOfLife({ endOfLife }: Immunization): number | undefined {
    return endOfLife
}

function toServiceDtoAuthor(domain: Immunization): string | undefined {
    return undefined
}

function toServiceDtoResponsible({ recorder }: Immunization): string | undefined {
    return recorder
}

function toServiceDtoMedicalLocationId(domain: Immunization): string | undefined {
    return undefined
}

function toServiceDtoComment(domain: Immunization): string | undefined {
    return undefined
}

function toServiceDtoStatus(domain: Immunization): number | undefined {
    return undefined
}

function toServiceDtoInvoicingCodes(domain: Immunization): string[] | undefined {
    return undefined
}

function toServiceDtoNotes({ notes }: Immunization): AnnotationDto[] | undefined {
    return notes?.map(mapAnnotationToAnnotationDto)
}

function toServiceDtoQualifiedLinks(domain: Immunization): { [key: string]: { [key: string]: string } } | undefined {
    return undefined
}

function toServiceDtoCodes({ codes, status, statusReason, subPotentReason, site }: Immunization): CodeStub[] | undefined {
    const additionalCodes: CodeStub[] = [immunizationStatusToCodeStub(status), immunizationStatusReasonToCodeStub(statusReason), immunizationSubPotentReasonToCodeStub(subPotentReason), immunizationSiteToCodeStub(site)].filter((code) => !!codes) as CodeStub[]

    return addUniqueObjectsToArray(codes.map(mapCodingReferenceToCodeStub), ...additionalCodes)
}

function immunizationStatusToCodeStub(status: ImmunizationStatus | undefined): CodeStub | null {
    if (!status) {
        return null
    }

    const code = status
    const version = '4.0.1'
    const type = 'http://hl7.org/fhir/ValueSet/immunization-status'

    return new CodeStub({
        id: `${type}|${code}|${version}`,
        code: status,
        version: version,
        type: type,
        context: `${IMMUNIZATION_FHIR_TYPE}.${STATUS_CONTEXT}`,
    })
}

function extractImmunizationStatusFromCodeStub(tags: CodeStub[]): ImmunizationStatus | undefined {
    const statusTag = tags.find((tag) => tag.context === `${IMMUNIZATION_FHIR_TYPE}.${STATUS_CONTEXT}`)
    return statusTag?.code as ImmunizationStatus
}

function immunizationStatusReasonToCodeStub(statusReason: CodingReference | undefined): CodeStub | null {
    return statusReason
        ? new CodeStub({
              ...mapCodingReferenceToCodeStub(statusReason),
              context: `${IMMUNIZATION_FHIR_TYPE}.${STATUS_REASON_CONTEXT}`,
          })
        : null
}

function extractImmunizationStatusReasonFromCodeStub(tags: CodeStub[]): CodingReference | undefined {
    const statusReasonTag = tags.find((tag) => tag.context === `${IMMUNIZATION_FHIR_TYPE}.${STATUS_REASON_CONTEXT}`)
    return statusReasonTag ? mapCodeStubToCodingReference(statusReasonTag) : undefined
}

function extractImmunizationVaccineCodeFromCodeStub(tags: CodeStub[]): CodingReference | undefined {
    const vaccineCodeTag = tags.find((tag) => tag.context === `${IMMUNIZATION_FHIR_TYPE}.${VACCINE_CODE_CONTEXT}`)
    return vaccineCodeTag ? mapCodeStubToCodingReference(vaccineCodeTag) : undefined
}

function immunizationSubPotentReasonToCodeStub(subPotentReason: CodingReference | undefined): CodeStub | null {
    return subPotentReason
        ? new CodeStub({
              ...mapCodingReferenceToCodeStub(subPotentReason),
              context: `${IMMUNIZATION_FHIR_TYPE}.${SUB_POTENT_REASON_CONTEXT}`,
          })
        : null
}

function extractImmunizationSubPotentReasonFromCodeStub(tags: CodeStub[]): CodingReference | undefined {
    const subPotentReasonTag = tags.find((tag) => tag.context === `${IMMUNIZATION_FHIR_TYPE}.${SUB_POTENT_REASON_CONTEXT}`)
    return subPotentReasonTag ? mapCodeStubToCodingReference(subPotentReasonTag) : undefined
}

function immunizationSiteToCodeStub(site: CodingReference | undefined): CodeStub | null {
    return site
        ? new CodeStub({
              ...mapCodingReferenceToCodeStub(site),
              context: `${IMMUNIZATION_FHIR_TYPE}.${SITE_CONTEXT}`,
          })
        : null
}

function extractImmunizationSiteFromCodeStub(tags: CodeStub[]): CodingReference | undefined {
    const siteTag = tags.find((tag) => tag.context === `${IMMUNIZATION_FHIR_TYPE}.${SITE_CONTEXT}`)
    return siteTag ? mapCodeStubToCodingReference(siteTag) : undefined
}

function toServiceDtoTags({ tags, systemMetaData }: Immunization): CodeStub[] | undefined {
    return mergeTagsWithInternalTags(IMMUNIZATION_FHIR_TYPE, tags, systemMetaData)
}

function toServiceDtoEncryptedSelf({ systemMetaData }: Immunization): string | undefined {
    return toEncryptedSelf(systemMetaData)
}

function toServiceDtoSecurityMetadata({ systemMetaData }: Immunization): SecurityMetadataDto | undefined {
    return toSecurityMetadataDto(systemMetaData)
}

function toImmunizationId({ id }: ServiceDto): string {
    return id!
}

function toImmunizationIdentifiers(dto: ServiceDto): Identifier[] | undefined {
    return dto.identifier?.map((item) => mapIdentifierDtoToIdentifier(item))
}

function toImmunizationRecorder({ responsible }: ServiceDto): string | undefined {
    return responsible
}

function toImmunizationStatus({ codes }: ServiceDto): ImmunizationStatus | undefined {
    return codes != undefined ? extractImmunizationStatusFromCodeStub(codes) : undefined
}

function toImmunizationStatusReason({ codes }: ServiceDto): CodingReference | undefined {
    return codes != undefined ? extractImmunizationStatusReasonFromCodeStub(codes) : undefined
}

function toImmunizationVaccineCode({ codes }: ServiceDto): CodingReference | undefined {
    return codes != undefined ? extractImmunizationVaccineCodeFromCodeStub(codes) : undefined
}

function toImmunizationSubPotentReason({ codes }: ServiceDto): CodingReference | undefined {
    return codes != undefined ? extractImmunizationSubPotentReasonFromCodeStub(codes) : undefined
}

function toImmunizationSite({ codes }: ServiceDto): CodingReference | undefined {
    return codes != undefined ? extractImmunizationSiteFromCodeStub(codes) : undefined
}

function toImmunizationRecorded({ valueDate }: ServiceDto): number | undefined {
    return valueDate
}

function toImmunizationModified({ modified }: ServiceDto): number | undefined {
    return modified
}

function toImmunizationEndOfLife({ endOfLife }: ServiceDto): number | undefined {
    return endOfLife
}

function toImmunizationSystemMetaData(dto: ServiceDto): SystemMetaDataEncrypted | undefined {
    return toSystemMetaDataEncrypted(dto)
}

function toImmunizationNotes({ notes }: ServiceDto): Annotation[] | undefined {
    return notes?.map((note) => mapAnnotationDtoToAnnotation(note))
}

function toImmunizationEncounterId({ contactId }: ServiceDto): string | undefined {
    return contactId
}

function toImmunizationIndex({ index }: ServiceDto): number | undefined {
    return index
}

function toImmunizationLanguage({ content }: ServiceDto): ISO639_1 | undefined {
    return content ? (Object.keys(content)[0] as ISO639_1) : undefined
}

function toImmunizationCreated({ created }: ServiceDto): number | undefined {
    return created
}

function toImmunizationCodes({ codes }: ServiceDto): CodingReference[] {
    return codes?.map(mapCodeStubToCodingReference) ?? []
}

function toImmunizationTags({ tags }: ServiceDto): CodingReference[] {
    return [
        ...(filteringOutInternalTags(
            IMMUNIZATION_FHIR_TYPE,
            tags?.filter((tag) => {
                return tag.context != undefined ? !CONTEXTS.includes(tag.context) : true
            }),
        )?.values() ?? []),
    ]
}

function toImmunizationDoseQuantity({ content }: ServiceDto): Quantity | undefined {
    const contentDto = content ? Object.values(content)[0] : undefined
    const regimen = contentDto?.medicationValue?.regimen
    return regimen !== undefined && regimen.length > 0 && regimen[0].administratedQuantity ? mapAdministrationQuantityDtoToQuantity(regimen[0].administratedQuantity) : undefined
}

function toImmunizationOccurrenceDateTime(dto: ServiceDto): number | undefined {
    const contentDto = dto.content ? Object.values(dto.content)[0] : undefined
    const regimen = contentDto?.medicationValue?.regimen
    return regimen !== undefined && regimen.length > 0 && regimen[0].date ? regimen[0].date : undefined
}

export function mapServiceDtoToImmunization(dto: ServiceDto): Immunization {
    return new Immunization({
        id: toImmunizationId(dto),
        index: toImmunizationIndex(dto),
        identifiers: toImmunizationIdentifiers(dto),
        encounterId: toImmunizationEncounterId(dto),
        doseQuantity: toImmunizationDoseQuantity(dto),
        occurrenceDateTime: toImmunizationOccurrenceDateTime(dto),
        recorder: toImmunizationRecorder(dto),
        status: toImmunizationStatus(dto),
        statusReason: toImmunizationStatusReason(dto),
        vaccineCode: toImmunizationVaccineCode(dto),
        subPotentReason: toImmunizationSubPotentReason(dto),
        site: toImmunizationSite(dto),
        recorded: toImmunizationRecorded(dto),
        created: toImmunizationCreated(dto),
        modified: toImmunizationModified(dto),
        endOfLife: toImmunizationEndOfLife(dto),
        codes: toImmunizationCodes(dto),
        tags: toImmunizationTags(dto),
        language: toImmunizationLanguage(dto),
        systemMetaData: toImmunizationSystemMetaData(dto),
        notes: toImmunizationNotes(dto),
    })
}

export function mapImmunizationToServiceDto(domain: Immunization): ServiceDto {
    return new ServiceDto({
        id: toServiceDtoId(domain),
        transactionId: toServiceDtoTransactionId(domain),
        identifier: toServiceDtoIdentifier(domain),
        contactId: toServiceDtoContactId(domain),
        subContactIds: toServiceDtoSubContactIds(domain),
        plansOfActionIds: toServiceDtoPlansOfActionIds(domain),
        healthElementsIds: toServiceDtoHealthElementsIds(domain),
        formIds: toServiceDtoFormIds(domain),
        secretForeignKeys: toServiceDtoSecretForeignKeys(domain),
        cryptedForeignKeys: toServiceDtoCryptedForeignKeys(domain),
        delegations: toServiceDtoDelegations(domain),
        encryptionKeys: toServiceDtoEncryptionKeys(domain),
        label: toServiceDtoLabel(domain),
        dataClassName: toServiceDtoDataClassName(domain),
        index: toServiceDtoIndex(domain),
        content: toServiceDtoContent(domain),
        encryptedContent: toServiceDtoEncryptedContent(domain),
        textIndexes: toServiceDtoTextIndexes(domain),
        valueDate: toServiceDtoValueDate(domain),
        openingDate: toServiceDtoOpeningDate(domain),
        closingDate: toServiceDtoClosingDate(domain),
        formId: toServiceDtoFormId(domain),
        created: toServiceDtoCreated(domain),
        modified: toServiceDtoModified(domain),
        endOfLife: toServiceDtoEndOfLife(domain),
        author: toServiceDtoAuthor(domain),
        responsible: toServiceDtoResponsible(domain),
        medicalLocationId: toServiceDtoMedicalLocationId(domain),
        comment: toServiceDtoComment(domain),
        status: toServiceDtoStatus(domain),
        invoicingCodes: toServiceDtoInvoicingCodes(domain),
        notes: toServiceDtoNotes(domain),
        qualifiedLinks: toServiceDtoQualifiedLinks(domain),
        codes: toServiceDtoCodes(domain),
        tags: toServiceDtoTags(domain),
        encryptedSelf: toServiceDtoEncryptedSelf(domain),
        securityMetadata: toServiceDtoSecurityMetadata(domain),
    })
}
