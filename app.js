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
import ordersRoutes from './src/Routes/order.routes.js'
import tablesRoutes from './src/Routes/table.routes.js'
import jwt from 'jsonwebtoken'

configDotenv()

const PORT = process.env.PORT ?? 3000
const app = express()
await connectDb()
const server = createServer(app)
export const io = new Server(server, {
  connectionStateRecovery: true,
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST']
  }
})

io.use((socket, next) => {
  const token = socket.handshake.auth.token
  if (!token) {
    return next(new Error('User not authorized'))
  }

  try {
    const user = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
    socket.user = user
  } catch (error) {
    next(new Error('Token Inválido'))
  }
  next()
})

io.on('connection', async (socket) => {
  console.log('Conectado', socket.user.id)

  socket.on('disconnect', () => {
    console.log('Desconectado')
  })
})

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
app.use('/orders', ordersRoutes)
app.use('/tables', tablesRoutes)

server.listen(PORT, () => {
  console.log(`Server Listening on port: http://localhost:${PORT}`)
})
