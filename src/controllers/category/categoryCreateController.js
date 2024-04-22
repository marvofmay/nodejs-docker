const categoryCreate = (req, res) => {
    res.render('categories/create', { title: 'Create a new category', errors: [], actionResult: {} });
}

module.exports = {
    categoryCreate,
}