import express from 'express'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const orders = []

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.get('/api/orders', (_req, res) => {
  res.json(orders)
})

app.post('/api/orders', (req, res) => {
  const { customer, items, subtotal } = req.body || {}

  if (!customer || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Order requires customer details and at least one item.' })
  }

  const order = {
    id: `ord-${Date.now()}`,
    customer,
    items,
    subtotal: Number(subtotal || 0),
    createdAt: new Date().toISOString(),
  }

  orders.push(order)

  res.status(201).json({ message: 'Order received', order })
})

app.listen(port, () => {
  console.log(`BreadMall API running on http://localhost:${port}`)
})
