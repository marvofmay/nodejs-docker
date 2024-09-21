interface CreateCategoryRequest {
    name: string;
    description?: string;
}

class CreateCategoryDTO {
    name: string;
    description?: string;

    constructor(request: CreateCategoryRequest) {
        this.name = request.name;
        this.description = request.description;
    }
}

export default CreateCategoryDTO;