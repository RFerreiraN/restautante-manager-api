import { Product } from '../Models/product.model.js'

export class ProductRepository {
  static async createProduct(data) {
    return await Product.create(data)
  }

  static async getAllProducts() {
    return await Product.find()
  }

  static async getProductById(id) {
    return await Product.findById(id)
  }

  static async updateProduct(id, updatingProduct) {
    return await Product.findByIdAndUpdate(id, updatingProduct, { new: true })
  }

  static async deleteProduct(id) {
    return await Product.findByIdAndDelete(id)
  }
}
