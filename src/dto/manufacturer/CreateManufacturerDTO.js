class CreateManufacturerDTO {
    constructor(name, shortName, nip, regon, email, www, parentManufacturer, address) {
        this.name = name;
        this.shortName = shortName;
        this.nip = nip;
        this.regon = regon;
        this.email = email;
        this.www = www;
        this.parentManufacturer = this.setParentManufacturer(parentManufacturer);
        this.address = this.setAddress(address);
    }

    setParentManufacturer (parentManufacturer) {
        return parentManufacturer !== '' ? parentManufacturer : null;
    }

    setAddress (address) {
        const street = address.street;
        const zipcode = address.zipcode;
        const city = address.city;
        const country = address.country !== 'Choose...' ? address.country : '';

        return { street, zipcode, city, country };
    }
}

module.exports = CreateManufacturerDTO;
