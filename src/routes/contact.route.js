import { Router } from 'express'
import contactController from '../controller/contact-controller.js'

export const ContactRouter = Router()
ContactRouter.post('/', contactController.create)
ContactRouter.get('/:contactId', contactController.get)
ContactRouter.put('/:contactId', contactController.update)
ContactRouter.delete('/:contactId', contactController.remove)
ContactRouter.get('/', contactController.search)

