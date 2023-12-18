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
    getAllProducts,
    getCountProducts,
    getAllProductsByBrand
};
