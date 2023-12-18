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
  getAllBrands,
  getCountBrands,
};
