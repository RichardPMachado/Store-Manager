const { nameSchema } = require('./schemas');

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
};