const basicHome = async (req, res) => {
    try {
        res.render('basic/home', {
            title: 'Home',
            env: process.env.NODE_ENV || 'development',
        });
    } catch(error) {
        res.render('error/error', {title: 'error', message: error.message});
    }
}

module.exports = {
    basicHome,
}