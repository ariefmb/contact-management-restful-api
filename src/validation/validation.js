import { ResponseError } from "../error/response-error.js"

const validate = (schema, request) => {
    const result = schema.validate(request, {
        abortEarly: false,
        allowUnknow: false
    })

    if (result.error) {
        logger.error(`ERR: users - ${schema} = ${result.error.message}`)
        throw new ResponseError(422, result.error.message)
    } else {
        return result.value
    }
}

export { validate }

