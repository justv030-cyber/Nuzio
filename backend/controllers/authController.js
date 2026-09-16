import jwt from 'jsonwebtoken'
import { googleClient } from '../config/googleClient.js'
import { userStore } from '../store/userStore.js'
import { config } from '../config/env.js'

// GET /api/auth/google/url
// Frontend calls this when the user taps "Continue with Google".
export function getGoogleAuthUrl(req, res) {
  const url = googleClient.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: ['openid', 'email', 'profile']
  })
  res.json({ url })
}

// GET /api/auth/google/callback
// Google redirects here after the user consents.
export async function handleGoogleCallback(req, res) {
  const { code } = req.query

  if (!code) {
    return res.redirect(`${config.clientUrl}/?error=missing_code`)
  }

  try {
    const { tokens } = await googleClient.getToken(code)
    googleClient.setCredentials(tokens)

    const ticket = await googleClient.verifyIdToken({
      idToken: tokens.id_token,
      audience: config.google.clientId
    })
    const payload = ticket.getPayload()

    const user = userStore.upsert({
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture
    })

    const appToken = jwt.sign({ sub: user.id, email: user.email }, config.jwtSecret, {
      expiresIn: '7d'
    })

    res.redirect(`${config.clientUrl}/auth/callback?token=${appToken}`)
  } catch (err) {
    console.error('Google auth failed', err)
    res.redirect(`${config.clientUrl}/?error=google_auth_failed`)
  }
}

// GET /api/auth/me  (protected by requireAuth middleware)
export function getCurrentUser(req, res) {
  const user = userStore.findById(req.userId)
  if (!user) return res.status(404).json({ error: 'User not found' })
  res.json({ user })
}

// POST /api/auth/logout
// Stateless JWT — logout is a client-side concern (drop the token),
// this endpoint exists so the frontend has a consistent call to make.
export function logout(req, res) {
  res.json({ success: true })
}
