import { AuthService } from '../Service/auth.service.js'

export class AuthController {
  static async login(req, res) {
    try {
      const { email, password } = req.body
      const { user, token, refreshToken } = await AuthService.loginUser(email, password)
      res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24 * 7
      })
      return res.status(200).json({ user, accessToken: token })
    } catch (error) {
      return res.status(401).json({ message: error.message })
    }
  }

  static async logout(req, res) {
    try {
      const { id } = req.user
      await AuthService.logoutUser(id)
      res.clearCookie('refresh_token',
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        }
      )
      res.status(200).json({ message: 'Session Closed' })
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }
}
