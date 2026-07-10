import { Link } from 'react-router-dom'
import { formatCurrency } from '../data/products'

export default function CartPanel({ cartItems, onRemove, onUpdateQuantity, showCheckoutButton = true }) {
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <aside className="cart-panel" id="order">
      <div className="cart-header">
        <h3>Your order</h3>
        <span>{cartItems.length} item(s)</span>
      </div>

      {cartItems.length === 0 ? (
        <p className="cart-empty">Your cart is empty. Add a few favourites to get started.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <div>
                <strong>{item.name}</strong>
                <p>{formatCurrency(item.price)}</p>
              </div>

              <div className="cart-controls">
                <button type="button" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  disabled={typeof item.stock === 'number' && item.quantity >= item.stock}
                >
                  +
                </button>
              </div>

              <button className="text-link" type="button" onClick={() => onRemove(item.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="cart-footer">
        <div className="cart-total">
          <span>Subtotal</span>
          <strong>{formatCurrency(subtotal)}</strong>
        </div>
        {showCheckoutButton && cartItems.length > 0 ? (
          <Link className="button primary full" to="/checkout" style={{ marginTop: '14px' }}>
            Continue to checkout
          </Link>
        ) : null}
      </div>
    </aside>
  )
}
