const salesModel = require('../models/salesModel');
// const productsService = require('./productsService');
const productsModel = require('../models/productsModel');
const {
  // validateRegisterProduct,
  validateId,
} = require('./validations/validateInputValues');
const { idSchema } = require('./validations/schemas');

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
  const validationProduct = sales.map(async (sale) => {
    const error = idSchema.validate(sale.productId);
    if (error.type) return error;
    await productsModel.findById(sale.productId);
  });
  const validationPromiseProduct = await Promise.all(validationProduct);
  if (validationPromiseProduct.some((product) => console.log(product))) {   
    return { type: 'PRODUCT_NOT_REGISTER', message: 'Product not found' };
  }
  const saleId = await salesModel.createSale();

  await Promise.all(sales
    .map(async ({ productId, quantity }) => {
      await salesModel.createProductsSale(saleId, productId, quantity);
    }));
  return { type: null, message: { id: saleId, itemsSold: sales } };
};

module.exports = {
  createSale,
  findAllSales,
  findSaleById,
};
