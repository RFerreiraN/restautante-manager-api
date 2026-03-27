import { io } from 'socket.io-client'

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YzMwNDFjZjNjYjJmNmZkYjViNTQzNiIsImlhdCI6MTc3NDQ3Njk4NSwiZXhwIjoxNzc0NDc3ODg1fQ.sdWyPBeYY1b1gBkvgXLuFqOr-ByB0I_uk5CYYfySHR0'

const socket = io('http://localhost:3000', {
  auth: { token }
})

socket.on('connect', () => {
  console.log('Conectado al servidor', socket.id)

  const tableId = 123
  socket.emit('joinTable', tableId)

  const testOrder = {
    tableId,
    products: [{ name: 'Pizza', qty: 2 }],
    total: 20,
    status: 'pending'
  }
  socket.emit('createOrder', testOrder)
})

// socket.on('orderCreated', (orderData) => {
//   console.log('New order', orderData)
// })

socket.on('disconnect', () => {
  console.log('disconnect')
})
