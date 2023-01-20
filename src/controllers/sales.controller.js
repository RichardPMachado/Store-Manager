const { mapError } = require('../utills/errorMap');
const { salesService } = require('../services');

const registerSale = async (req, res) => {
  const { body } = req;
  const { type, message } = await salesService.createSale(body);
  console.log(type);
  if (type) return res.status(mapError(type)).json({ message });
  res.status(201).json(message);
};

module.exports = { registerSale };