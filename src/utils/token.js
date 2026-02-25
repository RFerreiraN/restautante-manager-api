import jwt from 'jsonwebtoken'

export function generateAccessToken(id, role) {
  return jwt.sign(
    { id, role },
    process.env.SECRET_JWT_KEY,
    { expiresIn: '15m' }
  )
}

export function refreshAccessToken(id) {
  return jwt.sign(
    { id },
    process.env.SECRET_REFRESH_JWT_KEY,
    { expiresIn: '7d' }
  )
}
