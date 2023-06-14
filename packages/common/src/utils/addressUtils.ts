import {Address, Telecom} from "@icure/api";
import TelecomTypeEnum = Telecom.TelecomTypeEnum;
import AddressTypeEnum = Address.AddressTypeEnum;


export function filteredContactsFromAddresses(addresses: Array<Address>, telecomType: TelecomTypeEnum, addressType?: AddressTypeEnum): Telecom | undefined {
    return addresses
        .filter(address => (!addressType || address.addressType === addressType) && (address.telecoms?.filter(telecom => telecom.telecomType === telecomType) ?? [] as Telecom[]).length > 0)
        .map(address => address.telecoms?.filter(telecom => telecom.telecomType === telecomType)?.pop())
        .filter(telecom => !!telecom)[0]
}
