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
import usersRoutes from './src/Routes/user.routes.js'
import jwt from 'jsonwebtoken'

configDotenv()

const PORT = process.env.PORT ?? 3000
const app = express()
await connectDb()
const server = createServer(app)
export const io = new Server(server, {
  // connectionStateRecovery: true,
  cors: {
    origin: '*'
  }
})

// io.use((socket, next) => {
//   console.log('🔥 Middleware ejecutándose')

//   const token = socket.handshake.auth.token
//   console.log('TOKEN RECIBIDO:', token)
//   try {
//     const token = socket.handshake.auth.token

//     if (!token) {
//       return next(new Error('User not authorized'))
//     }

//     const user = jwt.verify(token, process.env.JWT_ACCESS_SECRET)

//     socket.user = user

//     next()
//   } catch (error) {
//     next(new Error('Invalid Token'))
//   }
// })

io.on('connection', async (socket) => {
  console.log('Connected', socket.id)

  socket.on('message', (data) => {
    console.log('Message recived', data)

    socket.emit('answer', 'Hola')
  })

  socket.on('disconnect', () => {
    console.log('Disconnect')
  })
})

io.engine.on('connection_error', (err) => {
  console.log('ENGINE ERROR:', err)
})

io.engine.on('upgradeError', (err) => {
  console.log('UPGRADE ERROR:', err)
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
app.use('/users', usersRoutes)

server.listen(PORT, () => {
  console.log(`Server Listening on port: http://localhost:${PORT}`)
})
