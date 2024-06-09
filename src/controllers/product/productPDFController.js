const productRepository = require('../../repositories/product/repository');
const ProductPDFService = require('../../services/product/ProductPDFService');
const fs = require('fs');
const DateUtility = require('../../utility/DateUtility');

const productPDF = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productRepository.getProductById(productId);

        if (! product) {
            return res.status(404).send('Product not found');
        }

        const currentDate = new Date();
        const formattedDate = DateUtility.formatDateYMDHISSeparatedBDash(currentDate);
        const formattedProductName = product.name.replace(/\s+/g, '-');
        const pdfFileName = `${formattedProductName}-${formattedDate}.pdf`;
        const productPdfService = new ProductPDFService(pdfFileName);
        const pdfPath = await productPdfService.generateProductPDF(product);

        res.setHeader('Content-Disposition', `attachment; filename=${pdfFileName}`);
        res.setHeader('Content-Type', 'application/pdf');

        const fileStream = fs.createReadStream(pdfPath);

        fileStream.pipe(res);
    } catch (error) {
        console.error('Error generating PDF:', error);

        res.status(500).send('Error generating PDF');
    }
}

module.exports = {
    productPDF,
}