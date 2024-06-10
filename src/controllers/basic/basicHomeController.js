const basicHome = async (req, res) => {
    try {
        res.render('basic/home', {title: 'Home'});
    } catch(error) {
        res.render('error/error', {title: 'error', message: error.message});
    }
}

module.exports = {
    basicHome,
}