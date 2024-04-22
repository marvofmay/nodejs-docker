class CreatePhotoDTO {
    constructor(originalname, encoding, mimetype, buffer, size, title, description, active, deletedAt) {
        this.title = title ?? originalname;
        this.description = description ?? '';
        this.originalFileName = originalname;
        this.encoding = encoding;
        this.mimeType = mimetype;
        this.buffer = buffer;
        this.size = size;
        this.active = active ?? true;
        this.deletedAt = deletedAt ?? null;
    }
}

module.exports = CreatePhotoDTO;
