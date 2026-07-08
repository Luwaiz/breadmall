import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'
import Reveal from './Reveal'

export default function FeaturedProductsSection({ products }) {
  const featuredProducts = products.slice(0, 3)

  return (
    <section id="breads" className="section">
      <Reveal as="div" className="section-heading">
        <p className="eyebrow">Featured bakes</p>
        <h2>Our signature breads, made fresh and ready to enjoy.</h2>
      </Reveal>

      <div className="product-grid">
        {featuredProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
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
