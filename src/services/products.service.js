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

const createProduct = async ({ name }) => {
  const { id } = await productsModel.createProduct(name);
  const newProduct = await findById(id);
  console.log(newProduct);
  if (!newProduct.type) {
    return { type: null, message: newProduct.message };
  }
  return { type: 'PRODUCT_NOT_REGISTER', message: 'Product not register' };
};

module.exports = {
  findAll,
  findById,
  createProduct,
};