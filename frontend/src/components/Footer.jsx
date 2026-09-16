import GoogleLoginButton from './GoogleLoginButton'

export default function Footer() {
  return (
    <div className="footer">
      <GoogleLoginButton />
      <p className="legal">
        By continuing you agree to our <a href="/terms">Terms</a> &amp; <a href="/privacy">Privacy Policy</a>
      </p>
    </div>
  )
}
