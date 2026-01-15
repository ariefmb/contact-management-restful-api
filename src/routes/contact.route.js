import { Router } from 'express'
import contactController from '../controller/contact-controller.js'
import { deserializedToken } from '../middleware/deserialized-token.js'

export const ContactRouter = Router()
ContactRouter.use(deserializedToken)

ContactRouter.post('/api/contacts', contactController.create)
ContactRouter.get('/api/contacts/:contactId', contactController.get)
ContactRouter.put('/api/contacts/:contactId', contactController.update)
ContactRouter.delete('/api/contacts/:contactId', contactController.remove)
ContactRouter.get('/api/contacts/', contactController.search)

