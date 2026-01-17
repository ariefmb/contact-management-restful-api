import { ResponseError } from "../error/response-error.js"
import { prismaClient } from "../utils/database.js"
import { validateContactSearch } from "../validation/contact-validation.js"

export const getContact = async (contactId) => {
    const contact = await prismaClient.contact.findFirst({
        where: {
            user: {
                username: 'dubiidooo'
            },
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

export const getContactsList = async (request) => {
    const { error, value } = validateContactSearch(request)

    if (error) {
        throw new ResponseError(422, error.details[0].message)
    }

    // skip = ((page - 1) * size)
    const skip = (value.page - 1) * value.size
    const filters = []

    filters.push({
        user: {
            username: 'dubiidooo'
        },
    })
    
    if (value.name) {
        filters.push({
            OR: [
                {
                    first_name: {
                        contains: value.name
                    },
                },
                {
                    last_name: {
                        contains: value.name
                    }
                }
            ]
        })
    }
    if (value.email) {
        filters.push({
            email: {
                contains: value.email
            }
        })
    }
    if (value.phone) {
        filters.push({
            phone: {
                contains: value.phone
            }
        })
    }

    const contacts = await prismaClient.contact.findMany({
        where: {
            AND: filters,
        },
        take: value.size,
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
            page: value.page,
            total_item: totalItems,
            total_page: Math.ceil(totalItems / value.size)
        }
    }
}

export const getAddressesList = async (contactId) => {
    const totalContactInDB = await prismaClient.contact.count({
        where: {
            user: {
                username: 'dubiidooo'
            },
            id: contactId
        }
    })

    if (totalContactInDB !== 1) {
        throw new ResponseError(404, "Contact is not found")
    }

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