import guestService from "../service/guest-service.js"

const getContact = async (req, res, next) => {
    try {
        const contactId = req.params.contactId
        const result = await guestService.getContact(contactId)

        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const getContactsList = async (req, res, next) => {
    try {
        const request = {
            name: req.query.name,
            email: req.query.email,
            phone: req.query.phone,
            page: req.query.page,
            size: req.query.size,
        }

        const result = await guestService.getContactsList(request)
        res.status(200).json({
            data: result.data,
            paging: result.paging
        })
    } catch (error) {
        next(error)
    }
}

const getAddressesList = async (req, res, next) => {
    try {
        const contactId = req.params.contactId

        const result = await guestService.getAddressesList(contactId)
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export default { getContact, getContactsList, getAddressesList }