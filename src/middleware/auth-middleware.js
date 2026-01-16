import { ResponseError } from "../error/response-error.js"
import { prismaClient } from "../utils/database.js"
import { verifyJWT } from "../utils/jwt.js"
import logger from "../utils/logging.js"

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.replace(/^Bearer\s/, '')

    if (!token) {
        logger.error('ERR: token = Unauthorized')
        throw new ResponseError(401, 'Unauthorized')
    }
    
    const { valid, expired, decoded} = verifyJWT(token)
    
    if (!valid) {
        logger.error(`ERR: token = ${expired ? 'Token expired' : 'Invalid token'}`)
        throw new ResponseError(401, expired ? 'Token expired' : 'Invalid token')
    }
    
    if (decoded.type !== 'access') {
        logger.error('ERR: token = Invalid token type')
        throw new ResponseError(401, 'Invalid token type')
    }
    
    const user = await prismaClient.user.findUnique({
        where: {
            id: decoded.sub
        }
    })
    
    if (!user) {
        logger.error('ERR: token = Unauthorized')
        throw new ResponseError(401, 'Unauthorized')
    }
    
    if (user.tokenVersion !== decoded.tokenVersion) {
        logger.error('ERR: token = Token revoked')
        throw new ResponseError(401, 'Token revoked')
    }
    
    res.locals.user = user
    next()
}

export default authMiddleware