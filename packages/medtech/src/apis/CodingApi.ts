import { CodeDto, CodeLikeApi, CodeLikeApiImpl, Coding, CommonApi, CommonFilter, mapCodeToCoding, mapCodingToCode, PaginatedList } from '@icure/typescript-common'

export interface CodingApi extends CodeLikeApi<Coding> {
    /**
     * @deprecated use {@link CodingApi.createOrModify} instead
     *
     * When modifying a coding, you must ensure that the rev obtained when getting or creating the coding is present as the rev is used to guarantee that the coding has not been modified by a third party.
     * Create or update a [Coding]
     * @param coding
     */
    createOrModifyCoding(coding: Coding): Promise<Coding>

    /**
     * @deprecated use {@link CodingApi.createOrModifyMany} instead
     *
     * When modifying codings, you must ensure that the rev obtained when getting or creating the coding is present as the rev is used to guarantee that the coding has not been modified by a third party.
     * Create or update a batch of [Coding]
     * @param codings
     */
    createOrModifyCodings(codings: Array<Coding>): Promise<Array<Coding>>

    /**
     * @deprecated use {@link CodingApi.filterBy} instead
     *
     * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [Coding] are AllCodingsFilter and CodingsByIdsFilter. This method returns a paginated list of coding (with a cursor that lets you query the following items).
     * Load codings from the database by filtering them using the provided [filter].
     * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
     * @param nextCodingId The id of the first coding in the next page
     * @param limit The maximum number of codings that should contain the returned page. By default, a page contains 1000 codings
     */
    filterCoding(filter: CommonFilter<CodeDto>, nextCodingId?: string, limit?: number): Promise<PaginatedList<Coding>>

    /**
     * @deprecated use {@link CodingApi.get} instead
     *
     * Each coding is uniquely identified by a coding id. The coding id is a UUID. This [codingId] is the preferred method to retrieve one specific coding.
     * Get a [Coding]
     * @param codingId
     */
    getCoding(codingId: string): Promise<Coding>

    /**
     * @deprecated use {@link CodingApi.matchBy} instead
     *
     * Filters are complex selectors that are built by combining basic building blocks. Examples of filters available for [Coding] are AllCodingsFilter and CodingsByIdsFilter. This method returns a paginated list of coding (with a cursor that lets you query the following items).
     * Load coding ids from the database by filtering them using the provided [filter].
     * @param filter The Filter object that describes which condition(s) the elements whose the ids should be returned must fulfill
     */
    matchCoding(filter: CommonFilter<CodeDto>): Promise<Array<string>>
}

export class CodingApiImpl extends CodeLikeApiImpl<Coding> implements CodingApi {
    createOrModifyCoding(coding: Coding): Promise<Coding> {
        return this.createOrModify(coding)
    }

    createOrModifyCodings(codings: Array<Coding>): Promise<Array<Coding>> {
        return this.createOrModifyMany(codings)
    }

    filterCoding(filter: CommonFilter<CodeDto>, nextCodingId?: string, limit?: number): Promise<PaginatedList<Coding>> {
        return this.filterBy(filter, nextCodingId, limit)
    }

    getCoding(codingId: string): Promise<Coding> {
        return this.get(codingId)
    }

    matchCoding(filter: CommonFilter<CodeDto>): Promise<Array<string>> {
        return this.matchBy(filter)
    }
}

export const codingApi = (api: CommonApi): CodingApi => {
    return new CodingApiImpl(
        {
            toDomain(dto: CodeDto): Coding {
                return mapCodeToCoding(dto)
            },
            toDto(domain: Coding): CodeDto {
                return mapCodingToCode(domain)
            },
        },
        api.errorHandler,
        api.baseApi.codeApi,
    )
}
