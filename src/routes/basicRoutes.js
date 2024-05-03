const basicHomeController = require('../controllers/basic/basicHomeController');
const basicInfoController = require('../controllers/basic/basicInfoController');
const express = require('express');

const router = express.Router();

router.get('/', basicHomeController.basicHome);
router.get('/info', basicInfoController.basicInfo);

module.exports = router;