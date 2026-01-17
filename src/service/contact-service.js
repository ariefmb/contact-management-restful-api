import { v4 as uuid } from 'uuid'
import { ResponseError } from "../error/response-error.js"
import { prismaClient } from "../utils/database.js"
import { validateContactCreate, validateContactSearch, validateContactUpdate } from "../validation/contact-validation.js"

export const createContact = async (user, request) => {
    request.id = uuid()
    const { error, value } = validateContactCreate(request)

    if (error) {
        throw new ResponseError(422, error.details[0].message)
    }
    
    value.user_id = user.id
    
    return prismaClient.contact.create({
        data: value,
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true
        }
    })
}

export const getContact = async (user, contactId) => {
    const contact = await prismaClient.contact.findFirst({
        where: {
            user_id: user.id,
            id: contactId
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true
        }
    })

    if (!contact) {
        throw new ResponseError(404, 'Contact is not found')
    }

    return contact
}

export const updateContact = async (user, contactId, request) => {
    const { error, value } = validateContactUpdate(request)

    if (error) {
        throw new ResponseError(422, error.details[0].message)
    }

    const totalContactInDB = await prismaClient.contact.count({
        where: {
            user_id: user.id,
            id: contactId
        }
    })

    if (totalContactInDB !== 1) {
        throw new ResponseError(404, "Contact is not found")
    }

    return prismaClient.contact.update({
        where: {
            id: contactId
        },
        data: {
            first_name: value.first_name,
            last_name: value.last_name,
            email: value.email,
            phone: value.phone
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true
        }
    })
}

export const removeContact = async (user, contactId) => {
    const totalContactInDB = await prismaClient.contact.findFirst({
        where: {
            user_id: user.id,
            id: contactId
        }
    })

    if (!totalContactInDB) {
        throw new ResponseError(404, "Contact is not found")
    }
    
    const removeAddresses = await prismaClient.address.deleteMany({
        where: {
            contact_id: contactId
        }
    })

    if (!removeAddresses) {
        throw new ResponseError(422, "Failed remove addresses data")
    }

    return await prismaClient.contact.delete({
        where: {
            id: contactId
        }
    })
}

export const searchContacts = async (user, request) => {
    const { error, value } = validateContactSearch(request)

    if (error) {
        throw new ResponseError(422, error.details[0].message)
    }

    // skip = ((page - 1) * size)
    const skip = (value.page - 1) * value.size

    const filters = []

    filters.push({
        user_id: user.id
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