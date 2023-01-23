const { mapError } = require('../utills/errorMap');
const salesService = require('../services/salesService');

const listAllSales = async (_req, res) => {
  const { type, message } = await salesService.findAllSales();
  if (type) return res.status(mapError(type)).json(message);
  return res.status(200).json(message);
};

const getSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.findSaleById(id);
 
  if (type) return res.status(mapError(type)).json({ message });

  return res.status(200).json(message);
};

const registerSale = async (req, res) => {
  const { body } = req;
  const { type, message } = await salesService.createSale(body);
  console.log(message);
 
  if (type) return res.status(mapError(type)).json({ message });
 
  return res.status(201).json(message);
};

module.exports = {
  registerSale,
  listAllSales,
  getSale,
};