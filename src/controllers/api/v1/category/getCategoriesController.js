const Category = require('../../../../models/category');

const getCategories = async (req, res) => {
    const { page = 1, limit = 10, sort = 'createdAt', order = 'asc', ...filters } = req.query;

    try {
        const categories = await Category.find(filters)
            .sort({ [sort]: order === 'asc' ? 1 : -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const totalCategories = await Category.countDocuments(filters);
        res.json({
            total: totalCategories,
            pages: Math.ceil(totalCategories / limit),
            currentPage: page,
            categories
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getCategories,
};