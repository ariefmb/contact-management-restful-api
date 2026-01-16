
export const authMiddleware = () => {
    const user = res.locals.user

    if (!user) {
        res.status(401).json({
            status: false,
            statusCode: 401,
            message: "Forbidden"
        })
        return
    }

    return next()
}