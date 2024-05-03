const basicHome = async (req, res) => {
    try {
        res.render('basic/home', {title: 'Home'});

    } catch(err) {
        console.log(err);

        res.render('404error', {title: 'page not found'});
    }
}

module.exports = {
    basicHome,
}