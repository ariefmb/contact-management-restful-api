import { getAddressesList, getContact, getContactsList } from "../service/guest-service.js"
import logger from "../utils/logging.js"

export const guestGetContactController = async (req, res, next) => {
    try {
        const contactId = req.params.contactId
        const result = await getContact(contactId)

        logger.info('Success get contact data (guest)')
        res.status(200).json({
            status: true,
            statusCode: 200,
            message: 'Success get contact data (guest)',
            data: result
        })
    } catch (error) {
        logger.error(`ERR: guest - get contact = ${error.message}`)
        next(error)
    }
}

export const guestGetContactsListController = async (req, res, next) => {
    try {
        const request = {
            name: req.query.name,
            email: req.query.email,
            phone: req.query.phone,
            page: req.query.page,
            size: req.query.size,
        }

        const result = await getContactsList(request)

        logger.info('Success get contacts data')
        res.status(200).json({
            status: true,
            statusCode: 200,
            message: 'Success get contacts data',
            data: result.data,
            paging: result.paging
        })
    } catch (error) {
        logger.error(`ERR: guest - search contacts = ${error.message}`)
        next(error)
    }
}

export const guestGetAddressesListController = async (req, res, next) => {
    try {
        const contactId = req.params.contactId
        const result = await getAddressesList(contactId)

        logger.info('Success get addresses data')
        res.status(200).json({
            status: true,
            statusCode: 200,
            message: 'Success get addresses data',
            data: result
        })
    } catch (error) {
        logger.error(`ERR: guest - get addresses = ${error.message}`)
        next(error)
    }
}