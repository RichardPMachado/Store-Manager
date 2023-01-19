const { mapError } = require('../utills/errorMap');
const { salesService } = require('../services');

const registerSales = async (req, res) => {
  const { type, message } = salesService; 
  if (type) return res.status(mapError(type)).json({ message });
  res.status(200).json(message);
};

module.exports = { registerSales };