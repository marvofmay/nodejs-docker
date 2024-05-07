const error404Controller = require('../controllers/errorController/404ErrorController');
const express = require('express');

const router = express.Router();

router.use(error404Controller.error404);

module.exports = router;