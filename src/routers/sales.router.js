const express = require('express');

const { salesController } = require('../controllers');

const router = express.Router();

router.post('/sales', salesController);

module.exports = router;