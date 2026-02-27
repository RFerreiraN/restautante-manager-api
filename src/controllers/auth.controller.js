import { validateUser } from '../utils/validator/auth.validators.js'
import { refreshUserSession, registerUser } from '../services/auth.service.js'
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
      const { user, accessToken, refreshToken } = await loginUser(req.body)
      return res
        .cookie('refresh_token', refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 1000 * 60 * 60 * 24 * 7
        })
        .status(200).json({ user, accessToken })
    } catch (error) {
      return res.status(401).json({ error: error.message })
    }
  }

  static async refresh(req, res) {
    const refreshToken = req.cookies.refresh_token
    if (!refreshToken) {
      return res.status(401).json({ message: 'Not Exists' })
    }

    try {
      const { accessToken } = await refreshUserSession(refreshToken)
      return res.status(200).json({ accessToken })
    } catch (error) {
      return res.status(403).json({ message: error.message })
    }
  }
}
