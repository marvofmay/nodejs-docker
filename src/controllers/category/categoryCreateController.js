const categoryCreate = (req, res) => {
    res.render(
        'categories/create',
        {
            title: 'Categories',
            action: 'Create a new category',
            errors: [],
            actionResult: {},
        }
    );
}

module.exports = {
    categoryCreate,
}