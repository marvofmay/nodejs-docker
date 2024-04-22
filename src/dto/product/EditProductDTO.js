class EditProductDTO {
    constructor(reqBody, photos) {
        this.name = reqBody.name ?? '';
        // this.description = reqBody.description ?? '';
        // this.ean = reqBody.ean ?? '';
        // this.price = reqBody.price ?? 0;
        // this.vat = reqBody.vat ?? 0;
        // this.bonusPercent = reqBody.bonusPercent ?? 0;
        // this.manufacturer = reqBody.manufacturer ?? '';
        // this.categories = reqBody.categories ?? [];
        // this.photos = photos ?? [];
        // this.active = reqBody.active === 'on';
    }
}

module.exports = EditProductDTO;