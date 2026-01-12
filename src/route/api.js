import express from 'express'
import userController from '../controller/user-controller'
import { authMiddleware } from '../middleware/auth-middleware'

const userRouter = new express.Router()
userRouter.use(authMiddleware)
userRouter.get('/api/users/current', userController.get)
userRouter.get('/api/users/current', userController.update)
userRouter.get('/api/users/current', userController.logout)

export { userRouter }
