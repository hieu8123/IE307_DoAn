import createConnection from '../config/DBConnection';

const getReviewsByProduct = async (productId) => {
    const query = 'SELECT * FROM reviews WHERE product_id = ?';
    const connection = createConnection();

    try {
        const [rows] = await connection.promise().query(query, [productId]);
        return rows;
    } finally {
        connection.end();
    }
}

const addReview = async (userId, productId, data) => {
    const query = `
      INSERT INTO reviews (user_id, product_id, rating, comment)
      VALUES (?, ?, ?, ?)
    `;

    const values = [
        userId,
        productId,
        data.rating || null,
        data.comment || null,
    ];

    const connection = createConnection();

    try {
        const [result] = await connection.promise().query(query, values);
        return result.insertId;
    } finally {
        connection.end();
    }
};

const deleteReviewByProduct = async (productId) => {
    const query = 'DELETE FROM reviews WHERE product_id = ?';
    const connection = createConnection();

    try {
        const [result] = await connection.promise().query(query, [productId]);
        return result;
    } finally {
        connection.end();
    }
};

const deleteReviewByUser = async (userId) => {
    const query = 'DELETE FROM reviews WHERE user_id = ?';
    const connection = createConnection();

    try {
        const [result] = await connection.promise().query(query, [userId]);
        return result;
    } finally {
        connection.end();
    }
};

module.exports = {
    getReviewsByProduct,
    addReview,
    deleteReviewByProduct,
    deleteReviewByUser
};
