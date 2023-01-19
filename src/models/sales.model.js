const connection = require('./connection');

const createSale = async (sales) => {
  const query = 'INSERT INTO StoreManager.sales (data) VALUE (?)';

  const [{ insertId }] = await connection.execute(query, [new Date()]);

  await Promise.all(sales
    .map(async ({ productId, quantity }) => {
      await connection.execute(
        'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)',
        [insertId, productId, quantity],
      );
    }));
  
  return {
    id: insertId,
    itemsSold: sales,
  };
};

module.exports = { createSale };
