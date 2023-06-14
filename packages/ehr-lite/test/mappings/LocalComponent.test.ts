import {initializeMapper, mapper} from "../../src/mappings/mapper";
import {generateLocalComponent} from "../models/LocalComponent.model";
import {LocalComponent} from "../../src/models/LocalComponent.model";
import {Content} from "@icure/api";

describe('LocalComponent', function () {
    beforeAll(() => {
        initializeMapper()
    })

    it('should correctly map to Content and back to LocalComponent', () => {
        const instance = generateLocalComponent()
        const iCureInstance = mapper.map(instance, LocalComponent, Content)
        const newInstance = mapper.map(iCureInstance, Content, LocalComponent)

        expect(newInstance).toEqual(instance)
    })
})