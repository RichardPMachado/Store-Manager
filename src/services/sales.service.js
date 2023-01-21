const { salesModel } = require('../models');
const { productsModel } = require('../models/index');
const { validateRegisterProduct } = require('./validations/validateInputValues');

const findAllSales = async () => {
   const products = await salesModel.findAllSales();
   return { type: null, message: products };
};

const createSale = async (sales) => {
  // const error = validateRegisterSale.validate(sales);
  // if (error.type) return error;
  
  const a = await (sales.some(async ({ productId }) => {
    const { type } = await productsModel.findById(Number(productId));
    if (type === 'PRODUCT_NOT_FOUND') {
      // console.log(type);Promise.all
      return true;
    }
    return false;
  }));

  if (a === false) {
    const saleId = await salesModel.createSale();
    console.log('a2');
    
    // console.log(saleId);
    await Promise.all(sales
      .forEach(async (sale) => {
        await salesModel.createProductsSale(Number(saleId), sale.productId, sale.quantity);
      }));
    return { type: null, message: { id: saleId, itemsSold: sales } };
  }  
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};
module.exports = { createSale, findAllSales };
