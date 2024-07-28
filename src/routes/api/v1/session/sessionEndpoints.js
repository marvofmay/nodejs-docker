const express = require('express');
const isAuthenticatedController = require('../../../../controllers/api/v1/session/isAuthenticatedController');

const router = express.Router();

router.get('/authenticated', isAuthenticatedController.isAuthenticated);

module.exports = router;