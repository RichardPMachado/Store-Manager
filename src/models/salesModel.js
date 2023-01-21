const connection = require('./connection');

const findAllSales = async () => {
  const query = `SELECT s.id AS saleId,
  s.date AS date,
  sp.product_id AS productId,
  sp.quantity AS quantity
  FROM StoreManager.sales AS s
  INNER JOIN StoreManager.sales_products AS sp
  ON s.id = sp.sale_id;`;
  const [result] = await connection.execute(query);
  console.log(result);
  return result;
};

const findSaleById = async (saleId) => {
  const query = `SELECT s.date AS date,
  sp.product_id AS productId,
  sp.quantity AS quantity
  FROM StoreManager.sales AS s
  INNER JOIN StoreManager.sales_products AS sp
  ON s.id = sp.sale_id
  WHERE sp.sale_id = ${saleId}
  ORDER BY sp.sale_id ASC, product_id ASC;`;
  const [result] = await connection.execute(query);
  console.log(result);
  return result;
};

const createSale = async () => {
  const query = 'INSERT INTO StoreManager.sales (date) VALUE (?)';

  const [{ insertId }] = await connection.execute(query, [new Date()]);
  return insertId;
};

const createProductsSale = async (saleId, productId, quantity) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)',
    [saleId, productId, quantity],
  );
  return result.affectedRows;
};

module.exports = {
  createSale,
  createProductsSale,
  findAllSales,
  findSaleById,
};
