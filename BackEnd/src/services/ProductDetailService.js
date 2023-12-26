import createConnection from '../config/DBConnection';

const getProductDetail = async (productId) => {
    const query = 'SELECT * FROM product_details WHERE product_id = ?';
    const connection = createConnection();

    try {
        const [rows] = await connection.promise().query(query, [productId]);
        return rows[0];
    } finally {
        connection.end();
    }
}

const addProductDetail = async (productId, data) => {
    const query = `
      INSERT INTO product_details (product_id, display, os, sim, front_camera, camera, cpu, ram, storage, battery)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        productId,
        data.display || null,
        data.os || null,
        data.sim || null,
        data.front_camera || null,
        data.camera || null,
        data.cpu || null,
        data.ram || null,
        data.storage || null,
        data.battery || null,
    ];

    const connection = createConnection();

    try {
        const [result] = await connection.promise().query(query, values);
        return result.insertId;
    } finally {
        connection.end();
    }
};

const updateProductDetail = async (productId, data) => {
    const query = `
      UPDATE product_details
      SET display = ?, os = ?, sim = ?, front_camera = ?, camera = ?, cpu = ?, ram = ?, storage = ?, battery = ?
      WHERE product_id = ?
    `;

    const values = [
        data.display || null,
        data.os || null,
        data.sim || null,
        data.front_camera || null,
        data.camera || null,
        data.cpu || null,
        data.ram || null,
        data.storage || null,
        data.battery || null,
        productId,
    ];
    const connection = createConnection();

    try {
        const [result] = await connection.promise().query(query, values);
        return result;
    } finally {
        connection.end();
    }
};

const deleteProductDetail = async (productId) => {
    const query = 'DELETE FROM product_details WHERE product_id = ?';
    const connection = createConnection();

    try {
        const [result] = await connection.promise().query(query, [productId]);
        return result;
    } finally {
        connection.end();
    }
};

module.exports = {
    getProductDetail,
    addProductDetail,
    updateProductDetail,
    deleteProductDetail
};

