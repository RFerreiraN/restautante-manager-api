import { UserRepository } from '../repositories/user.repository'

export class ControllerProfile {
  static async findUser(req, res) {
    const userID = req.user.id

    const user = await UserRepository.findUserById(userID)
    if (!user) {
      return res.status(404).json({ message: 'User Not Found' })
    } else {
      return res.status(200).json({
        id: user._id,
        nombre: user.nombre,
        email: user.email,
        role: user.role
      })
    }
  }
}
