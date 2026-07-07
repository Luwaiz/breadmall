import { Link } from 'react-router-dom'
import CartPanel from '../components/CartPanel'
import CheckoutForm from '../components/CheckoutForm'
import OrderSuccess from '../components/OrderSuccess'
import { formatCurrency } from '../data/products'

export default function CheckoutPage({
  cartItems,
  formData,
  isSubmitting,
  orderPlaced,
  onRemove,
  onUpdateQuantity,
  onInputChange,
  onSubmit,
  onReset,
  subtotal,
}) {
  return (
    <div className="page-shell order-page-shell">
      <div className="page-topbar">
        <Link className="back-link" to="/order">
          ← Back to order
        </Link>
        <div className="page-title-group">
          <p className="eyebrow">Checkout</p>
          <h1>Finish your order with ease.</h1>
        </div>
      </div>

      <section className="order-hero-card">
        <div>
          <p className="eyebrow">Secure checkout</p>
          <h2>Review your basket and confirm your delivery or pickup details.</h2>
          <p>
            Your order is almost ready. Choose your preferred method and we’ll take care of the rest.
          </p>
        </div>
        <div className="order-summary-box">
          <span>Order total</span>
          <strong>{formatCurrency(subtotal)}</strong>
          <p>{cartItems.length} item(s) selected</p>
        </div>
      </section>

      <div className="order-content-grid">
        <CartPanel
          cartItems={cartItems}
          onRemove={onRemove}
          onUpdateQuantity={onUpdateQuantity}
          showCheckoutButton={false}
        />

        {orderPlaced ? (
          <OrderSuccess onReset={onReset} />
        ) : cartItems.length === 0 ? (
          <div className="order-empty-state">
            <h3>Your basket is empty</h3>
            <p>Add a few favourites first, then come back to finish your order.</p>
            <Link className="button primary" to="/order">
              Browse breads
            </Link>
          </div>
        ) : (
          <CheckoutForm
            formData={formData}
            onChange={onInputChange}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  )
}
