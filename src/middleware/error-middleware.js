import { ResponseError } from "../error/response-error.js"

export const errorMiddleware = async (err, req, res, next) => {
    if (!err) {
        next()
        return
    }

    if (err instanceof ResponseError) {
        res.status(err.status).json({
            status: false,
            statusCode: err.status,
            errors: err.message
        }).end()
    } else {
        res.status(500).json({
            status: false,
            statusCode: 500,
            errors: err.message || "Internal server error"
        }).end()
    }
}