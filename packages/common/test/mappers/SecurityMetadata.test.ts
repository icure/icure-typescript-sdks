import {generateSecurityMetadata} from "../models/SecurityMetadata.model";
import {
    mapSecurityMetadataDtoToSecurityMetadata,
    mapSecurityMetadataToSecurityMetadataDto,
    SecurityMetadata
} from "../../src";

describe('SecurityMetadata', function () {

    it('should correctly map to SecurityMetadataEntity and back to SecurityMetadata', () => {
        const instance = generateSecurityMetadata()
        const iCureInstance = mapSecurityMetadataToSecurityMetadataDto(instance)
        const newInstance = mapSecurityMetadataDtoToSecurityMetadata(iCureInstance)

        expect(newInstance).toEqual(instance)
    })
})