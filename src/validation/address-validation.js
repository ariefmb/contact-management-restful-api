import Joi from "joi"

export const validateAddressCreate = (payload) => {
    const schema = Joi.object({
        id: Joi.string().max(100).required(),
        title: Joi.string().max(100).required(),
        street: Joi.string().max(255).optional(),
        city: Joi.string().max(100).optional(),
        province: Joi.string().max(100).optional(),
        country: Joi.string().max(100).required(),
        postal_code: Joi.string().max(10).required(),
    })

    return schema.validate(payload)
}

export const validateAddressUpdate = (payload) => {
    const schema = Joi.object({
        id: Joi.string().max(100).required(),
        title: Joi.string().max(100).optional(),
        street: Joi.string().max(255).optional(),
        city: Joi.string().max(100).optional(),
        province: Joi.string().max(100).optional(),
        country: Joi.string().max(100).optional(),
        postal_code: Joi.string().max(10).optional(),
    })

    return schema.validate(payload)
}