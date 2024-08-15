const path = require('path');
const PdfGenerator = require('../../utility/PDFGenerator');

class ManufacturerPDFService {
    constructor(pdfFileName) {
        this.pdfGenerator = new PdfGenerator();
        this.outputDir = path.join(__dirname, '../../files/pdf/category');
        this.pdfFileName = pdfFileName;
    }

    async generateManufacturerPDF(manufacturer) {
        const outputPath = path.join(this.outputDir, `${this.pdfFileName}`);

        await this.pdfGenerator.generatePdf(outputPath, (doc) => {
            doc.fontSize(25).text(`Manufacturer: ${manufacturer.name}`, 100, 100);
            doc.fontSize(12).text(`nip: ${manufacturer.nip}`, 100, 150);
        });

        return outputPath;
    }
}

module.exports = ManufacturerPDFService;