const connection = require('./connection');

const createSale = async () => {
  const query = 'INSERT INTO StoreManager.sales (data) VALUE (?)';

  const [{ insertId }] = await connection.execute(query, [new Date()]);
  return insertId;
};

const createProductsSale = async ({ saleId, productId, quantity }) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)',
    [saleId, productId, quantity],
  );
  
  return result.affectedRows;
};

module.exports = { createSale, createProductsSale };
