const path = require('path');
const PdfGenerator = require('../../utility/PDFGenerator');

class CategoryPDFService {
    constructor(pdfFileName) {
        this.pdfGenerator = new PdfGenerator();
        this.outputDir = path.join(__dirname, '../../files/pdf/category');
        this.pdfFileName = pdfFileName;
    }

    async generateCategoryPDF(category) {
        const outputPath = path.join(this.outputDir, `${this.pdfFileName}`);

        await this.pdfGenerator.generatePdf(outputPath, (doc) => {
            doc.fontSize(25).text(`Category: ${category.name}`, 100, 100);
            doc.fontSize(12).text(`Description: ${category.description}`, 100, 150);
        });

        return outputPath;
    }
}

module.exports = CategoryPDFService;