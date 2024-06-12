import { Binary } from '../models/Binary.model'
import { b64_2ab, ua2b64 } from '@icure/api'

export const mapDocumentAttachmentToBinary = (attachment: { data: ArrayBuffer; filename: string; uti: string }, mimeTypeProvider: (uti: string) => string) => {
    return new Binary({
        contentType: mimeTypeProvider(attachment.uti),
        data: ua2b64(attachment.data),
        filename: attachment.filename,
    })
}

export const mapBinaryToDocumentAttachment = (binary: Binary, utiProvider: (mimeType: string, extension: string) => string) => {
    return {
        data: b64_2ab(binary.data),
        filename: binary.filename,
        uti: utiProvider(binary.contentType, binary.filename.slice(binary.filename.lastIndexOf('.'))),
    }
}
