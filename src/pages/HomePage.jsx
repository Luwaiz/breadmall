import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import FeaturedProductsSection from '../components/FeaturedProductsSection'
import { breadProducts } from '../data/products'

const testimonials = [
  {
    quote: 'The best loaf in town. Every bite feels like homemade comfort.',
    author: 'Ada, regular customer',
  },
  {
    quote: 'Their brioche is unreal. It disappears before breakfast is even over.',
    author: 'Mina, brunch host',
  },
]

export default function HomePage() {
  return (
    <div className="page-shell">
      <Header />

      <main id="home">
        <HeroSection />

        <section className="feature-strip" aria-label="BreadMall highlights">
          <div>
            <strong>Daily bake</strong>
            <span>Fresh from the oven by sunrise</span>
          </div>
          <div>
            <strong>Family recipe</strong>
            <span>Classic methods with a modern touch</span>
          </div>
          <div>
            <strong>Neighborhood favorite</strong>
            <span>Trusted for comfort, quality, and warmth</span>
          </div>
        </section>

        <FeaturedProductsSection products={breadProducts} />

        <section id="story" className="story-section">
          <div className="story-card">
            <p className="eyebrow">Why BreadMall</p>
            <h2>We believe great bread starts with simple ingredients, patient craft, and a warm welcome.</h2>
            <p>
              Every loaf is baked with care to bring comfort to homes, offices, and family tables
              across the community. BreadMall is here to make every breakfast and every gathering feel special.
            </p>
          </div>

          <div className="stats-card" id="visit">
            <div>
              <strong>15+</strong>
              <span>fresh bakes every day</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>made in-house</span>
            </div>
            <div>
              <strong>4.9/5</strong>
              <span>customer love</span>
            </div>
          </div>
        </section>

        <section className="section testimonials">
          <div className="section-heading">
            <p className="eyebrow">What people say</p>
            <h2>Comforting bread and happy customers.</h2>
          </div>

          <div className="testimonial-grid">
            {testimonials.map((item) => (
              <article className="testimonial-card" key={item.author}>
                <p>“{item.quote}”</p>
                <span>{item.author}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="cta-section">
          <h2>Come by for a loaf, a roll, or a little comfort.</h2>
          <p>Visit BreadMall in the morning for the freshest selection and warmest welcome.</p>
          <p className="address-line">No 2 Ezimgbu (Mummy-B) Link Road, Port Harcourt, Rivers State</p>
          <a className="button primary" href="mailto:Breadmall19@gmail.com">
            Breadmall19@gmail.com
          </a>
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 BreadMall. Freshly baked, proudly shared.</p>
      </footer>
    </div>
  )
}
