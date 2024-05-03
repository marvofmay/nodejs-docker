const categoryCreate = (req, res) => {
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
}

module.exports = {
    categoryCreate,
}