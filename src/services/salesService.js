const salesModel = require('../models/salesModel');
const productsService = require('./productsService');
const {
  validateId, validateRegisterSale,
} = require('./validations/validateInputValues');

const findAllSales = async () => {
   const sales = await salesModel.findAllSales();
   return { type: null, message: sales };
};

const findSaleById = async (saleId) => {
  const error = await validateId(saleId);
  if (error.type) return error;
  
  const sale = await salesModel.findSaleById(saleId);
  if (sale.length <= 0) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  }
  return { type: null, message: sale };
};

const createSale = async (sales) => {
  const validationProduct = sales.map(({ productId,
    quantity }) => validateRegisterSale({ productId, quantity }));
  const validationPromiseProduct = await Promise.all(validationProduct);
  const check = validationPromiseProduct.find(({ type,
    message }) => (type === null ? false : { type, message }));
  if (check !== undefined) return check;
  
  const getProduct = await sales.map(({ productId }) => productsService.findById(productId));
  const ValidateGetProduct = await Promise.all(getProduct);
  if (ValidateGetProduct
    .some((e) => e.type === 'PRODUCT_NOT_FOUND')) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' }; 
  }
  const id = await salesModel.createSale();
  await Promise.all(sales.map(({ productId, quantity }) => salesModel
    .createProductsSale(id, productId, quantity)));
  const newSale = { id, itemsSold: sales };
  return { type: null, message: newSale };
};

module.exports = {
  createSale,
  findAllSales,
  findSaleById,
};
