const basicInfo = async (req, res) => {
    try {
        res.render('basic/info', {
            title: 'Info',
        });
    } catch(error) {
        res.render('error/error', {title: 'error', message: error.message});
    }
}

module.exports = {
    basicInfo,
}