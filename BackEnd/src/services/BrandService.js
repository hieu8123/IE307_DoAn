import createConnection from '../config/DBConnection';

const getBrand = async (id) => {
  const query = 'SELECT * FROM brands WHERE id = ?';
  const connection = createConnection();

  try {
    const [rows] = await connection.promise().query(query, [id]);
    return rows[0];
  } finally {
    connection.end();
  }
};

const addBrand = async (data) => {
  const { name, description = null, image = null } = data;
  const query = 'INSERT INTO brands (name, description, image) VALUES (?, ?, ?)';
  const connection = createConnection();

  try {
    const [result] = await connection.promise().query(query, [name, description, image]);
    return result.insertId;
  } finally {
    connection.end();
  }
};

const updateBrand = async (id, data) => {
  const { name, description = null, image = null } = data;
  const query = 'UPDATE brands SET name=?, description=?, image=? WHERE id=?';
  const connection = createConnection();

  try {
    const [result] = await connection.promise().query(query, [name, description, image, id]);
    return result.affectedRows > 0;
  } finally {
    connection.end();
  }
};

const deleteBrand = async (id) => {
  const query = 'DELETE FROM brands WHERE id=?';
  const connection = createConnection();

  try {
    const [result] = await connection.promise().query(query, [id]);
    return result.affectedRows > 0;
  } finally {
    connection.end();
  }
};

const getAllBrands = async () => {
  const query = 'SELECT * FROM brands';
  const connection = createConnection();

  try {
    const [rows] = await connection.promise().query(query);
    return rows;
  } finally {
    connection.end();
  }
};

const getCountBrands = async () => {
  const query = 'SELECT COUNT(*) AS count FROM brands';
  const connection = createConnection();

  try {
    const [rows] = await connection.promise().query(query);
    return rows[0].count;
  } finally {
    connection.end();
  }
};

module.exports = {
  getBrand,
  addBrand,
  updateBrand,
  deleteBrand,
  getAllBrands,
  getCountBrands,
};
