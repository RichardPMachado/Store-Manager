const express = require('express');

const { salesController } = require('../controllers/index');

const routerSale = express.Router();

routerSale.get('/', salesController.ListAllSales);
routerSale.post('/', salesController.registerSale);

module.exports = routerSale;
