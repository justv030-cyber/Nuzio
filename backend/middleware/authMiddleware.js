import jwt from 'jsonwebtoken'
import { config } from '../config/env.js'

export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null

  if (!token) {
    return res.status(401).json({ error: 'No token provided' })
  }

  try {
    req.userId = jwt.verify(token, config.jwtSecret).sub
    next()
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' })
  }
}
