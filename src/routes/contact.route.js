import { Router } from 'express'
import { createContactController, getContactController, removeContactController, searchContactsController, updateContactController } from '../controller/contact-controller.js'
import authMiddleware from '../middleware/auth-middleware.js'

export const ContactRouter = Router()

ContactRouter.use(authMiddleware)
ContactRouter.post('/create', createContactController)
ContactRouter.get('/:contactId', getContactController)
ContactRouter.put('/:contactId/update', updateContactController)
ContactRouter.delete('/:contactId/remove', removeContactController)
ContactRouter.get('/', searchContactsController)