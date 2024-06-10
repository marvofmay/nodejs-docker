const express = require('express');
const loginController = require('../controllers/login/loginController');
const { loginValidator } = require("../validators/login/loginValidators");

const router = express.Router();

router.get('/', loginController.login);
router.post('/', loginValidator, loginController.login);

module.exports = router;