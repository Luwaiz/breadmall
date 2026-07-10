import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="page-shell" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="order-empty-state">
        <h3>Page not found</h3>
        <p>The page you're looking for doesn't exist or may have moved.</p>
        <Link className="button primary" to="/">
          Back to home
        </Link>
      </div>
    </div>
  )
}
