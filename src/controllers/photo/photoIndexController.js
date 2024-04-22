const photoIndex = (req, res) => {
    res.render('photos/index', {title: 'Photos'});
}

module.exports = {
    photoIndex,
}