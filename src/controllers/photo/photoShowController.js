const photoShow = async (req, res) => {
    try {
        res.json({ actionResult: '' });
    } catch(error) {
        res.render('error/error', {title: 'error', message: error.message});
    }
};

module.exports = {
    photoShow,
}