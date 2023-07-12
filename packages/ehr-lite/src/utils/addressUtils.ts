import {findTelecomOfAddressesLike} from "@icure/typescript-common";
import {Location} from "../models/Location.model";
import {ContactPointTelecomTypeEnum} from "../models/enums/ContactPointTelecomType.enum";
import {LocationAddressTypeEnum} from "../models/enums/LocationAddressType.enum";
import {ContactPoint} from "../models/ContactPoint.model";

export function filteredContactsFromAddresses(
    locations: Array<Location>,
    telecomType: ContactPointTelecomTypeEnum,
    addressType?: LocationAddressTypeEnum
): ContactPoint | undefined {
    return findTelecomOfAddressesLike(
        locations,
        telecomType,
        addressType,
        (location) => location.addressType,
        (location) => location.telecoms,
        (telecom) => telecom.system,
    )
}
