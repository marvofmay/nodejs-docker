const categoryRepository = require('../../repositories/category/repository');
const CategoryPDFService = require('../../services/category/CategoryPDFService');
const fs = require('fs');
const DateUtility = require('../../utility/DateUtility');

const categoryPDF = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await categoryRepository.getCategoryById(categoryId);

        if (!category) {
            return res.status(404).send('Category not found');
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
    } catch (error) {
        console.error('Error generating PDF:', error);

        res.status(500).send('Error generating PDF');
    }
}

module.exports = {
    categoryPDF,
}