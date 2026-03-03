import { UserRepository } from '../Repository/user.repository.js'
import jwt from 'jsonwebtoken'
import { comparePassword } from '../utils/hash.js'

export class AuthService {
  static async registerUser(data) {
    const { email, password } = data
    return await UserRepository.register(data)
  }

  static async loginUser(email, password) {
    const user = await UserRepository.findByEmail(email)
    if (!user) {
      throw new Error('Email or Password Invalid')
    }

    const isValid = await comparePassword(password, user.password)
    if (!isValid) {
      throw new Error('Email or Password Invalid')
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: '15m' }
    )

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    )

    await UserRepository.findAndUpdateRefreshToken(user._id, refreshToken)
    return {
      user: {
        id: user._id,
        nombre: user.nombre,
        email: user.email
      },
      token,
      refreshToken
    }
  }

  static async refreshUserSession(refreshToken) {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
    if (!decoded) {
      throw new Error('Token invalid ot expired')
    }

    const user = await UserRepository.findByToken(refreshToken)
    if (!user) {
      throw new Error('Token Invalid')
    }

    const newAccessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: '15m' }
    )
    return { accessToken: newAccessToken }
  }

  static async logoutUser(id) {

  }
}
