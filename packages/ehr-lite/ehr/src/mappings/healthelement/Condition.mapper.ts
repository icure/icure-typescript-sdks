import {afterMap, constructUsing, createMap, forMember, mapFrom, mapWith} from "@automapper/core";
import {mapper} from "../mapper";
import {CodeStub, HealthElement, Identifier as IdentifierEntity} from "@icure/api";
import {Condition} from "../../models/Condition.model";
import {CodingReference} from "../../models/CodingReference.model";
import {Annotation} from "../../models/Annotation.model";
import {Annotation as AnnotationEntity} from "@icure/api/icc-api/model/Annotation";
import {Identifier} from "../../models/Identifier.model";
import {ClinicalStatusEnum} from "../../models/enums/ClinicalStatus.enum";
import {VerificationStatusEnum} from "../../models/enums/VerificationStatus.enum";
import {CategoryEnum} from "../../models/enums/Category.enum";
import {SeverityEnum} from "../../models/enums/Severity.enum";

export const initializeConditionMapper = () => {
    createMap(
        mapper,
        HealthElement,
        Condition,
        forMember(c => c.id, mapFrom(c => c.id)),
        forMember(c => c.clinicalStatus, mapFrom(c => c.tags?.find(t => t?.type === "http://hl7.org/fhir/ValueSet/condition-clinical")?.code as ClinicalStatusEnum | undefined)),
        forMember(c => c.verificationStatus, mapFrom(c => c.tags?.find(t => t?.type === "http://hl7.org/fhir/ValueSet/condition-ver-status")?.code as VerificationStatusEnum | undefined)),
        forMember(c => c.category, mapFrom(c => c.tags?.find(t => t?.type === "http://hl7.org/fhir/ValueSet/condition-category")?.code as CategoryEnum | undefined)),
        forMember(c => c.severity, mapFrom(c => c.tags?.find(t => t?.type === "http://hl7.org/fhir/ValueSet/condition-severity")?.code as SeverityEnum | undefined)),
        forMember(c => c.bodySite, mapWith(CodingReference, CodeStub, c => c.tags?.filter(t => t?.type === "http://hl7.org/fhir/ValueSet/body-site"))),
        forMember(c => c.tags, mapWith(CodingReference, CodeStub, c => c.tags?.filter(t => t?.type !== "http://hl7.org/fhir/ValueSet/condition-clinical" && t?.type !== "http://hl7.org/fhir/ValueSet/condition-ver-status" && t?.type !== "http://hl7.org/fhir/ValueSet/condition-category" && t?.type !== "http://hl7.org/fhir/ValueSet/condition-severity" && t?.type !== "http://hl7.org/fhir/ValueSet/body-site") ?? [])),
        forMember(c => c.notes, mapWith(Annotation, AnnotationEntity, c => c.notes)),
        forMember(c => c.created, mapFrom(c => c.created)),
        forMember(c => c.modified, mapFrom(c => c.modified)),
        forMember(c => c.identifiers, mapWith(IdentifierEntity, Identifier, c => c.identifiers)),
        forMember(c => c.rev, mapFrom(c => c.rev)),
        forMember(c => c.responsible, mapFrom(c => c.responsible)),
        forMember(c => c.medicalLocationId, mapFrom(c => c.medicalLocationId)),
        forMember(c => c.endOfLife, mapFrom(c => c.endOfLife)),
        forMember(c => c.deletionDate, mapFrom(c => c.deletionDate)),
        forMember(c => c.healthcareElementId, mapFrom(c => c.healthElementId)),
        forMember(c => c.recordedDate, mapFrom(c => c.valueDate)),
        forMember(c => c.openingDate, mapFrom(c => c.openingDate)),
        forMember(c => c.closingDate, mapFrom(c => c.closingDate)),
        forMember(c => c.description, mapFrom(c => c.descr)),
        forMember(c => c.codes, mapWith(CodingReference, CodeStub, c => c.codes)),
        afterMap((src, dest) => {
            Object.assign(dest, {tags: !!dest.tags ? dest.tags instanceof Array ? new Set(dest.tags) : dest.tags : undefined})
            Object.assign(dest, {bodySite: !!dest.bodySite ? dest.bodySite instanceof Array ? new Set(dest.bodySite) : dest.bodySite : undefined})
            Object.assign(dest, {codes: !!dest.codes ? dest.codes instanceof Array ? new Set(dest.codes) : dest.codes : undefined})
            Object.assign(dest, {identifiers: !!dest.identifiers ? dest.identifiers instanceof Array ? new Set(dest.identifiers) : dest.identifiers : undefined})

            return dest
        })
    )

    createMap(
        mapper,
        Condition,
        HealthElement,
        forMember(c => c.id, mapFrom(c => c.id)),
        forMember(c => c.tags, mapFrom(c => [
            ...(c.clinicalStatus ? [new CodeStub({type: "http://hl7.org/fhir/ValueSet/condition-clinical", code: c.clinicalStatus})] : []),
            ...(c.verificationStatus ? [new CodeStub({type: "http://hl7.org/fhir/ValueSet/condition-ver-status", code: c.verificationStatus})] : []),
            ...(c.category ? [new CodeStub({type: "http://hl7.org/fhir/ValueSet/condition-category", code: c.category})] : []),
            ...(c.severity ? [new CodeStub({type: "http://hl7.org/fhir/ValueSet/condition-severity", code: c.severity})] : []),
            ...([...(c?.bodySite ?? [])]?.map(t => new CodeStub({type: "http://hl7.org/fhir/ValueSet/body-site", code: t.code})) ?? []),
            ...([...(c?.tags ?? [])]?.map(t => new CodeStub({type: t.type, code: t.code})) ?? []),
        ])),
        forMember(c => c.notes, mapWith(AnnotationEntity, Annotation, c => c.notes)),
        forMember(c => c.created, mapFrom(c => c.created)),
        forMember(c => c.modified, mapFrom(c => c.modified)),
        forMember(c => c.identifiers, mapWith(Identifier, IdentifierEntity, c => c.identifiers)),
        forMember(c => c.rev, mapFrom(c => c.rev)),
        forMember(c => c.responsible, mapFrom(c => c.responsible)),
        forMember(c => c.medicalLocationId, mapFrom(c => c.medicalLocationId)),
        forMember(c => c.endOfLife, mapFrom(c => c.endOfLife)),
        forMember(c => c.deletionDate, mapFrom(c => c.deletionDate)),
        forMember(c => c.healthElementId, mapFrom(c => c.healthcareElementId)),
        forMember(c => c.valueDate, mapFrom(c => c.recordedDate)),
        forMember(c => c.openingDate, mapFrom(c => c.openingDate)),
        forMember(c => c.closingDate, mapFrom(c => c.closingDate)),
        forMember(c => c.descr, mapFrom(c => c.description)),
        forMember(c => c.codes, mapWith(CodeStub, CodingReference, c => c.codes)),
    )
}
