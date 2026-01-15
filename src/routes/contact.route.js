import { Router } from 'express'
import contactController from '../controller/contact-controller.js'
import { authMiddleware } from '../middleware/auth-middleware.js'

export const ContactRouter = Router()
ContactRouter.use(authMiddleware)

ContactRouter.post('/api/contacts', contactController.create)
ContactRouter.get('/api/contacts/:contactId', contactController.get)
ContactRouter.put('/api/contacts/:contactId', contactController.update)
ContactRouter.delete('/api/contacts/:contactId', contactController.remove)
ContactRouter.get('/api/contacts/', contactController.search)

