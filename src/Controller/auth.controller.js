import { AuthService } from '../Service/auth.service.js'

export class AuthController {
  static async login(req, res) {
    try {
      const { email, password } = req.body
      const user = await AuthService.loginUser(email, password)
      const { token, refreshToken } = user
      res.cookie('refresh_token', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 1000 * 60 * 60 })
      res.status(200).json(user, { accessToken: token })
    } catch (error) {
      return res.status(401).json({ message: error.message })
    }
  }
}
