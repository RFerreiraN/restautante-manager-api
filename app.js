import express from 'express'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { connectDb } from './src/Config/database.js'
import { configDotenv } from 'dotenv'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import authRoutes from './src/Routes/auth.routes.js'
import profileRoutes from './src/Routes/profile.routes.js'
import productsRoutes from './src/Routes/product.routes.js'

configDotenv()

const PORT = process.env.PORT ?? 3000
const app = express()
await connectDb()
const server = createServer(app)
const io = new Server(server)

app.use(logger('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Holis')
})

app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)
app.use('/products', productsRoutes)

server.listen(PORT, () => {
  console.log(`Server Listening on port: http://localhost:${PORT}`)
})
