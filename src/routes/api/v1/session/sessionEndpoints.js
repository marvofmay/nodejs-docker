const express = require('express');
const AuthenticatedController = require('../../../../controllers/api/v1/session/AuthenticatedController');
const LoginController = require('../../../../controllers/api/v1/session/LoginController');

const router = express.Router();

router.get('/authenticated', AuthenticatedController.isAuthenticated);
router.post('/', LoginController.login);

module.exports = router;