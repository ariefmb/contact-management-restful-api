import Joi from "joi"

export const validateUserRegister = (payload) => {
    const schema = Joi.object({
        id: Joi.string().max(100).required(),
        username: Joi.string().max(100).required(),
        password: Joi.string().max(100).required(),
        name: Joi.string().max(100).required(),
        tokenVersion: Joi.number().optional().default(0),
    })

    return schema.validate(payload)
}

export const validateUserLogin = (payload) => {
    const schema = Joi.object({
        username: Joi.string().max(100).required(),
        password: Joi.string().max(100).required(),
    })

    return schema.validate(payload)
}

export const validateRefreshSession = (payload) => {
    const schema = Joi.object({
        refreshToken: Joi.string().required()
    })

    return schema.validate(payload)
}

export const validateUserUpdate = (payload) => {
    const schema = Joi.object({
        username: Joi.string().max(100).optional(),
        password: Joi.string().max(100).optional(),
        name: Joi.string().max(100).optional(),
    })

    return schema.validate(payload)
}