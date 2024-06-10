const basicHome = async (req, res) => {
    try {
        // if (! req.session.views) {
        //     req.session.views = 1;
        // } else {
        //     req.session.views++;
        // }
        //
        // console.log(`Number of views: ${req.session.views}`);

        res.render('basic/home', {title: 'Home'});
    } catch(error) {
        res.render('error/error', {title: 'error', message: error.message});
    }
}

module.exports = {
    basicHome,
}