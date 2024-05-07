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
        res.render('error/404error', {title: '404 error', message: error.message});
    }

}

module.exports = {
    categoryCreate,
}