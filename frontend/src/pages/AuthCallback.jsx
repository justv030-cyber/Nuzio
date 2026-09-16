import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AuthCallback() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { completeLogin } = useAuth()
  const [error, setError] = useState(null)

  useEffect(() => {
    const token = searchParams.get('token')
    const errorParam = searchParams.get('error')

    if (errorParam) {
      setError('Google sign-in failed. Please try again.')
      return
    }

    if (!token) {
      setError('Missing sign-in token.')
      return
    }

    completeLogin(token).then(() => navigate('/home', { replace: true }))
  }, [searchParams, completeLogin, navigate])

  return (
    <div className="screen callback-screen">
      <div className="glow" />
      <div className="content callback-content">
        {error ? (
          <>
            <p className="subtitle">{error}</p>
            <button className="google-btn" onClick={() => navigate('/', { replace: true })}>
              Back to sign in
            </button>
          </>
        ) : (
          <p className="subtitle">Signing you in…</p>
        )}
      </div>
    </div>
  )
}
