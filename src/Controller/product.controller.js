import { ProductService } from '../Service/product.service.js'
import { validateProduct } from '../utils/Validations/product.validator.js'

export class ProductController {
  static async createProduct(req, res) {
    const results = validateProduct(req.body)
    if (results.error) {
      return res.status(400).json({ error: results.error.errors[0].message })
    }

    try {
      const newProduct = await ProductService.createProduct(results.data)
      return res.status(201).json(newProduct)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }
}
