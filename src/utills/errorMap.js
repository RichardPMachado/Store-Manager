const errorMap = {
  PRODUCT_NOT_FOUND: 404,
  EMPTY_VALUE: 400,
  INVALID_VALUE: 422,
  PRODUCT_CONFLICT: 409,
  PRODUCT_NOT_REGISTER: 501,
  SALE_NOT_FOUND: 404,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};
