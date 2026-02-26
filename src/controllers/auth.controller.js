import { validateUser } from '../utils/validator/auth.validators.js'
import { registerUser } from '../services/auth.service.js'

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

  static async refresh(req, res) {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
      return res.status(401).json({ message: 'Not Exists' })
    }
  }
}
