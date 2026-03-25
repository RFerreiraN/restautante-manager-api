import { io } from 'socket.io-client'

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YzMwNDFjZjNjYjJmNmZkYjViNTQzNiIsImlhdCI6MTc3NDQ3NTI0MiwiZXhwIjoxNzc0NDc2MTQyfQ.Iqg65rq95nbAc4DNqRHXhQsyc7AQYd-ngGD0ur5X8jI"

const socket = io('http://localhost:3000', {
  auth: { token }
})

socket.on('connect', () => {
  console.log('Conectado al servidor', socket.id)

  const tableId = 123
  socket.emit('joinTable', tableId)

  socket.on('orderCreated', (orderData) => {
    console.log('new Order', orderData)
  })
})

socket.on('disconnect', () => {
  console.log('disconnect')
})