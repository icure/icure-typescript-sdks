import {initializeMapper, mapper} from "../../src/mappers/mapper";
import {generateLocalComponent} from "../models/LocalComponent.model";
import {LocalComponent} from "../../src/models/LocalComponent.model";
import {Content} from "@icure/api";
import {initializeMapper as commonInitializeMapper} from "@icure/typescript-common";

describe('LocalComponent', function () {
    beforeAll(() => {
        commonInitializeMapper(mapper)
        initializeMapper(mapper)
    })

    it('should correctly map to Content and back to LocalComponent', () => {
        const instance = generateLocalComponent()
        const iCureInstance = mapper.map(instance, LocalComponent, Content)
        const newInstance = mapper.map(iCureInstance, Content, LocalComponent)

        expect(newInstance).toEqual(instance)
    })
})