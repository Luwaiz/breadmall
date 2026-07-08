import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import dns from 'dns'
import jwt from 'jsonwebtoken'

dns.setServers(['8.8.8.8', '8.8.4.4'])

dotenv.config()

const app = express()
const port = process.env.PORT || 5000
const mongoUri = process.env.MONGODB_URI

if (!mongoUri) {
  console.error('Error: MONGODB_URI is not defined in the environment.')
  process.exit(1)
}

// Connect to MongoDB
mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB successfully.'))
  .catch((err) => {
    console.error('MongoDB connection error:', err)
    process.exit(1)
  })

app.use(cors())
app.use(express.json())

// Define Schema and Model
const OrderSchema = new mongoose.Schema({
  customer: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    method: { type: String, enum: ['pickup', 'delivery'], default: 'pickup' },
    note: { type: String, default: '' },
  },
  items: [
    {
      id: { type: String, required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true },
    }
  ],
  subtotal: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
})

const Order = mongoose.model('Order', OrderSchema)

const ProductSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, default: '' },
  badge: { type: String, default: '' },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

const Product = mongoose.model('Product', ProductSchema)

function slugify(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Middleware to verify Admin JWT Token
function verifyAdminToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] // Expecting "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No authentication token provided.' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'breadmall_secret_key_12345')
    req.admin = decoded
    next()
  } catch (err) {
    return res.status(403).json({ message: 'Session expired or invalid token. Please log in again.' })
  }
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

// Admin Login Endpoint
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body || {}
  const adminUser = process.env.ADMIN_USERNAME || 'admin'
  const adminPass = process.env.ADMIN_PASSWORD || 'breadmall2026'

  if (username === adminUser && password === adminPass) {
    const token = jwt.sign(
      { username },
      process.env.JWT_SECRET || 'breadmall_secret_key_12345',
      { expiresIn: '2h' }
    )
    return res.json({ token })
  }

  return res.status(401).json({ message: 'Invalid username or password.' })
})

// Protected Admin Endpoint to get all orders
app.get('/api/orders', verifyAdminToken, async (_req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    console.error('Error fetching orders:', error)
    res.status(500).json({ message: 'Error fetching orders from database.' })
  }
})

// Public Endpoint to get specific orders for a user (via localStorage IDs)
app.get('/api/orders/user', async (req, res) => {
  const idsQuery = req.query.ids || ''
  if (!idsQuery) {
    return res.json([])
  }

  const ids = idsQuery.split(',').filter(Boolean)

  try {
    const userOrders = await Order.find({ _id: { $in: ids } }).sort({ createdAt: -1 })
    res.json(userOrders)
  } catch (error) {
    console.error('Error fetching user orders:', error)
    res.status(500).json({ message: 'Error retrieving your order history.' })
  }
})

app.post('/api/orders', async (req, res) => {
  const { customer, items, subtotal } = req.body || {}

  if (!customer || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Order requires customer details and at least one item.' })
  }

  try {
    const newOrder = new Order({
      customer,
      items,
      subtotal: Number(subtotal || 0),
    })

    const savedOrder = await newOrder.save()
    res.status(201).json({ message: 'Order received', order: savedOrder })
  } catch (error) {
    console.error('Error saving order:', error)
    res.status(500).json({ message: 'Failed to save order to database.', error: error.message })
  }
})

// Public Endpoint to list all products
app.get('/api/products', async (_req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: 1 })
    res.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    res.status(500).json({ message: 'Error fetching products from database.' })
  }
})

// Protected Admin Endpoint to add a new product
app.post('/api/products', verifyAdminToken, async (req, res) => {
  const { name, description, badge, price, image } = req.body || {}

  if (!name || !price || !image) {
    return res.status(400).json({ message: 'Product requires a name, price, and image.' })
  }

  try {
    const slugBase = slugify(name)
    let id = slugBase
    let suffix = 1
    while (await Product.exists({ id })) {
      id = `${slugBase}-${suffix++}`
    }

    const newProduct = new Product({
      id,
      name,
      description: description || '',
      badge: badge || '',
      price: Number(price),
      image,
    })

    const savedProduct = await newProduct.save()
    res.status(201).json({ message: 'Product added', product: savedProduct })
  } catch (error) {
    console.error('Error saving product:', error)
    res.status(500).json({ message: 'Failed to save product to database.', error: error.message })
  }
})

app.listen(port, () => {
  console.log(`BreadMall API running on http://localhost:${port}`)
})
