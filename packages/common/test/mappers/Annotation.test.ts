import { generateAnnotation } from '../models/Annotation.model'
import { Annotation } from '../../src'
import { mapAnnotationDtoToAnnotation, mapAnnotationToAnnotationDto } from '../../src'

describe('Annotation', function () {
    it('should correctly map to AnnotationEntity and back to Annotation', () => {
        const instance = generateAnnotation()
        const iCureInstance = mapAnnotationToAnnotationDto(instance)
        const newInstance = mapAnnotationDtoToAnnotation(iCureInstance)

        expect(newInstance).toEqual(instance)
    })
})
