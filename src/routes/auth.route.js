import { Router } from 'express'
import { loginController, refreshTokenController, registerController } from '../controller/user-controller.js'

export const AuthRouter = Router()

AuthRouter.post('/', registerController)
AuthRouter.post('/login', loginController)
AuthRouter.post('/current/refresh', refreshTokenController)