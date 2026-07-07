import { Link } from 'react-router-dom'
import { formatCurrency } from '../data/products'

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
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
    </article>
  )
}
