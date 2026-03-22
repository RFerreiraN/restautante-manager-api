import { User } from '../Models/user.model.js'

export class UserRepository {
  static async register(data) {
    return await User.create(data)
  }

  static async findByEmail(email) {
    return await User.findOne({ email })
  }

  static async findByToken(refreshToken) {
    return await User.findOne({ refreshToken })
  }

  static async findAndUpdateRefreshToken(id, refreshToken) {
    return await User.findByIdAndUpdate(id, { refreshToken })
  }

  static async findById(id) {
    return await User.findById(id)
  }

  static async getAllUsers() {
    return await User.find({ isActive: false })
  }

  static async updateUser(id, data) {
    return await User.findByIdAndUpdate(id, data, { new: true })
  }

  static async deleteUser(id) {
    return await User.findByIdAndUpdate(id, { isActive: false }, { new: true })
  }
}
