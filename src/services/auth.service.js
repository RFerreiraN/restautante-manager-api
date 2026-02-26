import { UserRepository } from '../repositories/user.repository.js'
import { hashPassword } from '../utils/hash.js'

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
