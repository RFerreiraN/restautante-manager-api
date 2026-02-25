import express from 'express'
import dotenv from 'dotenv'
import logger from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { conectRestDb } from './config/db.js'
import { createServer } from 'node:http'

dotenv.config()
const PORT = process.env.PORT ?? 3000
const app = express()
const server = createServer(app)

app.use(logger('dev'))
app.use(express.json())
app.use(cors())
app.use(cookieParser())

await conectRestDb()

app.get('/', (req, res) => {
  res.json({ message: 'Página Oficial' })
})

server.listen(PORT, () => {
  console.log(`Server Listening on port: http://localhost:${PORT}`)
})
