const basicInfo = async (req, res) => {
    try {
        res.render('basic/info', {title: 'Info'});

    } catch(err) {
        console.log(err);

        res.render('404error', {title: 'page not found'});
    }
}

module.exports = {
    basicInfo,
}