const basicHome = async (req, res) => {
    try {
        res.render('basic/home', {title: 'Home'});
    } catch(error) {
        res.render('error/404error', {title: '404 error', message: error.message});
    }
}

module.exports = {
    basicHome,
}