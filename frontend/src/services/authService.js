import { api } from './api'

const TOKEN_KEY = 'nuzio_token'

export const authService = {
  async getGoogleRedirectUrl() {
    const { url } = await api.get('/auth/google/url')
    return url
  },

  async fetchCurrentUser() {
    const { user } = await api.get('/auth/me')
    return user
  },

  saveToken(token) {
    localStorage.setItem(TOKEN_KEY, token)
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY)
  },

  clearToken() {
    localStorage.removeItem(TOKEN_KEY)
  }
}
