const PhotoService = require('../../services/photo/PhotoService');

const photoDelete = async (req, res) => {
    try {
        const id = req.params.id;
        const photoService = new PhotoService();
        const deleteResult = await photoService.deletePhoto(id);

        res.json({ actionResult: deleteResult });
    } catch (err) {
        console.error(err);

        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    photoDelete,
}