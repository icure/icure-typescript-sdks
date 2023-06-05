import {initializeMapper, mapper} from "../../src/mappings/mapper";
import {generateSecurityMetadata} from "../models/SecurityMetadata.model";
import {SecurityMetadata} from "../../src/models/SecurityMetadata.model";
import {SecurityMetadata as SecurityMetadataEntity} from "@icure/api";

describe('SecurityMetadata', function () {
    beforeAll(() => {
        initializeMapper()
    })

    it('should correctly map to SecurityMetadataEntity and back to SecurityMetadata', () => {
        const instance = generateSecurityMetadata()
        const iCureInstance = mapper.map(instance, SecurityMetadata, SecurityMetadataEntity)
        const newInstance = mapper.map(iCureInstance, SecurityMetadataEntity, SecurityMetadata)

        expect(newInstance).toEqual(instance)
    })
})