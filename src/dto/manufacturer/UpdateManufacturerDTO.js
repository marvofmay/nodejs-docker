const CreateManufacturerDTO = require('../../dto/manufacturer/CreateManufacturerDTO');

class UpdateManufacturerDTO extends CreateManufacturerDTO {
    constructor(request) {
        super(request);
        this.id = request._id;
    }
}

module.exports = UpdateManufacturerDTO;
