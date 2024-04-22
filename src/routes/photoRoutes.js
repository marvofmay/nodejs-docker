const express = require('express');
const photoController = require('../controllers/photoController');

const router = express.Router();

router.get('/', photoController.photoIndex);

module.exports = router;