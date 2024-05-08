const CreateProductDTO = require('../../dto/product/CreateProductDTO');

class UpdateProductDTO extends  CreateProductDTO{
    categories = [];
    constructor(reqBody, photos) {
        super(reqBody, photos);
        this._id = reqBody._id ?? '';

        if (reqBody.categories.length > 0) {
            reqBody.categories.forEach(categoryId => {
                this.categories.push({_id: categoryId});
            })
        }
    }
}

module.exports = UpdateProductDTO;