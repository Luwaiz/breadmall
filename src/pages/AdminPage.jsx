import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createProduct, getOrders, getProducts } from '../lib/api'
import { formatCurrency } from '../data/products'

const emptyProductForm = { name: '', description: '', badge: '', price: '', image: '', stock: '' }

function getAdminToken() {
  return localStorage.getItem('breadmall_admin_token')
}

function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return Date.now() >= payload.exp * 1000
  } catch {
    return true
  }
}

export default function AdminPage() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [products, setProducts] = useState([])
  const [productForm, setProductForm] = useState(emptyProductForm)
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [productError, setProductError] = useState(null)

  useEffect(() => {
    const token = getAdminToken()
    if (!token || isTokenExpired(token)) {
      navigate('/admin/login', { replace: true })
      return
    }

    async function fetchOrders() {
      try {
        const data = await getOrders()
        setOrders(data)
      } catch (err) {
        if (err.message?.includes('Session expired') || err.message?.includes('Access denied')) {
          localStorage.removeItem('breadmall_admin_token')
          navigate('/admin/login', { replace: true })
        } else {
          setError(err.message || 'Failed to load orders.')
        }
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()

    getProducts()
      .then(setProducts)
      .catch((err) => console.error('Failed to load products.', err))
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('breadmall_admin_token')
    navigate('/admin/login', { replace: true })
  }

  const handleProductFormChange = (event) => {
    const { name, value } = event.target
    setProductForm((current) => ({ ...current, [name]: value }))
  }

  const handleAddProduct = async (event) => {
    event.preventDefault()
    setProductError(null)
    setIsAddingProduct(true)

    try {
      const result = await createProduct({
        ...productForm,
        price: Number(productForm.price),
        stock: Number(productForm.stock),
      })
      setProducts((current) => [...current, result.product])
      setProductForm(emptyProductForm)
    } catch (err) {
      if (err.message?.includes('Session expired') || err.message?.includes('Access denied')) {
        localStorage.removeItem('breadmall_admin_token')
        navigate('/admin/login', { replace: true })
      } else {
        setProductError(err.message || 'Failed to add product.')
      }
    } finally {
      setIsAddingProduct(false)
    }
  }

  return (
    <div className="page-shell order-page-shell">
      <div className="page-topbar">
        <Link className="back-link" to="/">
          ← Back to storefront
        </Link>
        <div className="page-title-group">
          <p className="eyebrow">Admin Dashboard</p>
          <h1>Customer Orders</h1>
        </div>
        <button
          id="admin-logout-btn"
          onClick={handleLogout}
          style={{
            padding: '0.55rem 1.2rem',
            borderRadius: '999px',
            border: '1.5px solid var(--border)',
            background: 'transparent',
            color: 'var(--muted)',
            fontWeight: '600',
            fontSize: '0.9rem',
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'all 180ms ease',
          }}
          onMouseEnter={e => { e.target.style.borderColor = '#e53e3e'; e.target.style.color = '#c53030' }}
          onMouseLeave={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--muted)' }}
        >
          Logout
        </button>
      </div>

      <section className="order-hero-card">
        <div>
          <p className="eyebrow">Overview</p>
          <h2>Real-time Orders Management</h2>
          <p>
            Track and manage all customer orders. View pickup/delivery preferences, items, and contact details.
          </p>
        </div>
        <div className="order-summary-box">
          <span>Total orders</span>
          <strong>{orders.length}</strong>
          <p>Stored in MongoDB</p>
        </div>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <div style={{ marginBottom: '1.25rem' }}>
          <p className="eyebrow">Catalog</p>
          <h2 style={{ margin: '0 0 6px', color: 'var(--text-h)' }}>Add a new product</h2>
          <p style={{ margin: 0, color: 'var(--muted)' }}>New products appear on the storefront immediately.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 380px) 1fr', gap: '2rem', alignItems: 'start' }}>
          <form className="checkout-form" onSubmit={handleAddProduct}>
            <label>
              Name
              <input
                name="name"
                value={productForm.name}
                onChange={handleProductFormChange}
                placeholder="e.g. Sourdough Loaf"
                required
              />
            </label>

            <label>
              Description
              <textarea
                name="description"
                value={productForm.description}
                onChange={handleProductFormChange}
                placeholder="Short description of the bread"
                rows="2"
              />
            </label>

            <label>
              Badge
              <input
                name="badge"
                value={productForm.badge}
                onChange={handleProductFormChange}
                placeholder="e.g. New arrival"
              />
            </label>

            <label>
              Price (₦)
              <input
                name="price"
                type="number"
                min="0"
                step="1"
                value={productForm.price}
                onChange={handleProductFormChange}
                placeholder="2500"
                required
              />
            </label>

            <label>
              Image URL
              <input
                name="image"
                value={productForm.image}
                onChange={handleProductFormChange}
                placeholder="https://..."
                required
              />
            </label>

            <label>
              Stock quantity
              <input
                name="stock"
                type="number"
                min="0"
                step="1"
                value={productForm.stock}
                onChange={handleProductFormChange}
                placeholder="20"
                required
              />
            </label>

            {productError && <p style={{ color: '#c53030', margin: 0 }}>{productError}</p>}

            <button className="button primary full" type="submit" disabled={isAddingProduct}>
              {isAddingProduct ? 'Adding product...' : 'Add product'}
            </button>
          </form>

          {products.length > 0 ? (
            <div className="product-grid compact-grid">
              {products.map((product) => (
                <article className="product-card" key={product.id}>
                  <img className="product-image" src={product.image} alt={product.name} />
                  {product.badge && <span className="product-badge">{product.badge}</span>}
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="product-footer">
                    <strong>{formatCurrency(product.price)}</strong>
                    <span
                      style={{
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        color: product.stock <= 0 ? '#c53030' : product.stock <= 5 ? '#d97706' : 'var(--muted)',
                      }}
                    >
                      {product.stock <= 0 ? 'Out of stock' : `${product.stock} in stock`}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="order-empty-state">
              <h3>No products yet</h3>
              <p>Add your first product using the form.</p>
            </div>
          )}
        </div>
      </section>

      <div style={{ marginTop: '2rem' }}>
        {loading ? (
          <div className="order-empty-state">
            <h3>Loading orders…</h3>
            <p>Fetching latest data from MongoDB.</p>
          </div>
        ) : error ? (
          <div className="order-empty-state">
            <h3 style={{ color: '#c53030' }}>Error</h3>
            <p>{error}</p>
            <button className="button primary" onClick={() => window.location.reload()}>
              Try again
            </button>
          </div>
        ) : orders.length === 0 ? (
          <div className="order-empty-state">
            <h3>No orders yet</h3>
            <p>Submitted orders will appear here in real-time.</p>
            <Link className="button primary" to="/order">
              Place a test order
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {orders.map((order) => (
              <div
                key={order._id}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '20px',
                  padding: '2rem',
                  boxShadow: '0 4px 16px rgba(153, 85, 30, 0.06)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '2rem',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                    <span style={{
                      padding: '0.3rem 0.8rem',
                      borderRadius: '999px',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      background: order.customer?.method === 'delivery' ? '#ebf8ff' : '#fef3c7',
                      color: order.customer?.method === 'delivery' ? '#2b6cb0' : '#d97706',
                      border: order.customer?.method === 'delivery' ? '1px solid #bee3f8' : '1px solid #fde68a',
                    }}>
                      {order.customer?.method || 'pickup'}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
                      {new Date(order.createdAt).toLocaleString('en-NG', {
                        day: '2-digit', month: 'short', year: 'numeric',
                        hour: '2-digit', minute: '2-digit',
                      })}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--muted)', fontFamily: 'monospace' }}>
                      #{order._id.slice(-6).toUpperCase()}
                    </span>
                  </div>

                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>
                    {order.customer?.name}
                  </h3>
                  <p style={{ margin: '0 0 0.35rem 0', color: 'var(--muted)', fontSize: '0.95rem' }}>
                    <strong style={{ color: 'var(--text)' }}>Phone:</strong> {order.customer?.phone}
                  </p>
                  {order.customer?.address && (
                    <p style={{ margin: '0 0 0.35rem 0', color: 'var(--muted)', fontSize: '0.95rem' }}>
                      <strong style={{ color: 'var(--text)' }}>Address:</strong> {order.customer.address}
                    </p>
                  )}
                  {order.customer?.note && (
                    <div style={{
                      marginTop: '0.75rem',
                      padding: '0.75rem',
                      background: '#fffaf4',
                      borderRadius: '10px',
                      borderLeft: '4px solid var(--accent)',
                      fontSize: '0.9rem',
                      color: 'var(--muted)',
                    }}>
                      <strong style={{ color: 'var(--text)' }}>Note:</strong> {order.customer.note}
                    </div>
                  )}
                </div>

                <div>
                  <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', color: 'var(--text-h)' }}>
                    Items Ordered
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {order.items?.map((item, idx) => (
                      <li
                        key={idx}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '0.55rem 0',
                          borderBottom: '1px dashed var(--border)',
                        }}
                      >
                        <div>
                          <strong style={{ color: 'var(--text-h)' }}>{item.name}</strong>
                          <span style={{ color: 'var(--muted)', fontSize: '0.9rem', marginLeft: '0.5rem' }}>
                            × {item.quantity}
                          </span>
                        </div>
                        <span style={{ fontWeight: '600', color: 'var(--accent-strong)' }}>
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '1.25rem',
                    paddingTop: '0.75rem',
                    borderTop: '2px solid var(--border)',
                  }}>
                    <span style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-h)' }}>Total Amount</span>
                    <strong style={{ fontSize: '1.35rem', color: 'var(--accent-strong)' }}>
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
