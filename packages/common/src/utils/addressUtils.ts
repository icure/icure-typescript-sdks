import {Address, Telecom} from "@icure/api";
import TelecomTypeEnum = Telecom.TelecomTypeEnum;
import AddressTypeEnum = Address.AddressTypeEnum;

type AddressLike<T extends TelecomLike> = {
    telecoms?: Array<T>,
    addressType?: AddressTypeEnum
}

type TelecomLike = {
    telecomType?: TelecomTypeEnum
}

export function filteredContactsFromAddressesLike<A extends AddressLike<T>, T extends TelecomLike>(
    addresses: Array<A>,
    telecomType: TelecomTypeEnum,
    addressType?: AddressTypeEnum
): T | undefined {
    return addresses
        .filter(address => (!addressType || address.addressType === addressType) && (address.telecoms?.filter(telecom => telecom.telecomType === telecomType) ?? [] as Telecom[]).length > 0)
        .map(address => address.telecoms?.filter(telecom => telecom.telecomType === telecomType)?.pop())
        .filter(telecom => !!telecom)[0]
}
