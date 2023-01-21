const express = require('express');

const salesController = require('../controllers/salesController');

const salesRouter = express.Router();

salesRouter.get('/sales', salesController.listAllSales);
salesRouter.get('/sales/:id', salesController.getSale);
salesRouter.post('/sales', salesController.registerSale);

module.exports = salesRouter;
