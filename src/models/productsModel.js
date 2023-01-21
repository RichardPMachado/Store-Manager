  // const camelize = require('camelize');
// const snakeize = require('snakeize');
const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute('SELECT * FROM StoreManager.products');
  return result;
};

const findById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  return product;
};

const createProduct = async (product) => {
  // console.log(product);
  const query = 'INSERT INTO StoreManager.products (name) VALUE (?)';
  const [{ insertId }] = await connection.execute(query, [product]);
  console.log(insertId);
  return { id: insertId };
};

module.exports = { findAll, findById, createProduct }; 