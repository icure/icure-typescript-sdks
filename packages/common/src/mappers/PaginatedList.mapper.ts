import {PaginatedList} from "../models/PaginatedList.model";
import {
    PaginatedListCode as PaginatedListCodeDto,
    PaginatedListDevice as PaginatedListDeviceDto,
    PaginatedListHealthcareParty as PaginatedListHealthcarePartyDto,
    PaginatedListHealthElement as PaginatedListHealthElementDto,
    PaginatedListMaintenanceTask as PaginatedListMaintenanceTaskDto,
    PaginatedListPatient as PaginatedListPatientDto,
    PaginatedListService as PaginatedListServiceDto,
    PaginatedListContact as PaginatedListContactDto,
} from "@icure/api";
import {PaginatedDocumentKeyAndIdPairObject} from "../models/PaginatedDocumentKeyAndIdPairObject.model";


type AnyPaginatedListDto =
    | PaginatedListCodeDto
    | PaginatedListDeviceDto
    | PaginatedListHealthcarePartyDto
    | PaginatedListHealthElementDto
    | PaginatedListMaintenanceTaskDto
    | PaginatedListPatientDto
    | PaginatedListServiceDto
    | PaginatedListContactDto

export function toPaginatedList<DtoElement, DsElement>(
    dto: AnyPaginatedListDto & { rows?: DtoElement[] },
    dtoElementToDomain: (dto: DtoElement) => DsElement
): PaginatedList<DsElement> {
    if (!dto.rows) throw new Error("Internal error: paginated list value does not have rows")
    const rows = dto.rows.map(dtoElementToDomain)
    return new PaginatedList({
        rows,
        nextKeyPair: dto.nextKeyPair
            ? new PaginatedDocumentKeyAndIdPairObject({
                startKey: dto.nextKeyPair.startKey,
                startKeyDocId: dto.nextKeyPair.startKeyDocId,
            })
            : undefined
    })
}