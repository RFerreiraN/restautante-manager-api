import jwt from 'jsonwebtoken'

export async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access Denied ' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY)
    req.user = decoded
  } catch (error) {
    return res.status(401).json({ message: 'Invalid Token' })
  }
  next()
}
