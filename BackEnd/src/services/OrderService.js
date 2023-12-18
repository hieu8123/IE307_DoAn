import createConnection from '../config/DBConnection';

const getAllOrdersByUser = async (user_id) => {
    const query = 'SELECT * FROM orders WHERE user_id = ?';
    const connection = createConnection();

    try {
        const [rows] = await connection.promise().query(query, [user_id]);
        return rows;
    } finally {
        connection.end();
    }
};

const deleteAllOrdersByUser = async (user_id) => {
    const query = 'DELETE FROM orders WHERE user_id = ?';
    const connection = createConnection();

    try {
        const [rows] = await connection.promise().query(query, [user_id]);
        return rows;
    } finally {
        connection.end();
    }
};

const addOrder = async (data) => {
    const { user_id, amount = 0, discount = 0, delivery_address = '', status = 'pending', country = null, city = null, zipcode = null, payment_method = 'cod', delivery_date = null, received_date = null } = data;
    const query = 'INSERT INTO orders (user_id, amount, discount, delivery_address, status, country, city, zipcode, payment_method, delivery_date, received_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const connection = createConnection();

    try {
        const [result] = await connection.promise().query(query, [user_id, amount, discount, delivery_address, status, country, city, zipcode, payment_method, delivery_date, received_date]);
        return result.insertId;
    } finally {
        connection.end();
    }
};

const updateOrderStatus = async (id, status) => {
    const query = 'UPDATE orders SET status=? WHERE id=?';
    const connection = createConnection();

    try {
        const [result] = await connection.promise().query(query, [status, id]);
        return result.affectedRows > 0;
    } finally {
        connection.end();
    }
};

const updateOrderAmount = async (id, amount) => {
    const query = 'UPDATE orders SET amount=? WHERE id=?';
    const connection = createConnection();

    try {
        const [result] = await connection.promise().query(query, [amount, id]);
        return result.affectedRows > 0;
    } finally {
        connection.end();
    }
};

const getAllOrders = async () => {
    const query = 'SELECT * FROM orders';
    const connection = createConnection();

    try {
        const [rows] = await connection.promise().query(query);
        return rows;
    } finally {
        connection.end();
    }
};

const getCountOrders = async () => {
    const query = 'SELECT COUNT(*) AS count FROM orders'; // Use COUNT(*) AS count for clarity
    const connection = createConnection();

    try {
        const [rows] = await connection.promise().query(query);
        return rows[0].count;
    } finally {
        connection.end();
    }
};

module.exports = {
    getAllOrdersByUser,
    deleteAllOrdersByUser,
    updateOrderStatus,
    updateOrderAmount,
    addOrder,
    getAllOrders,
    getCountOrders
};
