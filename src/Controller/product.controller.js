import { ProductService } from '../Service/product.service.js'
import { validateProduct } from '../utils/Validations/product.validator.js'

export class ProductController {
  static async createProduct(req, res) {
    const results = validateProduct(req.body)
    if (results.error) {
      return res.status(400).json({ error: results.error.message })
    }

    try {
      const newProduct = await ProductService.createProduct(results.data)
      return res.status(201).json(newProduct)
    } catch (error) {
      return res.status(500).json({ message: 'Error Server' })
    }
  }

  static async getAllProducts(req, res) {
    try {
      const products = await ProductService.getAllProducts()
      return res.status(200).json(products)
    } catch (error) {
      return res.status(404).json({ message: 'Products not found' })
    }
  }

  static async getProductById(req, res) {
    const { id } = req.params
    try {
      const product = await ProductService.getProductById(id)
      return res.status(200).json(product)
    } catch (error) {
      return res.status(404).json({ message: 'Product not found' })
    }
  }
}
