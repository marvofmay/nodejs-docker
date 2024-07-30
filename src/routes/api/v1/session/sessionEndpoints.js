const express = require('express');
const LoginController = require('../../../../controllers/api/v1/session/LoginController');
const LogoutController = require('../../../../controllers/api/v1/session/LogoutController');
const passport = require('passport');

const router = express.Router();

router.post('/login', LoginController.login);
router.post('/logout', passport.authenticate('jwt', { session: false }), LogoutController.logout);

module.exports = router;