import { Router } from 'express'
import { createAddressController, getAddressController, getAddressesListController, removeAddressController, updateAddressController } from '../controller/address-controller.js'
import authMiddleware from '../middleware/auth-middleware.js'

export const AddressRouter = Router()

AddressRouter.use(authMiddleware)
AddressRouter.post('/:contactId/addresses/create', createAddressController)
AddressRouter.get('/:contactId/addresses/:addressId', getAddressController)
AddressRouter.put('/:contactId/addresses/:addressId/update', updateAddressController)
AddressRouter.delete('/:contactId/addresses/:addressId/remove', removeAddressController)
AddressRouter.get('/:contactId/addresses', getAddressesListController)