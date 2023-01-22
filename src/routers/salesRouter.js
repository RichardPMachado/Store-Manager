const express = require('express');

const salesController = require('../controllers/salesController');

const router = express.Router();

router.get('/', salesController.listAllSales);
router.get('/:id', salesController.getSale);
router.post('/', salesController.registerSale);

module.exports = router;
