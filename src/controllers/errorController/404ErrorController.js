const error404 = async (req, res) => {
    res.status(404).render(
        'error/404error',
        {
            title: '404 error',
            message: 'You got 404 error',
        }
    );
}

module.exports = {
    error404,
}