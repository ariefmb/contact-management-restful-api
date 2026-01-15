import { Router } from 'express'
import guestController from '../controller/guest-controller.js'

export const GuestRouter = Router()

GuestRouter.get('/:contactId', guestController.getContact)
GuestRouter.get('/', guestController.getContactsList)
GuestRouter.get('/:contactId/addresses', guestController.getAddressesList)