import { io } from 'socket.io-client'

const socket = io('http://localhost:3000', {
  transports: ['websocket']
})

socket.on('connect', () => {
  console.log('✅ Connected:', socket.id)
})

socket.on('order:new', (data) => {
  console.log('🔥 NEW ORDER:', data)
})

socket.on('connect_error', (err) => {
  console.log('❌ Connection error:', err.message)
})
