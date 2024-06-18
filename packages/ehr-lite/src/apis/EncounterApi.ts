import { CommonApi, ContactDto, ContactLikeApiImpl, ContactLikeApi } from '@icure/typescript-common'
import { Encounter } from '../models/Encounter.model'
import { mapContactDtoToEncounter, mapEncounterToContactDto } from '../mappers/Encounter.mapper'

export interface EncounterApi extends ContactLikeApi<Encounter> {}

class EncounterApiImpl extends ContactLikeApiImpl<Encounter> implements EncounterApi {}

export const encounterApi = (api: CommonApi, basePath: string): EncounterApi =>
    new EncounterApiImpl(
        {
            toDomain(dto: ContactDto): Encounter {
                return mapContactDtoToEncounter(dto)
            },
            toDto(domain: Encounter): ContactDto {
                return mapEncounterToContactDto(domain)
            },
        },
        api.errorHandler,
        api.baseApi.contactApi,
        api.baseApi.userApi,
        api.baseApi.patientApi,
        api.baseApi.dataOwnerApi,
        api.baseApi.authApi,
        basePath,
    )
