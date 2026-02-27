import { UserRepository } from '../repositories/user.repository.js'
import { hashPassword } from '../utils/hash.js'
import jwt from 'jsonwebtoken'

export async function registerUser(data) {
  const { nombre, email, password } = data

  const userExists = await UserRepository.findUserByEmail(email)

  if (userExists) {
    throw new Error('Email already in use')
  }

  const passwordHash = await hashPassword(password)

  const newUser = await UserRepository.createUser({
    nombre,
    email,
    password: passwordHash
  })

  return {
    id: newUser._id,
    nombre: newUser.nombre,
    email: newUser.email,
    role: newUser.role
  }
}

export async function refreshUserSession(refreshToken) {
  try {
    const decoded = jwt.verify(refreshToken, process.env.SECRET_REFRESH_JWT_KEY)

    const user = await UserRepository.findUserById(decoded.id)
    if (!user) {
      throw new Error('User Not Exists')
    }

    if (user.refreshToken !== refreshToken) {
      throw new Error('Invalid Refresh Token')
    }

    const newAccessToken = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.SECRET_JWT_KEY,
      { expiresIn: '15m' }
    )

    return { accessToken: newAccessToken }
  } catch (error) {
    throw new Error('Refresh Token invalid or expired')
  }
}
