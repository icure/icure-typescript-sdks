import { MessageReadStatus } from '../models/MessageReadStatus.model'
import { MessageReadStatus as MessageReadStatusDto } from '@icure/api'

function toMessageReadStatusDtoTime(domain: MessageReadStatus): number | null {
    return domain.time
}

function toMessageReadStatusDtoRead(domain: MessageReadStatus): boolean | undefined {
    return domain.read
}

function toMessageReadStatusTime(dto: MessageReadStatusDto): number | undefined {
    return dto.time
}

function toMessageReadStatusRead(dto: MessageReadStatusDto): boolean | undefined {
    return dto.read
}

export function mapMessageReadStatusDtoToMessageReadStatus(dto: MessageReadStatusDto): MessageReadStatus {
    return new MessageReadStatus({
        time: toMessageReadStatusTime(dto),
        read: toMessageReadStatusRead(dto),
    })
}

export function mapMessageReadStatusToMessageReadStatusDto(domain: MessageReadStatus): MessageReadStatusDto {
    return new MessageReadStatusDto({
        time: toMessageReadStatusDtoTime(domain),
        read: toMessageReadStatusDtoRead(domain),
    })
}
