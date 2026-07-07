import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'

export default function FeaturedProductsSection({ products }) {
  const featuredProducts = products.slice(0, 3)

  return (
    <section id="breads" className="section">
      <div className="section-heading">
        <p className="eyebrow">Featured bakes</p>
        <h2>Our signature breads, made fresh and ready to enjoy.</h2>
      </div>

      <div className="product-grid">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="section-actions">
        <Link className="button primary" to="/order">
          See more
        </Link>
      </div>
    </section>
  )
}
