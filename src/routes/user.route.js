import { Router } from 'express'
import { getUserController, loginController, logoutController, refreshTokenController, registerController, updateUserController } from '../controller/user-controller.js'
import authMiddleware from '../middleware/auth-middleware.js'

export const UserRouter = Router()

UserRouter.post('/', registerController)
UserRouter.post('/login', loginController)
UserRouter.post('/current/refresh', refreshTokenController)

UserRouter.use(authMiddleware)
UserRouter.get('/current', getUserController)
UserRouter.patch('/current/update', updateUserController)
UserRouter.post('/logout', logoutController)
