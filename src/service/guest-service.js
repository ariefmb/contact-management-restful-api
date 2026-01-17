import { ResponseError } from "../error/response-error.js"
import { prismaClient } from "../utils/database.js"
import { validateContactSearch } from "../validation/contact-validation.js"

const checkContactExist = async (contactId) => {
    const totalContactInDB = await prismaClient.contact.count({
        where: {
            user_id: 'b1decf61-6329-46e0-8c39-55a1b0e6ffac',
            id: contactId
        }
    })

    if (totalContactInDB !== 1) {
        throw new ResponseError(404, "Contact is not found")
    }

    return contactId
}

const getContact = async (contactId) => {
    const contact = await prismaClient.contact.findFirst({
        where: {
            user_id: 'b1decf61-6329-46e0-8c39-55a1b0e6ffac',
            id: contactId
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true,
        }
    })

    if (!contact) {
        throw new ResponseError(404, 'Contact is not found')
    }

    return contact
}

const getContactsList = async (request) => {
    request = validateContactSearch(request)

    // skip = ((page - 1) * size)
    const skip = (request.page - 1) * request.size
    const filters = []

    filters.push({
        user_id: 'b1decf61-6329-46e0-8c39-55a1b0e6ffac'
    })
    
    if (request.name) {
        filters.push({
            OR: [
                {
                    first_name: {
                        contains: request.name
                    },
                },
                {
                    last_name: {
                        contains: request.name
                    }
                }
            ]
        })
    }
    if (request.email) {
        filters.push({
            email: {
                contains: request.email
            }
        })
    }
    if (request.phone) {
        filters.push({
            phone: {
                contains: request.phone
            }
        })
    }

    const contacts = await prismaClient.contact.findMany({
        where: {
            AND: filters,
        },
        take: request.size,
        skip: skip
    })

    const totalItems = await prismaClient.contact.count({
        where: {
            AND: filters 
        }
    })

    return {
        data: contacts,
        paging: {
            page: request.page,
            total_item: totalItems,
            total_page: Math.ceil(totalItems / request.size)
        }
    }
}

const getAddressesList = async (contactId) => {
    contactId = await checkContactExist(contactId)

    return await prismaClient.address.findMany({
        where: {
            contact_id: contactId
        },
        select: {
            id: true,
            title: true,
            street: true,
            city: true,
            province: true,
            country: true,
            postal_code: true
        }
    })
}

export default { getContact, getContactsList, getAddressesList }