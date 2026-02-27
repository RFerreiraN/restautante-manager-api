import { validateUser } from '../utils/validator/auth.validators.js'
import { registerUser } from '../services/auth.service.js'
import { loginUser } from '../services/login.service.js'

export class ControllerAuth {
  static async create(req, res) {
    const result = validateUser(req.body)
    if (result.error) {
      return res.status(400).json({ errors: result.error.errors })
    }

    try {
      const newUser = await registerUser(result.data)
      return res.status(201).json(newUser)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  static async login(req, res) {
    try {
      const { user, token, refreshToken } = await loginUser(req.body)
      return res
        .cookie('access_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 1000 * 60 * 15
        })
        .cookie('refresh_token', refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 1000 * 60 * 60 * 24 * 7
        })
        .status(200).json(user)
    } catch (error) {

    }
  }

  static async refresh(req, res) {
    const refreshToken = req.cookies.refresh_Token
    if (!refreshToken) {
      return res.status(401).json({ message: 'Not Exists' })
    }
  }
}
