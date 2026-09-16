import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { authService } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadUser = useCallback(async () => {
    const token = authService.getToken()
    if (!token) {
      setUser(null)
      setLoading(false)
      return
    }
    try {
      const currentUser = await authService.fetchCurrentUser()
      setUser(currentUser)
    } catch (err) {
      authService.clearToken()
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadUser()
  }, [loadUser])

  async function loginWithGoogle() {
    const url = await authService.getGoogleRedirectUrl()
    window.location.href = url
  }

  function completeLogin(token) {
    authService.saveToken(token)
    return loadUser()
  }

  function logout() {
    authService.clearToken()
    setUser(null)
  }

  const value = { user, loading, loginWithGoogle, completeLogin, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
