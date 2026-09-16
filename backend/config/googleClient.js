import { OAuth2Client } from 'google-auth-library'
import { config } from './env.js'

console.log('Google Client ID:', config.google.clientId)
console.log('Google Redirect URI:', config.google.redirectUri)

export const googleClient = new OAuth2Client(
  config.google.clientId,
  config.google.clientSecret,
  config.google.redirectUri
)
