import { Annotation, CodeStub, HealthElement } from "@icure/api";
import { Identifier as IdentifierEntity } from "@icure/api/icc-api/model/Identifier";
import { Annotation as AnnotationEntity } from "@icure/api/icc-api/model/Annotation";
import { initializeMapper, mapper } from "../../src/mappings/mapper";
import { Condition } from "../../src/models/Condition.model";
import { CodingReference } from "../../src/models/CodingReference.model";
import { SeverityEnum } from "../../src/models/enums/Severity.enum";
import { VerificationStatusEnum } from "../../src/models/enums/VerificationStatus.enum";
import { CategoryEnum } from "../../src/models/enums/Category.enum";
import { ClinicalStatusEnum } from "../../src/models/enums/ClinicalStatus.enum";

let he: HealthElement | undefined = undefined;

beforeAll(() => {
  initializeMapper();

  he = new HealthElement({
    id: "123",
    tags: [
      new CodeStub({
        type: "http://hl7.org/fhir/ValueSet/condition-clinical",
        code: "active",
      }),
      new CodeStub({
        type: "http://hl7.org/fhir/ValueSet/condition-ver-status",
        code: "confirmed",
      }),
      new CodeStub({
        type: "http://hl7.org/fhir/ValueSet/condition-category",
        code: "problem-list-item",
      }),
      new CodeStub({
        type: "http://hl7.org/fhir/ValueSet/condition-severity",
        code: "severe",
      }),
      new CodeStub({
        type: "http://hl7.org/fhir/ValueSet/body-site",
        code: "head",
      }),
      new CodeStub({
        type: "http://hl7.org/fhir/ValueSet/body-site",
        code: "neck",
      }),
      new CodeStub({
        type: "http://hl7.org/fhir/ValueSet/body-site",
        code: "chest",
      }),
      new CodeStub({
        type: "http://hl7.org/fhir/ValueSet/body-site",
        code: "abdomen",
      }),
      new CodeStub({
        type: "http://hl7.org/fhir/ValueSet/body-site",
        code: "back",
      }),
      new CodeStub({
        type: "http://hl7.org/fhir/ValueSet/body-site",
        code: "pelvis",
      }),
      new CodeStub({
        type: "http://hl7.org/fhir/ValueSet/body-site",
        code: "left arm",
      }),
      new CodeStub({
        type: "http://hl7.org/fhir/ValueSet/body-site",
        code: "right arm",
      }),
    ],
    identifiers: [
      new IdentifierEntity({
        system: "http://hl7.org/fhir/ValueSet/condition-clinical",
        value: "active",
      }),
      new IdentifierEntity({
        system: "http://hl7.org/fhir/ValueSet/condition-category",
        value: "confirmed",
      }),
      new IdentifierEntity({
        system: "http://hl7.org/fhir/ValueSet/condition-category",
        value: "problem-list-item",
      }),
      new IdentifierEntity({
        system: "http://hl7.org/fhir/ValueSet/condition-severity",
        value: "severe",
      }),
      new IdentifierEntity({
        system: "http://hl7.org/fhir/ValueSet/body-site",
        value: "head",
      }),
      new IdentifierEntity({
        system: "http://hl7.org/fhir/ValueSet/body-site",
        value: "neck",
      }),
      new IdentifierEntity({
        system: "http://hl7.org/fhir/ValueSet/body-site",
        value: "chest",
      }),
      new IdentifierEntity({
        system: "http://hl7.org/fhir/ValueSet/body-site",
        value: "abdomen",
      }),
      new IdentifierEntity({
        system: "http://hl7.org/fhir/ValueSet/body-site",
        value: "back",
      }),
      new IdentifierEntity({
        system: "http://hl7.org/fhir/ValueSet/body-site",
        value: "pelvis",
      }),
      new IdentifierEntity({
        system: "http://hl7.org/fhir/ValueSet/body-site",
        value: "left arm",
      }),
      new IdentifierEntity({
        system: "http://hl7.org/fhir/ValueSet/body-site",
        value: "right arm",
      }),
    ],
    notes: [
      new AnnotationEntity({
        markdown: { en: "This is a note", fr: "Ceci est une note" },
      }),
    ],
  });
});

