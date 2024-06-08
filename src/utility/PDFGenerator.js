const PDFDocument = require('pdfkit');
const fs = require('fs');

class PdfGenerator {
    constructor() {}

    async generatePdf(outputPath, contentCallback) {
        return new Promise((resolve, reject) => {
            const doc = new PDFDocument();
            const writeStream = fs.createWriteStream(outputPath);

            doc.pipe(writeStream)
                .on('finish', () => resolve())
                .on('error', (error) => reject(error));

            contentCallback(doc);

            doc.end();
        });
    }
}

module.exports = PdfGenerator;