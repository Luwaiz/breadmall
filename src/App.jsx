import { useMemo, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import OrderPage from './pages/OrderPage'
import CheckoutPage from './pages/CheckoutPage'
import { defaultOrderForm } from './data/products'

function App() {
  const [cartItems, setCartItems] = useState([])
  const [formData, setFormData] = useState(defaultOrderForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

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

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!cartItems.length) return

    setIsSubmitting(true)
    window.setTimeout(() => {
      setIsSubmitting(false)
      setOrderPlaced(true)
      setCartItems([])
      setFormData(defaultOrderForm)
    }, 800)
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
        <Route path="/" element={<HomePage />} />
        <Route
          path="/order"
          element={
            <OrderPage
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
      </Routes>
    </BrowserRouter>
  )
}

export default App
