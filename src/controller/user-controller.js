import { getUser, login, logout, refreshSession, register, updateUser } from '../service/user-service.js'
import logger from '../utils/logging.js'

export const registerController = async (req, res, next) => {
    try {
        const result = await register(req.body)

        logger.info('Success register new user')
        res.status(201).json({
            status: true,
            statusCode: 201,
            message: 'Success register new user',
            data: result
        })
    } catch (error) {
        logger.error(`ERR: users - register = ${error}`)
        next(error)
    }
}

export const loginController = async (req, res, next) => {
    try {
        const result = await login(req.body)

        logger.info('Login success')
        res.status(200).json({
            status: true,
            statusCode: 200,
            message: 'Login success',
            data: result
        })
    } catch (error) {
        logger.error(`ERR: users - login = ${error}`)
        next(error)
    }
}

export const refreshTokenController = async (req, res, next) => {
    try {
        const result = await refreshSession(req.body)
        
        logger.info('Success refresh session')
        res.status(200).json({
            status: true,
            statusCode: 200,
            message: 'Success refresh session',
            data: result
        })
    } catch (error) {
        logger.error(`ERR: users - refresh session = ${error}`)
        next(error)
    }
}

export const getUserController = async (req, res, next) => {
    try {
        const user = res.locals.user

        const result = await getUser(user.id)
        res.status(200).json({
            status: true,
            statusCode: 200,
            message: 'Success get user data',
            data: result
        })
    } catch (error) {
        logger.error(`ERR: users - get = ${error}`)
        next(error)
    }
}

export const updateUserController = async (req, res, next) => {
    try {
        const user = res.locals.user
        const userId = user.id
        const request = req.body

        const result = await updateUser(userId, request)

        logger.info('Success update user data')
        res.status(200).json({
            status: true,
            statusCode: 200,
            message: 'Success update user data',
            data: result
        })
    } catch (error) {
        logger.error(`ERR: users - update = ${error}`)
        next(error)
    }
}

export const logoutController = async (req, res, next) => {
    try {
        const user = res.locals.user
        await logout(user.id)

        res.clearCookie('accessToken', {
            httpOnly: true,
            sameSite: 'none',
            secure: true
        })
        
        res.clearCookie('refreshToken', {
            httpOnly: true,
            sameSite: 'none',
            secure: true
        })

        logger.info('Log out success')
        res.status(200).json({
            status: true,
            statusCode: 200,
            message: 'Log out success'
        })
    } catch (error) {
        logger.error(`ERR: users - logout = ${error}`)
        next(error)
    }
}