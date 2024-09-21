import CreateCategoryDTO from '../../dto/category/CreateCategoryDTO';

interface UpdateCategoryRequest {
    id: string;
    name: string;
    description?: string;
}

class UpdateCategoryDTO extends CreateCategoryDTO {
    _id: string;

    constructor(request: UpdateCategoryRequest) {
        super(request);
        this._id = request.id;
    }
}

export default UpdateCategoryDTO;
