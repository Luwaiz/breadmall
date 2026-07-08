import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { loginAdmin } from '../lib/api'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const { token } = await loginAdmin(username, password)
      localStorage.setItem('breadmall_admin_token', token)
      navigate('/admin')
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="page-shell" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        width: '100%',
        maxWidth: '460px',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '24px',
        padding: '3rem 2.5rem',
        boxShadow: '0 24px 48px rgba(153, 85, 30, 0.08)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            display: 'inline-grid',
            placeItems: 'center',
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--accent), var(--accent-strong))',
            color: 'white',
            fontWeight: '700',
            fontSize: '1.25rem',
            letterSpacing: '0.08em',
            boxShadow: '0 12px 28px rgba(153, 85, 30, 0.25)',
            marginBottom: '1.25rem',
          }}>
            BM
          </div>
          <p className="eyebrow" style={{ margin: '0 0 0.25rem' }}>Admin Portal</p>
          <h1 style={{ fontSize: '1.75rem', margin: 0 }}>Welcome back</h1>
          <p style={{ color: 'var(--muted)', marginTop: '0.5rem', marginBottom: 0 }}>
            Sign in to manage BreadMall orders
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-h)' }}>Username</span>
            <input
              id="admin-username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              autoFocus
              style={{
                padding: '0.85rem 1rem',
                borderRadius: '12px',
                border: `1.5px solid ${error ? '#e53e3e' : 'var(--border)'}`,
                background: '#fffdf8',
                fontSize: '1rem',
                color: 'var(--text)',
                outline: 'none',
                transition: 'border-color 180ms ease, box-shadow 180ms ease',
                fontFamily: 'inherit',
              }}
              onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px rgba(201, 123, 59, 0.12)' }}
              onBlur={e => { e.target.style.borderColor = error ? '#e53e3e' : 'var(--border)'; e.target.style.boxShadow = 'none' }}
            />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-h)' }}>Password</span>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              style={{
                padding: '0.85rem 1rem',
                borderRadius: '12px',
                border: `1.5px solid ${error ? '#e53e3e' : 'var(--border)'}`,
                background: '#fffdf8',
                fontSize: '1rem',
                color: 'var(--text)',
                outline: 'none',
                transition: 'border-color 180ms ease, box-shadow 180ms ease',
                fontFamily: 'inherit',
              }}
              onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px rgba(201, 123, 59, 0.12)' }}
              onBlur={e => { e.target.style.borderColor = error ? '#e53e3e' : 'var(--border)'; e.target.style.boxShadow = 'none' }}
            />
          </label>

          {error && (
            <div style={{
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              background: '#fff5f5',
              border: '1px solid #fed7d7',
              color: '#c53030',
              fontSize: '0.9rem',
              fontWeight: '500',
            }}>
              {error}
            </div>
          )}

          <button
            id="admin-login-btn"
            type="submit"
            disabled={isLoading}
            className="button primary full"
            style={{ marginTop: '0.5rem', padding: '0.9rem', fontSize: '1rem', borderRadius: '12px' }}
          >
            {isLoading ? 'Signing in…' : 'Sign in to Dashboard'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.75rem', marginBottom: 0, color: 'var(--muted)', fontSize: '0.9rem' }}>
          <Link to="/" style={{ color: 'var(--accent)', fontWeight: '600', textDecoration: 'none' }}>
            ← Back to storefront
          </Link>
        </p>
      </div>
    </div>
  )
}
