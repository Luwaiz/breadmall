import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import OrderPage from './pages/OrderPage'
import CheckoutPage from './pages/CheckoutPage'
import AdminPage from './pages/AdminPage'
import AdminLoginPage from './pages/AdminLoginPage'
import MyOrdersPage from './pages/MyOrdersPage'
import { breadProducts, defaultOrderForm } from './data/products'
import { getProducts, submitOrder } from './lib/api'

function App() {
  const [cartItems, setCartItems] = useState([])
  const [formData, setFormData] = useState(defaultOrderForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [products, setProducts] = useState(breadProducts)

  useEffect(() => {
    getProducts()
      .then((data) => {
        if (data.length) setProducts(data)
      })
      .catch((error) => {
        console.error('Unable to load products from the database, showing defaults.', error)
      })
  }, [])

  const addToCart = (product) => {
    setCartItems((current) => {
      const existingItem = current.find((item) => item.id === product.id)
      if (existingItem) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [...current, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (id, quantity) => {
    setCartItems((current) => {
      if (quantity <= 0) {
        return current.filter((item) => item.id !== id)
      }
      return current.map((item) => (item.id === id ? { ...item, quantity } : item))
    })
  }

  const removeFromCart = (id) => {
    setCartItems((current) => current.filter((item) => item.id !== id))
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!cartItems.length) return

    setIsSubmitting(true)

    try {
      const payload = {
        customer: {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          method: formData.method,
          note: formData.note,
        },
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        subtotal,
      }

      const result = await submitOrder(payload)
      // Save order ID to localStorage for "My Orders" tracking
      if (result?.order?._id) {
        try {
          const existing = JSON.parse(localStorage.getItem('breadmall_order_ids') || '[]')
          existing.push(result.order._id)
          localStorage.setItem('breadmall_order_ids', JSON.stringify(existing))
        } catch {
          // silently ignore storage errors
        }
      }
      setOrderPlaced(true)
      setCartItems([])
      setFormData(defaultOrderForm)
    } catch (error) {
      console.error(error)
      window.alert(error.message || 'Unable to place order right now.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const subtotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems],
  )

  const resetOrder = () => {
    setOrderPlaced(false)
    setFormData(defaultOrderForm)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage products={products} />} />
        <Route
          path="/order"
          element={
            <OrderPage
              products={products}
              cartItems={cartItems}
              addToCart={addToCart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
              subtotal={subtotal}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <CheckoutPage
              cartItems={cartItems}
              formData={formData}
              isSubmitting={isSubmitting}
              orderPlaced={orderPlaced}
              onRemove={removeFromCart}
              onUpdateQuantity={updateQuantity}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
              onReset={resetOrder}
              subtotal={subtotal}
            />
          }
        />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/my-orders" element={<MyOrdersPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
