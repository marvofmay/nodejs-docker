const express = require('express');
const photoIndexController = require('../controllers/photo/photoIndexController');
const photoDeleteController = require('../controllers/photo/photoDeleteController');
const photoShowController = require('../controllers/photo/photoShowController');

const router = express.Router();

router.get('/', photoIndexController.photoIndex);
router.get('/:id', photoShowController.photoShow);
router.delete('/:id', photoDeleteController.photoDelete);

module.exports = router;