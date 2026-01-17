import { Router } from 'express'
import { getUserController, logoutController, updateUserController } from '../controller/user-controller.js'
import authMiddleware from '../middleware/auth-middleware.js'

export const UserRouter = Router()

UserRouter.use(authMiddleware)
UserRouter.get('/current', getUserController)
UserRouter.patch('/current/update', updateUserController)
UserRouter.post('/logout', logoutController)
