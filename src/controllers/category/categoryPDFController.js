const categoryRepository = require('../../repositories/category/repository');
const CategoryPDFService = require('../../services/category/CategoryPDFService');
const fs = require('fs');
const DateUtility = require('../../utility/DateUtility');
const Logger = require('../../utility/Logger');

const categoryPDF = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const category = await categoryRepository.getCategoryById(categoryId);
        if (! category) {
            throw new Error('Category not found');
        }

        const currentDate = new Date();
        const formattedDate = DateUtility.formatDateYMDHISSeparatedBDash(currentDate);
        const formattedCategoryName = category.name.replace(/\s+/g, '-');
        const pdfFileName = `${formattedCategoryName}-${formattedDate}.pdf`;
        const categoryPdfService = new CategoryPDFService(pdfFileName);
        const pdfPath = await categoryPdfService.generateCategoryPDF(category);

        res.setHeader('Content-Disposition', `attachment; filename=${pdfFileName}`);
        res.setHeader('Content-Type', 'application/pdf');

        const fileStream = fs.createReadStream(pdfPath);

        fileStream.pipe(res);
        Logger.info(`PDF generated successfully for category ID: ${categoryId}`);
    } catch (error) {
        Logger.error(`Error generating PDF for category ID: ${categoryId}: ${error.message}`);

        res.status(500).send('Error generating PDF');
    }
}

module.exports = {
    categoryPDF,
}