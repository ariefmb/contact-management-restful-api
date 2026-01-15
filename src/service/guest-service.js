import { prismaClient } from "../application/database.js"
import { searchContactValidation } from "../validation/contact-validation.js"
import { validate } from "../validation/validation.js"

const getList = async (request) => {
    request = validate(searchContactValidation, request)

    // skip = ((page - 1) * size)
    const skip = (request.page - 1) * request.size
    const filters = []

    filters.push({
        username: 'dubi'
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

export default { getList }