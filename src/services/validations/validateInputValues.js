const { nameSchema, idSchema } = require('./schemas');

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
  console.log(product);
  if (error) {
    return {
      type: product.name ? 'INVALID_VALUE' : 'EMPTY_VALUE',
      message: error.message,
    };
  }
  return { type: null, message: product.name };
};
module.exports = {
  validateRegisterProduct,
  validateId,
};