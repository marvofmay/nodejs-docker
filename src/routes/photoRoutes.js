const express = require('express');
const photoIndexController = require('../controllers/photo/photoIndexController');
const photoDeleteController = require('../controllers/photo/photoDeleteController');

const router = express.Router();

router.get('/', photoIndexController.photoIndex);
router.get('/:id', photoDeleteController.photoDelete);

module.exports = router;