const salesAll = [
  {
    saleId: 1,
    date: '2023-01-18T20:40:43.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2023-01-18T20:40:43.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2023-01-18T20:40:49.000Z',
    productId: 3,
    quantity: 15,
  },
];

const saleById = [
  {
    date: '2023-01-18T20:48:30.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    date: '2023-01-18T20:48:30.000Z',
    productId: 2,
    quantity: 10,
  },
];

const saleIdInvalid = { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

module.exports = {
  salesAll,
  saleById,
  saleIdInvalid,
};
