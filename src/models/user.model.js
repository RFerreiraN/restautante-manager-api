import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true

  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'manager', 'waiter'],
    default: 'waiter'
  },
  refreshToken: String
}, { timestamps: true })

export const User = mongoose.model('user', userSchema)
