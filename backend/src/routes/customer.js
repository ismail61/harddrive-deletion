const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/check-device/:serialNumber', customerController.checkDevice);

module.exports = router;
