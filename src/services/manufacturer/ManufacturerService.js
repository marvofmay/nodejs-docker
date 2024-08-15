const Manufacturer = require('../../models/manufacturer');

class ManufacturerService {
    async createManufacturer(createManufacturerDTO) {
        try {
            const manufacturer = new Manufacturer({
                name: createManufacturerDTO.name,
                shortName: createManufacturerDTO.shortName,
                nip: createManufacturerDTO.nip,
                regon: createManufacturerDTO.regon,
                email: createManufacturerDTO.email,
                www: createManufacturerDTO.www,
                parentManufacturer: createManufacturerDTO.parentManufacturer,
                address: createManufacturerDTO.address
            });
            const result = await manufacturer.save();

            if (result) {
                return {
                    success: true,
                    message: 'Manufacturer saved successfully',
                    manufacturer: result,
                };
            } else {
                return { success: false, message: 'Manufacturer not saved' };
            }
        } catch (error) {
            console.error(error);

            throw new Error('Failed to create Manufacturer');
        }
    }

    async updateManufacturer(updateManufacturerDTO) {
        try {
            const manufacturerId = updateManufacturerDTO.id;
            const newData = {
                name: updateManufacturerDTO.name,
                shortName: updateManufacturerDTO.shortName,
                nip: updateManufacturerDTO.nip,
                regon: updateManufacturerDTO.regon,
                email: updateManufacturerDTO.email,
                www: updateManufacturerDTO.www,
                parentManufacturer: updateManufacturerDTO.parentManufacturer,
                address: updateManufacturerDTO.address,
            }
            const result = await Manufacturer.updateOne({_id: manufacturerId}, {$set: newData});

            if (result.modifiedCount === 1) {
                return { success: true, message: 'Manufacturer updated successfully' };
            } else {
                return {success: false, message: 'Manufacturer not found or not updated'};
            }
        } catch (err) {
            console.error(err);

            throw new Error('Failed to update manufacturer');
        }
    }

    async deleteManufacturer (manufacturerId, safe = true) {
        try {
            const manufacturer = await Manufacturer.findById(manufacturerId);
            if (! manufacturer) {
                return {
                    success: false,
                    message: 'Manufacturer not found',
                    status: 400
                };
            }

            if (safe) {
                await Manufacturer.findByIdAndUpdate(manufacturerId, {deletedAt: new Date()}, {new: true});
            } else {
                await Manufacturer.findByIdAndDelete(manufacturerId);
            }

            return {
                success: true,
                message: 'Manufacturer marked as deleted successfully',
                status: 200
            };
        } catch (err) {
            console.error(err);

            return {
                success: false,
                message: 'Failed to delete manufacturer',
                status: 500
            };
        }
    }

    async restoreManufacturer (manufacturerId) {
        try {
            const manufacturer = await Manufacturer.findById(manufacturerId);
            if (! manufacturer) {
                return {
                    success: false,
                    message: 'Manufacturer not found',
                    status: 404
                };
            }

            await Manufacturer.findByIdAndUpdate(manufacturerId, {deletedAt: null, updatedAt: Date.now()}, {new: true});

            return {
                success: true,
                message: 'Manufacturer restored successfully',
                status: 200
            };
        } catch (err) {
            console.error(err);

            return {
                success: false,
                message: 'Failed to restore manufacturer',
                status: 500
            };
        }
    }
}

module.exports = ManufacturerService;