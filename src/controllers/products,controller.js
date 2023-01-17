const { mapError } = require('../utills/errorMap');
const { productsService } = require('../services/index');

const listProducts = async (_req, res) => {
  const { type, message } = await productsService.findAll();

  if (type) return res.status(mapError(type)).json(message);

  res.status(200).json(message);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.findById(id);
  if (type) return res.status(mapError(type)).json({ message });

  res.status(200).json(message);
};

const registerProduct = async (req, res) => {
  const newProduct = req.body;
  const { type, message } = await productsService.createProduct(newProduct);
  if (type) return res.status(mapError(type)).json({ message });

  res.status(201).json(message);
};
module.exports = { listProducts, getProduct, registerProduct };