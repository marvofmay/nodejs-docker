class UpdateCategoryDTO {
    constructor(request) {
        this._id = request._id;
        this.name = request.name;
        this.description = request.description;
    }
}

module.exports = UpdateCategoryDTO;
