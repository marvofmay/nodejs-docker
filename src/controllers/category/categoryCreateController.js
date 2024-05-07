const CategoryService = require("../../services/category/CategoryService");
const categoryCreate = (req, res) => {
    try {
        res.render(
            'categories/create',
            {
                title: 'Categories',
                category: {},
                action: 'Create a new category',
                errors: [],
                actionResult: {},
            }
        );
    } catch (error) {
        res.render('error/error', {title: 'error', message: error.message});
    }

}

module.exports = {
    categoryCreate,
}