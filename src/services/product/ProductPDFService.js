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

            let yPosition = 310;
            const maxHeight = 200;
            const maxWidth = 200;
            const imageGap = 20;

            product.photos.forEach(photo => {
                if (photo.buffer) {
                    const buffer = photo.buffer.buffer ? Buffer.from(photo.buffer.buffer) : photo.buffer;

                    doc.image(buffer, 100, yPosition, {
                        fit: [maxWidth, maxHeight],
                        align: 'center',
                        valign: 'center'
                    });

                    yPosition += maxHeight + imageGap;
                    if (yPosition > doc.page.height - maxHeight) {
                        doc.addPage();
                        yPosition = 50;
                    }
                }
            });
        });

        return outputPath;
    }
}

module.exports = ProductPDFService;