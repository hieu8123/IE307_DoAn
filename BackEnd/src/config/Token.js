import jwt from 'jsonwebtoken';

const secretKey = '21520372-21522070';

const generateJwtToken = (username) => {
    return jwt.sign({ username }, secretKey);
};

const decodeJwtToken = (token) => {
    return jwt.verify(token, secretKey, (error, decoded) => {
        return {error, decoded};
    });
};

module.exports = {
    generateJwtToken,
    decodeJwtToken,
};
