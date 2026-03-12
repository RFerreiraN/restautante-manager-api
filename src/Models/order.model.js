import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },

  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products',
      required: true
    },

    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  }],

  status: {
    type: String,
    enum: ['pending', 'preparing', 'ready', 'delivered', 'cancelled'],
    default: 'pending'
  },

  table: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'table'
  },

  total: {
    type: Number,
    required: true
  }

}, { timestamps: true })

export const Order = mongoose.model('orders', orderSchema)
