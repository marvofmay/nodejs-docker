const PhotoService = require("../../services/photo/PhotoService");

const photoIndex = (req, res) => {
    try {
        res.render('photos/index', {title: 'Photos'});
    } catch(error) {
        res.render('error/error', {title: 'error', message: error.message});
    }
}

module.exports = {
    photoIndex,
}