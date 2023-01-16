const { productsModel } = require('../models/index');
// const schema = require('./validations/schemas');

const findAll = async () => {
  const products = await productsModel.findAll();
  return { type: null, message: products };
};

const findById = async (productId) => {
  const product = await productsModel.findById(productId);
  if (product) { return { type: null, message: product }; }

  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

// const createProduct = async ({ name }) => {
//   const error = schema.validateNewProduct(name);
//   if (error.type) return error;

//   const newProduct = await productsModel.createProduct({ name });
//   return { type: null, message: newProduct };
// };

module.exports = {
  findAll,
  findById,
  // createProduct,
};