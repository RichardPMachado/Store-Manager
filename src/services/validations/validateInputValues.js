const { nameSchema } = require('./schemas');

const validateRegisterProduct = async (product) => {
  const { error } = await nameSchema.validate(product);
  console.log(error);
  if (error) {
    return {
      type: product.name ? 'INVALID_VALUE' : 'EMPTY_VALUE',
      message: error.message,
    };
  }
  return { type: null, message: '' };
};
module.exports = {
  validateRegisterProduct,
};