import { Binary } from '../models/Binary.model'

export const mapDocumentAttachmentToBinary = (attachment: { data: ArrayBuffer; filename: string; uti: string }, mimeTypeProvider: (uti: string) => string) => {
    return new Binary({
        contentType: mimeTypeProvider(attachment.uti),
        data: attachment.data,
        filename: attachment.filename,
    })
}

export const mapBinaryToDocumentAttachment = (binary: Binary, utiProvider: (mimeType: string, extension: string) => string) => {
    return {
        data: binary.data,
        filename: binary.filename,
        uti: utiProvider(binary.contentType, binary.filename.slice(binary.filename.lastIndexOf('.'))),
    }
}
