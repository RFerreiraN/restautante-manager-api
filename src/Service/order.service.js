import { Order } from '../Models/order.model.js'
import { OrderRepository } from '../Repository/order.repository.js'
import { ProductRepository } from '../Repository/product.repository.js'

export class OrderService {
  static async createOrder(data) {
    const { items } = data
    let totalCalculate = 0

    for (const item of items) {
      const product = await ProductRepository.getProductById(item.product)
      if (!product) {
        throw new Error('Product not found')
      }

      if (product.available === false) {
        throw new Error(`Product ${product.nombre} is currently not available`)
      }

      totalCalculate += product.price * item.quantity
    }
    data.total = totalCalculate
    return await OrderRepository.createOrder(data)
  }

  static async getAllOrders() {
    const orders = await OrderRepository.getAllOrders()
    return orders
  }

  static async getOrderById(id) {
    const order = await OrderRepository.getOrderById(id)
    if (!order) {
      throw new Error('Order not found')
    }
    return order
  }

  static async updateStatus(id, status, role) {
    const order = await OrderRepository.getOrderById(id)

    if (!order) {
      throw new Error('Order Not Found')
    }

    if (order.status === 'cancelled' || order.status === 'paid') {
      throw new Error('Cant modify Order')
    }

    if (status === 'cancelled' && role !== 'admin') {
      throw new Error('Not authorized')
    }
    const orderStatus = await OrderRepository.updateStatus(id, status)
    return orderStatus
  }

  static async getOrdersByTable(tableId) {
    const ordersByTable = await OrderRepository.getOrdersByTable(tableId)
    if (!ordersByTable) {
      throw new Error('Table empty')
    }
    return ordersByTable
  }

  static async getOrdersByUser(userId) {
    const ordersByUser = await OrderRepository.getOrdersByUser(userId)
    return ordersByUser
  }

  static async updateOrder(id, data) {
    const { items } = data
    let totalCalculate = 0
    for (const item of items) {
      const product = await ProductRepository.getProductById(item.product)
      if (!product) {
        throw new Error('Product not found')
      }

      if (product.available === false) {
        throw new Error(`Product ${product.nombre} is currently not available`)
      }

      totalCalculate += product.price * item.quantity
    }
    data.total = totalCalculate
    return await OrderRepository.updateOrder(id, data)
  }
}
