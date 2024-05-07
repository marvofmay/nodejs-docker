const basicInfo = async (req, res) => {
    try {
        res.render('basic/info', {title: 'Info'});
    } catch(error) {
        res.render('error/404error', {title: '404 error', message: error.message});
    }
}

module.exports = {
    basicInfo,
}