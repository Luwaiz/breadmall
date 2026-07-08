import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="topbar">
      <Link className="brand" to="/">
        <span className="brand-mark">BM</span>
        <span className="brand-copy">
          <strong>BreadMall</strong>
          <small>Freshly baked daily</small>
        </span>
      </Link>

      <nav className="topnav" aria-label="Primary navigation">
        <a href="#home">Home</a>
        <a href="#breads">Our breads</a>
        <a href="#story">Our story</a>
        <Link to="/my-orders">My Orders</Link>
        <Link to="/order" className="nav-cta">
          Order now
        </Link>
      </nav>
    </header>
  )
}
