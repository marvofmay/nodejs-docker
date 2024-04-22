//const Product = require('../models/product');

const photoIndex = (req, res) => {
    res.render('photos/index', {title: 'Photos'});
}

module.exports = {
    photoIndex,
}