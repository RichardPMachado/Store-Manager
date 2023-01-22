const { mapError } = require('../utills/errorMap');
const productsService = require('../services/productsService');

const listProducts = async (_req, res) => {
  const { type, message } = await productsService.findAll();

  if (type) return res.status(mapError(type)).json(message);

  return res.status(200).json(message);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.findById(id);
  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};

const registerProduct = async (req, res) => {
  const newProduct = req.body;
  const { type, message } = await productsService.createProduct(newProduct);
  if (type) return res.status(mapError(type)).json({ message });
  return res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const { type, message } = await productsService.updateProduct({ productId: id, name });
  if (type) return res.status(mapError(type)).json({ message }); 

  return res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.deleteProduct({ productId: id });
  console.log(type);
   if (type) return res.status(mapError(type)).json({ message });

   return res.status(204).end();
};

module.exports = {
  listProducts,
  getProduct,
  registerProduct,
  updateProduct,
  deleteProduct,
};