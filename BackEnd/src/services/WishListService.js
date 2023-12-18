import createConnection from '../config/DBConnection';

const getWishlistItemsByUser = async (user_id) => {
    const query = 'SELECT * FROM wishlist WHERE user_id = ?';
    const connection = createConnection();
    try {
        const [rows] = await connection.promise().query(query, [user_id]);
        return rows;
    } finally {
        connection.end();
    }
};

const getWishlistItemsByProduct = async (product_id) => {
    const query = 'SELECT * FROM wishlist WHERE product_id = ?';
    const connection = createConnection();

    try {
        const [rows] = await connection.promise().query(query, [product_id]);
        return rows;
    } finally {
        connection.end();
    }
};

const addWishlistItem = async (data) => {
    const { user_id, product_id } = data;
    const query = 'INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)';
    const connection = createConnection();

    try {
        const [result] = await connection.promise().query(query, [user_id, product_id]);
        return result.insertId;
    } finally {
        connection.end();
    }
};

const getAllWishlistItems = async () => {
    const query = 'SELECT * FROM wishlist';
    const connection = createConnection();

    try {
        const [rows] = await connection.promise().query(query);
        return rows;
    } finally {
        connection.end();
    }
};

const deleteWishlistItem = async (id) => {
    const query = 'DELETE FROM wishlist WHERE id=?';
    const connection = createConnection();

    try {
        const [result] = await connection.promise().query(query, [id]);
        return result.affectedRows > 0;
    } finally {
        connection.end();
    }
};

const deleteWishlistItemByProductAndUser = async (data) => {
    const { user_id, product_id } = data;
    const query = 'DELETE FROM wishlist WHERE user_id=? and product_id=?';
    const connection = createConnection();

    try {
        const [result] = await connection.promise().query(query, [user_id, product_id]);
        return result.affectedRows > 0;
    } finally {
        connection.end();
    }
};

module.exports = {
    getWishlistItemsByUser,
    getWishlistItemsByProduct,
    addWishlistItem,
    deleteWishlistItem,
    deleteWishlistItemByProductAndUser,
    getAllWishlistItems
};
