const productRepository = require('../../repositories/product/repository');
const ProductPDFService = require('../../services/product/ProductPDFService');
const fs = require('fs');
const DateUtility = require('../../utility/DateUtility');
const Logger = require("../../utility/Logger");

const productPDF = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await productRepository.getProductById(productId);

        if (! product) {
            throw new Error('Product not found');
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
        Logger.info(`PDF generated successfully for category ID: ${productId}`);
    } catch (error) {
        Logger.error(`Error generating PDF for product ID: ${productId}: ${error.message}`);

        res.status(500).send('Error generating PDF');
    }
}

module.exports = {
    productPDF,
}