import jwt from 'jsonwebtoken';
import CONFIG from '../config/environment.js';

export const signJWT = (payload, options) => {
    return jwt.sign(payload, CONFIG.jwt_private_key, {
        ...(options && options),
        algorithm: "RS256"
    });
};

export const verifyJWT = (token) => {
    try {
        const decoded = jwt.verify(token, CONFIG.jwt_public_key)
        return {
            valid: true,
            expired: false,
            decoded
        };
    } catch (error) {
        return {
            valid: false,
            expired: error.name === "TokenExpiredError",
            decoded: null
        };
    }
};
