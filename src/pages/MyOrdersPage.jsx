import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUserOrders } from '../lib/api'
import { formatCurrency } from '../data/products'

function getStoredOrderIds() {
  try {
    const stored = localStorage.getItem('breadmall_order_ids')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const orderIds = getStoredOrderIds()

  useEffect(() => {
    async function fetchOrders() {
      if (orderIds.length === 0) {
        setLoading(false)
        return
      }
      try {
        const data = await getUserOrders(orderIds)
        setOrders(data)
      } catch (err) {
        setError(err.message || 'Failed to load your orders.')
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  return (
    <div className="page-shell order-page-shell">
      <div className="page-topbar">
        <Link className="back-link" to="/">
          ← Back to home
        </Link>
        <div className="page-title-group">
          <p className="eyebrow">Order History</p>
          <h1>Your Orders</h1>
        </div>
      </div>

      <section className="order-hero-card">
        <div>
          <p className="eyebrow">Track your orders</p>
          <h2>Everything you've ordered, all in one place.</h2>
          <p>
            Your order history is stored on this device. Orders placed from a different browser or device won't appear here.
          </p>
        </div>
        <div className="order-summary-box">
          <span>Orders placed</span>
          <strong>{orderIds.length}</strong>
          <p>On this device</p>
        </div>
      </section>

      <div style={{ marginTop: '2rem' }}>
        {loading ? (
          <div className="order-empty-state">
            <h3>Loading your orders…</h3>
            <p>Fetching your order history.</p>
          </div>
        ) : error ? (
          <div className="order-empty-state">
            <h3 style={{ color: '#c53030' }}>Something went wrong</h3>
            <p>{error}</p>
            <button className="button primary" onClick={() => window.location.reload()}>
              Try again
            </button>
          </div>
        ) : orders.length === 0 ? (
          <div className="order-empty-state">
            <h3>No orders yet</h3>
            <p>
              {orderIds.length > 0
                ? 'Your order history couldn\'t be retrieved at this time.'
                : 'You haven\'t placed any orders yet. Start by browsing our fresh breads!'}
            </p>
            <Link className="button primary" to="/order">
              Browse breads
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {orders.map((order, index) => (
              <div
                key={order._id}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '20px',
                  padding: '2rem',
                  boxShadow: '0 4px 16px rgba(153, 85, 30, 0.06)',
                }}
              >
                {/* Order Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{
                      display: 'inline-grid',
                      placeItems: 'center',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--accent), var(--accent-strong))',
                      color: 'white',
                      fontWeight: '700',
                      fontSize: '0.85rem',
                    }}>
                      {orders.length - index}
                    </span>
                    <div>
                      <p style={{ margin: 0, fontWeight: '700', color: 'var(--text-h)' }}>
                        Order #{order._id.slice(-6).toUpperCase()}
                      </p>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--muted)' }}>
                        {new Date(order.createdAt).toLocaleDateString('en-NG', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                  <span style={{
                    padding: '0.35rem 0.85rem',
                    borderRadius: '999px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    textTransform: 'capitalize',
                    background: order.customer?.method === 'delivery' ? '#ebf8ff' : '#fef3c7',
                    color: order.customer?.method === 'delivery' ? '#2b6cb0' : '#d97706',
                    border: order.customer?.method === 'delivery' ? '1px solid #bee3f8' : '1px solid #fde68a',
                  }}>
                    {order.customer?.method}
                  </span>
                </div>

                {/* Items List */}
                <div style={{
                  background: '#fffaf4',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  border: '1px solid var(--border)',
                  marginBottom: '1.25rem',
                }}>
                  <p style={{ margin: '0 0 0.75rem', fontWeight: '700', fontSize: '0.9rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Items ordered
                  </p>
                  {order.items?.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.5rem 0',
                        borderBottom: idx < order.items.length - 1 ? '1px dashed var(--border)' : 'none',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{
                          display: 'inline-grid',
                          placeItems: 'center',
                          width: '26px',
                          height: '26px',
                          borderRadius: '6px',
                          background: 'var(--border)',
                          fontSize: '0.8rem',
                          fontWeight: '700',
                          color: 'var(--accent-strong)',
                        }}>
                          {item.quantity}
                        </span>
                        <span style={{ fontWeight: '500', color: 'var(--text)' }}>{item.name}</span>
                      </div>
                      <span style={{ fontWeight: '600', color: 'var(--text-h)' }}>
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Delivery Details & Total */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  {order.customer?.address && (
                    <div style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>
                      <strong style={{ color: 'var(--text-h)', display: 'block', marginBottom: '0.2rem' }}>Delivery address</strong>
                      {order.customer.address}
                    </div>
                  )}
                  {order.customer?.note && (
                    <div style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>
                      <strong style={{ color: 'var(--text-h)', display: 'block', marginBottom: '0.2rem' }}>Note</strong>
                      {order.customer.note}
                    </div>
                  )}
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--muted)' }}>Total paid</p>
                    <strong style={{ fontSize: '1.5rem', color: 'var(--accent-strong)' }}>
                      {formatCurrency(order.subtotal)}
                    </strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
