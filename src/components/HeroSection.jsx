import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">Bakery • oven-warm every morning</p>
        <h1>Fresh bread, baked with love and patience.</h1>
        <p className="hero-text">
          BreadMall brings you classic favourites like milk bread, butter bread,
          coconut bread, rolls, premium packs, and fruit bread made fresh for your home and table.
        </p>

        <div className="hero-actions">
          <Link className="button primary" to="/order">
            Order now
          </Link>
          <a className="button secondary" href="#story">
            Our story
          </a>
        </div>

        <ul className="hero-points">
          <li>✓ Freshly baked daily</li>
          <li>✓ Loved across Nigerian homes</li>
          <li>✓ Perfect for breakfast, gifting, and sharing</li>
        </ul>
      </div>

      <div className="hero-card">
        <div className="hero-visual">
          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80"
            alt="Premium Pack Bread"
          />
          <div className="hero-note">
            <p className="eyebrow">This morning’s pick</p>
            <h3>Premium Pack Bread</h3>
            <p>Soft, rich, and perfect for sharing with family, guests, and special occasions.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
