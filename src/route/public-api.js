import express from 'express'
import guestController from '../controller/guest-controller.js'
import userController from '../controller/user-controller.js'

const publicRouter = new express.Router()

// User API
publicRouter.post('/api/users', userController.register)
publicRouter.post('/api/users/login', userController.login)

// Contact API (GUEST)
publicRouter.get('/api/guest/contacts/:contactId', guestController.getContact)
publicRouter.get('/api/guest/contacts', guestController.getContactsList)
publicRouter.get('/api/guest/contacts/:contactId/addresses', guestController.getAddressesList)

export { publicRouter }