test("HealthElement mapped to Condition", () => {
  const condition = mapper.map(he, HealthElement, Condition);
  expect(condition).toBeInstanceOf(Condition);
  expect(condition).toHaveProperty("id", he?.id);
  expect(condition).toHaveProperty("clinicalStatus");
  expect(Object.values(ClinicalStatusEnum)).toContain(
    condition?.clinicalStatus
  );
  expect(condition?.clinicalStatus).toBe("active");
  expect(condition).toHaveProperty("verificationStatus");
  expect(Object.values(VerificationStatusEnum)).toContain(
    condition?.verificationStatus
  );
  expect(condition?.verificationStatus).toBe("confirmed");
  expect(condition).toHaveProperty("category");
  expect(Object.values(CategoryEnum)).toContain(condition?.category);
  expect(condition?.category).toBe("problem-list-item");
  expect(condition).toHaveProperty("severity");
  expect(Object.values(SeverityEnum)).toContain(condition?.severity);
  expect(condition?.severity).toBe("severe");
  expect(condition).toHaveProperty("bodySite");
  expect(condition?.bodySite).toBeInstanceOf(Set<CodingReference>);
  // @ts-ignore
  expect([...(condition?.bodySite?.values() ?? [])]).toHaveLength(8);
  // @ts-ignore
  expect(
    [...(condition?.bodySite?.values() ?? [])]?.map((b) => b.code)
  ).toEqual(
    expect.arrayContaining(
      he!
        .tags!.filter(
          (t) => t.type === "http://hl7.org/fhir/ValueSet/body-site"
        )!
        .map((t) => t!.code)
    )
  );
});

test("HealthElement mapped to Condition and mapped back to Condition", () => {
  const condition = mapper.map(he, HealthElement, Condition);
  const he2 = mapper.map(condition, Condition, HealthElement);

  const mapMarkdownsToStrings: (
    annotation?: Annotation | AnnotationEntity
  ) => string[] = (annotation) =>
    Object.entries(annotation?.markdown ?? {}).map(([k, v]) => `${k}|${v}`);

  expect(he2).toBeInstanceOf(HealthElement);
  expect(he2).toHaveProperty("id", he2?.id);
  expect(he2).toHaveProperty("tags");
  expect(he2!.tags).not.toBe(undefined);
  expect(he2!.tags).toHaveLength(he!.tags!.length);
  expect(he2!.tags).toBeInstanceOf(Array<CodeStub>);
  expect(he2!.tags!.map((t) => t.code)).toEqual(
    expect.arrayContaining(he!.tags!.map((t) => t!.code))
  );
  expect(he2).toHaveProperty("identifiers");
  expect(he2?.identifiers).not.toBe(undefined);
  expect(he2!.identifiers).toBeInstanceOf(Array<IdentifierEntity>);
  expect(he2!.identifiers).toHaveLength(he!.identifiers!.length);
  expect(he2!.identifiers!.map((i) => i.value)).toEqual(
    expect.arrayContaining(he!.identifiers!.map((i) => i.value))
  );
  expect(he2).toHaveProperty("notes");
  expect(he2?.notes).not.toBe(undefined);
  expect(he2!.notes).toHaveLength(he!.notes!.length);
  expect(he2!.notes).toBeInstanceOf(Array<AnnotationEntity>);
  expect(he2!.notes!.flatMap((n) => mapMarkdownsToStrings(n))).toEqual(
    expect.arrayContaining(he!.notes!.flatMap((n) => mapMarkdownsToStrings(n)))
  );
});

test("Condition mapped to HealthElement then get the pojo", () => {
  const condition = mapper.map(he, HealthElement, Condition);

  const conditionPojo = Condition.toJSON(condition);

  expect(conditionPojo).toHaveProperty("id", he?.id);
});
