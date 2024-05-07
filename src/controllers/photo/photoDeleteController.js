const PhotoService = require('../../services/photo/PhotoService');

const photoDelete = async (req, res) => {
    try {
        const id = req.params.id;
        const photoService = new PhotoService();
        const deleteResult = await photoService.deletePhoto(id);

        res.json({ actionResult: deleteResult });
    } catch(error) {
        res.render('error/error', {title: 'error', message: error.message});
    }
};

module.exports = {
    photoDelete,
}