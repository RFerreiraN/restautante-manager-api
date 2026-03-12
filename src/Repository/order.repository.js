import { Order } from '../Models/order.model.js'

export class OrderRepository {
  // Creación y consultas Básicas

  static async createOrder(data) {
    return Order.create(data)
  }

  static async getAllOrders() {
    return Order.find()
  }

  static async getOrderById(id) {
    return Order.findById(id)
  }

  // Gestión de Estados
  static async updateStatus(id, status) {
    return Order.findByIdAndUpdate(id, { status }, { new: true })
  }

  static async getOrderByStatus(status) {
    return Order.find({ status })
  }

  // Filtros Operativos
  static async getOrdersByTable(tableId) {
    return Order.find({ table: tableId })
  }

  static async getOrdersByUser(userId) {
    return Order.find({ user: userId })
  }

  // Actualizacion y persistencia
  static async updateOrder(id, data) {
    return Order.findByIdAndUpdate(id, data, { new: true })
  }
}
