import express from 'express'
import { getUserById, logIn, signUp } from '../controller/user.js'

const userRouter = express.Router()

userRouter.post('/signup', signUp)
userRouter.post('/login', logIn)
userRouter.get('/:id', getUserById)
export default userRouter
