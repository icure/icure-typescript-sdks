import { Telecom, TelecomTelecomTypeEnum } from '../models/Telecom.model'
import { Address, AddressAddressTypeEnum } from '../models/Address.model'
import { findTelecomOfAddressesLike } from '@icure/typescript-common'

export function filteredContactsFromAddresses(addresses: Array<Address>, telecomType: TelecomTelecomTypeEnum, addressType?: AddressAddressTypeEnum): Telecom | undefined {
    return findTelecomOfAddressesLike(
        addresses,
        telecomType,
        addressType,
        (address) => address.addressType,
        (address) => address.telecoms,
        (telecom) => telecom.telecomType,
    )
}
