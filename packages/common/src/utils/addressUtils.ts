import { Address, Telecom } from '@icure/api'
import TelecomTypeEnum = Telecom.TelecomTypeEnum
import AddressTypeEnum = Address.AddressTypeEnum

export function findTelecomOfAddresses(addresses: Array<Address>, telecomType: TelecomTypeEnum, addressType?: AddressTypeEnum): Telecom | undefined {
    return findTelecomOfAddressesLike(
        addresses,
        telecomType,
        addressType,
        (address) => address.addressType,
        (address) => address.telecoms,
        (telecom) => telecom.telecomType
    )
}

export function findTelecomOfAddressesLike<DSAddress, DSTelecom>(
    addresses: Array<DSAddress>,
    telecomType: TelecomTypeEnum,
    addressType: AddressTypeEnum | undefined,
    addressTypeOf: (address: DSAddress) => AddressTypeEnum | undefined,
    telecoms: (address: DSAddress) => Array<DSTelecom> | undefined,
    telecomTypeOf: (telecom: DSTelecom) => TelecomTypeEnum | undefined
): DSTelecom | undefined {
    for (const address of addresses) {
        if (!addressType || addressTypeOf(address) === addressType) {
            for (const telecom of telecoms(address) ?? []) {
                if (telecomTypeOf(telecom) === telecomType) {
                    return telecom
                }
            }
        }
    }
    return undefined
}
