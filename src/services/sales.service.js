const { salesModel } = require('../models');
const productsService = require('./products.service');
const { validateRegisterProduct } = require('./validations/validateInputValues');

const createSale = async (sales) => {
  // const error = validateRegisterSale.validate(sales);
  // if (error.type) return error;
  
  const a = await sales.every(async ({ productId }) => {
    const { type } = await productsService.findById(productId);
    if (type) {
      console.log('a');
      return false;
    }
    return true;
  });

  if (a) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  const saleId = await salesModel.createSale();
  // console.log(saleId);
  await Promise.all(sales
    .map(async (sale) => {
      await salesModel.createProductsSale(saleId, sale.productId, sale.quantity);
    }));
  return { type: null, message: { id: saleId, itemsSold: sales } };
};

module.exports = { createSale };
