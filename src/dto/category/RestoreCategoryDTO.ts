interface RestoreCategoryRequest {
    id: string; // lub inny odpowiedni typ
}

class RestoreCategoryDTO {
    _id: string;

    constructor(request: RestoreCategoryRequest) {
        this._id = request.id;
    }
}

export default RestoreCategoryDTO;