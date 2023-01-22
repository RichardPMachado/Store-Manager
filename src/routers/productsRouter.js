const express = require('express');

const productsController = require('../controllers/productsController');

const router = express.Router();

router.get('/products', productsController.listProducts);

router.get('/products/:id', productsController.getProduct);

router.post('/products', productsController.registerProduct);

router.put('/products/:id', productsController.updateProduct);

module.exports = router;