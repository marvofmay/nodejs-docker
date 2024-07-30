const express = require('express');
const LoginController = require('../../../../controllers/api/v1/session/LoginController');
const LogoutController = require('../../../../controllers/api/v1/session/LogoutController');
const { authenticateJwt } = require('../../../../middleware/auth');

const router = express.Router();

router.post('/login', LoginController.login);
router.post('/logout', authenticateJwt, LogoutController.logout);

module.exports = router;