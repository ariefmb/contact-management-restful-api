import Joi from "joi"

export const validateContactCreate = (payload) => {
    const schema = Joi.object({
        id: Joi.string().max(100).required(),
        first_name: Joi.string().max(100).required(),
        last_name: Joi.string().max(100).optional(),
        email: Joi.string().max(200).optional(),
        phone: Joi.string().max(20).optional()
    })
    
    return schema.validate(payload)
}

export const validateContactUpdate = (payload) => {
    const schema = Joi.object({
        id: Joi.string().max(100).required(),
        first_name: Joi.string().max(100).optional(),
        last_name: Joi.string().max(100).optional(),
        email: Joi.string().max(200).optional(),
        phone: Joi.string().max(20).optional()
    })

    return schema.validate(payload)
}

export const validateContactSearch = (query) => {
    const schema = Joi.object({
        name: Joi.string().optional(),
        email: Joi.string().optional(),
        phone: Joi.string().optional(),
        page: Joi.number().min(1).positive().default(1),
        size: Joi.number().min(1).positive().max(100).default(8),
    })

    return schema.validate(query)
}