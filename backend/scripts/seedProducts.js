import mongoose from 'mongoose'
import dotenv from 'dotenv'
import dns from 'dns'
import { breadProducts } from '../../src/data/products.js'

dns.setServers(['8.8.8.8', '8.8.4.4'])

dotenv.config()

const mongoUri = process.env.MONGODB_URI

if (!mongoUri) {
  console.error('Error: MONGODB_URI is not defined in the environment.')
  process.exit(1)
}

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

async function run() {
  await mongoose.connect(mongoUri)
  console.log('Connected to MongoDB.')

  let created = 0
  let skipped = 0

  for (const product of breadProducts) {
    const exists = await Product.exists({ id: product.id })
    if (exists) {
      skipped += 1
      continue
    }
    await Product.create(product)
    created += 1
    console.log(`Added: ${product.name}`)
  }

  console.log(`Seed complete. Added ${created} product(s), skipped ${skipped} already present.`)
  await mongoose.disconnect()
}

run().catch((error) => {
  console.error('Failed to seed products:', error)
  process.exit(1)
})
