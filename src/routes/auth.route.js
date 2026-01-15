import { Router } from 'express'
import userController from '../controller/user-controller.js'
import { authMiddleware } from '../middleware/auth-middleware.js'

export const AuthRouter = Router()

AuthRouter.post('/', userController.register)
AuthRouter.post('/login', userController.login)

AuthRouter.use(authMiddleware)
AuthRouter.get('/current', userController.get)
AuthRouter.patch('/current', userController.update)
AuthRouter.delete('/current', userController.logout)
