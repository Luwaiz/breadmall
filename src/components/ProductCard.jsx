import { Link } from 'react-router-dom'
import { formatCurrency } from '../data/products'
import Reveal from './Reveal'

export default function ProductCard({ product, index = 0 }) {
  return (
    <Reveal as="article" className="product-card" delay={index * 80}>
      <img className="product-image" src={product.image} alt={product.name} />
      <span className="product-badge">{product.badge}</span>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <div className="product-footer">
        <strong>{formatCurrency(product.price)}</strong>
        <Link className="button small" to="/order">
          Place order
        </Link>
      </div>
    </Reveal>
  )
}
