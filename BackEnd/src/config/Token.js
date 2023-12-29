import jwt from 'jsonwebtoken';
import 'dotenv/config';

const secretKey = process.env.JWT_KEY;
console.log('secretKey:', secretKey);


const generateJwtToken = (username) => {
    return jwt.sign({ username }, secretKey, { expiresIn: '24h' });
};

const decodeJwtToken = (token) => {
    return jwt.verify(token, secretKey, (error, decoded) => {
        return { error, decoded };
    });
};

module.exports = {
    generateJwtToken,
    decodeJwtToken,
};
