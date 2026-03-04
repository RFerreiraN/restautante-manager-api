import { UserRepository } from '../Repository/user.repository.js'

export class ProfileService {
  static async getProfile(userId) {
    const user = await UserRepository.findById(userId)
    if (!user) {
      throw new Error('User does not exists')
    }
    return {
      id: user._id,
      nombre: user.nombre,
      email: user.email,
      role: user.role
    }
  }
}
