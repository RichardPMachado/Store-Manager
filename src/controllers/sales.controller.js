const { mapError } = require('../utills/errorMap');
const { salesService } = require('../services');

const registerSale = async (req, res) => {
  const { body } = req;
  console.log(body);
  const result = await salesService.createSale(body); 
  // if (type) return res.status(mapError(type)).json({ message });
  res.status(200).json(result);
};

module.exports = { registerSale };