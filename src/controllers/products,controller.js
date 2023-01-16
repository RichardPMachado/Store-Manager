const { mapError } = require('../utills/errorMap');
const { productsService } = require('../services/index');

const listProducts = async (_req, res) => {
  const { type, message } = await productsService.findAll();
  console.log(type);

  if (type) return res.status(mapError(type)).json(message);

  res.status(200).json(message);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.findById(id);
  console.log(message);
  if (type) return res.status(mapError(type)).json({ message });

  res.status(200).json(message);
};
module.exports = { listProducts, getProduct };