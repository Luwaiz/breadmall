import { Link } from 'react-router-dom'
import CartPanel from '../components/CartPanel'
import Reveal from '../components/Reveal'
import { formatCurrency } from '../data/products'

export default function OrderPage({ products, cartItems, addToCart, updateQuantity, removeFromCart, subtotal }) {
  return (
    <div className="page-shell order-page-shell">
      <div className="page-topbar">
        <Link className="back-link" to="/">
          ← Back to home
        </Link>
        <div className="page-title-group">
          <p className="eyebrow">Order online</p>
          <h1>Freshly baked, ready when you are.</h1>
        </div>
      </div>

      <section className="order-hero-card">
        <div>
          <p className="eyebrow">Simple ordering</p>
          <h2>Choose your favourites and place an order in minutes.</h2>
          <p>
            Browse the bakery selections, add items to your basket, and complete your order with delivery or pickup.
          </p>
        </div>
        <div className="order-summary-box">
          <span>Current subtotal</span>
          <strong>{formatCurrency(subtotal)}</strong>
          <p>{cartItems.length} item(s) selected</p>
        </div>
      </section>

      <div className="order-content-grid">
        <section className="product-catalog">
          <Reveal as="div" className="product-catalog-header">
            <h3>Our breads</h3>
            <p>Choose from our full bakery range.</p>
          </Reveal>
          <div className="product-grid compact-grid">
            {products.map((product, index) => {
              const isTracked = typeof product.stock === 'number'
              const isOutOfStock = isTracked && product.stock <= 0
              const isLowStock = isTracked && product.stock > 0 && product.stock <= 5

              return (
                <Reveal as="article" className="product-card" key={product.id} delay={index * 60}>
                  <img className="product-image" src={product.image} alt={product.name} />
                  <span className="product-badge">{product.badge}</span>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  {isLowStock && <p className="product-stock-note">Only {product.stock} left</p>}
                  <div className="product-footer">
                    <strong>{formatCurrency(product.price)}</strong>
                    {isOutOfStock ? (
                      <span className="product-out-of-stock">Out of stock</span>
                    ) : (
                      <button className="button small" type="button" onClick={() => addToCart(product)}>
                        Add to cart
                      </button>
                    )}
                  </div>
                </Reveal>
              )
            })}
          </div>
        </section>

        <div className="order-side-panel">
          <CartPanel
            cartItems={cartItems}
            onRemove={removeFromCart}
            onUpdateQuantity={updateQuantity}
          />
        </div>
      </div>
    </div>
  )
}
