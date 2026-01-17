import { Router } from 'express'
import { guestGetAddressesListController, guestGetContactController, guestGetContactsListController } from '../controller/guest-controller.js'

export const GuestRouter = Router()

GuestRouter.get('/:contactId', guestGetContactController)
GuestRouter.get('/', guestGetContactsListController)
GuestRouter.get('/:contactId/addresses', guestGetAddressesListController)