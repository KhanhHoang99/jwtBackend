import jwt from 'jsonwebtoken';

require("dotenv").config();

const secretKey =  process.env.JWT_SECRET; 

const createJWT = (payload) => {

    let token = null;

    try {
        token = jwt.sign(payload, secretKey);
    } catch (error) {
        console.log('error create token: ', error)
    }
    
    return token;
}

const verifyToken = (token) => {

    let data = null;

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          console.error('Token verification failed:', err.message);
        } else {
          // Token is valid, decoded contains the decoded payload
          console.log('Decoded token payload:', decoded);
          data = decoded;
        }
    });

    return data;
}

module.exports = {
    createJWT,
    verifyToken
}