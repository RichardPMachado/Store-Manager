const productsModel = require('../models/productsModel');
const validateInputValue = require('./validations/validateInputValues');
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
  const error = await validateInputValue.validateRegisterProduct({ name });
  if (error.type) return { type: error.type, message: error.message };
  const { id } = await productsModel.createProduct(name);
  const newProduct = await findById(id);
  if (newProduct.type) {
    return { type: 'PRODUCT_NOT_REGISTER', message: 'Product not register' };
  }

  return { type: null, message: newProduct.message };
};

const updateProduct = async ({ productId, name }) => {
  const error = await validateInputValue.validateRegisterProduct({ name });
  if (error.type) return { type: error.type, message: error.message };
   
  await productsModel.updateProduct({ productId, name });
  
  const newProduct = await findById(productId);
  if (newProduct.type) {
    return newProduct;
  }
  return { type: null, message: newProduct.message };
};

const deleteProduct = async ({ productId }) => {
  const newProduct = await findById(productId);
  console.log(newProduct);
  if (newProduct.type) {
    return newProduct;
  }
  await productsModel.deleteProduct(productId);
  return { type: null, message: newProduct.message };
};

module.exports = {
  findAll,
  findById,
  createProduct,
  updateProduct,
  deleteProduct,
};