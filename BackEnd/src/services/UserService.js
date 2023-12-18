import createConnection from '../config/DBConnection';

const getUser = async (id) => {
    const query = 'SELECT * FROM users WHERE id = ?';
    const connection = createConnection();

    try {
        const [rows] = await connection.promise().query(query, [id]);
        return rows[0];
    } finally {
        connection.end();
    }
};

const getUserByUserName = async (username) => {
    const query = 'SELECT * FROM users WHERE username = ?';
    const connection = createConnection();

    try {
        const [rows] = await connection.promise().query(query, [username]);
        return rows[0];
    } finally {
        connection.end();
    }
};

const getUserByEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    const connection = createConnection();

    try {
        const [rows] = await connection.promise().query(query, [email]);
        return rows[0];
    } finally {
        connection.end();
    }
};

const addUser = async (data) => {
    const { username, password, email, role = 'USER' } = data;
    const query = 'INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)';
    const connection = createConnection();

    try {
        const [result] = await connection.promise().query(query, [username, password, email, role]);
        return result.insertId;
    } finally {
        connection.end();
    }
};

const updateUserPassword = async (id, password) => {
    const query = 'UPDATE users SET password=? WHERE id=?';
    const connection = createConnection();

    try {
        const [result] = await connection.promise().query(query, [password, id]);
        return result.affectedRows > 0;
    } finally {
        connection.end();
    }
};

const deleteUser = async (id) => {
    const query = 'DELETE FROM users WHERE id=?';
    const connection = createConnection();

    try {
        const [result] = await connection.promise().query(query, [id]);
        return result.affectedRows > 0;
    } finally {
        connection.end();
    }
};

const getAllUsers = async () => {
    const query = 'SELECT id, username, email, role FROM users';
    const connection = createConnection();

    try {
        const [rows] = await connection.promise().query(query);
        return rows;
    } finally {
        connection.end();
    }
};

const getCountUsers = async () => {
    const query = 'SELECT COUNT(*) AS count FROM users'; // Use COUNT(*) AS count for clarity
    const connection = createConnection();

    try {
        const [rows] = await connection.promise().query(query);
        return rows[0].count;
    } finally {
        connection.end();
    }
};
module.exports = {
    getUser,
    getUserByUserName,
    getUserByEmail,
    addUser,
    updateUserPassword,
    deleteUser,
    getAllUsers,
    getCountUsers
};
