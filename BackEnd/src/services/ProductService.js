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

module.exports = {
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getCountProducts,
    getAllProductsByBrand
};
