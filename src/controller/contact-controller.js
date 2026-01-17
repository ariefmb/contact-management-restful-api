import { createContact, getContact, removeContact, searchContacts, updateContact } from "../service/contact-service.js"
import logger from "../utils/logging.js"

export const createContactController = async (req, res, next) => {
    try {
        const user = res.locals.user
        const request = req.body
        const result = await createContact(user, request)

        logger.info('Success create new contact')
        res.status(201).json({
            status: true,
            statusCode: 201,
            message: 'Success create new contact',
            data: result
        })
    } catch (error) {
        logger.error(`ERR: contacts - create = ${error.message}`)
        next(error)
    }
}

export const getContactController = async (req, res, next) => {
    try {
        const user = res.locals.user
        const contactId = req.params.contactId
        const result = await getContact(user, contactId)

        logger.info('Success get contact data')
        res.status(200).json({
            status: true,
            statusCode: 200,
            message: 'Success get contact data',
            data: result
        })
    } catch (error) {
        logger.error(`ERR: contacts - get = ${error.message}`)
        next(error)
    }
}

export const updateContactController = async (req, res, next) => {
    try {
        const user = res.locals.user
        const request = req.body
        const contactId = req.params.contactId
        request.id = contactId

        const result = await updateContact(user, contactId, request)

        logger.info('Success update contact data')
        res.status(200).json({
            status: true,
            statusCode: 200,
            message: 'Success update contact data',
            data: result
        })
    } catch (error) {
        logger.error(`ERR: contacts - update = ${error.message}`)
        next(error)
    }
}

export const removeContactController = async (req, res, next) => {
    try {
        const user = res.locals.user
        const contactId = req.params.contactId

        await removeContact(user, contactId)

        logger.info('Success remove contact data')
        res.status(200).json({
            status: true,
            statusCode: 200,
            message: 'Success remove contact data'
        })
    } catch (error) {
        logger.error(`ERR: contacts - remove = ${error.message}`)
        next(error)
    }
}

export const searchContactsController = async (req, res, next) => {
    try {
        const user = res.locals.user
        const request = {
            name: req.query.name,
            email: req.query.email,
            phone: req.query.phone,
            page: req.query.page,
            size: req.query.size
        }
        const result = await searchContacts(user, request)

        logger.info('Success search contacts data')
        res.status(200).json({
            status: true,
            statusCode: 200,
            message: 'Success search contacts data',
            data: result.data,
            paging: result.paging
        })
    } catch (error) {
        logger.error(`ERR: contacts - search = ${error.message}`)
        next(error)
    }
}