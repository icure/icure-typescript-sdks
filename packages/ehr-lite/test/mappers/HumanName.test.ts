import {initializeMapper, mapper} from "../../src/mappers/mapper";
import {generateHumanName} from "../models/HumanName.model";
import {HumanName} from "../../src/models/HumanName.model";
import {PersonName} from "@icure/api";
import {initializeMapper as commonInitializeMapper} from "@icure/typescript-common";

describe('HumanName', function () {
    beforeAll(() => {
        commonInitializeMapper(mapper)
        initializeMapper(mapper)
    })

    it('should correctly map to PersonName and back to HumanName', () => {
        const instance = generateHumanName()
        const iCureInstance = mapper.map(instance, HumanName, PersonName)
        const newInstance = mapper.map(iCureInstance, PersonName, HumanName)

        expect(newInstance).toEqual(instance)
    })
})