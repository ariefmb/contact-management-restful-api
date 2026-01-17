import { createAddress, getAddress, getAddressesList, removeAddress, updateAddress } from "../service/address-service.js"
import logger from "../utils/logging.js"

export const createAddressController = async (req, res, next) => {
    try {
        const user = res.locals.user
        const contactId = req.params.contactId
        const request = req.body
        const result = await createAddress(user, contactId, request)

        logger.info('Success create address data')
        res.status(201).json({
            status: true,
            statusCode: 201,
            message: 'Success create address data',
            data: result
        })
    } catch (error) {
        logger.error(`ERR: addresses - create = ${error.message}`)
        next(error)
    }
}

export const getAddressController = async (req, res, next) => {
    try {
        const user = res.locals.user
        const contactId = req.params.contactId
        const addressId = req.params.addressId
        const result = await getAddress(user, contactId, addressId)

        logger.info('Success get address data')
        res.status(200).json({
            status: true,
            statusCode: 200,
            message: 'Success get address data',
            data: result
        })
    } catch (error) {
        logger.error(`ERR: addresses - get = ${error}`)
        next(error)
    }
}

export const updateAddressController = async (req, res, next) => {
    try {
        const user = res.locals.user
        const request = req.body
        const contactId = req.params.contactId
        const addressId = req.params.addressId  
        request.id = addressId

        const result = await updateAddress(user, contactId, addressId, request)

        logger.info('Success update address data')
        res.status(200).json({
            status: true,
            statusCode: 200,
            message: 'Success update address data',
            data: result
        })
    } catch (error) {
        logger.error(`ERR: addresses - update = ${error}`)
        next(error)
    }
}

export const removeAddressController = async (req, res, next) => {
    try {
        const user = res.locals.user
        const contactId = req.params.contactId
        const addressId = req.params.addressId
        await removeAddress(user, contactId, addressId)

        logger.info('Success remove address data')
        res.status(200).json({
            status: true,
            statusCode: 200,
            message: 'Success remove address data',
        })
    } catch (error) {
        logger.error(`ERR: addresses - remove = ${error}`)
        next(error)
    }
}

export const getAddressesListController = async (req, res, next) => {
    try {
        const user = res.locals.user
        const contactId = req.params.contactId
        const result = await getAddressesList(user, contactId)

        logger.info('Success get addresses data')
        res.status(200).json({
            status: true,
            statusCode: 200,
            message: 'Success get addresses data',
            data: result
        })
    } catch (error) {
        logger.error(`ERR: addresses - get all = ${error}`)
        next(error)
    }
}