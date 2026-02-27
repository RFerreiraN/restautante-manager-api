import jwt from 'jsonwebtoken'
import { UserRepository } from '../repositories/user.repository.js'
import { comparePassword } from '../utils/hash.js'

export async function loginUser(data) {
  const { email, password } = data

  const user = await UserRepository.findUserByEmail(email)
  if (!user) {
    throw new Error('Invalid Credentials')
  }

  const isValid = await comparePassword(password, user.password)
  if (!isValid) {
    throw new Error('Invalid Credentials')
  }

  const accessToken = jwt.sign(
    {
      id: user._id,
      role: user.role
    },
    process.env.SECRET_JWT_KEY,
    { expiresIn: '15m' }
  )

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.SECRET_REFRESH_JWT_KEY,
    { expiresIn: '7d' }
  )

  await UserRepository.updateRefreshToken(user._id, refreshToken)

  return {
    user: {
      id: user._id,
      nombre: user.nombre,
      email: user.email,
      role: user.role
    },
    accessToken,
    refreshToken
  }
}
