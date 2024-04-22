//const Product = require('../models/product');

const manufacturerIndex = (req, res) => {
    res.render('manufacturers/index', {title: 'Manufacturers'});
}

module.exports = {
    manufacturerIndex,
}