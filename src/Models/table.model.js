import mongoose from 'mongoose'

const tableSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
    unique: true
  },

  capacity: {
    type: Number
  },

  status: {
    type: String,
    enum: ['free', 'occupied', 'reserved'],
    required: true
  }
}, { timestamps: true })

export const Table = mongoose.model('table', tableSchema)
