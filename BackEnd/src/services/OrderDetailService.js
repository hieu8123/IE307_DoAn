import createConnection from '../config/DBConnection';

const getOrderDetail = async (id) => {
  const query = 'SELECT * FROM order_details WHERE id = ?';
  const connection = createConnection();

  try {
    const [rows] = await connection.promise().query(query, [id]);
    return rows[0];
  } finally {
    connection.end();
  }
};

const getOrderDetailByOrderId = async (id) => {
  const query = 'SELECT * FROM order_details WHERE order_id = ?';
  const connection = createConnection();

  try {
    const [rows] = await connection.promise().query(query, [id]);
    return rows;
  } finally {
    connection.end();
  }
};

const addOrderDetail = async (data) => {
  const { order_id, product_id, quantity, price } = data;
  const query = 'INSERT INTO order_details (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)';
  const connection = createConnection();

  try {
    const [result] = await connection.promise().query(query, [order_id, product_id, quantity, price]);
    return result.insertId;
  } finally {
    connection.end();
  }
};

const deleteOrderDetailByOrderId = async (id) => {
  const query = 'DELETE FROM order_details WHERE order_id=?';
  const connection = createConnection();

  try {
    const [result] = await connection.promise().query(query, [id]);
    return result.affectedRows > 0;
  } finally {
    connection.end();
  }
};

const deleteOrderDetailByProductId = async (id) => {
  const query = 'DELETE FROM order_details WHERE product_id=?';
  const connection = createConnection();

  try {
    const [result] = await connection.promise().query(query, [id]);
    return result.affectedRows > 0;
  } finally {
    connection.end();
  }
};

const getOrderDetailByProductId = async (id) => {
  const query = 'SELECT * FROM order_details WHERE product_id = ?';
  const connection = createConnection();

  try {
    const [rows] = await connection.promise().query(query, [id]);
    return rows;
  } finally {
    connection.end();
  }
};

module.exports = {
  getOrderDetail,
  getOrderDetailByOrderId,
  addOrderDetail,
  deleteOrderDetailByOrderId,
  deleteOrderDetailByProductId,
  getOrderDetailByProductId,
};
