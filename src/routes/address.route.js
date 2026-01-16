import { Router } from 'express'
import addressController from '../controller/address-controller.js'

export const AddressRouter = Router()
AddressRouter.post('/', addressController.create)
AddressRouter.get('/:addressId', addressController.get)
AddressRouter.put('/:addressId', addressController.update)
AddressRouter.delete('/:addressId', addressController.remove)
AddressRouter.get('/', addressController.list)