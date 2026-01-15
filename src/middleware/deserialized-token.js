import { verifyJWT } from "../utils/jwt.js"

export const deserializedToken = async (req, res, next) => {
    try {
        const accessToken = req.headers.authorization.replace(/^Bearer\s/, "")
        if (!accessToken) {
            return next()
        }

        const token = verifyJWT(accessToken)

        if (token.decoded) {
            res.locals.user = token.decoded
        }

        if (token.expired) {
            return next()
        }
        
        next()
    } catch (error) {
        next(error)
    }
}