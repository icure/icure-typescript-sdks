import {Telecom, TelecomTelecomTypeEnum} from "../models/Telecom.model";
import {Address, AddressAddressTypeEnum} from "../models/Address.model";
import {filteredContactsFromAddressesLike} from "@icure/typescript-common";

export function filteredContactsFromAddresses(
    addresses: Array<Address>,
    telecomType: TelecomTelecomTypeEnum,
    addressType?: AddressAddressTypeEnum
): Telecom | undefined {
    return filteredContactsFromAddressesLike(addresses, telecomType, addressType)
}
