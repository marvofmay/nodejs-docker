const Photo = require('../../models/photo');

class PhotoService {
    async createPhoto(createPhotoDTO) {
        try {
            const photo = new Photo({
                originalFileName: createPhotoDTO.originalFileName,
                title: createPhotoDTO.title,
                description: createPhotoDTO.description,
                encoding: createPhotoDTO.encoding,
                buffer: createPhotoDTO.buffer,
                mimeType: createPhotoDTO.mimeType,
                size: createPhotoDTO.size,
                active: createPhotoDTO.active,
                deletedAt: createPhotoDTO.deletedAt,
            });
            const result = await photo.save();

            if (result) {
                return { success: true, message: 'Photo saved successfully.', photoId: result._id };
            } else {
                return { success: false, message: 'Photo not saved.', photoId: null };
            }
        } catch (error) {
            console.error(error);

            throw new Error('Failed to create product.');
        }
    }

    async deletePhoto (photoId) {
        try {
            const result = await Photo.findByIdAndDelete(photoId, null);
            if (result) {
                return { success: true, message: 'Photo deleted successfully.' };
            } else {
                return { success: false, message: 'Photo not found.' };
            }
        } catch (err) {
            console.error(err);

            throw new Error('Failed to delete photo.');
        }
    }
}

module.exports = PhotoService;