import { Router } from 'express'
import addressController from '../controller/address-controller.js'
import { authMiddleware } from '../middleware/auth-middleware.js'

export const AddressRouter = Router()
AddressRouter.use(authMiddleware)

AddressRouter.post('/', addressController.create)
AddressRouter.get('/:addressId', addressController.get)
AddressRouter.put('/:addressId', addressController.update)
AddressRouter.delete('/:addressId', addressController.remove)
AddressRouter.get('/', addressController.list)