import { Router } from 'express'
import userController from '../controller/user-controller.js'
import { deserializedToken } from '../middleware/deserialized-token.js'

export const AuthRouter = Router()

AuthRouter.post('/', userController.register)
AuthRouter.post('/login', userController.login)

AuthRouter.use(deserializedToken)
AuthRouter.get('/current', userController.get)
AuthRouter.patch('/current', userController.update)
AuthRouter.delete('/current', userController.logout)
