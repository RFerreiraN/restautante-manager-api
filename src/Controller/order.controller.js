import { OrderService } from '../Service/order.service'
import { validateOrder, validatePartialOrder } from '../utils/Validations/order.validator.js'

export class OrderController {
  static async createOrder(req, res) {
    const results = validateOrder(req.body)
    if (!results.success) {
      return res.status(400).json({ message: JSON.parse(results.error.message) })
    }

    const validateData = {
      ...results.data,
      user: req.user.id
    }

    try {
      const order = await OrderService.createOrder(validateData)
      return res.status(201).json(order)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }

  static async getAllOrders(req, res) {
    try {
      const orders = await OrderService.getAllOrders()
      return res.status(200).json(orders)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }

  static async getOrderById(req, res) {
    const { id } = req.params
    try {
      const order = await OrderService.getOrderById(id)
      return res.status(200).json(order)
    } catch (error) {
      return res.status(404).json({ message: error.message })
    }
  }

  static async updateStatus(req, res) {
    const results = validatePartialOrder(req.body)
    if (!results.success) {
      return res.status(400).json({ message: JSON.parse(results.error.message) })
    }
    const { id } = req.params
    const { status } = results.data

    try {
      const orderStatus = await OrderService.updateStatus(id, status)
      return res.status(200).json(orderStatus)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }

  static async getOrdersByTable(req, res) {
    const { id } = req.params
    try {
      const table = await OrderService.getOrdersByTable(id)
      return res.status(200).json(table)
    } catch (error) {
      return res.status(404).json({ message: error.message })
    }
  }
}
