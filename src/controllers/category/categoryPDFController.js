const categoryRepository = require('../../repositories/category/repository');
const CategoryPDFService = require('../../services/category/CategoryPDFService');
const fs = require('fs')

const categoryPDF = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await categoryRepository.getCategoryById(categoryId);

        if (!category) {
            return res.status(404).send('Category not found');
        }

        const categoryPdfService = new CategoryPDFService();
        const pdfPath = await categoryPdfService.generateCategoryPDF(category);

        res.setHeader('Content-Disposition', `attachment; filename=${category.name}.pdf`);
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