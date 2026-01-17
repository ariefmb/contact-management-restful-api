import { v4 as uuid } from 'uuid'
import { ResponseError } from "../error/response-error.js"
import { prismaClient } from "../utils/database.js"
import { validateAddressCreate, validateAddressUpdate } from "../validation/address-validation.js"

const checkContactExist = async (user, contactId) => {
    const totalContactInDB = await prismaClient.contact.count({
        where: {
            user_id: user.id,
            id: contactId
        }
    })

    if (totalContactInDB !== 1) {
        throw new ResponseError(404, "Contact is not found")
    }

    return contactId
}

export const createAddress = async (user, contactId, request) => {
    contactId = await checkContactExist(user, contactId)

    request.id = uuid()
    const { error, value } = validateAddressCreate(request)
    
    if (error) {
        throw new ResponseError(422, error.details[0].message)
    }

    value.contact_id = contactId

    return prismaClient.address.create({
        data: value,
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

export const getAddress = async (user, contactId, addressId) => {
    contactId = await checkContactExist(user, contactId)

    const address = await prismaClient.address.findFirst({
        where: {
            contact_id: contactId,
            id: addressId
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

    if (!address) {
        throw new ResponseError(404, 'Address is not found')
    }

    return address
}

export const updateAddress = async (user, contactId, addressId, request) => {
    contactId = await checkContactExist(user, contactId)

    const { error, value } = validateAddressUpdate(request)

    if (error) {
        throw new ResponseError(422, error.details[0].message)
    }

    const totalAddressInDB = await prismaClient.address.count({
        where: {
            contact_id: contactId,
            id: addressId
        }
    })

    if (totalAddressInDB !== 1) {
        throw new ResponseError(404, 'Address is not found')
    }

    return prismaClient.address.update({
        where: {
            id: addressId
        },
        data: {
            title: value.title,
            street: value.street,
            city: value.city,
            province: value.province,
            count: value.count,
            postal_code: value.postal_code,
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

export const removeAddress = async (user, contactId, addressId) => {
    contactId = await checkContactExist(user, contactId)

    const totalAddressInDB = await prismaClient.address.count({
        where: {
            contact_id: contactId,
            id: addressId
        }
    })

    if (totalAddressInDB !== 1) {
        throw new ResponseError(404, 'Address is not found')
    }

    return prismaClient.address.delete({
        where: {
            id: addressId
        }
    })
}

export const getAddressesList = async (user, contactId) => {
    contactId = await checkContactExist(user, contactId)

    return await prismaClient.address.findMany({
        where: {
            contact_id: contactId,
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