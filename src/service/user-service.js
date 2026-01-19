import { v4 as uuid } from 'uuid'
import { ResponseError } from '../error/response-error.js'
import { prismaClient } from '../utils/database.js'
import { hashing, verifyHashedData } from '../utils/hashing.js'
import { signJWT, verifyJWT } from '../utils/jwt.js'
import { validateRefreshSession, validateUserLogin, validateUserRegister, validateUserUpdate } from '../validation/user-validation.js'

export const register = async (request) => {
    request.id = uuid()
    const { error, value } = validateUserRegister(request)

    if (error) {
        throw new ResponseError(422, error.details[0].message)
    }

    const countUser = await prismaClient.user.count({
        where: {
            username: value.username
        }
    })

    if (countUser === 1) {
        throw new ResponseError(422, 'Username already exists')
    }

    value.password = hashing(value.password)

    return prismaClient.user.create({
        data: value,
        select: {
            username: true,
            name: true
        }
    })
}

export const login = async (request) => {
    const { error, value } = validateUserLogin(request)

    if (error) {
        throw new ResponseError(422, error.details[0].message)
    }
    
    const user = await prismaClient.user.findUnique({
        where: {
            username: value.username
        }
    })

    if (!user) {
        throw new ResponseError(401, 'Invalid username or password')
    }
    
    const isPasswordValid = verifyHashedData(value.password, user.password)
    
    if (!isPasswordValid) {
        throw new ResponseError(401, 'Invalid username or password')
    }

    const accessPayload = {
        sub: user.id,
        tokenVersion: user.tokenVersion,
        type: 'access'
    }

    const refreshPayload = {
        sub: user.id,
        tokenVersion: user.tokenVersion,
        type: 'refresh'
    }

    const accessToken = signJWT(accessPayload, { expiresIn: 60 * 60 * 24 })

    const refreshToken = signJWT(refreshPayload, { expiresIn: 60 * 60 * 24 * 15 })

    return {
        user: {
            id: user.id,
            username: user.username,
            name: user.name
        },
        accessToken,
        refreshToken
    }
}

export const refreshSession = async (request) => {
    const { error, value } = validateRefreshSession(request)

    if (error) {
        throw new ResponseError(422, error.details[0].message)
    }

    const { valid, expired, decoded } = verifyJWT(value.refreshToken)

    if (!valid) {
        throw new ResponseError(401, expired ? 'Token expired' : 'Invalid token')
    }
    
    if (decoded.type !== 'refresh') {
        throw new ResponseError(401, 'Invalid token type')
    }

    const user = await prismaClient.user.findUnique({
        where: {
            id: decoded.sub
        }
    })

    if (!user) {
        throw new ResponseError(401, 'Invalid username or password')
    }
    
    if (decoded.tokenVersion !== user.tokenVersion) {
        throw new ResponseError(401, 'Token revoked')
    }

    await prismaClient.user.update({
        where: {
            id: user.id,
        },
        data: {
            tokenVersion: {
                increment: 1
            }
        }
    })

    const accessPayload = {
        sub: user.id,
        tokenVersion: user.tokenVersion + 1,
        type: 'access'
    }

    const refreshPayload = {
        sub: user.id,
        tokenVersion: user.tokenVersion + 1,
        type: 'refresh'
    }

    const accessToken = signJWT(accessPayload, { expiresIn: 60 * 60 * 24 })

    const refreshToken = signJWT(refreshPayload, { expiresIn: 60 * 60 * 24 * 15 })

    return {
        accessToken,
        refreshToken
    }
}

export const getUser = async (userId) => {
    const user = await prismaClient.user.findUnique({
        where: {
            id: userId
        },
        select: {
            id: true,
            username: true,
            name: true
        }
    })

    if (!user) {
        throw new ResponseError(404, 'User is not found')
    }

    return user
}

export const updateUser = async (userId, request) => {
    const { error, value } = validateUserUpdate(request)

    if (error) {
        throw new ResponseError(422, error.details[0].message)
    }

    const totalUserInDB = await prismaClient.user.count({
        where: {
            id: userId
        }
    })

    if (totalUserInDB !== 1) {
        throw new ResponseError(404, 'User is not found')
    }

    const data = {}

    if (value.username) {
        data.username = value.username
    }
    if (value.name) {
        data.name = value.name
    }
    if (value.password) {
        data.password = hashing(value.password)
    }

    return await prismaClient.user.update({
        where: {
            id: userId
        },
        data: data,
        select: {
            id: true,
            username: true,
            name: true
        }
    })
}

export const logout = async (userId) => {
    const user = await prismaClient.user.update({
        where: {
            id: userId
        },
        data: {
            tokenVersion: {
                increment: 1
            }
        }
    })

    if (!user) {
        throw new ResponseError(404, 'User is not found')
    }

    return user
}