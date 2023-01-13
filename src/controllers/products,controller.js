const { errorMap } = require('../utills/errorMap');
const productsService = require('../services');

const listProducts = async (_req, res) => {
  const { type, message } = await productsService.findAll();

  if (type) return res.status(errorMap.mapError(type)).json(message);
};

module.exports = { listProducts };