import { CodeStub } from '@icure/api';
import { mapTo } from '../utils/decorators';

@mapTo(CodeStub)
export class CodingReference {
    id: string
    type?: string
    code?: string
    version?: string
    context?: string
    contextLabel?: string

    toJSON(): ICodingReference {
        return {
        id: this.id,
        type: this.type,
        code: this.code,
        version: this.version,
        context: this.context,
        contextLabel: this.contextLabel,
        }
    }

    constructor(json: Partial<ICodingReference> & { id: string }) {
        this.id = json["id"]!
        if (json["type"] !== undefined) {
            this.type = json["type"]!
        }
        if (json["code"] !== undefined) {
            this.code = json["code"]!
        }
        if (json["version"] !== undefined) {
            this.version = json["version"]!
        }
        if (json["context"] !== undefined) {
            this.context = json["context"]!
        }
        if (json["contextLabel"] !== undefined) {
            this.contextLabel = json["contextLabel"]!
        }
    }
}

export interface ICodingReference {
    id: string
    type?: string
    code?: string
    version?: string
    context?: string
    contextLabel?: string
}
