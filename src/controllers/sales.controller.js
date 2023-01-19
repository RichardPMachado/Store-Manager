const { mapError } = require('../utills/errorMap');
const { salesService } = require('../services');

const registerSale = async (req, res) => {
  const { body } = req;
  const { type, message } = salesService.createSale(body); 
  if (type) return res.status(mapError(type)).json({ message });
  res.status(200).json(message);
};

module.exports = { registerSale };