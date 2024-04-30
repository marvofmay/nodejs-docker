class UpdateProductDTO {
    constructor(reqBody, photos) {
        this.categories = [];
        this.photos = photos ?? [];

        this._id = reqBody._id ?? '';
        this.name = reqBody.name ?? '';
        this.description = reqBody.description ?? '';
        this.ean = reqBody.ean ?? '';
        this.price = reqBody.price ?? 0;
        this.vat = reqBody.vat ?? 0;
        this.bonusPercent = reqBody.bonusPercent ?? 0;
        this.manufacturer = reqBody.manufacturer ?? '';
        this.photos = photos;
        this.active = reqBody.active === 'on';

        if (reqBody.categories.length > 0) {
            reqBody.categories.forEach(categoryId => {
                this.categories.push({_id: categoryId});
            })
        }
    }
}

module.exports = UpdateProductDTO;