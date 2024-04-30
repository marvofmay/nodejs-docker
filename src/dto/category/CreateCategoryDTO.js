class CreateCategoryDTO {
    constructor(request) {
        this.name = request.name;
        this.description = request.description;
    }
}

module.exports = CreateCategoryDTO;
