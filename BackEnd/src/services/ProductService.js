import createConnection from '../config/DBConnection';

const getProduct = async (productId) => {
    const query = 'SELECT * FROM products WHERE id = ?';
    const connection = createConnection();

    try {
        const [rows] = await connection.promise().query(query, [productId]);
        return rows[0];
    } finally {
        connection.end();
    }
};

const addProduct = async (data) => {
    const { title, image, brand_id, price, quantity, description } = data;
    const query = 'INSERT INTO products (title, image, brand_id, price, quantity, description) VALUES (?, ?, ?, ?, ?, ?)';
    const connection = createConnection();

    try {
        const [result] = await connection.promise().query(query, [title, image, brand_id, price, quantity, description]);
        return result.insertId;
    } finally {
        connection.end();
    }
};

const updateProduct = async (id, data) => {
    const { title, image, price, quantity, description } = data;
    const query = 'UPDATE products SET title=?, image=?, price=?, quantity=?, description=? WHERE id=?';
    const connection = createConnection();

    try {
        const [result] = await connection.promise().query(query, [title, image, price, quantity, description, id]);
        return result.affectedRows > 0;
    } finally {
        connection.end();
    }
};

const deleteProduct = async (id) => {
    const query = 'DELETE FROM products WHERE id=?';
    const connection = createConnection();

    try {
        const [result] = await connection.promise().query(query, [id]);
        return result.affectedRows > 0;
    } finally {
        connection.end();
    }
};

const getAllProducts = async () => {
    const query = 'SELECT * FROM products';
    const connection = createConnection();

    try {
        const [rows] = await connection.promise().query(query);
        return rows;
    } finally {
        connection.end();
    }
};

const getAllProductsByBrand = async (brand_id) => {
    const query = 'SELECT * FROM products WHERE brand_id = ?';
    const connection = createConnection();

    try {
        const [rows] = await connection.promise().query(query, [brand_id]);
        return rows;
    } finally {
        connection.end();
    }
};

const getCountProducts = async () => {
    const query = 'SELECT COUNT(*) AS count FROM products'; // Use COUNT(*) AS count for clarity
    const connection = createConnection();

    try {
        const [rows] = await connection.promise().query(query);
        return rows[0].count;
    } finally {
        connection.end();
    }
};

const updateProductCode = async (id, code) => {
    const query = 'UPDATE products SET code=? where id=?';
    const connection = createConnection();

    try {
        const [result] = await connection.promise().query(query, [code, id]);
        return result.affectedRows > 0;
    } finally {
        connection.end();
    }
}

const getProductByCode = async (code) => {
    const query = 'SELECT * FROM products WHERE code = ?';
    const connection = createConnection();

    try {
        const [rows] = await connection.promise().query(query, [code]);
        return rows[0];
    } finally {
        connection.end();
    }
};

const checkIsBuyProduct = async (userId, productId) => {
    const query = `
        SELECT * FROM orders
        JOIN order_details ON orders.id = order_details.order_id
        WHERE orders.user_id = ? AND order_details.product_id = ?;
    `;

    const connection = createConnection();

    try {
        const [result] = await connection.promise().query(query, [userId, productId]);
        return result.length > 0;
    } finally {
        connection.end();
    }
};

const updateProductRating = async (productId) => {
    const query = `
    UPDATE products
    SET total_rating = (
        SELECT SUM(rating) FROM reviews WHERE product_id = ?
    ), total_count = (
        SELECT COUNT(*) FROM reviews WHERE product_id = ?
    )
    WHERE id = ?
  `;

  const values = [productId, productId, productId];

  const connection = createConnection();

  try {
      const [result] = await connection.promise().query(query, values);
      return result;
  } finally {
      connection.end();
  }
};


module.exports = {
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getCountProducts,
    getAllProductsByBrand,
    updateProductCode,
    getProductByCode,
    checkIsBuyProduct,
    checkIsBuyProduct,
    updateProductRating
};
