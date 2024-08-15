const manufacturerRepository = require('../../repositories/manufacturer/repository');
const ManufacturerPDFService = require('../../services/manufacturer/ManufacturerPDFService');
const fs = require('fs');
const DateUtility = require('../../utility/DateUtility');
const Logger = require('../../utility/Logger');

const manufacturerPDF = async (req, res) => {
    const manufacturerId = req.params.id;
    try {
        const manufacturer = await manufacturerRepository.getManufacturerById(manufacturerId);
        if (! manufacturer) {
            throw new Error('Manufacturer not found');
        }

        const currentDate = new Date();
        const formattedDate = DateUtility.formatDateYMDHISSeparatedBDash(currentDate);
        const formattedManufacturerName = manufacturer.name.replace(/\s+/g, '-');
        const pdfFileName = `${formattedManufacturerName}-${formattedDate}.pdf`;
        const manufacturerPdfService = new ManufacturerPDFService(pdfFileName);
        const pdfPath = await manufacturerPdfService.generateManufacturerPDF(manufacturer);

        res.setHeader('Content-Disposition', `attachment; filename=${pdfFileName}`);
        res.setHeader('Content-Type', 'application/pdf');

        const fileStream = fs.createReadStream(pdfPath);

        fileStream.pipe(res);
        Logger.info(`PDF generated successfully for manufacturer ID: ${manufacturerId}`);
    } catch (error) {
        Logger.error(`Error generating PDF for manufacturer ID: ${manufacturerId}: ${error.message}`);

        res.status(500).send('Error generating PDF');
    }
}

module.exports = {
    manufacturerPDF,
}