import { User } from '../Models/user.model.js'

export class UserRepository {
  static async register(Data) {
    return await User.create(Data)
  }

  static async findByEmail(email) {
    return await User.findOne({ email })
  }

  static async findByToken(refreshToken) {
    return await User.findOne({ refreshToken })
  }

  static async findAndUpdateRefreshToken(id) {
    return await User.findByIdAndUpdate(id, { refreshToken: null })
  }
}
