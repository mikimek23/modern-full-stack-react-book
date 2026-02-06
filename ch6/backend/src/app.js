import express from 'express'
import router from './routes/posts.js'
import cors from 'cors'
import userRouter from './routes/user.js'
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/v1/', router)
app.use('/api/v1/users', userRouter)

export { app }
