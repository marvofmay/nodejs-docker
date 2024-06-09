const path = require('path');
const PdfGenerator = require('../../utility/PDFGenerator');

class ProductPDFService {
    constructor(pdfFileName) {
        this.pdfGenerator = new PdfGenerator();
        this.outputDir = path.join(__dirname, '../../files/pdf/product');
        this.pdfFileName = pdfFileName;
    }

    async generateProductPDF(product) {
        const outputPath = path.join(this.outputDir, `${this.pdfFileName}`);

        await this.pdfGenerator.generatePdf(outputPath, (doc) => {
            doc.fontSize(25).text(`Product: ${product.name}`, 100, 100);
            doc.fontSize(12).text(`EAN: ${product.ean}`, 100, 150);
            doc.fontSize(12).text('Price (netto):' + (product.price > 0 ? product.price : '---'), 100, 170);
            doc.fontSize(12).text('Bonus price:' + (product.bonusPercent > 0 ? product.bonusPercent : '---'), 100, 190);
            doc.fontSize(12).text('VAT:' + (product.vat ?? '---'), 100, 210);
            doc.fontSize(12).text('Manufacturer:' + (product.manufacturer[0]?.name ?? '---'), 100, 230);
            doc.fontSize(12).text('Description:' + (product.description !== '' ? product.description : '---'), 100, 250);
            doc.fontSize(12).text('Is active:' + (product.active ? 'Yes' : 'No'), 100, 270);
            const categoriesTxt = product.categories.map(category => category.name).join(', ');
            doc.fontSize(12).text(`Categories: ${categoriesTxt}`, 100, 290);
        });

        return outputPath;
    }
}

module.exports = ProductPDFService;