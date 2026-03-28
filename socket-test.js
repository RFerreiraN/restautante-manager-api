import { io } from 'socket.io-client'

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YzMwNDFjZjNjYjJmNmZkYjViNTQzNiIsImlhdCI6MTc3NDczNTg4MywiZXhwIjoxNzc0NzM2NzgzfQ.K_12ys2pY_QYuyIXHRU5xePNn4y9V53RMEiywj6IS_o'

const socket = io('http://localhost:3000', {
  transports: ['websocket']
})

socket.on('connect', () => {
  console.log('Connected')

  socket.emit('message', 'Hola server')
})

socket.on('answer', (data) => {
  console.log('Answer from client', data)
})

socket.on('connect_error', (err) => {
  console.log('Error de conexión:', err.message)
})
