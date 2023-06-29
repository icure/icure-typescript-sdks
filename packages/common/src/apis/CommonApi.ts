import { Apis } from '@icure/api'

export class CommonApi {
    constructor(protected readonly _baseApi: Apis) {}

    get baseApi(): Apis {
        return this._baseApi
    }
}
