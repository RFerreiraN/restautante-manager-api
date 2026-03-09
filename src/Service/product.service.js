import { ProductRepository } from '../Repository/product.repository.js'

export class ProductService {
  static async createProduct(data) {
    const { price, nombre } = data
    if (price < 0) {
      throw new Error('Price most be a positive number')
    }
    if (nombre.trim() === '') {
      throw new Error('Invalid Name')
    }

    const product = await ProductRepository.createProduct(data)

    return {
      product: {
        nombre: product.nombre,
        price: product.price,
        description: product.description
      }
    }
  }

  static async getAllProducts() {
    const products = await ProductRepository.getAllProducts()
    return products
  }

  static async getProductById(id) {
    const product = await ProductRepository.getProductById(id)
    if (!product) {
      throw new Error('Product not found')
    }
    return product
  }

  static async updateProduct(id, data) {
    const product = await ProductRepository.updateProduct(id, data)
    if (!product) {
      throw new Error('Product not found')
    }
    return product
  }
}
