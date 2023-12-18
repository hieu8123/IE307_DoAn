import mysql from "mysql2";

const createConnection = () => {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'ie307',
    });
};

export default createConnection;
