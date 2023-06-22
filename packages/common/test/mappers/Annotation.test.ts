import {generateAnnotation} from "../models/Annotation.model";
import {Annotation} from "../../src/models/Annotation.model";
import {Annotation as AnnotationEntity} from "@icure/api";
import {initializeMapper, mapper} from "../../src";

describe('Annotation', function () {
    beforeAll(() => {
        initializeMapper(mapper)
    })

    it('should correctly map to AnnotationEntity and back to Annotation', () => {
        const instance = generateAnnotation()
        const iCureInstance = mapper.map(instance, Annotation, AnnotationEntity)
        const newInstance = mapper.map(iCureInstance, AnnotationEntity, Annotation)

        expect(newInstance).toEqual(instance)
    });
});