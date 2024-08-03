class CreateManufacturerDTO {
    constructor(request) {
        this.name = request.name ?? '';
        this.shortName = request.shortName ?? '';
        this.nip = request.nip ?? '';
        this.regon = request.regon ?? '';
        this.email = request.email ?? '';
        this.www = request.www ?? '';
        this.parentManufacturer = this.setParentManufacturer(request.parentManufacturer);
        this.address = this.setAddress(request.address);
    }

    setParentManufacturer (parentManufacturer) {
        return parentManufacturer !== '' ? parentManufacturer : null;
    }

    setAddress (address) {
        const street = address?.street ?? '';
        const zipcode = address?.zipcode ?? '';
        const city = address?.city ?? '';
        const country = address?.country !== 'Choose...' ? address?.country : '';

        return { street, zipcode, city, country };
    }
}

module.exports = CreateManufacturerDTO;
