const {
  // nameSchema,
  idSchema, registerSaleSchema, nameSchema,
} = require('./schemas');

const validateId = async (id) => {
  const { error } = await idSchema.validate(id);
  if (error) {
    return {
      type: 'EMPTY_VALUE',
      message: 'id must be a number',
    };
  }
  return { type: null, message: '' };
};

const validateRegisterProduct = async (product) => {
  const { error } = await nameSchema.validate(product);
  if (error) {
    return {
      type: product.name ? 'INVALID_VALUE' : 'EMPTY_VALUE',
      message: error.message,
    };
  }
  return { type: null, message: product.name };
};

const validateRegisterSale = async (sale) => {
  const { error } = await registerSaleSchema.validate(sale);
  if (error) {
    // console.log(error.message);
    return {
      type: !error.message.includes('is required') ? 'INVALID_VALUE' : 'EMPTY_VALUE',
      message: error.message,
    };
  }
  return { type: null, message: sale };
};

module.exports = {
  validateRegisterProduct,
  validateRegisterSale,
  validateId,
};