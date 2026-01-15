import { Router } from 'express'
import addressController from '../controller/address-controller.js'
import { deserializedToken } from '../middleware/deserialized-token.js'

export const AddressRouter = Router()
AddressRouter.use(deserializedToken)

AddressRouter.post('/', addressController.create)
AddressRouter.get('/:addressId', addressController.get)
AddressRouter.put('/:addressId', addressController.update)
AddressRouter.delete('/:addressId', addressController.remove)
AddressRouter.get('/', addressController.list)