import { useState } from 'react'
import GoogleIcon from './GoogleIcon'
import { useAuth } from '../context/AuthContext'

export default function GoogleLoginButton() {
  const { loginWithGoogle } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleClick() {
    setError(null)
    setLoading(true)
    try {
      await loginWithGoogle()
      // browser navigates away to Google here, so loading stays true
    } catch (err) {
      console.error('Failed to start Google sign-in', err)
      setError('Could not start sign-in. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="google-login">
      <button className="google-btn" onClick={handleClick} disabled={loading}>
        <GoogleIcon />
        <span>{loading ? 'Redirecting…' : 'Continue with Google'}</span>
      </button>
      {error && <p className="error-text">{error}</p>}
    </div>
  )
}
