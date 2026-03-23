import { UserRepository } from '../Repository/user.repository.js'

export class UserService {
  static async getAllUsers() {
    const users = await UserRepository.getAllUsers()
    return users
  }

  static async updateUser(id, data) {
    const user = await UserRepository.updateUser(id, data)
    if (!user) {
      throw new Error('User Not Found')
    }
    return {
      nombre: user.nombre,
      email: user.email,
      role: user.role,
      isActive: user.isActive
    }
  }

  static async deleteUser(id) {
    const user = await UserRepository.deleteUser(id)
    if (!user) {
      throw new Error('User Not Found')
    }

    if (user.isActive === false) {
      throw new Error('User already delete')
    }

    return {
      nombre: user.nombre,
      email: user.email,
      role: user.role,
      isActive: user.isActive
    }
  }
}
