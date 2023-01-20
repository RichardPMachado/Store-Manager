const { salesModel } = require('../models');

const createSale = async (sales) => {
  const saleId = await salesModel.createSale();
  await Promise.all(sales
    .map(async ({ productId, quantity }) => {
      await salesModel.createProductsSale({ saleId, productId, quantity });
    }));
  return { id: saleId, itemsSold: sales };
};

module.exports = { createSale };
