const CreateCategoryDTO = require('../../dto/category/CreateCategoryDTO');

class UpdateCategoryDTO extends CreateCategoryDTO {
    constructor(request) {
        super(request);
        this._id = request._id;
    }
}

module.exports = UpdateCategoryDTO;
