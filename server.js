import express from 'express'
import dotenv from 'dotenv'
import logger from 'morgan'

import { createServer } from 'node:http'

dotenv.config()

const PORT = process.env.PORT ?? 3000

const app = express()
const server = createServer(app)

app.use(logger('dev'))

app.get('/', (req, res) => {
  res.json({ message: 'Página Oficial' })
})

app.listen(PORT, () => {
  console.log(`Server Listening on port: http://localhost:${PORT}`)
})
